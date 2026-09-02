import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, FileCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const PROCESSING_TIMES = ['Same Day (within 6 hrs)', '24 Hours', '48 Hours', '3-5 Days (Made-to-Order)'];

export default function Step10_OperationsPolicies({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();

  const toggleWorkingDay = (day) => {
    const exists = formData.workingDays.includes(day);
    const updated = exists ? formData.workingDays.filter((d) => d !== day) : [...formData.workingDays, day];
    updateFormData({ workingDays: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Business operations and policies saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 9 — Business Operations & Policies
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Operational Hours & Return Policies
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Set your warehouse operating hours, dispatch SLA, return terms, and GST invoicing policies.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Working Days */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Warehouse Operating Days *
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = formData.workingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleWorkingDay(day)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-page text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={13} />}
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Business Working Hours *
              </label>
              <div className="relative flex items-center">
                <Clock size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.workingHours}
                  onChange={(e) => updateFormData({ workingHours: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="09:00 AM - 08:00 PM"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Order Processing Time (SLA) *
              </label>
              <select
                value={formData.orderProcessingTime}
                onChange={(e) => updateFormData({ orderProcessingTime: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {PROCESSING_TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Return Policy
              </label>
              <input
                type="text"
                value={formData.returnPolicy}
                onChange={(e) => updateFormData({ returnPolicy: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="7-Day Return for Damaged Goods"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Replacement Policy
              </label>
              <input
                type="text"
                value={formData.replacementPolicy}
                onChange={(e) => updateFormData({ replacementPolicy: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Instant Replacement"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Cancellation Policy
              </label>
              <input
                type="text"
                value={formData.cancellationPolicy}
                onChange={(e) => updateFormData({ cancellationPolicy: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Before Dispatch"
              />
            </div>
          </div>

          {/* GST Billing & Invoicing Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">GST Tax Invoice Support</h4>
                <p className="text-[11px] text-slate-500">Provide GST input tax credit invoice to buyers.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.gstBilling}
                onChange={(e) => updateFormData({ gstBilling: e.target.checked })}
                className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Instant E-Invoice Generation</h4>
                <p className="text-[11px] text-slate-500">Generate e-way bill and PDF invoice automatically.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.invoiceSupport}
                onChange={(e) => updateFormData({ invoiceSupport: e.target.checked })}
                className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Save & Next Phase
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
