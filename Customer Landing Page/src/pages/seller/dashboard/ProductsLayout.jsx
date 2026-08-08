import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Package, Boxes } from 'lucide-react';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';

export default function ProductsLayout() {
  const location = useLocation();

  if (location.pathname === '/seller/dashboard/products' || location.pathname === '/seller/dashboard/products/') {
    return <Navigate to="/seller/dashboard/products/catalogue" replace />;
  }

  const tabs = [
    { id: 'catalogue', label: 'Catalogue', icon: Package, path: 'catalogue' },
    { id: 'inventory', label: 'Inventory & Stock', icon: Boxes, path: 'inventory' },
  ];

  return (
    <div className="space-y-6 pb-8 max-w-[1400px] mx-auto overflow-x-hidden">
      <DashboardBreadcrumbs />
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Products</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your catalogue and track inventory levels.</p>
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
