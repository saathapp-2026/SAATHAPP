import React, { useState } from 'react';
import { Wallet, Truck, CheckCircle2, Star, Navigation, MapPin, Phone, ShieldCheck, ArrowRight, Clock, Award, Zap } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderOverviewTab({ onSelectTab, onOpenWithdrawModal }) {
  const { formData, dashboardData, addToast } = useDelivery();
  const [activeOrder, setActiveOrder] = useState(dashboardData.activeOrder);
  const [customerOtp, setCustomerOtp] = useState('4820');
  const [isCompleting, setIsCompleting] = useState(false);

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (customerOtp !== '4820') {
      addToast('Invalid OTP! Please ask customer for correct 4-digit OTP', 'error');
      return;
    }
    setIsCompleting(true);
    addToast('Verifying customer OTP...', 'info');

    setTimeout(() => {
      setIsCompleting(false);
      addToast(`Order ${activeOrder.id} Delivered! ₹${activeOrder.payout} added to your wallet.`, 'success');
      setActiveOrder(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 p-6 sm:p-8 text-slate-950 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-950">
            <Truck size={14} /> Active Rider Shift
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Welcome back, {formData.fullName}!
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
            Registered vehicle: <strong>{formData.vehicleType}</strong> ({formData.vehicleNumber}) • Active Zone: <strong>{formData.city}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenWithdrawModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 hover:bg-slate-900 px-6 py-3.5 text-xs font-extrabold text-white shadow-xl transition"
          >
            <Wallet size={16} className="text-amber-400" />
            Withdraw Wallet ₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}
          </button>
        </div>
      </div>

      {/* Rider KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: "Today's Earnings", value: `₹${dashboardData.kpis.todayEarnings}`, color: 'text-amber-600 dark:text-amber-400', icon: Wallet },
          { label: 'Weekly Payout', value: `₹${dashboardData.kpis.weeklyEarnings}`, color: 'text-emerald-600 dark:text-emerald-400', icon: Wallet },
          { label: 'Today Completed', value: `${dashboardData.kpis.todayCompleted} Orders`, color: 'text-blue-600 dark:text-blue-400', icon: CheckCircle2 },
          { label: 'Total Deliveries', value: dashboardData.kpis.totalDeliveries, color: 'text-purple-600 dark:text-purple-400', icon: Truck },
          { label: 'Wallet Balance', value: `₹${dashboardData.kpis.walletBalance}`, color: 'text-amber-600 dark:text-amber-400', icon: Wallet },
          { label: 'Rider Rating', value: `${dashboardData.kpis.riderRating} ★`, color: 'text-amber-500', icon: Star },
          { label: 'Acceptance Rate', value: dashboardData.kpis.acceptanceRate, color: 'text-emerald-500', icon: Zap },
          { label: 'On-Time Rate', value: dashboardData.kpis.onTimeRate, color: 'text-blue-500', icon: Clock },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-extrabold uppercase truncate">{kpi.label}</span>
                <Icon size={14} className={kpi.color} />
              </div>
              <p className={`text-base font-black ${kpi.color}`}>{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Active Live Order Box */}
      {activeOrder ? (
        <div className="rounded-3xl border border-amber-500/30 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black">
                <Truck size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  Live Assigned Delivery
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">{activeOrder.id} • {activeOrder.type}</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-bold block">Delivery Payout</span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400">₹{activeOrder.payout}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Pickup Location */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-2">
              <span className="font-extrabold uppercase text-amber-600 dark:text-amber-400 block">1. Pickup Store Address</span>
              <h4 className="font-black text-slate-900 dark:text-white text-sm">{activeOrder.storeName}</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{activeOrder.pickupAddress}</p>
            </div>

            {/* Dropoff Location */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-2">
              <span className="font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block">2. Customer Dropoff Address ({activeOrder.distanceKm})</span>
              <h4 className="font-black text-slate-900 dark:text-white text-sm">{activeOrder.customerName}</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{activeOrder.dropAddress}</p>
            </div>
          </div>

          {/* Customer OTP Verification Box */}
          <form onSubmit={handleCompleteOrder} className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Customer Delivery OTP</span>
              <p className="text-xs text-slate-300 font-medium">Ask customer for the 4-digit OTP upon arrival at dropoff address.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                maxLength={4}
                required
                value={customerOtp}
                onChange={(e) => setCustomerOtp(e.target.value)}
                className="w-28 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-center text-base font-black font-mono text-amber-400 focus:outline-none"
                placeholder="4820"
              />
              <button
                type="submit"
                disabled={isCompleting}
                className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 text-xs font-black transition shadow-lg shrink-0 disabled:opacity-50"
              >
                {isCompleting ? 'Verifying...' : `Complete Delivery & Claim ₹${activeOrder.payout}`}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 text-center space-y-2">
          <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white">All Assigned Orders Completed!</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto">
            You are online and active. Stay in high-demand zones to receive your next order dispatch instantly.
          </p>
        </div>
      )}
    </div>
  );
}
