import React, { useRef, useState } from 'react';
import { Upload, X, ImagePlus, Film, FileText, RotateCw, Crop, Wand2, ArrowUpDown } from 'lucide-react';
import { SectionCard } from './FormFields';

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageSlot({ item, label, onRemove, onReplace, large }) {
  const inputRef = useRef(null);
  return (
    <div className={`relative rounded-xl border border-dashed border-slate-300 dark:border-slate-600 overflow-hidden bg-slate-50 dark:bg-slate-800/50 ${large ? 'aspect-[4/3]' : 'aspect-square'}`}>
      {item?.url ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700">
            {item.url.startsWith('data:') ? (
              <img src={item.url} alt={label} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-slate-500 px-2 text-center">{item.name || label}</span>
            )}
          </div>
          {item.progress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${item.progress}%` }} />
            </div>
          )}
          <div className="absolute top-1 right-1 flex gap-1">
            <button type="button" onClick={() => inputRef.current?.click()} className="h-6 px-2 rounded bg-white/90 text-[10px] font-semibold shadow">Replace</button>
            <button type="button" onClick={onRemove} className="h-6 w-6 rounded bg-white/90 inline-flex items-center justify-center shadow" aria-label="Remove">
              <X size={12} />
            </button>
          </div>
        </>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20">
          <ImagePlus size={large ? 28 : 18} />
          <span className="text-[10px] font-medium">{label}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const url = await readFileAsDataUrl(file);
          onReplace?.({ id: `img_${Date.now()}`, url, name: file.name, progress: 100 });
          e.target.value = '';
        }}
      />
    </div>
  );
}

export default function ProductMediaUpload({ value, errors = {}, onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const multiRef = useRef(null);

  const addGallery = async (files) => {
    const list = [...(value.gallery || [])];
    for (const file of [...files].slice(0, 10 - list.length)) {
      const url = await readFileAsDataUrl(file);
      list.push({ id: `g_${Date.now()}_${Math.random()}`, url, name: file.name, progress: 100 });
    }
    onChange({ ...value, gallery: list.slice(0, 10) });
  };

  const moveGallery = (from, to) => {
    const list = [...value.gallery];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    onChange({ ...value, gallery: list });
  };

  return (
    <div className="space-y-4">
      <SectionCard number={2} title="Product Images & Media">
        {errors.mainImage && <p className="text-xs text-red-500" role="alert">{errors.mainImage}</p>}

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={async (e) => {
            e.preventDefault();
            setDragOver(false);
            const files = e.dataTransfer.files;
            if (!files?.length) return;
            if (!value.mainImage) {
              const url = await readFileAsDataUrl(files[0]);
              onChange({ ...value, mainImage: { id: `m_${Date.now()}`, url, name: files[0].name, progress: 100 } });
              if (files.length > 1) addGallery([...files].slice(1));
            } else {
              addGallery(files);
            }
          }}
          className={`rounded-xl border-2 border-dashed p-3 transition-colors ${dragOver ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-transparent'}`}
        >
          <p className="text-xs font-semibold text-slate-500 mb-2">Main Image *</p>
          <div className="max-w-sm">
            <ImageSlot
              large
              item={value.mainImage}
              label="Upload main image"
              onRemove={() => onChange({ ...value, mainImage: null })}
              onReplace={(img) => onChange({ ...value, mainImage: img })}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-500">Gallery Images (up to 10)</p>
            <button type="button" onClick={() => multiRef.current?.click()} className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
              <Upload size={12} /> Multi upload
            </button>
            <input ref={multiRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addGallery(e.target.files)} />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {(value.gallery || []).map((img, i) => (
              <div key={img.id} className="relative group">
                <ImageSlot
                  item={img}
                  label={`Image ${i + 1}`}
                  onRemove={() => onChange({ ...value, gallery: value.gallery.filter((g) => g.id !== img.id) })}
                  onReplace={(next) => onChange({ ...value, gallery: value.gallery.map((g) => (g.id === img.id ? next : g)) })}
                />
                <div className="absolute bottom-1 left-1 flex gap-0.5 opacity-0 group-hover:opacity-100">
                  {i > 0 && (
                    <button type="button" onClick={() => moveGallery(i, i - 1)} className="h-5 w-5 rounded bg-white shadow text-[9px]" title="Move left">‹</button>
                  )}
                  {i < value.gallery.length - 1 && (
                    <button type="button" onClick={() => moveGallery(i, i + 1)} className="h-5 w-5 rounded bg-white shadow text-[9px]" title="Move right">›</button>
                  )}
                </div>
              </div>
            ))}
            {(value.gallery || []).length < 10 && (
              <button
                type="button"
                onClick={() => multiRef.current?.click()}
                className="aspect-square rounded-xl border border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 text-[10px]"
              >
                <ImagePlus size={16} />
                Add Image
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { icon: Crop, label: 'Crop' },
            { icon: RotateCw, label: 'Rotate' },
            { icon: Wand2, label: 'Remove BG / Enhance' },
            { icon: ArrowUpDown, label: 'Compress' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => {/* placeholder tools */}}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1"><Film size={12} /> Product Video / YouTube</p>
            <input
              type="url"
              value={value.youtubeUrl || ''}
              onChange={(e) => onChange({ ...value, youtubeUrl: e.target.value })}
              placeholder="https://youtube.com/watch?v=…"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1"><FileText size={12} /> PDF Catalogue</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onChange({ ...value, pdfCatalogue: { name: f.name, size: f.size } });
              }}
              className="w-full text-sm"
            />
            {value.pdfCatalogue && <p className="text-[11px] text-slate-500 mt-1">{value.pdfCatalogue.name}</p>}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
