import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { OnboardingProvider, useOnboarding } from '../../context/SellerOnboardingContext';
import { SellerUIProvider, useSellerUI } from '../../context/SellerUIContext';
import {
  getStoredSellerAuth,
  isSellerSessionValid,
  clearSellerAuth,
  restoreSellerSession,
  SELLER_AUTH_BYPASS,
  ensureDevSellerBypass,
} from '../../services/sellerAuthService';
import PageSkeleton from '../../components/seller/PageSkeleton';
import OnboardingStepGuard from '../../components/seller/OnboardingStepGuard';
import {
  getPostLoginRedirect,
  isApproved,
  isVerificationPending,
  getLastIncompleteStepPath,
} from '../../utils/sellerRouteUtils';

const SellerWelcome = lazy(() => import('./Welcome'));
const SellerLanding = lazy(() => import('./Landing'));
const SellerLogin = lazy(() => import('./Login'));
const SellerRegister = lazy(() => import('./Register'));
const BasicInformation = lazy(() => import('./BasicInformation'));
const BusinessInformation = lazy(() => import('./BusinessInformation'));
const Address = lazy(() => import('./Address'));
const Delivery = lazy(() => import('./Delivery'));
const Documents = lazy(() => import('./Documents'));
const Bank = lazy(() => import('./Bank'));
const Tax = lazy(() => import('./Tax'));
const OnboardingFee = lazy(() => import('./OnboardingFee'));
const Membership = lazy(() => import('./Membership'));
const Review = lazy(() => import('./Review'));
const Submitted = lazy(() => import('./Submitted'));
const PaymentSuccess = lazy(() => import('./PaymentSuccess'));
const TermsAndConditions = lazy(() => import('./TermsAndConditions'));
const Pricing = lazy(() => import('./Pricing'));
const SellerErrorPage = lazy(() => import('./errors/SellerErrorPage'));
const DashboardLayout = lazy(() => import('../../components/seller/DashboardLayout'));
const DashboardHome = lazy(() => import('./dashboard/DashboardHome'));
const OnboardingDashboard = lazy(() => import('./dashboard/OnboardingDashboard'));
const LazyOrders = lazy(() => import('./dashboard/OrdersPage'));
const LazyProducts = lazy(() => import('./dashboard/ProductsPage'));
const LazyInventory = lazy(() => import('./dashboard/InventoryPage'));
const LazyCustomers = lazy(() => import('./dashboard/CustomersPage'));
const LazyMarketing = lazy(() => import('./dashboard/MarketingPage'));
const LazyMarketingReview = lazy(() => import('./dashboard/marketing/MarketingReviewPage'));
const LazyMarketingScheduler = lazy(() => import('./dashboard/marketing/MarketingSchedulerPage'));
const LazyMarketingAnalytics = lazy(() => import('./dashboard/marketing/MarketingAnalyticsPage'));
const LazyMarketingReports = lazy(() => import('./dashboard/marketing/MarketingReportsPage'));
const LazyMarketingBilling = lazy(() => import('./dashboard/marketing/MarketingBillingPage'));
const LazyMarketingNotifications = lazy(() => import('./dashboard/marketing/MarketingNotificationsPage'));
const LazyAnalytics = lazy(() => import('./dashboard/AnalyticsPage'));
const LazyWallet = lazy(() => import('./dashboard/WalletPage'));
const LazyPayments = lazy(() => import('./dashboard/PaymentsPage'));
const LazyInvoices = lazy(() => import('./dashboard/InvoicesPage'));
const LazyReports = lazy(() => import('./dashboard/ReportsPage'));
const LazyCoupons = lazy(() => import('./dashboard/CouponsPage'));
const LazyStoreSettings = lazy(() => import('./dashboard/StoreSettingsPage'));
const LazyDocuments = lazy(() => import('./dashboard/DocumentsPage'));
const SupportLayout = lazy(() => import('./dashboard/SupportLayout'));
const HelpCenter = lazy(() => import('./dashboard/HelpCenter'));
const LazySupport = lazy(() => import('./dashboard/SupportPage'));
const ProfileSettingsLayout = lazy(() => import('./dashboard/ProfileSettingsLayout'));
const ProductsLayout = lazy(() => import('./dashboard/ProductsLayout'));
const OrdersLayout = lazy(() => import('./dashboard/OrdersLayout'));
const WalletLayout = lazy(() => import('./dashboard/WalletLayout'));
const MarketingLayout = lazy(() => import('./dashboard/MarketingLayout'));
const AnalyticsLayout = lazy(() => import('./dashboard/AnalyticsLayout'));
const LazySaathPackOrders = lazy(() => import('./dashboard/SaathPackOrdersPage'));

