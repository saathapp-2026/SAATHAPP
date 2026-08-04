import React from 'react';
import { formatINR } from '../../../config/seller/couponConstants';

const RANGES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

function Bars({ series = [], keyName = 'revenue', color = '#10b981' }) {
  const max = Math.max(...series.map((s) => s[keyName] || 0), 1);
  return (
    <div className="flex items-end gap-1 h-28" role="img" aria-label={`${keyName} chart`}>
      {series.map((s) => (
        <div key={s.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <div
            className="w-full rounded-t-md min-h-[4px]"
            style={{ height: `${((s[keyName] || 0) / max) * 100}%`, background: color }}
            title={`${s.label}: ${s[keyName]}`}
          />
          <span className="text-[8px] text-slate-400 truncate w-full text-center">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function CouponAnalytics({ data, loading, range, onRangeChange }) {
  if (loading) {
    return <div className="rounded-2xl border border-slate-200 dark:border-slate-800 h-56 animate-pulse bg-white dark:bg-slate-900" aria-busy="true" />;
  }

  const metrics = data?.metrics || {};
  const series = data?.series || [];

  const cards = [
    ['Redemption Rate', `${metrics.redemptionRate}%`],
    ['Revenue Generated', formatINR(metrics.revenue)],
    ['Avg Discount', formatINR(metrics.avgDiscount)],
    ['Orders Generated', metrics.orders],
    ['New Customers', metrics.newCustomers],
    ['Returning', metrics.returning],
    ['Conversion', `${metrics.conversion}%`],
    ['ROI', `${metrics.roi}x`],
    ['CTR', `${metrics.ctr}%`],
  ];

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4" aria-label="Coupon analytics">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold">Promotion Analytics</h2>
        <div className="flex flex-wrap gap-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onRangeChange?.(r.id)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold border ${
                range === r.id ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
        {cards.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
            <p className="text-[10px] text-slate-500">{k}</p>
            <p className="text-sm font-bold mt-0.5">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold mb-2">Revenue Trend</p>
          <Bars series={series} keyName="revenue" color="#10b981" />
        </div>
        <div>
          <p className="text-xs font-semibold mb-2">Redemptions</p>
          <Bars series={series} keyName="redemptions" color="#0ea5e9" />
        </div>
      </div>
    </section>
  );
}
