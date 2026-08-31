import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  'Create Ad',
  'Choose Plan',
  'Ad Preview',
  'Payment',
  'Confirmation'
];

export default function WizardProgressBar({ currentStep }) {
  return (
    <div className="w-full mb-8 pt-4">
      {/* Title Area */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Advertise with SaathApp</h1>
        <p className="text-slate-500 mt-1">Create high visibility advertisement and grow your business</p>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        {/* Track */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
        
        {/* Steps */}
        <div className="relative z-10 flex items-center justify-between">
          {STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div key={step} className="flex items-center gap-3 bg-[#F8FAFC] px-2 sm:px-4">
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isActive 
                      ? 'bg-[#15803D] text-white' 
                      : isCompleted
                      ? 'bg-[#15803D] text-white'
                      : 'bg-surface border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNumber}
                </div>
                <span className={`text-sm font-semibold hidden sm:block ${
                  isActive ? 'text-[#15803D]' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
