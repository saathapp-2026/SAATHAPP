import React from 'react';
import { Check } from 'lucide-react';
import { WIZARD_STEPS } from '../../../config/seller/productConstants';

export default function StepProgress({ currentStep, completedSteps = [], onStepClick }) {
  return (
    <nav aria-label="Product wizard progress" className="w-full">
      <ol className="grid grid-cols-4 md:grid-cols-8 gap-1 sm:gap-2 w-full">
        {WIZARD_STEPS.map((step) => {
          const done = completedSteps.includes(step.id) || step.id < currentStep;
          const active = step.id === currentStep;
          const clickable = done || active;
          return (
            <li key={step.id} className="min-w-0">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick?.(step.id)}
                className={`w-full flex flex-col items-center gap-1.5 px-1 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  active
                    ? 'text-emerald-600'
                    : done
                      ? 'text-slate-700 dark:text-slate-200 hover:text-emerald-600'
                      : 'text-slate-400 cursor-not-allowed'
                }`}
              >
                <span
                  className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full inline-flex items-center justify-center text-[11px] border-2 shrink-0 ${
                    active || done
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {done && !active ? <Check size={12} strokeWidth={3} /> : step.id}
                </span>
                <span className="text-center leading-tight truncate w-full">{step.label}</span>
                <span
                  className={`h-0.5 w-full rounded-full ${
                    active ? 'bg-emerald-500' : done ? 'bg-emerald-300' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] text-slate-400 mt-2 text-center sm:text-left">Step {currentStep} of 8</p>
    </nav>
  );
}
