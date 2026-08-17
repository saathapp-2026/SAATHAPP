import React, { useState } from 'react';
import {
  Eye,
  Package,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Download,
  MoreVertical,
  Loader2,
} from 'lucide-react';
import {
  CUSTOMER_TYPE_LABELS,
  CUSTOMER_TYPE_STYLES,
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_STATUS_STYLES,
  formatINR,
  formatRelativeDate,
  highlightMatch,
} from '../../../config/seller/customerConstants';

const AVATAR_BG = {
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
};

function Highlight({ text, query }) {
  return (
    <>
      {highlightMatch(text, query).map((p, i) =>
        p.match ? (
          <mark key={i} className="bg-amber-200/80 dark:bg-amber-500/40 text-inherit rounded px-0.5">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

function ActionBtn({ icon: Icon, label, onClick, loading }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={loading}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-page disabled:opacity-40"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}
    </button>
  );
}

function MoreMenu({ customer, onAction, loadingAction }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'call', label: 'Call', icon: Phone },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'address', label: 'View Address', icon: MapPin },
    { id: 'report', label: 'Download Customer Report', icon: Download },
  ];
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="More actions"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-page"
      >
        <MoreVertical size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-52 rounded-xl border border-slate-200 bg-surface shadow-xl p-1 z-[40]">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              disabled={loadingAction === `${customer.id}:${id}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onAction?.(id, customer);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left hover:bg-page"
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SortTh({ label, sortKey, sortBy, sortDir, onSort }) {
  const active = sortBy === sortKey;
  return (
    <th scope="col" className="text-left px-3 py-3 font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
      <button
        type="button"
        onClick={() => onSort?.(sortKey)}
        className="inline-flex items-center gap-1 hover:text-slate-900"
      >
        {label}
        {active && <span className="text-[10px]">{sortDir === 'asc' ? '▲' : '▼'}</span>}
      </button>
    </th>
  );
}

export default function CustomerTable({
  customers = [],
  loading,
  search = '',
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  sortBy,
  sortDir,
  onSort,
  page,
  pageSize,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
  onAction,
  loadingAction,
  onRowClick,
}) {
  const allSelected = customers.length > 0 && customers.every((c) => selectedIds.has(c.id));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 space-y-3 animate-pulse" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-page" />
        ))}
      </div>
    );
  }

  if (!customers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-surface p-12 text-center" role="status">
        <h3 className="font-semibold mb-1">No customers found</h3>
        <p className="text-sm text-slate-500">Try adjusting search or filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface overflow-hidden relative z-0 isolate">
      <div className="overflow-x-auto max-h-[min(70vh,720px)] overflow-y-auto relative z-0">
        <table className="w-full text-sm min-w-[980px]" role="table">
          <thead className="sticky top-0 z-[20] bg-page border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-3 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all customers"
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
              </th>
              <SortTh label="Customer" sortKey="name" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <th className="text-left px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">Phone / Email</th>
              <SortTh label="Orders" sortKey="totalOrders" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <SortTh label="Total Spent" sortKey="totalSpent" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <SortTh label="Last Order" sortKey="lastOrderAt" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <th className="text-left px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">Type</th>
              <th className="text-left px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">Status</th>
              <th className="text-right px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                onClick={() => onRowClick?.(c)}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-page cursor-pointer transition-colors"
              >
                <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(c.id)}
                    onChange={() => onToggleSelect(c.id)}
                    aria-label={`Select ${c.name}`}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5 min-w-[180px]">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${AVATAR_BG[c.avatarColor] || AVATAR_BG.violet}`}
                    >
                      {c.name
                        .split(' ')
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-50 leading-tight">
                        <Highlight text={c.name} query={search} />
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        <Highlight text={c.id} query={search} />
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <p className="text-slate-700 dark:text-slate-200">
                    <Highlight text={c.phone} query={search} />
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    <Highlight text={c.email} query={search} />
                  </p>
                </td>
                <td className="px-3 py-3 tabular-nums font-medium">{c.totalOrders}</td>
                <td className="px-3 py-3 tabular-nums font-semibold">{formatINR(c.totalSpent)}</td>
                <td className="px-3 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">{formatRelativeDate(c.lastOrderAt)}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${CUSTOMER_TYPE_STYLES[c.type]}`}>
                    {CUSTOMER_TYPE_LABELS[c.type] || c.type}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${CUSTOMER_STATUS_STYLES[c.status]}`}>
                    {CUSTOMER_STATUS_LABELS[c.status] || c.status}
                  </span>
                </td>
                <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-0.5">
                    <ActionBtn icon={Eye} label="View Profile" onClick={() => onAction('profile', c)} loading={loadingAction === `${c.id}:profile`} />
                    <ActionBtn icon={Package} label="View Orders" onClick={() => onAction('orders', c)} loading={loadingAction === `${c.id}:orders`} />
                    <ActionBtn icon={MessageCircle} label="Chat" onClick={() => onAction('chat', c)} loading={loadingAction === `${c.id}:chat`} />
                    <MoreMenu customer={c} onAction={onAction} loadingAction={loadingAction} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
        {customers.map((c) => (
          <button
            key={`m-${c.id}`}
            type="button"
            onClick={() => onRowClick?.(c)}
            className="w-full text-left p-4 hover:bg-page"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{c.name}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${CUSTOMER_STATUS_STYLES[c.status]}`}>
                {CUSTOMER_STATUS_LABELS[c.status]}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{c.phone} · {formatINR(c.totalSpent)}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50">
        <p className="text-xs text-slate-500 tabular-nums">
          Showing {start} to {end} of {total}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            aria-label="Rows per page"
            className="rounded-lg border border-slate-200 bg-transparent px-2 py-1.5 text-xs"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>{n} / page</option>
            ))}
          </select>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
            className="px-2.5 py-1.5 rounded-lg text-xs border border-slate-200 disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-xs tabular-nums font-medium px-1">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(page + 1)}
            className="px-2.5 py-1.5 rounded-lg text-xs border border-slate-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
