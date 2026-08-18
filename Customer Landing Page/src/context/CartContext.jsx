import React, { createContext, useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import { calculateCartTotals } from '../utils/cartUtils';
import { products } from '../data/products';
import { mockSaathAppProducts } from '../data/saathAppProducts';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('saathapp_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isPlusMember, setIsPlusMember] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saathapp_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

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

  const getCartQuantity = (productId) => {
    const item = cartItems.find((entry) => entry.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const totals = calculateCartTotals(cartItems, isPlusMember, appliedCoupon);

  return (
    <CartContext.Provider value={{
      cartItems,
      handleAddToCart,
      getCartQuantity,
      clearCart,
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
