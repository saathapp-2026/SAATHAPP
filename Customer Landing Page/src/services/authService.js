const USERS_STORAGE_KEY = 'saathapp-users';
const AUTH_SESSION_STORAGE_KEY = 'saathapp-auth-session';
const AUTH_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const DEMO_USER = {
  id: 'guest-user',
  name: 'User',
  phone: '9999999999',
  email: 'demo@saathapp.com',
  passwordHash: null,
  createdAt: new Date().toISOString(),
  lastLogin: null,
  status: 'active',
};

function encodeHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function getStoredAuthSession() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed && isSessionValid(parsed) ? parsed : null;
  } catch (error) {
    console.error('Unable to read auth session', error);
    return null;
  }
}

export function saveAuthSession(user) {
  if (typeof window === 'undefined' || !user) return;
  const session = {
    user,
    token: `saathapp-session-${user.id}-${Date.now()}`,
    expiresAt: Date.now() + AUTH_SESSION_TTL_MS,
  };
  window.sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  window.localStorage.removeItem('saath_profile');
}

export function isSessionValid(session) {
  if (!session?.user || !session?.token) return false;
  if (!session.expiresAt) return true;
  return Date.now() < session.expiresAt;
}

export async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return encodeHex(new Uint8Array(digest));
}

export function getStoredUsers() {
  if (typeof window === 'undefined') return [DEMO_USER];
  try {
    const stored = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (!stored) {
      const demoUser = { ...DEMO_USER, passwordHash: '' };
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([demoUser]));
      return [demoUser];
    }
    const parsed = JSON.parse(stored);
    return parsed.length ? parsed : [DEMO_USER];
  } catch (error) {
    console.error('Unable to read users storage', error);
    return [DEMO_USER];
  }
}

export function saveUsers(users) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export async function registerUser(users, userData) {
  const normalizedEmail = userData.email.trim().toLowerCase();
  const normalizedPhone = userData.phone.replace(/\D/g, '');
  const existing = users.find((entry) => entry.email?.toLowerCase() === normalizedEmail || entry.phone?.replace(/\D/g, '') === normalizedPhone);
  if (existing) {
    return { success: false, message: 'An account with this email or phone already exists.' };
  }

  const passwordHash = await hashPassword(userData.password);
  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name.trim(),
    phone: userData.phone.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    status: 'active',
  };

  const nextUsers = [...users, newUser];
  saveUsers(nextUsers);
  return { success: true, user: newUser, users: nextUsers };
}

export async function authenticateUser(users, { identifier, password }) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPhone = identifier.replace(/\D/g, '');

  const existing = users.find((entry) => {
    const entryEmail = entry.email?.toLowerCase();
    const entryPhone = entry.phone?.replace(/\D/g, '');
    return entryEmail === normalizedIdentifier || entryPhone === normalizedPhone;
  });

  if (!existing) {
    return { success: false, reason: 'not_found' };
  }

  const passwordHash = await hashPassword(password);
  if (existing.passwordHash && existing.passwordHash !== passwordHash) {
    return { success: false, reason: 'wrong_password' };
  }

  return { success: true, user: { ...existing, lastLogin: new Date().toISOString() } };
}

export async function resetPassword(users, identifier, newPassword) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPhone = identifier.replace(/\D/g, '');
  const targetIndex = users.findIndex((entry) => {
    const entryEmail = entry.email?.toLowerCase();
    const entryPhone = entry.phone?.replace(/\D/g, '');
    return entryEmail === normalizedIdentifier || entryPhone === normalizedPhone;
  });

  if (targetIndex < 0) return { success: false };

  const passwordHash = await hashPassword(newPassword);
  const nextUsers = users.map((entry, index) => (index === targetIndex ? { ...entry, passwordHash } : entry));
  saveUsers(nextUsers);
  return { success: true, users: nextUsers };
}

export function updateLastLogin(users, userId) {
  const nextUsers = users.map((entry) => (entry.id === userId ? { ...entry, lastLogin: new Date().toISOString() } : entry));
  saveUsers(nextUsers);
  return nextUsers;
}

// --- Partners (Professionals and Workers) Authentication ---
const PARTNERS_STORAGE_KEY = 'saathapp-partners';
const PARTNER_SESSION_STORAGE_KEY = 'saathapp-partner-session';

const DEFAULT_PROFESSIONAL = {
  id: 'partner-prof-demo',
  name: 'Rahul Kumar',
  phone: '9876543201',
  email: 'professional@saathapp.com',
  passwordHash: '', // Allow bypass/empty password for demo account
  category: 'Electrician',
  experience: '5 Years',
  role: 'professional',
  status: 'approved',
  createdAt: new Date().toISOString()
};

const DEFAULT_WORKER = {
  id: 'partner-worker-demo',
  name: 'Amit Singh',
  phone: '9876543202',
  email: 'worker@saathapp.com',
  passwordHash: '', // Allow bypass/empty password for demo account
  category: 'Helper',
  experience: '2 Years',
  role: 'worker',
  status: 'approved',
  createdAt: new Date().toISOString()
};

export function getStoredPartners() {
  if (typeof window === 'undefined') return [DEFAULT_PROFESSIONAL, DEFAULT_WORKER];
  try {
    const stored = window.localStorage.getItem(PARTNERS_STORAGE_KEY);
    if (!stored) {
      window.localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify([DEFAULT_PROFESSIONAL, DEFAULT_WORKER]));
      return [DEFAULT_PROFESSIONAL, DEFAULT_WORKER];
    }
    const parsed = JSON.parse(stored);
    return parsed.length ? parsed : [DEFAULT_PROFESSIONAL, DEFAULT_WORKER];
  } catch (error) {
    console.error('Unable to read partners storage', error);
    return [DEFAULT_PROFESSIONAL, DEFAULT_WORKER];
  }
}

