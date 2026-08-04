import React, { useState } from 'react';
import { X, MapPin, FileText } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderTimeline from './OrderTimeline';
import OrderActions from './OrderActions';
import CustomerQuickActions from './CustomerQuickActions';
import OrderTimers from './OrderTimers';
import { RETURN_STATUS } from '../../../config/seller/orderConstants';

function money(n) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`;
}

const RETURN_STEPS = Object.values(RETURN_STATUS);

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
  const [tab, setTab] = useState('details');

  React.useEffect(() => {
    setNotes(order?.sellerNotes || '');
    setTab('details');
  }, [order?.id]);

  if (!open || !order) return null;

  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="order-drawer-title">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close panel" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in">
        <header className="flex items-start justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 id="order-drawer-title" className="text-xl font-bold">{order.id}</h2>
            <p className="text-sm text-slate-500">{order.invoiceNumber}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <OrderStatusBadge status={order.status} />
              <OrderTimers order={order} />
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <div className="flex gap-1 px-4 pt-3 border-b border-slate-200 dark:border-slate-800 shrink-0 overflow-x-auto">
          {[
            ['details', 'Details'],
            ['actions', 'Actions'],
            ['timeline', 'Timeline'],
            ['return', 'Return'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${
                tab === id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {tab === 'details' && (
            <>
              <section>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="text-sm space-y-1 text-slate-600 dark:text-slate-300">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{order.customer.name}</p>
                  <p>{order.customer.phone}</p>
                  <p>{order.customer.email}</p>
                  <p className="flex items-start gap-1"><MapPin size={14} className="mt-0.5 shrink-0" />{order.customer.address}</p>
                </div>
                <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 h-36 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                  <a
                    href={`https://www.google.com/maps?q=${order.customer.lat},${order.customer.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Open in Google Maps ({order.customer.lat}, {order.customer.lng})
                  </a>
                </div>
                <div className="mt-3">
                  <CustomerQuickActions customer={order.customer} onAction={onCustomerAction} />
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-2">Products</h3>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id + item.sku} className="flex gap-3 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-400 shrink-0">
                        Img
                      </div>
                      <div className="flex-1 min-w-0 text-sm">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-xs text-slate-500">SKU {item.sku} · Qty {item.qty}</p>
                        <p className="text-xs">GST {item.gst}% · Disc {money(item.discount)}</p>
                      </div>
                      <p className="font-semibold text-sm">{money(item.price * item.qty)}</p>
                    </li>
                  ))}
                </ul>
                <dl className="mt-3 space-y-1 text-sm">
                  {[
                    ['Subtotal', money(subtotal)],
                    ['Discount', `- ${money(order.discount)}`],
                    ['Coupon', order.coupon || '—'],
                    ['Delivery Charge', money(order.deliveryCharge)],
                    ['Packing Charge', money(order.packingCharge)],
                    ['Platform Fee', money(order.platformFee)],
                    ['Commission', money(order.commission)],
                    ['Taxes', money(order.taxes)],
                    ['Grand Total', money(order.amount)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-slate-500">{k}</dt>
                      <dd className={`font-medium ${k === 'Grand Total' ? 'text-base' : ''}`}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <p className="text-sm">Mode: <span className="uppercase font-medium">{order.paymentMode}</span></p>
                <p className="text-sm">Status: <span className="capitalize font-medium">{order.paymentStatus}</span></p>
                <p className="text-sm flex items-center gap-1 mt-1"><FileText size={14} /> Invoice {order.invoiceNumber}</p>
              </section>

              <section>
                <h3 className="font-semibold mb-2">Delivery Details</h3>
                <p className="text-sm capitalize">Mode: {order.deliveryMode}</p>
                <p className="text-sm">Partner: {order.deliveryPartner || '—'}</p>
                {order.agent && (
                  <div className="mt-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                    <p className="font-medium">{order.agent.name}</p>
                    <p className="text-slate-500">{order.agent.vehicle} · ★ {order.agent.rating}</p>
                    <p className="text-slate-500">{order.agent.phone}</p>
                  </div>
                )}
                {order.handover && (
                  <div className="mt-2 text-xs space-y-1 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                    <p className="font-semibold text-sm mb-1">Handover Verification</p>
                    <p>Package: {order.handover.packageId}</p>
                    <p>OTP: {order.handover.otp} · QR: {order.handover.qrCode}</p>
                    <p>Seller sig: {order.handover.sellerSignature}</p>
                    <p>Delivery sig: {order.handover.deliverySignature}</p>
                    <p>GPS: {order.handover.gps?.lat}, {order.handover.gps?.lng}</p>
                    <p>Status: {order.handover.verified ? 'Verified' : 'Pending'}</p>
                  </div>
                )}
              </section>

              <section>
                <h3 className="font-semibold mb-2">Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm"
                  placeholder="Seller notes…"
                />
                <button
                  type="button"
                  onClick={() => onSaveNotes?.(notes)}
                  className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-white"
                >
                  Save Notes
                </button>
                {order.customer.notes && (
                  <p className="mt-2 text-xs text-slate-500">Customer note: {order.customer.notes}</p>
                )}
              </section>

              <section>
                <h3 className="font-semibold mb-2">Attachments</h3>
                {order.attachments?.length ? (
                  <ul className="text-sm space-y-1">
                    {order.attachments.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">No attachments</p>
                )}
              </section>

              {order.cancellation && (
                <section>
                  <h3 className="font-semibold mb-2">Cancellation History</h3>
                  <ul className="text-sm space-y-1">
                    {(order.cancellation.history || []).map((h, i) => (
                      <li key={i}>{h.reason} · {new Date(h.at).toLocaleString('en-IN')} · {h.by}</li>
                    ))}
                  </ul>
                </section>
              )}

              {order.rejection && (
                <section>
                  <h3 className="font-semibold mb-2">Rejection</h3>
                  <p className="text-sm">{order.rejection.reason}{order.rejection.customReason ? ` — ${order.rejection.customReason}` : ''}</p>
                </section>
              )}
            </>
          )}

          {tab === 'actions' && (
            <section>
              <h3 className="font-semibold mb-3">Order Detail Action Panel</h3>
              <OrderActions order={order} onAction={onAction} loadingAction={loadingAction} showAll />
            </section>
          )}

          {tab === 'timeline' && (
            <section>
              <h3 className="font-semibold mb-3">Timeline</h3>
              <OrderTimeline timeline={order.timeline} />
            </section>
          )}

          {tab === 'return' && (
            <section className="space-y-3">
              <h3 className="font-semibold">Return Workflow</h3>
              {!order.returnFlow ? (
                <p className="text-sm text-slate-500">No return request on this order.</p>
              ) : (
                <>
                  <p className="text-sm">Current: <span className="font-semibold">{order.returnFlow.status}</span></p>
                  <ol className="space-y-2">
                    {(order.returnFlow.history || []).map((h, i) => (
                      <li key={i} className="text-sm border-l-2 border-emerald-500 pl-3">
                        <p className="font-medium">{h.status}</p>
                        <p className="text-xs text-slate-500">{new Date(h.at).toLocaleString('en-IN')} · {h.actor}</p>
                        {h.remarks && <p className="text-xs">{h.remarks}</p>}
                      </li>
                    ))}
                  </ol>
                  {(() => {
                    const idx = RETURN_STEPS.indexOf(order.returnFlow.status);
                    const next = RETURN_STEPS[idx + 1];
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
      </aside>
    </div>
  );
}
