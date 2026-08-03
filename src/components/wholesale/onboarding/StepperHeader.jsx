import React from 'react';
import { Check, Save, RotateCcw, ShieldCheck, Clock } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const STEPS_CONFIG = [
  { id: 1, title: 'Welcome', path: '/wholesale' },
  { id: 2, title: 'Auth & OTP', path: '/wholesale/login' },
  { id: 3, title: 'Owner Details', path: '/wholesale/register' },
  { id: 4, title: 'Business Info & Tier', path: '/wholesale/business' },
  { id: 5, title: 'Address & Warehouses', path: '/wholesale/address' },
  { id: 6, title: 'Service Coverage', path: '/wholesale/coverage' },
  { id: 7, title: 'Products & Stock', path: '/wholesale/products' },
  { id: 8, title: 'Documents Vault', path: '/wholesale/documents' },
  { id: 9, title: 'Bank & Settlement', path: '/wholesale/bank' },
  { id: 10, title: 'Operations & SLA', path: '/wholesale/operations' },
  { id: 11, title: 'Onboarding Fee (Mandatory)', path: '/wholesale/fee' },
  { id: 12, title: 'Membership Plan (Optional)', path: '/wholesale/membership' },
  { id: 13, title: 'Terms & Review', path: '/wholesale/review' },
  { id: 14, title: 'Status Tracker', path: '/wholesale/status' },
];

export default function StepperHeader({ currentStep, onSelectStep }) {
  const { saveDraft, resetForm, lastSaved } = useWholesale();
  const progressPercent = Math.round((currentStep / STEPS_CONFIG.length) * 100);

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Step {currentStep} of 14
                </span>
                <span className="text-xs text-slate-400">• {progressPercent}% Completed</span>
              </div>
              <h2 className="text-base font-extrabold text-white">
                {STEPS_CONFIG[currentStep - 1]?.title || 'Onboarding'}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock size={13} className="text-emerald-400" />
              <span>Auto-saved at {lastSaved}</span>
            </div>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-extrabold text-white transition shadow-sm"
            >
              <Save size={14} />
              Save Draft
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 transition"
            >
              <RotateCcw size={14} />
              Reset Form
            </button>
          </div>
        </div>

        {/* Horizontal Stepper Progress Bar */}
        <div className="mt-3 relative">
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between overflow-x-auto pb-1 scrollbar-none gap-2">
            {STEPS_CONFIG.map((step) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onSelectStep(step.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 font-black ring-2 ring-emerald-400'
                      : isCompleted
                      ? 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
                      : 'bg-slate-800/50 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                      isCurrent
                        ? 'bg-slate-950 text-emerald-400 font-extrabold'
                        : isCompleted
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check size={10} strokeWidth={3} /> : step.id}
                  </span>
                  <span className="whitespace-nowrap">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
