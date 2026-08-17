import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Receipt,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileEdit,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const ICONS = {
  file: FileText,
  calendar: Calendar,
  receipt: Receipt,
  clock: Clock,
  check: CheckCircle2,
  alert: AlertTriangle,
  x: XCircle,
  draft: FileEdit,
  rupee: IndianRupee,
};

const ICON_BG = {
  violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  green: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
  slate: 'bg-page text-slate-600 dark:text-slate-300',
  rose: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
};

const PRIMARY = ['total', 'month', 'gst', 'pending'];

function Skeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-3.5 animate-pulse">
      <div className="h-9 w-9 rounded-lg bg-slate-200 mb-2.5" />
      <div className="h-3 w-20 rounded bg-slate-200 mb-2" />
      <div className="h-6 w-14 rounded bg-slate-200 mb-2" />
      <div className="h-3 w-24 rounded bg-slate-200" />
    </div>
  );
}

export default function InvoiceSummaryCards({ cards = [], loading, onCardClick, activeKey, primaryOnly = true }) {
  const visible = primaryOnly
    ? PRIMARY.map((k) => cards.find((c) => c.key === k)).filter(Boolean)
    : cards;

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-busy="true">
        {Array.from({ length: primaryOnly ? 4 : 8 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-3 ${primaryOnly ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-5'}`} role="list" aria-label="Invoice summary">
      {visible.map((card, i) => {
        const Icon = ICONS[card.icon] || FileText;
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
            className={`text-left rounded-xl border bg-surface p-3.5 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              active ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg mb-2.5 ${ICON_BG[card.color] || ICON_BG.slate}`}>
              <Icon size={17} aria-hidden="true" />
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mb-1">{card.label}</p>
            <p className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-50 leading-none mb-1.5">
              {card.displayValue ?? card.count}
            </p>
            <p className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
              <TrendIcon size={10} />
              {up ? '+' : '-'}
              {Math.abs(card.changePct)}% from last month
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
