import axios from 'axios';
import {
  calculateOnboardingFee,
  getCommissionRate,
  getRenewalAmount,
  getValidityDates,
} from './sellerOnboardingService';
import { SELLER_STORAGE_KEYS } from '../config/sellerOnboardingConfig';

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.saathapp.in/v1';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem(SELLER_STORAGE_KEYS.auth);
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function calculateOnboardingFeeApi(onboardingData) {
  try {
    const { data } = await api.post('/seller/onboarding/calculate-fee', onboardingData);
    return data;
  } catch {
    await delay();
    return calculateOnboardingFee(onboardingData);
  }
}

export async function getCommissionRateApi(category) {
  try {
    const { data } = await api.get(`/seller/commission/${category}`);
    return data;
  } catch {
    await delay(200);
    return getCommissionRate(category);
  }
}

export async function getRenewalAmountApi(originalFee) {
  try {
    const { data } = await api.post('/seller/onboarding/renewal-amount', { originalFee });
    return data;
  } catch {
    await delay(200);
    return getRenewalAmount(originalFee);
  }
}

export async function createOnboardingPayment({ fee, onboardingData, sellerId }) {
  try {
    const { data } = await api.post('/seller/onboarding/payment', { fee, sellerId, onboardingData });
    return data;
  } catch {
    await delay(800);
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const payment = {
      paymentId,
      amount: fee,
      currency: 'INR',
      status: 'created',
      gateway: 'razorpay',
      orderId: `order_${paymentId}`,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(SELLER_STORAGE_KEYS.payment, JSON.stringify(payment));
    return payment;
  }
}

export async function verifyPayment(paymentId) {
  try {
    const { data } = await api.post('/seller/onboarding/verify-payment', { paymentId });
    return data;
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

export async function sellerVerification(sellerId, documents) {
  try {
    const { data } = await api.post(`/seller/${sellerId}/verification`, { documents });
    return data;
  } catch {
    await delay(600);
    return {
      sellerId,
      status: 'pending',
      message: 'Verification submitted. Our team will review within 2-3 business days.',
      submittedAt: new Date().toISOString(),
    };
  }
}

export async function renewSeller(sellerId, renewalAmount) {
  try {
    const { data } = await api.post(`/seller/${sellerId}/renew`, { renewalAmount });
    return data;
  } catch {
    await delay(800);
    const paidAt = new Date().toISOString();
    const validity = getValidityDates(paidAt);
    return {
      sellerId,
      status: 'renewed',
      renewalAmount,
      paidAt,
      ...validity,
    };
  }
}

export { calculateOnboardingFee, getCommissionRate, getRenewalAmount, getValidityDates };

export {
  subscribeMembership,
  upgradeMembership,
  downgradeMembership,
  cancelMembership,
  renewMembership,
  getMembershipApi,
  getMembershipPlans,
  getPaymentHistory,
  downloadInvoice,
  getWelcomeKitTracking,
  submitBrandingRequest,
  getFeatureComparison,
  getBrandingProducts,
  processMembershipPayment,
  advanceWelcomeKitStatus,
  getBrandingRequests,
} from './sellerMembershipService';
