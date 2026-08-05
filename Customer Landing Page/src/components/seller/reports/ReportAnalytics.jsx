import React, { useMemo } from 'react';
import { formatINR } from '../../../config/seller/reportConstants';

const RANGES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly' },
  { id: 'fy', label: 'FY' },
];

function MiniBars({ series = [], keyName = 'sales', color = '#10b981' }) {
  const max = Math.max(...series.map((s) => s[keyName] || 0), 1);
  return (
    <div className="flex items-end gap-1 h-24" role="img" aria-label={`${keyName} chart`}>
      {series.map((s) => (
        <div key={s.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <div
            className="w-full rounded-t-md min-h-[4px] transition-all"
            style={{ height: `${((s[keyName] || 0) / max) * 100}%`, background: color }}
            title={`${s.label}: ${s[keyName]}`}
          />
          <span className="text-[8px] text-slate-400 truncate w-full text-center">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReportAnalytics({ data, loading, range, onRangeChange }) {
  const charts = useMemo(
    () => [
      { id: 'sales', title: 'Sales Trend', key: 'sales', color: '#10b981' },
      { id: 'revenue', title: 'Revenue Growth', key: 'revenue', color: '#0ea5e9' },
      { id: 'orders', title: 'Monthly Orders', key: 'orders', color: '#8b5cf6' },
      { id: 'gst', title: 'GST Collection', key: 'gst', color: '#f59e0b' },
      { id: 'margin', title: 'Profit Margin', key: 'margin', color: '#14b8a6' },
      { id: 'returns', title: 'Return Rate', key: 'returns', color: '#f43f5e' },
    ],
    []
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse bg-white dark:bg-slate-900" />
        ))}
      </div>
    );
  }

  const series = data?.series || [];
  const insights = data?.insights || [];
  const topProducts = data?.topProducts || [];

  return (
    <section aria-label="Analytics dashboard" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">Analytics Dashboard</h2>
        <div className="flex flex-wrap gap-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onRangeChange?.(r.id)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold border ${
                range === r.id
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {charts.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
          >
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-3">{c.title}</p>
            <MiniBars series={series} keyName={c.key} color={c.color} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <p className="text-xs font-semibold mb-3">Top Products</p>
          <ul className="space-y-2">
            {topProducts.map((p) => (
              <li key={p.name} className="flex items-center justify-between text-sm">
                <span className="truncate text-slate-700 dark:text-slate-200">{p.name}</span>
                <span className="font-semibold tabular-nums">{formatINR(p.value)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <p className="text-xs font-semibold mb-3">BI Insights (AI-ready)</p>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {insights.map((ins) => (
              <li key={ins.id} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-2.5">
                <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">{ins.title}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{ins.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
