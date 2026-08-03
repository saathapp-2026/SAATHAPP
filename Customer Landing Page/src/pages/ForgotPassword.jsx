import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function ForgotPassword({ onBack, onOtpSent }) {
  const [mode, setMode] = useState('email');
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!identifier.trim()) return;
    onOtpSent({ mode, identifier });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={16} /> Back to login
        </button>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] bg-gradient-to-br from-emerald-600 to-cyan-600 p-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-amber-300" /> Forgot Password
            </div>
            <h2 className="mt-4 text-2xl font-black">Reset your access securely</h2>
            <p className="mt-2 text-sm leading-7 text-white/80">Choose email or phone, receive an OTP, and continue with a new password.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 rounded-2xl bg-slate-100 p-1">
              <button type="button" onClick={() => setMode('email')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'email' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'}`}>
                Email
              </button>
              <button type="button" onClick={() => setMode('phone')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'phone' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'}`}>
                Phone
              </button>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              {mode === 'email' ? 'Email address' : 'Phone number'}
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                {mode === 'email' ? <Mail size={16} className="text-slate-400" /> : <Phone size={16} className="text-slate-400" />}
                <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} className="w-full bg-transparent outline-none" placeholder={mode === 'email' ? 'you@example.com' : '+91 9876543210'} />
              </div>
            </label>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg">
              Send OTP
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
