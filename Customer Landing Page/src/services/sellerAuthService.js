import { SELLER_STORAGE_KEYS } from '../config/sellerOnboardingConfig';

const SESSION_TTL_DAYS = 30;

export function getStoredSellerAuth() {
  try {
    const stored = localStorage.getItem(SELLER_STORAGE_KEYS.auth);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveSellerAuth(session) {
  const payload = {
    ...session,
    expiresAt: Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(SELLER_STORAGE_KEYS.auth, JSON.stringify(payload));
  return payload;
}

export function clearSellerAuth() {
  localStorage.removeItem(SELLER_STORAGE_KEYS.auth);
}

export function isSellerSessionValid(session) {
  if (!session?.expiresAt) return false;
  return Date.now() < session.expiresAt;
}

export function getStoredOnboarding() {
  try {
    const stored = localStorage.getItem(SELLER_STORAGE_KEYS.onboarding);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveOnboarding(data) {
  localStorage.setItem(SELLER_STORAGE_KEYS.onboarding, JSON.stringify(data));
}

export function clearOnboarding() {
  localStorage.removeItem(SELLER_STORAGE_KEYS.onboarding);
}

export async function registerSeller({ email, password, fullName, mobile }) {
  await new Promise((r) => setTimeout(r, 500));

  const sellers = JSON.parse(localStorage.getItem('saathapp-sellers') || '[]');
  if (sellers.find((s) => s.email === email)) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const seller = {
    id: `SLR_${Date.now()}`,
    email,
    fullName,
    mobile,
    password,
    createdAt: new Date().toISOString(),
    status: 'onboarding',
  };

  sellers.push(seller);
  localStorage.setItem('saathapp-sellers', JSON.stringify(sellers));

  const session = saveSellerAuth({
    seller,
    token: `seller_token_${seller.id}`,
  });

  return { success: true, seller, session };
}

export async function loginSeller({ email, password }) {
  await new Promise((r) => setTimeout(r, 400));

  const sellers = JSON.parse(localStorage.getItem('saathapp-sellers') || '[]');
  const seller = sellers.find((s) => s.email === email && s.password === password);

  if (!seller) {
    return { success: false, message: 'Invalid email or password.' };
  }

  const session = saveSellerAuth({
    seller,
    token: `seller_token_${seller.id}`,
  });

  return { success: true, seller, session };
}

export function updateSellerStatus(sellerId, status) {
  const sellers = JSON.parse(localStorage.getItem('saathapp-sellers') || '[]');
  const idx = sellers.findIndex((s) => s.id === sellerId);
  if (idx === -1) return null;

  sellers[idx] = { ...sellers[idx], status };
  localStorage.setItem('saathapp-sellers', JSON.stringify(sellers));

  const auth = getStoredSellerAuth();
  if (auth?.seller?.id === sellerId) {
    saveSellerAuth({ ...auth, seller: { ...auth.seller, status } });
  }

  return sellers[idx];
}

export function approveSeller(sellerId) {
  return updateSellerStatus(sellerId, 'approved');
}
