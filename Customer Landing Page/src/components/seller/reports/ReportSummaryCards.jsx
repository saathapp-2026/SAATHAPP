import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, TrendingUp, TrendingDown, BarChart3, Package, Receipt, Users, Truck } from 'lucide-react';

const ICONS = {
  chart: FileText,
  clock: Calendar,
  rupee: TrendingUp,
  trend: TrendingUp,
  orders: Package,
  gst: Receipt,
  users: Users,
  truck: Truck,
  file: FileText,
  calendar: Calendar,
};

const ICON_BG = {
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300',
  blue: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  sky: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  teal: 'bg-teal-50 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
};

const PRIMARY = ['generated', 'last', 'revenue'];

function Skeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-5 animate-pulse h-[108px]" />
  );
}

export default function ReportSummaryCards({
  cards = [],
  loading,
  onCardClick,
  activeKey,
  primaryOnly = true,
}) {
  const visible = primaryOnly
    ? PRIMARY.map((k) => cards.find((c) => c.key === k)).filter(Boolean)
    : cards;

  if (loading) {
    return (
      <div className={`grid gap-4 ${primaryOnly ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`} aria-busy="true">
        {Array.from({ length: primaryOnly ? 3 : 8 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 ${primaryOnly ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'}`}
      role="list"
      aria-label="Reports summary"
    >
      {visible.map((card, i) => {
        const Icon = ICONS[card.icon] || BarChart3;
        const up = card.trend !== 'down';
        const TrendIcon = up ? TrendingUp : TrendingDown;
        const active = activeKey === card.key;
        const isLast = card.key === 'last';
        return (
          <motion.button
            key={card.key}
            type="button"
            role="listitem"
            title={card.tooltip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onCardClick?.(card)}
            className={`text-left rounded-2xl border bg-surface p-5 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              active
                ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  {card.label}
                </p>
                <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50 leading-none mb-2 truncate">
                  {isLast ? (card.dayLabel || card.displayValue) : card.displayValue}
                </p>
                {isLast ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {card.timeLabel || card.subLabel || ''}
                  </p>
                ) : Number(card.changePct) !== 0 ? (
                  <p
                    className={`inline-flex items-center gap-1 text-sm font-medium ${
                      up ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    <TrendIcon size={14} />
                    {up ? '+' : '-'}
                    {Math.abs(card.changePct)}% this month
                  </p>
                ) : (
                  <p className="text-sm text-slate-400">—</p>
                )}
              </div>
              <div
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${ICON_BG[card.color] || ICON_BG.green}`}
              >
                <Icon size={20} aria-hidden="true" />
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
