import React from 'react';
import { Bell, CheckCircle2, XCircle, Star, Info, Wallet } from 'lucide-react';

export default function NotificationPanel({
  notifications,
  onMarkRead,
  onClearAll
}) {
  const getIcon = (type) => {
    switch (type) {
      case 'new_booking':
        return <Bell className="text-primary" size={16} />;
      case 'booking_cancelled':
        return <XCircle className="text-rose-500" size={16} />;
      case 'payment_received':
        return <Wallet className="text-emerald-500" size={16} />;
      case 'review_received':
        return <Star className="text-amber-500" size={16} fill="currentColor" />;
      default:
        return <Info className="text-blue-500" size={16} />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-card shadow-soft hover:shadow-premium transition-all text-left">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800/40">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-slate-400" />
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Alert Logs</h3>
        </div>
        <button
          onClick={onClearAll}
          className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
        >
          Clear Logs
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs sm:text-sm font-semibold">
          No new alerts. You're completely caught up!
        </div>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                notif.read
                  ? 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-150 dark:border-slate-850/80 opacity-75'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-950 flex items-center justify-center flex-shrink-0 border border-slate-100 dark:border-slate-800">
                  {getIcon(notif.type)}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className={`text-xs sm:text-sm ${notif.read ? 'font-bold text-slate-600 dark:text-slate-450' : 'font-black text-slate-800 dark:text-slate-200'}`}>
                    {notif.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {notif.description}
                  </p>
                  <span className="text-[9px] text-slate-400 font-semibold block">{notif.time}</span>
                </div>
              </div>

              {!notif.read && (
                <button
                  onClick={() => onMarkRead(notif.id)}
                  className="px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary text-[9px] font-black uppercase transition-colors cursor-pointer"
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
