import React, { useState } from 'react';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';
import BrandingStore from '../../../components/seller/BrandingStore';
import BrandingRequestsList from '../../../components/seller/BrandingRequestsList';
import ActionBanner from '../../../components/seller/ActionBanner';
import { getBrandingRequests } from '../../../services/sellerMembershipService';

export default function BrandingStorePage() {
  const [requests, setRequests] = useState(getBrandingRequests());
  const [banner, setBanner] = useState(null);

  const handleRequestSubmitted = () => {
    setRequests(getBrandingRequests());
    setBanner({ type: 'success', title: 'Quote Requested', message: 'Our branding team will contact you within 24–48 hours.' });
  };

  return (
    <div className="space-y-6">
      <ActionBanner banner={banner} onDismiss={() => setBanner(null)} />
      <DashboardBreadcrumbs />
      <BrandingStore variant="light" onRequestSubmitted={handleRequestSubmitted} />
      {requests.length > 0 && <BrandingRequestsList requests={requests} variant="light" />}
    </div>
  );
}
