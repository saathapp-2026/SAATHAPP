import React from 'react';
import { motion } from 'framer-motion';
import { whySaathAppFeatures } from '../data/mockData';

export default function WhySaathApp() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">SaathApp Trust</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">Why Choose SaathApp?</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
            Bridging the gap between rural/urban local businesses and customers with cutting edge speed, trust, and intelligence.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whySaathAppFeatures.map((feat, index) => {
            const IconComponent = feat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-slate-900 rounded-card p-5 border border-slate-200/60 dark:border-slate-800/50 shadow-soft hover:shadow-premium text-left space-y-4"
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center ${feat.color} shadow-sm border border-slate-200/20`}>
                  <IconComponent size={24} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-slate-850 dark:text-slate-100">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
