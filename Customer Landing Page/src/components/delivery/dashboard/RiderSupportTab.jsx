import React from 'react';
import { Phone, AlertTriangle, ShieldCheck, HelpCircle, MessageSquare, LifeBuoy, FileText } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderSupportTab() {
  const { addToast } = useDelivery();

  const handleSosTrigger = () => {
    addToast('Emergency SOS alert sent! SAATHAPP Rider Safety Desk notified.', 'error');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-500">
            <AlertTriangle size={14} /> 24/7 Rider Safety Desk
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Rider SOS & Help Center</h2>
        </div>
      </div>

      {/* Emergency SOS Banner */}
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-red-400 bg-red-500/20 px-3 py-1 rounded-full">
            Emergency Hotline
          </span>
          <h3 className="text-2xl font-black text-white">Need On-Road Emergency Assistance?</h3>
          <p className="text-xs text-slate-300 font-medium max-w-lg">
            Press the SOS button in case of accident, vehicle breakdown, or safety concerns on shift.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSosTrigger}
          className="rounded-2xl bg-red-600 hover:bg-red-500 text-white px-8 py-4 text-xs font-black shadow-2xl transition hover:scale-105 shrink-0 flex items-center justify-center gap-2"
        >
          <AlertTriangle size={18} />
          Trigger Immediate SOS Alert
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Phone size={20} />
          </div>
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Rider Toll-Free Helpline</h4>
          <p className="text-xs text-slate-500 font-medium">1800-SAATH-RIDER (1800-72284-74337)</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <MessageSquare size={20} />
          </div>
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">WhatsApp Rider Support</h4>
          <p className="text-xs text-slate-500 font-medium">+91 9128842027 (Live Chat)</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <LifeBuoy size={20} />
          </div>
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Insurance Claim Assistance</h4>
          <p className="text-xs text-slate-500 font-medium">Accidental coverage claim assistance</p>
        </div>
      </div>
    </div>
  );
}
