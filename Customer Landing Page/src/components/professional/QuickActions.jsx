import React from 'react';
import { motion } from 'framer-motion';
import {
  Wifi, WifiOff, FileText, PlusCircle, Wrench, Calendar, Wallet, Crown, FileCheck
} from 'lucide-react';

export default function QuickActions({
  isOnline,
  setIsOnline,
  setActiveTab,
  setBookingFilter
}) {
  const actions = [
    {
      label: isOnline ? 'Go Offline' : 'Go Online',
      icon: isOnline ? WifiOff : Wifi,
      color: isOnline ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 border-rose-200/50' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200/50',
      action: () => setIsOnline(!isOnline)
    },
    {
      label: 'View Bookings',
      icon: FileCheck,
      color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200/50',
      action: () => setActiveTab('bookings')
    },
    {
      label: 'Edit Profile',
      icon: PlusCircle,
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200/50',
      action: () => setActiveTab('profile')
    },
    {
      label: 'Manage Documents',
      icon: FileText,
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100 border-teal-200/50',
      action: () => setActiveTab('documents')
    },
    {
      label: 'Manage Equipment',
      icon: Wrench,
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200/50',
      action: () => setActiveTab('business')
    },
    {
      label: 'View Calendar',
      icon: Calendar,
      color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200/50',
      action: () => {
        setActiveTab('bookings');
        if (setBookingFilter) setBookingFilter('calendar');
      }
    },
    {
      label: 'View Earnings',
      icon: Wallet,
      color: 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200/50',
      action: () => setActiveTab('wallet')
    },
    {
      label: 'Upgrade Membership',
      icon: Crown,
      color: 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200/50',
      action: () => setActiveTab('membership')
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left">
      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Quick Operations</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <motion.button
              key={idx}
              onClick={act.action}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-200 ${act.color} dark:bg-slate-950/40 dark:border-slate-850 dark:text-slate-200 dark:hover:bg-slate-900/60`}
            >
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                <Icon size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider leading-none text-center">
                {act.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
