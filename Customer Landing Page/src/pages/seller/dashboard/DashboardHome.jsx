import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, IndianRupee, TrendingUp } from 'lucide-react';
import OnboardingStatusCard from '../../../components/seller/OnboardingStatusCard';
import MembershipStatusCard from '../../../components/seller/MembershipStatusCard';
import WelcomeKitTracking from '../../../components/seller/WelcomeKitTracking';
import ActionBanner from '../../../components/seller/ActionBanner';
import InvoicePreviewModal from '../../../components/seller/InvoicePreviewModal';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';
import { useOnboarding } from '../../../context/SellerOnboardingContext';
import { renewSeller } from '../../../services/sellerApi';
import {
  renewMembership,
  cancelMembership,
  downloadInvoice,
} from '../../../services/sellerMembershipService';
import { getStoredSellerAuth } from '../../../services/sellerAuthService';

const STATS = [
  { label: 'Total Orders', value: '0', icon: ShoppingCart, color: 'text-blue-500' },
  { label: 'Products', value: '0', icon: Package, color: 'text-purple-500' },
  { label: 'Revenue', value: '₹0', icon: IndianRupee, color: 'text-emerald-500' },
  { label: 'Growth', value: '—', icon: TrendingUp, color: 'text-amber-500' },
];

export default function DashboardHome() {
  const { data, updateSection } = useOnboarding();
  const [renewing, setRenewing] = useState(false);
  const [banner, setBanner] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const showBanner = (type, title, message) => {
    setBanner({ type, title, message });
    setTimeout(() => setBanner(null), 5000);
  };

  const handleOnboardingRenew = async () => {
    const auth = getStoredSellerAuth();
    setRenewing(true);
    try {
      const result = await renewSeller(auth?.seller?.id, data.onboardingFee?.renewalAmount);
      updateSection('onboardingFee', {
        validityStart: result.validityStart,
        validityEnd: result.validityEnd,
        paymentStatus: 'paid',
      });
      showBanner('success', 'Onboarding Renewed', 'Your seller onboarding is active for another 2 years.');
    } catch {
      showBanner('error', 'Renewal Failed', 'Please try again.');
    } finally {
      setRenewing(false);
    }
  };

  const handleMembershipRenew = async () => {
    const auth = getStoredSellerAuth();
    setRenewing(true);
    try {
      const result = await renewMembership({ sellerId: auth?.seller?.id, planId: data.membership?.planId });
      updateSection('membership', result.membership);
      showBanner('success', 'Membership Renewed', result.message);
    } finally {
      setRenewing(false);
    }
  };

  const handleMembershipCancel = async () => {
    if (!window.confirm('Cancel membership and revert to Free plan?')) return;
    const auth = getStoredSellerAuth();
    const result = await cancelMembership(auth?.seller?.id);
    updateSection('membership', result.membership);
    showBanner('info', 'Membership Cancelled', result.message);
  };

  const handleDownloadInvoice = async (invoiceId) => {
    const result = await downloadInvoice(invoiceId);
    if (result.success) setInvoice(result);
  };

  const handleWelcomeKitUpdate = (membership) => {
    updateSection('membership', membership);
  };

  return (
    <div className="space-y-6">
      <ActionBanner banner={banner} onDismiss={() => setBanner(null)} />
      <InvoicePreviewModal invoice={invoice} onClose={() => setInvoice(null)} />

      <DashboardBreadcrumbs />

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-500 text-sm">Welcome to your Seller Hub</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-bold">{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <OnboardingStatusCard
          onboardingFee={data.onboardingFee}
          onRenew={renewing ? undefined : handleOnboardingRenew}
        />
        <MembershipStatusCard
          membership={data.membership}
          onRenew={renewing ? undefined : handleMembershipRenew}
          onCancel={handleMembershipCancel}
          onDownloadInvoice={handleDownloadInvoice}
        />
      </div>

      <WelcomeKitTracking membership={data.membership} onUpdate={handleWelcomeKitUpdate} />

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="font-bold mb-2">Quick Links</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/seller/dashboard/membership" className="text-violet-500 hover:underline">Membership →</Link>
          <Link to="/seller/dashboard/welcome-kit" className="text-amber-500 hover:underline">Welcome Kit →</Link>
          <Link to="/seller/dashboard/branding" className="text-blue-500 hover:underline">Branding Store →</Link>
          <Link to="/seller/dashboard/onboarding" className="text-emerald-500 hover:underline">Onboarding Status →</Link>
        </div>
      </div>
    </div>
  );
}
