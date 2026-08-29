import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, CreditCard, CheckCircle2, ArrowRight, ArrowLeft, Wallet } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function Step7_RiderBankPayout({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.accountHolderName || !formData.accountHolderName.trim()) {
      addToast('Please enter account holder name', 'error');
      return;
    }
    if (!formData.accountNumber || !formData.accountNumber.trim()) {
      addToast('Please enter complete bank account number', 'error');
      return;
    }
    const cleanIfsc = (formData.ifscCode || '').trim();
    if (cleanIfsc.length !== 11) {
      addToast('Please enter a valid 11-character IFSC code', 'error');
      return;
    }
    addToast('Rider bank payout details saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 6 — Bank Account & Payout Setup
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Rider Earnings & Bank Payouts
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Enter your bank account or UPI VPA to receive daily and weekly order delivery earnings.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Account Holder Name (As per Bank) *
              </label>
              <input
                type="text"
                required
                value={formData.accountHolderName}
                onChange={(e) => updateFormData({ accountHolderName: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Vikram Singh"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Bank Name *
              </label>
              <input
                type="text"
                required
                value={formData.bankName}
                onChange={(e) => updateFormData({ bankName: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="State Bank of India"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                IFSC Code *
              </label>
              <input
                type="text"
                required
                value={formData.ifscCode}
                onChange={(e) => updateFormData({ ifscCode: e.target.value.toUpperCase() })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold font-mono text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="SBIN0001234"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Bank Account Number *
              </label>
              <input
                type="text"
                required
                value={formData.accountNumber}
                onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold font-mono text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="38920194820"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                UPI ID (Optional)
              </label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => updateFormData({ upiId: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="vikram.rider@sbi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Payout Frequency *
              </label>
              <select
                value={formData.payoutFrequency}
                onChange={(e) => updateFormData({ payoutFrequency: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="Daily Payout">Daily Payout (Automatic Next Morning)</option>
                <option value="Weekly Payout">Weekly Payout (Every Monday)</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.02]"
            >
              Save & Next: Fee Payment
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
