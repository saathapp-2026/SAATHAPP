import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Package,
  Receipt,
  IndianRupee,
  Users,
  Boxes,
  FileText,
  ShoppingCart,
  CreditCard,
  Landmark,
  RotateCcw,
  Ticket,
  Megaphone,
  Truck,
  Crown,
  Wallet,
  Percent,
  Award,
} from 'lucide-react';

const ICONS = {
  sales: BarChart3,
  pnl: TrendingUp,
  inventory: Package,
  tax: Receipt,
  revenue: IndianRupee,
  customer: Users,
  product: Boxes,
  gst: FileText,
  orders: ShoppingCart,
  payment: CreditCard,
  settlement: Landmark,
  returns: RotateCcw,
  coupon: Ticket,
  ads: Megaphone,
  delivery: Truck,
  membership: Crown,
  marketing: Megaphone,
  wallet: Wallet,
  commission: Percent,
  performance: Award,
};

const COLOR = {
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300',
  sky: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  rose: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300',
  teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300',
  cyan: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
};

const SHORT_DESC = {
  sales: 'Revenue, orders & trends',
  pnl: 'Income, expenses & net profit',
  inventory: 'Stock levels & SKU health',
  tax: 'Tax collected & liability',
  revenue: 'Channel-wise revenue split',
  customer: 'Acquisition & retention',
  product: 'Best & slow movers',
  gst: 'CGST, SGST & IGST summary',
  orders: 'Volume, status & fulfillment',
  payment: 'Modes & collection status',
  settlement: 'Payouts, fees & cycles',
  returns: 'Returns, refunds & RTO',
};

function Skeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 animate-pulse h-[120px]" />
  );
}

export default function ReportCatalog({
  items = [],
  loading,
  limit = 12,
  showAll,
  onToggleAll,
  onGenerate,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  const list = showAll ? items : items.slice(0, limit);

  return (
    <section aria-label="Popular reports">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Popular Reports</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {list.map((item, i) => {
          const Icon = ICONS[item.icon] || BarChart3;
          return (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => onGenerate?.(item)}
              className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${COLOR[item.color] || COLOR.emerald}`}
                >
                  <Icon size={18} />
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-semibold">
                  Ready
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">{item.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {SHORT_DESC[item.id] || item.description}
              </p>
            </motion.button>
          );
        })}
      </div>
      {items.length > limit || showAll ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={onToggleAll}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            {showAll ? 'Show Less' : 'View All Reports'}
          </button>
        </div>
      ) : null}
    </section>
  );
}
