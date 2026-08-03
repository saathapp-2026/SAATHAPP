import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Crown, AlertCircle } from 'lucide-react';
import { getPricingConfig } from '../../config/seller/pricingConfig';
import { getMembershipPlans, getOnboardingFeeRange } from '../../config/seller/membershipPlans';

const ONBOARDING_INCLUDES = [
  'Seller Registration & KYC Verification',
  'Business & Store Verification',
  'Seller Dashboard Activation',
  'Category & Product Approval',
  'Technical Setup & Compliance',
];

export default function Pricing() {
  const pricing = getPricingConfig();
  const plans = getMembershipPlans();
  const feeRange = getOnboardingFeeRange();

  const allFees = Object.values(pricing.baseCategoryFees || {});
  const tier1Multiplier = pricing.locationTiers?.find((t) => t.id === 'tier1')?.multiplier || 3;
  const feeMin = feeRange?.min ?? Math.min(...allFees.map((f) => f.min));
  const feeMax = feeRange?.max ?? Math.max(...allFees.map((f) => f.max)) * tier1Multiplier;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12">
        <Link to="/seller" className="text-sm text-slate-400 hover:text-white mb-8 inline-block">
          ← Back to Seller Hub
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Seller Pricing</h1>
          <p className="text-slate-400 text-sm mb-6">
            Two independent payment models. Onboarding fee is mandatory. Monthly membership is optional — purchase during registration or anytime after approval.
          </p>
        </motion.div>

        {/* Section 1: Mandatory Onboarding Fee */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white/5 backdrop-blur border border-emerald-500/30 p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-emerald-400" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mandatory</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">One-Time Seller Onboarding Fee</h2>
          <p className="text-slate-400 text-sm mb-6">
            Required for every seller. Valid for 2 years. Renewal at 50% of original fee.
          </p>

          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-6 mb-6">
            <p className="text-3xl font-bold text-emerald-400 mb-1">
              ₹{feeMin.toLocaleString('en-IN')} – ₹{feeMax.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-slate-400">Final fee depends on location, category, and business scale</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {ONBOARDING_INCLUDES.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 flex gap-3 mb-6">
            <AlertCircle className="text-amber-400 shrink-0" size={20} />
            <div>
              <p className="font-semibold text-amber-400 text-sm">Important Notice</p>
              <p className="text-xs text-slate-400 mt-1">
                Payment does NOT guarantee approval. Every application is subject to verification and compliance review.
              </p>
            </div>
          </div>

          <Link
            to="/seller/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            Start Registration
            <ArrowRight size={18} />
          </Link>
        </motion.section>

        {/* Section 2: Optional Membership */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/5 backdrop-blur border border-violet-500/30 p-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Crown className="text-violet-400" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Optional</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Monthly Seller Membership</h2>
          <p className="text-slate-400 text-sm mb-6">
            Upgrade anytime. Start selling without membership after approval.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl border p-5 ${
                  plan.popular
                    ? 'bg-violet-500/10 border-violet-500/40'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {plan.popular && (
                  <span className="text-xs font-bold text-violet-400 mb-2 block">⭐ Most Popular</span>
                )}
                <h3 className="font-bold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">
                  {plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString('en-IN')}`}
                  {plan.price > 0 && <span className="text-sm font-normal text-slate-400">/mo</span>}
                </p>
                <p className="text-xs text-slate-400 mt-2">{plan.description}</p>
              </div>
            ))}
          </div>

          <Link
            to="/seller/membership"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
          >
            View Membership Plans
            <ArrowRight size={18} />
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
