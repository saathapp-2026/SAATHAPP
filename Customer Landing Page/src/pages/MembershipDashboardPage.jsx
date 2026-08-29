import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  CheckCircle2,
  Calendar,
  Truck,
  Tag,
  Wallet,
  ShieldCheck,
  ArrowLeft,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMembership } from '../context/MembershipContext';
import { useNavigate } from 'react-router-dom';

export default function MembershipDashboardPage({
  cartCount,
  onCartClick,
  location,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode
}) {
  const { membership, cancelMembership } = useMembership();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview | benefits | billing
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelConfirmed, setCancelConfirmed] = useState(false);

  const handleConfirmCancel = () => {
    cancelMembership();
    setCancelConfirmed(true);
    setTimeout(() => {
      setShowCancelModal(false);
      setCancelConfirmed(false);
    }, 1500);
  };

  const isMemberActive = membership.isMember && membership.status === 'Active';

  return (
    <div className="min-h-screen flex flex-col bg-page text-theme font-sans transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Navigation Back */}
        <button
          onClick={() => navigate('/plus')}
          className="flex items-center gap-2 text-xs font-bold text-theme-secondary hover:text-amber-500 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to SaathApp Plus Overview</span>
        </button>

        {/* Dashboard Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-7 h-7 text-amber-500" />
              <h1 className="text-3xl font-black uppercase text-theme tracking-tight">
                Membership Dashboard
              </h1>
            </div>
            <p className="text-xs text-theme-secondary font-medium mt-1">
              Manage your SaathApp Plus subscription, benefits, billing, and member perks.
            </p>
          </div>

          {!isMemberActive && (
            <button
              onClick={() => navigate('/plus')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer shrink-0"
            >
              Explore Plus Plans
            </button>
          )}
        </div>

        {/* ACTIVE MEMBERSHIP STATUS CARD */}
        {isMemberActive ? (
          <div className="relative overflow-hidden rounded-[32px] p-6 sm:p-8 bg-gradient-to-br from-amber-500/15 via-surface to-surface border-2 border-amber-500/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 dark:border-amber-500/50 shadow-xl mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-theme-border dark:border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-[11px] font-black uppercase tracking-wider mb-2">
                  <CheckCircle2 size={13} />
                  <span>Active Member</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-theme dark:text-slate-100">
                  SAATHAPP PLUS — <span className="text-amber-500">{membership.planName}</span>
                </h2>
                <div className="flex items-center gap-2 text-xs text-theme-secondary dark:text-slate-400 mt-1">
                  <Calendar size={14} className="text-amber-500" />
                  <span>Renews: <strong className="text-theme dark:text-slate-200 font-bold">{membership.renewalDate || '17 September 2026'}</strong></span>
                  <span className="text-slate-400">•</span>
                  <span className="capitalize">({membership.billingCycle} billing)</span>
                </div>
              </div>

              {/* Status Pills Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800">
                  <Truck className="w-5 h-5 text-blue-500 dark:text-blue-400 mx-auto mb-1" />
                  <div className="text-[10px] text-theme-secondary dark:text-slate-400 font-bold uppercase">Deliveries</div>
                  <div className="text-xs font-black text-theme dark:text-slate-100 mt-0.5">{membership.deliveriesRemaining}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800">
                  <Tag className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <div className="text-[10px] text-theme-secondary dark:text-slate-400 font-bold uppercase">Coupons</div>
                  <div className="text-xs font-black text-theme dark:text-slate-100 mt-0.5">{membership.couponsAvailable} Available</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800">
                  <Wallet className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mx-auto mb-1" />
                  <div className="text-[10px] text-theme-secondary dark:text-slate-400 font-bold uppercase">Cashback</div>
                  <div className="text-xs font-black text-emerald-500 dark:text-emerald-400 mt-0.5">₹{membership.cashbackBalance}</div>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Tabs */}
            <div className="flex items-center gap-3 pt-6 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 text-theme-secondary dark:text-slate-300 hover:text-theme dark:hover:text-slate-100'
                }`}
              >
                Manage Membership
              </button>

              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'benefits'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 text-theme-secondary dark:text-slate-300 hover:text-theme dark:hover:text-slate-100'
                }`}
              >
                View Benefits
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'billing'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 text-theme-secondary dark:text-slate-300 hover:text-theme dark:hover:text-slate-100'
                }`}
              >
                View Billing
              </button>

              <button
                onClick={() => setShowCancelModal(true)}
                className="px-5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 font-extrabold text-xs hover:bg-rose-500 hover:text-white transition-all cursor-pointer ml-auto whitespace-nowrap"
              >
                Cancel Membership
              </button>
            </div>
          </div>
        ) : (
          /* INACTIVE / CANCELLED CARD */
          <div className="p-8 rounded-[32px] bg-surface dark:bg-slate-900 border border-theme-border dark:border-slate-800 text-center space-y-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <Crown size={32} />
            </div>
            <h2 className="text-2xl font-black text-theme dark:text-slate-100">No Active Plus Membership</h2>
            <p className="text-xs text-theme-secondary dark:text-slate-300 max-w-md mx-auto">
              Subscribe to SaathApp Plus today to unlock free deliveries, faster processing, exclusive coupons, and VIP perks across the platform.
            </p>
            <button
              onClick={() => navigate('/plus')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles size={16} />
              <span>Join SaathApp Plus Now</span>
            </button>
          </div>
        )}

        {/* TAB CONTENT */}
        {activeTab === 'overview' && isMemberActive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Member Benefits List */}
            <div className="p-6 rounded-3xl bg-surface dark:bg-slate-900 border border-theme-border dark:border-slate-800 space-y-4">
              <h3 className="font-black text-base text-theme dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                Active Benefits Checklist
              </h3>
              <ul className="space-y-3 text-xs text-theme dark:text-slate-200 font-medium">
                {membership.benefits?.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-page dark:bg-slate-950 border border-theme-border/50 dark:border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions & Membership Controls */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-surface dark:bg-slate-900 border border-theme-border dark:border-slate-800 space-y-4">
                <h3 className="font-black text-base text-theme dark:text-slate-100 uppercase tracking-wider">
                  Membership Settings
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/plus')}
                    className="w-full p-4 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 hover:border-amber-500 transition-all flex items-center justify-between text-left cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs text-theme dark:text-slate-100">Change / Upgrade Tier</div>
                      <div className="text-[11px] text-theme-secondary dark:text-slate-400">Switch to Gold or Platinum for extra perks</div>
                    </div>
                    <ChevronRight size={16} className="text-theme-secondary dark:text-slate-400" />
                  </button>

                  <button
                    onClick={() => setActiveTab('billing')}
                    className="w-full p-4 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 hover:border-amber-500 transition-all flex items-center justify-between text-left cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xs text-theme dark:text-slate-100">Billing & Payment History</div>
                      <div className="text-[11px] text-theme-secondary dark:text-slate-400">View invoices and renewal receipts</div>
                    </div>
                    <ChevronRight size={16} className="text-theme-secondary dark:text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="p-6 rounded-3xl bg-surface dark:bg-slate-900 border border-theme-border dark:border-slate-800 space-y-4">
            <h3 className="font-black text-base text-theme dark:text-slate-100 uppercase tracking-wider">
              All Included Member Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {membership.benefits?.map((b, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-bold text-theme dark:text-slate-200">{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="p-6 rounded-3xl bg-surface dark:bg-slate-900 border border-theme-border dark:border-slate-800 space-y-4">
            <h3 className="font-black text-base text-theme dark:text-slate-100 uppercase tracking-wider">
              Billing History
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-page dark:bg-slate-950 border border-theme-border dark:border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-extrabold text-theme dark:text-slate-100">SaathApp Plus ({membership.planName})</div>
                  <div className="text-[11px] text-theme-secondary dark:text-slate-400">Billed on {new Date().toLocaleDateString('en-GB')}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-amber-500 text-sm">₹{membership.price || 499}</div>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Paid</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CANCEL CONFIRMATION MODAL */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelModal(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-surface dark:bg-slate-900 border border-theme-border dark:border-slate-800 rounded-[28px] p-6 shadow-2xl z-10 text-theme dark:text-slate-100 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>

              <div>
                <h3 className="text-lg font-black text-theme dark:text-slate-100">Cancel SaathApp Plus?</h3>
                <p className="text-xs text-theme-secondary dark:text-slate-300 mt-1 leading-relaxed">
                  Are you sure you want to cancel your membership? You will lose free delivery credits, priority support, and exclusive festival discounts at the end of your billing cycle.
                </p>
              </div>

              {cancelConfirmed ? (
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-bold text-center">
                  Membership Cancelled. Status updated to Inactive.
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="w-1/2 py-3 rounded-xl border border-theme-border dark:border-slate-800 font-bold text-xs hover:bg-page dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Keep Membership
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-1/2 py-3 rounded-xl bg-rose-500 text-white font-black text-xs hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    Confirm Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
