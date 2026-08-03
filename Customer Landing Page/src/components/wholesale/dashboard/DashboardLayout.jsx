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
import WholesaleToast from '../WholesaleToast';

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          onBackToOnboarding={onBackToOnboarding}
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
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
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

          {activeTab === 'orders' && <OrdersTab />}

          {activeTab === 'products' && (
            <ProductsTab
              isAddModalOpen={isAddProductModalOpen}
              onCloseAddModal={() => setIsAddProductModalOpen(false)}
            />
          )}

          {activeTab === 'inventory' && <InventoryTab />}

          {activeTab === 'buyers' && <BuyersTab onSelectTab={onSelectTab} />}

          {activeTab === 'messages' && <MessagesTab />}

          {activeTab === 'marketing' && <MarketingTab />}

          {activeTab === 'brandingStore' && <BrandingHardwareStoreTab />}

          {activeTab === 'analytics' && <AnalyticsTab />}

          {activeTab === 'finance' && (
            <FinanceTab
              isWithdrawModalOpen={isWithdrawModalOpen}
              onCloseWithdrawModal={() => setIsWithdrawModalOpen(false)}
            />
          )}

          {activeTab === 'invoices' && <InvoicesTab />}

          {activeTab === 'documents' && <DocumentsTab />}

          {activeTab === 'settings' && <SettingsTab />}

          {activeTab === 'support' && <SupportTab />}
        </main>
      </div>

      <WholesaleToast />
    </div>
  );
}
