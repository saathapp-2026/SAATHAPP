import React, { useEffect, useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Upload, X, ImagePlus, Film, FileText, RotateCw, Crop, Wand2, ArrowUpDown, Loader2,
} from 'lucide-react';
import { SectionCard } from './FormFields';

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp|svg|heic|heif|avif)$/i;

function isImageFile(file) {
  if (!file) return false;
  if (file.type && file.type.startsWith('image/')) return true;
  return IMAGE_EXT.test(file.name || '');
}

function isPreviewableUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http');
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('read failed'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Client-side image transforms — Crop / Rotate / Compress / Enhance / Remove BG */
async function transformImage(dataUrl, action) {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unsupported');

  if (action === 'rotate') {
    canvas.width = img.height;
    canvas.height = img.width;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    return canvas.toDataURL('image/jpeg', 0.92);
  }

  if (action === 'crop') {
    const side = Math.min(img.width, img.height);
    const sx = (img.width - side) / 2;
    const sy = (img.height - side) / 2;
    canvas.width = side;
    canvas.height = side;
    ctx.drawImage(img, sx, sy, side, side, 0, 0, side, side);
    return canvas.toDataURL('image/jpeg', 0.92);
  }

  if (action === 'compress') {
    const max = 1200;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.7);
  }

  if (action === 'enhance') {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = 'contrast(1.15) brightness(1.08) saturate(1.1)';
    ctx.drawImage(img, 0, 0);
    ctx.filter = 'none';
    return canvas.toDataURL('image/jpeg', 0.92);
  }

  if (action === 'removeBg') {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      // Treat near-white / light gray as background
      if (r > 230 && g > 230 && b > 230) {
        d[i + 3] = 0;
      } else if (r > 210 && g > 210 && b > 210) {
        d[i + 3] = Math.round(d[i + 3] * 0.35);
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  return dataUrl;
}

function ImageSlot({ item, label, onRemove, onReplace, large, disabled }) {
  const inputRef = useRef(null);
  const [reading, setReading] = useState(false);

  const openPicker = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (disabled || reading) return;
    inputRef.current?.click();
  };

  const handleFile = async (file) => {
    if (!isImageFile(file)) {
      toast.error('Please select a valid image file (JPG, PNG, WebP…)');
      return;
    }
    setReading(true);
    const originalItem = item;
    const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    let blobUrl = '';
    try {
      blobUrl = URL.createObjectURL(file);
      onReplace({
        id,
        url: blobUrl,
        name: file.name || 'image.jpg',
        progress: 50,
        mimeType: file.type || 'image/jpeg',
        size: file.size,
      });
      const dataUrl = await readFileAsDataUrl(file);
      if (!dataUrl || !dataUrl.startsWith('data:')) {
        throw new Error('Could not read image data');
      }
      onReplace({
        id,
        url: dataUrl,
        name: file.name || 'image.jpg',
        progress: 100,
        mimeType: file.type || 'image/jpeg',
        size: file.size,
      });
      toast.success('Image uploaded');
    } catch (err) {
      console.error('[ImageSlot] upload failed', err);
      toast.error('Upload service unavailable. Please try again later.');
      onReplace({
        id,
        url: blobUrl,
        name: file.name || 'image.jpg',
        progress: 0,
        error: true,
        mimeType: file.type || 'image/jpeg',
        size: file.size,
      });
      // Do not revoke blobUrl on failure so we can show preview
      blobUrl = '';
    } finally {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      setReading(false);
    }
  };

  const hasImage = !!(item && isPreviewableUrl(item.url));

  return (
    <div
      className={`relative rounded-xl border border-dashed overflow-hidden bg-page ${
        large ? 'aspect-[4/3]' : 'aspect-square'
      } ${hasImage ? 'border-emerald-400 dark:border-emerald-600' : 'border-slate-300'}`}
    >
      {hasImage ? (
        <>
          <img src={item.url} alt={item.name || label} className="absolute inset-0 h-full w-full object-contain p-1.5" />
          {typeof item.progress === 'number' && item.progress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-200/80 z-10">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${item.progress}%` }} />
            </div>
          )}
          {reading && !item.error && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
              <Loader2 size={22} className="text-white animate-spin" />
            </div>
          )}
          {item.error && (
            <div className="absolute inset-0 bg-red-500/20 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]">
              <span className="text-white bg-red-600 px-2 py-1 rounded text-[10px] font-bold mb-1">Upload Failed</span>
            </div>
          )}
          <div className="absolute top-1 right-1 flex gap-1 z-20">
            <button type="button" onClick={openPicker} disabled={disabled || reading} className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none h-6 px-2 rounded bg-surface/95 text-[10px] font-semibold shadow">
              Replace
            </button>
            <button type="button" onClick={() => onRemove?.()} disabled={disabled || reading} className="h-6 w-6 rounded bg-surface/95 inline-flex items-center justify-center shadow" aria-label="Remove">
              <X size={12} />
            </button>
          </div>
          {item.name && (
            <p className="absolute bottom-1 left-1 right-10 text-[9px] bg-black/50 text-white px-1.5 py-0.5 rounded truncate z-10">
              {item.name}
            </p>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          disabled={disabled || reading}
          className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 disabled:opacity-50"
        >
          {reading ? <Loader2 size={large ? 28 : 18} className="animate-spin" /> : <ImagePlus size={large ? 28 : 18} />}
          <span className="text-[10px] font-medium">{reading ? 'Uploading…' : label}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic,.heif"
        className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none disabled:bg-slate-50 disabled:cursor-not-allowed sr-only"
        tabIndex={-1}
        disabled={disabled || reading}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (file) await handleFile(file);
        }}
      />
    </div>
  );
}

/**
 * Controlled media editor. Local state mirrors props and always pushes
 * a plain media object to the parent (never a function) so wizard draft
 * and validation stay in sync with draft.media.mainImage.
 */
export default function ProductMediaUpload({ value, errors = {}, onChange, onUploadingChange }) {
  const [media, setMedia] = useState(() => value || { mainImage: null, gallery: [] });
  const [dragOver, setDragOver] = useState(false);
  const [toolBusy, setToolBusy] = useState(false);
  const multiRef = useRef(null);
  const mediaRef = useRef(media);

  // Sync from parent when navigating back to this step
  useEffect(() => {
    if (value) {
      setMedia(value);
      mediaRef.current = value;
    }
  }, [value]);

  const commit = useCallback((next) => {
    const resolved = typeof next === 'function' ? next(mediaRef.current) : next;
    mediaRef.current = resolved;
    setMedia(resolved);
    // Always push plain object — field name: media.mainImage
    onChange?.(resolved);
  }, [onChange]);

  const setUploading = (busy) => onUploadingChange?.(busy);

  const setMainImage = (img) => {
    const still = !!img && typeof img.progress === 'number' && img.progress < 100;
    setUploading(still);
    commit((prev) => ({ ...prev, mainImage: img }));
    if (img && img.progress === 100 && isPreviewableUrl(img.url)) {
      // parent can clear errors via this signal
      onChange?.({ ...mediaRef.current, mainImage: img, _mainImageReady: true });
    }
  };

  const addGallery = async (files) => {
    const fileList = [...(files || [])].filter(isImageFile);
    if (!fileList.length) {
      toast.error('No valid images selected');
      return;
    }
    setUploading(true);
    try {
      const current = [...(mediaRef.current.gallery || [])];
      for (const file of fileList.slice(0, 10 - current.length)) {
        const dataUrl = await readFileAsDataUrl(file);
        current.push({
          id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          url: dataUrl,
          name: file.name,
          progress: 100,
          mimeType: file.type || 'image/jpeg',
          size: file.size,
        });
      }
      commit((prev) => ({ ...prev, gallery: current.slice(0, 10) }));
      toast.success(`Added ${Math.min(fileList.length, 10)} gallery image(s)`) } catch {
      toast.error('Gallery upload failed');
    } finally {
      setUploading(false);
    }
  };

  const runTool = async (action) => {
    const main = mediaRef.current.mainImage;
    if (!main || !isPreviewableUrl(main.url)) {
      toast.error('Upload a main image first');
      return;
    }
    setToolBusy(true);
    setUploading(true);
    try {
      const url = await transformImage(main.url, action);
      commit((prev) => ({
        ...prev,
        mainImage: {
          ...prev.mainImage,
          url,
          progress: 100,
          edited: action,
          mimeType: action === 'removeBg' ? 'image/png' : 'image/jpeg',
        },
      }));
      const labels = {
        rotate: 'Rotated 90°',
        crop: 'Cropped to square',
        compress: 'Compressed',
        enhance: 'Enhanced',
        removeBg: 'Background cleaned',
      };
      toast.success(labels[action] || 'Image updated') } catch (err) {
      console.error('[media tool]', action, err);
      toast.error(`Could not apply ${action}`);
    } finally {
      setToolBusy(false);
      setUploading(false);
    }
  };

  const mainReady = isPreviewableUrl(media.mainImage?.url);

  return (
    <div className="space-y-4 w-full min-w-0">
      <SectionCard number={2} title="Product Images & Media">
        {errors.mainImage && !mainReady && (
          <p className="text-xs text-red-500 font-medium" role="alert">{errors.mainImage}</p>
        )}

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={async (e) => {
            e.preventDefault();
            setDragOver(false);
            const files = [...(e.dataTransfer.files || [])].filter(isImageFile);
            if (!files.length) return toast.error('Drop image files only');
            if (!mediaRef.current.mainImage) {
              await (async () => {
                setUploading(true);
                try {
                  const file = files[0];
                  const dataUrl = await readFileAsDataUrl(file);
                  setMainImage({
                    id: `m_${Date.now()}`,
                    url: dataUrl,
                    name: file.name,
                    progress: 100,
                    mimeType: file.type || 'image/jpeg',
                    size: file.size,
                  });
                  if (files.length > 1) await addGallery(files.slice(1));
                } finally {
                  setUploading(false);
                }
              })();
            } else {
              await addGallery(files);
            }
          }}
          className={`rounded-xl border-2 border-dashed p-3 transition-colors ${
            dragOver ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-transparent'
          }`}
        >
          <p className="text-xs font-semibold text-slate-500 mb-2">Main Image *</p>
          <div className="max-w-sm w-full">
            <ImageSlot
              large
              item={media.mainImage}
              label="Click to upload main image"
              onRemove={() => setMainImage(null)}
              onReplace={setMainImage}
            />
          </div>
          {mainReady ? (
            <p className="text-[11px] text-emerald-600 mt-2 font-semibold">
              ✓ Main image ready{media.mainImage?.name ? `: ${media.mainImage.name}` : ''}
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-2">JPG, PNG, WebP — required to continue</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 gap-2">
            <p className="text-xs font-semibold text-slate-500">Gallery Images (up to 10)</p>
            <button type="button" onClick={() => multiRef.current?.click()} className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
              <Upload size={12} /> Multi upload
            </button>
            <input
              ref={multiRef}
              type="file"
              accept="image/*,.jpg,.jpeg,.png,.webp,.gif"
              multiple
              className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden"
              onChange={(e) => {
                addGallery(e.target.files);
                e.target.value = '';
              }}
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {(media.gallery || []).map((img, i) => (
              <ImageSlot
                key={img.id}
                item={img}
                label={`Image ${i + 1}`}
                onRemove={() =>
                  commit((prev) => ({
                    ...prev,
                    gallery: (prev.gallery || []).filter((g) => g.id !== img.id),
                  }))
                }
                onReplace={(next) =>
                  commit((prev) => ({
                    ...prev,
                    gallery: (prev.gallery || []).map((g) => (g.id === img.id ? next : g)),
                  }))
                }
              />
            ))}
            {(media.gallery || []).length < 10 && (
              <button
                type="button"
                onClick={() => multiRef.current?.click()}
                className="aspect-square rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 text-[10px]"
              >
                <ImagePlus size={16} />
                Add Image
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'crop', icon: Crop, label: 'Crop' },
            { id: 'rotate', icon: RotateCw, label: 'Rotate' },
            { id: 'removeBg', icon: Wand2, label: 'Remove BG / Enhance' },
            { id: 'compress', icon: ArrowUpDown, label: 'Compress' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              disabled={toolBusy || !mainReady}
              onClick={() => {
                if (id === 'removeBg') {
                  // Apply both remove-bg then enhance for the combined button
                  (async () => {
                    await runTool('removeBg');
                    await runTool('enhance');
                  })();
                } else {
                  runTool(id);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 hover:bg-page disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {toolBusy ? <Loader2 size={12} className="animate-spin" /> : <Icon size={12} />}
              {label}
            </button>
          ))}
        </div>
        {!mainReady && (
          <p className="text-[11px] text-slate-400">Image tools unlock after you upload a main image.</p>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1"><Film size={12} /> Product Video / YouTube</p>
            <input
              type="url"
              value={media.youtubeUrl || ''}
              onChange={(e) => commit((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
              placeholder="https://youtube.com/watch?v=…"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-surface dark:bg-slate-950 text-sm"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1"><FileText size={12} /> PDF Catalogue</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) commit((prev) => ({ ...prev, pdfCatalogue: { name: f.name, size: f.size } }));
              }}
              className="w-full text-sm"
            />
            {media.pdfCatalogue && <p className="text-[11px] text-slate-500 mt-1">{media.pdfCatalogue.name}</p>}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export { isPreviewableUrl };
