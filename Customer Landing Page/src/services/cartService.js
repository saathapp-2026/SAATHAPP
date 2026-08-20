/**
 * cartService.js
 * 
 * Abstraction layer for cart operations. Currently uses localStorage
 * to simulate a persistent backend. Will easily swap out to API calls later.
 */

const CART_KEY = 'saathapp_cart';
const SAVED_FOR_LATER_KEY = 'saathapp_saved_for_later';

export const getCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
};

export const getSavedForLater = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(SAVED_FOR_LATER_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveSavedForLater = (items) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SAVED_FOR_LATER_KEY, JSON.stringify(items));
  }
};

export const clearCart = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(CART_KEY);
  }
};

export const mergeGuestCart = (userId, guestItems) => {
  // In a real app, we'd send guestItems to the backend to merge.
  const userCartKey = `${CART_KEY}_${userId}`;
  let userCart = [];
  try {
    const stored = window.localStorage.getItem(userCartKey);
    userCart = stored ? JSON.parse(stored) : [];
  } catch {
    userCart = [];
  }

  // Merge logic: match by ID, add quantities
  const merged = [...userCart];
  guestItems.forEach(guestItem => {
    const existing = merged.find(i => i.id === guestItem.id);
    if (existing) {
      existing.quantity += guestItem.quantity;
      const maxStock = existing.availabilityMode === 'LIMITED' ? existing.availableQuantity : existing.stock;
      if (maxStock !== undefined && existing.quantity > maxStock) {
        existing.quantity = maxStock;
      }
    } else {
      merged.push(guestItem);
    }
  });

  saveCart(merged);
  window.localStorage.setItem(userCartKey, JSON.stringify(merged));
  return merged;
};

export const saveUserCart = (userId, items) => {
  const userCartKey = `${CART_KEY}_${userId}`;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(userCartKey, JSON.stringify(items));
  }
};
