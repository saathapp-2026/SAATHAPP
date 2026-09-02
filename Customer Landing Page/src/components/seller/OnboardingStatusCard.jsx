import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, RefreshCw, IndianRupee } from 'lucide-react';
import { getValidityDates } from '../../services/sellerApi';

export default function OnboardingStatusCard({ onboardingFee, onRenew }) {
  const paid = onboardingFee?.paymentStatus === 'paid';
  const validity = onboardingFee?.validityEnd
    ? getValidityDates(onboardingFee.paidAt)
    : null;

  const statusConfig = {
    paid: { label: 'Active', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    pending: { label: 'Pending Payment', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    expired: { label: 'Expired', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
  };

  let status = 'pending';
  if (paid && validity?.isExpired) status = 'expired';
  else if (paid) status = 'paid';

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-emerald-500" />
          <h3 className="font-bold text-lg">Seller Onboarding</h3>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.bg} ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Paid Amount</p>
          <p className="font-semibold flex items-center gap-0.5">
            <IndianRupee size={14} />
            {onboardingFee?.calculatedFee?.toLocaleString('en-IN') || '—'}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Validity</p>
          <p className="font-semibold">2 Years</p>
        </div>
        {validity && (
          <>
            <div>
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <Calendar size={12} />
                Renewal Date
              </p>
              <p className="font-semibold text-sm">
                {new Date(validity.validityEnd).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Days Remaining</p>
              <p className={`font-semibold ${validity.daysRemaining <= 60 ? 'text-amber-500' : ''}`}>
                {validity.daysRemaining} days
              </p>
            </div>
          </>
        )}
      </div>

      {validity?.isNearingExpiry && onRenew && (
        <button
          type="button"
          onClick={onRenew}
          className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-medium text-sm hover:bg-amber-500/20 transition-colors"
        >
          <RefreshCw size={16} />
          Renew Now — ₹{onboardingFee?.renewalAmount?.toLocaleString('en-IN')}
        </button>
      )}
    </motion.div>
  );
}
