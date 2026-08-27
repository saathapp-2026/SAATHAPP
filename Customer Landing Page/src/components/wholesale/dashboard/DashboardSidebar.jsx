import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  PackageCheck,
  FolderTree,
  Warehouse,
  Users,
  MessageSquare,
  Sparkles,
  Gift,
  BarChart3,
  Wallet,
  Receipt,
  FileText,
  FileBadge2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
  User
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import saathAppLogo from '../../../assets/saathapp-logo.png';

export const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'orders', label: 'Orders & Bulk Orders', icon: ShoppingBag, badge: null },
  { id: 'products', label: 'Products & Catalogue', icon: PackageCheck, badge: null },
  { id: 'buyers', label: 'Buyers & Enquiries', icon: Users, badge: null },
  { id: 'marketing', label: 'Marketing & Offers', icon: Sparkles, badge: null },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, badge: null },
  { id: 'finance', label: 'Wallet & Payouts', icon: Wallet, badge: null },
  { id: 'profile', label: 'Profile & Business Settings', icon: User, badge: null },
  { id: 'support', label: 'Support', icon: HelpCircle, badge: null },
];

export default function DashboardSidebar({ activeTab, onSelectTab, onBackToOnboarding, onLogout }) {
  const { formData, addToast } = useWholesale();

  return (
    <aside className="w-64 shrink-0 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30 font-sans">
      {/* Header Profile Brand with Official SaathApp Logo */}
      <div
        onClick={() => onSelectTab('profile')}
        className="p-4 border-b border-slate-800 flex items-center gap-3 cursor-pointer hover:bg-slate-900/60 transition group"
        title="View Wholesale Enterprise Profile"
      >
        <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center p-1 shadow-lg overflow-hidden shrink-0 border border-emerald-500/30 group-hover:scale-105 transition">
          <img src={saathAppLogo} alt="SaathApp Always With You" className="w-full h-full object-contain" />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">SaathApp</span>
            <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
          </div>
          <h2 className="text-sm font-extrabold text-white truncate group-hover:text-emerald-400 transition">{formData.businessName || 'Wholesale Partner'}</h2>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-slate-950 text-emerald-400'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Switch View & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          type="button"
          onClick={onBackToOnboarding}
          className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
        >
          <span>Onboarding Progress</span>
          <ChevronRight size={14} className="text-emerald-400" />
        </button>

        <button
          type="button"
          onClick={() => {
            if (onLogout) {
              onLogout();
            } else {
              addToast?.('Logging out of Wholesale Enterprise Portal...', 'info');
              window.location.reload();
            }
          }}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 p-2.5 text-xs font-extrabold text-rose-300 transition cursor-pointer active:scale-95 shadow-sm"
        >
          <LogOut size={15} />
          <span>Logout / Exit Portal</span>
        </button>
      </div>
    </aside>
  );
}
