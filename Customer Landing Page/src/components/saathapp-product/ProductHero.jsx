import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import OfficialBadge from './OfficialBadge';

export default function ProductHero() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 flex flex-col md:flex-row items-center justify-between min-h-[400px]">
      {/* Background Gradient/Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 opacity-90 z-0" />
      
      {/* Content */}
      <div className="relative z-10 w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
        <div className="mb-4 inline-flex">
          <OfficialBadge />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
          SaathApp<br/>
          <span className="text-primary-light">Products</span>
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-md">
          Official SaathApp merchandise, essentials and private label products.
          Designed for you. Delivered by us.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-primary-light">
              <ShieldCheck size={20} />
              <span className="text-xs font-bold uppercase tracking-wide">100% Original</span>
            </div>
            <span className="text-[10px] text-slate-400">SaathApp Quality</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-primary-light">
              <Truck size={20} />
              <span className="text-xs font-bold uppercase tracking-wide">Fast Delivery</span>
            </div>
            <span className="text-[10px] text-slate-400">Pan India</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-primary-light">
              <RotateCcw size={20} />
              <span className="text-xs font-bold uppercase tracking-wide">Easy Returns</span>
            </div>
            <span className="text-[10px] text-slate-400">Hassle Free</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-primary-light">
              <CreditCard size={20} />
              <span className="text-xs font-bold uppercase tracking-wide">Secure Payment</span>
            </div>
            <span className="text-[10px] text-slate-400">100% Safe</span>
          </div>
        </div>
      </div>

      {/* Hero Image (placeholder representation of multiple items like mock) */}
      <div className="relative z-10 w-full md:w-1/2 p-8 flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md aspect-square rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-wrap justify-center content-center gap-4 p-6 overflow-hidden"
        >
          {/* Abstract representations of hero products */}
          <div className="w-32 h-40 bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex flex-col items-center justify-center -rotate-6 transform hover:rotate-0 transition-transform">
             <div className="w-16 h-20 bg-slate-900 rounded-lg mb-2"></div>
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Backpack</span>
          </div>
          <div className="w-24 h-24 bg-slate-800 rounded-full shadow-lg border border-slate-700 flex flex-col items-center justify-center rotate-12 transform hover:rotate-0 transition-transform">
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cap</span>
          </div>
          <div className="w-20 h-48 bg-slate-800 rounded-full shadow-lg border border-slate-700 flex flex-col items-center justify-center -rotate-12 transform hover:rotate-0 transition-transform">
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bottle</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
