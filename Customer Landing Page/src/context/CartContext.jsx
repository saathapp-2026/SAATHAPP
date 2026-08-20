import React, { createContext, useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import { calculateCartTotals } from '../utils/cartUtils';
import { getCart, saveCart, getSavedForLater, saveSavedForLater } from '../services/cartService';
import { getStoredAuthSession, isSessionValid } from '../services/authService';
import { products } from '../data/products';
import { mockSaathAppProducts } from '../data/saathAppProducts';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCart());
  const [savedItems, setSavedItems] = useState(getSavedForLater());
  const [isPlusMember, setIsPlusMember] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    saveCart(cartItems);
    
    // Save to user-specific cart if logged in
    const session = getStoredAuthSession();
    if (session && isSessionValid(session)) {
       const userCartKey = `saathapp_cart_${session.user.id}`;
       if (typeof window !== 'undefined') {
          window.localStorage.setItem(userCartKey, JSON.stringify(cartItems));
       }
    }
  }, [cartItems]);

  useEffect(() => {
    saveSavedForLater(savedItems);
  }, [savedItems]);

  const handleAddToCart = (product, change) => {
    if (change > 0) {
      trackEvent('add_to_cart', {
        productId: product.id,
        name: product.name,
        category: product.category,
        quantity_added: change,
        price: product.price,
        ...(product.groceryTier && { groceryTier: product.groceryTier }),
        ...(product.electronicsType && { electronicsType: product.electronicsType }),
        ...(product.spiritualType && { spiritualType: product.spiritualType })
      });
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      const isLimited = product.availabilityMode === 'LIMITED';
      const maxStock = isLimited ? product.availableQuantity : product.stock;
      
      if (existing) {
        let nextQty = existing.quantity + change;
        
        // Enforce max stock
        if (maxStock !== undefined && nextQty > maxStock) {
          nextQty = maxStock;
        }
        
        if (nextQty <= 0) {
          return prev.filter((item) => item.id !== product.id);
        }
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: nextQty } : item));
      }
      
      if (change > 0) {
        let newQty = change;
        if (maxStock !== undefined && newQty > maxStock) {
          newQty = maxStock;
        }
        return [...prev, { ...product, quantity: newQty }];
      }
      return prev;
    });
  };

  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const moveToSavedForLater = (product) => {
    removeItem(product.id);
    setSavedItems((prev) => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const moveToCart = (product) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== product.id));
    handleAddToCart(product, 1);
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find((entry) => entry.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCartState = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };
  
  const setCartState = (items) => {
    setCartItems(items);
  };

  const totals = calculateCartTotals(cartItems, isPlusMember, appliedCoupon);

  return (
    <CartContext.Provider value={{
      cartItems,
      savedItems,
      handleAddToCart,
      removeItem,
      moveToSavedForLater,
      moveToCart,
      getCartQuantity,
      clearCart: clearCartState,
      setCartState,
      isPlusMember,
      setIsPlusMember,
      appliedCoupon,
      setAppliedCoupon,
      totals
    }}>
      {children}
    </CartContext.Provider>
  );
};
