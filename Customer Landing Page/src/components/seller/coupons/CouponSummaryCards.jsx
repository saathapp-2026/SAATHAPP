import React from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  BarChart3,
  Star,
  Megaphone,
  Image,
  Wallet,
} from 'lucide-react';

const ICONS = {
  ticket: Ticket,
  trend: TrendingUp,
  rupee: IndianRupee,
  chart: BarChart3,
  star: Star,
  megaphone: Megaphone,
  image: Image,
  wallet: Wallet,
};

const ICON_BG = {
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  sky: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300',
  orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
  green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
};

const PRIMARY = ['active', 'used', 'savings', 'conversion'];

function Skeleton() {
  return <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 h-[108px] animate-pulse" />;
}

export default function CouponSummaryCards({ cards = [], loading, onCardClick, activeKey, primaryOnly = true }) {
  const visible = primaryOnly
    ? PRIMARY.map((k) => cards.find((c) => c.key === k)).filter(Boolean)
    : cards;

  if (loading) {
    return (
      <div className={`grid gap-4 ${primaryOnly ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 xl:grid-cols-4'}`} aria-busy="true">
        {Array.from({ length: primaryOnly ? 4 : 8 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 ${primaryOnly ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 xl:grid-cols-4'}`}
      role="list"
      aria-label="Coupon summary"
    >
      {visible.map((card, i) => {
        const Icon = ICONS[card.icon] || Ticket;
        const up = card.trend !== 'down';
        const TrendIcon = up ? TrendingUp : TrendingDown;
        const active = activeKey === card.key;
        return (
          <motion.button
            key={card.key}
            type="button"
            role="listitem"
            title={card.tooltip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onCardClick?.(card)}
            className={`text-left rounded-2xl border bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              active ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{card.label}</p>
                <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50 truncate mb-1.5">
                  {card.displayValue}
                </p>
                <p className={`inline-flex items-center gap-1 text-xs font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                  <TrendIcon size={12} />
                  {up ? '+' : '-'}
                  {Math.abs(card.changePct)}% this month
                </p>
              </div>
              <div className={`h-11 w-11 rounded-xl inline-flex items-center justify-center shrink-0 ${ICON_BG[card.color] || ICON_BG.emerald}`}>
                <Icon size={18} />
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
