import React, { useState } from 'react';
import {
  X,
  MapPin,
  MessageCircle,
  Phone,
  ChevronDown,
  User,
} from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderTimeline from './OrderTimeline';
import OrderActions from './OrderActions';
import CustomerQuickActions from './CustomerQuickActions';
import { ORDER_STATUS, canTransition, RETURN_STATUS } from '../../../config/seller/orderConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

export default function OrderDetailsDrawer({
  order,
  open,
  onClose,
  onAction,
  loadingAction,
  onCustomerAction,
  onReturnAdvance,
  onSaveNotes,
}) {
  const [notes, setNotes] = useState(order?.sellerNotes || '');
  const [tab, setTab] = useState('overview');
  const [moreOpen, setMoreOpen] = useState(false);

  React.useEffect(() => {
    setNotes(order?.sellerNotes || '');
    setTab('overview');
    setMoreOpen(false);
  }, [order?.id]);

  if (!open || !order) return null;

  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const canAccept = canTransition(order.status, ORDER_STATUS.ACCEPTED);
  const canReject = canTransition(order.status, ORDER_STATUS.REJECTED);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="order-drawer-title">
      <button type="button" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none absolute inset-0 bg-black/40" aria-label="Close panel" onClick={onClose} />
      <aside className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded absolute right-0 top-0 h-full w-full max-w-md bg-surface border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <header className="flex items-start justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 id="order-drawer-title" className="text-lg font-bold">Order #{order.id}</h2>
              <OrderStatusBadge status={order.status} compact />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{order.invoiceNumber}</p>
          </div>
          <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-2 rounded-lg hover:bg-page" aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <div className="flex gap-1 px-4 pt-2 border-b border-slate-200 dark:border-slate-800 shrink-0">
          {[
            ['overview', 'Overview'],
            ['actions', 'Actions'],
            ['timeline', 'Timeline'],
            ['return', 'Return'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-3 py-2 text-xs font-semibold border-b-2 -mb-px ${
                tab === id ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {tab === 'overview' && (
            <>
              {/* Customer */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Customer Details</h3>
                <div className="flex gap-3">
                  <div className="h-11 w-11 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                    <User size={20} className="text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{order.customer.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm text-slate-500">{order.customer.phone}</span>
                      <button type="button" onClick={() => onCustomerAction?.('whatsapp')} className="text-emerald-500" title="WhatsApp">
                        <MessageCircle size={14} />
                      </button>
                      <button type="button" onClick={() => onCustomerAction?.('call')} className="text-slate-400 hover:text-slate-600" title="Call">
                        <Phone size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 flex gap-1">
                      <MapPin size={12} className="mt-0.5 shrink-0" />
                      {order.customer.address}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <CustomerQuickActions customer={order.customer} onAction={onCustomerAction} />
                </div>
              </section>

              {/* Products short */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Items</h3>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.sku} className="flex justify-between gap-2 text-sm">
                      <span className="truncate">{item.name} × {item.qty}</span>
                      <span className="font-medium shrink-0">{money(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Order Summary</h3>
                {[
                  ['Items Total', money(subtotal)],
                  ['Delivery Charge', money(order.deliveryCharge)],
                  ['Packing Charge', money(order.packingCharge)],
                  ['Platform Fee', money(order.platformFee)],
                  ['Tax', money(order.taxes)],
                  ['Discount', order.discount ? `- ${money(order.discount)}` : money(0)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-slate-500">{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">{money(order.amount)}</span>
                </div>
                <div className="flex justify-between text-xs pt-1">
                  <span className="text-slate-500">Payment: <span className="uppercase font-semibold text-slate-700 dark:text-slate-200">{order.paymentMode}</span></span>
                  <span className={`font-semibold capitalize ${order.paymentStatus === 'received' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {order.paymentStatus === 'received' ? 'Paid' : order.paymentStatus}
                  </span>
                </div>
              </section>

              {/* Timeline stepper */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Order Timeline</h3>
                <OrderTimeline timeline={order.timeline} currentStatus={order.status} variant="stepper" />
              </section>

              {/* Notes */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-page dark:bg-slate-950 text-sm"
                  placeholder="Seller notes…"
                />
                <button
                  type="button"
                  onClick={() => onSaveNotes?.(notes)}
                  className="mt-2 text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Save Notes
                </button>
              </section>
            </>
          )}

          {tab === 'actions' && (
            <OrderActions order={order} onAction={onAction} loadingAction={loadingAction} showAll />
          )}

          {tab === 'timeline' && (
            <OrderTimeline timeline={order.timeline} currentStatus={order.status} />
          )}

          {tab === 'return' && (
            <section className="space-y-3">
              {!order.returnFlow ? (
                <p className="text-sm text-slate-500">No return request on this order.</p>
              ) : (
                <>
                  <p className="text-sm">Current: <span className="font-semibold">{order.returnFlow.status}</span></p>
                  <ol className="space-y-2">
                    {(order.returnFlow.history || []).map((h, i) => (
                      <li key={i} className="text-sm border-l-2 border-emerald-500 pl-3">
                        <p className="font-medium">{h.status}</p>
                        <p className="text-xs text-slate-500">{new Date(h.at).toLocaleString('en-IN')}</p>
                      </li>
                    ))}
                  </ol>
                  {(() => {
                    const steps = Object.values(RETURN_STATUS);
                    const idx = steps.indexOf(order.returnFlow.status);
                    const next = steps[idx + 1];
                    if (!next) return null;
                    return (
                      <button
                        type="button"
                        onClick={() => onReturnAdvance?.(next)}
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white"
                      >
                        Advance to {next.replace(/_/g, ' ')}
                      </button>
                    );
                  })()}
                </>
              )}
            </section>
          )}
        </div>

        {/* Footer actions — mock style */}
        <footer className="shrink-0 border-t border-slate-200 dark:border-slate-800 p-4 flex gap-2 bg-surface">
          {canAccept && (
            <button
              type="button"
              disabled={!!loadingAction}
              onClick={() => onAction?.('accept', order)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              Accept Order
            </button>
          )}
          {canReject && (
            <button
              type="button"
              disabled={!!loadingAction}
              onClick={() => onAction?.('reject', order)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30 disabled:opacity-50"
            >
              Reject
            </button>
          )}
          {!canAccept && !canReject && (
            <button
              type="button"
              onClick={() => onAction?.('details', order)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white"
            >
              View Full Details
            </button>
          )}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="h-full px-3 rounded-xl border border-slate-200 hover:bg-page"
              aria-label="More actions"
            >
              <ChevronDown size={16} />
            </button>
            {moreOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 rounded-xl border border-slate-200 bg-surface shadow-xl p-1 z-10 max-h-56 overflow-y-auto">
                {['print_invoice', 'print_label', 'call', 'whatsapp', 'assign', 'packed', 'ready', 'track', 'cancel'].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMoreOpen(false);
                      onAction?.(id, order);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs capitalize hover:bg-page"
                  >
                    {id.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>
        </footer>
      </aside>
    </div>
  );
}
