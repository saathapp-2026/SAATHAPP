import React, { useMemo, useState } from 'react';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

function Sparkline({ series = [], color = '#10b981' }) {
  const path = useMemo(() => {
    if (!series.length) return '';
    const min = Math.min(...series);
    const max = Math.max(...series);
    const span = max - min || 1;
    const w = 140;
    const h = 40;
    return series
      .map((v, i) => {
        const x = (i / (series.length - 1 || 1)) * w;
        const y = h - ((v - min) / span) * (h - 4) - 2;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }, [series]);

  return (
    <svg viewBox="0 0 140 40" className="w-full h-10 mt-2" aria-hidden="true">
      <path d={path} fill="none" stroke={color} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDisplayRange(from, to) {
  const fmt = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  return `${fmt(from)} - ${fmt(to)}`;
}

export default function BusinessOverview({ data, loading, dateFrom, dateTo, onDateChange }) {
  const [localFrom, setLocalFrom] = useState(dateFrom || '2026-05-01');
  const [localTo, setLocalTo] = useState(dateTo || '2026-05-31');

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-5 animate-pulse h-44" aria-busy="true" />
    );
  }

  const metrics = data?.metrics || [];

  return (
    <section
      aria-label="Business overview"
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-5 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
          Business Overview (This Month)
        </h2>
        <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-page px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Calendar size={14} className="text-slate-400 shrink-0" />
          <span className="sr-only">Date range</span>
          <input
            type="date"
            value={localFrom}
            onChange={(e) => {
              setLocalFrom(e.target.value);
              onDateChange?.(e.target.value, localTo);
            }}
            className="bg-transparent border-0 p-0 text-xs focus:outline-none w-[7.5rem]"
          />
          <span className="text-slate-400">-</span>
          <input
            type="date"
            value={localTo}
            onChange={(e) => {
              setLocalTo(e.target.value);
              onDateChange?.(localFrom, e.target.value);
            }}
            className="bg-transparent border-0 p-0 text-xs focus:outline-none w-[7.5rem]"
          />
        </label>
      </div>

      <p className="sr-only">{formatDisplayRange(localFrom, localTo)}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const up = (m.changePct || 0) >= 0;
          const TrendIcon = up ? TrendingUp : TrendingDown;
          return (
            <div key={m.id} className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{m.label}</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-lg font-bold tabular-nums text-slate-900 dark:text-slate-50">{m.value}</p>
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                    up ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  <TrendIcon size={11} />
                  {up ? '+' : ''}
                  {m.changePct}%
                </span>
              </div>
              <Sparkline series={m.series} color={m.color} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
