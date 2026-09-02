import { EmptyState } from '../../common/StateComponents';
import React from 'react';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  MessageCircle,
  Check,
  X,
  Printer,
  Phone,
  MapPin,
  Package,
  Navigation,
  Eye,
} from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderTimers from './OrderTimers';
import { highlight } from './OrderSearch';
import { ORDER_STATUS, canTransition } from '../../../config/seller/orderConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
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

const ITEM_COLORS = ['bg-violet-200', 'bg-emerald-200', 'bg-amber-200', 'bg-sky-200', 'bg-rose-200'];

function ItemThumbs({ items }) {
  const shown = items.slice(0, 3);
  const extra = items.length - shown.length;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((item, i) => (
          <div
            key={item.sku + i}
            title={item.name}
            className={`h-7 w-7 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-bold text-slate-600 ${ITEM_COLORS[i % ITEM_COLORS.length]}`}
          >
            {item.name.slice(0, 1)}
          </div>
        ))}
      </div>
      <span className="ml-2 text-xs text-slate-500">
        {items.length} item{items.length > 1 ? 's' : ''}
        {extra > 0 ? ` +${extra}` : ''}
      </span>
    </div>
  );
}

function PaymentBadge({ mode, status }) {
  const paid = status === 'received';
  const pending = status === 'pending';
  const refunded = status === 'refunded';
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-200">{mode}</p>
      <span
        className={`inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
          paid
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
            : refunded
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
              : pending
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                : 'bg-page text-slate-600'
        }`}
      >
        {paid ? 'Paid' : refunded ? 'Refunded' : 'Pending'}
      </span>
    </div>
  );
}

