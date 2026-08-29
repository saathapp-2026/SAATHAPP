import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, CreditCard, CheckCircle2, ArrowRight, ArrowLeft, Clock, Search } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const SETTLEMENT_PREFERENCES = [
  { id: 'Daily', title: 'Daily Settlement', desc: 'Direct payout to bank within 24 hours of order delivery.' },
  { id: 'Weekly', title: 'Weekly Settlement', desc: 'Combined payout every Monday morning.' },
  { id: 'Monthly', title: 'Monthly Settlement', desc: 'Lump-sum monthly transfer on the 1st of every month.' },
];

export default function Step9_BankSettlement({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const [bankBranchInfo, setBankBranchInfo] = useState('HDFC Bank, Green Park Branch, New Delhi');

  const handleIfscLookup = (ifsc) => {
    updateFormData({ ifscCode: ifsc.toUpperCase() });
    if (ifsc.length === 11) {
      setBankBranchInfo('HDFC Bank, Okhla Industrial Estate Branch, New Delhi');
      addToast('IFSC verified: HDFC Bank Okhla Branch', 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.accountName || !formData.accountName.trim()) {
      addToast('Please enter bank account holder name', 'error');
      return;
    }
    if (!formData.accountNumber || !formData.accountNumber.trim()) {
      addToast('Please enter bank account number', 'error');
      return;
    }
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      addToast('Account numbers do not match!', 'error');
      return;
    }
    const cleanIfsc = (formData.ifscCode || '').trim();
    if (cleanIfsc.length !== 11) {
      addToast('Please enter a valid 11-character IFSC code', 'error');
      return;
    }
    addToast('Bank & settlement details saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 8 — Bank & Settlement Setup
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Payout Account & Settlement Terms
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Enter your company bank account details for automated escrow payouts and settlement reports.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Bank Account Holder Name *
              </label>
              <div className="relative flex items-center">
                <Landmark size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.accountHolderName}
                  onChange={(e) => updateFormData({ accountHolderName: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Must match GST / Business Name"
                />
              </div>
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
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="e.g. HDFC Bank"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                IFSC Code *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={formData.ifscCode}
                  onChange={(e) => handleIfscLookup(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-mono uppercase font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="HDFC0000240"
                />
              </div>
              {bankBranchInfo && (
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} /> {bankBranchInfo}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Bank Account Number *
              </label>
              <div className="relative flex items-center">
                <CreditCard size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-mono font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="•••• •••• •••• 8239"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Confirm Account Number *
              </label>
              <div className="relative flex items-center">
                <CreditCard size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.confirmAccountNumber}
                  onChange={(e) => updateFormData({ confirmAccountNumber: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-mono font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="50200049182394"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Business VPA / UPI ID (Optional)
              </label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => updateFormData({ upiId: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="saathappwholesale@hdfcbank"
              />
            </div>
          </div>

          {/* Settlement Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Payout Settlement Frequency *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SETTLEMENT_PREFERENCES.map((pref) => {
                const isSelected = formData.settlementPreference === pref.id;
                return (
                  <div
                    key={pref.id}
                    onClick={() => updateFormData({ settlementPreference: pref.id })}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 hover:border-slate-300'
                    }`}
                  >
                    <Clock size={18} className={isSelected ? 'text-emerald-500' : 'text-slate-400'} />
                    <h3 className="mt-2 text-xs font-extrabold text-slate-900 dark:text-white">{pref.title}</h3>
                    <p className="mt-1 text-[11px] text-slate-500 leading-snug">{pref.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
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
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Save & Next Phase
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
