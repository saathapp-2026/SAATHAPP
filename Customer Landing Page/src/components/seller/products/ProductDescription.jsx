import React from 'react';
import { Sparkles } from 'lucide-react';
import { Field, TextInput, TextTextarea, SectionCard } from './FormFields';

const AI_ACTIONS = [
  { id: 'generate', label: 'Generate' },
  { id: 'rewrite', label: 'Rewrite' },
  { id: 'translate', label: 'Translate' },
  { id: 'seo', label: 'SEO Optimize' },
  { id: 'grammar', label: 'Grammar' },
  { id: 'keywords', label: 'Keywords' },
];

export default function ProductDescription({ value, errors = {}, onChange, onAiAction, aiLoading }) {
  const set = (key, val) => onChange({ ...value, [key]: val });

  return (
    <SectionCard number={3} title="Description">
      <div className="flex flex-wrap gap-1.5 mb-2">
        {AI_ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            disabled={!!aiLoading}
            onClick={() => onAiAction?.(a.id)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 disabled:opacity-40"
          >
            <Sparkles size={10} /> {aiLoading === a.id ? '…' : a.label}
          </button>
        ))}
      </div>

      <Field label="Short Description" required error={errors.short} hint={`${(value.short || '').length}/150`}>
        <TextTextarea
          rows={3}
          maxLength={150}
          value={value.short}
          onChange={(e) => set('short', e.target.value)}
          placeholder="Brief product pitch for listings"
        />
      </Field>

      <Field label="Full Description (Optional)" hint={`${(value.long || '').length}/1000`}>
        <TextTextarea
          rows={5}
          maxLength={1000}
          value={value.long}
          onChange={(e) => set('long', e.target.value)}
          placeholder="Detailed product description"
        />
      </Field>

      <Field label="Key Features">
        <div className="space-y-2">
          {(value.keyFeatures || ['']).map((f, i) => (
            <div key={i} className="flex gap-2">
              <TextInput
                value={f}
                onChange={(e) => {
                  const next = [...value.keyFeatures];
                  next[i] = e.target.value;
                  set('keyFeatures', next);
                }}
                placeholder={`Feature ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => set('keyFeatures', value.keyFeatures.filter((_, idx) => idx !== i))}
                className="px-2 text-xs text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set('keyFeatures', [...(value.keyFeatures || []), ''])}
            className="text-xs font-semibold text-emerald-600"
          >
            + Add feature
          </button>
        </div>
      </Field>

      <Field label="Specifications">
        <div className="space-y-2">
          {(value.specifications || [{ key: '', value: '' }]).map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <TextInput
                value={row.key}
                placeholder="Spec name"
                onChange={(e) => {
                  const next = [...value.specifications];
                  next[i] = { ...next[i], key: e.target.value };
                  set('specifications', next);
                }}
              />
              <TextInput
                value={row.value}
                placeholder="Value"
                onChange={(e) => {
                  const next = [...value.specifications];
                  next[i] = { ...next[i], value: e.target.value };
                  set('specifications', next);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => set('specifications', [...(value.specifications || []), { key: '', value: '' }])}
            className="text-xs font-semibold text-emerald-600"
          >
            + Add specification
          </button>
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Box Contents">
          <TextTextarea rows={2} value={value.boxContents} onChange={(e) => set('boxContents', e.target.value)} />
        </Field>
        <Field label="Warranty">
          <TextInput value={value.warranty} onChange={(e) => set('warranty', e.target.value)} />
        </Field>
        <Field label="Return Policy">
          <TextInput value={value.returnPolicy} onChange={(e) => set('returnPolicy', e.target.value)} />
        </Field>
        <Field label="Care Instructions">
          <TextInput value={value.careInstructions} onChange={(e) => set('careInstructions', e.target.value)} />
        </Field>
      </div>
    </SectionCard>
  );
}
