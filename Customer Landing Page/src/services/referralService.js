// Service for managing Referral data in SaathApp
// Uses localStorage ('saathapp_referrals') for instant cross-tab and customer-admin sync

export const REFERRAL_TYPES = [
  'Customer',
  'Seller',
  'Business',
  'Service Professional',
  'Delivery Partner',
  'Franchise Partner',
  'Wholesale Partner',
  'Other',
];

export const REFERRAL_STATUSES = [
  'Pending',
  'Contacted',
  'Registered',
  'Verified',
  'Activated',
  'Converted',
];

const INITIAL_MOCK_REFERRALS = [
  {
    id: 'REF-1001',
    referrerId: 'USR-8821',
    referrerName: 'Rajesh Kumar',
    referrerCode: 'RAJESH108',
    referredName: 'Vikram Sharma',
    referredPhone: '+91 9876543210',
    referredEmail: 'vikram.s@gmail.com',
    referralType: 'Seller',
    referralCode: 'SAATH-REF-9921',
    referralStatus: 'Converted',
    createdAt: '2026-08-20T10:30:00.000Z',
    convertedAt: '2026-08-25T14:20:00.000Z',
  },
  {
    id: 'REF-1002',
    referrerId: 'USR-8822',
    referrerName: 'Priya Sharma',
    referrerCode: 'PRIYA204',
    referredName: 'Ananya Verma',
    referredPhone: '+91 9812345678',
    referredEmail: 'ananya.v@yahoo.com',
    referralType: 'Customer',
    referralCode: 'SAATH-REF-9922',
    referralStatus: 'Verified',
    createdAt: '2026-08-22T11:15:00.000Z',
    convertedAt: null,
  },
  {
    id: 'REF-1003',
    referrerId: 'USR-8823',
    referrerName: 'Amit Patel',
    referrerCode: 'AMIT305',
    referredName: 'Suresh Kirana Store',
    referredPhone: '+91 9988776655',
    referredEmail: 'sureshkirana@gmail.com',
    referralType: 'Business',
    referralCode: 'SAATH-REF-9923',
    referralStatus: 'Contacted',
    createdAt: '2026-08-24T09:45:00.000Z',
    convertedAt: null,
  },
  {
    id: 'REF-1004',
    referrerId: 'USR-8824',
    referrerName: 'Kajal Soni',
    referrerCode: 'KAJAL777',
    referredName: 'Rohan Gupta',
    referredPhone: '+91 9765432109',
    referredEmail: 'rohan.tech@gmail.com',
    referralType: 'Service Professional',
    referralCode: 'SAATH-REF-9924',
    referralStatus: 'Pending',
    createdAt: '2026-08-26T16:10:00.000Z',
    convertedAt: null,
  },
];

export function getStoredReferrals() {
  if (typeof window === 'undefined') return INITIAL_MOCK_REFERRALS;
  try {
    const data = window.localStorage.getItem('saathapp_referrals');
    if (data) {
      return JSON.parse(data);
    }
    window.localStorage.setItem('saathapp_referrals', JSON.stringify(INITIAL_MOCK_REFERRALS));
    return INITIAL_MOCK_REFERRALS;
  } catch (e) {
    console.error('Failed to read stored referrals:', e);
    return INITIAL_MOCK_REFERRALS;
  }
}

export function saveStoredReferrals(referrals) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('saathapp_referrals', JSON.stringify(referrals));
  } catch (e) {
    console.error('Failed to save referrals:', e);
  }
}

export function saveActiveReferralCode(code) {
  if (typeof window !== 'undefined' && code) {
    window.localStorage.setItem('saathapp_active_referral_code', code);
  }
}

export function getActiveReferralCode() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('saathapp_active_referral_code') || null;
}

export function submitReferral(referralData, user = null) {
  const currentReferrals = getStoredReferrals();
  
  const userCode = referralData.referrerCode || getActiveReferralCode() || getUserReferralCode(user);
  
  const newReferral = {
    id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
    referrerId: user?.id || user?.email || 'GUEST-USER',
    referrerName: user?.name || user?.email || (referralData.referrerCode ? `Referrer (${referralData.referrerCode})` : 'Guest User'),
    referrerCode: userCode,
    referredName: referralData.referredName.trim(),
    referredPhone: referralData.referredPhone.trim(),
    referredEmail: referralData.referredEmail?.trim() || '',
    referralType: referralData.referralType || 'Customer',
    referralCode: `SAATH-REF-${Math.floor(10000 + Math.random() * 90000)}`,
    referralStatus: 'Pending',
    createdAt: new Date().toISOString(),
    convertedAt: null,
  };

  const updated = [newReferral, ...currentReferrals];
  saveStoredReferrals(updated);
  return { success: true, referral: newReferral };
}

export function updateReferralStatus(id, newStatus) {
  const current = getStoredReferrals();
  const updated = current.map((ref) => {
    if (ref.id === id) {
      return {
        ...ref,
        referralStatus: newStatus,
        convertedAt: newStatus === 'Converted' ? new Date().toISOString() : ref.convertedAt,
      };
    }
    return ref;
  });
  saveStoredReferrals(updated);
  return updated;
}

export function getUserReferralCode(user) {
  if (!user) return 'RAUNAK123';
  if (user.referralCode) return user.referralCode;
  const namePart = (user.name || 'USER').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6);
  return `${namePart}123`;
}

export function generateReferralLink(user) {
  const code = getUserReferralCode(user);
  return `https://saathapp.in/refer/${code}`;
}

export function getShareMessage(user) {
  const link = generateReferralLink(user);
  return `Join SaathApp through my referral: Help someone discover local products, on-demand services & ecosystem growth on SaathApp. ${link}`;
}

export function getSocialShareLinks(user) {
  const link = generateReferralLink(user);
  const message = getShareMessage(user);
  const encodedMsg = encodeURIComponent(message);
  const encodedLink = encodeURIComponent(link);

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMsg}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMsg}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
    email: `mailto:?subject=${encodeURIComponent('Join SaathApp through my referral')}&body=${encodedMsg}`,
    sms: `sms:?body=${encodedMsg}`,
  };
}

export function getReferralMetrics() {
  const referrals = getStoredReferrals();
  const total = referrals.length;
  const pending = referrals.filter((r) => r.referralStatus === 'Pending').length;
  const contacted = referrals.filter((r) => r.referralStatus === 'Contacted').length;
  const registered = referrals.filter((r) => r.referralStatus === 'Registered').length;
  const verified = referrals.filter((r) => r.referralStatus === 'Verified').length;
  const activated = referrals.filter((r) => r.referralStatus === 'Activated').length;
  const converted = referrals.filter((r) => r.referralStatus === 'Converted').length;

  return {
    total: total + 1246, // Baseline numbers to mirror mock dashboard stats if desired
    pending: pending + 416,
    contacted: contacted + 120,
    registered: registered + 378,
    verified: verified + 288,
    activated: activated + 210,
    converted: converted + 158,
  };
}

