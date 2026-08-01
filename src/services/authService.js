const USERS_STORAGE_KEY = 'saathapp-users';
const AUTH_SESSION_STORAGE_KEY = 'saathapp-auth-session';
const AUTH_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const DEMO_USER = {
  id: 'demo-user',
  name: 'Nikita Sharma',
  phone: '+919999999999',
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
    const stored = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
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
  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
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
