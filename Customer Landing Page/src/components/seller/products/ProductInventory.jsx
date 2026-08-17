import React from 'react';
import { Field, TextInput, TextSelect, SectionCard } from './FormFields';
import { WAREHOUSES } from '../../../config/seller/productConstants';

export default function ProductInventory({ value, errors = {}, onChange, sku }) {
  const set = (key, val) => onChange({ ...value, [key]: val });
  const stock = Number(value.initialStock) || 0;
  const reserved = Number(value.reservedStock) || 0;
  const available = Math.max(0, stock - reserved);
  const low = stock > 0 && stock <= Number(value.minStockAlert || 10);

  return (
    <div className="space-y-4">
      <SectionCard number={5} title="Inventory Management">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Initial Stock" required error={errors.initialStock}>
            <TextInput type="number" min="0" value={value.initialStock} onChange={(e) => set('initialStock', e.target.value)} />
          </Field>
          <Field label="Warehouse" required error={errors.warehouse}>
            <TextSelect value={value.warehouse} onChange={(e) => set('warehouse', e.target.value)}>
              {WAREHOUSES.map((w) => (
                <option key={w.id} value={w.id}>{w.label}</option>
              ))}
            </TextSelect>
          </Field>
          <Field label="Shelf Location">
            <TextInput value={value.shelfLocation} onChange={(e) => set('shelfLocation', e.target.value)} placeholder="A-12-03" />
          </Field>
          <Field label="SKU">
            <TextInput value={sku || ''} readOnly className="bg-page dark:bg-slate-900" />
          </Field>
          <Field label="Minimum Stock Alert">
            <TextInput type="number" min="0" value={value.minStockAlert} onChange={(e) => set('minStockAlert', e.target.value)} />
          </Field>
          <Field label="Maximum Stock">
            <TextInput type="number" min="0" value={value.maxStock} onChange={(e) => set('maxStock', e.target.value)} />
          </Field>
          <Field label="Reserved Stock" className="sm:col-span-2">
            <TextInput type="number" min="0" value={value.reservedStock} onChange={(e) => set('reservedStock', e.target.value)} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard number="5b" title="Package Dimensions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Weight (kg)">
            <TextInput type="number" min="0" step="0.01" value={value.weight} onChange={(e) => set('weight', e.target.value)} />
          </Field>
          <Field label="Length (cm)">
            <TextInput type="number" min="0" value={value.length} onChange={(e) => set('length', e.target.value)} />
          </Field>
          <Field label="Width (cm)">
            <TextInput type="number" min="0" value={value.width} onChange={(e) => set('width', e.target.value)} />
          </Field>
          <Field label="Height (cm)">
            <TextInput type="number" min="0" value={value.height} onChange={(e) => set('height', e.target.value)} />
          </Field>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ['Current Stock', stock],
          ['Available', available],
          ['Reserved', reserved],
          ['Status', low ? 'Low Stock' : stock <= 0 ? 'Out of Stock' : 'In Stock'],
        ].map(([k, v]) => (
          <div key={k} className={`rounded-xl border p-3 ${low || stock <= 0 ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-800 bg-surface'}`}>
            <p className="text-[11px] text-slate-500">{k}</p>
            <p className="font-bold">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
