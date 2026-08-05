import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, ArrowRight, SkipForward, Shield } from 'lucide-react';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import MembershipPlanCard from '../../components/seller/MembershipPlanCard';
import MembershipFeatureComparison from '../../components/seller/MembershipFeatureComparison';
import MembershipWelcomeKit from '../../components/seller/MembershipWelcomeKit';
import BrandingStore from '../../components/seller/BrandingStore';
import ActionBanner from '../../components/seller/ActionBanner';
import InvoicePreviewModal from '../../components/seller/InvoicePreviewModal';
import MembershipPaymentModal from '../../components/seller/MembershipPaymentModal';
import BrandingRequestsList from '../../components/seller/BrandingRequestsList';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import {
  getMembershipPlans,
  getPlanById,
  processMembershipPayment,
  cancelMembership,
  renewMembership,
  downgradeMembership,
  downloadInvoice,
  getBrandingRequests,
  getStoredMembership,
} from '../../services/sellerMembershipService';
import { getStoredSellerAuth } from '../../services/sellerAuthService';
import DashboardBreadcrumbs from '../../components/seller/DashboardBreadcrumbs';
import { ExportReportButton } from '../../components/seller/export';

const PLAN_RANK = { free: 0, starter: 1, growth: 2, enterprise: 3 };

