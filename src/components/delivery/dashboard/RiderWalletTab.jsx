import React, { useState } from 'react';
import { Wallet, Landmark, ArrowRight, CheckCircle2, ShieldCheck, CreditCard, Clock, RefreshCw } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderWalletTab() {
  const { formData, dashboardData, addToast } = useDelivery();
  const [amount, setAmount] = useState('2450');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    addToast('Initiating penny drop & instant bank transfer to SBI Account...', 'info');

    setTimeout(() => {
      setIsProcessing(false);
      addToast(`₹${amount} successfully transferred to ${formData.accountNumber || 'Bank Account'}!`, 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Wallet size={14} /> Rider Earnings Wallet
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Earnings & Bank Payouts</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-6 text-slate-950 shadow-xl space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-slate-950 bg-slate-950/10 px-3 py-1 rounded-full">
            Available Wallet Balance
          </span>
          <h3 className="text-3xl font-black text-slate-950">₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-bold text-slate-900 leading-relaxed">
            Payout frequency: <strong>{formData.payoutFrequency || 'Daily Payout'}</strong> (Automatic Next Morning Transfer)
          </p>
        </div>

        {/* Bank Account Details */}
        <div className="md:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Landmark size={18} className="text-amber-500" /> Destination Bank Account
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Account Holder</span>
              <span className="font-extrabold text-slate-900 dark:text-white">{formData.accountHolderName || 'Vikram Singh'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Bank Name</span>
              <span className="font-extrabold text-slate-900 dark:text-white">{formData.bankName || 'State Bank of India'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">IFSC Code</span>
              <span className="font-mono font-extrabold text-slate-900 dark:text-white">{formData.ifscCode || 'SBIN0001234'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Account Number</span>
              <span className="font-mono font-extrabold text-slate-900 dark:text-white">{formData.accountNumber || '38920194820'}</span>
            </div>
          </div>

          <form onSubmit={handleWithdraw} className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full sm:w-44 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
              placeholder="Amount to withdraw"
            />
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3 text-xs font-black shadow-lg transition hover:scale-105 disabled:opacity-50"
            >
              {isProcessing ? 'Processing Transfer...' : `Instant Withdraw ₹${amount} to Bank`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
