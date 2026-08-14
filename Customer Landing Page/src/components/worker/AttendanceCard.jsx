import React, { useState, useEffect } from 'react';
import { Play, Square, Calendar, Info } from 'lucide-react';

export default function AttendanceCard({
  attendance,
  onClockIn,
  onClockOut
}) {
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Active shift timer count-up when clocked in
  useEffect(() => {
    let interval = null;
    if (attendance.isClockedIn) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setTimerSeconds(0);
    }
    return () => clearInterval(interval);
  }, [attendance.isClockedIn]);

  const formatTimer = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const calendarDays = [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
      
      {/* Clock In / Out Controller */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-56">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Shift Punch Card</span>
          <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white mt-0.5">Punch Attendance</h3>
        </div>

        {/* Dynamic Timer Display */}
        <div className="my-3 text-center">
          {attendance.isClockedIn ? (
            <div className="space-y-1">
              <span className="text-[9px] font-black bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full uppercase inline-block">
                Shift Active
              </span>
              <h2 className="text-3xl font-mono font-black text-slate-800 dark:text-white mt-1">
                {formatTimer(timerSeconds)}
              </h2>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 text-slate-450 px-2 py-0.5 rounded-full uppercase inline-block">
                Not Clocked In
              </span>
              <h2 className="text-3xl font-mono font-black text-slate-400 dark:text-slate-600 mt-1">
                00:00:00
              </h2>
            </div>
          )}
        </div>

        {/* Punch buttons */}
        <div className="flex gap-3">
          {!attendance.isClockedIn ? (
            <button
              onClick={onClockIn}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs uppercase tracking-wider rounded-btn flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <Play size={14} className="fill-white" />
              <span>Clock In</span>
            </button>
          ) : (
            <button
              onClick={onClockOut}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-750 text-white font-extrabold text-xs uppercase tracking-wider rounded-btn flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <Square size={14} className="fill-white" />
              <span>Clock Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-56">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Overview</span>
          <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white mt-0.5">Shift Metrics</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/40 pt-4 mt-auto">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Working Hrs</span>
            <p className="font-black text-slate-800 dark:text-slate-200 text-sm mt-0.5">{attendance.totalHours} hrs</p>
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Late Marks</span>
            <p className="font-black text-amber-500 text-sm mt-0.5">{attendance.lateMarks}</p>
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Leaves Taken</span>
            <p className="font-black text-slate-800 dark:text-slate-200 text-sm mt-0.5">{attendance.leavesTaken} days</p>
          </div>
        </div>

        <div className="flex items-start gap-1.5 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl text-[10px] text-slate-450 font-bold mt-4">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          <span>Clock in before 09:15 AM daily to avoid late marks penalty.</span>
        </div>
      </div>

      {/* Mini Attendance Calendar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left flex flex-col justify-between h-56">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/40">
          <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Weekly Attendance Logs</h4>
          <span className="text-[9px] font-black text-slate-450 uppercase flex items-center gap-1">
            <Calendar size={10} />
            <span>July 2026</span>
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2.5 text-center mt-3">
          {calendarDays.map((dayObj) => {
            const isPresent = dayObj.status === 'present';
            return (
              <div key={dayObj.day} className="space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400">{dayObj.day}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border ${
                  isPresent 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/60'
                    : 'bg-rose-50 border-rose-205 text-rose-600 dark:bg-rose-955/20 dark:border-rose-900/60'
                }`}>
                  {isPresent ? 'P' : 'L'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[9px] text-slate-400 font-semibold text-center mt-4">
          Accumulated Attendance Rating: <strong className="text-primary font-black">94.2% (Excellent)</strong>
        </div>
      </div>

    </div>
  );
}
