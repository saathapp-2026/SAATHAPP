import {
  calculateOnboardingFee,
  getCommissionRate,
  getRenewalAmount,
  getValidityDates,
} from './professionalOnboardingService';
import { PROFESSIONAL_STORAGE_KEYS } from '../config/professionalOnboardingConfig';

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.saathapp.in/v1';

function delay(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function calculateOnboardingFeeApi(onboardingData) {
  try {
    const res = await fetch(`${API_BASE}/professional/onboarding/calculate-fee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(onboardingData),
    });
    if (!res.ok) throw new Error('API unavailable');
    return res.json();
  } catch {
    await delay();
    return calculateOnboardingFee(onboardingData);
  }
}

export async function getCommissionRateApi(category, onboardingData) {
  try {
    const res = await fetch(`${API_BASE}/professional/commission/${category}`);
    if (!res.ok) throw new Error('API unavailable');
    return res.json();
  } catch {
    await delay(200);
    return getCommissionRate(
      category,
      onboardingData?.serviceLocation?.locationTier,
      onboardingData?.accountInfo?.entityType,
      onboardingData?.accountInfo?.staffCount,
      onboardingData?.accountInfo?.businessScale,
    );
  }
}

export async function createOnboardingPayment({ fee, onboardingData, partnerId }) {
  try {
    const res = await fetch(`${API_BASE}/professional/onboarding/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fee, partnerId, onboardingData }),
    });
    if (!res.ok) throw new Error('API unavailable');
    return res.json();
  } catch {
    await delay(800);
    const mockId = Math.random().toString(36).slice(2, 8).toUpperCase();
    const paymentId = `mock_pay_${mockId}`;
    const payment = {
      paymentId,
      amount: fee,
      currency: 'INR',
      status: 'SUCCESS',
      gateway: 'razorpay',
      orderId: `mock_order_${mockId}`,
      transactionId: `MOCK_PROF_ONBOARD_${mockId}`,
      paymentMode: 'MOCK / DEVELOPMENT',
      environment: 'DEVELOPMENT',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(PROFESSIONAL_STORAGE_KEYS.payment, JSON.stringify(payment));
    return payment;
  }
}

export async function verifyPayment(paymentId) {
  try {
    const res = await fetch(`${API_BASE}/professional/onboarding/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId }),
    });
    if (!res.ok) throw new Error('API unavailable');
    return res.json();
  } catch {
    await delay(1000);
    const paidAt = new Date().toISOString();
    const validity = getValidityDates(paidAt);
    return {
      paymentId,
      status: 'success',
      paidAt,
      ...validity,
    };
  }
}

export async function professionalVerification(partnerId, documents) {
  try {
    const res = await fetch(`${API_BASE}/professional/${partnerId}/verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documents }),
    });
    if (!res.ok) throw new Error('API unavailable');
    return res.json();
  } catch {
    await delay(600);
    return {
      partnerId,
      status: 'pending',
      message: 'Verification submitted. Our team will review within 24–48 hours.',
      submittedAt: new Date().toISOString(),
    };
  }
}

export { calculateOnboardingFee, getCommissionRate, getRenewalAmount, getValidityDates };
