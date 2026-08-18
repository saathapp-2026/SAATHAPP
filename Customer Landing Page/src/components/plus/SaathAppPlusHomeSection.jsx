import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Truck, Zap, Tag, ArrowRight } from 'lucide-react';

export default function SaathAppPlusHomeSection() {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[32px] p-8 sm:p-10 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-500/40 shadow-xl"
      >
        {/* Background Sparkles / Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
              <Crown size={14} className="text-amber-500 animate-pulse" />
              <span>SAATHAPP PLUS MEMBERSHIP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-theme tracking-tight">
              Unlock More with <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">SaathApp Plus</span>
            </h2>

            <p className="text-xs sm:text-sm text-theme-secondary font-medium leading-relaxed">
              Enjoy unlimited free deliveries, priority support, instant checkout discounts, and exclusive festival benefits across Shopping, Services, and Offers. Starting at just <strong className="text-amber-500 font-extrabold">₹99/month</strong>.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-surface border border-theme-border text-xs font-bold text-theme flex items-center gap-1.5 shadow-xs">
                <Truck size={14} className="text-emerald-500" />
                <span>Free Deliveries</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-surface border border-theme-border text-xs font-bold text-theme flex items-center gap-1.5 shadow-xs">
                <Zap size={14} className="text-amber-500" />
                <span>Faster Delivery Slot</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-surface border border-theme-border text-xs font-bold text-theme flex items-center gap-1.5 shadow-xs">
                <Tag size={14} className="text-purple-500" />
                <span>Member Coupons</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-surface border border-theme-border text-xs font-bold text-theme flex items-center gap-1.5 shadow-xs">
                <Sparkles size={14} className="text-rose-500" />
                <span>Festival Perks</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-center">
            <button
              onClick={() => navigate('/plus')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Crown size={18} />
              <span>EXPLORE PLUS PLANS</span>
              <ArrowRight size={16} />
            </button>
            <p className="text-[11px] text-theme-secondary font-medium mt-2">
              5 Tiers available · Cancel anytime
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
