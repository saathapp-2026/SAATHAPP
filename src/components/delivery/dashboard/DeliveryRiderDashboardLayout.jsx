import React, { useState } from 'react';
import DeliveryRiderSidebar from './DeliveryRiderSidebar';
import DeliveryRiderTopNav from './DeliveryRiderTopNav';
import RiderOverviewTab from './RiderOverviewTab';
import RiderActiveDeliveriesTab from './RiderActiveDeliveriesTab';
import RiderHistoryTab from './RiderHistoryTab';
import RiderWalletTab from './RiderWalletTab';
import RiderDocumentsTab from './RiderDocumentsTab';
import RiderRatingsTab from './RiderRatingsTab';
import RiderSupportTab from './RiderSupportTab';
import DeliveryEquipmentStoreSection from '../welcome/DeliveryEquipmentStoreSection';
import Step10_DeliveryTerms from '../onboarding/Step10_DeliveryTerms';
import WholesaleToast from '../../wholesale/WholesaleToast';

export default function DeliveryRiderDashboardLayout({
  activeTab: propActiveTab = 'overview',
  onSelectTab: propOnSelectTab,
  onBackToOnboarding,
  darkMode,
  toggleDarkMode,
}) {
  const [localActiveTab, setLocalActiveTab] = useState(propActiveTab || 'overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const activeTab = propActiveTab || localActiveTab;

  const handleSelectTab = (tabId) => {
    setLocalActiveTab(tabId);
    if (propOnSelectTab) {
      propOnSelectTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <DeliveryRiderSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onBackToOnboarding={onBackToOnboarding}
        />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex md:hidden">
          <div className="w-72 bg-slate-950 h-full overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b border-slate-800">
              <span className="text-sm font-extrabold text-amber-400">Rider App Dashboard</span>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-slate-400 font-bold p-1"
              >
                ✕
              </button>
            </div>
            <DeliveryRiderSidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                handleSelectTab(tab);
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
        <DeliveryRiderTopNav
          activeTab={activeTab}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenWithdrawModal={() => handleSelectTab('wallet')}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <RiderOverviewTab
              onSelectTab={handleSelectTab}
              onOpenWithdrawModal={() => handleSelectTab('wallet')}
            />
          )}

          {activeTab === 'activeDeliveries' && <RiderActiveDeliveriesTab />}

          {activeTab === 'history' && <RiderHistoryTab />}

          {activeTab === 'wallet' && <RiderWalletTab />}

          {activeTab === 'equipmentStore' && (
            <DeliveryEquipmentStoreSection onStartRegistration={() => handleSelectTab('overview')} />
          )}

          {activeTab === 'documents' && <RiderDocumentsTab />}

          {activeTab === 'ratings' && <RiderRatingsTab />}

          {activeTab === 'support' && <RiderSupportTab />}

          {activeTab === 'terms' && (
            <Step10_DeliveryTerms onNext={() => handleSelectTab('overview')} onPrev={() => handleSelectTab('overview')} onSelectStep={() => {}} />
          )}
        </main>
      </div>

      <WholesaleToast />
    </div>
  );
}
