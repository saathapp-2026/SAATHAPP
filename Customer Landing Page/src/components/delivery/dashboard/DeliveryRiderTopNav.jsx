import React, { useState } from 'react';
import {
  Power, Wallet, Bell, Sun, Moon, ShieldCheck, Truck, MapPin, Signal, Battery, CloudSun,
  HelpCircle, RefreshCw, AlertTriangle, CheckCircle2, AlertCircle, ArrowUpRight, Landmark,
  Sparkles, X, Package, Star, Wrench, FileText, Award
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function DeliveryRiderTopNav({
  activeTab,
  darkMode,
  toggleDarkMode,
  onOpenWithdrawModal,
  onToggleMobileSidebar,
  onTriggerSos,
  onOpenSupportPage,
  onOpenProfilePage,
  onLogout,
}) {
  const { formData, dashboardData, addToast } = useDelivery();
  const [isOnline, setIsOnline] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [notificationsList, setNotificationsList] = useState([]);

  const toggleOnlineShift = () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    if (nextStatus) {
      addToast?.('You are ONLINE (ON SHIFT)! Receiving nearby delivery orders.', 'success');
    } else {
      addToast?.('You are OFFLINE. Shift paused.', 'info');
    }
  };

  const handleSupportClick = () => {
    if (onOpenSupportPage) {
      onOpenSupportPage();
    }
    addToast?.('Opening SaathApp 24/7 Help Center & Support Page...', 'info');
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sa-fade">
      {/* Left: Shift Toggle & Live Telemetry Indicators */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer active:scale-95 transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Truck size={20} />
        </button>

        {/* Online / Offline Shift Switch */}
        <button
          type="button"
          onClick={toggleOnlineShift}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-black transition-all duration-150 shadow-sm cursor-pointer active:scale-95 ${isOnline
            ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 ring-2 ring-emerald-500/20'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
        >
          <Power size={14} className={isOnline ? 'animate-pulse' : ''} />
          <span>{isOnline ? 'ONLINE (ON SHIFT)' : 'OFFLINE (ON BREAK)'}</span>
          <span className="text-[10px] opacity-80 font-normal hidden sm:inline">• Since --:-- (0h 0m)</span>
        </button>

        {/* Telemetry Pills (Page 1 of PDF) */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-amber-500" />
            <span>—</span>
          </div>
          <div className="flex items-center gap-1">
            <CloudSun size={14} className="text-amber-400" />
            <span>—</span>
          </div>
          <div className="flex items-center gap-1">
            <Signal size={14} className="text-emerald-500" />
            <span>GPS Active</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-extrabold bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">4G</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery size={14} className="text-emerald-500" />
            <span>86%</span>
          </div>
        </div>
      </div>

      {/* Right: Refresh Location, SOS, Wallet, Notifications, Support, Dark Mode, Rider Profile */}
      <div className="flex items-center gap-2.5">
        {/* Refresh Location Pill */}
        <button
          type="button"
          onClick={() => addToast?.('📍 GPS Location & route refreshed', 'info')}
          className="hidden sm:flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          title="Refresh Location"
        >
          <RefreshCw size={13} className="text-amber-500" /> <span className="hidden md:inline">Refresh Location</span>
        </button>

        {/* SOS Emergency Button */}
        <button
          type="button"
          onClick={onTriggerSos}
          className="flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 px-2.5 sm:px-3 py-1.5 text-xs font-black text-white shadow-md cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          title="Emergency SOS"
        >
          <AlertTriangle size={14} className="animate-pulse" />
          <span>SOS</span>
        </button>

        {/* Support Button -> Navigates to Support Page */}
        <button
          type="button"
          onClick={handleSupportClick}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-extrabold text-xs shadow-sm active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          title="SaathApp Support & Help Center"
        >
          <HelpCircle size={15} className="text-amber-500" />
          <span className="hidden xs:inline">Support</span>
        </button>

        {/* Notifications Icon & Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            title="Rider Notifications"
          >
            <Bell size={16} />
            {notificationsList.some(n => n.unread) && (
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-ping" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 p-4 space-y-3 sa-rise">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-amber-500" />
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Notifications</h3>
                  <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {notificationsList.filter(n => n.unread).length} New
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
                      addToast?.('All notifications marked as read', 'success');
                    }}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition"
                  >
                    Mark all read
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer active:scale-95 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Notification Items List */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {notificationsList.map((n) => {
                  const IconComp = n.icon;
                  return (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotificationsList(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item));
                      }}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 active:scale-[0.98] ${n.unread
                        ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}`}>
                        <IconComp size={16} />
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                            {n.title}
                            {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-snug">
                          {n.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Wallet Quick Button */}
        <button
          type="button"
          onClick={onOpenWithdrawModal}
          className="flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 px-2.5 sm:px-3.5 py-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
          <Wallet size={15} />
          <span>Wallet ₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95 transition-all duration-150 touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
          {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
        </button>

        {/* Rider Profile Badge & Dropdown */}
        <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 cursor-pointer active:scale-95 transition hover:opacity-90 rounded-2xl p-1"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-black text-xs ring-2 ring-amber-500/40 overflow-hidden shrink-0">
              <span>{(formData.fullName || 'Rider').charAt(0).toUpperCase()}</span>
            </div>
            <div className="hidden md:block text-left text-xs leading-tight">
              <strong className="block text-slate-900 dark:text-white font-extrabold">{formData.fullName || 'Rider'}</strong>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">Rider Partner ▼</span>
            </div>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 p-3 space-y-2 sa-rise">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm">
                  👤
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-black text-slate-900 dark:text-white text-xs truncate">{formData.fullName || 'Rider'}</h4>
                  <span className="text-[10px] text-emerald-500 font-bold">Gold Fleet Captain 🏆</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  if (onOpenProfilePage) onOpenProfilePage();
                }}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer active:scale-95"
              >
                <span>👤</span> View Full Rider Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    addToast?.('Logging out of Rider App...', 'info');
                    window.location.reload();
                  }
                }}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-black text-xs transition cursor-pointer active:scale-95"
              >
                <span>🚪</span> Sign Out / Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
