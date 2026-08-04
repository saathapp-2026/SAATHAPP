import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  CheckCircle2,
  Package,
  PackageCheck,
  Truck,
  BadgeCheck,
  XCircle,
  RotateCcw,
  Banknote,
  CreditCard,
  ClockAlert,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const ICONS = {
  new: ShoppingBag,
  accepted: CheckCircle2,
  packed: Package,
  ready: PackageCheck,
  ofd: Truck,
  delivered: BadgeCheck,
  cancelled: XCircle,
  returned: RotateCcw,
  cod: Banknote,
  payment: CreditCard,
  late: ClockAlert,
};

const COLOR_MAP = {
  amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
  blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900',
  violet: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900',
  orange: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900',
  sky: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900',
  green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-900',
  red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900',
  slate: 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700',
  yellow: 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900',
  emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
  rose: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
};

function SummaryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
      <div className="h-7 w-10 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
      <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export default function OrderSummaryCards({ cards = [], loading, onCardClick, activeKey }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3" aria-busy="true" aria-label="Loading order summary">
        {Array.from({ length: 11 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3" role="list" aria-label="Order summary cards">
      {cards.map((card, i) => {
        const Icon = ICONS[card.icon] || ShoppingBag;
        const colors = COLOR_MAP[card.color] || COLOR_MAP.slate;
        const active = activeKey === card.key;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        const trendColor = card.trend === 'up' ? 'text-emerald-600' : 'text-red-500';

        return (
          <motion.button
            key={card.key}
            type="button"
            role="listitem"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            title={card.tooltip}
            aria-label={`${card.label}: ${card.count}. Today ${card.today}, yesterday ${card.yesterday}, ${card.changePct}% ${card.trend}`}
            onClick={() => onCardClick?.(card)}
            className={`text-left rounded-2xl border p-4 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${colors} ${
              active ? 'ring-2 ring-emerald-500 shadow-md' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 dark:bg-slate-950/40">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
                <TrendIcon size={12} aria-hidden="true" />
                {Math.abs(card.changePct)}%
              </span>
            </div>
            <p className="text-xs font-medium opacity-80 mb-1 truncate">{card.label}</p>
            <p className="text-2xl font-bold tabular-nums leading-none mb-1">{card.count}</p>
            <p className="text-[11px] opacity-70">
              Today {card.today} · Yday {card.yesterday}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
