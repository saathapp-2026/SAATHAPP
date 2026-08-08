import React from 'react';
import {
  LayoutDashboard,
  Truck,
  History,
  Wallet,
  FileBadge2,
  Star,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Award,
  BookOpen,
  UserCheck,
  Settings,
  AlertTriangle,
  User,
  LogOut
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export const RIDER_SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: 'Online' },
  { id: 'orders', label: 'Orders & Deliveries', icon: Truck, badge: '1 Active' },
  { id: 'earnings', label: 'Earnings & Wallet', icon: Wallet, badge: '₹2,450' },
  { id: 'incentives', label: 'Incentives & Bonuses', icon: Award, badge: 'New' },
  { id: 'ratings', label: 'Ratings & Performance', icon: Star, badge: '4.9 ★' },
  { id: 'vehicle', label: 'Vehicle & Documents', icon: FileBadge2, badge: 'Verified' },
  { id: 'attendance', label: 'Attendance & Shifts', icon: UserCheck, badge: '04h 25m' },
  { id: 'profile', label: 'Profile & Settings', icon: User, badge: 'Active' },
  { id: 'support', label: 'Support', icon: HelpCircle, badge: null },
];

export default function DeliveryRiderSidebar({ activeTab, onSelectTab, onBackToOnboarding, onTriggerSos, onLogout }) {
  const { formData, addToast } = useDelivery();

  return (
    <aside className="w-64 shrink-0 bg-slate-950 text-slate-300 border-r border-slate-800/80 flex flex-col h-screen sticky top-0 z-30 font-sans">
      {/* Header Brand */}
      <div
        onClick={() => onSelectTab('profile')}
        className="p-4 border-b border-slate-800/80 flex items-center gap-3 cursor-pointer hover:bg-slate-900/60 transition group"
        title="View Rider Profile"
      >
        <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shrink-0 group-hover:scale-105 transition">
          <Truck size={22} />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">RIDER APP</span>
            <ShieldCheck size={14} className="text-amber-400 shrink-0" />
          </div>
          <h2 className="text-sm font-black text-white truncate mt-0.5 group-hover:text-amber-400 transition">{formData.fullName || 'Vikram Singh'}</h2>
        </div>
      </div>

      {/* Sidebar Navigation Items List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {RIDER_SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between rounded-2xl px-3.5 py-3 text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon size={18} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                <span className="truncate leading-tight font-extrabold">{item.label}</span>
              </div>

              {item.badge && (
                <div
                  className={`shrink-0 text-center transition ${
                    isActive
                      ? 'bg-slate-950 text-amber-400 font-mono text-[10px] font-black px-2.5 py-1 rounded-xl shadow'
                      : 'bg-slate-800/90 text-slate-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full'
                  }`}
                >
                  {item.badge}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Emergency SOS & Onboarding Progress & Logout Cards */}
      <div className="p-3.5 border-t border-slate-800/80 space-y-2 bg-slate-950">
        {/* Emergency SOS Interactive Card */}
        <button
          type="button"
          onClick={() => onTriggerSos?.()}
          className="w-full text-left p-3 rounded-2xl bg-[#1c080d] hover:bg-rose-950/80 border border-rose-800/60 text-rose-200 text-xs space-y-1 transition-all duration-150 cursor-pointer active:scale-95 shadow-md group"
        >
          <div className="flex items-center gap-2 font-black text-rose-400 uppercase text-[11px] tracking-wider">
            <AlertTriangle size={15} className="animate-pulse text-rose-500 shrink-0" />
            <span>EMERGENCY SOS</span>
          </div>
          <p className="text-[10px] text-rose-300/80 font-medium leading-snug">
            Tap for immediate police or medical assistance during shift.
          </p>
        </button>

        {/* Onboarding Progress Button */}
        <button
          type="button"
          onClick={onBackToOnboarding}
          className="w-full flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-all duration-150 cursor-pointer active:scale-95"
        >
          <span className="font-extrabold">Onboarding Progress</span>
          <ChevronRight size={16} className="text-amber-400 shrink-0" />
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={() => {
            if (onLogout) {
              onLogout();
            } else {
              addToast?.('Logging out of Rider Session...', 'info');
              window.location.reload();
            }
          }}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 p-2.5 text-xs font-black text-rose-300 transition-all duration-150 cursor-pointer active:scale-95 shadow-sm"
        >
          <LogOut size={15} />
          <span>Logout / Exit App</span>
        </button>
      </div>
    </aside>
  );
}
