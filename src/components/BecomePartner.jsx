import React from 'react';
import { motion } from 'framer-motion';
import { Store, Truck, Briefcase, Award, ArrowRight } from 'lucide-react';

const partners = [
  {
    title: 'Become a Seller',
    description: 'Grow your retail store or farming venture by list-selling products directly to hyper-local customers.',
    cta: 'Register Store',
    icon: Store,
    gradient: 'from-green-600 to-emerald-700',
    shadow: 'hover-glow-green'
  },
  {
    title: 'Become Delivery Agent',
    description: 'Earn a steady income with flexible delivery schedules. Deliver local groceries and construction products.',
    cta: 'Apply as Rider',
    icon: Truck,
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'hover-glow-yellow'
  },
  {
    title: 'Become a Franchise',
    description: 'Own a district-level SaathApp center and manage local operations and logistics hubs with full corporate backing.',
    cta: 'Partner Franchising',
    icon: Briefcase,
    gradient: 'from-blue-600 to-indigo-700',
    shadow: 'hover-glow-blue'
  },
  {
    title: 'Become Service Provider',
    description: 'Are you an electrician, painter, plumber, or mechanic? Join as a certified Saathi and get steady local service leads.',
    cta: 'Apply as Saathi',
    icon: Award,
    gradient: 'from-purple-600 to-violet-700',
    shadow: 'hover-glow-blue'
  }
];

export default function BecomePartner({ onBecomePartnerSelect }) {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Join Our Network</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">Grow with SaathApp</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
            Partner with India's fastest growing Hyperlocal Super App network. Expand your scale, earnings, and operations.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => {
            const Icon = partner.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`bg-white dark:bg-slate-900 rounded-card p-6 border border-slate-200/60 dark:border-slate-800/50 shadow-soft hover:shadow-premium text-left flex flex-col justify-between h-[230px] sm:h-[240px] transition-all ${partner.shadow}`}
              >
                
                {/* Header: Title and Icon */}
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${partner.gradient} text-white flex items-center justify-center shadow-sm`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">
                      {partner.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Footer: CTA Button */}
                <motion.button
                  onClick={() => onBecomePartnerSelect(partner.title)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-2.5 rounded-btn text-white font-extrabold text-[11px] flex items-center justify-center gap-1.5 bg-gradient-to-r ${partner.gradient} transition-colors cursor-pointer shadow-sm`}
                >
                  <span>{partner.cta}</span>
                  <ArrowRight size={12} />
                </motion.button>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
