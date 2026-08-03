import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import { getOnboardingRedirectPath } from '../../utils/sellerOnboardingGuards';
import PageSkeleton from './PageSkeleton';

export default function OnboardingStepGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, updateSection } = useOnboarding();
  const redirect = getOnboardingRedirectPath(location.pathname, data);

  useEffect(() => {
    if (redirect && redirect !== location.pathname) {
      navigate(redirect, { replace: true });
      return;
    }
    if (data.meta?.lastVisitedStep !== location.pathname) {
      updateSection('meta', { lastVisitedStep: location.pathname });
    }
  }, [redirect, location.pathname, navigate, updateSection, data.meta?.lastVisitedStep]);

  if (redirect && redirect !== location.pathname) {
    return <PageSkeleton />;
  }

  return children;
}