import { SellerProfilePlaceholder, BankDetailsPlaceholder, AccountSettingsPlaceholder } from './dashboard/ProfilePlaceholders';
import { SettlementsPlaceholder, WithdrawalsPlaceholder, StatementPlaceholder } from './dashboard/WalletPlaceholders';
import { SalesAnalyticsPlaceholder, OrdersAnalyticsPlaceholder, ProductsAnalyticsPlaceholder, CustomersAnalyticsPlaceholder, FinancialAnalyticsPlaceholder } from './dashboard/AnalyticsPlaceholders';

const BrandingStorePage = lazy(() => import('./dashboard/BrandingStorePage'));
const WelcomeKitPage = lazy(() => import('./dashboard/WelcomeKitPage'));
const PublicBranding = lazy(() => import('./Branding'));

function SuspenseWrap({ children }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (SELLER_AUTH_BYPASS) {
      ensureDevSellerBypass();
      setReady(true);
      return;
    }

    const session = restoreSellerSession();

    if (!session) {
      const raw = getStoredSellerAuth();
      if (raw && !isSellerSessionValid(raw)) {
        clearSellerAuth();
        setSessionExpired(true);
        return;
      }
      navigate('/seller/login', { replace: true, state: { from: window.location.pathname } });
      return;
    }

    setReady(true);
  }, [navigate]);

  if (sessionExpired) return <SellerErrorPage type="session-expired" />;
  if (!ready) return <PageSkeleton />;
  return children;
}

function OnboardingRoute({ children }) {
  return (
    <RequireAuth>
      <OnboardingGuard>
        <OnboardingStepGuard>{children}</OnboardingStepGuard>
      </OnboardingGuard>
    </RequireAuth>
  );
}

function OfflineGuard({ children }) {
  const { isOnline } = useSellerUI();
  if (!isOnline) return <SellerErrorPage type="offline" />;
  return children;
}

function OnboardingGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useOnboarding();
  const applicationStatus = data?.status;

  useEffect(() => {
    const auth = restoreSellerSession() || getStoredSellerAuth();
    if (isApproved(data, auth?.seller)) {
      navigate('/seller/dashboard', { replace: true });
      return;
    }
    if (isVerificationPending(data, auth?.seller) && location.pathname !== '/seller/submitted') {
      navigate('/seller/submitted', { replace: true });
    }
  }, [data, applicationStatus, navigate, location.pathname]);

  const auth = getStoredSellerAuth();
  if (isApproved(data, auth?.seller)) return null;
  if (isVerificationPending(data, auth?.seller) && location.pathname !== '/seller/submitted') return null;

  return children;
}

function DashboardGuard({ children }) {
  const navigate = useNavigate();
  const { data } = useOnboarding();
  const applicationStatus = data?.status;

  useEffect(() => {
    if (SELLER_AUTH_BYPASS) {
      ensureDevSellerBypass();
      return;
    }
    const auth = restoreSellerSession() || getStoredSellerAuth();
    if (!isApproved(data, auth?.seller)) {
      if (isVerificationPending(data, auth?.seller)) {
        navigate('/seller/submitted', { replace: true });
      } else {
        navigate(getLastIncompleteStepPath(data), { replace: true });
      }
    }
  }, [data, applicationStatus, navigate]);

  if (SELLER_AUTH_BYPASS) return children;

  const auth = getStoredSellerAuth();
  if (!isApproved(data, auth?.seller)) return <PageSkeleton />;
  return children;
}

function GuestRedirect() {
  const navigate = useNavigate();
  const { data } = useOnboarding();
  const applicationStatus = data?.status;

  useEffect(() => {
    if (SELLER_AUTH_BYPASS) {
      ensureDevSellerBypass();
      navigate('/seller/dashboard', { replace: true });
      return;
    }
    const session = restoreSellerSession();
    if (session && isSellerSessionValid(session)) {
      const dest = getPostLoginRedirect(data, session.seller);
      navigate(dest, { replace: true });
    }
  }, [data, applicationStatus, navigate]);

  return null;
}

function DashboardLayoutWrapper({ onLogout }) {
  const auth = getStoredSellerAuth();
  return <DashboardLayout seller={auth?.seller} onLogout={onLogout} />;
}

