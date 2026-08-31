import React from 'react';
import { motion } from 'framer-motion';
import { wholesaleStats } from '../../../data/wholesaleWelcomeData';
import AnimatedCounter from './AnimatedCounter';

export default function StatisticsSection() {
  return (
    <section aria-labelledby="stats-heading" className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-r from-[#087a34] via-[#0A8F3D] to-emerald-600 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-surface/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 id="stats-heading" className="text-2xl sm:text-3xl font-black tracking-tight">
            Powering Wholesale at Scale
          </h2>
          <p className="mt-2 text-sm sm:text-base text-emerald-100/90 font-medium">
            Real momentum across buyers, partners, and cities nationwide.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {wholesaleStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-surface/30" />
              <p className="mt-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-100/90">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
