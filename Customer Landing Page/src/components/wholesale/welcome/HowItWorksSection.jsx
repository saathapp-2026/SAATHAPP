import React from 'react';
import { motion } from 'framer-motion';
import { wholesaleSteps } from '../../../data/wholesaleWelcomeData';
import SectionHeading from './SectionHeading';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-20 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="Simple Process"
          title="How It Works"
          description="Register → Verify → Get Approved → Start Selling. A streamlined four-step journey built for speed and trust."
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-8 top-8 bottom-8 hidden w-0.5 bg-gradient-to-b from-[#0A8F3D] via-emerald-400 to-[#0A8F3D]/30 lg:block lg:left-1/2 lg:-translate-x-1/2"
          />

          <div className="space-y-8 lg:space-y-12">
            {wholesaleSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${
                    isEven ? '' : 'lg:[&>div:first-child]:order-2'
                  }`}
                >
                  <div className={`${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div
                      className={`inline-flex items-center gap-3 rounded-full border border-[#0A8F3D]/15 bg-[#0A8F3D]/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0A8F3D] ${
                        isEven ? 'lg:ml-auto' : ''
                      }`}
                    >
                      Step {step.step}
                    </div>
                    <h3 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-md lg:max-w-none">
                      {step.description}
                    </p>
                  </div>

                  <div className={`flex ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                    <div className="relative w-full max-w-sm">
                      <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-br from-[#0A8F3D]/20 to-emerald-300/20 blur-lg" />
                      <div className="relative flex items-center gap-4 rounded-[22px] border border-slate-200/70 bg-white p-5 shadow-premium">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A8F3D] to-[#087a34] text-white shadow-[0_0_15px_rgba(10,143,61,0.35)]">
                          <Icon size={24} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phase {step.step}</p>
                          <p className="text-lg font-black text-slate-900 dark:text-white">{step.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
