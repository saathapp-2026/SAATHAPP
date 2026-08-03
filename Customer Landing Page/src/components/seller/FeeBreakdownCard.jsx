import React from 'react';
import { motion } from 'framer-motion';
import { Receipt } from 'lucide-react';

export default function FeeBreakdownCard({ breakdown, loading }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 animate-pulse space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 bg-white/10 rounded" />
        ))}
      </div>
    );
  }

  const items = breakdown?.breakdown || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Receipt size={18} className="text-emerald-400" />
        <h3 className="font-semibold text-lg">Fee Breakdown</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
          >
            <span className="text-sm text-slate-400">{item.label}</span>
            <span className={`text-sm font-medium ${item.type === 'info' ? 'text-white' : 'text-emerald-400'}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      {breakdown?.weightedScore != null && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Fee Position in Range</span>
            <span className="font-medium">{Math.round(breakdown.weightedScore * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${breakdown.weightedScore * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
