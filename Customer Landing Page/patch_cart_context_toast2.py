import re

with open('src/context/CartContext.jsx', 'r') as f:
    content = f.read()

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
          if (change > 0 && showToast) toast.error('Maximum quantity reached');
        } else if (change > 0 && showToast) {
          toast.success('Quantity updated');
        } else if (change < 0 && showToast) {
          toast.success('Quantity updated');
        }
        
        if (nextQty <= 0) {
          if (showToast) toast.success('Item removed');
          return prev.filter((item) => item.id !== product.id);
        }
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: nextQty } : item));
      }
      
      if (change > 0) {
        if (showToast) toast.success('Added to cart');
        let newQty = change;
        if (maxStock !== undefined && newQty > maxStock) {
          newQty = maxStock;
        }
        return [...prev, { ...product, quantity: newQty }];
      }
      return prev;
    });
  };

  const removeItem = (productId, showToast = true) => {
    if (showToast) toast.success('Item removed');
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };"""

content = re.sub(r'  const handleAddToCart = \(product, change = 1, showToast = true\) => \{.*?  const removeItem = \(productId\) => \{.*?setCartItems\(\(prev\) => prev.filter\(\(item\) => item.id !== productId\)\);\n  \};', replacement, content, flags=re.DOTALL)

with open('src/context/CartContext.jsx', 'w') as f:
    f.write(content)
