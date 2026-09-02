import re

with open('Customer Landing Page/src/components/customer/WishlistTab.jsx', 'r') as f:
    content = f.read()

replacement = """export default function WishlistTab({ wishlist, setWishlist, handleAddToCart }) {
  const handleMoveToCart = (item) => {
    handleAddToCart({
      id: item.id || `w-${Date.now()}`,
      name: item.name,
      price: item.price,
      image: item.image || '📦'
    }, 1);

    const updatedWish = wishlist.filter(w => w.id !== item.id);
    localStorage.setItem('saath_wishlist', JSON.stringify(updatedWish));
    setWishlist(updatedWish);
    toast.success(`${item.name} moved to cart!`);
  };"""

content = re.sub(r'export default function WishlistTab\(\{ wishlist, setWishlist, cart, setCart \}\) \{.*?toast\.success\(`\$\{item\.name\} moved to cart!`\) \};', replacement, content, flags=re.DOTALL)

with open('Customer Landing Page/src/components/customer/WishlistTab.jsx', 'w') as f:
    f.write(content)
