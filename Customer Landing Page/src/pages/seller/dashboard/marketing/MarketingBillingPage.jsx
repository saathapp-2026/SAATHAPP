import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CreditCard, FileText, Wallet, Clock3 } from 'lucide-react';
import { getAdSummary } from '../../../../services/seller/sellerAdvertisementsService';
import { formatINR } from '../../../../config/seller/adConstants';

const BILLING_ITEMS = [
  { label: 'Total spend', key: 'spent' },
  { label: 'Total revenue', key: 'revenue' },
  { label: 'Remaining budget', key: 'remaining' },
  { label: 'ROAS', key: 'roas' },
];

export default function MarketingBillingPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getAdSummary()
      .then((res) => {
        if (!active) return;
        setSummary(res.totals || {});
      })
      .catch(() => toast.error('Unable to load billing summary'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">Billing & Payments</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Invoice and payment dashboard</h2>
            <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">View campaign invoices, payment status, wallets and discounts in one place.</p>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            <CreditCard size={16} /> Add payment method
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {BILLING_ITEMS.map((item) => (
          <div key={item.key} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-3 text-emerald-600"><FileText size={18} /></span>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.label}</p>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">{item.key === 'roas' ? `${summary?.[item.key] || 0}x` : formatINR(summary?.[item.key])}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Latest invoice</p>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">GST invoice #INV-2026-021</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Wallet size={16} /> Payment pending
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">Invoice amount</p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">{formatINR(summary?.spent || 0)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">Due date</p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">{new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"><CreditCard size={16} /> Pay now</button>
          <button type="button" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"><Clock3 size={16} /> View invoice</button>
        </div>
      </div>
    </div>
  );
}
