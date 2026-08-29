import React, { useState } from 'react';
import { Search, Filter, RotateCcw, ChevronDown, X } from 'lucide-react';
import {
  DATE_FILTERS,
  STATUS_FILTER_OPTIONS,
  PAYMENT_FILTERS,
  DELIVERY_FILTERS,
  OTHER_FILTERS,
} from '../../../config/seller/orderConstants';

const STATUS_PILLS = [
  { id: 'all', label: 'All' },
  ...STATUS_FILTER_OPTIONS,
];

function Select({ label, value, options, onChange, allLabel }) {
  return (
    <label className="relative min-w-[120px]">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg border border-slate-200 bg-surface text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
    </label>
  );
}

export default function OrderFilters({
  filters,
  search,
  onSearchChange,
  onChange,
  onReset,
  statusCounts = {},
}) {
  const [showMore, setShowMore] = useState(false);
  const activeStatus = filters.statuses?.length === 1 ? filters.statuses[0] : 'all';

  const setStatusPill = (id) => {
    onChange({
      ...filters,
      statuses: id === 'all' ? [] : [id],
    });
  };

  return (
    <div className="space-y-3">
      {/* Compact toolbar */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-3 flex flex-col xl:flex-row gap-2.5 xl:items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Order ID, Customer, Phone or Product…"
            aria-label="Search orders"
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-200 bg-page dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {search && (
            <button type="button" onClick={() => onSearchChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Select
            label="Date Range"
            value={filters.dateFilter === 'all' ? '' : filters.dateFilter}
            options={DATE_FILTERS}
            allLabel="Date Range"
            onChange={(v) => onChange({ ...filters, dateFilter: v || 'all' })}
          />
          <Select
            label="Order Status"
            value={filters.statuses?.[0] || ''}
            options={STATUS_FILTER_OPTIONS}
            allLabel="All Status"
            onChange={(v) => onChange({ ...filters, statuses: v ? [v] : [] })}
          />
          <Select
            label="Payment Mode"
            value={filters.paymentModes?.[0] || ''}
            options={PAYMENT_FILTERS}
            allLabel="Payment"
            onChange={(v) => onChange({ ...filters, paymentModes: v ? [v] : [] })}
          />
          <Select
            label="Delivery Mode"
            value={filters.deliveryModes?.[0] || ''}
            options={DELIVERY_FILTERS}
            allLabel="Delivery"
            onChange={(v) => onChange({ ...filters, deliveryModes: v ? [v] : [] })}
          />

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
              showMore
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                : 'border-slate-200 hover:bg-page'
            }`}
          >
            <Filter size={14} /> Filters
          </button>
          <button
            type="button"
            onClick={onReset}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-page"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      {filters.dateFilter === 'custom' && (
        <div className="flex flex-wrap gap-2 px-1">
          <input
            type="date"
            value={filters.customRange?.from || ''}
            onChange={(e) => onChange({ ...filters, customRange: { ...filters.customRange, from: e.target.value } })}
            className="px-2 py-1.5 rounded-lg border border-slate-200 text-sm bg-surface"
          />
          <input
            type="date"
            value={filters.customRange?.to || ''}
            onChange={(e) => onChange({ ...filters, customRange: { ...filters.customRange, to: e.target.value } })}
            className="px-2 py-1.5 rounded-lg border border-slate-200 text-sm bg-surface"
          />
        </div>
      )}

      {showMore && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-3">
          <p className="text-xs font-semibold text-slate-500 mb-2">More filters</p>
          <div className="flex flex-wrap gap-1.5">
            {OTHER_FILTERS.map((opt) => {
              const active = (filters.other || []).includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    const list = filters.other || [];
                    onChange({
                      ...filters,
                      other: active ? list.filter((x) => x !== opt.id) : [...list, opt.id],
                    });
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    active
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Status pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin" role="tablist" aria-label="Order status">
        {STATUS_PILLS.map((pill) => {
          const active = activeStatus === pill.id || (pill.id === 'all' && !filters.statuses?.length);
          const count = pill.id === 'all'
            ? Object.values(statusCounts).reduce((a, b) => a + b, 0) || undefined
            : statusCounts[pill.id];
          return (
            <button
              key={pill.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setStatusPill(pill.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                active
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-surface text-slate-600 dark:text-slate-300 border border-slate-200 hover:bg-page'
              }`}
            >
              {pill.label}
              {count != null && count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/25' : 'bg-page'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
