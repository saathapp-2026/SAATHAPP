import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  defaultOnboardingData,
  SELLER_STORAGE_KEYS,
} from '../config/sellerOnboardingConfig';
import { getStoredOnboarding, saveOnboarding, updateSellerStatus } from '../services/sellerAuthService';
import { getStoredMembership, saveMembership } from '../services/sellerMembershipService';
import { calculateOnboardingFeeApi, verifyPayment, sellerVerification } from '../services/sellerApi';

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children, sellerId }) {
  const [data, setData] = useState(() => {
    const stored = getStoredOnboarding();
    const membership = getStoredMembership();
    const base = stored
      ? {
          ...defaultOnboardingData,
          ...stored,
          meta: { ...defaultOnboardingData.meta, ...(stored.meta || {}) },
          membership: { ...defaultOnboardingData.membership, ...(membership || stored.membership || {}) },
        }
      : { ...defaultOnboardingData };
    if (membership && !stored) {
      base.membership = { ...base.membership, ...membership };
    }
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [feeLoading, setFeeLoading] = useState(false);
  const [feeError, setFeeError] = useState(null);

  useEffect(() => {
    saveOnboarding(data);
  }, [data]);

  const updateSection = useCallback((section, values) => {
    setData((prev) => {
      const next = {
        ...prev,
        [section]: section === 'meta'
          ? { ...(prev.meta || {}), ...values }
          : { ...prev[section], ...values },
      };
      if (section === 'membership') {
        saveMembership(next.membership);
      }
      return next;
    });
  }, []);

  const calculateFee = useCallback(async () => {
    setFeeLoading(true);
    setFeeError(null);
    try {
      const result = await calculateOnboardingFeeApi(data);
      updateSection('onboardingFee', {
        calculatedFee: result.fee,
        breakdown: result,
        renewalAmount: result.renewalAmount,
      });
      return result;
    } catch (err) {
      setFeeError('Failed to calculate onboarding fee. Please try again.');
      throw err;
    } finally {
      setFeeLoading(false);
    }
  }, [data, updateSection]);

  const processPayment = useCallback(async (paymentResult) => {
    setSaving(true);
    try {
      const verified = await verifyPayment(paymentResult.paymentId);
      updateSection('onboardingFee', {
        paymentStatus: 'paid',
        paymentId: verified.paymentId,
        paidAt: verified.paidAt,
        validityStart: verified.validityStart,
        validityEnd: verified.validityEnd,
      });
      return verified;
    } finally {
      setSaving(false);
    }
  }, [updateSection]);

  const submitOnboarding = useCallback(async () => {
    setSaving(true);
    try {
      const result = await sellerVerification(sellerId, data.documents);
      setData((prev) => ({ ...prev, status: 'submitted' }));
      if (sellerId) updateSellerStatus(sellerId, 'submitted');
      return result;
    } finally {
      setSaving(false);
    }
  }, [sellerId, data.documents]);

  const approveApplication = useCallback(() => {
    setData((prev) => ({ ...prev, status: 'approved' }));
    if (sellerId) updateSellerStatus(sellerId, 'approved');
  }, [sellerId]);

  const resetOnboarding = useCallback(() => {
    setData({ ...defaultOnboardingData });
    localStorage.removeItem(SELLER_STORAGE_KEYS.onboarding);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        data,
        setData,
        updateSection,
        calculateFee,
        processPayment,
        submitOnboarding,
        approveApplication,
        resetOnboarding,
        saving,
        feeLoading,
        feeError,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
