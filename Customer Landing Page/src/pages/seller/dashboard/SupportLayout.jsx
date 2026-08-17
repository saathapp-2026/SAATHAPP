import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function SupportLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'help-center', label: 'Help Center', path: '/seller/dashboard/support/help-center' },
    { id: 'tickets', label: 'Support Tickets', path: '/seller/dashboard/support/tickets' },
  ];

  const currentTab = tabs.find(t => location.pathname.includes(t.path))?.id || 'help-center';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Seller Support</h1>
          <p className="text-sm text-slate-500 mt-1">Get help, read guides, and manage your support tickets.</p>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                currentTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
}
