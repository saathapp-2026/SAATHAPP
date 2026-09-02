import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Lock } from 'lucide-react';

export default function PaymentSummary({ fee, commission, loading, onPay, disabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl bg-surface/5 backdrop-blur border border-white/10 p-6"
    >
      <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Onboarding Fee</span>
          <span className="font-medium">
            {loading ? '...' : `₹${fee?.toLocaleString('en-IN') || '0'}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">GST (included)</span>
          <span className="text-slate-500">—</span>
        </div>
        {commission && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Order Commission</span>
            <span className="text-emerald-400">{commission.display} per order</span>
          </div>
        )}
        <div className="border-t border-white/10 pt-3 flex justify-between">
          <span className="font-semibold">Total Payable</span>
          <span className="font-bold text-lg text-emerald-400">
            {loading ? '...' : `₹${fee?.toLocaleString('en-IN') || '0'}`}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPay}
        disabled={disabled || loading || !fee}
        className="duration-200 active:scale-[0.98] disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
      >
        <CreditCard size={18} />
        Proceed to Payment
      </button>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Lock size={12} />
          Secure Payment
        </span>
        <span className="flex items-center gap-1">
          <Shield size={12} />
          256-bit SSL
        </span>
      </div>
    </motion.div>
  );
}
