import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';
import { getFeatureComparison, getMembershipPlans } from '../../services/sellerMembershipService';

const PLAN_IDS = ['free', 'starter', 'growth', 'enterprise'];

function CellValue({ value, highlight }) {
  if (value === true) {
    return <Check size={18} className={`mx-auto ${highlight ? 'text-amber-400' : 'text-emerald-500'}`} />;
  }
  if (value === false) {
    return <X size={18} className="mx-auto text-slate-400" />;
  }
  return (
    <span className={`text-xs font-medium ${highlight ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'}`}>
      {value}
    </span>
  );
}

export default function MembershipFeatureComparison({ variant = 'dark' }) {
  const features = getFeatureComparison();
  const plans = getMembershipPlans();
  const isLight = variant === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl overflow-hidden border ${
        isLight ? 'bg-surface border-slate-200 dark:border-slate-800' : 'bg-white/5 border-white/10'
      }`}
    >
      <div className={`p-6 border-b ${isLight ? 'border-slate-200 dark:border-slate-800' : 'border-white/10'}`}>
        <h3 className="text-lg font-bold">Feature Comparison</h3>
        <p className={`text-sm mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Compare plans across all business tools, reports, and support levels
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className={isLight ? 'bg-page' : 'bg-white/5'}>
              <th className={`text-left p-4 font-semibold sticky left-0 z-10 ${isLight ? 'bg-page' : 'bg-slate-900/80'}`}>
                Feature
              </th>
              {plans.map((plan) => (
                <th key={plan.id} className="p-4 text-center min-w-[120px]">
                  <div className="font-bold">{plan.name}</div>
                  {plan.price > 0 && (
                    <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      ₹{plan.price.toLocaleString('en-IN')}/mo
                    </div>
                  )}
                  {plan.recommended && (
                    <span className="inline-flex items-center gap-0.5 mt-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-[10px] font-bold">
                      <Star size={10} fill="currentColor" />
                      Most Popular
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((row, i) => (
              <tr
                key={row.feature}
                className={`transition-colors hover:bg-emerald-50/30 border-t ${isLight ? 'border-slate-100 dark:border-slate-800' : 'border-white/5'} ${
                  i % 2 === 0 ? '' : isLight ? 'bg-slate-50/50' : 'bg-white/[0.02]'
                }`}
              >
                <td className={`p-4 font-medium sticky left-0 z-10 ${isLight ? 'bg-surface' : 'bg-slate-900/90'}`}>
                  {row.feature}
                </td>
                {PLAN_IDS.map((id) => (
                  <td key={id} className={`p-4 text-center ${id === 'growth' ? 'bg-amber-500/5' : ''}`}>
                    <CellValue value={row[id]} highlight={id === 'growth'} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
