import React, { useMemo, useState } from 'react';
import { ArrowRight, Mail, Lock, Phone, User, ShieldCheck, Zap, MapPin, Star, CheckCircle2, Sparkles } from 'lucide-react';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[6-9]\d{9}$/;

export default function AuthScreen({ mode = 'login', onSwitch }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const highlights = useMemo(
    () => [
      { title: 'Verified partners', text: 'Trusted local professionals', icon: ShieldCheck },
      { title: 'Hyperlocal speed', text: 'Nearest help in minutes', icon: Zap },
      { title: 'Doorstep service', text: 'Bring the store to your home', icon: MapPin },
      { title: 'Quality promise', text: 'Rework or refund support', icon: Star },
    ],
    []
  );

  const validate = () => {
    const nextErrors = {};

    if (currentMode === 'signup') {
      if (!form.name.trim()) nextErrors.name = 'Please enter your full name';
      if (!form.email.trim()) nextErrors.email = 'Please enter your email';
      else if (!emailRe.test(form.email)) nextErrors.email = 'Please enter a valid email';
      if (!form.mobile.trim()) nextErrors.mobile = 'Please enter your mobile number';
      else if (!phoneRe.test(form.mobile.replace(/\D/g, ''))) nextErrors.mobile = 'Please enter a valid 10-digit number';
      if (!form.password) nextErrors.password = 'Create a password';
      else if (form.password.length < 8) nextErrors.password = 'Password should be at least 8 characters';
      if (!form.confirm) nextErrors.confirm = 'Please confirm your password';
      else if (form.confirm !== form.password) nextErrors.confirm = 'Passwords do not match';
    } else {
      if (!form.email.trim()) nextErrors.email = 'Please enter your email or mobile';
      if (!form.password) nextErrors.password = 'Please enter your password';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_35%),linear-gradient(135deg,_#eff6ff_0%,_#eef2ff_100%)] px-4 py-6 text-slate-800 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] lg:flex-row">
        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-violet-700 p-8 text-white lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_30%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-black shadow-lg">S</div>
              <div>
                <div className="text-xl font-black">SaathApp</div>
                <div className="text-sm text-white/70">Hyperlocal marketplace</div>
              </div>
            </div>

            <div className="mt-10 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
                <Sparkles size={16} className="text-amber-300" />
                Everything your neighbourhood needs
              </div>
              <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                Welcome to your trusted local super app.
              </h1>
              <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
                Sign in or create an account to shop locally, book services, and connect with verified nearby partners.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map(({ title, text, icon: Icon }) => (
                <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                  <Icon size={16} className="mb-2 text-amber-300" />
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-white/70">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-7 sm:p-8 lg:p-10">
          <div className="mb-6 flex rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setCurrentMode('login');
                setErrors({});
              }}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${currentMode === 'login' ? 'bg-white text-indigo-700 shadow' : 'text-slate-600'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentMode('signup');
                setErrors({});
              }}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${currentMode === 'signup' ? 'bg-white text-indigo-700 shadow' : 'text-slate-600'}`}
            >
              Sign Up
            </button>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{currentMode === 'login' ? 'Welcome back' : 'Account ready'}</h2>
              <p className="mt-2 text-sm text-slate-600">
                {currentMode === 'login'
                  ? 'You are now signed in and can continue shopping and booking.'
                  : 'Your SaathApp account has been created and is ready to use.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {currentMode === 'signup' && (
                <label className="block text-sm font-semibold text-slate-700">
                  Full name
                  <div className={`mt-2 flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-3 ${errors.name ? 'border-red-400' : 'border-slate-200'}`}>
                    <User size={16} className="text-slate-400" />
                    <input
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className="w-full bg-transparent outline-none"
                      placeholder="Aarav Sharma"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs font-medium text-red-500">{errors.name}</p>}
                </label>
              )}

              <label className="block text-sm font-semibold text-slate-700">
                Email or mobile
                <div className={`mt-2 flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-3 ${errors.email ? 'border-red-400' : 'border-slate-200'}`}>
                  <Mail size={16} className="text-slate-400" />
                  <input
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder={currentMode === 'login' ? 'you@example.com' : 'you@example.com'}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>}
              </label>

              {currentMode === 'signup' && (
                <label className="block text-sm font-semibold text-slate-700">
                  Mobile number
                  <div className={`mt-2 flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-3 ${errors.mobile ? 'border-red-400' : 'border-slate-200'}`}>
                    <Phone size={16} className="text-slate-400" />
                    <input
                      value={form.mobile}
                      onChange={(event) => updateField('mobile', event.target.value)}
                      className="w-full bg-transparent outline-none"
                      placeholder="10-digit mobile"
                    />
                  </div>
                  {errors.mobile && <p className="mt-1 text-xs font-medium text-red-500">{errors.mobile}</p>}
                </label>
              )}

              <label className="block text-sm font-semibold text-slate-700">
                Password
                <div className={`mt-2 flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-3 ${errors.password ? 'border-red-400' : 'border-slate-200'}`}>
                  <Lock size={16} className="text-slate-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => updateField('password', event.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder={currentMode === 'login' ? 'Enter password' : 'Create password'}
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs font-medium text-red-500">{errors.password}</p>}
              </label>

              {currentMode === 'signup' && (
                <label className="block text-sm font-semibold text-slate-700">
                  Confirm password
                  <div className={`mt-2 flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-3 ${errors.confirm ? 'border-red-400' : 'border-slate-200'}`}>
                    <Lock size={16} className="text-slate-400" />
                    <input
                      type="password"
                      value={form.confirm}
                      onChange={(event) => updateField('confirm', event.target.value)}
                      className="w-full bg-transparent outline-none"
                      placeholder="Re-enter password"
                    />
                  </div>
                  {errors.confirm && <p className="mt-1 text-xs font-medium text-red-500">{errors.confirm}</p>}
                </label>
              )}

              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-95">
                {currentMode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              Secure access for your SaathApp account
            </div>
          </div>

          <button type="button" onClick={onSwitch} className="mt-5 text-sm font-semibold text-indigo-600">
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
