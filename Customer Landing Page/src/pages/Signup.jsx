import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Smartphone, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Signup({ onLogin, onSignup, onBack }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: 'otp' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill all fields.');
      return;
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      onSignup({ ...form });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Centered Auth Card */}
      <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 rounded-[24px] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <button onClick={() => window.history.back()} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-6 cursor-pointer">
            <ArrowLeft size={16} />
          </button>

          <div className="mb-8">
            <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2">Create Account</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
              Join SaathApp in a few quick steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-primary dark:focus-within:border-primary bg-slate-50 dark:bg-slate-950 px-4 py-3 transition-colors">
                <User size={18} className="text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent outline-none font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-primary dark:focus-within:border-primary bg-slate-50 dark:bg-slate-950 px-4 py-3 transition-colors">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent outline-none font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <div className="flex items-center rounded-xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-primary dark:focus-within:border-primary bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors">
                <span className="px-4 py-3 text-slate-500 dark:text-slate-400 font-bold border-r-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full bg-transparent outline-none px-4 py-3 font-bold text-slate-900 dark:text-white tracking-wider placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  placeholder="9999999999"
                />
              </div>
            </div>

            {error && <p className="text-xs font-bold text-rose-500 mt-2">{error}</p>}

            <div className="pt-4">
              <button 
                type="submit" 
                className="btn-primary"
              >
                Create Account <ChevronRight size={18} />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-800 pt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" /> Secure checkout encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
