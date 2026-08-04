import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SectionCard } from './FormFields';
import { PRODUCT_CATEGORIES, WAREHOUSES, calcPricing } from '../../../config/seller/productConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`;
}

export default function ProductPreview({ draft }) {
  const [device, setDevice] = useState('desktop');
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === draft.basic.category);
  const calc = calcPricing(draft.pricing);
  const stock = Number(draft.inventory.initialStock) || 0;

  const checklist = [
    { ok: !!draft.media.mainImage, label: 'Images' },
    { ok: Number(draft.pricing.sellingPrice) > 0, label: 'Pricing' },
    { ok: !!draft.basic.hsn && draft.pricing.gstPct != null, label: 'GST / HSN' },
    { ok: draft.inventory.initialStock !== '', label: 'Stock' },
    { ok: (draft.delivery.modes || []).length > 0, label: 'Delivery' },
    { ok: !!draft.basic.category && !!draft.basic.subCategory, label: 'Category' },
    { ok: !!(draft.description.short || draft.description.seoKeywords), label: 'SEO / Description' },
  ];

  const widthClass = device === 'mobile' ? 'max-w-[320px]' : device === 'tablet' ? 'max-w-[520px]' : 'max-w-2xl';

  return (
    <div className="space-y-4">
      <SectionCard number={8} title="Preview & Publish Checklist">
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
                device === id ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        <div className={`mx-auto ${widthClass} rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-950 shadow-sm`}>
          <div className="aspect-[16/10] bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
            {draft.media.mainImage?.url?.startsWith('data:') ? (
              <img src={draft.media.mainImage.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-slate-500">{draft.basic.name || 'Product image'}</span>
            )}
          </div>
          <div className="p-4 space-y-2">
            <p className="text-xs text-emerald-600 font-semibold uppercase">{cat?.label || 'Category'}</p>
            <h3 className="font-bold text-lg leading-snug">{draft.basic.name || 'Untitled product'}</h3>
            <p className="text-sm text-slate-500 line-clamp-2">{draft.description.short || 'No description yet'}</p>
            <div className="flex items-end gap-2 pt-1">
              <span className="text-xl font-bold text-emerald-600">{money(calc.offer || calc.selling)}</span>
              {calc.mrp > (calc.offer || calc.selling) && (
                <span className="text-sm text-slate-400 line-through">{money(calc.mrp)}</span>
              )}
              {calc.discountPct > 0 && (
                <span className="text-xs font-semibold text-orange-600">{calc.discountPct}% off</span>
              )}
            </div>
            <p className="text-xs text-slate-500">MOQ {draft.pricing.moq || 1} · Stock {stock} · SKU {draft.basic.sku || '—'}</p>
            <button type="button" className="w-full mt-2 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-bold">
              Add to Cart
            </button>
          </div>
        </div>
      </SectionCard>

      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h4 className="font-bold text-sm mb-3">Final Checklist</h4>
        <ul className="grid sm:grid-cols-2 gap-2">
          {checklist.map((c) => (
            <li key={c.label} className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${c.ok ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700'}`}>
              {c.ok ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              {c.label}
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 mt-3">
          Warehouse: {WAREHOUSES.find((w) => w.id === draft.inventory.warehouse)?.label || '—'} · Est. net {money(calc.netEarnings)}
        </p>
      </section>
    </div>
  );
}
