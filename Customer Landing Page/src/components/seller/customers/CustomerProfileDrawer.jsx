import React, { useState } from 'react';
import { X, Phone, Mail, MessageCircle, MapPin, Package, Star, Ban } from 'lucide-react';
import {
  CUSTOMER_TYPE_LABELS,
  CUSTOMER_TYPE_STYLES,
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_STATUS_STYLES,
  formatINR,
  formatRelativeDate,
} from '../../../config/seller/customerConstants';
import CustomerLifecycleTimeline from './CustomerLifecycleTimeline';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'orders', label: 'Orders' },
  { id: 'payments', label: 'Payments' },
  { id: 'returns', label: 'Returns' },
  { id: 'support', label: 'Support' },
  { id: 'loyalty', label: 'Loyalty' },
  { id: 'notes', label: 'Notes' },
  { id: 'timeline', label: 'Timeline' },
];

export default function CustomerProfileDrawer({
  open,
  customer,
  onClose,
  onAction,
  onSaveNotes,
  loadingAction,
}) {
  const [tab, setTab] = useState('overview');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    setNotes(customer?.notes || '');
    setTab('overview');
  }, [customer?.id]);

  if (!open || !customer) return null;

  return (
    <SellerOverlay
      open={open && !!customer}
      onClose={onClose}
      label="Customer profile"
      zIndex={SELLER_Z.drawer}
      className="flex justify-end"
      contentClassName="h-full"
    >
      <aside className="h-full w-full max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        <div className="flex items-start justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold">{customer.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{customer.id}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${CUSTOMER_TYPE_STYLES[customer.type]}`}>
                {CUSTOMER_TYPE_LABELS[customer.type]}
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${CUSTOMER_STATUS_STYLES[customer.status]}`}>
                {CUSTOMER_STATUS_LABELS[customer.status]}
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-1.5 px-4 py-2 overflow-x-auto border-b border-slate-100 dark:border-slate-800">
          {[
            { id: 'call', icon: Phone, label: 'Call' },
            { id: 'email', icon: Mail, label: 'Email' },
            { id: 'chat', icon: MessageCircle, label: 'Chat' },
            { id: 'orders', icon: Package, label: 'Orders' },
            { id: 'vip', icon: Star, label: 'VIP' },
            { id: 'block', icon: Ban, label: customer.status === 'blocked' ? 'Unblock' : 'Block' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onAction?.(id, customer)}
              disabled={!!loadingAction}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-1 px-3 pt-3 overflow-x-auto" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                tab === t.id ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
          {tab === 'overview' && (
            <>
              <section>
                <h3 className="font-semibold mb-2">Contact Details</h3>
                <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <p className="flex items-center gap-2"><Phone size={13} /> {customer.phone}</p>
                  <p className="flex items-center gap-2"><Mail size={13} /> {customer.email}</p>
                </div>
              </section>
              <section>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <MapPin size={13} className="mt-0.5 shrink-0" />
                  <span>
                    {customer.address}
                    <br />
                    {customer.city}, {customer.state} {customer.pincode}
                  </span>
                </p>
                <a
                  href={`https://www.google.com/maps?q=${customer.lat},${customer.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Open location map
                </a>
              </section>
              <section className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
                  <p className="text-[10px] text-slate-500">Orders</p>
                  <p className="font-bold tabular-nums">{customer.totalOrders}</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
                  <p className="text-[10px] text-slate-500">Spent</p>
                  <p className="font-bold tabular-nums">{formatINR(customer.totalSpent)}</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
                  <p className="text-[10px] text-slate-500">AOV</p>
                  <p className="font-bold tabular-nums">{formatINR(customer.averageOrderValue)}</p>
                </div>
              </section>
              <section>
                <h3 className="font-semibold mb-2">Wishlist</h3>
                {customer.wishlist?.length ? (
                  <ul className="list-disc pl-4 text-slate-600 dark:text-slate-300">
                    {customer.wishlist.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-xs">No wishlist items</p>
                )}
              </section>
              <section>
                <h3 className="font-semibold mb-2">Cart</h3>
                {customer.cart?.length ? (
                  <ul className="space-y-1">
                    {customer.cart.map((item) => (
                      <li key={item.name} className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span>{item.name} × {item.qty}</span>
                        <span className="tabular-nums">{formatINR(item.price * item.qty)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-xs">Cart empty</p>
                )}
              </section>
              <section>
                <h3 className="font-semibold mb-2">Documents</h3>
                {customer.documents?.length ? (
                  customer.documents.map((d) => (
                    <p key={d.name} className="text-emerald-600 text-xs font-medium">{d.name}</p>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs">No documents uploaded</p>
                )}
              </section>
              <section>
                <h3 className="font-semibold mb-2">Referral</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs">
                  Code: <b>{customer.referralCode}</b>
                  {customer.referredBy ? ` · Referred by ${customer.referredBy}` : ''}
                </p>
              </section>
            </>
          )}

          {tab === 'orders' && (
            <ul className="space-y-2">
              {(customer.orders || []).length ? (
                customer.orders.map((o) => (
                  <li key={o.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 flex justify-between gap-2">
                    <div>
                      <p className="font-semibold">{o.id}</p>
                      <p className="text-[11px] text-slate-500">{formatRelativeDate(o.date)} · {o.status}</p>
                    </div>
                    <p className="font-bold tabular-nums">{formatINR(o.amount)}</p>
                  </li>
                ))
              ) : (
                <p className="text-slate-400 text-xs">No orders yet</p>
              )}
            </ul>
          )}

          {tab === 'payments' && (
            <ul className="space-y-2">
              {(customer.payments || []).map((p) => (
                <li key={p.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 flex justify-between">
                  <div>
                    <p className="font-semibold">{p.id}</p>
                    <p className="text-[11px] text-slate-500">{p.method} · {formatRelativeDate(p.date)}</p>
                  </div>
                  <p className="font-bold">{formatINR(p.amount)}</p>
                </li>
              ))}
              {!customer.payments?.length && <p className="text-slate-400 text-xs">No payments</p>}
            </ul>
          )}

          {tab === 'returns' && (
            <ul className="space-y-2">
              {(customer.returns || []).map((r) => (
                <li key={r.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
                  <p className="font-semibold">{r.id}</p>
                  <p className="text-[11px] text-slate-500">{r.reason} · {r.status} · {formatRelativeDate(r.date)}</p>
                </li>
              ))}
              {!customer.returns?.length && <p className="text-slate-400 text-xs">No returns</p>}
            </ul>
          )}

          {tab === 'support' && (
            <ul className="space-y-2">
              {(customer.tickets || []).map((t) => (
                <li key={t.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
                  <p className="font-semibold">{t.subject}</p>
                  <p className="text-[11px] text-slate-500">{t.id} · {t.status} · {formatRelativeDate(t.date)}</p>
                </li>
              ))}
              {!customer.tickets?.length && <p className="text-slate-400 text-xs">No support tickets</p>}
            </ul>
          )}

          {tab === 'loyalty' && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-xs text-slate-500">Loyalty Points</p>
              <p className="text-3xl font-bold tabular-nums text-emerald-600">{customer.loyaltyPoints || 0}</p>
            </div>
          )}

          {tab === 'notes' && (
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                placeholder="Add internal notes…"
              />
              <button
                type="button"
                onClick={() => onSaveNotes?.(notes)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Save Notes
              </button>
            </div>
          )}

          {tab === 'timeline' && <CustomerLifecycleTimeline customer={customer} />}
        </div>
      </aside>
    </SellerOverlay>
  );
}
