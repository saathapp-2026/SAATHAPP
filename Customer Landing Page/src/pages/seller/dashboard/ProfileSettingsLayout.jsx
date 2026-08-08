import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Store, FileText, User, Landmark, Building, Settings as SettingsIcon } from 'lucide-react';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';

export default function ProfileSettingsLayout() {
  const location = useLocation();

  if (location.pathname === '/seller/dashboard/profile' || location.pathname === '/seller/dashboard/profile/') {
    return <Navigate to="/seller/dashboard/profile/seller" replace />;
  }

  const tabs = [
    { id: 'seller', label: 'Seller Profile', icon: User, path: 'seller' },
    { id: 'store', label: 'Store Profile', icon: Store, path: 'store' },
    { id: 'onboarding', label: 'Onboarding', icon: Building, path: 'onboarding' },
    { id: 'documents', label: 'Documents', icon: FileText, path: 'documents' },
    { id: 'bank', label: 'Bank Details', icon: Landmark, path: 'bank' },
    { id: 'account', label: 'Account Settings', icon: SettingsIcon, path: 'account' },
  ];

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Profile & Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your seller account, store details, and documents.</p>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) => `
                flex items-center gap-2 whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium transition-colors
                ${isActive 
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
