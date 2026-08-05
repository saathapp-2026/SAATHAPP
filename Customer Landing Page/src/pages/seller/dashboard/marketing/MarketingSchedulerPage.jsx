import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CalendarDays, Clock3, PauseCircle, PlayCircle, TrendingUp, MapPin } from 'lucide-react';
import { getCampaignScheduler } from '../../../../services/seller/sellerAdvertisementsService';
import { formatINR } from '../../../../config/seller/adConstants';

export default function MarketingSchedulerPage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getCampaignScheduler()
      .then((res) => {
        if (!active) return;
        setSchedule(res.data || []);
      })
      .catch(() => toast.error('Unable to load scheduler data'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">Campaign scheduler</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Manage campaign timing & status</h2>
            <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">Schedule ads for immediate launch, custom dates, recurring execution or manual review.</p>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            <CalendarDays size={16} /> New schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {['Upcoming', 'Running', 'Paused'].map((label, index) => (
          <div key={label} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">{schedule.filter((item) => item.timeline.toLowerCase().includes(label.toLowerCase())).length}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Active campaigns in this status bucket.</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-[0.24em] text-[11px]">
            <tr>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Remaining</th>
              <th className="px-4 py-3">Timezone</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="py-10 text-center text-slate-500">Loading...</td></tr>
            ) : schedule.length ? (
              schedule.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-50">{item.name}</td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{item.timeline}</td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{item.startAt?.slice(0, 10)} → {item.endAt?.slice(0, 10)}</td>
                  <td className="px-4 py-4 text-slate-900 dark:text-slate-100">{formatINR(item.dailyBudget)}/day</td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{formatINR(item.remainingBudget)}</td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{item.timezone}</td>
                  <td className="px-4 py-4"><button type="button" className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">Manage</button></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="py-10 text-center text-slate-500">No campaign schedules yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
