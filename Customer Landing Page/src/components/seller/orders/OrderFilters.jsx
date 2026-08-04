import React from 'react';
import { Filter, X, Calendar } from 'lucide-react';
import {
  DATE_FILTERS,
  STATUS_FILTER_OPTIONS,
  PAYMENT_FILTERS,
  DELIVERY_FILTERS,
  OTHER_FILTERS,
} from '../../../config/seller/orderConstants';

function ChipGroup({ label, options, selected, onToggle }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id)}
              aria-pressed={active}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                active
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderFilters({ filters, onChange, onReset }) {
  const toggle = (key, id) => {
    const list = filters[key] || [];
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    (filters.dateFilter && filters.dateFilter !== 'all' ? 1 : 0) +
    (filters.statuses?.length || 0) +
    (filters.paymentModes?.length || 0) +
    (filters.deliveryModes?.length || 0) +
    (filters.other?.length || 0);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" aria-hidden="true" />
          <h3 className="font-semibold text-sm">Filters</h3>
          {activeCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              {activeCount} active
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
          <Calendar size={12} /> Date
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DATE_FILTERS.map((opt) => {
            const active = filters.dateFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ ...filters, dateFilter: active ? 'all' : opt.id })}
                aria-pressed={active}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  active
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {filters.dateFilter === 'custom' && (
          <div className="mt-2 flex flex-wrap gap-2">
            <label className="text-xs text-slate-500">
              From
              <input
                type="date"
                value={filters.customRange?.from || ''}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    customRange: { ...filters.customRange, from: e.target.value },
                  })
                }
                className="ml-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
              />
            </label>
            <label className="text-xs text-slate-500">
              To
              <input
                type="date"
                value={filters.customRange?.to || ''}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    customRange: { ...filters.customRange, to: e.target.value },
                  })
                }
                className="ml-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs"
              />
            </label>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChipGroup label="Status" options={STATUS_FILTER_OPTIONS} selected={filters.statuses || []} onToggle={(id) => toggle('statuses', id)} />
        <ChipGroup label="Payment" options={PAYMENT_FILTERS} selected={filters.paymentModes || []} onToggle={(id) => toggle('paymentModes', id)} />
        <ChipGroup label="Delivery" options={DELIVERY_FILTERS} selected={filters.deliveryModes || []} onToggle={(id) => toggle('deliveryModes', id)} />
        <ChipGroup label="Other" options={OTHER_FILTERS} selected={filters.other || []} onToggle={(id) => toggle('other', id)} />
      </div>
    </div>
  );
}
