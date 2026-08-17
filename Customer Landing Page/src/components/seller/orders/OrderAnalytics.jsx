import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { Download } from 'lucide-react';
import { getOrderAnalytics, exportOrders } from '../../../services/seller/sellerOrdersService';

function Metric({ label, value, suffix = '' }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-surface p-4">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-bold tabular-nums">
        {value}
        {suffix}
      </p>
    </div>
  );
}

export default function OrderAnalytics({ filters }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('daily');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getOrderAnalytics()
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

  const handleExport = async (format) => {
    const res = await exportOrders(format, filters);
    if (!res.success) return;
    const blob = new Blob([res.data.content], { type: res.data.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = res.data.filename.replace('.json', format === 'excel' ? '.xlsx.csv' : `.${format === 'csv' ? 'csv' : 'json'}`);
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse">
        <div className="h-40 bg-page rounded-xl" />
      </div>
    );
  }

  if (!data) return null;

  const chartData = range === 'monthly' ? data.monthly : data.daily;

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 md:p-6 space-y-4" aria-label="Orders analytics">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-bold text-lg">Analytics</h2>
        <div className="flex flex-wrap gap-2">
          {['daily', 'weekly', 'monthly'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                range === r ? 'bg-emerald-500 text-white' : 'border border-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
          <button type="button" onClick={() => handleExport('csv')} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs border border-slate-200">
            <Download size={12} /> CSV
          </button>
          <button type="button" onClick={() => handleExport('excel')} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs border border-slate-200">
            <Download size={12} /> Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <Metric label="Avg Delivery Time" value={data.averageDeliveryTimeMin} suffix=" min" />
        <Metric label="Avg Packing Time" value={data.averagePackingTimeMin} suffix=" min" />
        <Metric label="Acceptance Rate" value={data.acceptanceRate} suffix="%" />
        <Metric label="Cancellation Rate" value={data.cancellationRate} suffix="%" />
        <Metric label="Rejection Rate" value={data.rejectionRate} suffix="%" />
        <Metric label="Late Orders" value={data.lateOrders} />
        <Metric label="Repeat Customers" value={data.repeatCustomers} />
        <Metric label="Revenue" value={`₹${data.revenue.toLocaleString('en-IN')}`} />
        <Metric label="Commission" value={`₹${data.commission.toLocaleString('en-IN')}`} />
        <Metric label="Net Earnings" value={`₹${data.netEarnings.toLocaleString('en-IN')}`} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {range === 'daily' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#10b981" name="Orders" radius={[6, 6, 0, 0]} />
              <Bar dataKey="revenue" fill="#0ea5e9" name="Revenue" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="orders" stroke="#0ea5e9" strokeWidth={2} name="Orders" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
