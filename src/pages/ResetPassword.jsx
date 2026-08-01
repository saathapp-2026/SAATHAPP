import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lock, ShieldCheck } from 'lucide-react';

export default function ResetPassword({ onBack, onReset }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !confirm) {
      setError('Please enter and confirm your password.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    onReset(password);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck size={18} /> Create New Password
          </div>
          <h2 className="mt-3 text-2xl font-black text-slate-900">Set a new password</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              New password
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3">
                <Lock size={16} className="text-slate-400" />
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Enter new password" />
              </div>
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Confirm password
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3">
                <Lock size={16} className="text-slate-400" />
                <input type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Re-enter password" />
              </div>
            </label>
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg">
              Reset Password
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
