import React, { useState } from 'react';
import {
  Eye,
  Pencil,
  Copy,
  Play,
  Pause,
  Square,
  BarChart3,
  Share2,
  Download,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from 'lucide-react';
import {
  STATUS_STYLES,
  discountLabel,
  formatINR,
  getPromoType,
} from '../../../config/seller/couponConstants';

function ActionsMenu({ item, onAction, loadingId }) {
  const [open, setOpen] = useState(false);
  const busy = loadingId === item.id;
  const items = [
    { id: 'view', label: 'View', icon: Eye },
    { id: 'edit', label: 'Edit', icon: Pencil },
    { id: 'duplicate', label: 'Duplicate', icon: Copy },
    { id: 'activate', label: 'Activate', icon: Play },
    { id: 'pause', label: 'Pause', icon: Pause },
    { id: 'stop', label: 'Stop', icon: Square },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'share', label: 'Share', icon: Share2 },
    { id: 'export', label: 'Export', icon: Download },
    { id: 'delete', label: 'Delete', icon: Trash2, danger: true },
  ];

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        disabled={busy}
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        aria-label="Actions"
      >
        <MoreVertical size={15} />
      </button>
      {open ? (
        <>
          <button type="button" className="fixed inset-0 z-10" aria-label="Close" onClick={() => setOpen(false)} />
          <div role="menu" className="absolute right-0 top-8 z-20 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1 max-h-72 overflow-y-auto">
            {items.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onAction(a.id, item);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    a.danger ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Icon size={13} />
                  {a.label}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function CouponTable({
  items = [],
  loading,
  selectedIds,
  onToggle,
  onToggleAll,
  onSort,
  sortBy,
  sortDir,
  page,
  pageSize = 10,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
  onAction,
  loadingId,
}) {
  const allSelected = items.length > 0 && items.every((i) => selectedIds.has(i.id));

  const SortBtn = ({ id, children }) => (
    <button type="button" onClick={() => onSort?.(id)} className="inline-flex items-center gap-1 hover:text-emerald-600">
      {children}
      {sortBy === id ? <span className="text-[10px]">{sortDir === 'asc' ? '↑' : '↓'}</span> : null}
    </button>
  );

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 animate-pulse space-y-3" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 rounded bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 text-center">
        <Ticket className="mx-auto h-10 w-10 text-slate-300 mb-3" />
        <p className="font-semibold">No promotions yet</p>
        <p className="text-sm text-slate-500 mt-1">Create a coupon, campaign, banner, or ad to get started.</p>
      </div>
    );
  }

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <section aria-label="Promotions table">
      <div className="md:hidden space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => onToggle(item.id)}
                className="mt-1 rounded border-slate-300"
                aria-label={`Select ${item.name}`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{item.name}</p>
                <p className="text-[11px] text-slate-500 font-mono">{item.code}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold capitalize">{item.kind}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[item.status]}`}>{item.status}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {discountLabel(item)} · {fmtDate(item.startAt)} → {fmtDate(item.endAt)} · {formatINR(item.revenue)}
                </p>
              </div>
              <ActionsMenu item={item} onAction={onAction} loadingId={loadingId} />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-[1] bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 w-10">
                  <input type="checkbox" checked={allSelected} onChange={onToggleAll} aria-label="Select all" className="rounded border-slate-300" />
                </th>
                <th className="px-3 py-3"><SortBtn id="code">Code</SortBtn></th>
                <th className="px-3 py-3"><SortBtn id="name">Name</SortBtn></th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Discount</th>
                <th className="px-3 py-3">Validity</th>
                <th className="px-3 py-3"><SortBtn id="used">Usage</SortBtn></th>
                <th className="px-3 py-3"><SortBtn id="revenue">Revenue</SortBtn></th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item.id)}
                      onChange={() => onToggle(item.id)}
                      aria-label={`Select ${item.name}`}
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="px-3 py-3 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300">{item.code}</td>
                  <td className="px-3 py-3">
                    <p className="font-medium truncate max-w-[180px]">{item.name}</p>
                    <p className="text-[11px] text-slate-500 capitalize">{item.kind}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-600 dark:text-slate-300">{getPromoType(item.typeId)?.label || item.typeId}</td>
                  <td className="px-3 py-3 text-xs font-semibold">{discountLabel(item)}</td>
                  <td className="px-3 py-3 text-xs text-slate-600 whitespace-nowrap">
                    {fmtDate(item.startAt)} → {fmtDate(item.endAt)}
                  </td>
                  <td className="px-3 py-3 text-xs tabular-nums">
                    {item.used || 0}
                    {item.maxUses ? ` / ${item.maxUses}` : ' / ∞'}
                  </td>
                  <td className="px-3 py-3 text-xs font-semibold tabular-nums">{formatINR(item.revenue)}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <ActionsMenu item={item} onAction={onAction} loadingId={loadingId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <p className="text-xs text-slate-500">Showing {start} to {end} of {total}</p>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-slate-500">
              Rows
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs"
              >
                {[5, 10, 20].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <div className="flex gap-1">
              <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 inline-flex items-center justify-center" aria-label="Prev">
                <ChevronLeft size={14} />
              </button>
              <span className="inline-flex items-center px-2 text-xs font-semibold">{page} / {totalPages}</span>
              <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 inline-flex items-center justify-center" aria-label="Next">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
