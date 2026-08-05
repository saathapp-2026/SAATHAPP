import React from 'react';
import { RefreshCw, Sparkles, ScanLine } from 'lucide-react';
import { Field, TextInput, TextSelect, SectionCard } from './FormFields';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
  GST_SLABS,
  UNITS,
} from '../../../config/seller/productConstants';

export default function ProductBasicInfo({
  value,
  errors = {},
  onChange,
  onGenerateSku,
  onSuggestCategory,
  suggesting,
}) {
  const set = (key, val) => onChange({ ...value, [key]: val });
  const category = PRODUCT_CATEGORIES.find((c) => c.id === value.category);

  return (
    <SectionCard number={1} title="Basic Information">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Product Name" required error={errors.name} className="sm:col-span-2">
          <TextInput
            value={value.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Fortune Sunflower Oil 15L Tin"
            aria-required="true"
          />
        </Field>
        <Field label="Product Short Name">
          <TextInput value={value.shortName} onChange={(e) => set('shortName', e.target.value)} placeholder="Short display name" />
        </Field>

        <Field label="SKU ID" required error={errors.sku}>
          <div className="flex gap-2">
            <TextInput
              value={value.sku}
              onChange={(e) => onChange({ ...value, sku: e.target.value, skuManual: true })}
              placeholder="Auto or manual"
              className="flex-1"
            />
            <button
              type="button"
              onClick={onGenerateSku}
              title="Auto generate SKU"
              className="h-9 w-9 shrink-0 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 inline-flex items-center justify-center"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </Field>

        <Field label="Category" required error={errors.category}>
          <div className="flex gap-2">
            <TextSelect
              value={value.category}
              onChange={(e) => onChange({ ...value, category: e.target.value, subCategory: '' })}
              className="flex-1"
            >
              <option value="">Select category</option>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </TextSelect>
            <button
              type="button"
              disabled={suggesting || !value.name}
              onClick={onSuggestCategory}
              title="AI category suggestion"
              className="h-9 px-2.5 shrink-0 rounded-lg border border-violet-200 text-violet-600 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30 inline-flex items-center gap-1 text-xs font-semibold disabled:opacity-40"
            >
              <Sparkles size={12} /> AI
            </button>
          </div>
        </Field>

        <Field label="Sub Category" required error={errors.subCategory}>
          <TextSelect value={value.subCategory} onChange={(e) => set('subCategory', e.target.value)}>
            <option value="">Select sub category</option>
            {(category?.sub || []).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </TextSelect>
        </Field>

        <Field label="Brand Name">
          <TextInput value={value.brand} onChange={(e) => set('brand', e.target.value)} placeholder="Brand" />
        </Field>
        <Field label="Manufacturer">
          <TextInput value={value.manufacturer} onChange={(e) => set('manufacturer', e.target.value)} />
        </Field>
        <Field label="Model / Variant">
          <TextInput value={value.modelNumber} onChange={(e) => set('modelNumber', e.target.value)} />
        </Field>

        <Field label="HSN Code" required error={errors.hsn}>
          <TextInput value={value.hsn} onChange={(e) => set('hsn', e.target.value)} placeholder="4/6/8 digits" />
        </Field>
        <Field label="Barcode (EAN/UPC)" error={errors.barcode}>
          <div className="flex gap-2">
            <TextInput value={value.barcode} onChange={(e) => set('barcode', e.target.value)} className="flex-1" />
            <button type="button" className="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700 inline-flex items-center justify-center" title="Scan">
              <ScanLine size={14} />
            </button>
          </div>
        </Field>
        <Field label="UPC" error={errors.upc}>
          <TextInput value={value.upc} onChange={(e) => set('upc', e.target.value)} placeholder="12 digits" />
        </Field>
        <Field label="EAN" error={errors.ean}>
          <TextInput value={value.ean} onChange={(e) => set('ean', e.target.value)} placeholder="8 or 13 digits" />
        </Field>
        <Field label="Country of Origin">
          <TextInput value={value.countryOfOrigin} onChange={(e) => set('countryOfOrigin', e.target.value)} />
        </Field>
        <Field label="Product Condition">
          <TextSelect value={value.condition} onChange={(e) => set('condition', e.target.value)}>
            {PRODUCT_CONDITIONS.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </TextSelect>
        </Field>
        <Field label="Tax Slab (GST)" required>
          <TextSelect value={value.taxSlab} onChange={(e) => set('taxSlab', Number(e.target.value))}>
            {GST_SLABS.map((g) => (
              <option key={g} value={g}>{g}%</option>
            ))}
          </TextSelect>
        </Field>
        <Field label="Unit">
          <TextSelect value={value.unit} onChange={(e) => set('unit', e.target.value)}>
            {UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </TextSelect>
        </Field>
      </div>
    </SectionCard>
  );
}