export default function SellerRoutes() {
  const navigate = useNavigate();

  // Hydrate/refresh persisted session before first paint of guards
  useState(() => {
    if (SELLER_AUTH_BYPASS) ensureDevSellerBypass();
    else restoreSellerSession();
    return true;
  });

  const handleLogout = () => {
    if (SELLER_AUTH_BYPASS) {
      ensureDevSellerBypass();
      navigate('/seller/dashboard', { replace: true });
      return;
    }
    clearSellerAuth();
    navigate('/seller/login', { replace: true });
  };

  // Always read live storage so login/logout updates sellerId for OnboardingProvider
  const auth = getStoredSellerAuth();
  const sellerId = auth?.seller?.id;

  return (
    <OnboardingProvider sellerId={sellerId}>
      <SellerUIProvider>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route
            path="/seller"
            element={<Navigate to={SELLER_AUTH_BYPASS ? '/seller/dashboard' : '/seller/welcome'} replace />}
          />
          <Route path="/seller/welcome" element={<><GuestRedirect /><SellerWelcome /></>} />
          <Route path="/seller/hub" element={<><GuestRedirect /><SellerLanding /></>} />
          <Route path="/seller/login" element={<><GuestRedirect /><SellerLogin /></>} />
          <Route
            path="/seller/register"
            element={
              SELLER_AUTH_BYPASS ? <Navigate to="/seller/dashboard" replace /> : <SellerRegister />
            }
          />
          <Route path="/seller/terms" element={<TermsAndConditions />} />
          <Route path="/seller/pricing" element={<Pricing />} />
          <Route path="/seller/branding" element={<PublicBranding />} />
          <Route path="/seller/session-expired" element={<SellerErrorPage type="session-expired" />} />
          <Route path="/seller/offline" element={<SellerErrorPage type="offline" />} />
          <Route path="/seller/forbidden" element={<SellerErrorPage type="403" />} />
          <Route path="/seller/error" element={<SellerErrorPage type="500" />} />

          <Route path="/seller/basic-information" element={<OnboardingRoute><BasicInformation /></OnboardingRoute>} />
          <Route path="/seller/business-information" element={<OnboardingRoute><BusinessInformation /></OnboardingRoute>} />
          <Route path="/seller/address" element={<OnboardingRoute><Address /></OnboardingRoute>} />
          <Route path="/seller/delivery" element={<OnboardingRoute><Delivery /></OnboardingRoute>} />
          <Route path="/seller/documents" element={<OnboardingRoute><Documents /></OnboardingRoute>} />
          <Route path="/seller/bank" element={<OnboardingRoute><Bank /></OnboardingRoute>} />
          <Route path="/seller/tax" element={<OnboardingRoute><Tax /></OnboardingRoute>} />
          <Route path="/seller/onboarding-fee" element={<OnboardingRoute><OnboardingFee /></OnboardingRoute>} />
          <Route path="/seller/membership" element={<RequireAuth><OnboardingStepGuard><Membership mode="onboarding" /></OnboardingStepGuard></RequireAuth>} />
          <Route path="/seller/payment-success" element={<OnboardingRoute><PaymentSuccess /></OnboardingRoute>} />
          <Route path="/seller/review" element={<OnboardingRoute><Review /></OnboardingRoute>} />
          <Route path="/seller/submitted" element={<RequireAuth><Submitted /></RequireAuth>} />

          <Route
            path="/seller/dashboard"
            element={
              <RequireAuth>
                <OfflineGuard>
                  <DashboardGuard>
                    <DashboardLayoutWrapper onLogout={handleLogout} />
                  </DashboardGuard>
                </OfflineGuard>
              </RequireAuth>
            }
          >
            <Route index element={<SuspenseWrap><DashboardHome /></SuspenseWrap>} />
            
            <Route path="orders" element={<SuspenseWrap><OrdersLayout /></SuspenseWrap>}>
              <Route path="list" element={<SuspenseWrap><LazyOrders /></SuspenseWrap>} />
              <Route path="saathpack" element={<SuspenseWrap><LazySaathPackOrders /></SuspenseWrap>} />
              <Route path="invoices" element={<SuspenseWrap><LazyInvoices /></SuspenseWrap>} />
            </Route>

            <Route path="products" element={<SuspenseWrap><ProductsLayout /></SuspenseWrap>}>
              <Route path="catalogue" element={<SuspenseWrap><LazyProducts /></SuspenseWrap>} />
              <Route path="inventory" element={<SuspenseWrap><LazyInventory /></SuspenseWrap>} />
            </Route>

            <Route path="customers" element={<SuspenseWrap><LazyCustomers /></SuspenseWrap>} />
            
            <Route path="marketing" element={<SuspenseWrap><MarketingLayout /></SuspenseWrap>}>
              <Route path="overview" element={<SuspenseWrap><LazyMarketing /></SuspenseWrap>} />
              <Route path="coupons" element={<SuspenseWrap><LazyCoupons /></SuspenseWrap>} />
              <Route path="promotions" element={<SuspenseWrap><LazyCoupons /></SuspenseWrap>} />
              <Route path="campaigns" element={<SuspenseWrap><LazyCoupons /></SuspenseWrap>} />
              <Route path="review" element={<SuspenseWrap><LazyMarketingReview /></SuspenseWrap>} />
              <Route path="scheduler" element={<SuspenseWrap><LazyMarketingScheduler /></SuspenseWrap>} />
              <Route path="analytics" element={<SuspenseWrap><LazyMarketingAnalytics /></SuspenseWrap>} />
              <Route path="reports" element={<SuspenseWrap><LazyMarketingReports /></SuspenseWrap>} />
              <Route path="billing" element={<SuspenseWrap><LazyMarketingBilling /></SuspenseWrap>} />
              <Route path="notifications" element={<SuspenseWrap><LazyMarketingNotifications /></SuspenseWrap>} />
            </Route>
            
            <Route path="analytics" element={<SuspenseWrap><AnalyticsLayout /></SuspenseWrap>}>
              <Route path="overview" element={<SuspenseWrap><LazyAnalytics /></SuspenseWrap>} />
              <Route path="reports" element={<SuspenseWrap><LazyReports /></SuspenseWrap>} />
              <Route path="sales" element={<SuspenseWrap><SalesAnalyticsPlaceholder /></SuspenseWrap>} />
              <Route path="orders" element={<SuspenseWrap><OrdersAnalyticsPlaceholder /></SuspenseWrap>} />
              <Route path="products" element={<SuspenseWrap><ProductsAnalyticsPlaceholder /></SuspenseWrap>} />
              <Route path="customers" element={<SuspenseWrap><CustomersAnalyticsPlaceholder /></SuspenseWrap>} />
              <Route path="financial" element={<SuspenseWrap><FinancialAnalyticsPlaceholder /></SuspenseWrap>} />
            </Route>
            
            <Route path="wallet" element={<SuspenseWrap><WalletLayout /></SuspenseWrap>}>
              <Route path="overview" element={<SuspenseWrap><LazyWallet /></SuspenseWrap>} />
              <Route path="transactions" element={<SuspenseWrap><LazyPayments /></SuspenseWrap>} />
              <Route path="settlements" element={<SuspenseWrap><SettlementsPlaceholder /></SuspenseWrap>} />
              <Route path="withdrawals" element={<SuspenseWrap><WithdrawalsPlaceholder /></SuspenseWrap>} />
              <Route path="statement" element={<SuspenseWrap><StatementPlaceholder /></SuspenseWrap>} />
            </Route>
            
            <Route path="profile" element={<SuspenseWrap><ProfileSettingsLayout /></SuspenseWrap>}>
              <Route path="seller" element={<SuspenseWrap><SellerProfilePlaceholder /></SuspenseWrap>} />
              <Route path="store" element={<SuspenseWrap><LazyStoreSettings /></SuspenseWrap>} />
              <Route path="onboarding" element={<SuspenseWrap><OnboardingDashboard /></SuspenseWrap>} />
              <Route path="documents" element={<SuspenseWrap><LazyDocuments /></SuspenseWrap>} />
              <Route path="bank" element={<SuspenseWrap><BankDetailsPlaceholder /></SuspenseWrap>} />
              <Route path="account" element={<SuspenseWrap><AccountSettingsPlaceholder /></SuspenseWrap>} />
            </Route>

            <Route path="payments" element={<Navigate to="../wallet" replace />} />
            <Route path="invoices" element={<Navigate to="../orders" replace />} />
            <Route path="reports" element={<Navigate to="../analytics" replace />} />
            <Route path="coupons" element={<Navigate to="../marketing" replace />} />
            <Route path="onboarding" element={<Navigate to="../profile/onboarding" replace />} />
            <Route path="settings" element={<Navigate to="../profile/store" replace />} />
            <Route path="documents" element={<Navigate to="../profile/documents" replace />} />

            <Route path="membership" element={<SuspenseWrap><Membership mode="dashboard" /></SuspenseWrap>} />
            <Route path="welcome-kit" element={<SuspenseWrap><WelcomeKitPage /></SuspenseWrap>} />
            <Route path="branding" element={<SuspenseWrap><BrandingStorePage /></SuspenseWrap>} />
            <Route path="support" element={<SuspenseWrap><SupportLayout /></SuspenseWrap>}>
              <Route path="help-center" element={<SuspenseWrap><HelpCenter /></SuspenseWrap>} />
              <Route path="tickets" element={<SuspenseWrap><LazySupport /></SuspenseWrap>} />
              <Route index element={<Navigate to="help-center" replace />} />
            </Route>
          </Route>

          <Route path="/seller/*" element={<SellerErrorPage type="404" />} />
        </Routes>
      </Suspense>
      </SellerUIProvider>
    </OnboardingProvider>
  );
}
