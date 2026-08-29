import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Download,
  FileText,
  FileSpreadsheet,
  Presentation,
  Pause,
  Play,
  Trash2,
} from 'lucide-react';
import { REPORT_TYPES, formatBytes, formatReportTime } from '../../../config/seller/reportConstants';

const SHORTCUTS = [
  { id: 'sales', label: 'Sales', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'pnl', label: 'P&L', color: 'bg-violet-100 text-violet-700' },
  { id: 'inventory', label: 'Stock', color: 'bg-sky-100 text-sky-700' },
  { id: 'gst', label: 'GST', color: 'bg-amber-100 text-amber-700' },
  { id: 'customer', label: 'Customer', color: 'bg-blue-100 text-blue-700' },
  { id: 'orders', label: 'Orders', color: 'bg-orange-100 text-orange-700' },
  { id: 'payment', label: 'Payment', color: 'bg-green-100 text-green-700' },
  { id: 'returns', label: 'Returns', color: 'bg-rose-100 text-rose-700' },
];

const SCHEDULE_COPY = {
  daily: (t) => `Every day at ${t}`,
  weekly: (t) => `Every Monday at ${t}`,
  monthly: (t) => `1st of every month at ${t}`,
  quarterly: (t) => `Quarterly at ${t}`,
  fy_end: (t) => `Year-end at ${t}`,
};

function FileIcon({ format }) {
  if (format === 'excel' || format === 'csv') return <FileSpreadsheet size={14} className="text-emerald-600" />;
  if (format === 'ppt') return <Presentation size={14} className="text-orange-500" />;
  return <FileText size={14} className="text-red-500" />;
}

export default function ReportsRightPanel({
  onGenerate,
  onQuickType,
  schedules = [],
  downloads = [],
  onScheduleAction,
  onViewAllSchedules,
  onViewAllDownloads,
}) {
  const [typeId, setTypeId] = useState('sales');
  const [dateFrom, setDateFrom] = useState('2026-05-01');
  const [dateTo, setDateTo] = useState('2026-05-31');
  const [category, setCategory] = useState('all');

  const activeSchedules = useMemo(() => schedules.slice(0, 3), [schedules]);
  const recentDl = useMemo(() => downloads.slice(0, 4), [downloads]);

  return (
    <aside className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded space-y-4 lg:sticky lg:top-4 lg:self-start" aria-label="Report shortcuts">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 space-y-3 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Generate Report</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Create custom reports with filters</p>
        </div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
          Select Report Type
          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm"
          >
            {REPORT_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
          Date Range
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
            <Calendar size={14} className="text-slate-400 shrink-0" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="flex-1 min-w-0 bg-transparent border-0 p-0 text-xs focus:outline-none"
            />
            <span className="text-slate-400 text-xs">-</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="flex-1 min-w-0 bg-transparent border-0 p-0 text-xs focus:outline-none"
            />
          </div>
        </label>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
          Additional Filters
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="Grocery">Grocery</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Hardware">Hardware</option>
            <option value="FMCG">FMCG</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => onGenerate?.({ typeId, dateFrom, dateTo, category })}
          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 transition-colors"
        >
          Generate Report
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 shadow-sm">
        <h3 className="text-sm font-bold mb-3 text-slate-900 dark:text-slate-50">Quick Shortcuts</h3>
        <div className="grid grid-cols-4 gap-2">
          {SHORTCUTS.map((t) => (
            <button
              key={t.id}
              type="button"
              title={t.label}
              onClick={() => onQuickType?.(t.id)}
              className="flex flex-col items-center gap-1.5 rounded-xl p-2 hover:bg-page transition-colors"
            >
              <span className={`h-9 w-9 rounded-xl ${t.color} text-[10px] font-bold flex items-center justify-center`}>
                {t.label.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-[9px] font-medium text-slate-600 dark:text-slate-300 truncate w-full text-center">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Scheduled Reports</h3>
          <button type="button" onClick={onViewAllSchedules} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none text-[11px] font-semibold text-emerald-600 hover:underline">
            View All
          </button>
        </div>
        <ul className="space-y-2.5">
          {activeSchedules.map((s) => (
            <li key={s.id} className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-100">{s.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {(SCHEDULE_COPY[s.scheduleType] || SCHEDULE_COPY.daily)(s.time)}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold capitalize ${
                    s.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {s.status === 'active' ? 'Active' : s.status}
                </span>
                <button
                  type="button"
                  title={s.status === 'active' ? 'Pause' : 'Enable'}
                  onClick={() => onScheduleAction?.(s.status === 'active' ? 'pause' : 'enable', s)}
                  className="p-1 rounded hover:bg-page text-slate-400"
                >
                  {s.status === 'active' ? <Pause size={11} /> : <Play size={11} />}
                </button>
                <button
                  type="button"
                  title="Delete"
                  onClick={() => onScheduleAction?.('delete', s)}
                  className="p-1 rounded hover:bg-page text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </li>
          ))}
          {!activeSchedules.length ? (
            <li className="text-xs text-slate-500 text-center py-3">No schedules yet</li>
          ) : null}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 shadow-sm">
        <h3 className="text-sm font-bold mb-3 text-slate-900 dark:text-slate-50">Recent Downloads</h3>
        <ul className="space-y-2.5 mb-3">
          {recentDl.map((d) => (
            <li key={d.id} className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0">
                <FileIcon format={d.format} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate text-slate-800 dark:text-slate-100">{d.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {formatBytes(d.size)} · {formatReportTime(d.at)}
                </p>
              </div>
              <Download size={12} className="mt-1 text-slate-300 shrink-0" />
            </li>
          ))}
          {!recentDl.length ? (
            <li className="text-xs text-slate-500 text-center py-3">No downloads yet</li>
          ) : null}
        </ul>
        <button
          type="button"
          onClick={onViewAllDownloads}
          className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-page"
        >
          View All Downloads
        </button>
      </div>
    </aside>
  );
}
