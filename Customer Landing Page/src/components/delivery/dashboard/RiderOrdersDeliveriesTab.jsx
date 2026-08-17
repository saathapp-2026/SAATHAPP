import React, { useState } from 'react';
import {
  Truck, Calendar, History, Clock, CheckCircle2, XCircle, AlertCircle, MapPin, Search, Filter, ArrowRight
} from 'lucide-react';
import RiderActiveDeliveriesTab from './RiderActiveDeliveriesTab';
import RiderHistoryTab from './RiderHistoryTab';
import RiderScheduledTab from './RiderScheduledTab';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderOrdersDeliveriesTab({ initialSubTab = 'live' }) {
  const { addToast } = useDelivery();
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab); // 'live' | 'new' | 'scheduled' | 'inprogress' | 'completed' | 'cancelled' | 'history'

  // Internal Sub-tabs Configuration matching PDF Section 3.2
  const subTabs = [
    { id: 'live', label: 'Live / Active', count: '1 Active', icon: Truck, highlight: true },
    { id: 'new', label: 'New Assignments', count: '2 New', icon: Clock },
    { id: 'scheduled', label: 'Scheduled', count: '12 Slots', icon: Calendar },
    { id: 'inprogress', label: 'In Progress', count: '1 Order', icon: MapPin },
    { id: 'completed', label: 'Completed', count: '342', icon: CheckCircle2 },
    { id: 'cancelled', label: 'Cancelled', count: '4', icon: XCircle },
    { id: 'history', label: 'Delivery History', count: 'All Logs', icon: History },
  ];

  return (
    <div className="space-y-6 sa-fade">
      {/* Header & Internal Navigation Sub-Tabs */}
      <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-bold text-amber-500">
              <Truck size={14} /> Orders &amp; Route Management
            </div>
            <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Orders &amp; Deliveries
            </h1>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Manage live routes, new assignments, scheduled shifts, &amp; delivery logs
          </span>
        </div>

        {/* Sub-Tabs Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
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
                  addToast?.(`Switched view to ${tab.label}`, 'info');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 touch-manipulation select-none ${isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-page text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive
                        ? 'bg-slate-950 text-amber-400'
                        : 'bg-slate-200 text-slate-700 dark:text-slate-300'
                      }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Sub-Tab Content */}
      <div className="min-h-[500px]">
        {activeSubTab === 'live' && <RiderActiveDeliveriesTab />}

        {activeSubTab === 'new' && (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between">
              <span>⚡ 2 New Delivery Assignments nearby! Accept before timer expires.</span>
              <span className="font-mono text-rose-500 font-black">Time remaining: 45s</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-500 font-mono">DEL-98430</span>
                  <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-500 px-2.5 py-0.5 rounded-full">High Payout</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Pharmacy &amp; Medical Supplies</h3>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>📍 Pickup: Apollo Pharmacy, Boring Road</div>
                  <div>🎯 Drop: Flat 204, Ashiana Nagar, Patna</div>
                  <div>💰 Payout: ₹145 • Distance: 2.8 km</div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('live');
                      addToast?.('Accepted Order DEL-98430! Starting active pickup workflow.', 'success');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                  >
                    Accept Order
                  </button>
                  <button
                    type="button"
                    onClick={() => addToast?.('Order DEL-98430 passed', 'info')}
                    className="px-4 py-2.5 rounded-xl bg-page text-slate-500 font-bold text-xs cursor-pointer"
                  >
                    Decline
                  </button>
                </div>
              </div>

              <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-500 font-mono">DEL-98431</span>
                  <span className="text-[10px] font-black uppercase bg-blue-500/20 text-blue-500 px-2.5 py-0.5 rounded-full">Express Grocery</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Fresh Fruits &amp; Dairy Parcel</h3>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>📍 Pickup: SaathApp Express Hub #12</div>
                  <div>🎯 Drop: House 42, Kankarbagh Main Rd</div>
                  <div>💰 Payout: ₹95 • Distance: 4.1 km</div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('live');
                      addToast?.('Accepted Order DEL-98431! Starting active pickup workflow.', 'success');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                  >
                    Accept Order
                  </button>
                  <button
                    type="button"
                    onClick={() => addToast?.('Order DEL-98431 passed', 'info')}
                    className="px-4 py-2.5 rounded-xl bg-page text-slate-500 font-bold text-xs cursor-pointer"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'scheduled' && <RiderScheduledTab />}

        {activeSubTab === 'inprogress' && <RiderActiveDeliveriesTab />}

        {activeSubTab === 'completed' && <RiderHistoryTab />}

        {activeSubTab === 'cancelled' && <RiderHistoryTab />}

        {activeSubTab === 'history' && <RiderHistoryTab />}
      </div>
    </div>
  );
}
