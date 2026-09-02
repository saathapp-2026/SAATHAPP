import re

with open('src/pages/saathapp-products/ProductDetails.jsx', 'r') as f:
    content = f.read()

content = content.replace("handleAddToCart(productToAdd, quantity);\n                  toast.success('Added to cart');", "handleAddToCart(productToAdd, quantity, true);")
content = content.replace("handleAddToCart(productToAdd, quantity);\n                  navigate('/checkout');", "handleAddToCart(productToAdd, quantity, false);\n                  navigate('/checkout');")

with open('src/pages/saathapp-products/ProductDetails.jsx', 'w') as f:
    f.write(content)
