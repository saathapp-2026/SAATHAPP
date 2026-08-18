const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Add imports
if (!content.includes("import CheckoutPage from './pages/Checkout';")) {
  content = content.replace("import CartPage from './pages/Cart';", "import CartPage from './pages/Cart';\nimport CheckoutPage from './pages/Checkout';");
}
if (!content.includes("import { useCart }")) {
  content = content.replace("import CheckoutPage from './pages/Checkout';", "import CheckoutPage from './pages/Checkout';\nimport { useCart } from './hooks/useCart';");
}

// Remove the cart state
content = content.replace(/const \[cartItems, setCartItems\] = useState\(\(\) => \{[\s\S]*?return \[\];\s*\}\s*\}\);/g, '');
content = content.replace(/useEffect\(\(\) => \{\s*if \(typeof window !== 'undefined'\) \{\s*window.localStorage.setItem\('saathapp-cart', JSON.stringify\(cartItems\)\);\s*\}\s*\}, \[cartItems\]\);/g, '');
content = content.replace(/const handleAddToCart = \(product, change\) => \{[\s\S]*?return prev;\s*\}\);\s*\};/g, '');
content = content.replace(/const getCartQuantity = \(productId\) => \{[\s\S]*?\};/g, '');

content = content.replace(/const cartTotal = cartItems\.reduce\(\(sum, item\) => sum \+ item\.price \* item\.quantity, 0\);/g, '');
content = content.replace(/const cartCount = cartItems\.reduce\(\(sum, item\) => sum \+ item\.quantity, 0\);/g, '');


// Fix handleCheckoutProcess
content = content.replace(/const handleCheckoutProcess = \(orderBreakdown\) => \{/, "const handleCheckoutProcess = (orderBreakdown, address, delivery, payment, cartItems) => {");
content = content.replace(/deliveryAddress: location \|\| "Connaught Place, Central Delhi",/, "deliveryAddress: address || location || \"Connaught Place, Central Delhi\",");
content = content.replace(/estimatedDelivery: "1-2 Days",/, "estimatedDelivery: delivery === 'express' ? 'Under 30 mins' : '1-2 Days',");
content = content.replace(/payment: \{ method: "Wallet\/UPI", status: "SUCCESS" \},/, "payment: { method: payment || \"UPI\", status: \"SUCCESS\" },");
// remove setCartItems([])
content = content.replace(/setCartItems\(\[\]\);/g, '');


// Fix cart routing
const oldCartPage2 = /if \(activePage === 'cart'\) \{[\s\S]*?\}\s*if \(activePage === 'order-confirmation'\)/;
content = content.replace(oldCartPage2, `if (activePage === 'cart') {
    return (
      <CartPage 
        onCheckout={() => setActivePage('checkout')}
        onBack={() => setActivePage('home')} 
      />
    );
  }

  if (activePage === 'checkout') {
    return <CheckoutPage onBack={() => setActivePage('cart')} onConfirmOrder={(data) => {
      handleCheckoutProcess(data.orderBreakdown, data.address, data.deliveryMethod, data.paymentMethod, data.cartItems);
      clearCart();
      setActivePage('order-confirmation');
    }} />
  }

  if (activePage === 'order-confirmation')`);

// inject useCart into App component
content = content.replace("export default function App() {", "export default function App() {\n  const { cartItems, totals, clearCart, handleAddToCart, getCartQuantity } = useCart();\n  const cartCount = totals.itemCount;\n  const cartTotal = totals.finalTotal;");


fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx patched.');
