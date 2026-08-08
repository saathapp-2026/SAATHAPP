import React, { useState } from 'react';
import {
  Award, Zap, Fuel, Calendar, Clock, CheckCircle2, TrendingUp, ChevronRight, Gift, Target, Sparkles, DollarSign, RefreshCw, History
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderIncentivesTab() {
  const { addToast } = useDelivery();
  const [activeSubTab, setActiveSubTab] = useState('active'); // 'active' | 'daily' | 'weekly' | 'peakhour' | 'targets' | 'fuel' | 'history'

  const subTabs = [
    { id: 'active', label: 'Active Incentives', icon: Award, count: '3 Active' },
    { id: 'daily', label: 'Daily Incentives', icon: Zap },
    { id: 'weekly', label: 'Weekly Incentives', icon: Calendar },
    { id: 'peakhour', label: 'Peak Hour Bonuses', icon: Clock },
    { id: 'targets', label: 'Delivery Targets', icon: Target },
    { id: 'fuel', label: 'Fuel Allowance', icon: Fuel },
    { id: 'history', label: 'Bonus History', icon: History },
  ];

  // Active Incentive Targets Data
  const incentivesData = [
    {
      id: 'INC-DAILY-01',
      title: 'Daily Shift Milestone Bonus',
      type: 'Daily',
      condition: 'Complete 20 deliveries today',
      reward: '₹500 Bonus',
      completed: 14,
      target: 20,
      badge: 'Ending Today 11:59 PM',
      color: 'from-amber-500 to-amber-600',
    },
    {
      id: 'INC-WEEKLY-01',
      title: 'Weekly Fleet Captain Star Reward',
      type: 'Weekly',
      condition: 'Maintain >98% On-Time Delivery Rate & 100 Deliveries',
      reward: '₹2,500 Bonus',
      completed: 78,
      target: 100,
      badge: '3 Days Left',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'INC-PEAK-01',
      title: 'Rain & Peak Hour Extra Surge Payout',
      type: 'Peak Hour',
      condition: 'Accept 5 peak hour orders between 7:00 PM – 10:00 PM',
      reward: '₹50 / Order Extra',
      completed: 3,
      target: 5,
      badge: 'Active Tonight',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'INC-FUEL-01',
      title: 'Daily Two-Wheeler Fuel Subsidy',
      type: 'Fuel Allowance',
      condition: 'Travel >25 KM on delivery route today',
      reward: '₹50 Fuel Credit',
      completed: 28,
      target: 25,
      badge: 'Achieved ✓',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="space-y-6 sa-fade">
      {/* Header & Sub-Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-bold text-amber-500">
              <Award size={14} /> Rider Rewards &amp; Milestone Engine
            </div>
            <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Incentives &amp; Bonuses
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Bonus Earned This Month</span>
            <span className="text-xl font-black text-amber-500 font-mono">₹4,850.00</span>
          </div>
        </div>

        {/* Sub-Tabs Nav */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 touch-pan-x">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => {
                  setActiveSubTab(tab.id);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                  addToast?.(`Viewing ${tab.label}`, 'info');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 touch-manipulation select-none ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incentivesData
          .filter((item) => {
            if (activeSubTab === 'active') return true;
            if (activeSubTab === 'daily') return item.type === 'Daily';
            if (activeSubTab === 'weekly') return item.type === 'Weekly';
            if (activeSubTab === 'peakhour') return item.type === 'Peak Hour';
            if (activeSubTab === 'targets') return item.type === 'Daily' || item.type === 'Weekly';
            if (activeSubTab === 'fuel') return item.type === 'Fuel Allowance';
            if (activeSubTab === 'history') return item.completed >= item.target;
            return true;
          })
          .map((item) => {
          const pct = Math.min(100, Math.round((item.completed / item.target) * 100));
          const isDone = item.completed >= item.target;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-black uppercase text-amber-500 font-mono bg-amber-500/10 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{item.condition}</p>
                </div>

                {/* Reward Banner Logic Display (e.g. "Complete 20 deliveries → ₹500 Bonus") */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-3.5 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Gift size={16} className="text-amber-400 shrink-0" />
                    <span>Target Reward</span>
                  </div>
                  <strong className="text-lg font-black text-amber-400 font-mono">{item.reward}</strong>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Progress ({item.completed} / {item.target})</span>
                    <span className={isDone ? 'text-emerald-500 font-mono font-black' : 'text-amber-500 font-mono font-black'}>{pct}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-emerald-500' : 'bg-gradient-to-r ' + item.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[11px] font-semibold text-slate-500">
                  {isDone ? '✓ Milestone Unlocked & Credited to Wallet' : `${item.target - item.completed} deliveries remaining to claim bonus`}
                </span>
                <button
                  type="button"
                  onClick={() => addToast?.(`Claiming details for ${item.title}`, 'info')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-amber-400 font-black text-xs hover:bg-slate-800 transition cursor-pointer active:scale-95"
                >
                  {isDone ? 'View Credit' : 'Track Status'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
