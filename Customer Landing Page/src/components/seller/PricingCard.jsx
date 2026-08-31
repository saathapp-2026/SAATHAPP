import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Shield, Clock, RefreshCw } from 'lucide-react';

export default function PricingCard({ feeData, loading, title = 'Seller Onboarding Fee' }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 p-6 animate-pulse">
        <div className="h-4 bg-surface/10 rounded w-1/3 mb-4" />
        <div className="h-12 bg-surface/10 rounded w-2/3 mb-4" />
        <div className="h-3 bg-surface/10 rounded w-full mb-2" />
        <div className="h-3 bg-surface/10 rounded w-4/5" />
      </div>
    );
  }

  if (!feeData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-teal-500/20 border border-emerald-400/30 p-6 md:p-8"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center gap-2 text-emerald-300 text-sm font-medium mb-2">
          <Shield size={16} />
          {title}
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <IndianRupee size={28} className="text-emerald-400" />
          <motion.span
            key={feeData.fee}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            {feeData.fee?.toLocaleString('en-IN')}
          </motion.span>
        </div>

        <p className="text-slate-400 text-sm mb-6">
          One-time fee · Valid for {feeData.validityYears} years
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-surface/5 border border-white/10 p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock size={12} />
              Validity
            </div>
            <p className="text-sm font-semibold">{feeData.validityYears} Years</p>
          </div>
          <div className="rounded-xl bg-surface/5 border border-white/10 p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <RefreshCw size={12} />
              Renewal
            </div>
            <p className="text-sm font-semibold">
              ₹{feeData.renewalAmount?.toLocaleString('en-IN')} ({feeData.renewalPercentage}%)
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-slate-500">
            Range: ₹{feeData.minFee?.toLocaleString('en-IN')} – ₹{feeData.maxFee?.toLocaleString('en-IN')} for{' '}
            {feeData.categoryLabel} in {feeData.locationTierLabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
