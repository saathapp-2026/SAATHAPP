import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, Shield, TrendingUp, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const BENEFITS = [
  'Mandatory one-time onboarding fee — valid for 2 years',
  'Optional monthly membership for premium tools',
  'Start selling without membership after approval',
  'Commission only on successful orders',
  'Dedicated seller dashboard & analytics',
  'Verification badge for trusted sellers',
];

export default function SellerLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-20">
        <Link to="/" className="text-sm text-slate-400 hover:text-white mb-8 inline-block">
          ← Back to SaathApp
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
            <Store size={16} />
            Seller Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Grow Your Business with <span className="text-emerald-400">SAATHAPP</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join thousands of sellers. Pay a one-time onboarding fee to register. Optional membership unlocks premium tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Shield, title: 'Verified Sellers', desc: 'Build trust with verification badge' },
            { icon: TrendingUp, title: 'Grow Revenue', desc: 'Reach more customers in your area' },
            { icon: Users, title: 'Local Community', desc: 'Connect with nearby buyers' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 text-center"
            >
              <Icon size={32} className="text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-8 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Two Separate Payment Models</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4">
              <h3 className="font-semibold text-emerald-400 mb-2">1. One-Time Onboarding Fee (Mandatory)</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Required for every seller. Covers registration, KYC, verification, and dashboard activation. Valid 2 years, renewable at 50%.
              </p>
            </div>
            <div className="rounded-xl bg-violet-500/10 border border-violet-500/30 p-4">
              <h3 className="font-semibold text-violet-400 mb-2">2. Monthly Membership (Optional)</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Unlock premium tools — GST billing, analytics, inventory, AI insights, and more. Purchase anytime, not required to sell.
              </p>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">Why Sell on SAATHAPP?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 mb-8"
        >
          <h2 className="text-lg font-bold mb-4">Registration Flow</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            {['Create Account', 'Business Details', 'Documents', 'Pay Onboarding Fee', 'Verification', 'Approved', 'Start Selling', '(Optional) Membership'].map((step, i, arr) => (
              <React.Fragment key={step}>
                <span className={step.includes('Optional') ? 'text-violet-400 font-medium' : 'text-slate-300'}>{step}</span>
                {i < arr.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/seller/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            Start Onboarding
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/seller/pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all"
          >
            View Pricing
          </Link>
          <Link
            to="/seller/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all"
          >
            Seller Login
          </Link>
        </div>
      </div>
    </div>
  );
}
