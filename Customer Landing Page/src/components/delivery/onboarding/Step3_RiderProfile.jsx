import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, ArrowRight, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function Step3_RiderProfile({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useDelivery();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      addToast('Please enter your full name', 'error');
      return;
    }
    addToast('Rider profile saved successfully!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Phase 2 — Rider Personal Profile
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Rider Personal Details & Contact
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Enter your full legal name, date of birth, and emergency contact for safety checks.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Rider Full Name (As on Aadhaar / DL) *
              </label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  placeholder="e.g. Vikram Singh"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => updateFormData({ gender: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Date of Birth *
              </label>
              <div className="relative flex items-center">
                <Calendar size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => updateFormData({ dob: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Email Address (Optional)
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  placeholder="vikram.rider@saathapp.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Emergency Contact Number *
              </label>
              <div className="relative flex items-center">
                <Heart size={18} className="absolute left-3.5 text-amber-500" />
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData({ emergencyContact: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  placeholder="9876543210"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:scale-[1.02]"
            >
              Save Profile & Next
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
