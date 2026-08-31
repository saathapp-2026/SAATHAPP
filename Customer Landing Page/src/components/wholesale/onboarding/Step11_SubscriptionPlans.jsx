import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ShieldCheck, FileText, ArrowRight, ArrowLeft, IndianRupee } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import { calculateOnboardingFee, formatInr, ONBOARDING_VALIDITY_YEARS } from '../../../utils/wholesaleOnboardingPricing';

export const WHOLESALE_PLANS = [
  {
    id: 'Free',
    name: 'Free Partner',
    price: '₹0',
    period: '/ month',
    comm: '5% Commission',
    features: ['1 Warehouse Location', 'Up to 100 Listed SKUs', 'Standard Buyer Reach', 'Standard Escrow Payouts'],
  },
  {
    id: 'Starter',
    name: 'Starter Wholesale',
    price: '₹999',
    period: '/ month',
    comm: '3% Commission',
    popular: false,
    features: ['3 Warehouse Locations', 'Up to 500 Listed SKUs', 'Verified Seller Badge', 'Priority Buyer Search', 'Basic Analytics'],
  },
  {
    id: 'Business',
    name: 'Business Pro',
    price: '₹1,999',
    period: '/ month',
    comm: '1.5% Commission',
    popular: true,
    features: [
      'Unlimited Warehouses',
      'Unlimited SKUs',
      'Top Banner Search Placement',
      'Dedicated Account Manager',
      'Daily Payout Settlement',
      'API Access & ERP Sync',
    ],
  },
  {
    id: 'Enterprise',
    name: 'Enterprise Custom',
    price: 'Custom',
    period: 'Pricing',
    comm: '0% Commission Options',
    features: [
      'Custom SLA & Insurance',
      'Dedicated Fleet Allocation',
      'Custom B2B Integration',
      '24/7 VIP Phone Support',
      'Zero Transaction Fee Rails',
    ],
  },
];

export default function Step11_SubscriptionPlans({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();

  const feeResult = useMemo(
    () =>
      calculateOnboardingFee({
        cityType: formData.cityType,
        businessType: formData.businessType,
        serviceCoverageArea: formData.serviceCoverageArea,
        businessCategory: formData.businessCategory,
        selectedPlan: formData.selectedPlan,
      }),
    [formData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      addToast('Please accept the Terms & Digital Agreement to proceed', 'error');
      return;
    }
    addToast('Wholesale subscription plan selected!', 'success');
    updateFormData({ onboardingFeeAmount: feeResult.amount });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 10 — Pricing & Plans
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Select Your Wholesale Growth Plan
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Choose a plan tailored to your business scale. One-time onboarding fee applies with {ONBOARDING_VALIDITY_YEARS}-year validity.
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
              <IndianRupee size={22} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Estimated Onboarding Fee</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{formatInr(feeResult.amount)}</p>
              <p className="text-[11px] text-slate-500 font-semibold">Based on {formData.cityType} · {formData.businessType} · {formData.serviceCoverageArea} · {formData.businessCategory}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-xs">
            Pay at next step before application review. Fee range ₹500 – ₹2,00,000.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHOLESALE_PLANS.map((plan) => {
              const isSelected = formData.selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => updateFormData({ selectedPlan: plan.id })}
                  className={`relative cursor-pointer rounded-2xl border p-5 transition flex flex-col justify-between ${isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/30 text-slate-900 dark:text-white shadow-xl ring-2 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 hover:border-slate-300'
                    }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 text-slate-950 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{plan.period}</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">{plan.comm}</p>

                    <ul className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check size={13} className="text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
                    <button
                      type="button"
                      className={`transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full rounded-xl py-2 text-xs font-extrabold transition ${isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-surface border border-slate-300 text-slate-800 dark:text-slate-200'
                        }`}
                    >
                      {isSelected ? 'Selected Plan' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Digital Agreement Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={20} className="text-emerald-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Digital Wholesale Merchant Agreement
              </h3>
            </div>
            <div className="h-28 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-3 text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed scrollbar-thin">
              <p>
                <strong>1. Overview & Eligibility:</strong> By executing this agreement, you represent that your business holds a valid GSTIN registration, PAN, and applicable licenses to distribute wholesale goods on SaathApp.
              </p>
              <p>
                <strong>2. Payouts & Escrow:</strong> Customer payments are held in automated RBI-compliant escrow until order delivery confirmation, after which payouts are settled per selected preference.
              </p>
              <p>
                <strong>3. Quality Assurance:</strong> Partner agrees to maintain authentic inventory standards. Counterfeit or mislabeled goods will result in immediate suspension.
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => updateFormData({ acceptedTerms: e.target.checked, digitalAgreementSigned: e.target.checked })}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                I accept the SaathApp Wholesale Merchant Agreement & Platform Terms.
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Signed By:</span>
                <input
                  type="text"
                  value={formData.signatureName || formData.fullName}
                  onChange={(e) => updateFormData({ signatureName: e.target.value })}
                  className="rounded-xl border border-slate-300 bg-surface px-3 py-1.5 text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400"
                  placeholder="Rakesh Kumar"
                />
              </div>
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
              Review & Pay Onboarding Fee
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
