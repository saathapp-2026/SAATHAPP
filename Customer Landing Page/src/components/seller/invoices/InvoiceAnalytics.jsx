import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatINR } from '../../../config/seller/invoiceConstants';
import { getInvoiceAnalytics } from '../../../services/seller/sellerInvoicesService';

export default function InvoiceAnalytics({ open }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('daily');

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    setLoading(true);
    getInvoiceAnalytics()
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!open) return null;
  if (loading) {
    return <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse h-48 bg-page dark:bg-slate-900" />;
  }
  if (!data) return null;

  const chart = range === 'monthly' ? data.monthly : data.daily;
  const m = data.metrics;

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 md:p-5 space-y-4" aria-label="Invoice analytics">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="font-bold">Invoice Analytics</h2>
        <div className="flex gap-1">
          {['daily', 'monthly'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize ${
                range === r ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-page'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {[
          ['Revenue', formatINR(m.revenue)],
          ['GST Collected', formatINR(m.gstCollected)],
          ['Collection Rate', `${m.collectionRate}%`],
          ['Avg Invoice', formatINR(m.aiv)],
          ['Pending Amt', formatINR(m.pendingAmount)],
          ['Overdue Amt', formatINR(m.overdueAmount)],
          ['Paid', m.paidCount],
          ['Pending Pay', m.pendingPayments],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[10px] text-slate-500">{label}</p>
            <p className="font-bold tabular-nums text-sm">{value}</p>
          </div>
        ))}
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chart || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={36} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
