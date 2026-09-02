import React from 'react';
import { motion } from 'framer-motion';
import { Store, Truck, Briefcase, Award, ArrowRight, Warehouse } from 'lucide-react';

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
    title: 'Become a Service Professional',
    description: 'Are you an electrician, painter, plumber, or mechanic? Join as a certified partner, set your own rates, and grow your local business.',
    cta: 'Apply as Pro',
    icon: Award,
    gradient: 'from-purple-600 to-violet-700',
    shadow: 'hover-glow-blue'
  },
  {
    title: 'Become a Service Worker',
    description: 'Partner with verified professionals, get steady local job assignments, and secure your weekly income with a flexible schedule.',
    cta: 'Apply as Helper',
    icon: Briefcase,
    gradient: 'from-indigo-600 to-blue-700',
    shadow: 'hover-glow-blue'
  },
  {
    title: 'Become a Wholesaler (Sale in Bulk)',
    description: 'Supply products in bulk to retailers and businesses. Expand your reach with SaathApp wholesale marketplace.',
    cta: 'Register Wholesale',
    icon: Warehouse,
    gradient: 'from-rose-600 to-pink-700',
    shadow: 'hover-glow-yellow'
  }
];

export default function BecomePartner({ onBecomePartnerSelect }) {
  return (
    <section className="py-12 bg-page  border-b border-slate-100 ">
      <div className="saath-container relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Join Our Network</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">Grow with SaathApp</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
            Partner with India's fastest growing Hyperlocal Super App network. Expand your scale, earnings, and operations.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 xl:gap-3.5">
          {partners.map((partner, index) => {
            const Icon = partner.icon;

            return (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className={`bg-surface rounded-card p-3 sm:p-3.5 border border-slate-200/60  shadow-soft hover:shadow-premium text-left flex flex-col justify-between h-[210px] sm:h-[220px] lg:h-[215px] xl:h-[210px] transition-all ${partner.shadow}`}
              >
                
                {/* Header: Title and Icon */}
                <div className="space-y-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${partner.gradient} text-white flex items-center justify-center shadow-sm shrink-0`}>
                    <Icon size={16} />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-[12px] xl:text-xs font-black text-slate-800 dark:text-slate-100 leading-tight min-h-[30px] flex items-center">
                      {partner.title}
                    </h3>
                    <p className="text-[10px] xl:text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug line-clamp-3">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Footer: CTA Button */}
                <motion.button
                  onClick={() => onBecomePartnerSelect(partner.title)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-1.5 px-2 rounded-btn text-white font-extrabold text-[10px] xl:text-[11px] flex items-center justify-center gap-1 bg-gradient-to-r ${partner.gradient} transition-colors cursor-pointer shadow-sm mt-2`}
                >
                  <span className="truncate">{partner.cta}</span>
                  <ArrowRight size={11} className="shrink-0" />
                </motion.button>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
