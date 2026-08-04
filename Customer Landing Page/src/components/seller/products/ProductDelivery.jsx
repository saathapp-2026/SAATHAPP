import React from 'react';
import { Field, TextInput, SectionCard } from './FormFields';
import { DELIVERY_MODES, SHIPPING_OPTIONS } from '../../../config/seller/productConstants';

function ChipToggle({ options, selected = [], onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = selected.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(active ? selected.filter((x) => x !== o.id) : [...selected, o.id])}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              active ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ProductDelivery({ value, errors = {}, onChange }) {
  const set = (key, val) => onChange({ ...value, [key]: val });

  return (
    <div className="space-y-4">
      <SectionCard number={7} title="Delivery & Shipping">
        {errors.modes && <p className="text-xs text-red-500">{errors.modes}</p>}
        <Field label="Delivery Modes">
          <ChipToggle options={DELIVERY_MODES} selected={value.modes} onChange={(modes) => set('modes', modes)} />
        </Field>
        <Field label="Shipping Options">
          <ChipToggle options={SHIPPING_OPTIONS} selected={value.shipping} onChange={(shipping) => set('shipping', shipping)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            ['cod', 'COD Available'],
            ['pickupAvailable', 'Pickup Available'],
            ['returnAvailable', 'Return Available'],
            ['replacementAvailable', 'Replacement Available'],
          ].map(([key, label]) => (
            <label key={key} className="inline-flex items-center gap-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2">
              <input type="checkbox" checked={!!value[key]} onChange={(e) => set(key, e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </SectionCard>

      <SectionCard number="7b" title="Visibility">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ['publish', 'Publish Now'],
            ['draft', 'Save Draft'],
            ['schedule', 'Schedule Publish'],
            ['hide', 'Hide Product'],
          ].map(([id, label]) => (
            <label key={id} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer ${value.visibility === id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-700'}`}>
              <input type="radio" name="visibility" checked={value.visibility === id} onChange={() => set('visibility', id)} />
              {label}
            </label>
          ))}
        </div>
        {value.visibility === 'schedule' && (
          <Field label="Publish At" className="mt-3 max-w-xs">
            <TextInput type="datetime-local" value={value.publishAt} onChange={(e) => set('publishAt', e.target.value)} />
          </Field>
        )}
      </SectionCard>
    </div>
  );
}
