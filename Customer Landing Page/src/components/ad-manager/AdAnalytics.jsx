import React from 'react';
import { formatINR } from '../../config/seller/adConstants';

const RANGES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly' },
];

function Bars({ series = [], keyName = 'clicks', color = '#10b981' }) {
  const max = Math.max(...series.map((s) => s[keyName] || 0), 1);
  return (
    <div className="flex items-end gap-1 h-28" role="img" aria-label={`${keyName} chart`}>
      {series.map((s) => (
        <div key={s.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <div className="w-full rounded-t-md min-h-[4px]" style={{ height: `${((s[keyName] || 0) / max) * 100}%`, background: color }} title={`${s.label}: ${s[keyName]}`} />
          <span className="text-[8px] text-slate-400 truncate w-full text-center">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdAnalytics({ data, loading, range, onRangeChange }) {
  if (loading) {
    return <div className="rounded-2xl border border-slate-200 dark:border-slate-800 h-56 animate-pulse bg-surface" aria-busy="true" />;
  }
  const series = data?.series || [];

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm space-y-4" aria-label="Ad analytics">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold">Advertisement Analytics</h2>
        <div className="flex flex-wrap gap-1">
          {RANGES.map((r) => (
            <button key={r.id} type="button" onClick={() => onRangeChange?.(r.id)} className={`rounded-full px-2.5 py-1 text-[10px] font-semibold border ${range === r.id ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200'}`}>{r.label}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold mb-2">Clicks</p>
          <Bars series={series} keyName="clicks" color="#0ea5e9" />
        </div>
        <div>
          <p className="text-xs font-semibold mb-2">Revenue</p>
          <Bars series={series} keyName="revenue" color="#10b981" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-page p-3">
          <p className="text-xs font-semibold mb-2">Best Products</p>
          <ul className="space-y-1.5">{(data?.bestProducts || []).map((p) => <li key={p.name} className="flex justify-between text-xs"><span className="truncate">{p.name}</span><span className="font-semibold">{formatINR(p.value)}</span></li>)}</ul>
        </div>
        <div className="rounded-xl bg-page p-3">
          <p className="text-xs font-semibold mb-2">Best Cities</p>
          <ul className="space-y-1.5">{(data?.bestCities || []).map((p) => <li key={p.name} className="flex justify-between text-xs"><span>{p.name}</span><span className="font-semibold">{p.value}%</span></li>)}</ul>
        </div>
        <div className="rounded-xl bg-page p-3">
          <p className="text-xs font-semibold mb-2">Best Placement</p>
          <ul className="space-y-1.5">{(data?.bestPlacements || []).map((p) => <li key={p.name} className="flex justify-between text-xs"><span className="truncate">{p.name}</span><span className="font-semibold">{p.value}% CTR</span></li>)}</ul>
        </div>
      </div>
    </section>
  );
}
