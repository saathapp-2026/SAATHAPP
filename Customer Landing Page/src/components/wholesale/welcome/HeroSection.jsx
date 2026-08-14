import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Clock3, Sparkles } from 'lucide-react';
import { partnerTypes } from '../../../data/wholesaleWelcomeData';
import WholesalerHeroImg from '../../../assets/wholesaler-hero.png';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function HeroSection({ onStartRegistration }) {
  const handleStart = () => {
    if (onStartRegistration) {
      onStartRegistration();
    } else {
      scrollTo('register');
    }
  };

  return (
    <section
      aria-labelledby="wholesale-hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a2e16] to-slate-900 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#0A8F3D]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,143,61,0.22),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-sm">
              <Sparkles size={14} className="text-emerald-300" />
              SaathApp Wholesale Network
            </div>

            <div className="space-y-5">
              <h1
                id="wholesale-hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]"
              >
                Become a{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                  Wholesale Partner
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
                Join India&apos;s premium hyperlocal B2B marketplace. Reach verified buyers,
                manage bulk orders, and scale with enterprise-grade wholesale infrastructure.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A8F3D]/20 text-emerald-300">
                <Clock3 size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/90">
                  Estimated Onboarding Time
                </p>
                <p className="text-sm font-extrabold text-white">
                  15–20 min registration · 24–48 hr verification
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleStart}
                className="group inline-flex items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#0A8F3D] to-[#087a34] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(10,143,61,0.35)] transition hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Start Registration
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('benefits')}
                className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Learn More
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {partnerTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300"
                >
                  {type}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#0A8F3D]/30 to-emerald-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
              <div className="w-full rounded-[20px] bg-slate-800/80 border border-slate-700/60 aspect-[4/3] flex flex-col items-center justify-center text-slate-400 gap-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <Sparkles size={32} />
                </div>
                <span className="text-xs font-semibold text-slate-300">Wholesale Network Platform</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Verified Wholesale Network</p>
                <p className="mt-1 text-sm font-semibold text-white">Enterprise-grade wholesale infrastructure</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
