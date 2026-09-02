import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Clock3, Mail, Phone } from 'lucide-react';
import WarehouseCtaImg from '../../../assets/warehouse-cta.png';

const scrollToRegister = () => {
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function CTASection({ onStartRegistration }) {
  const handleStartRegistration = () => {
    if (onStartRegistration) {
      onStartRegistration();
    } else {
      window.location.href = '/wholesale/login';
    }
  };

  return (
    <section id="register" aria-labelledby="cta-heading" className="py-20 sm:py-24 bg-page dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] border border-slate-200/70 dark:border-slate-800/60 bg-surface shadow-premium"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#0A8F3D]/5 via-transparent to-emerald-400/5" />

          <div className="relative grid lg:grid-cols-2">
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0A8F3D]/20 bg-[#0A8F3D]/5 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0A8F3D]">
                Ready to Partner
              </div>

              <h2 id="cta-heading" className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Start Your Wholesale Journey with SaathApp
              </h2>

              <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-lg">
                Join a trusted B2B network built for scale. Complete registration in 15–20 minutes
                and get verified within 24–48 business hours.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0A8F3D]">
                <Clock3 size={16} aria-hidden="true" />
                Estimated onboarding: 15–20 min + 24–48 hr verification
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleStartRegistration}
                  className="transition-all duration-200 active:scale-[0.98] group inline-flex items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#0A8F3D] to-[#087a34] px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(10,143,61,0.35)] transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8F3D] focus-visible:ring-offset-2"
                >
                  Start Registration
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                </button>
                <a
                  href="mailto:wholesale@saathapp.in"
                  className="transition-colors hover:text-emerald-600 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-surface px-8 py-3.5 text-sm font-extrabold text-slate-700 dark:text-slate-200 transition hover:bg-page focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8F3D]"
                >
                  <Mail size={16} />
                  Contact Sales
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-page px-4 py-3">
                  <Building2 size={16} className="text-[#0A8F3D] shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">wholesale@saathapp.in</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-page px-4 py-3">
                  <Phone size={16} className="text-[#0A8F3D] shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">+91 1800-SAATHAPP</span>
                </div>
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-full bg-page flex items-center justify-center p-8 text-center">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Building2 size={36} className="text-emerald-500/60" />
                <span className="text-xs font-semibold">Wholesale Logistics Network</span>
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent dark:from-slate-900 dark:via-slate-900/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
