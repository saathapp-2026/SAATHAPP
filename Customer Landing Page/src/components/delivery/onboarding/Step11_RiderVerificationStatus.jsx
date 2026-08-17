import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ShieldCheck, RefreshCw, LayoutDashboard, Sparkles, Bell, Truck } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export const RIDER_VERIFICATION_STAGES = [
  { id: 'Pending', title: 'Application & Fee Received', desc: 'One-Time Onboarding Fee paid. Queued for background audit.' },
  { id: 'Document Verification', title: 'Aadhaar & Identity Audit', desc: 'Aadhaar Card and identity cross-checked with UIDAI portal.' },
  { id: 'DL Check', title: 'Driving Licence Verification', desc: 'DL validity and vehicle class verified with Parivahan portal.' },
  { id: 'RC Check', title: 'Vehicle Registration (RC) Check', desc: 'RC Book and vehicle insurance verified.' },
  { id: 'Bank Verification', title: 'Bank Account Penny Drop Test', desc: 'Penny drop test successful on SBI account.' },
  { id: 'Approved', title: 'Rider Account Activated', desc: 'Account active! SaathApp Rider App access granted.' },
];

export default function Step11_RiderVerificationStatus({ onGoToDashboard }) {
  const { formData, updateFormData, addToast } = useDelivery();
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateApproval = () => {
    setIsSimulating(true);
    addToast('Simulating rider background check and verification...', 'info');
    setTimeout(() => {
      updateFormData({ applicationStatus: 'Approved' });
      setIsSimulating(false);
      addToast('Rider Account Approved & Activated!', 'success');
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
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              Phase 11 — Delivery Partner Status Tracker
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Rider Verification Status
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Ref ID: <strong className="font-mono text-amber-600 dark:text-amber-400">SAATH-RIDER-2026-9842</strong> • Timeline: <strong className="text-white">3–30 Business Days</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSimulateApproval}
              disabled={isSimulating || isApproved}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition disabled:opacity-50"
            >
              <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
              {isApproved ? 'Approved' : 'Simulate Fast Approval'}
            </button>

            {isApproved && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-6 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.03]"
              >
                <Truck size={16} />
                Open Rider Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Verification Stepper */}
        <div className="mt-8 space-y-4">
          {RIDER_VERIFICATION_STAGES.map((stage, idx) => {
            const isCompleted = isApproved || stage.id === 'Pending' || stage.id === 'Document Verification' || stage.id === 'DL Check' || stage.id === 'RC Check' || stage.id === 'Bank Verification';

            return (
              <div
                key={stage.id}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition ${stage.id === 'Approved' && isApproved
                    ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-950/30'
                    : isCompleted
                      ? 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950'
                      : 'border-slate-200/60 dark:border-slate-800/60 opacity-60'
                  }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${isCompleted
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-200 text-slate-500'
                    }`}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{stage.title}</h3>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${isCompleted
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
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

        {isApproved && (
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 text-center shadow-xl">
            <Sparkles size={36} className="mx-auto mb-2 text-slate-950" />
            <h3 className="text-2xl font-black">Congratulations! Your Delivery Account is Active</h3>
            <p className="mt-1 text-sm text-slate-900 font-bold max-w-lg mx-auto">
              Your 2-year activation is live. You can now accept live delivery orders, navigate to customers, and track daily wallet earnings!
            </p>
            <button
              type="button"
              onClick={onGoToDashboard}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 px-8 py-3.5 text-sm font-extrabold shadow-2xl transition hover:scale-105"
            >
              <Truck size={18} />
              Launch Rider Dashboard
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
