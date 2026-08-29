import React from 'react';
import {
  Eye,
  Download,
  Pencil,
  RefreshCw,
  Copy,
  Share2,
  Printer,
  History,
  Trash2,
  MoreHorizontal,
  FileText,
} from 'lucide-react';
import {
  STATUS_STYLES,
  EXPIRY_BADGES,
  formatDate,
  statusLabel,
} from '../../../config/seller/documentConstants';

function SortBtn({ label, field, sortBy, sortDir, onSort }) {
  const active = sortBy === field;
  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className="inline-flex items-center gap-1 hover:text-emerald-600"
    >
      {label}
      {active ? <span className="text-[10px]">{sortDir === 'asc' ? '↑' : '↓'}</span> : null}
    </button>
  );
}

export default function DocumentTable({
  rows = [],
  loading,
  selectedIds,
  onToggle,
  onToggleAll,
  sortBy,
  sortDir,
  onSort,
  page,
  pageSize,
  meta,
  onPage,
  onPageSize,
  onAction,
}) {
  const allOnPageSelected = rows.length > 0 && rows.every((r) => selectedIds.has(r.id));

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-6 space-y-3" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-page animate-pulse" />
        ))}
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center">
        <FileText className="mx-auto h-10 w-10 text-slate-300 mb-3" />
        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">No documents found</p>
        <p className="text-sm text-slate-500 mt-1">Upload a document or adjust filters to see results.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden lg:block rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface overflow-hidden">
        <div className="overflow-x-auto max-h-[560px]">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-page dark:bg-slate-950 text-slate-600 dark:text-slate-300">
              <tr className="transition-colors hover:bg-emerald-50/30 border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={(e) => onToggleAll(e.target.checked)}
                    aria-label="Select all documents"
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  <SortBtn label="Document" field="name" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                </th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Number</th>
                <th className="px-4 py-3 text-left font-semibold">
                  <SortBtn label="Uploaded" field="uploadedAt" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                </th>
                <th className="px-4 py-3 text-left font-semibold">Expiry</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Version</th>
                <th className="px-4 py-3 text-left font-semibold">Uploaded By</th>
                <th className="px-4 py-3 text-left font-semibold">Updated</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const expiry = EXPIRY_BADGES[row.expiryState] || EXPIRY_BADGES.none;
                return (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-emerald-50/30 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row.id)}
                        onChange={() => onToggle(row.id)}
                        aria-label={`Select ${row.name}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.categoryLabel}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.typeLabel}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                      {row.documentNumber || '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{formatDate(row.uploadedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-slate-600 dark:text-slate-300">{formatDate(row.expiryDate)}</div>
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${expiry.className}`}>
                          {expiry.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          STATUS_STYLES[row.status] || STATUS_STYLES.draft
                        }`}
                      >
                        {statusLabel(row.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">v{row.version}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.uploadedBy}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{formatDate(row.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <RowActions row={row} onAction={onAction} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {rows.map((row) => {
          const expiry = EXPIRY_BADGES[row.expiryState] || EXPIRY_BADGES.none;
          return (
            <div
              key={row.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(row.id)}
                    onChange={() => onToggle(row.id)}
                    className="mt-1"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-slate-50 truncate">{row.name}</p>
                    <p className="text-xs text-slate-500">
                      {row.categoryLabel} · {row.typeLabel}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold shrink-0 ${
                    STATUS_STYLES[row.status] || STATUS_STYLES.draft
                  }`}
                >
                  {statusLabel(row.status)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400">Number</span>
                  <p className="font-mono">{row.documentNumber || '—'}</p>
                </div>
                <div>
                  <span className="text-slate-400">Uploaded</span>
                  <p>{formatDate(row.uploadedAt)}</p>
                </div>
                <div>
                  <span className="text-slate-400">Expiry</span>
                  <p>
                    {formatDate(row.expiryDate)}{' '}
                    <span className={`ml-1 rounded-full px-1.5 py-0.5 ${expiry.className}`}>{expiry.label}</span>
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Version</span>
                  <p>v{row.version}</p>
                </div>
              </div>
              <RowActions row={row} onAction={onAction} compact />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Showing {(meta.page - 1) * pageSize + 1}–{Math.min(meta.page * pageSize, meta.total)} of {meta.total}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => onPageSize(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-white dark:bg-slate-950 px-2 py-1.5"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPage(page - 1)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            {page} / {meta.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= meta.totalPages}
            onClick={() => onPage(page + 1)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function RowActions({ row, onAction, compact }) {
  const [open, setOpen] = React.useState(false);
  const items = [
    { id: 'view', label: 'View', icon: Eye },
    { id: 'download', label: 'Download', icon: Download },
    { id: 'edit', label: 'Edit', icon: Pencil },
    { id: 'replace', label: 'Replace', icon: RefreshCw },
    { id: 'duplicate', label: 'Duplicate', icon: Copy },
    { id: 'share', label: 'Share', icon: Share2 },
    { id: 'print', label: 'Print', icon: Printer },
    { id: 'versions', label: 'Version History', icon: History },
    ...(row.status === 'draft' || row.status === 'rejected'
      ? [{ id: 'delete', label: 'Delete Draft', icon: Trash2, danger: true }]
      : []),
  ];

  return (
    <div className={`relative ${compact ? 'flex flex-wrap gap-2' : 'flex justify-end'}`}>
      <button
        type="button"
        onClick={() => onAction('view', row)}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-xs font-semibold"
      >
        <Eye size={14} /> View
      </button>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center rounded-lg px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-page"
        aria-label="More actions"
      >
        <MoreHorizontal size={16} />
      </button>
      {open ? (
        <>
          <button type="button" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none fixed inset-0 z-20 cursor-default" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-30 w-48 rounded-xl border border-slate-200 bg-surface shadow-xl py-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onAction(item.id, row);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-page ${
                    item.danger ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Icon size={14} />
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
