import React from 'react';
import { ChevronRight, Plus, Copy, Pause, Wallet, BarChart3, Image as ImageIcon } from 'lucide-react';
import { formatINR, formatCompact } from '../../../config/seller/adConstants';

export default function AdsRightPanel({
  totals = {},
  topAds = [],
  onQuickAction,
  onViewAllPerformance,
}) {
  const rows = [
    ['Total Spent', formatINR(totals.spent)],
    ['Total Impressions', formatCompact(totals.impressions)],
    ['Total Clicks', totals.clicks ?? 0],
    ['Total Conversions', totals.conversions ?? 0],
    ['Total Revenue', formatINR(totals.revenue)],
  ];

  const actions = [
    { id: 'create', label: 'Create New Ad', icon: Plus },
    { id: 'clone', label: 'Clone Existing Ad', icon: Copy },
    { id: 'pause', label: 'Pause / Resume Ads', icon: Pause },
    { id: 'budget', label: 'Set Budget', icon: Wallet },
    { id: 'reports', label: 'Ad Reports', icon: BarChart3 },
  ];

  return (
    <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start" aria-label="Ad insights">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <h3 className="text-sm font-bold mb-3">Ad Summary</h3>
        <ul className="space-y-2.5">
          {rows.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{k}</span>
              <span className="font-semibold tabular-nums">{v}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
        <ul className="space-y-1">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => onQuickAction?.(a.id)}
                  className="flex w-full items-center gap-2 rounded-xl px-2 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Icon size={15} className="text-emerald-600" />
                  <span className="flex-1">{a.label}</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Top Performing Ads</h3>
        </div>
        <ul className="space-y-3">
          {topAds.map((ad) => (
            <li key={ad.id} className="flex items-start gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center shrink-0">
                <ImageIcon size={14} className="text-slate-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate">{ad.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {formatCompact(ad.impressions)} impr · {ad.clicks} clicks
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-1.5 py-0.5 text-[10px] font-bold">
                {ad.ctr}%
              </span>
            </li>
          ))}
          {!topAds.length ? (
            <li className="text-xs text-slate-500 text-center py-3">No performance data yet</li>
          ) : null}
        </ul>
        <button
          type="button"
          onClick={onViewAllPerformance}
          className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          View All Performance
        </button>
      </div>
    </aside>
  );
}
