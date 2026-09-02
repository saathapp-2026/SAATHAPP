import React from 'react';
import { Check, Save, RotateCcw, ShieldCheck, Clock, Truck } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export const DELIVERY_STEPS_CONFIG = [
  { id: 1, title: 'Welcome', path: '/become-delivery-partner' },
  { id: 2, title: 'Auth & OTP', path: '/become-delivery-partner/login' },
  { id: 3, title: 'Rider Profile', path: '/become-delivery-partner/profile' },
  { id: 4, title: 'Location & Vehicle', path: '/become-delivery-partner/vehicle' },
  { id: 5, title: 'Categories & Radius', path: '/become-delivery-partner/categories' },
  { id: 6, title: 'Document Vault', path: '/become-delivery-partner/documents' },
  { id: 7, title: 'Bank & Payout', path: '/become-delivery-partner/bank' },
  { id: 8, title: 'Onboarding Fee (Mandatory)', path: '/become-delivery-partner/fee' },
  { id: 9, title: 'Equipment & Store (Optional)', path: '/become-delivery-partner/equipment' },
  { id: 10, title: 'Terms & Agreement', path: '/become-delivery-partner/terms' },
  { id: 11, title: 'Status Tracker', path: '/become-delivery-partner/status' },
];

export default function DeliveryStepperHeader({ currentStep, onSelectStep }) {
  const { saveDraft, resetForm, lastSaved } = useDelivery();
  const progressPercent = Math.round((currentStep / DELIVERY_STEPS_CONFIG.length) * 100);

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Truck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step {currentStep} of 11
                </span>
                <span className="text-xs text-slate-400">• {progressPercent}% Completed</span>
              </div>
              <h2 className="text-base font-extrabold text-white">
                {DELIVERY_STEPS_CONFIG[currentStep - 1]?.title || 'Onboarding'}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock size={13} className="text-amber-400" />
              <span>Auto-saved at {lastSaved}</span>
            </div>
            <button
              type="button"
              onClick={saveDraft}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-extrabold text-slate-950 transition shadow-sm"
            >
              <Save size={14} />
              Save Draft
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 transition"
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
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between overflow-x-auto pb-1 scrollbar-none gap-2">
            {DELIVERY_STEPS_CONFIG.map((step) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onSelectStep(step.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400'
                      : isCompleted
                      ? 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                      : 'bg-slate-800/50 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                      isCurrent
                        ? 'bg-slate-950 text-amber-400 font-extrabold'
                        : isCompleted
                        ? 'bg-amber-500 text-slate-950 font-bold'
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
