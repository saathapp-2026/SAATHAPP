import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

function highlight(text, query) {
  if (!query || !text) return text;
  const idx = String(text).toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text;
  const before = String(text).slice(0, idx);
  const match = String(text).slice(idx, idx + query.length);
  const after = String(text).slice(idx + query.length);
  return (
    <>
      {before}
      <mark className="bg-amber-200 dark:bg-amber-700/60 text-inherit rounded px-0.5">{match}</mark>
      {after}
    </>
  );
}

export { highlight };

export default function OrderSearch({ value, onChange, debounceMs = 300 }) {
  const [local, setLocal] = useState(value || '');

  useEffect(() => {
    setLocal(value || '');
  }, [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== value) onChange?.(local);
    }, debounceMs);
    return () => clearTimeout(t);
    // intentionally omit onChange to avoid re-debounce loops from inline handlers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local, debounceMs, value]);

  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search Order ID, customer, phone, product, SKU, invoice…"
        aria-label="Search orders"
        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {local && (
        <button
          type="button"
          onClick={() => {
            setLocal('');
            onChange('');
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
