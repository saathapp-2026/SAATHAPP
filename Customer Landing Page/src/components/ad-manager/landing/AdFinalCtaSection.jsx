import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Smile, Store } from 'lucide-react';

export default function AdFinalCtaSection({ onStart }) {
  return (
    <section className="py-16 bg-page dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-emerald-800 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
          
          {/* Background Decorative Graphic */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-emerald-600/40 to-transparent" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute top-12 right-24 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl mix-blend-screen" />
            
            {/* SVG Wave/Chart graphic behind the text */}
            <svg className="absolute bottom-0 left-0 w-2/3 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 C20,80 40,90 60,60 C80,30 90,40 100,20 L100,100 Z" fill="currentColor" className="text-emerald-300" />
            </svg>
          </div>

          {/* Left CTA Text & Button */}
          <div className="relative z-10 flex-1 p-8 sm:p-12 text-center md:text-left space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Grow Your Business?
              </h2>
              <p className="text-emerald-100 font-medium text-sm sm:text-base max-w-lg mx-auto md:mx-0">
                Advertise with SaathApp today and get maximum visibility, more customers and higher sales.
              </p>
            </div>
            
            <motion.button
              type="button"
              onClick={onStart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-surface text-emerald-800 hover:bg-emerald-50 rounded-full font-bold text-base shadow-lg transition-colors"
            >
              Start Advertising Now
              <ArrowRight size={18} className="text-emerald-600" />
            </motion.button>
          </div>

          {/* Right Statistics */}
          <div className="relative z-10 w-full md:w-auto flex flex-row flex-wrap md:flex-col justify-center items-center gap-6 p-8 sm:p-12 bg-emerald-900/40 md:border-l border-emerald-700/50 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center space-y-1.5 w-32">
              <Eye size={24} className="text-emerald-400" />
              <div className="font-black text-2xl sm:text-3xl text-white">500K+</div>
              <div className="text-[10px] sm:text-xs font-semibold text-emerald-200 uppercase tracking-wider">Daily Views</div>
            </div>
            
            <div className="hidden md:block w-12 h-px bg-emerald-700/50" />

            <div className="flex flex-col items-center text-center space-y-1.5 w-32">
              <Smile size={24} className="text-emerald-400" />
              <div className="font-black text-2xl sm:text-3xl text-white">50K+</div>
              <div className="text-[10px] sm:text-xs font-semibold text-emerald-200 uppercase tracking-wider">Happy Customers</div>
            </div>

            <div className="hidden md:block w-12 h-px bg-emerald-700/50" />

            <div className="flex flex-col items-center text-center space-y-1.5 w-32">
              <Store size={24} className="text-emerald-400" />
              <div className="font-black text-2xl sm:text-3xl text-white">10K+</div>
              <div className="text-[10px] sm:text-xs font-semibold text-emerald-200 uppercase tracking-wider">Active Stores</div>
            </div>
          </div>

        </div>

        {/* Footer Disclaimer Info */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 px-2">
          <div className="space-y-1 text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px]">i</span>
              Advertisement charges are fixed and not based on clicks or impressions.
            </p>
            <p>Pricing depends on campaign duration, placement, location, category, competition and coverage area.</p>
            <p>All advertisements are subject to review and approval by SaathApp.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-300">Need Help?</span>
            </div>
            <a href="tel:+919123456780" className="focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
              <span className="font-semibold">+91 9123456780</span>
            </a>
            <a href="mailto:advertise@saathapp.in" className="focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
              <span className="font-semibold">advertise@saathapp.in</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
