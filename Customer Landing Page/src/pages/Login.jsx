import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, Phone, ShieldCheck, Sparkles } from 'lucide-react';

export default function Login({ onLogin, onSignup, onForgotPassword, onOtpLogin, error }) {
  const [mode, setMode] = useState('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(error || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setLocalError('Please enter your credentials.');
      return;
    }
    setLocalError('');
    onLogin({ identifier, password, mode });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(46,125,50,0.15),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef7f0_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:flex-row">
        <div className="flex-1 bg-gradient-to-br from-emerald-700 via-green-700 to-cyan-700 p-8 text-white lg:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-black">S</div>
            <div>
              <div className="text-xl font-black">SaathApp</div>
              <div className="text-sm text-white/75">Hyperlocal marketplace</div>
            </div>
          </div>

          <div className="mt-10 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              <Sparkles size={16} className="text-amber-300" />
              Welcome back to your neighborhood
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">Sign in to shop, book services, and save more.</h1>
            <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
              Use the demo credentials below to explore the full experience instantly.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck size={18} className="text-amber-300" /> Demo access
            </div>
            <p className="mt-2 text-sm text-white/80">Email: demo@saathapp.com</p>
            <p className="text-sm text-white/80">Password: 123456</p>
          </div>
        </div>

        <div className="flex-1 p-7 sm:p-8 lg:p-10">
          <h2 className="text-2xl font-black text-slate-900">Login to SaathApp</h2>
          <p className="mt-2 text-sm text-slate-600">Secure access for groceries, repairs, and local services.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex gap-2 rounded-2xl bg-page p-1">
              <button type="button" onClick={() => setMode('email')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'email' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'}`}>
                Email
              </button>
              <button type="button" onClick={() => setMode('phone')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'phone' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'}`}>
                Phone
              </button>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              {mode === 'email' ? 'Email address' : 'Phone number'}
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-page px-3 py-3">
                {mode === 'email' ? <Mail size={16} className="text-slate-400" /> : <Phone size={16} className="text-slate-400" />}
                <input
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  className="w-full bg-transparent outline-none"
                  placeholder={mode === 'email' ? 'demo@saathapp.com' : '+91 9999999999'}
                />
              </div>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Password
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-page px-3 py-3">
                <Lock size={16} className="text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter password"
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <button type="button" onClick={onForgotPassword} className="font-semibold text-emerald-600">Forgot password?</button>
              <button type="button" onClick={onOtpLogin} className="font-semibold text-cyan-600">Login with OTP</button>
            </div>

            {(localError || error) && <p className="text-sm font-medium text-red-500">{localError || error}</p>}

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-95">
              Login
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-page p-4 text-sm text-slate-600">
            Don’t have an account?{' '}
            <button type="button" onClick={onSignup} className="font-semibold text-emerald-600">Create one</button>
          </div>
        </div>
      </div>
    </div>
  );
}
