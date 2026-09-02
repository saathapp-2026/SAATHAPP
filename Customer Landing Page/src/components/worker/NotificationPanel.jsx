import React from 'react';
import { Bell, Star, Info, Wallet, Award } from 'lucide-react';
import { EmptyState } from '../common/StateComponents';

export default function NotificationPanel({
  notifications,
  onMarkRead,
  onClearAll
}) {
  const getIcon = (type) => {
    switch (type) {
      case 'new_job':
        return <Bell className="text-primary" size={16} />;
      case 'salary_credited':
        return <Wallet className="text-emerald-500" size={16} />;
      case 'review_received':
        return <Star className="text-amber-500" size={16} fill="currentColor" />;
      case 'announcement':
      case 'company_announcement':
        return <Award className="text-blue-500" size={16} />;
      default:
        return <Info className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="bg-surface border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all text-left">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-105 ">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-slate-400" />
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Duty Alerts</h3>
        </div>
        <button
          onClick={onClearAll}
          className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none text-[10px] font-black uppercase text-slate-450 hover:text-slate-600 cursor-pointer"
        >
          Clear Logs
        </button>
      </div>

      {notifications.length === 0 ? (
        <EmptyState 
          icon={Bell} 
          title="No notifications yet" 
          description="We'll let you know when there's an update on your account."
        />
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                notif.read
                  ? 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-150 dark:border-slate-850/80 opacity-75'
                  : 'bg-surface border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-page dark:bg-slate-950 flex items-center justify-center flex-shrink-0 border border-slate-100 dark:border-slate-800">
                  {getIcon(notif.type)}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className={`text-xs sm:text-sm ${notif.read ? 'font-bold text-slate-655 dark:text-slate-450' : 'font-black text-slate-800 dark:text-slate-200'}`}>
                    {notif.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-550 dark:text-slate-400 font-medium leading-relaxed">
                    {notif.description}
                  </p>
                  <span className="text-[9px] text-slate-400 font-semibold block">{notif.time}</span>
                </div>
              </div>

              {!notif.read && (
                <button
                  onClick={() => onMarkRead(notif.id)}
                  className="px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
