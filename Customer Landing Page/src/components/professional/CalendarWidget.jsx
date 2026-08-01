import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Info, Check, Plus, AlertTriangle } from 'lucide-react';

export default function CalendarWidget() {
  const [blockedDates, setBlockedDates] = useState([12, 18, 25]); // Days in July 2026
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, startDate: '2026-07-12', endDate: '2026-07-12', reason: 'Personal work', status: 'approved' },
    { id: 2, startDate: '2026-07-25', endDate: '2026-07-25', reason: 'Medical checkup', status: 'approved' }
  ]);

  const [newLeave, setNewLeave] = useState({
    date: '15',
    reason: 'Family event'
  });

  // Mock bookings on specific calendar days (July 2026)
  const jobDays = {
    4: [{ time: '04:00 PM', task: 'Appliance Repair' }],
    8: [{ time: '09:00 AM', task: 'Switch Repair' }],
    15: [{ time: '11:00 AM', task: 'AC Installation' }],
    22: [{ time: '02:00 PM', task: 'Wiring Overhaul' }]
  };

  const handleDayClick = (day) => {
    // Cannot block days with active jobs
    if (jobDays[day]) {
      alert('Cannot block this date. You have active jobs scheduled.');
      return;
    }
    
    setBlockedDates(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleRequestLeave = (e) => {
    e.preventDefault();
    const dayVal = parseInt(newLeave.date);
    if (isNaN(dayVal) || dayVal < 1 || dayVal > 31) {
      alert('Please enter a valid day between 1 and 31.');
      return;
    }
    if (jobDays[dayVal]) {
      alert('Cannot request leave. You have active jobs scheduled on this day.');
      return;
    }

    const newReq = {
      id: Date.now(),
      startDate: `2026-07-${dayVal < 10 ? '0' + dayVal : dayVal}`,
      endDate: `2026-07-${dayVal < 10 ? '0' + dayVal : dayVal}`,
      reason: newLeave.reason,
      status: 'approved'
    };

    setLeaveRequests(prev => [newReq, ...prev]);
    setBlockedDates(prev => [...prev, dayVal]);
    setNewLeave({ date: '', reason: '' });
    alert('Leave request approved instantly for simulation purposes!');
  };

  // July 2026 starts on a Wednesday (3 empty spots in Sunday-start calendar week)
  const emptyDays = 3;
  const daysInMonth = 31;
  const calendarCells = [];

  for (let i = 0; i < emptyDays; i++) calendarCells.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarCells.push(i);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
      
      {/* Calendar Grid card */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all">
        
        {/* Header info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">July 2026</h3>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span>Jobs</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Blocked</span>
            </span>
          </div>
        </div>

        {/* Calendar layout */}
        <div className="space-y-4">
          
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase text-slate-400">
            {weekdays.map(d => <div key={d}>{d}</div>)}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={idx} className="aspect-square bg-slate-50/20 dark:bg-slate-950/10 rounded-xl" />;
              }

              const isBlocked = blockedDates.includes(day);
              const hasJobs = jobDays[day] !== undefined;

              return (
                <button
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-xl border flex flex-col justify-between p-1.5 transition-all cursor-pointer relative group ${
                    isBlocked 
                      ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/60'
                      : hasJobs
                        ? 'bg-emerald-50 border-primary/20 text-slate-800 dark:bg-emerald-950/20 dark:border-primary/20 dark:text-slate-200'
                        : 'bg-slate-50/60 border-slate-100 hover:border-slate-350 dark:bg-slate-950/40 dark:border-slate-850 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold">{day}</span>
                  
                  {/* Indicators */}
                  <div className="flex items-center gap-0.5 mt-auto">
                    {hasJobs && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                    {isBlocked && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    )}
                  </div>

                  {/* Hover tooltip for jobs */}
                  {hasJobs && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-[8px] whitespace-nowrap shadow-md pointer-events-none hidden group-hover:block z-10 font-bold uppercase">
                      {jobDays[day][0].time} - {jobDays[day][0].task}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl mt-4">
            <Info size={12} className="text-slate-400 flex-shrink-0" />
            <span>Click any date to block/unblock your availability for instant leads.</span>
          </div>

        </div>

      </div>

      {/* Leave Requests Drawer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between">
        
        {/* Request Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Request Time-Off</h3>
          
          <form onSubmit={handleRequestLeave} className="space-y-3.5">
            <div className="space-y-1">
              <label className="field-label">Day of July (1-31)</label>
              <input
                type="number"
                min={1}
                max={31}
                required
                value={newLeave.date}
                onChange={(e) => setNewLeave(prev => ({ ...prev, date: e.target.value }))}
                placeholder="e.g. 15"
                className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
              />
            </div>
            
            <div className="space-y-1">
              <label className="field-label">Reason for leave</label>
              <input
                type="text"
                required
                value={newLeave.reason}
                onChange={(e) => setNewLeave(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="e.g. Family function"
                className="input-field dark:bg-slate-850 dark:border-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full cursor-pointer flex items-center justify-center gap-1.5 text-xs py-2.5"
            >
              <Plus size={14} />
              <span>Submit Leave Request</span>
            </button>
          </form>
        </div>

        {/* Historic Request List */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/40 text-left">
          <h4 className="text-xs font-black text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-3">Leave Log</h4>
          
          <div className="space-y-2 overflow-y-auto max-h-[150px] pr-1 scrollbar-none">
            {leaveRequests.map(req => (
              <div 
                key={req.id}
                className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850/80 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-black text-slate-800 dark:text-slate-200">{req.startDate}</span>
                  <p className="text-[10px] text-slate-450 mt-0.5">{req.reason}</p>
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
