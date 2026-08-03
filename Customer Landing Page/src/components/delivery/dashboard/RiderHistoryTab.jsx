import React from 'react';
import { CheckCircle2, Truck, Calendar, MapPin, Star } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderHistoryTab() {
  const { dashboardData } = useDelivery();
  const historyList = dashboardData?.completedHistory || dashboardData?.recentDeliveries || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <CheckCircle2 size={14} /> Rider Earnings Log
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Completed Deliveries History</h2>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Delivery Type / Store</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Distance</th>
                <th className="p-4">Payout</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-700 dark:text-slate-300">
              {historyList.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950/60 transition">
                  <td className="p-4 font-black text-slate-900 dark:text-white">{order.id}</td>
                  <td className="p-4">{order.type || order.store}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-slate-400">{order.distance || '2.5 km'}</td>
                  <td className="p-4 font-black text-amber-600 dark:text-amber-400">
                    {typeof order.payout === 'number' ? `₹${order.payout}` : order.payout || `₹${order.amount}`}
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-[10px] font-black uppercase">
                      <CheckCircle2 size={12} /> Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
