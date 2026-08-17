import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Award, Star, Shield, Gem, Crown, CheckCircle2, Calendar, CalendarDays } from 'lucide-react';

const TIERS = [
  { id: 'starter', name: 'Starter', icon: Send, iconColor: 'text-emerald-500' },
  { id: 'bronze', name: 'Bronze', icon: Award, iconColor: 'text-amber-700' },
  { id: 'silver', name: 'Silver', icon: Award, iconColor: 'text-slate-400' },
  { id: 'gold', name: 'Gold', icon: Award, iconColor: 'text-amber-400' },
  { id: 'platinum', name: 'Platinum', icon: Shield, iconColor: 'text-blue-500' },
  { id: 'diamond', name: 'Diamond', icon: Gem, iconColor: 'text-purple-500' },
  { id: 'enterprise', name: 'Enterprise', icon: Crown, iconColor: 'text-amber-500' },
];

const DAILY_PRICES = ['₹100', '₹250', '₹500', '₹1,000', '₹2,500', '₹5,000', '₹10,000'];
const MONTHLY_PRICES = ['₹5,000', '₹10,000', '₹25,000', '₹50,000', '₹1,00,000', '₹2,50,000', '₹5,00,000'];

export default function AdPlansSection() {
  return (
    <section className="py-16 bg-page dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-emerald-500" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Simple, Transparent & Effective Advertising
            </h2>
            <div className="h-px w-8 bg-emerald-500" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Choose the plan that suits your business needs
          </p>
        </div>

        {/* Pricing Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Daily Plans */}
          <div className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="bg-emerald-600 px-6 py-4 flex items-center justify-center gap-2">
              <Calendar className="text-white" size={20} />
              <h3 className="text-white font-bold text-lg">Daily Advertisement Plans</h3>
            </div>
            
            <div className="p-4 sm:p-6 overflow-x-auto flex-1 flex flex-col">
              <div className="min-w-[600px] flex-1">
                <div className="grid grid-cols-7 gap-2 text-center mb-6">
                  {TIERS.map((tier) => (
                    <div key={tier.id} className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                      {tier.name}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {TIERS.map((tier, i) => (
                    <div key={tier.id} className="flex flex-col items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-page dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <tier.icon size={20} className={tier.iconColor} />
                      </div>
                      <div className="text-center">
                        <div className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                          {DAILY_PRICES[i]}
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">
                          / Day
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-500 font-medium text-sm">
                <CheckCircle2 size={16} />
                Run your ad for a day. Cancel anytime.
              </div>
            </div>
          </div>

          {/* Monthly Plans */}
          <div className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="bg-emerald-700 px-6 py-4 flex items-center justify-center gap-2">
              <CalendarDays className="text-white" size={20} />
              <h3 className="text-white font-bold text-lg">Monthly Advertisement Plans</h3>
            </div>
            
            <div className="p-4 sm:p-6 overflow-x-auto flex-1 flex flex-col">
              <div className="min-w-[600px] flex-1">
                <div className="grid grid-cols-7 gap-2 text-center mb-6">
                  {TIERS.map((tier) => (
                    <div key={tier.id} className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                      {tier.name}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {TIERS.map((tier, i) => (
                    <div key={tier.id} className="flex flex-col items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-page dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <tier.icon size={20} className={tier.iconColor} />
                      </div>
                      <div className="text-center">
                        <div className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                          {MONTHLY_PRICES[i]}
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">
                          / Month
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-500 font-medium text-sm">
                <CheckCircle2 size={16} />
                Better value for long-term growth.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
