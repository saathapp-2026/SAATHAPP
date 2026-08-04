import React from 'react';
import { Check } from 'lucide-react';
import { WIZARD_STEPS } from '../../../config/seller/productConstants';

export default function StepProgress({ currentStep, completedSteps = [], onStepClick }) {
  return (
    <nav aria-label="Product wizard progress" className="overflow-x-auto pb-1">
      <ol className="flex items-center min-w-max gap-0">
        {WIZARD_STEPS.map((step, i) => {
          const done = completedSteps.includes(step.id) || step.id < currentStep;
          const active = step.id === currentStep;
          const clickable = done || completedSteps.includes(step.id);
          return (
            <li key={step.id} className="flex items-center">
              <button
                type="button"
                disabled={!clickable && !active}
                onClick={() => clickable && onStepClick?.(step.id)}
                className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  active
                    ? 'text-emerald-600'
                    : done
                      ? 'text-slate-700 dark:text-slate-200 hover:text-emerald-600'
                      : 'text-slate-400 cursor-not-allowed'
                }`}
              >
                <span
                  className={`h-7 w-7 rounded-full inline-flex items-center justify-center text-[11px] border-2 ${
                    active || done
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {done && !active ? <Check size={12} strokeWidth={3} /> : step.id}
                </span>
                <span className="hidden sm:inline whitespace-nowrap">{step.label}</span>
              </button>
              {i < WIZARD_STEPS.length - 1 && (
                <span className={`w-6 sm:w-10 h-0.5 mx-0.5 ${done ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] text-slate-400 mt-2">Step {currentStep}/8</p>
    </nav>
  );
}
