import React, { useState } from 'react';
import { Power, Wallet, Bell, Sun, Moon, ShieldCheck, Truck } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function DeliveryRiderTopNav({
  darkMode,
  toggleDarkMode,
  onOpenWithdrawModal,
  onToggleMobileSidebar,
}) {
  const { formData, dashboardData, addToast } = useDelivery();
  const [isOnline, setIsOnline] = useState(true);

  const toggleOnlineShift = () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    if (nextStatus) {
      addToast('You are ONLINE! Receiving nearby delivery orders.', 'success');
    } else {
      addToast('You are OFFLINE. Shift paused.', 'info');
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Shift Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
        >
          <Truck size={20} />
        </button>

        {/* Online / Offline Shift Switch */}
        <button
          type="button"
          onClick={toggleOnlineShift}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-black transition shadow-sm ${
            isOnline
              ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 ring-2 ring-emerald-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Power size={14} className={isOnline ? 'animate-pulse' : ''} />
          <span>{isOnline ? 'ONLINE (ON SHIFT)' : 'OFFLINE (ON BREAK)'}</span>
        </button>
      </div>

      {/* Right: Wallet Balance, Dark Mode, Profile */}
      <div className="flex items-center gap-3">
        {/* Wallet Quick Button */}
        <button
          type="button"
          onClick={onOpenWithdrawModal}
          className="flex items-center gap-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition"
        >
          <Wallet size={15} />
          <span>Wallet ₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        {/* Rider Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img
            src={formData.profilePhotoUrl}
            alt={formData.fullName}
            className="h-9 w-9 rounded-full object-cover border-2 border-amber-500"
          />
          <div className="hidden sm:block text-left">
            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">{formData.fullName}</h4>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <ShieldCheck size={11} /> Verified Rider
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
