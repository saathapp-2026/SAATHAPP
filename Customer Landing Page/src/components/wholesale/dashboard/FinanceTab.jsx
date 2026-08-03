import React, { useState } from 'react';
import { Wallet, Landmark, ArrowUpRight, Download, Receipt, ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function FinanceTab({ isWithdrawModalOpen, onCloseWithdrawModal }) {
  const { formData, dashboardData, addToast } = useWholesale();
  const [withdrawAmt, setWithdrawAmt] = useState('50000');

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (Number(withdrawAmt) > dashboardData.kpis.walletBalance) {
      addToast('Withdrawal amount exceeds available wallet balance', 'error');
      return;
    }
    addToast(`Payout request for ₹${Number(withdrawAmt).toLocaleString('en-IN')} initiated to ${formData.bankName}!`, 'success');
    onCloseWithdrawModal();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Wallet & Financial Payouts</h2>
          <p className="text-xs text-slate-500">Manage escrow payouts, transfer funds to bank account, and export GST tax reports.</p>
        </div>
        <button
          type="button"
          onClick={onCloseWithdrawModal}
          className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-lg transition"
        >
          <ArrowUpRight size={16} /> Withdraw Funds to Bank
        </button>
      </div>

      {/* Wallet Card & Bank Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 text-white border border-emerald-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Escrow Wallet Balance</span>
            <Wallet size={20} className="text-emerald-400" />
          </div>
          <p className="text-3xl font-black">₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}</p>
          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
            <span>Settlement: <strong>{formData.settlementPreference}</strong></span>
            <span className="text-emerald-400 font-extrabold">Instant Payout Active</span>
          </div>
        </div>

        <div className="md:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Linked Payout Bank Account</h3>
              <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                Penny Drop Verified
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div><span className="text-slate-500 block">Bank:</span> <strong>{formData.bankName}</strong></div>
              <div><span className="text-slate-500 block">IFSC Code:</span> <strong className="font-mono">{formData.ifscCode}</strong></div>
              <div><span className="text-slate-500 block">Account No:</span> <strong className="font-mono">{formData.accountNumber}</strong></div>
              <div><span className="text-slate-500 block">Holder:</span> <strong>{formData.accountHolderName}</strong></div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => addToast('Exporting GST B2B Report (GSTR-1 format)...', 'success')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <Download size={14} /> GST Report (GSTR-1)
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Financial Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Txn ID</th>
                <th className="p-3">Description</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
              {[
                { txn: 'TXN-90412', desc: 'Escrow Release for ORD-9842', type: 'Credit', amt: '+₹1,25,000', date: 'Today, 10:30 AM', status: 'Completed' },
                { txn: 'TXN-90411', desc: 'Bank Withdrawal to HDFC Account', type: 'Payout', amt: '-₹2,00,000', date: 'Yesterday, 04:00 PM', status: 'Settled' },
                { txn: 'TXN-90410', desc: 'Escrow Release for ORD-9836', type: 'Credit', amt: '+₹62,000', date: '01 Aug 2026', status: 'Completed' },
              ].map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{t.txn}</td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white">{t.desc}</td>
                  <td className="p-3">{t.type}</td>
                  <td className={`p-3 font-black ${t.type === 'Credit' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>{t.amt}</td>
                  <td className="p-3 text-slate-500">{t.date}</td>
                  <td className="p-3 text-right">
                    <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-extrabold">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
              Withdraw Payout Funds
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Transfer funds directly from your SaathApp Escrow Wallet to {formData.bankName} ({formData.accountNumber.slice(-4)}).
            </p>
            <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Withdrawal Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  value={withdrawAmt}
                  onChange={(e) => setWithdrawAmt(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 font-extrabold text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <span>Available Balance: <strong>₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}</strong></span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onCloseWithdrawModal}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 text-white px-6 py-2 text-xs font-extrabold shadow"
                >
                  Confirm Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
