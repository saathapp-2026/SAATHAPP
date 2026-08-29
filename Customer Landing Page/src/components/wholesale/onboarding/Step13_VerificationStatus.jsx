import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ShieldCheck, AlertCircle, ArrowRight, Bell, Sparkles, LayoutDashboard, RefreshCw } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const VERIFICATION_STAGES = [
  { id: 'Pending', title: 'Application Submitted', desc: 'Application received and queued for compliance review.' },
  { id: 'Document Verification', title: 'Document Verification', desc: 'Aadhaar, PAN, & Trade License checked by legal team.' },
  { id: 'GST Verification', title: 'GSTIN Verification', desc: 'Active GST registration verified with GST portal.' },
  { id: 'Business Verification', title: 'Business Profile Audit', desc: 'Company details and business category audited.' },
  { id: 'Warehouse Verification', title: 'Warehouse Location Check', desc: 'Fulfillment address and storage space verified.' },
  { id: 'Bank Verification', title: 'Bank Account & Penny Drop', desc: 'Penny drop test successful on HDFC account.' },
  { id: 'Approved', title: 'Wholesale Partner Approved', desc: 'Account activated! Wholesale dashboard unlocked.' },
];

export default function Step13_VerificationStatus({ onGoToDashboard }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const [isSimulating, setIsSimulating] = useState(false);

  if (!formData.onboardingPaymentCompleted) {
    return (
      <div className="mx-auto max-w-xl py-16 px-4 text-center">
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8">
          <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Payment Pending</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Complete onboarding fee payment and submit your application to track verification status.
          </p>
        </div>
      </div>
    );
  }

  const handleSimulateApproval = () => {
    setIsSimulating(true);
    addToast('Processing verification...', 'info');
    setTimeout(() => {
      updateFormData({ applicationStatus: 'Approved' });
      setIsSimulating(false);
      addToast('Application Approved! Welcome to SaathApp Wholesale Network.', 'success');
    }, 1500);
  };

  const isApproved = formData.applicationStatus === 'Approved';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Phase 12 — Partner Verification Status
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Application Tracker
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Application Ref: <strong className="font-mono text-emerald-600 dark:text-emerald-400">SAATH-WHL-2026-8492</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSimulateApproval}
              disabled={isSimulating || isApproved}
              className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-1.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition disabled:opacity-50"
            >
              <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
              {isApproved ? 'Approved' : 'Verify Application'}
            </button>

            {isApproved && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.03]"
              >
                <LayoutDashboard size={16} />
                Open Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Verification Stepper List */}
        <div className="mt-8 space-y-4">
          {VERIFICATION_STAGES.map((stage, idx) => {
            const isCompleted = isApproved || stage.id === 'Pending' || stage.id === 'Document Verification' || stage.id === 'GST Verification' || stage.id === 'Business Verification' || stage.id === 'Warehouse Verification' || stage.id === 'Bank Verification';
            const isCurrent = !isApproved && stage.id === formData.applicationStatus;

            return (
              <div
                key={stage.id}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition ${
                  stage.id === 'Approved' && isApproved
                    ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/30'
                    : isCompleted
                    ? 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950'
                    : 'border-slate-200/60 dark:border-slate-800/60 opacity-60'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950 animate-pulse font-black'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{stage.title}</h3>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notifications Preference Box */}
        <div className="mt-8 rounded-2xl bg-slate-950 text-white p-5 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={18} className="text-emerald-400" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Live Status Notification Channels
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>SMS Alerts Enabled (+91 {formData.ownerMobile})</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Email Alerts ({formData.ownerEmail})</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>App Push Notifications Active</span>
            </div>
          </div>
        </div>

        {isApproved && (
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center shadow-xl">
            <Sparkles size={36} className="mx-auto mb-2 text-emerald-200" />
            <h3 className="text-2xl font-black">Congratulations! Your Wholesale Account is Active</h3>
            <p className="mt-1 text-sm text-emerald-100 font-medium max-w-lg mx-auto">
              You now have full access to SaathApp Wholesale Dashboard. List your catalogue, configure MOQ pricing, and start receiving bulk orders from 10,000+ verified retailers.
            </p>
            <button
              type="button"
              onClick={onGoToDashboard}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-6 inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 hover:bg-page px-8 py-3.5 text-sm font-extrabold shadow-2xl transition hover:scale-105"
            >
              <LayoutDashboard size={18} />
              Launch Wholesale Dashboard
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
