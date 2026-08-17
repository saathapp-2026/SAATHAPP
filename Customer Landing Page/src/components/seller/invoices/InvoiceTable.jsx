import React, { useState } from 'react';
import { Eye, Download, MoreVertical, Mail, MessageCircle, Printer, Pencil, Ban, Trash2, FileSpreadsheet, Loader2 } from 'lucide-react';
import {
  INVOICE_STATUS_LABELS,
  INVOICE_STATUS_STYLES,
  formatINR,
  formatInvoiceDate,
} from '../../../config/seller/invoiceConstants';

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

function MoreMenu({ invoice, onAction, loadingAction }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'edit', label: 'Edit', icon: Pencil },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'print', label: 'Print', icon: Printer },
    { id: 'excel', label: 'Download Excel', icon: FileSpreadsheet },
    { id: 'cancel', label: 'Cancel', icon: Ban },
    { id: 'delete', label: 'Delete Draft', icon: Trash2 },
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
        <div className="absolute right-0 mt-1 w-48 rounded-xl border border-slate-200 bg-surface shadow-xl p-1 z-[40]">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              disabled={loadingAction === `${invoice.id}:${id}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onAction?.(id, invoice);
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
      <button type="button" onClick={() => onSort?.(sortKey)} className="inline-flex items-center gap-1 hover:text-slate-900">
        {label}
        {active && <span className="text-[10px]">{sortDir === 'asc' ? '▲' : '▼'}</span>}
      </button>
    </th>
  );
}

export default function InvoiceTable({
  invoices = [],
  loading,
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
  const allSelected = invoices.length > 0 && invoices.every((i) => selectedIds.has(i.id));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 space-y-3 animate-pulse" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-page" />
        ))}
      </div>
    );
  }

  if (!invoices.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-surface p-12 text-center" role="status">
        <h3 className="font-semibold mb-1">No invoices found</h3>
        <p className="text-sm text-slate-500">Create your first GST invoice to get started.</p>
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
                  aria-label="Select all invoices"
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
              </th>
              <SortTh label="Invoice #" sortKey="number" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <SortTh label="Customer" sortKey="customer" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <th className="text-left px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">Amount</th>
              <th className="text-left px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">GST</th>
              <SortTh label="Total Amount" sortKey="amount" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <th className="text-left px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">Status</th>
              <SortTh label="Date" sortKey="invoiceDate" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
              <th className="text-right px-3 py-3 font-semibold text-slate-600 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const taxable = (inv.totals?.subtotal ?? 0);
              return (
                <tr
                  key={inv.id}
                  onClick={() => onRowClick?.(inv)}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-page cursor-pointer"
                >
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(inv.id)}
                      onChange={() => onToggleSelect(inv.id)}
                      aria-label={`Select ${inv.number}`}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-900 dark:text-slate-50 whitespace-nowrap">{inv.number}</td>
                  <td className="px-3 py-3 min-w-[160px]">
                    <p className="font-medium">{inv.customer?.name}</p>
                    <p className="text-[11px] text-slate-400">{inv.customer?.gstin || 'B2C'}</p>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{formatINR(taxable)}</td>
                  <td className="px-3 py-3 tabular-nums">{formatINR(inv.totals?.taxTotal)}</td>
                  <td className="px-3 py-3 tabular-nums font-semibold">{formatINR(inv.totals?.grandTotal)}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${INVOICE_STATUS_STYLES[inv.status]}`}>
                      {INVOICE_STATUS_LABELS[inv.status] || inv.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap text-xs">{formatInvoiceDate(inv.invoiceDate)}</td>
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-0.5">
                      <ActionBtn icon={Eye} label="View" onClick={() => onAction('view', inv)} loading={loadingAction === `${inv.id}:view`} />
                      <ActionBtn icon={Download} label="Download PDF" onClick={() => onAction('download', inv)} loading={loadingAction === `${inv.id}:download`} />
                      <MoreMenu invoice={inv} onAction={onAction} loadingAction={loadingAction} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800 border-t">
        {invoices.map((inv) => (
          <button key={`m-${inv.id}`} type="button" onClick={() => onRowClick?.(inv)} className="w-full text-left p-4">
            <div className="flex justify-between gap-2">
              <p className="font-semibold">{inv.number}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${INVOICE_STATUS_STYLES[inv.status]}`}>
                {INVOICE_STATUS_LABELS[inv.status]}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{inv.customer?.name} · {formatINR(inv.totals?.grandTotal)}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50">
        <p className="text-xs text-slate-500 tabular-nums">
          Showing {start} to {end} of {total} invoices
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
          <button type="button" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)} className="px-2.5 py-1.5 rounded-lg text-xs border border-slate-200 disabled:opacity-40">
            Prev
          </button>
          <span className="text-xs tabular-nums font-medium">{page} / {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => onPageChange?.(page + 1)} className="px-2.5 py-1.5 rounded-lg text-xs border border-slate-200 disabled:opacity-40">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
