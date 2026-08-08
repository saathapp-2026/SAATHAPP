import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { BarChart3, FileBarChart, TrendingUp, ShoppingBag, Package, Users, DollarSign } from 'lucide-react';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';

export default function AnalyticsLayout() {
  const location = useLocation();

  if (location.pathname === '/seller/dashboard/analytics' || location.pathname === '/seller/dashboard/analytics/') {
    return <Navigate to="/seller/dashboard/analytics/overview" replace />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, path: 'overview' },
    { id: 'reports', label: 'Reports', icon: FileBarChart, path: 'reports' },
    { id: 'sales', label: 'Sales', icon: TrendingUp, path: 'sales' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, path: 'orders' },
    { id: 'products', label: 'Products', icon: Package, path: 'products' },
    { id: 'customers', label: 'Customers', icon: Users, path: 'customers' },
    { id: 'financial', label: 'Financial', icon: DollarSign, path: 'financial' },
  ];

  return (
    <div className="space-y-6 pb-8 max-w-[1400px] mx-auto overflow-x-hidden">
      <DashboardBreadcrumbs />
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Analytics & Reports</h1>
        <p className="text-slate-500 text-sm mt-0.5">Track your business performance and generate detailed reports.</p>
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