export function savePartners(partners) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(partners));
}

export function getStoredPartnerSession() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(PARTNER_SESSION_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed && isSessionValid(parsed) ? parsed : null;
  } catch (error) {
    console.error('Unable to read partner session', error);
    return null;
  }
}

export function savePartnerSession(partner) {
  if (typeof window === 'undefined' || !partner) return;
  const session = {
    user: partner,
    token: `saathapp-partner-session-${partner.id}-${Date.now()}`,
    expiresAt: Date.now() + AUTH_SESSION_TTL_MS,
  };
  window.localStorage.setItem(PARTNER_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearPartnerSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PARTNER_SESSION_STORAGE_KEY);
}

export async function registerPartner(partners, partnerData) {
  const normalizedEmail = partnerData.email.trim().toLowerCase();
  const normalizedPhone = partnerData.phone.replace(/\D/g, '');
  
  const existing = partners.find((entry) => {
    const entryEmail = entry.email?.toLowerCase();
    const entryPhone = entry.phone?.replace(/\D/g, '');
    const emailMatch = entryEmail === normalizedEmail;
    const phoneMatch = normalizedPhone !== '' && entryPhone === normalizedPhone;
    return (emailMatch || phoneMatch) && entry.role === partnerData.role;
  });

  if (existing) {
    return { success: false, message: 'An account with this email or phone already exists.' };
  }

  const passwordHash = await hashPassword(partnerData.password);
  const newPartner = {
    id: `partner-${Date.now()}`,
    name: partnerData.name.trim(),
    phone: partnerData.phone.trim(),
    email: normalizedEmail,
    passwordHash,
    category: partnerData.category || 'General',
    experience: partnerData.experience || '1 Year',
    role: partnerData.role, // 'professional' or 'worker'
    status: 'pending', // Registration starts as pending KYC verification
    createdAt: new Date().toISOString(),
  };

  const nextPartners = [...partners, newPartner];
  savePartners(nextPartners);
  return { success: true, partner: newPartner, partners: nextPartners };
}

export async function authenticatePartner(partners, { identifier, password, role }) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPhone = identifier.replace(/\D/g, '');

  const existing = partners.find((entry) => {
    const entryEmail = entry.email?.toLowerCase();
    const entryPhone = entry.phone?.replace(/\D/g, '');
    const matchesRole = entry.role === role;
    
    const emailMatch = entryEmail === normalizedIdentifier;
    const phoneMatch = normalizedPhone !== '' && entryPhone === normalizedPhone;
    
    return matchesRole && (emailMatch || phoneMatch);
  });

  if (!existing) {
    return { success: false, reason: 'not_found' };
  }

  // Check demo password bypass
  if (existing.passwordHash === '') {
    // For demo user, allow password bypass (any password or 'password')
    return { success: true, partner: { ...existing, lastLogin: new Date().toISOString() } };
  }

  const passwordHash = await hashPassword(password);
  if (existing.passwordHash !== passwordHash) {
    return { success: false, reason: 'wrong_password' };
  }

  return { success: true, partner: { ...existing, lastLogin: new Date().toISOString() } };
}

export function updatePartnerStatus(partners, partnerId, status) {
  const nextPartners = partners.map((entry) => (entry.id === partnerId ? { ...entry, status } : entry));
  savePartners(nextPartners);
  return nextPartners;
}



// --- Genuine Customer Authentication ---
export class AuthConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthConfigurationError';
  }
}

const isDevMockEnabled = import.meta.env.VITE_ENABLE_DEV_MOCK_LOGIN === 'true';

function getAuthApiUrl() {
  const url = import.meta.env.VITE_AUTH_API_URL;
  if (!url) {
    throw new AuthConfigurationError('VITE_AUTH_API_URL is missing. Please configure your backend API for authentication.');
  }
  return url;
}

export async function requestRealOtp(phone) {
  // STRICT MOCK FOR STEP 4
  console.warn("MOCK MODE: Faking OTP request for", phone);
  return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
}

export const TEST_OTP = '123456';
export async function verifyRealOtp(phone, otp) {
  // STRICT MOCK FOR STEP 4
  console.warn("MOCK MODE: Faking OTP verification");
  return new Promise((resolve, reject) => setTimeout(() => {
    if (otp !== TEST_OTP) {
      reject(new Error('Invalid OTP. Please enter 123456 for testing.'));
    } else {
      resolve({
        user: { id: 'mock-user-1', name: 'Test User', phone, role: 'customer' },
        token: 'mock-jwt-token-123'
      });
    }
  }, 500));
}

export async function authenticateWithGoogle(googleCredential) {
  if (isDevMockEnabled) {
    console.warn("DEV MOCK MODE: Faking Google Auth");
    return new Promise(resolve => setTimeout(() => resolve({
      user: { id: 'dev-google-1', name: 'Google Dev User', email: 'dev@example.com', role: 'customer' },
      token: 'mock-google-jwt-123'
    }), 1500));
  }
  const apiUrl = getAuthApiUrl();
  const response = await fetch(`${apiUrl}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: googleCredential })
  });
  if (!response.ok) {
    throw new Error('Google authentication failed');
  }
  return response.json(); // Expected to return { user, token }
}

