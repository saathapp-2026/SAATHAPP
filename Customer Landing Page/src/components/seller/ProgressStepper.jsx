import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ONBOARDING_STEPS } from '../../config/sellerOnboardingConfig';

export default function ProgressStepper({ currentPath }) {
  const location = useLocation();
  const activePath = currentPath || location.pathname;
  const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.path === activePath);

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center min-w-max gap-1 md:gap-0">
        {ONBOARDING_STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isActive = index === currentIndex;
          const isLast = index === ONBOARDING_STEPS.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-1.5 min-w-[72px] md:min-w-[88px]">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isComplete ? '#0A8F3D' : isActive ? '#0A8F3D' : 'rgba(255,255,255,0.1)',
                  }}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isComplete || isActive
                      ? 'border-[#0A8F3D] text-white'
                      : 'border-white/20 text-slate-400'
                  }`}
                >
                  {isComplete ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </motion.div>
                <span
                  className={`text-[10px] md:text-xs font-medium text-center leading-tight ${
                    isActive ? 'text-[#0A8F3D]' : isComplete ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`h-0.5 w-6 md:w-10 mb-5 rounded-full transition-colors ${
                    index < currentIndex ? 'bg-[#0A8F3D]' : 'bg-white/10'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
