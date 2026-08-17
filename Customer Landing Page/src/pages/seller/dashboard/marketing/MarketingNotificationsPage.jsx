import React, { useMemo, useState } from 'react';
import { Bell, CheckCircle2, CircleDashed, X } from 'lucide-react';
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../../../../services/sellerNotificationService';

export default function MarketingNotificationsPage() {
  const [notifications, setNotifications] = useState(() => getNotifications());
  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const handleRead = (id) => {
    setNotifications(markNotificationRead(id));
  };

  const handleMarkAll = () => {
    setNotifications(markAllNotificationsRead());
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">Notifications</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Campaign alerts & review updates</h2>
            <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">Stay on top of campaign approvals, payment confirmations and review results with real-time alerts.</p>
          </div>
          <button type="button" onClick={handleMarkAll} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Mark all read {unreadCount ? `(${unreadCount})` : ''}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Recent notifications</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Campaign status, review feedback and billing alerts.</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">{unreadCount} unread</span>
        </div>
        <div className="mt-6 space-y-3">
          {notifications.map((item) => (
            <div key={item.id} className={`rounded-3xl p-4 flex flex-col gap-3 border ${item.read ? 'border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-900' : 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-page dark:bg-slate-900 p-2">
                    {item.read ? <CheckCircle2 size={16} className="text-emerald-600" /> : <CircleDashed size={16} className="text-emerald-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
                  </div>
                </div>
                <button type="button" onClick={() => handleRead(item.id)} className="rounded-full border border-slate-200 bg-surface p-2 text-slate-500 hover:text-slate-700">
                  <X size={14} />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.time || 'Just now'}</p>
            </div>
          ))}
          {!notifications.length && <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">No notifications available.</p>}
        </div>
      </div>
    </div>
  );
}
