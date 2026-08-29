import React, { useState } from 'react';
import DeliveryRiderSidebar from './DeliveryRiderSidebar';
import DeliveryRiderTopNav from './DeliveryRiderTopNav';
import RiderOverviewTab from './RiderOverviewTab';
import RiderActiveDeliveriesTab from './RiderActiveDeliveriesTab';
import RiderHistoryTab from './RiderHistoryTab';
import RiderScheduledTab from './RiderScheduledTab';
import RiderWalletTab from './RiderWalletTab';
import RiderDocumentsTab from './RiderDocumentsTab';
import RiderRatingsTab from './RiderRatingsTab';
import RiderSupportTab from './RiderSupportTab';
import RiderProfileTab from './RiderProfileTab';
import RiderOrdersDeliveriesTab from './RiderOrdersDeliveriesTab';
import RiderIncentivesTab from './RiderIncentivesTab';
import DeliveryEquipmentStoreSection from '../welcome/DeliveryEquipmentStoreSection';
import Step10_DeliveryTerms from '../onboarding/Step10_DeliveryTerms';
import WholesaleToast from '../../wholesale/WholesaleToast';
import { LogOut } from 'lucide-react';

export default function DeliveryRiderDashboardLayout({
  activeTab: propActiveTab = 'overview',
  onSelectTab: propOnSelectTab,
  onBackToOnboarding,
  darkMode,
  toggleDarkMode,
}) {
  const [localActiveTab, setLocalActiveTab] = useState(propActiveTab || 'overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSosTriggered, setIsSosTriggered] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const activeTab = propActiveTab || localActiveTab;

  const handleSelectTab = (tabId) => {
    setLocalActiveTab(tabId);
    if (propOnSelectTab) {
      propOnSelectTab(tabId);
    }
  };

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
        <DeliveryRiderSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onBackToOnboarding={onBackToOnboarding}
          onTriggerSos={() => setIsSosTriggered(true)}
          onLogout={() => setIsLogoutModalOpen(true)}
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
              onTriggerSos={() => {
                setIsSosTriggered(true);
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
        <DeliveryRiderTopNav
          activeTab={activeTab}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenWithdrawModal={() => handleSelectTab('earnings')}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onTriggerSos={() => setIsSosTriggered(true)}
          onOpenSupportPage={() => handleSelectTab('support')}
          onOpenProfilePage={() => handleSelectTab('profile')}
          onLogout={() => setIsLogoutModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Module 1: Dashboard */}
          {(activeTab === 'overview' || activeTab === 'dashboard' || activeTab === 'attendance') && (
            <RiderOverviewTab
              onSelectTab={handleSelectTab}
              onOpenWithdrawModal={() => handleSelectTab('earnings')}
            />
          )}

          {/* Module 2: Orders & Deliveries */}
          {(activeTab === 'orders' || activeTab === 'activeDeliveries' || activeTab === 'history' || activeTab === 'scheduled') && (
            <RiderOrdersDeliveriesTab
              initialSubTab={
                activeTab === 'history'
                  ? 'completed'
                  : activeTab === 'scheduled'
                  ? 'scheduled'
                  : 'live'
              }
            />
          )}

          {/* Module 3: Earnings & Wallet */}
          {(activeTab === 'earnings' || activeTab === 'wallet') && <RiderWalletTab />}

          {/* Module 4: Incentives & Bonuses */}
          {(activeTab === 'incentives' || activeTab === 'bonuses') && <RiderIncentivesTab />}

          {/* Module 5: Ratings & Performance */}
          {activeTab === 'ratings' && <RiderRatingsTab />}

          {/* Module 6: Vehicle & Documents */}
          {(activeTab === 'vehicle' || activeTab === 'documents') && <RiderDocumentsTab />}

          {/* Module 8: Profile & Settings */}
          {(activeTab === 'profile' || activeTab === 'settings') && (
            <RiderProfileTab
              onSelectTab={handleSelectTab}
              onLogout={() => setIsLogoutModalOpen(true)}
            />
          )}

          {/* Module 9: Support */}
          {(activeTab === 'support' || activeTab === 'training' || activeTab === 'equipmentStore') && (
            <RiderSupportTab initialSubTab={activeTab === 'training' || activeTab === 'equipmentStore' ? 'training' : 'help'} />
          )}

          {activeTab === 'terms' && (
            <Step10_DeliveryTerms onNext={() => handleSelectTab('overview')} onPrev={() => handleSelectTab('overview')} onSelectStep={() => {}} />
          )}
        </main>
      </div>

      {/* EMERGENCY SOS POPUP MODAL */}
      {isSosTriggered && (
        <div className="fixed inset-0 z-50 bg-rose-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-rose-600 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white text-xs sa-rise">
            <div className="flex justify-between items-center border-b border-rose-900/60 pb-3">
              <h3 className="text-base font-black text-rose-400 flex items-center gap-2">
                ⚠️ EMERGENCY SOS ACTIVATED
              </h3>
              <button type="button" onClick={() => setIsSosTriggered(false)} className="text-slate-400 font-bold p-1">✕</button>
            </div>

            <p className="text-slate-300">
              Your live GPS coordinates (Patna, Bihar) and active route data have been transmitted to SaathApp Emergency Dispatch &amp; local authorities.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2">
              <button type="button" onClick={() => setIsSosTriggered(false)} className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-center font-black">
                🚓 Call Police (112)
              </button>
              <button type="button" onClick={() => setIsSosTriggered(false)} className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-center font-black">
                🚑 Call Ambulance (108)
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="button" onClick={() => setIsSosTriggered(false)} className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">
                Cancel Alarm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT CONFIRMATION POPUP MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs sa-rise text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center font-black text-2xl">
              <LogOut size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Confirm Logout?</h3>
            <p className="text-slate-500">Are you sure you want to log out of your SaathApp Rider Agent session?</p>

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
