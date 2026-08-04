import React, { useMemo, useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  ImageOff,
  Upload,
  Star,
} from 'lucide-react';
import { SectionCard } from './FormFields';
import {
  PRODUCT_CATEGORIES,
  WAREHOUSES,
  DELIVERY_MODES,
  SHIPPING_OPTIONS,
  calcPricing,
} from '../../../config/seller/productConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`;
}

function collectImages(media = {}) {
  const list = [];
  if (media.mainImage) list.push({ ...media.mainImage, label: 'Main' });
  (media.gallery || []).forEach((g, i) => list.push({ ...g, label: `Gallery ${i + 1}` }));
  if (media.thumbnail) list.push({ ...media.thumbnail, label: 'Thumbnail' });
  (media.lifestyle || []).forEach((g, i) => list.push({ ...g, label: `Lifestyle ${i + 1}` }));
  return list;
}

function ImageFrame({ image, className = '' }) {
  const hasUrl = image?.url && (image.url.startsWith('data:') || image.url.startsWith('http') || image.url.startsWith('blob:'));
  if (hasUrl) {
    return <img src={image.url} alt={image.name || 'Product'} className={`object-cover ${className}`} />;
  }
  // Seed / metadata-only image — show branded placeholder with filename
  if (image) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 ${className}`}>
        <div className="h-16 w-16 rounded-2xl bg-white/80 dark:bg-slate-900/60 shadow flex items-center justify-center mb-2">
          <span className="text-2xl font-bold text-emerald-600">{(image.name || 'P').charAt(0).toUpperCase()}</span>
        </div>
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-4 text-center line-clamp-2">
          {image.name || image.label || 'Product image'}
        </p>
      </div>
    );
  }
  return null;
}

export default function ProductPreview({ draft, onGoToImages }) {
  const [device, setDevice] = useState('desktop');
  const [activeIdx, setActiveIdx] = useState(0);

  const images = useMemo(() => collectImages(draft.media), [draft.media]);
  const activeImage = images[activeIdx] || null;

  const cat = PRODUCT_CATEGORIES.find((c) => c.id === draft.basic.category);
  const calc = calcPricing(draft.pricing);
  const stock = Number(draft.inventory.initialStock) || 0;
  const warehouse = WAREHOUSES.find((w) => w.id === draft.inventory.warehouse);

  const checklist = [
    { ok: images.length > 0, label: 'Images' },
    { ok: Number(draft.pricing.sellingPrice) > 0, label: 'Pricing' },
    { ok: !!draft.basic.hsn && draft.pricing.gstPct != null, label: 'GST / HSN' },
    { ok: draft.inventory.initialStock !== '', label: 'Stock' },
    { ok: (draft.delivery.modes || []).length > 0, label: 'Delivery' },
    { ok: !!draft.basic.category && !!draft.basic.subCategory, label: 'Category' },
    { ok: !!(draft.description.short || draft.description.seoKeywords), label: 'SEO / Description' },
  ];

  const widthClass =
    device === 'mobile' ? 'max-w-[340px]' : device === 'tablet' ? 'max-w-[560px]' : 'max-w-full';

  return (
    <div className="space-y-4 w-full min-w-0 overflow-x-hidden">
      <SectionCard number={8} title="Customer Product Preview">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            ['desktop', Monitor, 'Desktop'],
            ['tablet', Tablet, 'Tablet'],
            ['mobile', Smartphone, 'Mobile'],
          ].map(([id, Icon, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                device === id
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        <div className={`mx-auto ${widthClass} w-full rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-950 shadow-sm`}>
          {/* Image gallery */}
          <div className="bg-slate-50 dark:bg-slate-900">
            <div className="aspect-[4/3] w-full relative">
              {activeImage ? (
                <ImageFrame image={activeImage} className="absolute inset-0 h-full w-full" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400 p-6">
                  <ImageOff size={40} />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No Product Image Uploaded</p>
                  <p className="text-xs text-center">Upload images in Step 2 to show them here.</p>
                  {onGoToImages && (
                    <button
                      type="button"
                      onClick={onGoToImages}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white"
                    >
                      <Upload size={12} /> Go to Images
                    </button>
                  )}
                </div>
              )}
            </div>

            {images.length > 0 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={img.id || i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border-2 ${
                      i === activeIdx ? 'border-emerald-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                    aria-label={`View ${img.label || `image ${i + 1}`}`}
                  >
                    <ImageFrame image={img} className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details — marketplace style */}
          <div className="p-4 sm:p-5 space-y-4">
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                {cat?.label || 'Category'}
                {draft.basic.subCategory ? ` · ${draft.basic.subCategory}` : ''}
              </p>
              <h2 className="text-xl font-bold leading-snug mt-1 break-words">
                {draft.basic.name || 'Untitled product'}
              </h2>
              {draft.basic.shortName && (
                <p className="text-sm text-slate-500 mt-0.5">{draft.basic.shortName}</p>
              )}
              <div className="flex items-center gap-1 mt-2 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < 4 ? 'currentColor' : 'none'} />
                ))}
                <span className="text-xs text-slate-500 ml-1">(Preview rating)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-2">
              <span className="text-2xl font-bold text-emerald-600">{money(calc.offer || calc.selling)}</span>
              {calc.mrp > (calc.offer || calc.selling) && (
                <span className="text-sm text-slate-400 line-through">{money(calc.mrp)}</span>
              )}
              {calc.discountPct > 0 && (
                <span className="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded">
                  {calc.discountPct}% off
                </span>
              )}
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-b border-slate-100 dark:border-slate-800 py-3">
              {[
                ['Brand', draft.basic.brand || '—'],
                ['SKU', draft.basic.sku || '—'],
                ['Barcode', draft.basic.barcode || draft.basic.ean || '—'],
                ['HSN', draft.basic.hsn || '—'],
                ['GST', `${draft.pricing.gstPct ?? 0}%`],
                ['Stock', stock],
                ['MOQ', draft.pricing.moq || 1],
                ['Unit', draft.basic.unit || '—'],
                ['Warehouse', warehouse?.label || '—'],
                ['Condition', draft.basic.condition || 'new'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2 min-w-0">
                  <dt className="text-slate-500 shrink-0">{k}</dt>
                  <dd className="font-medium text-right truncate">{v}</dd>
                </div>
              ))}
            </dl>

            {draft.description.short && (
              <div>
                <h3 className="font-semibold text-sm mb-1">Description</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-words">
                  {draft.description.short}
                </p>
                {draft.description.long && (
                  <p className="text-sm text-slate-500 mt-2 whitespace-pre-wrap break-words line-clamp-6">
                    {draft.description.long}
                  </p>
                )}
              </div>
            )}

            {(draft.description.keyFeatures || []).filter(Boolean).length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-1">Key Features</h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-0.5">
                  {draft.description.keyFeatures.filter(Boolean).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {(draft.description.specifications || []).some((s) => s.key || s.value) && (
              <div>
                <h3 className="font-semibold text-sm mb-1">Specifications</h3>
                <dl className="text-sm space-y-1">
                  {draft.description.specifications.filter((s) => s.key || s.value).map((s) => (
                    <div key={s.key + s.value} className="flex justify-between gap-2 border-b border-slate-50 dark:border-slate-800 py-1">
                      <dt className="text-slate-500">{s.key || '—'}</dt>
                      <dd className="font-medium">{s.value || '—'}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {draft.variants?.enabled && draft.variants.items?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-1">Variants ({draft.variants.type})</h3>
                <div className="flex flex-wrap gap-1.5">
                  {draft.variants.items.map((v) => (
                    <span key={v.id} className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                      {v.value || v.sku} · {money(v.offerPrice || v.price)} · Qty {v.stock || 0}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-sm mb-1">Shipping</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Modes:{' '}
                {(draft.delivery.modes || [])
                  .map((m) => DELIVERY_MODES.find((d) => d.id === m)?.label || m)
                  .join(', ') || '—'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Options:{' '}
                {(draft.delivery.shipping || [])
                  .map((m) => SHIPPING_OPTIONS.find((d) => d.id === m)?.label || m)
                  .join(', ') || '—'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {[
                  draft.delivery.cod && 'COD',
                  draft.delivery.pickupAvailable && 'Pickup',
                  draft.delivery.returnAvailable && 'Returns',
                  draft.delivery.replacementAvailable && 'Replacement',
                ]
                  .filter(Boolean)
                  .join(' · ') || 'No extras'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3 text-sm">
              <p className="font-semibold">Seller Information</p>
              <p className="text-slate-500 text-xs mt-0.5">SAATHAPP Verified Partner · GST invoice available</p>
            </div>

            <button type="button" className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-bold">
              Add to Cart
            </button>
          </div>
        </div>
      </SectionCard>

      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6">
        <h4 className="font-bold text-sm mb-3">Final Checklist</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {checklist.map((c) => (
            <li
              key={c.label}
              className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${
                c.ok
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700'
              }`}
            >
              {c.ok ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              {c.label}
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 mt-3">
          Est. net earnings {money(calc.netEarnings)} · Images attached: {images.length}
        </p>
      </section>
    </div>
  );
}
