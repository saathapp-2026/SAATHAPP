import React from 'react';
import { MapPin, ShieldCheck, TrendingUp, DollarSign, Headset } from 'lucide-react';

const REASONS = [
  { 
    icon: MapPin, 
    title: 'Local Reach', 
    desc: 'Reach customers in your area, city or state',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10'
  },
  { 
    icon: ShieldCheck, 
    title: 'Trusted Platform', 
    desc: 'Be visible on a trusted and growing platform',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-500/10'
  },
  { 
    icon: TrendingUp, 
    title: 'Better Engagement', 
    desc: 'Get more visibility and more business',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-500/10'
  },
  { 
    icon: DollarSign, 
    title: 'Affordable Plans', 
    desc: 'Flexible plans for every business size',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10'
  },
  { 
    icon: Headset, 
    title: 'Dedicated Support', 
    desc: 'Our team is here to help you grow',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-500/10'
  },
];

export default function AdWhyChooseSection() {
  return (
    <section className="py-16 bg-surface dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-emerald-500" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight text-center">
            Why Advertise on SaathApp?
          </h2>
          <div className="h-px w-8 bg-emerald-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {REASONS.map((r, i) => (
            <div 
              key={i} 
              className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 hover:bg-surface transition-all duration-300 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${r.bg} ${r.color}`}>
                <r.icon size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {r.title}
                </h4>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-snug">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
