import React from 'react';
import { motion } from 'framer-motion';
import { wholesaleBenefits } from '../../../data/wholesaleWelcomeData';
import SectionHeading from './SectionHeading';

export default function BenefitsSection() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Partner Benefits"
          title="Everything You Need to Scale Wholesale"
          description="Premium tools, verified buyers, and enterprise support for manufacturers, distributors, and bulk suppliers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {wholesaleBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="group rounded-[20px] border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-6 shadow-soft hover:shadow-premium transition-shadow duration-300"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${benefit.bg} ${benefit.color} transition group-hover:scale-110 duration-300`}
                >
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
