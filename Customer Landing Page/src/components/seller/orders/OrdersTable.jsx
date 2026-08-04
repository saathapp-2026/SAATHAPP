import React from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderTimers from './OrderTimers';
import OrderActions from './OrderActions';
import { highlight } from './OrderSearch';

const COLUMNS = [
  { key: 'id', label: 'Order ID', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'phone', label: 'Phone' },
  { key: 'items', label: 'Items' },
  { key: 'paymentMode', label: 'Payment Mode', sortable: true },
  { key: 'deliveryMode', label: 'Delivery Mode' },
  { key: 'deliveryPartner', label: 'Delivery Partner' },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'commission', label: 'Commission', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'pickupTime', label: 'Pickup Time' },
  { key: 'deliveryEta', label: 'Delivery ETA' },
  { key: 'actions', label: 'Actions' },
];

function formatMoney(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`;
}

function formatTime(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-2 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-slate-100 dark:bg-slate-800" />
      ))}
    </div>
  );
}

export default function OrdersTable({
  orders = [],
  loading,
  search,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  sortBy,
  sortDir,
  onSort,
  page,
  totalPages,
  total,
  onPageChange,
  onAction,
  loadingAction,
  onRowClick,
}) {
  const allSelected = orders.length > 0 && orders.every((o) => selectedIds.has(o.id));

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <TableSkeleton />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center" role="status">
        <Inbox size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
        <h3 className="font-semibold mb-1">No orders found</h3>
        <p className="text-sm text-slate-500">Try adjusting filters or search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Desktop table */}
      <div className="hidden lg:block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-sm min-w-[1400px]">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-3 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleSelectAll}
                    aria-label="Select all orders"
                    className="rounded border-slate-300"
                  />
                </th>
                {COLUMNS.map((col) => (
                  <th key={col.key} scope="col" className="px-3 py-3 text-left font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => onSort(col.key === 'customer' ? 'createdAt' : col.key)}
                        className="inline-flex items-center gap-1 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                      >
                        {col.label}
                        <ArrowUpDown size={12} className={sortBy === col.key ? 'text-emerald-500' : 'opacity-40'} />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(order.id)}
                      onChange={() => onToggleSelect(order.id)}
                      aria-label={`Select order ${order.id}`}
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <button type="button" onClick={() => onRowClick?.(order)} className="font-semibold text-emerald-600 hover:underline">
                      {highlight(order.id, search)}
                    </button>
                    <div className="mt-1"><OrderTimers order={order} /></div>
                  </td>
                  <td className="px-3 py-3">
                    <button type="button" onClick={() => onRowClick?.(order)} className="text-left">
                      <div className="font-medium">{highlight(order.customer.name, search)}</div>
                      {order.isRepeatCustomer && <span className="text-[10px] text-blue-500">Repeat</span>}
                    </button>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{highlight(order.customer.phone, search)}</td>
                  <td className="px-3 py-3">
                    <div className="max-w-[160px] truncate" title={order.items.map((i) => i.name).join(', ')}>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      <span className="block text-xs text-slate-500 truncate">
                        {highlight(order.items[0]?.name, search)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 uppercase text-xs font-medium">{order.paymentMode}</td>
                  <td className="px-3 py-3 capitalize text-xs">{order.deliveryMode?.replace('_', ' ')}</td>
                  <td className="px-3 py-3 text-xs">{order.deliveryPartner || order.agent?.name || '—'}</td>
                  <td className="px-3 py-3 font-semibold tabular-nums">{formatMoney(order.amount)}</td>
                  <td className="px-3 py-3 text-slate-500 tabular-nums">{formatMoney(order.commission)}</td>
                  <td className="px-3 py-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap">{formatTime(order.pickupTime)}</td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap">{formatTime(order.deliveryEta)}</td>
                  <td className="px-3 py-3">
                    <OrderActions order={order} onAction={onAction} loadingAction={loadingAction} compact />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={selectedIds.has(order.id)}
                  onChange={() => onToggleSelect(order.id)}
                  aria-label={`Select order ${order.id}`}
                  className="mt-1"
                />
                <div>
                  <button type="button" onClick={() => onRowClick?.(order)} className="font-bold text-emerald-600">
                    {highlight(order.id, search)}
                  </button>
                  <p className="text-sm font-medium">{highlight(order.customer.name, search)}</p>
                  <p className="text-xs text-slate-500">{highlight(order.customer.phone, search)}</p>
                </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>{order.items.length} items · {order.paymentMode.toUpperCase()}</span>
              <span className="font-bold">{formatMoney(order.amount)}</span>
            </div>
            <OrderTimers order={order} />
            <OrderActions order={order} onAction={onAction} loadingAction={loadingAction} compact />
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="text-slate-500">
          Page {page} of {totalPages} · {total} orders
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
