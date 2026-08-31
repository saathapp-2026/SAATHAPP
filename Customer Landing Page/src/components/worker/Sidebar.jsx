import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Wallet, Star, Bell, Clock,
  FileCheck, User, LifeBuoy, Settings, LogOut, ShieldCheck, X,
  ClipboardCheck, DollarSign, Activity
} from 'lucide-react';
import SaathAppLogo from '../../assets/saathapp-logo.png';
import ThemeLogo from '../ThemeLogo';
import SaathAppLogoDark from '../../assets/saathapp-logo-dark.png';

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'today_jobs', name: "Today's Jobs", icon: Clock },
  { id: 'assigned_jobs', name: 'Assigned Jobs', icon: ClipboardCheck },
  { id: 'completed_jobs', name: 'Completed Jobs', icon: FileCheck },
  { id: 'earnings', name: 'My Earnings', icon: DollarSign },
  { id: 'attendance', name: 'Attendance', icon: Calendar },
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'performance', name: 'Performance', icon: Activity },
  { id: 'reviews', name: 'Reviews', icon: Star },
  { id: 'wallet', name: 'Wallet', icon: Wallet },
  { id: 'documents', name: 'Documents', icon: FileCheck },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'support', name: 'Support', icon: LifeBuoy },
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOnline,
  setIsOnline,
  isOpen,
  setIsOpen,
  onLogout,
  unreadCount = 0,
}) {
  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer active:scale-[0.99] fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 border-r border-white/20 dark:border-slate-800/80 bg-surface/75 backdrop-blur-2xl shadow-[4px_0_24px_rgba(15,23,42,0.06)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:sticky lg:h-screen lg:top-0`}
      >
        <div className="flex flex-col p-5 border-b border-slate-200/50 dark:border-slate-800/60">
          <div className="flex items-center justify-between mb-5">
            <div className="h-9 w-32">
              <> <img src={SaathAppLogo} alt="SaathApp" className="h-full w-full object-contain dark:hidden" /> <img src={SaathAppLogoDark} alt="SaathApp" className="h-full w-full object-contain hidden dark:block" /> </>
            </div>
            <button
              type="button"
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-page"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-white/90 to-slate-50/80 dark:from-slate-800/60 dark:to-slate-900/60 p-3.5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-primary/20 shadow-md">
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white font-black text-xl">
                    SW
                  </div>
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                    isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-black text-slate-800 dark:text-white truncate">Service Worker</h4>
                </div>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">ID: —</p>
                <p className="text-[10px] font-black text-accent uppercase tracking-wide">Pending</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-100/80 dark:bg-slate-950/50 px-3 py-2">
              <div>
                <span className="text-[9px] font-black uppercase text-slate-400">Status</span>
                <p className={`text-[11px] font-extrabold ${isOnline ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <motion.span
                  layout
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-surface rounded-full shadow"
                  animate={{ x: isOnline ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 scrollbar-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const showBadge = item.id === 'notifications' && unreadCount > 0;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-brand-600 text-white shadow-md shadow-primary/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-surface/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span className="flex-1">{item.name}</span>
                {showBadge && (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-white text-[9px] font-black flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-200/50 dark:border-slate-800/60">
          <button
            type="button"
            onClick={onLogout}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
