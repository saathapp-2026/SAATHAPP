import React, { useMemo } from 'react';
import { Field, TextInput, TextSelect, SectionCard } from './FormFields';
import { GST_SLABS, calcPricing } from '../../../config/seller/productConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export default function ProductPricing({ value, errors = {}, onChange }) {
  const set = (key, val) => {
    const next = { ...value, [key]: val };
    if (key === 'mrp' || key === 'offerPrice' || key === 'sellingPrice') {
      const mrp = Number(key === 'mrp' ? val : next.mrp) || 0;
      const offer = Number(key === 'offerPrice' ? val : next.offerPrice || next.sellingPrice) || 0;
      if (mrp > 0 && offer > 0) next.discountPct = Math.round(((mrp - offer) / mrp) * 10000) / 100;
    }
    onChange(next);
  };

  const calc = useMemo(() => calcPricing(value), [value]);

  return (
    <div className="space-y-4">
      <SectionCard number={4} title="Pricing">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <Field label="MRP (₹)" required error={errors.mrp}>
            <TextInput type="number" min="0" value={value.mrp} onChange={(e) => set('mrp', e.target.value)} />
          </Field>
          <Field label="Selling Price (₹)" required error={errors.sellingPrice}>
            <TextInput type="number" min="0" value={value.sellingPrice} onChange={(e) => set('sellingPrice', e.target.value)} />
          </Field>
          <Field label="Offer Price (₹)" error={errors.offerPrice}>
            <TextInput type="number" min="0" value={value.offerPrice} onChange={(e) => set('offerPrice', e.target.value)} />
          </Field>
          <Field label="Wholesale Price (₹)">
            <TextInput type="number" min="0" value={value.wholesalePrice} onChange={(e) => set('wholesalePrice', e.target.value)} />
          </Field>
          <Field label="Discount (%)">
            <TextInput type="number" value={value.discountPct || calc.discountPct} readOnly className="bg-slate-50 dark:bg-slate-900" />
          </Field>
          <Field label="GST %">
            <TextSelect value={value.gstPct} onChange={(e) => set('gstPct', Number(e.target.value))}>
              {GST_SLABS.map((g) => (
                <option key={g} value={g}>{g}%</option>
              ))}
            </TextSelect>
          </Field>
          <Field label="Packaging Charges (₹)">
            <TextInput type="number" min="0" value={value.packagingCharges} onChange={(e) => set('packagingCharges', e.target.value)} />
          </Field>
          <Field label="Min Order Qty (MOQ)">
            <TextInput type="number" min="1" value={value.moq} onChange={(e) => set('moq', e.target.value)} />
          </Field>
          <Field label="Max Order Qty">
            <TextInput type="number" min="1" value={value.maxOrderQty} onChange={(e) => set('maxOrderQty', e.target.value)} />
          </Field>
        </div>

        <label className="inline-flex items-center gap-2 text-sm mt-1">
          <input
            type="checkbox"
            checked={!!value.taxInclusive}
            onChange={(e) => set('taxInclusive', e.target.checked)}
            className="rounded border-slate-300"
          />
          Tax inclusive pricing
        </label>
      </SectionCard>

      <section className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 p-4">
        <h4 className="font-bold text-sm mb-3">Live Pricing Calculator</h4>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            ['MRP', money(calc.mrp)],
            ['Selling / Offer', money(calc.offer || calc.selling)],
            ['Discount', `${calc.discountPct}%`],
            ['GST Amount', money(calc.gstAmount)],
            ['Commission (5%)', money(calc.commission)],
            ['Platform Fee', money(calc.platformFee)],
            ['Net Earnings', money(calc.netEarnings)],
            ['Profit Margin', `${calc.profitMargin}%`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900 p-2.5">
              <dt className="text-[11px] text-slate-500">{k}</dt>
              <dd className="font-bold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
