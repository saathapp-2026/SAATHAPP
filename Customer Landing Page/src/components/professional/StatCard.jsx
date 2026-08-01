import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  icon: Icon,
  growth,
  growthType = 'up',
  progress,
  progressColor = 'bg-primary',
  colorClass = 'text-primary bg-primary/10'
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-5 rounded-card shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-40 text-left relative overflow-hidden group"
    >
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-full blur-md pointer-events-none group-hover:scale-110 transition-transform duration-500" />
      
      {/* Top row: Icon & Growth Badge */}
      <div className="flex items-center justify-between relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
          <Icon size={20} />
        </div>

        {growth !== undefined && (
          <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-black ${
            growthType === 'up' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' 
              : growthType === 'down'
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
                : 'bg-slate-500/10 text-slate-500'
          }`}>
            {growthType === 'up' ? <TrendingUp size={10} /> : growthType === 'down' ? <TrendingDown size={10} /> : null}
            <span>{growth}%</span>
          </div>
        )}
      </div>

      {/* Middle row: Title & Value */}
      <div className="space-y-1 mt-3 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">{title}</span>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white leading-none">
          {value}
        </h3>
      </div>

      {/* Bottom row: Progress bar */}
      {progress !== undefined && (
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden relative z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full ${progressColor} rounded-full`}
          />
        </div>
      )}
    </motion.div>
  );
}
