import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User, ShieldCheck } from 'lucide-react';

export default function Signup({ onLogin, onSignup }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordChecks = [
    { label: 'Minimum 6 characters', test: form.password.length >= 6 },
    { label: 'One uppercase letter (A–Z)', test: /[A-Z]/.test(form.password) },
    { label: 'One lowercase letter (a–z)', test: /[a-z]/.test(form.password) },
    { label: 'One number (0–9)', test: /\d/.test(form.password) },
    { label: 'One special character (@ # $ % & * !)', test: /[^A-Za-z0-9]/.test(form.password) },
  ];

  const _passwordValid = passwordChecks.every((item) => item.test);

  const validatePassword = () => {
    const messages = [];
    if (form.password.length < 6) messages.push('Password must be at least 6 characters.');
    if (!/[A-Z]/.test(form.password)) messages.push('Password must contain at least one uppercase letter.');
    if (!/[a-z]/.test(form.password)) messages.push('Password must contain at least one lowercase letter.');
    if (!/\d/.test(form.password)) messages.push('Password must contain at least one number.');
    if (!/[^A-Za-z0-9]/.test(form.password)) messages.push('Password must contain at least one special character.');
    return messages;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password || !form.confirm) {
      setError('Please fill all fields.');
      return;
    }

    const passwordErrors = validatePassword();
    if (passwordErrors.length > 0) {
      setError(passwordErrors[0]);
      return;
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    onSignup({ ...form });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(46,125,50,0.15),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef7f0_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:flex-row">
        <div className="flex-1 bg-gradient-to-br from-cyan-700 via-blue-700 to-violet-700 p-8 text-white lg:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-black">S</div>
            <div>
              <div className="text-xl font-black">SaathApp</div>
              <div className="text-sm text-white/75">Create your local account</div>
            </div>
          </div>

          <div className="mt-10 max-w-md">
            <h1 className="text-3xl font-black leading-tight sm:text-4xl">Create your account and start shopping local.</h1>
            <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">Sign up to unlock nearby services, deals, and a faster checkout experience.</p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck size={18} className="text-amber-300" /> Secure onboarding
            </div>
            <p className="mt-2 text-sm text-white/80">Simple, trusted, and built for local communities.</p>
          </div>
        </div>

        <div className="flex-1 p-7 sm:p-8 lg:p-10">
          <h2 className="text-2xl font-black text-slate-900">Create Account</h2>
          <p className="mt-2 text-sm text-slate-600">Join SaathApp in a few quick steps.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Full name
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <User size={16} className="text-slate-400" />
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent outline-none" placeholder="Full Name" />
              </div>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Email address
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Mail size={16} className="text-slate-400" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent outline-none" placeholder="you@example.com" />
              </div>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Phone number
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Phone size={16} className="text-slate-400" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent outline-none" placeholder="10-digit mobile" />
              </div>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Password
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Lock size={16} className="text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-transparent outline-none" placeholder="Create password" />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-slate-500">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Confirm password
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Lock size={16} className="text-slate-400" />
                <input type={showConfirmPassword ? 'text' : 'password'} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="w-full bg-transparent outline-none" placeholder="Re-enter password" />
                <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="text-slate-500">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
              <div className="text-sm font-semibold text-emerald-700">Create a strong password</div>
              <ul className="mt-2 space-y-1 text-sm text-emerald-800">
                {passwordChecks.map((item) => (
                  <li key={item.label} className={`flex items-center gap-2 ${item.test ? 'text-emerald-700' : 'text-emerald-800/80'}`}>
                    <span>{item.test ? '✔' : '•'}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {form.confirm && form.password !== form.confirm && (
              <p className="text-sm font-medium text-red-500">Passwords do not match.</p>
            )}

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}

            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input type="checkbox" className="mt-1" required />
              <span>I agree to the Terms & Conditions</span>
            </label>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-95">
              Create Account
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Already have an account?{' '}
            <button type="button" onClick={onLogin} className="font-semibold text-cyan-600">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
