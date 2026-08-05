import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { DOC_CATEGORIES, DOC_STATUSES, EXPIRY_BADGES } from '../../../config/seller/documentConstants';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: DOC_STATUSES.DRAFT, label: 'Draft' },
  { value: DOC_STATUSES.UPLOADED, label: 'Uploaded' },
  { value: DOC_STATUSES.PENDING, label: 'Pending' },
  { value: DOC_STATUSES.UNDER_REVIEW, label: 'Under Verification' },
  { value: DOC_STATUSES.VERIFIED, label: 'Verified' },
  { value: DOC_STATUSES.REJECTED, label: 'Rejected' },
  { value: DOC_STATUSES.EXPIRED, label: 'Expired' },
];

export default function DocumentFilters({
  search,
  onSearch,
  filters,
  onChange,
  onReset,
}) {
  const category = DOC_CATEGORIES.find((c) => c.id === filters.categoryId);
  const types = category?.types || DOC_CATEGORIES.flatMap((c) => c.types);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search name, number, GSTIN, PAN, Aadhaar, category…"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Search documents"
          />
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <X size={14} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
        <label className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <span className="inline-flex items-center gap-1">
            <Filter size={12} /> Category
          </span>
          <select
            value={filters.categoryId}
            onChange={(e) => onChange({ ...filters, categoryId: e.target.value, typeId: 'all' })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
          >
            <option value="all">All categories</option>
            {DOC_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <span>Document type</span>
          <select
            value={filters.typeId}
            onChange={(e) => onChange({ ...filters, typeId: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
          >
            <option value="all">All types</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <span>Status</span>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <span>Expiry</span>
          <select
            value={filters.expiry}
            onChange={(e) => onChange({ ...filters, expiry: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
          >
            <option value="all">All expiry states</option>
            {Object.entries(EXPIRY_BADGES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <span>From</span>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-2 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <span>To</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-2 text-sm"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
