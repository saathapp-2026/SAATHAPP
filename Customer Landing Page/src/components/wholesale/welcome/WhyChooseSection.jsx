import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseSaathApp } from '../../../data/wholesaleWelcomeData';
import SectionHeading from './SectionHeading';

export default function WhyChooseSection() {
  return (
    <section id="why-saathapp" aria-labelledby="why-saathapp-heading" className="py-20 sm:py-24 bg-page dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-saathapp-heading"
          eyebrow="Why SaathApp"
          title="Why Choose SAATHAPP"
          description="Built for Indian wholesale trade — combining hyperlocal trust with enterprise-grade infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseSaathApp.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[20px] border border-slate-200/70 dark:border-slate-800/60 bg-surface p-7 shadow-soft hover:shadow-premium transition-all duration-300"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-[#0A8F3D] to-emerald-400 transition-transform duration-300 group-hover:scale-x-100 origin-left"
                />
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} ring-1 ring-black/5 transition group-hover:scale-110 duration-300`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
