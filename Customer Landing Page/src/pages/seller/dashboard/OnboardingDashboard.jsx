import React, { useState } from 'react';
import OnboardingStatusCard from '../../../components/seller/OnboardingStatusCard';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';
import ActionBanner from '../../../components/seller/ActionBanner';
import { useOnboarding } from '../../../context/SellerOnboardingContext';
import { renewSeller } from '../../../services/sellerApi';
import { getStoredSellerAuth } from '../../../services/sellerAuthService';

export default function OnboardingDashboard() {
  const { data, updateSection } = useOnboarding();
  const [renewing, setRenewing] = useState(false);
  const [banner, setBanner] = useState(null);

  const handleRenew = async () => {
    const auth = getStoredSellerAuth();
    setRenewing(true);
    try {
      const result = await renewSeller(auth?.seller?.id, data.onboardingFee?.renewalAmount);
      updateSection('onboardingFee', {
        validityStart: result.validityStart,
        validityEnd: result.validityEnd,
        paymentStatus: 'paid',
      });
      setBanner({ type: 'success', title: 'Onboarding Renewed', message: 'Active for another 2 years.' });
    } catch {
      setBanner({ type: 'error', title: 'Renewal Failed', message: 'Please try again.' });
    } finally {
      setRenewing(false);
    }
  };

  return (
    <div className="space-y-6">
      <ActionBanner banner={banner} onDismiss={() => setBanner(null)} />
      <DashboardBreadcrumbs />
      <div>
        <h1 className="text-2xl font-bold">Seller Onboarding</h1>
        <p className="text-slate-500 text-sm">Your one-time onboarding fee status and validity</p>
      </div>
      <OnboardingStatusCard
        onboardingFee={data.onboardingFee}
        onRenew={renewing ? undefined : handleRenew}
      />
    </div>
  );
}
