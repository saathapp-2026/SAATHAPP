import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function Step2_RiderAuthOtp({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();
  const [mobile, setMobile] = useState(formData.mobileNumber || '9128842027');
  const [otp, setOtp] = useState(formData.otp || '123456');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (mobile.length < 10) {
      addToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      updateFormData({
        mobileNumber: mobile,
        isOtpVerified: true,
      });
      addToast('Mobile OTP verified successfully!', 'success');
      onNext();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 1 — Rider Authentication
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Delivery Partner Authentication
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Verify your mobile number to create your rider / delivery partner account on SaathApp.
        </p>

        <form onSubmit={handleVerify} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Rider Mobile Number *
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-extrabold text-slate-400">+91</span>
              <input
                type="tel"
                maxLength={10}
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-14 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="9128842027"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Enter 6-Digit OTP *
            </label>
            <div className="relative flex items-center">
              <ShieldCheck size={18} className="absolute left-3.5 text-slate-400" />
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-24 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="123456"
              />
              <span className="absolute right-3 text-xs font-extrabold text-emerald-500 flex items-center gap-1">
                <CheckCircle2 size={14} /> Verified
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 font-medium">Demo OTP: 123456</p>
          </div>

          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.02] disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Verify & Continue'}
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
