import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopNav from './DashboardTopNav';
import OverviewTab from './OverviewTab';
import OrdersTab from './OrdersTab';
import ProductsTab from './ProductsTab';
import InventoryTab from './InventoryTab';
import BuyersTab from './BuyersTab';
import MessagesTab from './MessagesTab';
import MarketingTab from './MarketingTab';
import BrandingHardwareStoreTab from './BrandingHardwareStoreTab';
import AnalyticsTab from './AnalyticsTab';
import FinanceTab from './FinanceTab';
import InvoicesTab from './InvoicesTab';
import DocumentsTab from './DocumentsTab';
import SettingsTab from './SettingsTab';
import SupportTab from './SupportTab';
import WholesaleProfileTab from './WholesaleProfileTab';
import WholesaleToast from '../WholesaleToast';
import { LogOut } from 'lucide-react';

export default function DashboardLayout({
  activeTab,
  onSelectTab,
  onBackToOnboarding,
  darkMode,
  toggleDarkMode,
}) {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    if (onBackToOnboarding) {
      onBackToOnboarding();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-page dark:bg-slate-950 flex flex-col md:flex-row text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          onBackToOnboarding={onBackToOnboarding}
          onLogout={() => setIsLogoutModalOpen(true)}
        />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex md:hidden">
          <div className="w-72 bg-slate-950 h-full overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b border-slate-800">
              <span className="text-sm font-extrabold text-emerald-400">Wholesale Dashboard</span>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-slate-400 font-bold p-1"
              >
                ✕
              </button>
            </div>
            <DashboardSidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                onSelectTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              onBackToOnboarding={() => {
                onBackToOnboarding();
                setIsMobileSidebarOpen(false);
              }}
              onLogout={() => {
                setIsLogoutModalOpen(true);
                setIsMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <DashboardTopNav
          activeTab={activeTab}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenAddProduct={() => {
            onSelectTab('products');
            setIsAddProductModalOpen(true);
          }}
          onOpenWithdrawModal={() => {
            onSelectTab('finance');
            setIsWithdrawModalOpen(true);
          }}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenProfilePage={() => onSelectTab('profile')}
          onLogout={() => setIsLogoutModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {(activeTab === 'overview' || activeTab === 'dashboard') && (
            <OverviewTab
              onSelectTab={onSelectTab}
              onOpenAddProduct={() => {
                onSelectTab('products');
                setIsAddProductModalOpen(true);
              }}
              onOpenWithdrawModal={() => {
                onSelectTab('finance');
                setIsWithdrawModalOpen(true);
              }}
            />
          )}

          {(activeTab === 'orders' || activeTab === 'invoices') && <OrdersTab />}

          {(activeTab === 'products' || activeTab === 'inventory') && (
            <ProductsTab
              isAddModalOpen={isAddProductModalOpen}
              onCloseAddModal={() => setIsAddProductModalOpen(false)}
              onOpenAddModal={() => setIsAddProductModalOpen(true)}
            />
          )}

          {(activeTab === 'buyers' || activeTab === 'messages') && <BuyersTab onSelectTab={onSelectTab} />}

          {activeTab === 'marketing' && <MarketingTab />}

          {activeTab === 'analytics' && <AnalyticsTab />}

          {(activeTab === 'finance' || activeTab === 'wallet') && (
            <FinanceTab
              isWithdrawModalOpen={isWithdrawModalOpen}
              onCloseWithdrawModal={() => setIsWithdrawModalOpen(false)}
              onSelectTab={onSelectTab}
            />
          )}

          {(activeTab === 'profile' || activeTab === 'settings' || activeTab === 'documents' || activeTab === 'brandingStore') && (
            <WholesaleProfileTab
              onSelectTab={onSelectTab}
              onLogout={() => setIsLogoutModalOpen(true)}
              initialSubTab={
                activeTab === 'documents'
                  ? 'Documents'
                  : activeTab === 'settings'
                  ? 'Business Settings'
                  : activeTab === 'brandingStore'
                  ? 'Business Resources'
                  : 'Wholesale Profile'
              }
            />
          )}

          {activeTab === 'support' && <SupportTab />}
        </main>
      </div>

      {/* LOGOUT CONFIRMATION POPUP MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center font-black text-2xl">
              <LogOut size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Confirm Logout?</h3>
            <p className="text-slate-500">Are you sure you want to log out of your SaathApp Wholesale Enterprise session?</p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-page text-slate-800 dark:text-slate-200 font-extrabold cursor-pointer active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black cursor-pointer shadow active:scale-95 transition"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <WholesaleToast />
    </div>
  );
}
