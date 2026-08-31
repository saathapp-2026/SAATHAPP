import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Users, Wallet, Star, Bell, MapPin, Clock,
  FileCheck, User, LifeBuoy, Settings, LogOut, ShieldCheck, ArrowUpRight, TrendingUp, X,
  Crown, Package, Wrench, Briefcase, ScrollText, IndianRupee, ClipboardList
} from 'lucide-react';
import SaathAppLogo from '../../assets/saathapp-logo.png';
import ThemeLogo from '../ThemeLogo';
import SaathAppLogoDark from '../../assets/saathapp-logo-dark.png';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOnline,
  setIsOnline,
  isOpen,
  setIsOpen,
  onLogout,
  partnerName,
  partnerCategory,
  partnerPhoto,
}) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', name: 'Bookings', icon: FileCheck },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'wallet', name: 'Earnings', icon: Wallet },
    { id: 'membership', name: 'Membership', icon: Crown },
    { id: 'documents', name: 'Verification & Documents', icon: ShieldCheck },
    { id: 'business', name: 'Equipment', icon: Briefcase },
    { id: 'profile', name: 'Profile & Settings', icon: User },
    { id: 'support', name: 'Support', icon: LifeBuoy },
  ];

  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="hover:-translate-y-0.5 hover:shadow-md cursor-pointer active:scale-[0.99] fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded fixed top-0 bottom-0 left-0 z-50 w-72 bg-surface border-r border-slate-200/60 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:sticky lg:h-screen lg:top-0`}>

        <div className="flex flex-col p-6 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center justify-between mb-6">
            <div className="h-10 w-36">
              <ThemeLogo />
            </div>
            <button
              className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-page flex items-center justify-center text-[9px] font-bold text-slate-400">
                {partnerPhoto ? (
                  <span className="px-1 text-center leading-tight">{String(partnerPhoto).slice(0, 12)}</span>
                ) : (
                  (partnerName || 'P').charAt(0).toUpperCase()
                )}
              </div>
              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                isOnline ? 'bg-primary' : 'bg-slate-400'
              }`} />
            </div>

            <div className="text-left min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight truncate">{partnerName || 'Professional'}</h4>
                <ShieldCheck size={14} className="text-primary flex-shrink-0" />
              </div>
              <p className="text-[11px] font-extrabold text-primary uppercase tracking-wider mt-0.5 truncate">{partnerCategory || 'Service Partner'}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between bg-page dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="text-left">
              <span className="text-[10px] font-black uppercase text-slate-450 block leading-none">Duty Status</span>
              <span className={`text-[11px] font-extrabold ${isOnline ? 'text-primary' : 'text-slate-400'} uppercase mt-0.5 inline-block`}>
                {isOnline ? 'Online & Active' : 'Offline / Idle'}
              </span>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
                isOnline ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <motion.div
                layout
                className="w-4 h-4 bg-surface rounded-full shadow-md"
                animate={{ x: isOnline ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1 scrollbar-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-page hover:text-slate-800'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.name}</span>
              </button>
            );
          })}

          <button
            onClick={onLogout}
            className="active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-left text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-955 transition-all duration-200 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
          <div className="bg-gradient-to-tr from-brand-600 to-emerald-700 rounded-card p-4 text-white text-left relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-surface/10 rounded-full blur-xl pointer-events-none" />
            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center gap-1.5 bg-slate-900/30 px-2 py-0.5 rounded-full w-max border border-white/10 text-[9px] font-black uppercase text-secondary">
                <TrendingUp size={10} />
                <span>Membership</span>
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-wider leading-none">Upgrade Plan</h5>
                <p className="text-[9px] text-white/80 font-medium leading-tight mt-1">Growth or Enterprise unlocks the Complimentary Welcome Kit.</p>
              </div>
              <button
                onClick={() => handleMenuClick('membership')}
                className="w-full py-1.5 rounded-btn bg-secondary hover:bg-secondary-dark text-slate-900 font-extrabold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm cursor-pointer transition-colors"
              >
                <span>Upgrade Now</span>
                <ArrowUpRight size={10} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
