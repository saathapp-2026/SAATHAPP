import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { BarChart3, ClipboardList, CalendarDays, ShieldCheck, Wallet, Bell, FileText } from 'lucide-react';

const TABS = [
  { id: 'campaigns', label: 'Campaigns', icon: ClipboardList, to: 'campaigns' },
  { id: 'review', label: 'Review', icon: ShieldCheck, to: 'review' },
  { id: 'scheduler', label: 'Scheduler', icon: CalendarDays, to: 'scheduler' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, to: 'analytics' },
  { id: 'reports', label: 'Reports', icon: FileText, to: 'reports' },
  { id: 'billing', label: 'Billing', icon: Wallet, to: 'billing' },
  { id: 'notifications', label: 'Notifications', icon: Bell, to: 'notifications' },
];

function MarketingTab({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
          isActive
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
        }`
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  );
}

export default function MarketingPage() {
  const location = useLocation();

  if (location.pathname === '/seller/dashboard/marketing') {
    return <Navigate to="campaigns" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-600">Marketing Hub</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Advertisement & Campaign Manager</h1>
            <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Manage campaign approvals, scheduling, live performance, billing and reports in one unified seller marketing workspace.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 shadow-sm">
        <div className="flex gap-2 min-w-max">
          {TABS.map((tab) => (
            <MarketingTab key={tab.id} {...tab} />
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