function RowActions({ order, onAction, loadingAction }) {
  const busy = !!loadingAction;
  const btn = (id, Icon, className, label) => (
    <button
      key={id}
      type="button"
      disabled={busy}
      title={label}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onAction?.(id, order);
      }}
      className={`h-7 w-7 inline-flex items-center justify-center rounded-lg transition-colors disabled:opacity-40 ${className}`}
    >
      <Icon size={13} />
    </button>
  );

  if (canTransition(order.status, ORDER_STATUS.ACCEPTED)) {
    return (
      <div className="flex items-center gap-1">
        {btn('accept', Check, 'bg-emerald-500 text-white hover:bg-emerald-600', 'Accept')}
        {btn('reject', X, 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40', 'Reject')}
        {btn('details', Eye, 'border border-slate-200 hover:bg-page', 'View')}
      </div>
    );
  }
  if ([ORDER_STATUS.ACCEPTED, ORDER_STATUS.PREPARING, ORDER_STATUS.PACKED].includes(order.status)) {
    return (
      <div className="flex items-center gap-1">
        {canTransition(order.status, ORDER_STATUS.PACKED) && btn('packed', Package, 'bg-violet-50 text-violet-600 hover:bg-violet-100', 'Mark Packed')}
        {canTransition(order.status, ORDER_STATUS.READY) && btn('ready', Package, 'bg-orange-50 text-orange-600 hover:bg-orange-100', 'Ready')}
        {btn('print_invoice', Printer, 'border border-slate-200 hover:bg-page', 'Print')}
        {btn('details', Eye, 'border border-slate-200 hover:bg-page', 'View')}
      </div>
    );
  }
  if (order.status === ORDER_STATUS.READY || order.status === ORDER_STATUS.PICKUP_ASSIGNED) {
    return (
      <div className="flex items-center gap-1">
        {canTransition(order.status, ORDER_STATUS.PICKUP_ASSIGNED) && btn('assign', Navigation, 'bg-sky-50 text-sky-600 hover:bg-sky-100', 'Assign')}
        {btn('print_label', Printer, 'border border-slate-200 hover:bg-page', 'Label')}
        {btn('details', Eye, 'border border-slate-200 hover:bg-page', 'View')}
      </div>
    );
  }
  if ([ORDER_STATUS.OUT_FOR_DELIVERY, ORDER_STATUS.PICKED_UP].includes(order.status)) {
    return (
      <div className="flex items-center gap-1">
        {btn('track', Navigation, 'bg-blue-50 text-blue-600 hover:bg-blue-100', 'Track')}
        {btn('call', Phone, 'border border-slate-200 hover:bg-page', 'Call')}
        {btn('directions', MapPin, 'border border-slate-200 hover:bg-page', 'Map')}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1">
      {btn('print_invoice', Printer, 'border border-slate-200 hover:bg-page', 'Print')}
      {btn('details', Eye, 'border border-slate-200 hover:bg-page', 'View')}
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
  _sortDir,
  onSort,
  page,
  pageSize = 8,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
  onAction,
  loadingAction,
  onRowClick,
}) {
  const allSelected = orders.length > 0 && orders.every((o) => selectedIds.has(o.id));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-4 animate-pulse space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 rounded-lg bg-page" />
        ))}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-surface p-12 text-center">
        <Inbox size={36} className="mx-auto text-slate-300 mb-2" />
        <h3 className="font-semibold">No orders found</h3>
        <p className="text-sm text-slate-500">Try adjusting filters or search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="hidden lg:block rounded-xl border border-slate-200 dark:border-slate-800 bg-surface overflow-hidden">
        <div className="overflow-x-auto max-h-[62vh]">
          <table className="w-full text-sm min-w-[1100px]">
            <thead className="sticky top-0 z-10 bg-page border-b border-slate-200 dark:border-slate-800">
              <tr className="transition-colors hover:bg-emerald-50/30 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-3 py-3 w-10">
                  <input type="checkbox" checked={allSelected} onChange={onToggleSelectAll} aria-label="Select all" className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none rounded" />
                </th>
                <th className="px-3 py-3">
                  <button type="button" onClick={() => onSort('createdAt')} className="inline-flex items-center gap-1">
                    Order Details <ArrowUpDown size={11} className={sortBy === 'createdAt' ? 'text-emerald-500' : 'opacity-40'} />
                  </button>
                </th>
                <th className="px-3 py-3">Customer</th>
                <th className="px-3 py-3">Items</th>
                <th className="px-3 py-3">
                  <button type="button" onClick={() => onSort('amount')} className="inline-flex items-center gap-1">
                    Amount <ArrowUpDown size={11} className={sortBy === 'amount' ? 'text-emerald-500' : 'opacity-40'} />
                  </button>
                </th>
                <th className="px-3 py-3">Payment</th>
                <th className="px-3 py-3">Delivery</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-4">
                    <EmptyState 
                      icon={Package} 
                      title="No orders found" 
                      description="You don't have any orders matching these filters."
                      className="border-0 shadow-none bg-transparent"
                    />
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => onRowClick?.(order)}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/90 cursor-pointer transition-colors"
                >
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(order.id)}
                      onChange={() => onToggleSelect(order.id)}
                      aria-label={`Select ${order.id}`}
                      className="rounded"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-bold text-slate-900 dark:text-slate-100">#{highlight(order.id, search)}</p>
                    <div className="mt-1"><OrderStatusBadge status={order.status} compact /></div>
                    <p className="text-[11px] text-slate-400 mt-1">{formatTime(order.createdAt)}</p>
                    <div className="mt-1"><OrderTimers order={order} /></div>
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-medium">{highlight(order.customer.name, search)}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-slate-500">{highlight(order.customer.phone, search)}</span>
                      <button
                        type="button"
                        title="WhatsApp"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAction?.('whatsapp', order);
                        }}
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        <MessageCircle size={13} />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3"><ItemThumbs items={order.items} /></td>
                  <td className="px-3 py-3">
                    <p className="font-bold tabular-nums">{money(order.amount)}</p>
                    <p className="text-[11px] text-slate-400">Tax {money(order.taxes)}</p>
                  </td>
                  <td className="px-3 py-3">
                    <PaymentBadge mode={order.paymentMode} status={order.paymentStatus} />
                  </td>
                  <td className="px-3 py-3">
                    <p className="text-xs font-medium">{order.deliveryPartner || order.deliveryMode}</p>
                    <p className="text-[11px] text-slate-400">
                      {order.agent?.name || (order.deliveryMode === 'saath' ? 'Saath Delivery' : '—')}
                    </p>
                  </td>
                  <td className="px-3 py-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <RowActions order={order} onAction={onAction} loadingAction={loadingAction} />
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-2.5">
        {orders.length === 0 ? (
          <EmptyState 
            icon={Package} 
            title="No orders found" 
            description="You don't have any orders matching these filters."
          />
        ) : (
          orders.map((order) => (
          <article
            key={order.id}
            onClick={() => onRowClick?.(order)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-3.5 space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedIds.has(order.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleSelect(order.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1"
                />
                <div>
                  <p className="font-bold">#{order.id}</p>
                  <p className="text-sm">{order.customer.name}</p>
                  <p className="text-xs text-slate-500">{formatTime(order.createdAt)}</p>
                </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex justify-between text-sm">
              <ItemThumbs items={order.items} />
              <span className="font-bold">{money(order.amount)}</span>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <RowActions order={order} onAction={onAction} loadingAction={loadingAction} />
            </div>
          </article>
        ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm px-1">
        <p className="text-slate-500">
          Showing {from} to {to} of {total} orders
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-xs text-slate-500">
            Rows per page
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-surface px-2 py-1"
            >
              {[6, 8, 10, 20].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let n = i + 1;
              if (totalPages > 5 && page > 3) n = page - 2 + i;
              if (n > totalPages) return null;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onPageChange(n)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold ${
                    page === n
                      ? 'bg-emerald-500 text-white'
                      : 'border border-slate-200 hover:bg-page'
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
