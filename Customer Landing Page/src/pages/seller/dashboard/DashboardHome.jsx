import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingCart,
  IndianRupee,
  TrendingUp,
  Boxes,
  Users,
  Megaphone,
  BarChart3,
  Wallet,
  CreditCard,
  Receipt,
  FileBarChart,
  Ticket,
  Monitor,
  FolderOpen,
  Settings,
  HelpCircle,
} from 'lucide-react';
import OnboardingStatusCard from '../../../components/seller/OnboardingStatusCard';
import MembershipStatusCard from '../../../components/seller/MembershipStatusCard';
import WelcomeKitTracking from '../../../components/seller/WelcomeKitTracking';
import ActionBanner from '../../../components/seller/ActionBanner';
import InvoicePreviewModal from '../../../components/seller/InvoicePreviewModal';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';
import { ExportReportButton } from '../../../components/seller/export';
import { useOnboarding } from '../../../context/SellerOnboardingContext';
import { renewSeller } from '../../../services/sellerApi';
import {
  renewMembership,
  cancelMembership,
  downloadInvoice,
} from '../../../services/sellerMembershipService';
import { getStoredSellerAuth } from '../../../services/sellerAuthService';
import { getOrders } from '../../../services/seller/sellerOrdersService';
import { getProducts } from '../../../services/seller/sellerProductsService';
import { getHubSummary } from '../../../services/seller/sellerHubModulesService';

const QUICK_LINKS = [
  { to: '/seller/dashboard/orders', label: 'Orders', icon: ShoppingCart, color: 'text-blue-500' },
  { to: '/seller/dashboard/products', label: 'Products', icon: Package, color: 'text-purple-500' },
  { to: '/seller/dashboard/inventory', label: 'Inventory', icon: Boxes, color: 'text-sky-500' },
  { to: '/seller/dashboard/customers', label: 'Customers', icon: Users, color: 'text-emerald-500' },
  { to: '/seller/dashboard/marketing', label: 'Marketing', icon: Megaphone, color: 'text-orange-500' },
  { to: '/seller/dashboard/analytics', label: 'Analytics', icon: BarChart3, color: 'text-indigo-500' },
  { to: '/seller/dashboard/wallet', label: 'Wallet', icon: Wallet, color: 'text-teal-500' },
  { to: '/seller/dashboard/payments', label: 'Payments', icon: CreditCard, color: 'text-cyan-500' },
  { to: '/seller/dashboard/invoices', label: 'Invoices', icon: Receipt, color: 'text-rose-500' },
  { to: '/seller/dashboard/reports', label: 'Reports', icon: FileBarChart, color: 'text-amber-500' },
  { to: '/seller/dashboard/coupons', label: 'Coupons', icon: Ticket, color: 'text-pink-500' },
  { to: '/seller/dashboard/documents', label: 'Documents', icon: FolderOpen, color: 'text-lime-500' },
  { to: '/seller/dashboard/settings', label: 'Settings', icon: Settings, color: 'text-slate-500' },
  { to: '/seller/dashboard/support', label: 'Support', icon: HelpCircle, color: 'text-red-500' },
];

export default function DashboardHome() {
  const { data, updateSection } = useOnboarding();
  const [renewing, setRenewing] = useState(false);
  const [banner, setBanner] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [stats, setStats] = useState([
    { label: 'Total Orders', value: '—', icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Products', value: '—', icon: Package, color: 'text-purple-500' },
    { label: 'Revenue', value: '—', icon: IndianRupee, color: 'text-emerald-500' },
    { label: 'Growth', value: '—', icon: TrendingUp, color: 'text-amber-500' },
  ]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [ordersRes, products, wallet] = await Promise.all([
          getOrders({ page: 1, pageSize: 1 }),
          getProducts({ page: 1, pageSize: 1 }),
          getHubSummary('wallet'),
        ]);
        if (cancelled) return;
        const revenueCard = (wallet.data || []).find((c) => c.key === 'balance');
        setStats([
          {
            label: 'Total Orders',
            value: String(ordersRes.meta?.total ?? '—'),
            icon: ShoppingCart,
            color: 'text-blue-500',
          },
          {
            label: 'Products',
            value: String(products.meta?.total ?? '—'),
            icon: Package,
            color: 'text-purple-500',
          },
          {
            label: 'Wallet Balance',
            value: revenueCard?.displayValue || '₹0',
            icon: IndianRupee,
            color: 'text-emerald-500',
          },
          {
            label: 'Growth',
            value: '+12%',
            icon: TrendingUp,
            color: 'text-amber-500',
          },
        ]);
      } catch {
        // keep defaults
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome to your Seller Hub</p>
        </div>
        <ExportReportButton moduleKey="dashboard" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }, i) => (
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
        <h3 className="font-bold mb-3">Quick Links</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {QUICK_LINKS.map(({ to, label, icon: Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Icon size={16} className={color} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
