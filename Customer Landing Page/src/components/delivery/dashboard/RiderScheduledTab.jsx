import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Truck, CheckCircle2, XCircle, Bell, ArrowRight } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderScheduledTab() {
  const { addToast } = useDelivery();
  const [scheduledSlots, setScheduledSlots] = useState([
    { id: 'SLOT-101', time: '08:00 AM – 12:00 PM', date: 'Tomorrow, 05 Aug', hub: 'Express Hub #12 (Gandhi Maidan)', area: 'Patna Central & Boring Road', payout: 450, orders: 4, status: 'OPEN' },
    { id: 'SLOT-102', time: '01:00 PM – 05:00 PM', date: 'Tomorrow, 05 Aug', hub: 'South Patna Hub #08', area: 'Kankarbagh & Rajendra Nagar', payout: 380, orders: 3, status: 'OPEN' },
    { id: 'SLOT-103', time: '06:00 PM – 10:00 PM', date: 'Tomorrow, 05 Aug', hub: 'Patliputra Hub #04', area: 'Digha & Kurji', payout: 520, orders: 5, status: 'OPEN' },
  ]);

  const handleAcceptSlot = (slotId) => {
    setScheduledSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, status: 'ACCEPTED' } : s)));
    addToast?.(`🎉 Scheduled Shift Slot ${slotId} Accepted! Added to your schedule.`, 'success');
  };

  return (
    <div className="space-y-6 sa-fade">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Calendar size={14} /> Scheduled Shift Slots
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Scheduled Deliveries &amp; Slots</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scheduledSlots.map((slot) => (
          <div key={slot.id} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-black text-amber-500">{slot.id}</span>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${slot.status === 'ACCEPTED' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  {slot.status === 'ACCEPTED' ? '✓ Reserved' : 'Available'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{slot.time}</h3>
                <span className="text-xs font-bold text-slate-500 block">{slot.date}</span>
              </div>

              <div className="space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5"><Truck size={14} className="text-amber-500" /> <span>{slot.hub}</span></div>
                <div className="flex items-center gap-1.5"><MapPin size={14} className="text-emerald-500" /> <span>{slot.area}</span></div>
                <div className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> <span>Estimated {slot.orders} Deliveries</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold">Estimated Earnings</span>
                <strong className="text-2xl font-black text-amber-500 font-mono">₹{slot.payout}</strong>
              </div>

              <div className="flex gap-2">
                {slot.status === 'ACCEPTED' ? (
                  <button type="button" onClick={() => addToast?.('Reminder set for this scheduled shift', 'info')} className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-black text-xs text-center flex items-center justify-center gap-1 cursor-pointer">
                    <Bell size={14} /> Reminder Set
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={() => addToast?.('Slot passed', 'info')} className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">
                      Decline
                    </button>
                    <button type="button" onClick={() => handleAcceptSlot(slot.id)} className="flex-1 py-2.5 rounded-xl bg-[#00986C] hover:bg-emerald-500 text-white font-black text-xs text-center shadow cursor-pointer">
                      Accept Slot
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
