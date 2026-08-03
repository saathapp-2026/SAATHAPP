import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, PackageCheck, Award } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function AnalyticsTab() {
  const { dashboardData } = useWholesale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Analytics & Performance Reports</h2>
          <p className="text-xs text-slate-500">In-depth insights into your wholesale order volumes, category performance, and buyer retention.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Performance Chart */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Quarterly Gross Merchandise Value (GMV)</h3>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">+28.5% YoY</span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-8">
            {[
              { label: 'Q1 2026', height: '50%', val: '₹28.4L' },
              { label: 'Q2 2026', height: '70%', val: '₹34.2L' },
              { label: 'Q3 2026', height: '90%', val: '₹42.8L' },
              { label: 'Q4 (Est)', height: '100%', val: '₹50.0L' },
            ].map((q, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{q.val}</span>
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-emerald-600 to-teal-400 shadow"
                  style={{ height: q.height }}
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{q.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Growth Chart */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Active Buyer Growth</h3>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">850 Verified Buyers</span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-8">
            {[
              { label: 'May', height: '40%', val: '450' },
              { label: 'Jun', height: '60%', val: '580' },
              { label: 'Jul', height: '80%', val: '720' },
              { label: 'Aug', height: '100%', val: '850' },
            ].map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{b.val}</span>
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-sky-600 to-emerald-400 shadow"
                  style={{ height: b.height }}
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
