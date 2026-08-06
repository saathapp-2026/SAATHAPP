import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart3, TrendingUp, Globe2, Users, DollarSign } from 'lucide-react';
import AdAnalytics from '../../../../components/ad-manager/AdAnalytics';
import { getAdAnalytics } from '../../../../services/advertisementsService';
import { formatINR } from '../../../../config/seller/adConstants';

const METRICS = [
  { key: 'views', label: 'Views', icon: Globe2, color: 'bg-sky-100 text-sky-700' },
  { key: 'reach', label: 'Reach', icon: Users, color: 'bg-emerald-100 text-emerald-700' },
  { key: 'revenue', label: 'Revenue', icon: DollarSign, color: 'bg-emerald-100 text-emerald-700' },
  { key: 'ctr', label: 'CTR', icon: TrendingUp, color: 'bg-violet-100 text-violet-700' },
];

export default function MarketingAnalyticsPage() {
  const [range, setRange] = useState('weekly');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getAdAnalytics(range)
      .then((res) => {
        if (!active) return;
        setData(res.data);
      })
      .catch(() => toast.error('Unable to load analytics'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [range]);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">Campaign Analytics</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Performance overview</h2>
            <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">Track campaign health, reach, conversion and revenue with marketing-specific analytics.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['daily', 'weekly', 'monthly'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRange(item)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold ${range === item ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((metric) => (
          <div key={metric.key} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${metric.color}`}>
              <metric.icon size={18} />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
              {metric.key === 'revenue'
                ? formatINR(data?.summary?.revenue || 0)
                : metric.key === 'ctr'
                  ? `${data?.summary?.ctr || 0}%`
                  : data?.summary?.[metric.key] ?? '—'}
            </p>
          </div>
        ))}
      </div>

      <AdAnalytics data={data} loading={loading} range={range} onRangeChange={setRange} />

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Top Campaign Signals</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="space-y-1">
              <p className="font-semibold text-slate-900 dark:text-slate-50">Store Visits</p>
              <p>More than 40% of campaign traffic is reaching the store page within the first 3 days.</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900 dark:text-slate-50">Conversion Rate</p>
              <p>Ads with promoted product banners show 3x better conversion compared to standard search placements.</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900 dark:text-slate-50">Budget Efficiency</p>
              <p>Campaigns running on SaathPay and UPI are showing the lowest cost per click.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Market Signals</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-3">Mumbai remains the strongest growth market with 42% share.</li>
            <li className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-3">Mobile devices dominate ad engagement at 64%.</li>
            <li className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-3">Premium campaigns are getting 1.8x higher ROAS in category placements.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
