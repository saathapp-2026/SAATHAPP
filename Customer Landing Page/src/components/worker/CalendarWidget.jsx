import React from 'react';
import { Calendar, Info } from 'lucide-react';

export default function CalendarWidget() {
  // July 2026 calendar configurations
  // starts on Wednesday (offset 3)
  const offset = 3;
  const daysInMonth = 31;
  const days = [];

  for (let i = 0; i < offset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // Present days
  const presentDays = [];
  const leaveDays = [];
  
  // Days with jobs
  const jobDays = [];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/40">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">July 2026 Schedule</h3>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-450">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span>Present</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-rose-500" />
            <span>Leave</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-500 animate-pulse" />
            <span>Job Day</span>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-2.5 text-center text-[10px] font-black uppercase text-slate-400">
          {weekdays.map(d => <div key={d}>{d}</div>)}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2.5">
          {days.map((day, idx) => {
            if (day === null) {
              return <div key={idx} className="aspect-square bg-slate-50/20 dark:bg-slate-950/10 rounded-xl" />;
            }

            const isPresent = presentDays.includes(day);
            const isLeave = leaveDays.includes(day);
            const hasJobs = jobDays.includes(day);

            return (
              <div
                key={idx}
                className={`aspect-square rounded-xl border flex flex-col justify-between p-2 transition-all relative ${
                  isLeave 
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-955/20 dark:border-rose-900/60'
                    : isPresent
                      ? 'bg-emerald-50 border-emerald-150/40 text-emerald-600 dark:bg-emerald-955/10 dark:border-emerald-900/40 dark:text-emerald-500'
                      : 'bg-slate-50/60 border-slate-100 dark:bg-slate-955/30 dark:border-slate-850 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-bold">{day}</span>
                
                {/* Indicators bar */}
                <div className="flex items-center gap-0.5 mt-auto">
                  {hasJobs && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  )}
                  {isPresent && !hasJobs && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-start gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-[10px] text-slate-450 font-bold border border-slate-150 dark:border-slate-850 mt-4">
          <Info size={13} className="mt-0.5 flex-shrink-0 text-slate-400" />
          <span>This schedule syncs with your attendance punching and jobs dispatched from your supervisor.</span>
        </div>

      </div>

    </div>
  );
}
