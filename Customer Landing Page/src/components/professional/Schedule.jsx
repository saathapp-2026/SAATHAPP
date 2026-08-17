import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export default function Schedule() {
  const scheduleItems = [
    { time: '09:00 AM', job: 'Electrical Switch Repair', client: 'Rajesh Sen', address: 'Green Park, Block C', status: 'completed' },
    { time: '11:00 AM', job: 'AC Installation Check', client: 'Sunita Roy', address: 'Malviya Nagar, Sector 4', status: 'completed' },
    { time: '02:00 PM', job: 'Electric Wiring Overhaul', client: 'Preeti Sharma', address: 'Hauz Khas Village', status: 'in_progress' },
    { time: '04:00 PM', job: 'Appliance Repair', client: 'Vijay Khanna', address: 'Green Park Extension', status: 'upcoming' }
  ];

  return (
    <div className="bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">Today's Timeline</h3>
        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase">
          4 Scheduled
        </span>
      </div>

      <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-6 ml-3 py-1">
        {scheduleItems.map((item, idx) => {
          const isCompleted = item.status === 'completed';
          const isInProgress = item.status === 'in_progress';

          return (
            <div key={idx} className="relative">
              {/* Timeline dot */}
              <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm flex items-center justify-center ${
                isCompleted 
                  ? 'bg-emerald-500' 
                  : isInProgress 
                    ? 'bg-primary animate-pulse' 
                    : 'bg-slate-350'
              }`} />

              <div className="space-y-1.5">
                {/* Time Indicator */}
                <div className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400">
                  <Clock size={10} />
                  <span>{item.time}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    isCompleted 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' 
                      : isInProgress 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-page dark:bg-slate-950 text-slate-450'
                  }`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Job Info */}
                <div className="bg-page  p-3 rounded-xl border border-slate-150 dark:border-slate-850">
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">{item.job}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Client: {item.client}</p>
                  
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                    <MapPin size={10} className="flex-shrink-0" />
                    <span className="truncate">{item.address}</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
