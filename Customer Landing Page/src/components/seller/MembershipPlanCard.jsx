import React from 'react';
import { motion } from 'framer-motion';
import { Check, IndianRupee, Star } from 'lucide-react';

const COLOR_MAP = {
  emerald: { ring: 'border-emerald-500', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500', accent: 'text-emerald-400' },
  blue: { ring: 'border-blue-500', bg: 'bg-blue-500/10', badge: 'bg-blue-500', accent: 'text-blue-400' },
  amber: { ring: 'border-amber-500', bg: 'bg-amber-500/10', badge: 'bg-amber-500', accent: 'text-amber-400' },
  rose: { ring: 'border-rose-500', bg: 'bg-rose-500/10', badge: 'bg-rose-500', accent: 'text-rose-400' },
};

export default function MembershipPlanCard({ plan, selected, onSelect, index = 0, variant = 'dark' }) {
  const isSelected = selected === plan.id;
  const isLight = variant === 'light';
  const colors = COLOR_MAP[plan.color] || COLOR_MAP.emerald;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={() => onSelect(plan.id)}
      className={`relative w-full text-left rounded-2xl p-6 border-2 transition-all backdrop-blur-xl ${
        isSelected
          ? `${colors.ring} ${colors.bg} shadow-lg`
          : isLight
            ? 'border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:border-violet-300'
            : 'border-white/10 bg-white/5 hover:border-white/20'
      } ${plan.recommended ? 'ring-2 ring-amber-500/30' : ''}`}
    >
      {plan.recommended && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full ${colors.badge} text-white text-xs font-bold flex items-center gap-1 whitespace-nowrap`}>
          <Star size={10} fill="currentColor" />
          Most Popular
        </span>
      )}

      <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${colors.accent}`}>
        {plan.id === 'free' && '🟢'}
        {plan.id === 'starter' && '🔵'}
        {plan.id === 'growth' && '🟡'}
        {plan.id === 'enterprise' && '🔴'}
        {' '}{plan.name}
      </div>

      <div className="flex items-baseline gap-0.5 mb-1">
        {plan.price === 0 ? (
          <span className="text-3xl font-bold">Free</span>
        ) : (
          <>
            <IndianRupee size={20} className={colors.accent} />
            <span className="text-3xl font-bold">{plan.price.toLocaleString('en-IN')}</span>
            <span className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>/month</span>
          </>
        )}
      </div>

      <p className={`text-xs mb-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{plan.tagline}</p>
      <p className={`text-xs mb-4 ${colors.accent}`}>{plan.commission} commission on orders</p>

      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {plan.highlights.slice(0, 8).map((h) => (
          <li key={h} className={`flex items-start gap-2 text-xs ${isLight ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
            <Check size={12} className={`${colors.accent} shrink-0 mt-0.5`} />
            {h}
          </li>
        ))}
        {plan.highlights.length > 8 && (
          <li className={`text-xs ${colors.accent}`}>+{plan.highlights.length - 8} more features</li>
        )}
      </ul>
    </motion.button>
  );
}
