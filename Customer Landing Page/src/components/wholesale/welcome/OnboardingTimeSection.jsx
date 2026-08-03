import React from 'react';
import { motion } from 'framer-motion';
import { Clock3 } from 'lucide-react';
import { onboardingTimeline } from '../../../data/wholesaleWelcomeData';
import SectionHeading from './SectionHeading';

export default function OnboardingTimeSection() {
  return (
    <section id="onboarding-time" aria-labelledby="onboarding-time-heading" className="py-20 sm:py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="onboarding-time-heading"
          eyebrow="Onboarding Timeline"
          title="Estimated Onboarding Time"
          description="A clear, guided process from registration to your first bulk order — designed for speed and transparency."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {onboardingTimeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="relative rounded-[20px] border border-slate-200/70 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/50 p-7 shadow-soft"
              >
                {index < onboardingTimeline.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 hidden h-0.5 w-6 bg-gradient-to-r from-[#0A8F3D]/40 to-transparent md:block"
                  />
                )}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A8F3D]/10 text-[#0A8F3D]">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A8F3D]/10 px-3 py-1 text-xs font-extrabold text-[#0A8F3D]">
                    <Clock3 size={12} aria-hidden="true" />
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm font-semibold text-slate-500 dark:text-slate-400"
        >
          Total time to go live: typically <span className="text-[#0A8F3D] font-extrabold">2–3 business days</span> from start to approved partner.
        </motion.p>
      </div>
    </section>
  );
}
