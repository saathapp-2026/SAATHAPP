import React, { useState } from 'react';
import {
  Eye,
  Download,
  Share2,
  MoreVertical,
  Mail,
  Printer,
  Trash2,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  Presentation,
  Table2,
  FileType,
  Braces,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  FORMAT_STYLES,
  REPORT_STATUS_STYLES,
  formatBytes,
  formatReportTime,
} from '../../../config/seller/reportConstants';

const FORMAT_ICONS = {
  pdf: FileText,
  excel: FileSpreadsheet,
  csv: Table2,
  word: FileType,
  ppt: Presentation,
  json: Braces,
};

const FORMAT_ICON_COLOR = {
  pdf: 'text-red-500',
  excel: 'text-emerald-600',
  csv: 'text-sky-600',
  word: 'text-blue-600',
  ppt: 'text-orange-500',
  json: 'text-slate-500',
};

function ActionsMenu({ report, onAction, loadingId }) {
  const [open, setOpen] = useState(false);
  const busy = loadingId === report.id;

  const items = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'print', label: 'Print', icon: Printer },
    { id: 'regenerate', label: 'Regenerate', icon: RefreshCw },
    { id: 'delete', label: 'Delete', icon: Trash2, danger: true },
  ];

  return (
    <div className="relative flex items-center justify-end gap-0.5">
      <button type="button" title="View" disabled={busy} onClick={() => onAction('view', report)} className="p-1.5 rounded-lg hover:bg-page text-slate-500">
        <Eye size={15} />
      </button>
      <button type="button" title="Download" disabled={busy} onClick={() => onAction('download', report)} className="p-1.5 rounded-lg hover:bg-page text-slate-500">
        <Download size={15} />
      </button>
      <button type="button" title="Share" disabled={busy} onClick={() => onAction('share', report)} className="p-1.5 rounded-lg hover:bg-page text-slate-500">
        <Share2 size={15} />
      </button>
      <button
        type="button"
        title="More actions"
        disabled={busy}
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg hover:bg-page text-slate-500"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreVertical size={15} />
      </button>
      {open ? (
        <>
          <button type="button" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none fixed inset-0 z-10" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div role="menu" className="absolute right-0 top-8 z-20 w-44 rounded-xl border border-slate-200 bg-surface shadow-xl py-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onAction(item.id, report);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-page ${
                    item.danger ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Icon size={13} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function ReportTable({
  reports = [],
  loading,
  onSort,
  sortBy,
  sortDir,
  page,
  pageSize = 5,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
  onAction,
  loadingId,
}) {
  const SortBtn = ({ id, children }) => (
    <button type="button" onClick={() => onSort?.(id)} className="inline-flex items-center gap-1 hover:text-emerald-600">
      {children}
      {sortBy === id ? <span className="text-[10px]">{sortDir === 'asc' ? '↑' : '↓'}</span> : null}
    </button>
  );

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-6 animate-pulse space-y-3" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 rounded bg-slate-200" />
        ))}
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-surface p-10 text-center">
        <FileText className="mx-auto h-10 w-10 text-slate-300 mb-3" />
        <p className="font-semibold text-slate-800 dark:text-slate-100">No reports generated yet</p>
        <p className="text-sm text-slate-500 mt-1">Generate your first report to see it here.</p>
      </div>
    );
  }

  return (
    <section aria-label="Recently generated reports">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Recently Generated Reports</h2>
      </div>

      <div className="md:hidden space-y-2">
        {reports.map((r) => {
          const Icon = FORMAT_ICONS[r.format] || FileText;
          return (
            <div key={r.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-3 space-y-2 shadow-sm">
              <div className="flex items-start gap-2">
                <Icon size={16} className={`mt-0.5 shrink-0 ${FORMAT_ICON_COLOR[r.format]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{r.name}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{r.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${FORMAT_STYLES[r.format]}`}>{r.format}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${REPORT_STATUS_STYLES[r.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {r.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    {r.dateFrom} → {r.dateTo} · {formatReportTime(r.generatedOn)} · {formatBytes(r.size)}
                  </p>
                </div>
              </div>
              <ActionsMenu report={r} onAction={onAction} loadingId={loadingId} />
            </div>
          );
        })}
      </div>

      <div className="hidden md:block rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-[1] bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
              <tr className="transition-colors hover:bg-emerald-50/30 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3"><SortBtn id="name">Report Name</SortBtn></th>
                <th className="px-4 py-3"><SortBtn id="format">Type</SortBtn></th>
                <th className="px-4 py-3">Date Range</th>
                <th className="px-4 py-3"><SortBtn id="generatedOn">Generated On</SortBtn></th>
                <th className="px-4 py-3"><SortBtn id="size">Size</SortBtn></th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => {
                const Icon = FORMAT_ICONS[r.format] || FileText;
                return (
                  <tr key={r.id} className="transition-colors hover:bg-emerald-50/30 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <Icon size={16} className={`mt-0.5 shrink-0 ${FORMAT_ICON_COLOR[r.format]}`} />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-slate-50 truncate max-w-[220px]">{r.name}</p>
                          <p className="text-[11px] text-slate-500 truncate max-w-[220px]">{r.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${FORMAT_STYLES[r.format]}`}>
                        {r.format === 'excel' ? 'Excel' : r.format === 'ppt' ? 'PPT' : String(r.format).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {r.dateFrom} → {r.dateTo}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {formatReportTime(r.generatedOn)}
                    </td>
                    <td className="px-4 py-3 text-xs tabular-nums text-slate-600">{formatBytes(r.size)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${REPORT_STATUS_STYLES[r.status]}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {r.status === 'ready' ? 'Ready' : r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ActionsMenu report={r} onAction={onAction} loadingId={loadingId} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 ">
          <p className="text-xs text-slate-500">
            Showing {start} to {end} of {total} reports
          </p>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-slate-500">
              Rows per page
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                className="rounded-lg border border-slate-200 bg-surface px-2 py-1 text-xs"
              >
                {[5, 8, 10, 20].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="inline-flex items-center px-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
