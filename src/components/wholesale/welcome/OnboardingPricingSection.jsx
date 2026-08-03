import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import OnboardingFeeCalculator from '../shared/OnboardingFeeCalculator';

const defaultCalcValues = {
  cityType: 'Tier 2',
  businessType: 'Wholesaler',
  serviceCoverageArea: 'District',
  businessCategory: 'FMCG',
  selectedPlan: 'Starter',
};

export default function OnboardingPricingSection({ onStartRegistration }) {
  const [calcValues, setCalcValues] = useState(defaultCalcValues);

  const handleChange = (patch) => {
    setCalcValues((prev) => ({ ...prev, ...patch }));
  };

  return (
    <section id="onboarding-pricing" aria-labelledby="pricing-heading" className="py-20 sm:py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pricing-heading"
          eyebrow="Transparent Pricing"
          title="Wholesale Onboarding Fees"
          description="Calculate your one-time seller onboarding fee based on location tier, business type, delivery radius, and category. Valid for 2 years after payment."
        />

        <OnboardingFeeCalculator values={calcValues} onChange={handleChange} />

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onStartRegistration}
            className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#0A8F3D] to-[#087a34] px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(10,143,61,0.35)] transition hover:scale-[1.02]"
          >
            Start Registration & Pay Onboarding Fee
          </button>
        </div>
      </div>
    </section>
  );
}
