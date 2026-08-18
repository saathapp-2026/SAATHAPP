import React, { createContext, useContext, useState, useEffect } from 'react';

const MembershipContext = createContext();

export const PLAN_DETAILS = {
  basic: {
    id: 'basic',
    name: 'Basic Plus',
    tag: '',
    monthlyPrice: 99,
    yearlyPrice: 79,
    deliveriesCount: '5 free deliveries/month',
    deliveriesRemaining: 5,
    couponsCount: 4,
    cashbackBonus: 50,
    benefits: [
      '5 free deliveries/month',
      'Faster delivery',
      'Priority customer support',
      'Member-only offers',
      'Order tracking priority',
      'Exclusive coupons',
      'Early sale access'
    ]
  },
  smart: {
    id: 'smart',
    name: 'Smart Plus',
    tag: '',
    monthlyPrice: 299,
    yearlyPrice: 239,
    deliveriesCount: '10 free deliveries/month',
    deliveriesRemaining: 10,
    couponsCount: 8,
    cashbackBonus: 150,
    benefits: [
      '10 free deliveries/month',
      'Faster delivery',
      'Priority order processing',
      'Premium customer support',
      'Extra cashback offers',
      'Special festival discounts',
      'Early access to deals'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium Plus',
    tag: 'Recommended',
    monthlyPrice: 499,
    yearlyPrice: 399,
    deliveriesCount: 'Unlimited free delivery',
    deliveriesRemaining: 'Unlimited',
    couponsCount: 12,
    cashbackBonus: 340,
    benefits: [
      'Free delivery on eligible orders',
      'Highest delivery priority',
      'Premium support',
      'Exclusive coupons',
      'Priority service booking',
      'Dedicated customer queue',
      'Faster refund processing',
      'Premium offers',
      'Festival sale priority',
      'Beta feature access'
    ]
  },
  gold: {
    id: 'gold',
    name: 'Gold Plus',
    tag: '',
    monthlyPrice: 799,
    yearlyPrice: 639,
    deliveriesCount: 'Unlimited free delivery',
    deliveriesRemaining: 'Unlimited',
    couponsCount: 18,
    cashbackBonus: 500,
    familySharing: 'Up to 2 Members',
    benefits: [
      'Free delivery on eligible orders',
      'Super-fast delivery',
      'VIP support',
      'Priority service booking',
      'Dedicated order queue',
      'Instant refund priority',
      'Exclusive Gold deals',
      'Premium cashback',
      'Family sharing (Up to 2 Members)',
      'Early product-launch access'
    ]
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum Plus',
    tag: 'Best Value',
    monthlyPrice: 999,
    yearlyPrice: 799,
    deliveriesCount: 'Unlimited free priority delivery',
    deliveriesRemaining: 'Unlimited',
    couponsCount: 25,
    cashbackBonus: 1000,
    familySharing: 'Up to 5 Members',
    benefits: [
      'Free priority delivery',
      'Fastest available delivery slot',
      'Instant VIP support',
      'VIP order queue',
      'Premium cashback',
      'Premium coupons',
      'Exclusive platform deals',
      'Dedicated relationship support',
      'Family sharing (Up to 5 Members)',
      'Early beta access',
      'Exclusive events & rewards'
    ]
  }
};

const DEFAULT_MEMBERSHIP = {
  isMember: false,
  planId: null,
  planName: '',
  billingCycle: 'monthly',
  price: 0,
  status: 'Inactive',
  startDate: null,
  renewalDate: null,
  deliveriesRemaining: 0,
  couponsAvailable: 0,
  cashbackBalance: 0,
  familyMembers: [],
  benefits: []
};

export function MembershipProvider({ children }) {
  const [membership, setMembership] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_MEMBERSHIP;
    try {
      const stored = window.localStorage.getItem('saathapp-membership-state');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_MEMBERSHIP;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saathapp-membership-state', JSON.stringify(membership));
    }
  }, [membership]);

  const subscribeToPlan = (planId, billingCycle = 'monthly') => {
    const plan = PLAN_DETAILS[planId] || PLAN_DETAILS.premium;
    const now = new Date();
    const renewal = new Date();
    if (billingCycle === 'yearly') {
      renewal.setFullYear(now.getFullYear() + 1);
    } else {
      renewal.setMonth(now.getMonth() + 1);
    }

    const price = billingCycle === 'yearly' ? plan.yearlyPrice * 12 : plan.monthlyPrice;

    const newMembership = {
      isMember: true,
      planId: plan.id,
      planName: plan.name,
      billingCycle,
      price,
      monthlyRate: billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice,
      status: 'Active',
      startDate: now.toISOString(),
      renewalDate: renewal.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      deliveriesRemaining: plan.deliveriesRemaining,
      couponsAvailable: plan.couponsCount,
      cashbackBalance: plan.cashbackBonus,
      familyMembers: plan.familySharing ? ['Family Member 1'] : [],
      benefits: plan.benefits
    };

    setMembership(newMembership);
    return newMembership;
  };

  const cancelMembership = () => {
    setMembership(prev => ({
      ...prev,
      status: 'Cancelled'
    }));
  };

  const upgradePlan = (newPlanId, billingCycle) => {
    return subscribeToPlan(newPlanId, billingCycle || membership.billingCycle);
  };

  const getDeliveryFee = (cartTotal = 0) => {
    if (membership.isMember && membership.status === 'Active') {
      return 0; // Free delivery for Plus members
    }
    return cartTotal >= 499 ? 0 : 40;
  };

  const getDeliveryTimeEstimate = (normalTime = '45 min') => {
    if (membership.isMember && membership.status === 'Active') {
      if (membership.planId === 'platinum' || membership.planId === 'gold') {
        return '20-25 min';
      }
      return '30 min';
    }
    return normalTime;
  };

  return (
    <MembershipContext.Provider
      value={{
        membership,
        subscribeToPlan,
        cancelMembership,
        upgradePlan,
        getDeliveryFee,
        getDeliveryTimeEstimate,
        PLAN_DETAILS
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership() {
  const context = useContext(MembershipContext);
  if (!context) {
    throw new Error('useMembership must be used within a MembershipProvider');
  }
  return context;
}
