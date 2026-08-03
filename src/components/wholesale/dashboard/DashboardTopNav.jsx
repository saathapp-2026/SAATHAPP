import React from 'react';
import { Search, Bell, Sun, Moon, Plus, Wallet, Shield, ExternalLink, Menu } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function DashboardTopNav({
  activeTab,
  darkMode,
  toggleDarkMode,
  onOpenAddProduct,
  onOpenWithdrawModal,
  onToggleMobileSidebar,
}) {
  const { formData, dashboardData } = useWholesale();

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 sm:px-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={20} />
          </button>
          <div className="relative w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search bulk orders, buyers, SKUs, invoices..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Wallet Pill */}
          <div
            onClick={onOpenWithdrawModal}
            className="hidden sm:flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 cursor-pointer hover:bg-emerald-500/20 transition"
          >
            <Wallet size={15} className="text-emerald-500" />
            <div className="text-[11px]">
              <span className="text-slate-500 block leading-tight">Wallet</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                ₹{dashboardData.kpis.walletBalance.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAddProduct}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-extrabold text-white shadow transition hover:scale-[1.02]"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Product</span>
          </button>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <div className="relative">
            <button
              type="button"
              className="p-2 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>

          {/* Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={formData.profilePhotoUrl}
              alt="Owner Avatar"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                {formData.fullName}
              </p>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Verified Partner
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
