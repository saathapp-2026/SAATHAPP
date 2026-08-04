import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { UserPlus, Upload, Download, Bell } from 'lucide-react';
import { formatINR } from '../../../config/seller/customerConstants';
import { getCustomerAnalytics } from '../../../services/seller/sellerCustomersService';
import { generateModuleReport } from '../../../services/seller/reportGeneratorService';
import toast from 'react-hot-toast';

export default function CustomerAnalytics({
  compact = false,
  onAdd,
  onImport,
  onExport,
  onNotify,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('daily');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCustomerAnalytics()
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const chart =
    range === 'monthly'
      ? data?.monthly
      : range === 'weekly'
        ? data?.weekly
        : range === 'yearly'
          ? data?.yearly
          : data?.daily;

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  if (!data) return null;

  const quick = [
    { id: 'add', label: 'Add Customer', icon: UserPlus, onClick: onAdd },
    { id: 'import', label: 'Import Customers', icon: Upload, onClick: onImport },
    { id: 'export', label: 'Export Report', icon: Download, onClick: onExport },
    { id: 'notify', label: 'Send Notification', icon: Bell, onClick: onNotify },
  ];

  const reportFormats = [
    { id: 'pdf', label: 'PDF' },
    { id: 'excel', label: 'Excel' },
    { id: 'csv', label: 'CSV' },
    { id: 'word', label: 'Word' },
    { id: 'ppt', label: 'PPT' },
  ];

  return (
    <div className={`space-y-4 ${compact ? '' : ''}`}>
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="font-bold text-sm">Customer Analytics</h3>
          <div className="flex gap-1">
            {['daily', 'weekly', 'monthly'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                  range === r ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-2">New Customers</p>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} width={28} />
              <Tooltip />
              <Line type="monotone" dataKey="newCustomers" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-slate-500 mt-4 mb-2">Customers by Type</p>
        <div className="h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.byType} dataKey="value" nameKey="name" innerRadius={42} outerRadius={62} paddingAngle={2}>
                {data.byType.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {data.byType.map((t) => (
            <span key={t.name} className="inline-flex items-center gap-1 text-[10px] text-slate-500">
              <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
              {t.name} {Math.round((t.value / Math.max(1, data.byType.reduce((s, x) => s + x.value, 0))) * 100)}%
            </span>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-slate-500">Top Spending Customers</h4>
            <button type="button" className="text-[10px] font-semibold text-emerald-600" onClick={() => toast('Showing all top spenders')}>
              View All
            </button>
          </div>
          <ul className="space-y-2">
            {data.topSpenders.slice(0, 3).map((c, i) => (
              <li key={c.id} className="flex items-center gap-2 text-sm">
                <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-sm">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.orders} orders</p>
                </div>
                <p className="font-bold tabular-nums text-sm">{formatINR(c.spent)}</p>
              </li>
            ))}
          </ul>
        </div>

        {!compact && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {Object.entries({
              'Repeat Rate': `${data.metrics.repeatRate}%`,
              CLV: formatINR(data.metrics.clv),
              Retention: `${data.metrics.retention}%`,
              Churn: `${data.metrics.churn}%`,
            }).map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-50 dark:bg-slate-950/50 p-2.5">
                <p className="text-[10px] text-slate-500">{label}</p>
                <p className="font-bold text-sm tabular-nums">{value}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h3 className="font-bold text-sm mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {quick.map(({ id, label, icon: Icon, onClick }) => (
            <button
              key={id}
              type="button"
              onClick={onClick}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Icon size={16} className="text-emerald-600" />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h3 className="font-bold text-sm mb-3">Report Downloads</h3>
        <div className="flex flex-wrap gap-2">
          {reportFormats.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={async () => {
                await generateModuleReport({ moduleKey: 'customers', format: f.id, options: { includeCharts: true } });
                toast.success(`${f.label} report ready`);
              }}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
