import re

with open('Customer Landing Page/src/pages/Profile.jsx', 'r') as f:
    content = f.read()

target = """                  <WishlistTab
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    cart={cart}
                    setCart={setCart}
                  />"""

replacement = """                  <WishlistTab
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    handleAddToCart={handleAddToCart}
                  />"""

content = content.replace(target, replacement)

with open('Customer Landing Page/src/pages/Profile.jsx', 'w') as f:
    f.write(content)
