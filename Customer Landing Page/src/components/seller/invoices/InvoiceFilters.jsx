import React, { useState } from 'react';
import { Search, RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import { QUICK_INVOICE_TABS } from '../../../config/seller/invoiceConstants';

export default function InvoiceFilters({
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
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-3 sm:p-4 space-y-3">
      <div className="flex flex-col lg:flex-row gap-2.5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by invoice #, name, or GSTIN..."
            aria-label="Search invoices"
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {search && (
            <button type="button" aria-label="Clear" className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1" onClick={() => onSearchChange('')}>
              <X size={14} />
            </button>
          )}
        </div>
        <input
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => set({ dateFrom: e.target.value })}
          aria-label="From date"
          className="rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm"
        />
        <input
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => set({ dateTo: e.target.value })}
          aria-label="To date"
          className="rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm"
        />
        <select
          value={filters.status || 'all'}
          onChange={(e) => set({ status: e.target.value === 'all' ? undefined : e.target.value, quickTab: 'all' })}
          aria-label="Status"
          className="rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm min-w-[130px]"
        >
          <option value="all">All Status</option>
          {['draft', 'generated', 'sent', 'viewed', 'paid', 'pending', 'overdue', 'cancelled', 'completed'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border ${
            advanced ? 'border-emerald-500 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30' : 'border-slate-200'
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
        <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-slate-200">
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {advanced && (
        <div className="grid sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs text-slate-500">
            Payment Status
            <select
              value={filters.paymentStatus || 'all'}
              onChange={(e) => set({ paymentStatus: e.target.value === 'all' ? undefined : e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="refunded">Refunded</option>
            </select>
          </label>
          <label className="text-xs text-slate-500">
            GST Type
            <select
              value={filters.gstType || 'all'}
              onChange={(e) => set({ gstType: e.target.value === 'all' ? undefined : e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
            </select>
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Invoice status tabs">
        {QUICK_INVOICE_TABS.map((tab) => {
          const active = (filters.quickTab || 'all') === tab.id;
          const count = counts[tab.id];
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => set({ quickTab: tab.id, status: undefined })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-slate-200 text-slate-600 dark:text-slate-300 hover:bg-page'
              }`}
            >
              {tab.label}
              {typeof count === 'number' && <span className="tabular-nums opacity-80">({count})</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
