import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  PackageCheck,
  Truck,
  BadgeCheck,
  XCircle,
  RotateCcw,
  Banknote,
  CreditCard,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const ICONS = {
  new: ShoppingBag,
  ready: PackageCheck,
  ofd: Truck,
  delivered: BadgeCheck,
  cancelled: XCircle,
  returned: RotateCcw,
  cod: Banknote,
  payment: CreditCard,
};

const ICON_BG = {
  violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  sky: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  green: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  yellow: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300',
};

/** Primary cards shown in the mockup row */
export const PRIMARY_SUMMARY_KEYS = [
  'new',
  'ready',
  'out_for_delivery',
  'delivered_today',
  'cancelled',
  'returned',
  'cod_pending',
  'payment_received',
];

function SummaryCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 animate-pulse min-w-[140px]">
      <div className="flex justify-between mb-3">
        <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
      <div className="h-6 w-12 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
      <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export default function OrderSummaryCards({ cards = [], loading, onCardClick, activeKey, primaryOnly = true }) {
  const visible = primaryOnly
    ? PRIMARY_SUMMARY_KEYS.map((k) => cards.find((c) => c.key === k)).filter(Boolean)
    : cards;

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3" role="list" aria-label="Order summary cards">
      {visible.map((card, i) => {
        const Icon = ICONS[card.icon] || ShoppingBag;
        const iconBg = ICON_BG[card.color] || ICON_BG.slate;
        const active = activeKey === card.key;
        const up = card.trend === 'up';
        const TrendIcon = up ? TrendingUp : TrendingDown;

        return (
          <motion.button
            key={card.key}
            type="button"
            role="listitem"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            title={card.tooltip}
            onClick={() => onCardClick?.(card)}
            className={`text-left rounded-xl border bg-white dark:bg-slate-900 p-3.5 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              active
                ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg mb-2.5 ${iconBg}`}>
              <Icon size={17} aria-hidden="true" />
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mb-1">{card.label}</p>
            <p className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-50 leading-none mb-1.5">
              {card.displayValue ?? card.count}
            </p>
            <p className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
              <TrendIcon size={10} />
              {up ? '+' : '-'}{Math.abs(card.changePct)}% from yesterday
            </p>
            {card.subLabel && (
              <p className="text-[10px] text-slate-400 mt-0.5">{card.subLabel}</p>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
