import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Building2,
  Globe2,
  Tag,
  CreditCard,
  ShieldCheck,
  IndianRupee,
} from 'lucide-react';
import {
  calculateOnboardingFee,
  formatInr,
  CITY_TYPES,
  MIN_ONBOARDING_FEE,
  MAX_ONBOARDING_FEE,
  ONBOARDING_VALIDITY_YEARS,
} from '../../../utils/wholesaleOnboardingPricing';
import { BUSINESS_TYPES, BUSINESS_CATEGORIES } from '../onboarding/Step4_BusinessInfo';
import { COVERAGE_AREAS } from '../onboarding/Step6_CoverageLogistics';
import { WHOLESALE_PLANS } from '../onboarding/Step11_SubscriptionPlans';

const iconMap = {
  cityType: MapPin,
  businessType: Building2,
  serviceCoverageArea: Globe2,
  businessCategory: Tag,
  selectedPlan: CreditCard,
};

export default function OnboardingFeeCalculator({
  values,
  onChange,
  compact = false,
  showTitle = true,
}) {
  const feeResult = useMemo(() => calculateOnboardingFee(values), [values]);

  const fields = [
    {
      key: 'cityType',
      label: 'City Type',
      options: CITY_TYPES,
      hint: 'Village to Metro — location tier affects onboarding fee',
    },
    {
      key: 'businessType',
      label: 'Business Type',
      options: BUSINESS_TYPES,
      hint: 'Manufacturer, Wholesaler, Distributor, etc.',
    },
    {
      key: 'serviceCoverageArea',
      label: 'Delivery Radius / Coverage',
      options: COVERAGE_AREAS,
      hint: 'Local to International delivery reach',
    },
    {
      key: 'businessCategory',
      label: 'Business Category',
      options: BUSINESS_CATEGORIES,
      hint: 'Primary product category you supply',
    },
    {
      key: 'selectedPlan',
      label: 'Wholesale Plan',
      options: WHOLESALE_PLANS.map((p) => p.id),
      hint: 'One-time onboarding fee + plan benefits',
    },
  ];

  return (
    <div className={compact ? '' : 'rounded-[28px] border border-slate-200/70 dark:border-slate-800/60 bg-surface p-6 sm:p-8 shadow-premium'}>
      {showTitle && (
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0A8F3D]/20 bg-[#0A8F3D]/5 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0A8F3D]">
            Onboarding Fee Calculator
          </span>
          <h3 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            One-Time Wholesale Onboarding Fee
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium max-w-2xl">
            Pay once at registration. Fee is calculated from city type, business type, delivery radius,
            and category. Range: {formatInr(MIN_ONBOARDING_FEE)} – {formatInr(MAX_ONBOARDING_FEE)}.
            Includes <strong className="text-[#0A8F3D]">{ONBOARDING_VALIDITY_YEARS}-year partner validity</strong>.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {fields.map((field) => {
            const Icon = iconMap[field.key];
            return (
              <div key={field.key}>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  <Icon size={14} className="text-[#0A8F3D]" />
                  {field.label}
                </label>
                <select
                  value={values[field.key] || ''}
                  onChange={(e) => onChange?.({ [field.key]: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-page dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-[#0A8F3D] focus:outline-none focus:ring-2 focus:ring-[#0A8F3D]/20"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-slate-500">{field.hint}</p>
              </div>
            );
          })}
        </div>

        <motion.div
          key={feeResult.amount}
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="lg:col-span-2 rounded-[24px] border border-[#0A8F3D]/25 bg-gradient-to-br from-[#0A8F3D]/10 via-emerald-50 to-white dark:from-[#0A8F3D]/15 dark:via-slate-900 dark:to-slate-900 p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A8F3D]">
              <IndianRupee size={14} />
              Your Onboarding Fee
            </div>
            <p className="mt-3 text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatInr(feeResult.amount)}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              One-time payment · {ONBOARDING_VALIDITY_YEARS} years validity
            </p>

            <div className="mt-5 space-y-2 text-xs">
              {[
                ['Location Tier', `${feeResult.breakdown?.cityType || values.cityType || 'Tier 2'}`],
                ['Business Capital', `${formatInr(feeResult.breakdown?.capital || values.businessCapital || 2500000)}`],
                ['Fee Rate', `${feeResult.percentage ? `${feeResult.percentage.toFixed(2)}%` : 'N/A'}`],
                ['Calculated Fee', `${formatInr(feeResult.fee || 0)}`],
                ['Eligibility', `${feeResult.isEligible ? 'Eligible (>= ₹10L)' : 'Not Eligible (< ₹10L)'}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500 font-semibold">{label}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#0A8F3D]/20 bg-surface/70 dark:bg-slate-950/50 p-4">
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-[#0A8F3D] shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Application review starts <strong className="text-slate-800 dark:text-slate-200">only after</strong> successful
                onboarding fee payment. No account verification until payment is completed.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
