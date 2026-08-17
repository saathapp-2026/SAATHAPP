import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Plus, Wallet, Shield, ExternalLink, Menu, User, LogOut } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function DashboardTopNav({
  activeTab,
  darkMode,
  toggleDarkMode,
  onOpenAddProduct,
  onOpenWithdrawModal,
  onToggleMobileSidebar,
  onOpenProfilePage,
  onLogout,
}) {
  const { formData, dashboardData, addToast } = useWholesale();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-surface border-b border-slate-200 dark:border-slate-800 px-4 py-3 sm:px-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-page"
          >
            <Menu size={20} />
          </button>
          <div className="relative w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search bulk orders, buyers, SKUs, invoices..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 pl-10 pr-4 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
            className="p-2 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-page transition"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <div className="relative">
            <button
              type="button"
              className="p-2 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-page transition relative"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>

          {/* Profile Badge & Dropdown */}
          <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 cursor-pointer active:scale-95 transition hover:opacity-90 rounded-2xl p-1"
            >
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs ring-2 ring-emerald-500/30 shrink-0">
              <span>{(formData.fullName || 'W').charAt(0).toUpperCase()}</span>
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <strong className="block text-xs font-extrabold text-slate-900 dark:text-white truncate max-w-[120px]">
                {formData.fullName || 'Wholesale Partner'}
              </strong>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Verified Partner ▼
                </span>
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 p-3 space-y-2 sa-rise">
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-sm">
                    🏢
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-black text-slate-900 dark:text-white text-xs truncate">{formData.businessName || 'Wholesale Partner'}</h4>
                    <span className="text-[10px] text-emerald-500 font-bold">Platinum Supplier 🏆</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (onOpenProfilePage) onOpenProfilePage();
                  }}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-page text-xs font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer active:scale-95"
                >
                  <User size={15} className="text-emerald-500" /> View Wholesale Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (onLogout) {
                      onLogout();
                    } else {
                      addToast?.('Logging out of Wholesale Portal...', 'info');
                      window.location.reload();
                    }
                  }}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-black text-xs transition cursor-pointer active:scale-95"
                >
                  <LogOut size={15} /> Sign Out / Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
