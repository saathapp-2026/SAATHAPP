import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function VerifyOTP({ identifier, onBack, onVerified, mode = 'email' }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp.trim().length < 4) return;
    onVerified({ otp, identifier, mode });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck size={18} /> OTP Verification
          </div>
          <h2 className="mt-3 text-2xl font-black text-slate-900">Enter the verification code</h2>
          <p className="mt-2 text-sm text-slate-600">We sent a one-time password to {identifier}.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input value={otp} onChange={(event) => setOtp(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-lg font-semibold tracking-[0.4em] outline-none" placeholder="1234" />
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg">
              Verify OTP
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
