import re

with open('src/context/CartContext.jsx', 'r') as f:
    content = f.read()

if "import toast" not in content:
    content = content.replace("import React, { createContext, useState, useEffect } from 'react';", "import React, { createContext, useState, useEffect } from 'react';\nimport toast from 'react-hot-toast';")

replacement = """  const handleAddToCart = (product, change = 1, showToast = true) => {
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
      if (showToast) toast.success('Added to cart');
    } else if (change < 0 && showToast) {
       // Only show toast on actual remove if we wanted, but let's keep it simple
    }

    setCartItems((prev) => {"""

content = content.replace("""  const handleAddToCart = (product, change = 1) => {
    if (change > 0) {
      trackEvent('add_to_cart', {""", replacement)

with open('src/context/CartContext.jsx', 'w') as f:
    f.write(content)
