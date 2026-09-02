import React from 'react';
import { Copy, Trash2, Plus } from 'lucide-react';
import { Field, TextInput, TextSelect, SectionCard } from './FormFields';
import { VARIANT_TYPES, generateSku } from '../../../config/seller/productConstants';

function emptyVariant(type, baseSku) {
  return {
    id: `var_${Date.now()}_${Math.random()}`,
    type,
    value: '',
    sku: generateSku(baseSku || 'VAR'),
    price: '',
    offerPrice: '',
    stock: '',
    barcode: '',
    weight: '',
    image: null,
  };
}

export default function ProductVariants({ value, errors = {}, onChange, baseSku }) {
  const setEnabled = (enabled) => onChange({ ...value, enabled, items: enabled ? value.items?.length ? value.items : [emptyVariant(value.type, baseSku)] : [] });

  const updateItem = (id, patch) => {
    onChange({
      ...value,
      items: value.items.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    });
  };

  const bulkGenerate = () => {
    const presets = value.type === 'Size'
      ? ['S', 'M', 'L', 'XL']
      : value.type === 'Color'
        ? ['Red', 'Blue', 'Green', 'Black']
        : ['Option 1', 'Option 2', 'Option 3'];
    onChange({
      ...value,
      enabled: true,
      items: presets.map((p) => ({ ...emptyVariant(value.type, baseSku), value: p, sku: `${baseSku || 'SKU'}-${p}` })),
    });
  };

  return (
    <SectionCard number={6} title="Product Variants">
      {errors.variants && <p className="text-xs text-red-500" role="alert">{errors.variants}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm font-medium">
          <input type="radio" checked={!value.enabled} onChange={() => setEnabled(false)} />
          Single Product
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-medium">
          <input type="radio" checked={!!value.enabled} onChange={() => setEnabled(true)} />
          Multiple Variants
        </label>
      </div>

      {value.enabled && (
        <>
          <div className="flex flex-wrap gap-2 items-end">
            <Field label="Variant Type" className="min-w-[160px]">
              <TextSelect value={value.type} onChange={(e) => onChange({ ...value, type: e.target.value })}>
                {VARIANT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </TextSelect>
            </Field>
            <button type="button" onClick={bulkGenerate} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-page">
              Bulk Variant Generator
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...value, items: [...value.items, emptyVariant(value.type, baseSku)] })}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-white"
            >
              <Plus size={12} /> Add Variant
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-page text-xs text-slate-500">
                <tr>
                  <th className="px-3 py-2 text-left">{value.type}</th>
                  <th className="px-3 py-2 text-left">SKU</th>
                  <th className="px-3 py-2 text-left">Price</th>
                  <th className="px-3 py-2 text-left">Offer</th>
                  <th className="px-3 py-2 text-left">Stock</th>
                  <th className="px-3 py-2 text-left">Barcode</th>
                  <th className="px-3 py-2 text-left">Weight</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {value.items.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-emerald-50/30 border-t border-slate-100 dark:border-slate-800">
                    <td className="px-3 py-2"><TextInput value={item.value} onChange={(e) => updateItem(item.id, { value: e.target.value })} /></td>
                    <td className="px-3 py-2"><TextInput value={item.sku} onChange={(e) => updateItem(item.id, { sku: e.target.value })} /></td>
                    <td className="px-3 py-2"><TextInput type="number" value={item.price} onChange={(e) => updateItem(item.id, { price: e.target.value })} /></td>
                    <td className="px-3 py-2"><TextInput type="number" value={item.offerPrice} onChange={(e) => updateItem(item.id, { offerPrice: e.target.value })} /></td>
                    <td className="px-3 py-2"><TextInput type="number" value={item.stock} onChange={(e) => updateItem(item.id, { stock: e.target.value })} /></td>
                    <td className="px-3 py-2"><TextInput value={item.barcode} onChange={(e) => updateItem(item.id, { barcode: e.target.value })} /></td>
                    <td className="px-3 py-2"><TextInput type="number" value={item.weight} onChange={(e) => updateItem(item.id, { weight: e.target.value })} /></td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          title="Duplicate"
                          onClick={() => onChange({ ...value, items: [...value.items, { ...item, id: `var_${Date.now()}`, sku: generateSku(item.sku) }] })}
                          className="h-7 w-7 rounded-lg border border-slate-200 inline-flex items-center justify-center"
                        >
                          <Copy size={12} />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => onChange({ ...value, items: value.items.filter((v) => v.id !== item.id) })}
                          className="h-7 w-7 rounded-lg border border-red-200 text-red-500 inline-flex items-center justify-center"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </SectionCard>
  );
}
