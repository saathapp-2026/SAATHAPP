import React from 'react';
import {
  LayoutDashboard,
  Truck,
  History,
  Wallet,
  ShoppingBag,
  FileBadge2,
  Star,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export const RIDER_SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Shift Overview', icon: LayoutDashboard, badge: 'Online' },
  { id: 'activeDeliveries', label: 'Live Orders & Route', icon: Truck, badge: '1 Active' },
  { id: 'history', label: 'Completed Deliveries', icon: History, badge: '342' },
  { id: 'wallet', label: 'Earnings & Payouts', icon: Wallet, badge: '₹2,450' },
  { id: 'equipmentStore', label: 'Rider Gear & Uniforms', icon: ShoppingBag, badge: 'Store' },
  { id: 'documents', label: 'Licence & Vault', icon: FileBadge2, badge: 'Verified' },
  { id: 'ratings', label: 'Ratings & Incentives', icon: Star, badge: '4.9 ★' },
  { id: 'support', label: '24/7 Rider SOS Help', icon: HelpCircle, badge: 'SOS' },
];

export default function DeliveryRiderSidebar({ activeTab, onSelectTab, onBackToOnboarding }) {
  const { formData } = useDelivery();

  return (
    <aside className="w-64 shrink-0 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30">
      {/* Header Brand */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
          <Truck size={20} />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">Rider App</span>
            <ShieldCheck size={13} className="text-amber-400 shrink-0" />
          </div>
          <h2 className="text-sm font-extrabold text-white truncate">{formData.fullName || 'Vikram Singh'}</h2>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {RIDER_SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-slate-950 text-amber-400'
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

      {/* Footer Switch View */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          type="button"
          onClick={onBackToOnboarding}
          className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
        >
          <span>Onboarding Progress</span>
          <ChevronRight size={14} className="text-amber-400" />
        </button>
      </div>
    </aside>
  );
}
