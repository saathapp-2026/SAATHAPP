import { membershipPlansConfig } from '../config/seller/membershipPlans.js';
import { getBrandingProducts as getBrandingProductsFromConfig, getBrandingStoreConfig as getBrandingStoreFromConfig } from '../config/seller/brandingProducts.js';
import { isWelcomeKitEligible as checkWelcomeKitEligible } from '../config/seller/welcomeKitConfig.js';

const MEMBERSHIP_STORAGE_KEY = 'saathapp-seller-membership';
const BRANDING_REQUESTS_KEY = 'saathapp-seller-branding-requests';

function delay(ms = 0) {
  return new Promise((r) => setTimeout(r, 0));
}

export function getMembershipConfig() {
  return membershipPlansConfig;
}

export function getMembershipPlans() {
  return membershipPlansConfig.plans;
}

export function getFeatureComparison() {
  return membershipPlansConfig.featureComparison;
}

export function getWelcomeKitConfig() {
  return membershipPlansConfig.welcomeKit;
}

export function getBrandingProducts() {
  return getBrandingProductsFromConfig();
}

export function getBrandingStoreConfig() {
  return getBrandingStoreFromConfig();
}

export function getPlanById(planId) {
  return membershipPlansConfig.plans.find((p) => p.id === planId) || membershipPlansConfig.plans[0];
}

export function isWelcomeKitEligible(planId) {
  return checkWelcomeKitEligible(planId);
}

