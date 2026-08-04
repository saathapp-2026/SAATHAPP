import React, { useState } from 'react';
import { Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import CustomerSearch from './CustomerSearch';
import { CITIES, STATES, QUICK_FILTER_TABS, DATE_RANGE_OPTIONS } from '../../../config/seller/customerConstants';

export default function CustomerFilters({
  filters,
  search,
  onSearchChange,
  onChange,
  onReset,
  counts = {},
}) {
  const [advanced, setAdvanced] = useState(false);
  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 space-y-3">
      <div className="flex flex-col lg:flex-row gap-2.5">
        <CustomerSearch value={search} onChange={onSearchChange} />
        <select
          value={filters.dateRange || 'this_month'}
          onChange={(e) => set({ dateRange: e.target.value })}
          aria-label="Date range"
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm min-w-[140px]"
        >
          <option value="all">All Dates</option>
          {DATE_RANGE_OPTIONS.map((d) => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
        <select
          value={filters.status || 'all'}
          onChange={(e) => set({ status: e.target.value === 'all' ? undefined : e.target.value, quickTab: 'all' })}
          aria-label="Status"
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm min-w-[120px]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
          <option value="deleted">Deleted</option>
        </select>
        <select
          value={filters.type || 'all'}
          onChange={(e) => set({ type: e.target.value === 'all' ? undefined : e.target.value, quickTab: 'all' })}
          aria-label="Customer type"
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm min-w-[130px]"
        >
          <option value="all">All Types</option>
          <option value="new">New</option>
          <option value="repeat">Repeat</option>
          <option value="vip">VIP</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={filters.city || 'all'}
          onChange={(e) => set({ city: e.target.value === 'all' ? undefined : e.target.value })}
          aria-label="City"
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm min-w-[120px]"
        >
          <option value="all">All Cities</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border ${
            advanced ? 'border-emerald-500 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {advanced && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs text-slate-500">
            State
            <select
              value={filters.state || 'all'}
              onChange={(e) => set({ state: e.target.value === 'all' ? undefined : e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All States</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-500">
            Date field
            <select
              value={filters.dateField || 'registered'}
              onChange={(e) => set({ dateField: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            >
              <option value="registered">Registration Date</option>
              <option value="lastOrder">Last Order Date</option>
            </select>
          </label>
          <label className="text-xs text-slate-500">
            Min Orders
            <input
              type="number"
              min="0"
              value={filters.minOrders ?? ''}
              onChange={(e) => set({ minOrders: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            Min Spent (₹)
            <input
              type="number"
              min="0"
              value={filters.minSpent ?? ''}
              onChange={(e) => set({ minSpent: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            Max Spent (₹)
            <input
              type="number"
              min="0"
              value={filters.maxSpent ?? ''}
              onChange={(e) => set({ maxSpent: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            Min AOV (₹)
            <input
              type="number"
              min="0"
              value={filters.minAov ?? ''}
              onChange={(e) => set({ minAov: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          {filters.dateRange === 'custom' && (
            <>
              <label className="text-xs text-slate-500">
                From
                <input
                  type="date"
                  value={filters.customRange?.from || ''}
                  onChange={(e) => set({ customRange: { ...(filters.customRange || {}), from: e.target.value } })}
                  className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="text-xs text-slate-500">
                To
                <input
                  type="date"
                  value={filters.customRange?.to || ''}
                  onChange={(e) => set({ customRange: { ...(filters.customRange || {}), to: e.target.value } })}
                  className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                />
              </label>
            </>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Quick customer filters">
        {QUICK_FILTER_TABS.map((tab) => {
          const active = (filters.quickTab || 'all') === tab.id;
          const count = counts[tab.id];
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() =>
                set({
                  quickTab: tab.id,
                  type: undefined,
                  status: undefined,
                })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
              {typeof count === 'number' && (
                <span className={`tabular-nums ${active ? 'text-white/90' : 'text-slate-400'}`}>({count})</span>
              )}
            </button>
          );
        })}
        <span className="sr-only"><Filter size={12} /> Advanced filters available</span>
      </div>
    </div>
  );
}
