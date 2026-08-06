import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Download, FileText, ArrowUpRight, Search } from 'lucide-react';
import { getAdReports } from '../../../../services/advertisementsService';
import { formatINR } from '../../../../config/seller/adConstants';

export default function MarketingReportsPage() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getAdReports()
      .then((res) => {
        if (!active) return;
        setReports(res.data || []);
      })
      .catch(() => toast.error('Unable to load reports'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filteredReports = reports.filter((report) => report.name.toLowerCase().includes(search.toLowerCase()));

  const downloadReport = (report) => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded');
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">Ad Reports</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Export campaign performance</h2>
            <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">Download CSV, Excel or PDF-ready summaries for campaigns, billing, and live performance metrics.</p>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            <Download size={16} /> Generate Report
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Reports</p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Available campaign exports</h3>
          </div>
          <div className="relative w-full max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports"
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="mt-6 animate-pulse space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-20 rounded-3xl bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-5 sm:flex sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{report.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{report.description}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0">
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">{report.format}</span>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">{formatINR(report.value)}</span>
                  <button type="button" onClick={() => downloadReport(report)} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
                    <ArrowUpRight size={14} /> Download
                  </button>
                </div>
              </div>
            ))}
            {!filteredReports.length && <p className="text-center text-sm text-slate-500 dark:text-slate-400">No reports found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
