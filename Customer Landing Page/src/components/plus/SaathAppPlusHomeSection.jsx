import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Truck, Zap, Tag, ArrowRight } from 'lucide-react';

export default function SaathAppPlusHomeSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[32px] p-5 lg:p-6 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-500/40 shadow-xl flex flex-col justify-center"
      >
        {/* Background Sparkles / Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          <div className="space-y-3 text-center lg:text-left flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider w-fit mx-auto lg:mx-0">
              <Crown size={12} className="text-amber-500 animate-pulse" />
              <span>SAATHAPP PLUS MEMBERSHIP</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-theme tracking-tight mt-2">
              Unlock More with <br className="hidden lg:block"/><span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">SaathApp Plus</span>
            </h2>

            <p className="text-xs text-theme-secondary font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
              Enjoy unlimited free deliveries, priority support, instant checkout discounts, and exclusive festival benefits. Starting at just <strong className="text-amber-500 font-extrabold">₹99/month</strong>.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <div className="px-2.5 py-1 rounded-xl bg-surface border border-theme-border text-[10px] font-bold text-theme flex items-center gap-1.5 shadow-sm">
                <Truck size={12} className="text-emerald-500" />
                <span>Free Deliveries</span>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-surface border border-theme-border text-[10px] font-bold text-theme flex items-center gap-1.5 shadow-sm">
                <Zap size={12} className="text-amber-500" />
                <span>Faster Slot</span>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-surface border border-theme-border text-[10px] font-bold text-theme flex items-center gap-1.5 shadow-sm">
                <Tag size={12} className="text-purple-500" />
                <span>Coupons</span>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-surface border border-theme-border text-[10px] font-bold text-theme flex items-center gap-1.5 shadow-sm">
                <Sparkles size={12} className="text-rose-500" />
                <span>Perks</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-center w-full mt-4">
            <button
              onClick={() => navigate('/plus')}
              className="w-full lg:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer mx-auto"
            >
              <Crown size={16} />
              <span>EXPLORE PLUS PLANS</span>
              <ArrowRight size={14} />
            </button>
            <p className="text-[10px] text-theme-secondary font-medium mt-2">
              5 Tiers available · Cancel anytime
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
