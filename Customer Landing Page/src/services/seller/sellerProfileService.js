import { delay } from './_sellerServiceUtils';
import { getStoredSellerAuth } from '../sellerAuthService';
import { getStoredOnboarding } from '../sellerAuthService';

export async function getSellerProfile() {
  await delay();
  const auth = getStoredSellerAuth();
  const onboarding = getStoredOnboarding();
  return {
    success: true,
    data: {
      seller: auth?.seller || null,
      businessInfo: onboarding?.businessInfo || null,
      address: onboarding?.address || null,
    },
  };
}

export async function updateSellerProfile(updates) {
  await delay();
  return { success: true, data: updates };
}
