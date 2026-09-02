import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Lock, Loader2 } from 'lucide-react';
import { getPlanById } from '../../services/sellerMembershipService';

export default function MembershipPaymentModal({ planId, onClose, onSuccess }) {
  const plan = getPlanById(planId);
  const [processing, setProcessing] = useState(false);
  const [method, setMethod] = useState('card');

  if (!plan || plan.price === 0) return null;

  const handlePay = async () => {
    setProcessing(true);
    try {
      await onSuccess(method);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer active:scale-[0.99] fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold">Complete Payment</h3>
          <button type="button" onClick={onClose} disabled={processing} className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 p-4">
            <p className="text-sm text-slate-500">Subscribing to</p>
            <p className="text-xl font-bold">{plan.name}</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">
              ₹{plan.price.toLocaleString('en-IN')}<span className="text-sm font-normal text-slate-500">/month</span>
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Payment Method</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'card', label: 'Card / UPI' },
                { id: 'netbanking', label: 'Net Banking' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors ${
                    method === m.id
                      ? 'border-violet-500 bg-violet-500/10 text-violet-600'
                      : 'border-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-3 space-y-2">
            <input
              type="text"
              placeholder="Card / UPI ID"
              defaultValue="demo@upi"
              aria-label="Payment identifier"
              className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-3 py-2 rounded-lg bg-page border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              readOnly
            />
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Lock size={10} aria-hidden="true" />
              Secure payment processing. Your card details are encrypted.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={processing}
            className="duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 transition-all"
          >
            {processing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={18} />
                Pay ₹{plan.price.toLocaleString('en-IN')}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
