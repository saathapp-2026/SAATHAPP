import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Star, Clock, Trophy, ShieldCheck, Flame } from 'lucide-react';
export default function PerformanceCard() {
  const metrics = [
    { label: 'Completion Rate', value: '0%', desc: 'Jobs completed successfully', icon: ShieldCheck, color: 'text-primary' },
    { label: 'Acceptance Rate', value: '0%', desc: 'Jobs accepted from dispatches', icon: Flame, color: 'text-rose-500' },
    { label: 'Avg Job Time', value: '0 mins', desc: 'Average service turnaround', icon: Clock, color: 'text-blue-500' },
    { label: 'Customer Rating', value: '0.0 ★', desc: 'Weighted feedback score', icon: Star, color: 'text-amber-500' },
  ];

  const leaderboard = [];
  const badges = [];

  const badgeColors = {
    amber: 'from-amber-400 to-orange-500',
    blue: 'from-blue-400 to-indigo-600',
    emerald: 'from-emerald-400 to-teal-500',
  };

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((m, idx) => {
          const MetricIcon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-surface/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-5 rounded-card shadow-soft hover:shadow-premium transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{m.label}</span>
                <MetricIcon size={18} className={m.color} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">{m.value}</h3>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">{m.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Leaderboard</h3>
            <span className="text-[10px] font-bold text-slate-400">Rank - of -</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="transition-colors hover:bg-emerald-50/30 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400">
                  <th className="pb-3 pr-4">Rank</th>
                  <th className="pb-3 pr-4">Worker</th>
                  <th className="pb-3 pr-4">Skill</th>
                  <th className="pb-3 text-center">Completed</th>
                  <th className="pb-3 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/80">
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No ranking data available.
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((w) => (
                    <tr key={w.rank} className={w.highlight ? 'bg-primary/5 dark:bg-primary/10' : ''}>
                      <td className="py-3 font-bold">{w.rank === 1 ? '🥇' : w.rank === 2 ? '🥈' : '🥉'} {w.rank}</td>
                      <td className={`py-3 font-black ${w.highlight ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>{w.name}</td>
                      <td className="py-3 text-slate-500 uppercase text-[10px] font-bold">{w.category}</td>
                      <td className="py-3 text-center font-bold">{w.completed}</td>
                      <td className="py-3 text-right text-amber-500 font-bold">★ {w.rating}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Achievement Badges</h3>
          <div className="space-y-4">
            {badges.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">No badges earned yet.</p>
            ) : (
              badges.map((b) => {
                const BadgeIcon = badgeIcons[b.icon] || Award;
                return (
                  <div key={b.name} className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${badgeColors[b.color] || badgeColors.emerald} text-white flex items-center justify-center shadow-md shrink-0`}>
                      <BadgeIcon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 dark:text-white">{b.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Earned this month</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