export function getStoredMembership() {
  try {
    const stored = localStorage.getItem(MEMBERSHIP_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveMembership(data) {
  localStorage.setItem(MEMBERSHIP_STORAGE_KEY, JSON.stringify(data));
}

export function getMembershipStatus(membership) {
  if (!membership || membership.planId === 'free' || !membership.subscribed) {
    return {
      status: 'not_subscribed',
      label: 'Not Subscribed',
      planName: 'Free',
      isActive: false,
    };
  }

  const now = new Date();
  const end = membership.validUntil ? new Date(membership.validUntil) : null;
  const isExpired = end && now > end;

  return {
    status: isExpired ? 'expired' : 'active',
    label: isExpired ? 'Expired' : 'Active',
    planName: getPlanById(membership.planId)?.name || membership.planId,
    isActive: !isExpired,
    validUntil: membership.validUntil,
    billingCycle: membership.billingCycle || 'monthly',
  };
}

function generateTrackingNumber() {
  return `SAATH${Date.now().toString().slice(-8)}IN`;
}

function buildWelcomeKit(planId, shippingAddress) {
  if (!isWelcomeKitEligible(planId)) return null;
  return {
    status: 'preparing',
    trackingNumber: null,
    shippingAddress: shippingAddress || 'Address will be confirmed after verification',
    updatedAt: new Date().toISOString(),
    items: membershipPlansConfig.welcomeKit.items,
  };
}

function buildMembershipRecord({ sellerId, planId, action = 'subscribe', shippingAddress }) {
  const plan = getPlanById(planId);
  const existing = getStoredMembership();
  const validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 1);

  const paymentEntry = plan.price > 0 ? {
    id: `MEM_${Date.now()}`,
    planId,
    planName: plan.name,
    amount: plan.price,
    paidAt: new Date().toISOString(),
    type: action,
    invoiceId: `INV_${Date.now()}`,
    status: 'paid',
  } : null;

  const welcomeKit = buildWelcomeKit(planId, shippingAddress)
    || (isWelcomeKitEligible(planId) ? existing?.welcomeKit : null);

  return {
    sellerId,
    planId,
    planName: plan.name,
    price: plan.price,
    billingCycle: 'monthly',
    subscribed: planId !== 'free',
    subscribedAt: planId !== 'free' ? (existing?.subscribedAt || new Date().toISOString()) : null,
    validUntil: planId === 'free' ? null : validUntil.toISOString(),
    welcomeKit,
    paymentHistory: paymentEntry
      ? [...(existing?.paymentHistory || []), paymentEntry]
      : existing?.paymentHistory || [],
    lastAction: action,
    lastActionAt: new Date().toISOString(),
  };
}

export async function subscribeMembership({ sellerId, planId, shippingAddress }) {
  await delay(800);
  const membership = buildMembershipRecord({ sellerId, planId, action: 'subscribe', shippingAddress });
  saveMembership(membership);
  return { success: true, membership, message: `Successfully subscribed to ${membership.planName} plan!` };
}

export async function upgradeMembership({ sellerId, planId, shippingAddress }) {
  await delay(600);
  const membership = buildMembershipRecord({ sellerId, planId, action: 'upgrade', shippingAddress });
  saveMembership(membership);
  return { success: true, membership, message: `Upgraded to ${membership.planName} plan successfully!` };
}

export async function downgradeMembership({ sellerId, planId }) {
  await delay(500);
  const membership = buildMembershipRecord({ sellerId, planId, action: 'downgrade' });
  saveMembership(membership);
  return { success: true, membership, message: `Downgraded to ${membership.planName} plan.` };
}

export async function cancelMembership(sellerId) {
  await delay(400);
  const existing = getStoredMembership();
  const membership = {
    sellerId,
    planId: 'free',
    planName: 'Free',
    price: 0,
    billingCycle: 'monthly',
    subscribed: false,
    cancelledAt: new Date().toISOString(),
    welcomeKit: null,
    paymentHistory: existing?.paymentHistory || [],
    lastAction: 'cancel',
    lastActionAt: new Date().toISOString(),
  };
  saveMembership(membership);
  return { success: true, membership, message: 'Membership cancelled. You are now on the Free plan.' };
}

export async function renewMembership({ sellerId, planId }) {
  await delay(600);
  const membership = buildMembershipRecord({ sellerId, planId, action: 'renew' });
  saveMembership(membership);
  return { success: true, membership, message: `${membership.planName} membership renewed for 1 month!` };
}

export async function getMembershipApi() {
  await delay(200);
  return getStoredMembership() || { planId: 'free', planName: 'Free', subscribed: false };
}

export async function getPaymentHistory() {
  await delay(200);
  return getStoredMembership()?.paymentHistory || [];
}

export function generateInvoiceHtml(invoiceId, payment) {
  const plan = getPlanById(payment?.planId);
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice ${invoiceId}</title>
<style>body{font-family:system-ui,sans-serif;max-width:600px;margin:40px auto;padding:20px;color:#1e293b}
h1{color:#0A8F3D}table{width:100%;border-collapse:collapse;margin:20px 0}
td,th{padding:10px;border-bottom:1px solid #e2e8f0;text-align:left}
.total{font-size:1.25rem;font-weight:bold;color:#0A8F3D}</style></head>
<body>
<h1>SAATHAPP Invoice</h1>
<p><strong>Invoice ID:</strong> ${invoiceId}</p>
<p><strong>Date:</strong> ${new Date(payment?.paidAt).toLocaleDateString('en-IN')}</p>
<p><strong>Plan:</strong> ${payment?.planName || plan?.name}</p>
<table><tr><th>Description</th><th>Amount</th></tr>
<tr><td>Monthly Seller Membership — ${payment?.planName}</td><td>₹${payment?.amount?.toLocaleString('en-IN')}</td></tr>
<tr><td class="total">Total</td><td class="total">₹${payment?.amount?.toLocaleString('en-IN')}</td></tr></table>
<p style="color:#64748b;font-size:12px">This is a demo invoice generated locally. Backend integration coming soon.</p>
</body></html>`;
}

export async function downloadInvoice(invoiceId) {
  await delay(300);
  const history = getStoredMembership()?.paymentHistory || [];
  const payment = history.find((p) => p.invoiceId === invoiceId);
  const html = generateInvoiceHtml(invoiceId, payment);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  return {
    success: true,
    invoiceId,
    payment,
    previewHtml: html,
    downloadUrl: url,
    message: 'Invoice downloaded successfully',
  };
}

export async function getWelcomeKitTracking() {
  await delay(200);
  return getStoredMembership()?.welcomeKit || null;
}

const KIT_STATUS_FLOW = ['preparing', 'packed', 'shipped', 'delivered'];

export async function advanceWelcomeKitStatus() {
  await delay(400);
  const membership = getStoredMembership();
  if (!membership?.welcomeKit) return { success: false, message: 'No welcome kit found' };

  const currentIdx = KIT_STATUS_FLOW.indexOf(membership.welcomeKit.status);
  const nextIdx = Math.min(currentIdx + 1, KIT_STATUS_FLOW.length - 1);
  const nextStatus = KIT_STATUS_FLOW[nextIdx];

  const updatedKit = {
    ...membership.welcomeKit,
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  };

  if (nextStatus === 'shipped' && !updatedKit.trackingNumber) {
    updatedKit.trackingNumber = generateTrackingNumber();
  }

  const updated = { ...membership, welcomeKit: updatedKit };
  saveMembership(updated);
  return { success: true, welcomeKit: updatedKit, membership: updated, message: `Welcome kit status: ${nextStatus}` };
}

export async function submitBrandingRequest(request) {
  await delay(600);
  const entry = {
    id: `BR_${Date.now()}`,
    ...request,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
  };
  const existing = JSON.parse(localStorage.getItem(BRANDING_REQUESTS_KEY) || '[]');
  existing.unshift(entry);
  localStorage.setItem(BRANDING_REQUESTS_KEY, JSON.stringify(existing));
  return { success: true, request: entry, message: 'Branding quote request submitted! Our team will contact you within 2 business days.' };
}

export function getBrandingRequests() {
  try {
    return JSON.parse(localStorage.getItem(BRANDING_REQUESTS_KEY) || '[]');
  } catch {
    return [];
  }
}

export async function processMembershipPayment({ sellerId, planId, paymentMethod = 'card', shippingAddress }) {
  await delay(1200);
  const plan = getPlanById(planId);
  if (plan.price === 0) {
    const result = await subscribeMembership({ sellerId, planId, shippingAddress });
    return { ...result, paymentId: null };
  }

  const paymentId = `PAY_MEM_${Date.now()}`;
  const existing = getStoredMembership();
  const PLAN_RANK = { free: 0, starter: 1, growth: 2, enterprise: 3 };
  const currentRank = PLAN_RANK[existing?.planId || 'free'] ?? 0;
  const newRank = PLAN_RANK[planId] ?? 0;

  let result;
  if (existing?.subscribed && newRank < currentRank) {
    result = await downgradeMembership({ sellerId, planId });
  } else if (existing?.subscribed && newRank > currentRank) {
    result = await upgradeMembership({ sellerId, planId, shippingAddress });
  } else {
    result = await subscribeMembership({ sellerId, planId, shippingAddress });
  }

  return {
    ...result,
    paymentId,
    paymentMethod,
    amount: plan.price,
  };
}
