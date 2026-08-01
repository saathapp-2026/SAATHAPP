import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Users, Wallet, Star, Bell, MapPin, Clock,
  FileCheck, User, LifeBuoy, Settings, LogOut, ShieldCheck, Zap, ArrowUpRight, TrendingUp, X
} from 'lucide-react';
import SaathAppLogo from '../../assets/saathapp-logo.jpeg';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOnline,
  setIsOnline,
  isOpen,
  setIsOpen,
  onLogout
}) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', name: 'Bookings', icon: FileCheck },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'wallet', name: 'Wallet & Earnings', icon: Wallet },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'service_area', name: 'Service Area', icon: MapPin },
    { id: 'availability', name: 'Availability', icon: Clock },
    { id: 'documents', name: 'Documents', icon: FileCheck },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'support', name: 'Support', icon: LifeBuoy },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false); // Close sidebar on mobile
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:sticky lg:h-screen lg:top-0`}>
        
        {/* Top Section: Logo & Profile */}
        <div className="flex flex-col p-6 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center justify-between mb-6">
            <div className="h-10 w-36">
              <img 
                src={SaathAppLogo} 
                alt="SaathApp Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <button 
              className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Rahul Kumar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                isOnline ? 'bg-primary' : 'bg-slate-400'
              }`} />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">Rahul Kumar</h4>
                <ShieldCheck size={14} className="text-primary flex-shrink-0" />
              </div>
              <p className="text-[11px] font-extrabold text-primary uppercase tracking-wider mt-0.5">Electrician Partner</p>
            </div>
          </div>

          {/* Online / Offline Toggle */}
          <div className="mt-4 flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="text-left">
              <span className="text-[10px] font-black uppercase text-slate-450 block leading-none">Duty Status</span>
              <span className={`text-[11px] font-extrabold ${isOnline ? 'text-primary' : 'text-slate-400'} uppercase mt-0.5 inline-block`}>
                {isOnline ? 'Online & Active' : 'Offline / Idle'}
              </span>
            </div>
            
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
                isOnline ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-800'
              }`}
            >
              <motion.div 
                layout 
                className="w-4 h-4 bg-white rounded-full shadow-md"
                animate={{ x: isOnline ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        {/* Middle Section: Menu List (Scrollable) */}
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
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500'} />
                <span>{item.name}</span>
              </button>
            );
          })}

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-left text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-955 transition-all duration-200 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        {/* Bottom Section: Boost Card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
          <div className="bg-gradient-to-tr from-brand-600 to-emerald-700 rounded-card p-4 text-white text-left relative overflow-hidden shadow-md">
            {/* backdrop decorations */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center gap-1.5 bg-slate-900/30 px-2 py-0.5 rounded-full w-max border border-white/10 text-[9px] font-black uppercase text-secondary">
                <TrendingUp size={10} />
                <span>Saathi Gold</span>
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-wider leading-none">Boost Profile</h5>
                <p className="text-[9px] text-white/80 font-medium leading-tight mt-1">Upgrade to get 2x local bookings and priority search listing.</p>
              </div>
              <button 
                onClick={() => alert('Saathi Partner boosting feature is simulated.')}
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
