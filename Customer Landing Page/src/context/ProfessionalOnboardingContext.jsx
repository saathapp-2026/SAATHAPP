import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  defaultProfessionalOnboardingData,
  PROFESSIONAL_STORAGE_KEYS,
} from '../config/professionalOnboardingConfig';
import {
  getStoredProfessionalOnboarding,
  saveProfessionalOnboarding,
} from '../services/professionalOnboardingService';
import { calculateOnboardingFeeApi, verifyPayment, professionalVerification } from '../services/professionalApi';
import { updatePartnerStatus, getStoredPartners } from '../services/authService';
import {
  getStoredProfessionalMembership,
  saveProfessionalMembership,
  subscribeProfessionalMembership,
} from '../config/professional/membershipPlans';

const ProfessionalOnboardingContext = createContext(null);

export function ProfessionalOnboardingProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = getStoredProfessionalOnboarding();
    const membership = getStoredProfessionalMembership();
    const base = stored
      ? {
          ...defaultProfessionalOnboardingData,
          ...stored,
          accountInfo: { ...defaultProfessionalOnboardingData.accountInfo, ...(stored.accountInfo || {}) },
          serviceLocation: { ...defaultProfessionalOnboardingData.serviceLocation, ...(stored.serviceLocation || {}) },
          documents: { ...defaultProfessionalOnboardingData.documents, ...(stored.documents || {}) },
          onboardingFee: { ...defaultProfessionalOnboardingData.onboardingFee, ...(stored.onboardingFee || {}) },
          membership: { ...defaultProfessionalOnboardingData.membership, ...(membership || stored.membership || {}) },
          meta: { ...defaultProfessionalOnboardingData.meta, ...(stored.meta || {}) },
        }
      : { ...defaultProfessionalOnboardingData };
    if (membership && !stored?.membership) {
      base.membership = { ...base.membership, ...membership };
    }
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [feeLoading, setFeeLoading] = useState(false);
  const [feeError, setFeeError] = useState(null);

  useEffect(() => {
    saveProfessionalOnboarding(data);
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
        saveProfessionalMembership(next.membership);
      }
      return next;
    });
  }, []);

  const setPartnerId = useCallback((partnerId) => {
    updateSection('meta', { partnerId });
  }, [updateSection]);

  const selectMembership = useCallback(async (planId) => {
    const membership = await subscribeProfessionalMembership(planId);
    updateSection('membership', membership);
    return membership;
  }, [updateSection]);

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
    } catch {
      setFeeError('Failed to calculate onboarding fee. Please try again.');
      throw new Error('fee calculation failed');
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
      const partnerId = data.meta?.partnerId;
      const result = await professionalVerification(partnerId, data.documents);
      setData((prev) => ({ ...prev, status: 'submitted' }));
      if (partnerId) {
        const partners = getStoredPartners();
        updatePartnerStatus(partners, partnerId, 'pending');
      }
      return result;
    } finally {
      setSaving(false);
    }
  }, [data.meta?.partnerId, data.documents]);

  const approveApplication = useCallback(() => {
    const partnerId = data.meta?.partnerId;
    setData((prev) => ({ ...prev, status: 'approved' }));
    if (partnerId) {
      const partners = getStoredPartners();
      updatePartnerStatus(partners, partnerId, 'approved');
    }
  }, [data.meta?.partnerId]);

  const resetOnboarding = useCallback(() => {
    setData({ ...defaultProfessionalOnboardingData });
    localStorage.removeItem(PROFESSIONAL_STORAGE_KEYS.onboarding);
    localStorage.removeItem(PROFESSIONAL_STORAGE_KEYS.payment);
    localStorage.removeItem(PROFESSIONAL_STORAGE_KEYS.membership);
  }, []);

  return (
    <ProfessionalOnboardingContext.Provider
      value={{
        data,
        setData,
        updateSection,
        setPartnerId,
        selectMembership,
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
    </ProfessionalOnboardingContext.Provider>
  );
}

export function useProfessionalOnboarding() {
  const ctx = useContext(ProfessionalOnboardingContext);
  if (!ctx) throw new Error('useProfessionalOnboarding must be used within ProfessionalOnboardingProvider');
  return ctx;
}
