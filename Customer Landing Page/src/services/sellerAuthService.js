import { SELLER_STORAGE_KEYS } from '../config/sellerOnboardingConfig';

const ACCOUNTS_KEY = 'saathapp-sellers';
const ACCOUNTS_KEY_V2 = 'saathapp-seller-accounts-v2';
const SESSION_TTL_DAYS = 30;

function log() {
  // intentional no-op in production UI (keeps call sites for future diagnostics)
}

function warn() {
  // intentional no-op in production UI
}

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    warn('localStorage write failed', key, err?.message || err);
    return false;
  }
}

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    warn('localStorage read failed', key, err?.message || err);
    return null;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function createSalt() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return `salt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

/** Deterministic SHA-256 hex hash (Web Crypto). */
export async function hashPassword(password, salt) {
  const material = `${salt}:${String(password || '')}`;
  if (typeof crypto !== 'undefined' && crypto.subtle?.digest) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(material));
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for non-secure contexts — still deterministic, not plaintext
  let h = 0;
  for (let i = 0; i < material.length; i += 1) h = (h * 31 + material.charCodeAt(i)) >>> 0;
  return `fallback_${h.toString(16)}_${salt.slice(0, 8)}`;
}

function publicSeller(account) {
  if (!account) return null;
  const { password, passwordHash, salt, ...rest } = account;
  void password;
  void passwordHash;
  void salt;
  return { ...rest };
}

function loadAccountsRaw() {
  const v2 = safeParse(safeGet(ACCOUNTS_KEY_V2), null);
  if (Array.isArray(v2)) return v2;

  // Migrate legacy plaintext store
  const legacy = safeParse(safeGet(ACCOUNTS_KEY), []);
  if (Array.isArray(legacy) && legacy.length) {
    log('Migrating legacy seller accounts', legacy.length);
    const migrated = legacy.map((s) => ({
      ...s,
      email: normalizeEmail(s.email),
      // keep plaintext temporarily until next successful login upgrades hash
      password: s.password || '',
      passwordHash: s.passwordHash || null,
      salt: s.salt || null,
      updatedAt: s.updatedAt || new Date().toISOString(),
    }));
    safeSet(ACCOUNTS_KEY_V2, migrated);
    return migrated;
  }
  return [];
}

function saveAccounts(accounts) {
  const ok = safeSet(ACCOUNTS_KEY_V2, accounts);
  // Keep legacy key in sync (without hashes duplication issues) for any old readers
  if (ok) {
    safeSet(
      ACCOUNTS_KEY,
      accounts.map((a) => ({
        id: a.id,
        email: a.email,
        fullName: a.fullName,
        mobile: a.mobile,
        // preserve plaintext only if still migrating; prefer not exposing hash as password
        password: a.password || '',
        createdAt: a.createdAt,
        status: a.status,
      }))
    );
  }
  return ok;
}

export function getSellerAccounts() {
  return loadAccountsRaw();
}

export function findSellerAccountByEmail(email) {
  const normalized = normalizeEmail(email);
  return loadAccountsRaw().find((s) => normalizeEmail(s.email) === normalized) || null;
}

export function findSellerAccountById(id) {
  return loadAccountsRaw().find((s) => s.id === id) || null;
}

function onboardingKey(sellerId) {
  return sellerId ? `${SELLER_STORAGE_KEYS.onboarding}:${sellerId}` : SELLER_STORAGE_KEYS.onboarding;
}

export function getStoredSellerAuth() {
  const session = safeParse(safeGet(SELLER_STORAGE_KEYS.auth), null);
  if (!session) return null;
  return session;
}

export function saveSellerAuth(session) {
  const seller = publicSeller(session.seller || session);
  const payload = {
    token: session.token || `seller_token_${seller?.id || 'unknown'}`,
    seller,
    createdAt: session.createdAt || new Date().toISOString(),
    expiresAt: Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
  };
  const ok = safeSet(SELLER_STORAGE_KEYS.auth, payload);
  log('Session saved', { sellerId: seller?.id, email: seller?.email, ok, expiresAt: payload.expiresAt });
  if (!ok) {
    return { ...payload, _persistFailed: true };
  }
  return payload;
}

export function clearSellerAuth() {
  log('Clearing session only (accounts preserved)');
  safeRemove(SELLER_STORAGE_KEYS.auth);
}

export function isSellerSessionValid(session) {
  if (!session?.token || !session?.seller?.id) {
    log('Session invalid: missing token/seller');
    return false;
  }
  // Backward compatible: older sessions without expiresAt are treated as valid once,
  // then refreshed on restore.
  if (!session.expiresAt) {
    log('Session missing expiresAt — treating as valid for restore');
    return true;
  }
  const valid = Date.now() < Number(session.expiresAt);
  if (!valid) log('Session expired', session.expiresAt);
  return valid;
}

/**
 * Restore session on app boot: validate expiry, refresh seller profile from accounts DB,
 * and extend TTL. Returns session or null.
 */
export function restoreSellerSession() {
  const session = getStoredSellerAuth();
  if (!session) {
    log('No persisted session');
    return null;
  }
  if (!isSellerSessionValid(session)) {
    warn('Persisted session invalid/expired — clearing');
    clearSellerAuth();
    return null;
  }
  const account = findSellerAccountById(session.seller?.id);
  if (!account) {
    // Session points to deleted account — clear session but do not wipe other accounts
    warn('Session seller not found in accounts store', session.seller?.id);
    clearSellerAuth();
    return null;
  }
  const refreshed = saveSellerAuth({
    token: session.token,
    seller: publicSeller(account),
    createdAt: session.createdAt,
  });
  log('Session restored', { sellerId: account.id, status: account.status });
  return refreshed;
}

export function getStoredOnboarding(sellerId) {
  const key = onboardingKey(sellerId);
  let stored = safeParse(safeGet(key), null);
  if (!stored && sellerId) {
    // Migrate legacy global onboarding if it matches this seller email
    const legacy = safeParse(safeGet(SELLER_STORAGE_KEYS.onboarding), null);
    const auth = getStoredSellerAuth();
    if (legacy && auth?.seller?.id === sellerId) {
      log('Migrating legacy onboarding to per-seller key', sellerId);
      safeSet(key, legacy);
      stored = legacy;
    }
  }
  return stored;
}

export function saveOnboarding(data, sellerId) {
  const sid = sellerId || getStoredSellerAuth()?.seller?.id;
  const key = onboardingKey(sid);
  const ok = safeSet(key, data);
  log('Onboarding saved', { key, status: data?.status, ok });
  return ok;
}

export function clearOnboarding(sellerId) {
  safeRemove(onboardingKey(sellerId));
  // Do not wipe other sellers' onboarding
}

export async function registerSeller({ email, password, fullName, mobile }) {
  await new Promise((r) => setTimeout(r, 300));

  const normalized = normalizeEmail(email);
  if (!normalized || !password || String(password).length < 6) {
    return { success: false, message: 'Valid email and password (min 6 chars) are required.' };
  }

  const sellers = loadAccountsRaw();
  if (sellers.some((s) => normalizeEmail(s.email) === normalized)) {
    log('Register blocked — duplicate email', normalized);
    return { success: false, message: 'An account with this email already exists.' };
  }

  const salt = createSalt();
  const passwordHash = await hashPassword(password, salt);
  const seller = {
    id: `SLR_${Date.now()}`,
    email: normalized,
    fullName: String(fullName || '').trim(),
    mobile: String(mobile || '').trim(),
    passwordHash,
    salt,
    // no plaintext password retained
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'onboarding',
  };

  sellers.push(seller);
  const saved = saveAccounts(sellers);
  if (!saved) {
    return { success: false, message: 'Could not save account (storage full). Free space and try again.' };
  }

  const session = saveSellerAuth({
    seller: publicSeller(seller),
    token: `seller_token_${seller.id}`,
  });

  log('Registered seller', { id: seller.id, email: normalized });
  return { success: true, seller: publicSeller(seller), session };
}

export async function loginSeller({ email, password }) {
  await new Promise((r) => setTimeout(r, 250));

  const normalized = normalizeEmail(email);
  const sellers = loadAccountsRaw();
  const idx = sellers.findIndex((s) => normalizeEmail(s.email) === normalized);
  const account = idx >= 0 ? sellers[idx] : null;

  if (!account) {
    log('Login failed — email not found', normalized);
    return { success: false, message: 'Invalid email or password.' };
  }

  let valid = false;
  if (account.passwordHash && account.salt) {
    const attempt = await hashPassword(password, account.salt);
    valid = attempt === account.passwordHash;
  } else if (account.password != null) {
    // Legacy plaintext migration path
    valid = String(account.password) === String(password);
    if (valid) {
      const salt = createSalt();
      const passwordHash = await hashPassword(password, salt);
      sellers[idx] = {
        ...account,
        passwordHash,
        salt,
        password: '',
        updatedAt: new Date().toISOString(),
      };
      saveAccounts(sellers);
      log('Upgraded legacy password to hash', account.id);
    }
  }

  if (!valid) {
    log('Login failed — bad password', normalized);
    return { success: false, message: 'Invalid email or password.' };
  }

  const latest = sellers[idx] || account;
  const session = saveSellerAuth({
    seller: publicSeller(latest),
    token: `seller_token_${latest.id}`,
  });

  if (session._persistFailed) {
    return { success: false, message: 'Login succeeded but session could not be saved. Clear site data and retry.' };
  }

  log('Login success', { id: latest.id, email: normalized, status: latest.status });
  return { success: true, seller: publicSeller(latest), session };
}

export function updateSellerStatus(sellerId, status) {
  const sellers = loadAccountsRaw();
  const idx = sellers.findIndex((s) => s.id === sellerId);
  if (idx === -1) {
    warn('updateSellerStatus: seller not found', sellerId);
    return null;
  }

  sellers[idx] = { ...sellers[idx], status, updatedAt: new Date().toISOString() };
  saveAccounts(sellers);

  const auth = getStoredSellerAuth();
  if (auth?.seller?.id === sellerId) {
    saveSellerAuth({
      ...auth,
      seller: publicSeller(sellers[idx]),
    });
  }

  // Keep per-seller onboarding status in sync
  const onboarding = getStoredOnboarding(sellerId);
  if (onboarding) {
    saveOnboarding({ ...onboarding, status }, sellerId);
  }

  log('Seller status updated', { sellerId, status });
  return publicSeller(sellers[idx]);
}

export function approveSeller(sellerId) {
  return updateSellerStatus(sellerId, 'approved');
}

/** Temporary local bypass — skip login/signup and open Seller Dashboard as approved. */
export const SELLER_AUTH_BYPASS = false;

const DEV_BYPASS_SELLER_ID = 'seller-dev-bypass';

/**
 * Ensures a demo approved seller account + valid session exist.
 * Call before route guards when SELLER_AUTH_BYPASS is enabled.
 */
export function ensureDevSellerBypass() {
  if (!SELLER_AUTH_BYPASS) return getStoredSellerAuth();

  const accounts = loadAccountsRaw();
  let account = accounts.find((s) => s.id === DEV_BYPASS_SELLER_ID);
  if (!account) {
    account = {
      id: DEV_BYPASS_SELLER_ID,
      email: 'dev@saathapp.local',
      fullName: 'Saurabh Kumar',
      mobile: '9999999999',
      status: 'approved',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    accounts.push(account);
    saveAccounts(accounts);
  } else if (account.status !== 'approved') {
    account = { ...account, status: 'approved', updatedAt: new Date().toISOString() };
    saveAccounts(accounts.map((a) => (a.id === DEV_BYPASS_SELLER_ID ? account : a)));
  }

  const onboarding = getStoredOnboarding(DEV_BYPASS_SELLER_ID);
  saveOnboarding(
    {
      ...(onboarding || {}),
      status: 'approved',
    },
    DEV_BYPASS_SELLER_ID
  );

  const session = saveSellerAuth({
    token: 'dev_bypass_token',
    seller: publicSeller(account),
  });
  log('Dev auth bypass active', { sellerId: account.id });
  return session;
}
