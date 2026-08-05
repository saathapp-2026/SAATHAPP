import React from 'react';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES, ALL_PROMO_TYPES, PROMO_STATUSES } from '../../../config/seller/couponConstants';

const KINDS = [
  { id: 'all', label: 'All' },
  { id: 'coupon', label: 'Coupons' },
  { id: 'campaign', label: 'Campaigns' },
  { id: 'ad', label: 'Ads' },
  { id: 'banner', label: 'Banners' },
  { id: 'poster', label: 'Posters' },
  { id: 'sponsored', label: 'Sponsored' },
];

const STATUSES = [
  { id: 'all', label: 'All Status' },
  ...Object.values(PROMO_STATUSES).map((s) => ({ id: s, label: s.charAt(0).toUpperCase() + s.slice(1) })),
];

export default function CouponFilters({
  search,
  onSearch,
  filters,
  onChange,
  counts = {},
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search code, name, campaign, product…"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2.5 text-sm"
            aria-label="Search promotions"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <select
            value={filters.status || 'all'}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <select
            value={filters.typeId || 'all'}
            onChange={(e) => onChange({ ...filters, typeId: e.target.value })}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm max-w-[180px]"
          >
            <option value="all">All Types</option>
            {ALL_PROMO_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          <select
            value={filters.category || ''}
            onChange={(e) => onChange({ ...filters, category: e.target.value || undefined })}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Filter size={13} className="text-slate-400 mr-1" />
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => onChange({ ...filters, kind: k.id })}
            className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
              (filters.kind || 'all') === k.id
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {k.label}
            {counts[k.id] != null ? ` (${counts[k.id]})` : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
