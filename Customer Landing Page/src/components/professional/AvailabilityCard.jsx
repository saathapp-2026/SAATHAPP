import React, { useState } from 'react';
import { Clock, Calendar, Check, Coffee, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AvailabilityCard() {
  const [workingDays, setWorkingDays] = useState({
    Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false
  });

  const [hours, setHours] = useState({
    start: '09:00 AM',
    end: '06:00 PM',
    breakStart: '01:00 PM',
    breakEnd: '02:00 PM'
  });

  const [modes, setModes] = useState({
    holidayMode: false,
    vacationMode: false
  });

  const toggleDay = (day) => {
    setWorkingDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleModeToggle = (modeName) => {
    setModes(prev => {
      const nextModes = { ...prev, [modeName]: !prev[modeName] };
      
      // If toggled on, show notification simulation
      if (nextModes[modeName]) {
        toast.success(`${modeName.replace('Mode', '') } mode is now active. You will not receive new booking requests while active.`)} else {
        toast.success(`${modeName.replace('Mode', '') } mode deactivated. Standard dispatching resumed.`)}

      return nextModes;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Availability parameters saved successfully.') };

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-surface border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-card shadow-soft hover:shadow-premium transition-all text-left space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100  pb-4">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Availability Scheduler</h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Define your daily shifts, break schedules, and vacation toggles</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Working Days */}
        <div className="space-y-3">
          <label className="field-label flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-400" />
            <span>Select Working Days</span>
          </label>

          <div className="flex flex-wrap gap-2.5">
            {weekdays.map((day) => {
              const active = workingDays[day];
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
                    active 
                      ? 'bg-primary border-primary text-white shadow-sm' 
                      : 'bg-page border-slate-200 text-slate-400  dark:border-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {active && <Check size={10} />}
                    <span>{day}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 ">
          
          <div className="space-y-3">
            <label className="field-label flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              <span>Shift Timing Range</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black">Start Hours</span>
                <select 
                  value={hours.start}
                  onChange={(e) => setHours(prev => ({ ...prev, start: e.target.value }))}
                  className="input-field mt-1 dark:border-slate-800 dark:text-white"
                >
                  <option>08:00 AM</option>
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                </select>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black">End Hours</span>
                <select 
                  value={hours.end}
                  onChange={(e) => setHours(prev => ({ ...prev, end: e.target.value }))}
                  className="input-field mt-1 dark:border-slate-800 dark:text-white"
                >
                  <option>05:00 PM</option>
                  <option>06:00 PM</option>
                  <option>07:00 PM</option>
                  <option>08:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="field-label flex items-center gap-1.5">
              <Coffee size={14} className="text-slate-400" />
              <span>Shift Lunch Break</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black">Break Start</span>
                <select 
                  value={hours.breakStart}
                  onChange={(e) => setHours(prev => ({ ...prev, breakStart: e.target.value }))}
                  className="input-field mt-1 dark:border-slate-800 dark:text-white"
                >
                  <option>12:00 PM</option>
                  <option>01:00 PM</option>
                  <option>02:00 PM</option>
                </select>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black">Break End</span>
                <select 
                  value={hours.breakEnd}
                  onChange={(e) => setHours(prev => ({ ...prev, breakEnd: e.target.value }))}
                  className="input-field mt-1 dark:border-slate-800 dark:text-white"
                >
                  <option>01:00 PM</option>
                  <option>02:00 PM</option>
                  <option>03:00 PM</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Special Modes (Holiday / Vacation) */}
        <div className="pt-4 border-t border-slate-100  grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          {/* Holiday Mode */}
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black text-slate-800 dark:text-slate-205 uppercase tracking-wider block">Holiday Mode</span>
              <p className="text-[10px] text-slate-450 leading-tight max-w-[200px]">Temporarily blocks booking dispatchers for today only.</p>
            </div>
            
            <button
              type="button"
              onClick={() => handleModeToggle('holidayMode')}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
                modes.holidayMode ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 bg-surface rounded-full shadow-md transform transition-transform duration-300 ${
                modes.holidayMode ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Vacation Mode */}
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black text-slate-800 dark:text-slate-205 uppercase tracking-wider block">Vacation Mode</span>
              <p className="text-[10px] text-slate-450 leading-tight max-w-[200px]">Blocks bookings indefinitely while you are out of town.</p>
            </div>
            
            <button
              type="button"
              onClick={() => handleModeToggle('vacationMode')}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
                modes.vacationMode ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 bg-surface rounded-full shadow-md transform transition-transform duration-300 ${
                modes.vacationMode ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>

        </div>

        {/* Warning panel if modes are active */}
        {(modes.holidayMode || modes.vacationMode) && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 border border-rose-200/50">
            <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
            <p className="text-[10px] sm:text-xs font-semibold leading-normal">
              Warning: You are currently set to unavailable. New hyperlocal service requests will not be dispatched to your account.
            </p>
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end pt-4 border-t border-slate-100 ">
          <button
            type="submit"
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-primary w-full sm:w-auto px-6 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check size={14} />
            <span>Save Availability</span>
          </button>
        </div>

      </form>
    </div>
  );
}
