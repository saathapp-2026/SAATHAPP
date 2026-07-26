import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Star, Clock, Trophy, Heart, ShieldCheck, Flame } from 'lucide-react';

export default function PerformanceCard() {
  const metrics = [
    { label: 'Completion Rate', value: '98%', desc: '142 completed of 145 jobs', icon: ShieldCheck, color: 'text-primary' },
    { label: 'Acceptance Rate', value: '95%', desc: 'Accepts 95% of job dispatches', icon: Flame, color: 'text-rose-500' },
    { label: 'Avg Job Duration', value: '42m', desc: 'Avg service turnaround time', icon: Clock, color: 'text-blue-500' },
    { label: 'Feedback Rating', value: '4.9 ★', desc: 'Weighted customer rating score', icon: Star, color: 'text-amber-500' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Vijay Singh', category: 'Electrician', rating: 4.95, completed: 184 },
    { rank: 2, name: 'Ramesh Kumar (You)', category: 'Electrician', rating: 4.90, completed: 142 },
    { rank: 3, name: 'Sanjay Dutt', category: 'Plumber', rating: 4.88, completed: 120 }
  ];

  const badges = [
    { title: 'Speed Demon', desc: 'Resolves jobs in under 30 mins', icon: Zap, bg: 'from-amber-400 to-orange-500' },
    { title: 'Super Saathi', desc: 'Rated 5 stars on 50 consecutive jobs', icon: Star, bg: 'from-emerald-400 to-teal-500' },
    { title: 'Perfect Attendance', desc: 'Clocked present for 30 consecutive days', icon: Trophy, bg: 'from-blue-400 to-indigo-600' }
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* 4 Core Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const MetricIcon = m.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-card shadow-soft hover:shadow-premium transition-all flex flex-col justify-between h-36"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{m.label}</span>
                <MetricIcon size={18} className={m.color} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white leading-none">{m.value}</h3>
                <p className="text-[9px] text-slate-450 dark:text-slate-500 font-bold uppercase">{m.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Leaderboard and Badges Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leaderboard */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Weekly Leaderboard</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase">Patna Center #4</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-slate-655 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black uppercase text-slate-400">
                  <th className="pb-3">Rank</th>
                  <th className="pb-3">Worker</th>
                  <th className="pb-3">Skill</th>
                  <th className="pb-3 text-center">Completed</th>
                  <th className="pb-3 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
                {leaderboard.map((w, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50/50 dark:hover:bg-slate-950/20 ${
                    w.rank === 2 ? 'bg-primary/5 dark:bg-primary-950/10' : ''
                  }`}>
                    <td className="py-3 font-bold text-slate-800 dark:text-slate-350">
                      {w.rank === 1 ? '🥇' : w.rank === 2 ? '🥈' : '🥉'} {w.rank}
                    </td>
                    <td className="py-3">
                      <span className={`font-black ${w.rank === 2 ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>
                        {w.name}
                      </span>
                    </td>
                    <td className="py-3 uppercase text-[10px] font-bold text-slate-400">{w.category}</td>
                    <td className="py-3 text-center font-bold text-slate-800 dark:text-slate-200">{w.completed}</td>
                    <td className="py-3 text-right text-amber-500 font-bold">★ {w.rating.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all text-left">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-4">Achievement Badges</h3>
          
          <div className="space-y-4">
            {badges.map((b, idx) => {
              const BadgeIcon = b.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${b.bg} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                    <BadgeIcon size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 leading-tight">{b.title}</h4>
                    <p className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold mt-0.5">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
