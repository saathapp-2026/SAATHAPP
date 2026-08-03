import React, { useState } from 'react';
import { Truck, Navigation, Phone, MapPin, CheckCircle2, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderActiveDeliveriesTab() {
  const { dashboardData, addToast } = useDelivery();
  const [activeOrder, setActiveOrder] = useState(dashboardData.activeOrder);
  const [customerOtp, setCustomerOtp] = useState('4820');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (customerOtp !== '4820') {
      addToast('Invalid Customer OTP! Please enter correct 4-digit OTP', 'error');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      addToast(`Order ${activeOrder.id} Delivered! ₹${activeOrder.payout} credited to wallet.`, 'success');
      setActiveOrder(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Truck size={14} /> Live Dispatch & Navigation
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Active Delivery Orders</h2>
        </div>
      </div>

      {activeOrder ? (
        <div className="rounded-3xl border border-amber-500/30 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black">
                <Truck size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  Assigned & En-Route
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">{activeOrder.id}</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-bold block">Delivery Payout</span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400">₹{activeOrder.payout}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 space-y-2">
              <span className="font-extrabold uppercase text-amber-600 dark:text-amber-400 block">Pickup Location</span>
              <h4 className="font-black text-slate-900 dark:text-white text-sm">{activeOrder.storeName}</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{activeOrder.pickupAddress}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 space-y-2">
              <span className="font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block">Customer Address ({activeOrder.distanceKm})</span>
              <h4 className="font-black text-slate-900 dark:text-white text-sm">{activeOrder.customerName}</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{activeOrder.dropAddress}</p>
            </div>
          </div>

          <form onSubmit={handleVerifyOtp} className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Customer Delivery OTP</span>
              <p className="text-xs text-slate-300 mt-0.5">Enter customer OTP to verify delivery completion.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                maxLength={4}
                required
                value={customerOtp}
                onChange={(e) => setCustomerOtp(e.target.value)}
                className="w-28 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-center text-base font-black font-mono text-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 text-xs font-black transition shadow-lg shrink-0 disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : `Complete Delivery`}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
          <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
          <h3 className="text-xl font-black text-slate-900 dark:text-white">No Active Orders</h3>
          <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
            You are online and ready to receive nearby order dispatches. Keep your app open.
          </p>
        </div>
      )}
    </div>
  );
}
