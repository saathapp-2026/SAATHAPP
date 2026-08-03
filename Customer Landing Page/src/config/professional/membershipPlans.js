import membershipData from '../professionalMembership.json';

export function getProfessionalMembershipConfig() {
  return membershipData;
}

export function getProfessionalMembershipPlans() {
  return membershipData.plans;
}

export function getPlanById(planId) {
  return membershipData.plans.find((p) => p.id === planId) || membershipData.plans[0];
}

export function saveProfessionalMembership(membership) {
  localStorage.setItem('saathapp-professional-membership', JSON.stringify(membership));
}

export function getStoredProfessionalMembership() {
  try {
    const stored = localStorage.getItem('saathapp-professional-membership');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export async function subscribeProfessionalMembership(planId) {
  await new Promise((r) => setTimeout(r, 500));
  const plan = getPlanById(planId);
  const membership = {
    planId: plan.id,
    planName: plan.name,
    price: plan.price,
    subscribed: plan.price > 0,
    subscribedAt: new Date().toISOString(),
    status: plan.price > 0 ? 'active' : 'free',
    renewedAt: null,
    cancelledAt: null,
  };
  saveProfessionalMembership(membership);
  return membership;
}

export async function cancelProfessionalMembership() {
  await new Promise((r) => setTimeout(r, 300));
  const current = getStoredProfessionalMembership() || getPlanById('free');
  const membership = {
    planId: 'free',
    planName: 'Free',
    price: 0,
    subscribed: false,
    subscribedAt: current.subscribedAt || null,
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
  };
  saveProfessionalMembership(membership);
  return membership;
}

export async function renewProfessionalMembership(planId) {
  return subscribeProfessionalMembership(planId || getStoredProfessionalMembership()?.planId || 'free');
}

export async function downgradeProfessionalMembership(planId = 'starter') {
  return subscribeProfessionalMembership(planId);
}
