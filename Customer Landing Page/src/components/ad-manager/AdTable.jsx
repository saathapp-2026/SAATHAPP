import React, { useState } from 'react';
import {
  Eye,
  Pause,
  Play,
  Trash2,
  MoreVertical,
  Pencil,
  BarChart3,
  Download,
  Copy,
  Share2,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Image as ImageIcon,
} from 'lucide-react';
import {
  STATUS_STYLES,
  formatINR,
  formatCompact,
  getAdType,
  getPlacementLabel,
} from '../../config/seller/adConstants';

function ActionsMenu({ ad, onAction, loadingId }) {
  const [open, setOpen] = useState(false);
  const busy = loadingId === ad.id;
  const items = [
    { id: 'view', label: 'View', icon: Eye },
    { id: 'edit', label: 'Edit', icon: Pencil },
    { id: ad.status === 'paused' ? 'resume' : 'pause', label: ad.status === 'paused' ? 'Resume' : 'Pause', icon: ad.status === 'paused' ? Play : Pause },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'download', label: 'Download Report', icon: Download },
    { id: 'duplicate', label: 'Duplicate', icon: Copy },
    { id: 'share', label: 'Share', icon: Share2 },
    { id: 'delete', label: 'Delete', icon: Trash2, danger: true },
  ];

  return (
    <div className="relative flex items-center justify-end gap-0.5">
      <button type="button" title="View" disabled={busy} onClick={() => onAction('view', ad)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
        <Eye size={15} />
      </button>
      <button type="button" title={ad.status === 'paused' ? 'Resume' : 'Pause'} disabled={busy} onClick={() => onAction(ad.status === 'paused' ? 'resume' : 'pause', ad)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
        {ad.status === 'paused' ? <Play size={15} /> : <Pause size={15} />}
      </button>
      <button type="button" title="Delete" disabled={busy} onClick={() => onAction('delete', ad)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
        <Trash2 size={15} />
      </button>
      <button type="button" title="More" disabled={busy} onClick={() => setOpen((v) => !v)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500" aria-haspopup="menu" aria-expanded={open}>
        <MoreVertical size={15} />
      </button>
      {open ? (
        <>
          <button type="button" className="fixed inset-0 z-10" aria-label="Close" onClick={() => setOpen(false)} />
          <div role="menu" className="absolute right-0 top-8 z-20 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1 max-h-72 overflow-y-auto">
            {items.map((a) => {
              const Icon = a.icon;
              return (
                <button key={a.id} type="button" role="menuitem" onClick={() => { setOpen(false); onAction(a.id, ad); }} className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 ${a.danger ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'}`}>
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

function statusLabel(s) {
  if (s === 'running') return 'Active';
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '—';
}

export default function AdTable({
  ads = [],
  loading,
  selectedIds,
  onToggle,
  onToggleAll,
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
  const allSelected = ads.length > 0 && ads.every((a) => selectedIds.has(a.id));
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
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 animate-pulse space-y-3" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 rounded bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>
    );
  }

  if (!ads.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 text-center">
        <Megaphone className="mx-auto h-10 w-10 text-slate-300 mb-3" />
        <p className="font-semibold">No advertisements yet</p>
        <p className="text-sm text-slate-500 mt-1">Create your first ad to promote products and grow sales.</p>
      </div>
    );
  }

  return (
    <section aria-label="Your advertisements">
      <h2 className="text-base font-bold mb-3 text-slate-900 dark:text-slate-50">Your Advertisements</h2>
      <div className="md:hidden space-y-2">
        {ads.map((ad) => (
          <div key={ad.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm">
            <div className="flex items-start gap-2">
              <input type="checkbox" checked={selectedIds.has(ad.id)} onChange={() => onToggle(ad.id)} className="mt-1 rounded border-slate-300" aria-label={`Select ${ad.name}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{ad.name}</p>
                <p className="text-[11px] text-slate-500">{getPlacementLabel(ad.placement)}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold">{getAdType(ad.typeId).short}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[ad.status]}`}>{statusLabel(ad.status)}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">{formatINR(ad.dailyBudget)} Daily · Spent {formatINR(ad.spent)} · CTR {ad.ctr}%</p>
              </div>
              <ActionsMenu ad={ad} onAction={onAction} loadingId={loadingId} />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-[1] bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 w-10"><input type="checkbox" checked={allSelected} onChange={onToggleAll} aria-label="Select all" className="rounded border-slate-300" /></th>
                <th className="px-3 py-3"><SortBtn id="name">Ad Name</SortBtn></th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Placement</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3"><SortBtn id="dailyBudget">Budget</SortBtn></th>
                <th className="px-3 py-3"><SortBtn id="spent">Spent</SortBtn></th>
                <th className="px-3 py-3"><SortBtn id="impressions">Impr.</SortBtn></th>
                <th className="px-3 py-3"><SortBtn id="clicks">Clicks</SortBtn></th>
                <th className="px-3 py-3"><SortBtn id="ctr">CTR</SortBtn></th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-3 py-3"><input type="checkbox" checked={selectedIds.has(ad.id)} onChange={() => onToggle(ad.id)} aria-label={`Select ${ad.name}`} className="rounded border-slate-300" /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center shrink-0"><ImageIcon size={14} className="text-slate-400" /></div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate max-w-[180px]">{ad.name}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-[180px]">{ad.description || ad.headline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs font-medium">{getAdType(ad.typeId).short}</td>
                  <td className="px-3 py-3 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">{getPlacementLabel(ad.placement)}</td>
                  <td className="px-3 py-3"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[ad.status]}`}>{statusLabel(ad.status)}</span></td>
                  <td className="px-3 py-3 text-xs font-semibold whitespace-nowrap">{formatINR(ad.dailyBudget)} Daily</td>
                  <td className="px-3 py-3 text-xs tabular-nums">{formatINR(ad.spent)}</td>
                  <td className="px-3 py-3 text-xs tabular-nums">{formatCompact(ad.impressions)}</td>
                  <td className="px-3 py-3 text-xs tabular-nums">{ad.clicks}</td>
                  <td className="px-3 py-3 text-xs font-semibold tabular-nums">{ad.ctr}%</td>
                  <td className="px-3 py-3"><ActionsMenu ad={ad} onAction={onAction} loadingId={loadingId} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <p className="text-xs text-slate-500">Showing {start} to {end} of {total} ads</p>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-slate-500">
              Rows per page
              <select value={pageSize} onChange={(e) => onPageSizeChange?.(Number(e.target.value))} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs">
                {[5, 10, 20].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <div className="flex gap-1">
              <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 inline-flex items-center justify-center" aria-label="Prev"><ChevronLeft size={14} /></button>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" onClick={() => onPageChange(n)} className={`h-8 w-8 rounded-lg border text-xs font-semibold ${page === n ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'}`}>{n}</button>
              ))}
              <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 inline-flex items-center justify-center" aria-label="Next"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
