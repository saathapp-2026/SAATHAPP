import React from 'react';
import { Star, Award, Zap, ShieldCheck, Heart, ThumbsUp } from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderRatingsTab() {
  const { dashboardData } = useDelivery();

  const reviews = [
    { name: 'Anil Kumar', rating: 5, comment: 'Super fast grocery delivery! Came right on time.', time: '2 hours ago' },
    { name: 'Priya Sharma', rating: 5, comment: 'Very polite rider, medicine packages delivered safely.', time: 'Yesterday' },
    { name: 'Rohan Verma', rating: 5, comment: 'Handled fragile bakery cake with extreme care. 5 Stars!', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Star size={14} /> Rider Performance & Badges
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Ratings & Incentive Bonuses</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rating Score Card */}
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 text-center space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full">
            Overall Rider Score
          </span>
          <h3 className="text-5xl font-black text-amber-500">{dashboardData.kpis.riderRating} ★</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">Based on 350+ customer reviews</p>
        </div>

        {/* Incentive Badges */}
        <div className="md:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Active Incentive Bonuses & Badges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Award size={24} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white">Super Star Rider (+₹500 Bonus)</h4>
                <p className="text-[10px] text-slate-500">Achieved 4.9+ rating over 100 orders</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Zap size={24} className="text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white">Peak Hour Champion (+₹300 Bonus)</h4>
                <p className="text-[10px] text-slate-500">Completed 15 deliveries during peak hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white">Recent Customer Feedback</h3>
        <div className="space-y-3">
          {reviews.map((rev, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 dark:text-white">{rev.name}</span>
                  <span className="text-amber-500 font-bold">★ {rev.rating}.0</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 font-medium">{rev.comment}</p>
              </div>
              <span className="text-[10px] font-extrabold text-slate-400 shrink-0">{rev.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