export default function Membership({ mode = 'onboarding' }) {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const plans = getMembershipPlans();
  const [selectedPlan, setSelectedPlan] = useState(data.membership?.planId || 'free');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('plans');
  const [banner, setBanner] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [brandingRequests, setBrandingRequests] = useState(getBrandingRequests());

  const isOnboarding = mode === 'onboarding';
  const planVariant = isOnboarding ? 'dark' : 'light';
  const membership = data.membership;

  useEffect(() => {
    const stored = getStoredMembership();
    if (stored) {
      updateSection('membership', stored);
      setSelectedPlan(stored.planId || 'free');
    }
    // Hydrate membership from storage once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSuccess = (message, title = 'Success') => {
    setBanner({ type: 'success', title, message });
    setTimeout(() => setBanner(null), 5000);
  };

  const handleSubscribeClick = () => {
    const plan = getPlanById(selectedPlan);
    const currentRank = PLAN_RANK[membership?.planId || 'free'] ?? 0;
    const newRank = PLAN_RANK[selectedPlan] ?? 0;

    if (membership?.subscribed && newRank < currentRank) {
      handleDowngrade();
      return;
    }
    if (plan.price > 0) {
      setShowPayment(true);
    } else {
      handlePaymentComplete('free');
    }
  };

  const handleDowngrade = async () => {
    if (!window.confirm(`Downgrade to ${getPlanById(selectedPlan).name} plan?`)) return;
    setLoading(true);
    try {
      const auth = getStoredSellerAuth();
      const result = await downgradeMembership({ sellerId: auth?.seller?.id, planId: selectedPlan });
      updateSection('membership', result.membership);
      setSelectedPlan(result.membership.planId);
      showSuccess(result.message, 'Plan Updated');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = async (paymentMethod) => {
    setShowPayment(false);
    setLoading(true);
    try {
      const auth = getStoredSellerAuth();
      const shippingAddress = data.address
        ? `${data.address.address}, ${data.address.city}, ${data.address.state} - ${data.address.pincode}`
        : null;

      const result = await processMembershipPayment({
        sellerId: auth?.seller?.id,
        planId: selectedPlan,
        paymentMethod,
        shippingAddress,
      });

      updateSection('membership', result.membership);
      showSuccess(result.message);

      if (isOnboarding) {
        setTimeout(() => navigate('/seller/review'), 1500);
      }
    } catch {
      setBanner({ type: 'error', title: 'Payment Failed', message: 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    updateSection('membership', { planId: 'free', planName: 'Free', subscribed: false });
    navigate(isOnboarding ? '/seller/review' : '/seller/dashboard');
  };

  const handleCancel = async () => {
    if (!window.confirm('Cancel your membership? You will revert to the Free plan.')) return;
    setLoading(true);
    try {
      const auth = getStoredSellerAuth();
      const result = await cancelMembership(auth?.seller?.id);
      updateSection('membership', result.membership);
      setSelectedPlan('free');
      showSuccess(result.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async () => {
    setLoading(true);
    try {
      const auth = getStoredSellerAuth();
      const planId = membership?.planId || selectedPlan;
      const result = await renewMembership({ sellerId: auth?.seller?.id, planId });
      updateSection('membership', result.membership);
      showSuccess(result.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (invoiceId) => {
    const result = await downloadInvoice(invoiceId);
    if (result.success) {
      setInvoice(result);
    }
  };

  const refreshBrandingRequests = () => {
    setBrandingRequests(getBrandingRequests());
  };

  const tabs = [
    { id: 'plans', label: 'Plans' },
    { id: 'compare', label: 'Compare Features' },
    { id: 'welcome-kit', label: 'Welcome Kit' },
    { id: 'branding', label: 'Branding Store' },
    { id: 'requests', label: `Requests (${brandingRequests.length})` },
  ];

  const headerNotice = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`rounded-xl p-4 space-y-2 ${
        isOnboarding
          ? 'bg-violet-500/10 border border-violet-500/30'
          : 'bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30'
      }`}
    >
      <div className={`flex items-center gap-2 text-sm font-medium ${isOnboarding ? 'text-violet-300' : 'text-violet-600 dark:text-violet-400'}`}>
        <Crown size={16} />
        Monthly Seller Membership — Completely Optional
      </div>
      <p className={`text-sm leading-relaxed ${isOnboarding ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
        Upgrade anytime for premium billing, analytics, inventory, reports, and dedicated support.
      </p>
      <div className={`flex items-start gap-2 text-xs p-3 rounded-lg ${isOnboarding ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20'}`}>
        <Shield size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <span className={isOnboarding ? 'text-amber-200/90' : 'text-amber-700 dark:text-amber-300'}>
          Membership never blocks seller registration. Onboarding Fee and Membership are independent.
        </span>
      </div>
    </motion.div>
  );

  const currentPlanBanner = membership?.subscribed && (
    <div className={`rounded-xl p-4 flex items-center justify-between ${isOnboarding ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30'}`}>
      <div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Active Plan</p>
        <p className="font-bold text-lg">{membership.planName}</p>
        {membership.validUntil && (
          <p className="text-xs text-slate-500">
            Renews {new Date(membership.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        )}
      </div>
      <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">Active</span>
    </div>
  );

  const tabNav = (
    <div className={`flex flex-wrap gap-2 p-1 rounded-xl ${isOnboarding ? 'bg-white/5' : 'bg-slate-100 dark:bg-slate-800'}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? isOnboarding ? 'bg-violet-500 text-white' : 'bg-white dark:bg-slate-900 text-violet-600 shadow-sm'
              : isOnboarding ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const plansSection = (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map((plan, i) => (
          <MembershipPlanCard
            key={plan.id}
            plan={plan}
            selected={selectedPlan}
            onSelect={setSelectedPlan}
            index={i}
            variant={planVariant}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleSubscribeClick}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg shadow-violet-500/20"
        >
          {loading ? 'Processing...' : selectedPlan === 'free'
            ? 'Continue with Free Plan'
            : `${membership?.subscribed ? 'Switch to' : 'Subscribe to'} ${plans.find((p) => p.id === selectedPlan)?.name}`}
          <ArrowRight size={18} />
        </button>
        {isOnboarding && (
          <button type="button" onClick={handleSkip} className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-medium transition-colors ${isOnboarding ? 'bg-white/10 border border-white/20 text-white hover:bg-white/15' : 'bg-slate-100 dark:bg-slate-800'}`}>
            <SkipForward size={16} />
            Skip for Now
          </button>
        )}
        {!isOnboarding && membership?.subscribed && (
          <>
            <button type="button" onClick={handleRenew} disabled={loading} className="py-3.5 px-6 rounded-xl border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Renew
            </button>
            <button type="button" onClick={handleCancel} disabled={loading} className="py-3.5 px-6 rounded-xl border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-colors">
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );

  const paymentHistorySection = membership?.paymentHistory?.length > 0 && (
    <div className={`rounded-2xl border p-6 ${planVariant === 'light' ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' : 'bg-white/5 border-white/10'}`}>
      <h3 className="font-bold mb-4">Payment History</h3>
      <div className="space-y-2">
        {membership.paymentHistory.map((p) => (
          <div key={p.id} className="flex items-center justify-between text-sm py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div>
              <p className="font-medium">{p.planName} — <span className="capitalize text-slate-500">{p.type}</span></p>
              <p className="text-xs text-slate-500">{new Date(p.paidAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-emerald-600">₹{p.amount?.toLocaleString('en-IN')}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">{p.status || 'paid'}</span>
              {p.invoiceId && (
                <button type="button" onClick={() => handleDownloadInvoice(p.invoiceId)} className="text-xs text-violet-500 hover:text-violet-600 font-medium underline">
                  Invoice
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const content = (
    <div className="space-y-6">
      <ActionBanner banner={banner} onDismiss={() => setBanner(null)} />
      {headerNotice}
      {currentPlanBanner}
      {tabNav}

      {activeTab === 'plans' && plansSection}
      {activeTab === 'compare' && <MembershipFeatureComparison variant={planVariant} />}
      {activeTab === 'welcome-kit' && <MembershipWelcomeKit variant={planVariant} />}
      {activeTab === 'branding' && <BrandingStore variant={planVariant} onRequestSubmitted={refreshBrandingRequests} />}
      {activeTab === 'requests' && <BrandingRequestsList requests={brandingRequests} variant={planVariant} />}

      {paymentHistorySection}
    </div>
  );

  return (
    <>
      {showPayment && (
        <MembershipPaymentModal
          planId={selectedPlan}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentComplete}
        />
      )}
      <InvoicePreviewModal invoice={invoice} onClose={() => setInvoice(null)} />

      {isOnboarding ? (
        <OnboardingLayout title="Monthly Seller Membership" subtitle="Optional premium SaaS subscription" showStepper>
          {content}
        </OnboardingLayout>
      ) : (
        <div className="space-y-6">
          <DashboardBreadcrumbs />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Seller Membership</h1>
              <p className="text-slate-500 text-sm">Optional premium tools — upgrade, downgrade, or cancel anytime</p>
            </div>
            <ExportReportButton moduleKey="membership" />
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
            {content}
          </div>
          <Link to="/seller/dashboard" className="text-sm text-emerald-500 hover:text-emerald-600">
            ← Back to Dashboard
          </Link>
        </div>
      )}
    </>
  );
}
