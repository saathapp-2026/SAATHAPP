import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { AD_TYPES, AD_STATUSES, PLACEMENTS, OBJECTIVES } from '../../../config/seller/adConstants';

export default function AdFilters({ search, onSearch, filters, onChange, onReset }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm space-y-2">
      <div className="flex flex-col lg:flex-row gap-2">
        <label className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search ads by name..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent pl-9 pr-3 py-2.5 text-sm"
            aria-label="Search ads"
          />
        </label>
        <select
          value={filters.typeId || 'all'}
          onChange={(e) => onChange({ ...filters, typeId: e.target.value })}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All Types</option>
          {AD_TYPES.map((t) => (
            <option key={t.id} value={t.id}>{t.short}</option>
          ))}
        </select>
        <select
          value={filters.status || 'all'}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          {Object.values(AD_STATUSES).map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <select
          value={filters.placement || 'all'}
          onChange={(e) => onChange({ ...filters, placement: e.target.value })}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All Placements</option>
          {PLACEMENTS.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
        <select
          value={filters.objective || 'all'}
          onChange={(e) => onChange({ ...filters, objective: e.target.value })}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All Objectives</option>
          {OBJECTIVES.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <Filter size={12} /> Filters
        </span>
        <input
          type="number"
          placeholder="Min budget"
          value={filters.budgetMin || ''}
          onChange={(e) => onChange({ ...filters, budgetMin: e.target.value })}
          className="w-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs"
        />
        <input
          type="number"
          placeholder="Max budget"
          value={filters.budgetMax || ''}
          onChange={(e) => onChange({ ...filters, budgetMax: e.target.value })}
          className="w-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs"
        />
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs font-semibold"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>
    </div>
  );
}
