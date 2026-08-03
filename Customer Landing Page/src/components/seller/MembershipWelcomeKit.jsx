import React from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2 } from 'lucide-react';
import { getWelcomeKitConfig } from '../../services/sellerMembershipService';

export default function MembershipWelcomeKit({ variant = 'dark' }) {
  const kit = getWelcomeKitConfig();
  const isLight = variant === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 ${
        isLight
          ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/50'
          : 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border-amber-500/30'
      }`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Gift size={22} className="text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Exclusive Branding Benefits</h3>
            <p className={`text-sm ${isLight ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'}`}>
              Available only for Growth (₹2,499/mo) and Enterprise (₹4,999/mo)
            </p>
          </div>
          <span className="ml-auto px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
            {kit.badge}
          </span>
        </div>

        <h4 className="font-semibold mb-3">{kit.label}</h4>

        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {kit.items.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span className={isLight ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300'}>{item}</span>
            </div>
          ))}
        </div>

        <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
          {kit.note}
        </p>
      </div>
    </motion.div>
  );
}
