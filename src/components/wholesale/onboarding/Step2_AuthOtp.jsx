import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Lock, Mail, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function Step2_AuthOtp({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const [activeMode, setActiveMode] = useState('mobile'); // 'mobile' or 'email'
  const [timer, setTimer] = useState(30);

  const handleSendOtp = () => {
    addToast(`OTP sent successfully to +91 ${formData.mobileNumber}`, 'success');
    setTimer(30);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.otp.length === 6) {
      updateFormData({ isOtpVerified: true });
      addToast('OTP verified successfully!', 'success');
      onNext();
    } else {
      addToast('Please enter a valid 6-digit OTP', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 1 — Authentication
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Wholesale Partner Authentication
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Verify your mobile number to create your enterprise wholesale account on SaathApp.
        </p>

        {/* Toggle Mode */}
        <div className="mt-6 flex rounded-2xl bg-slate-100 dark:bg-slate-800/80 p-1">
          <button
            type="button"
            onClick={() => setActiveMode('mobile')}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-2 ${
              activeMode === 'mobile'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Smartphone size={16} />
            Mobile Number (OTP)
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('email')}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-2 ${
              activeMode === 'email'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Mail size={16} />
            Email Login (Optional)
          </button>
        </div>

        <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5">
          {activeMode === 'mobile' ? (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Registered Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm font-bold text-slate-500 dark:text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={(e) => updateFormData({ mobileNumber: e.target.value.replace(/\D/g, '') })}
                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-14 pr-24 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="9876543210"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="absolute right-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-xl transition"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Enter 6-Digit OTP
                </label>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => updateFormData({ otp: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-11 pr-28 py-3.5 text-base tracking-[0.25em] font-extrabold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="123456"
                  />
                  <span className="absolute right-3.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={14} /> Verified
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Demo OTP: <strong>123456</strong></span>
                  <button
                    type="button"
                    onClick={() => updateFormData({ otp: '123456' })}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    Auto-fill Demo OTP
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Business Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.emailLogin}
                  onChange={(e) => updateFormData({ emailLogin: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="partner@company.com"
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Verify & Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
