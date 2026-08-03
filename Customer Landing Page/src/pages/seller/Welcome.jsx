import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Store, Shield, Crown, ArrowRight, CheckCircle2, Sparkles, LogIn, UserPlus,
} from 'lucide-react';
import { BUSINESS_MODEL, OFFICIAL_PROCESS_FLOW } from '../../config/seller/sellerRoutes';
import { getMembershipPlans } from '../../config/seller/membershipPlans';

const FLOW_STEPS = OFFICIAL_PROCESS_FLOW.filter(
  (s) => !['Customer Landing Page', 'Become a Seller'].includes(s.label)
);

export default function SellerWelcome() {
  const plans = getMembershipPlans();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-16">
        <Link to="/" className="text-sm text-slate-400 hover:text-white mb-8 inline-block">
          ← Back to SaathApp
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
            <Sparkles size={16} />
            Seller Welcome
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-emerald-400">SAATHAPP</span> Seller Hub
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Register, get verified, and start selling. Monthly membership is optional — purchase anytime for premium business tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-emerald-400" size={22} />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mandatory</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{BUSINESS_MODEL.onboardingFee.label}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Required for every seller. Covers registration, KYC, verification, and dashboard activation.
              Valid {BUSINESS_MODEL.onboardingFee.validityYears} years. Renewal at {BUSINESS_MODEL.onboardingFee.renewalPercent}% of original fee.
            </p>
          </div>
          <div className="rounded-2xl bg-violet-500/10 border border-violet-500/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="text-violet-400" size={22} />
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Optional</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{BUSINESS_MODEL.membership.label}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {BUSINESS_MODEL.membership.note} Unlocks premium software, analytics, branding, automation, reports, billing, AI tools, and support.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 mb-8"
        >
          <h2 className="text-lg font-bold mb-4">Membership Plans</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {plans.map((plan) => (
              <div key={plan.id} className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                <p className="font-semibold">{plan.name}</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">
                  {plan.price === 0 ? '₹0' : `₹${plan.price.toLocaleString('en-IN')}`}
                  {plan.price > 0 && <span className="text-xs font-normal text-slate-500">/mo</span>}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 mb-8"
        >
          <h2 className="text-lg font-bold mb-4">Official Registration Process</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {FLOW_STEPS.map((step, i) => (
              <React.Fragment key={step.step}>
                <span className={step.optional ? 'text-violet-400 font-medium' : 'text-slate-300'}>
                  {step.label}
                </span>
                {i < FLOW_STEPS.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid sm:grid-cols-2 gap-3 mb-8"
        >
          {[
            'One-time onboarding fee — mandatory for registration',
            'Monthly membership — optional, purchase anytime',
            'Start selling immediately after approval without membership',
            'Commission only on successful completed orders',
            'Free sellers can operate indefinitely on Standard Experience',
            'Upgrade, downgrade, or cancel membership anytime',
          ].map((text) => (
            <div key={text} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              {text}
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Link
            to="/seller/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <UserPlus size={18} />
            Create Seller Account
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/seller/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all"
          >
            <LogIn size={18} />
            Seller Login
          </Link>
          <Link
            to="/seller/pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all"
          >
            <Store size={18} />
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
