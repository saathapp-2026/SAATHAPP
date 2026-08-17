import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ChevronLeft, LogOut, X, PanelLeftClose, PanelLeft } from 'lucide-react';
import { DASHBOARD_NAV_ITEMS, Store } from '../../config/sellerDashboardNav';
import DashboardTopbar from './DashboardTopbar';
import { useSellerUI } from '../../context/SellerUIContext';
import SellerErrorBoundary from './SellerErrorBoundary';

export default function DashboardLayout({ seller, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sidebarCollapsed, toggleSidebarCollapsed } = useSellerUI();

  return (
    <div className="min-h-screen bg-page dark:bg-slate-950 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-surface border-r border-slate-200 dark:border-slate-800 transform transition-all lg:translate-x-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'w-16 lg:w-16' : 'w-64'}`}
        aria-label="Seller dashboard navigation"
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <Link to="/seller/dashboard" className="flex items-center gap-2 min-w-0" onClick={() => setSidebarOpen(false)}>
            <Store size={24} className="text-emerald-500 shrink-0" />
            {!sidebarCollapsed && <span className="font-bold truncate">Seller Hub</span>}
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="hidden lg:flex p-1 rounded-lg hover:bg-page focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={toggleSidebarCollapsed}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>
            <button type="button" className="lg:hidden p-1" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
          {DASHBOARD_NAV_ITEMS.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setSidebarOpen(false)}
              title={sidebarCollapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-page'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {!sidebarCollapsed && label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0">
          {!sidebarCollapsed && (
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              <ChevronLeft size={16} />
              Back to Store
            </Link>
          )}
          <button
            type="button"
            onClick={onLogout}
            className={`flex items-center gap-2 w-full text-sm text-red-500 hover:text-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 rounded ${sidebarCollapsed ? 'justify-center' : ''}`}
            aria-label="Logout"
          >
            <LogOut size={16} />
            {!sidebarCollapsed && 'Logout'}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar
          seller={seller}
          onLogout={onLogout}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <SellerErrorBoundary>
            <Outlet />
          </SellerErrorBoundary>
        </main>
      </div>
    </div>
  );
}
