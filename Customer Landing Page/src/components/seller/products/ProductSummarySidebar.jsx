import React, { useMemo } from 'react';
import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_COLORS,
  WAREHOUSES,
  QUICK_TIPS,
  calcPricing,
} from '../../../config/seller/productConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export default function ProductSummarySidebar({ draft, errors = {} }) {
  const calc = useMemo(() => calcPricing(draft.pricing || {}), [draft.pricing]);
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === draft.basic?.category);
  const status = draft.status || 'draft';
  const colors = PRODUCT_STATUS_COLORS[status] || PRODUCT_STATUS_COLORS.draft;
  const stock = Number(draft.inventory?.initialStock) || 0;
  const low = stock > 0 && stock <= Number(draft.inventory?.minStockAlert || 10);

  const warnings = [];
  if (!draft.media?.mainImage) warnings.push('Missing main image');
  if (!draft.basic?.hsn) warnings.push('Missing HSN');
  if (draft.pricing?.gstPct == null) warnings.push('Missing GST');
  if (low) warnings.push('Low stock');
  if (stock <= 0 && draft.inventory?.initialStock !== '') warnings.push('Out of stock');
  Object.values(errors).forEach((e) => e && warnings.push(e));

  return (
    <aside className="space-y-3 sticky top-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
          {draft.media?.mainImage?.url?.startsWith('data:') ? (
            <img src={draft.media.mainImage.url} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-slate-400 px-4 text-center">{draft.basic?.name || 'Product preview'}</span>
          )}
        </div>
        <div className="p-3.5 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm leading-snug line-clamp-2">{draft.basic?.name || 'Untitled product'}</h3>
            <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
              {PRODUCT_STATUS_LABELS[status]}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">SKU: {draft.basic?.sku || '—'}</p>
          <dl className="text-xs space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
            {[
              ['Category', cat?.label || '—'],
              ['Sub Category', draft.basic?.subCategory || '—'],
              ['HSN', draft.basic?.hsn || '—'],
              ['GST', `${draft.pricing?.gstPct ?? draft.basic?.taxSlab ?? 0}%`],
              ['Unit', draft.basic?.unit || '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2">
                <dt className="text-slate-500">{k}</dt>
                <dd className="font-medium text-right truncate">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5">
        <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 mb-2">Stock & Pricing</h4>
        <dl className="text-xs space-y-1.5">
          {[
            ['Wholesale', money(draft.pricing?.wholesalePrice || calc.offer)],
            ['MRP', money(calc.mrp)],
            ['Discount', `${calc.discountPct}%`],
            ['Offer Price', money(calc.offer || calc.selling)],
            ['MOQ', draft.pricing?.moq || 1],
            ['Initial Stock', stock],
            ['Warehouse', WAREHOUSES.find((w) => w.id === draft.inventory?.warehouse)?.label?.split('—')[0] || '—'],
            ['Est. Earnings', money(calc.netEarnings)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2">
              <dt className="text-slate-500">{k}</dt>
              <dd className="font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <span className={`inline-flex mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          stock <= 0 ? 'bg-red-100 text-red-700' : low ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          Stock Status: {stock <= 0 ? 'Out of Stock' : low ? 'Low Stock' : 'In Stock'}
        </span>
      </div>

      {warnings.length > 0 ? (
        <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-3.5">
          <h4 className="font-bold text-xs text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1">
            <AlertTriangle size={12} /> Warnings
          </h4>
          <ul className="space-y-1">
            {[...new Set(warnings)].slice(0, 6).map((w) => (
              <li key={w} className="text-[11px] text-amber-800 dark:text-amber-200">• {w}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 p-3 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 size={14} /> Looking good — keep going
        </div>
      )}

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5">
        <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 mb-2 flex items-center gap-1">
          <Lightbulb size={12} /> Quick Tips
        </h4>
        <ul className="space-y-1.5">
          {QUICK_TIPS.map((tip) => (
            <li key={tip} className="text-[11px] text-slate-600 dark:text-slate-300 flex gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
