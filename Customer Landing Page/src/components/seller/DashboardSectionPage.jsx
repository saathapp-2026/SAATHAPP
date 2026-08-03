import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Inbox, CheckCircle2 } from 'lucide-react';
import DashboardBreadcrumbs from './DashboardBreadcrumbs';
import PageSkeleton from './PageSkeleton';

function StatGrid({ stats }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5"
        >
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </motion.div>
      ))}
    </div>
  );
}

function EmptyState({ title, message }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-700 p-12 text-center" role="status">
      <Inbox size={40} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" aria-hidden="true" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-6 text-center" role="alert">
      <AlertCircle size={32} className="text-red-500 mx-auto mb-2" aria-hidden="true" />
      <p className="text-sm text-red-600 dark:text-red-400 mb-3">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="text-sm font-medium text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded">
          Try again
        </button>
      )}
    </div>
  );
}

function DataTable({ headers, rows }) {
  if (!rows?.length) {
    return <EmptyState title="No records yet" message="Data will appear here once you start using this section." />;
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              {headers.map((h) => (
                <th key={h} scope="col" className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-slate-700 dark:text-slate-300">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CardGrid({ cards }) {
  if (!cards?.length) {
    return <EmptyState title="No items" message="Create your first item to get started." />;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map(({ title, desc, status }) => (
        <div key={title} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold">{title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              status === 'Active' || status === 'Ready' || status === 'Available'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : status === 'Action' || status === 'Generate' || status === 'Browse'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {status}
            </span>
          </div>
          <p className="text-sm text-slate-500">{desc}</p>
        </div>
      ))}
    </div>
  );
}

function SimpleChart({ labels, values }) {
  const max = Math.max(...values);
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
      <h3 className="font-semibold mb-4">Weekly Revenue</h3>
      <div className="flex items-end gap-2 h-40" role="img" aria-label="Weekly revenue chart">
        {values.map((v, i) => (
          <div key={labels[i]} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-emerald-500/80 rounded-t-lg transition-all"
              style={{ height: `${(v / max) * 100}%`, minHeight: '4px' }}
            />
            <span className="text-xs text-slate-500">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsForm({ fields }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      {fields.map(({ label, value, type }) => (
        <div key={label}>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">{label}</label>
          {type === 'textarea' ? (
            <textarea
              defaultValue={value}
              rows={3}
              aria-label={label}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ) : (
            <input
              type={type}
              defaultValue={value}
              aria-label={label}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-emerald-600" role="status">
            <CheckCircle2 size={16} aria-hidden="true" />
            Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}

export default function DashboardSectionPage({ config, breadcrumbExtra = [], error = null, onRetry }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, [config?.title]);

  if (!config) return null;

  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs extra={breadcrumbExtra} />
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs extra={breadcrumbExtra} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{config.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{config.subtitle}</p>
        </div>
        {config.actions?.map(({ label, variant }) => (
          <button
            key={label}
            type="button"
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
              variant === 'primary'
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {config.stats && <StatGrid stats={config.stats} />}
      {config.chart && <SimpleChart {...config.chart} />}
      {config.cards && <CardGrid cards={config.cards} />}
      {config.table && <DataTable {...config.table} />}
      {config.form && <SettingsForm fields={config.form} />}
    </div>
  );
}
