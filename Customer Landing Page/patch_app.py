import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Add CheckoutPage import
if "import CheckoutPage from" not in content:
    content = content.replace("import CartPage from './pages/Cart';", "import CartPage from './pages/Cart';\nimport CheckoutPage from './pages/Checkout';")

# 2. Remove cartItems state
content = re.sub(r'const \[cartItems,\s*setCartItems\]\s*=\s*useState\(\(\)\s*=>\s*\{.*?(?:return\s*\[\];\s*\})\s*\}\);', '', content, flags=re.DOTALL)

# 3. Remove localStorage effect
content = re.sub(r'useEffect\(\(\)\s*=>\s*\{\s*if\s*\(typeof\s*window\s*!==\s*\'undefined\'\)\s*\{\s*window\.localStorage\.setItem\(\'saathapp-cart\',\s*JSON\.stringify\(cartItems\)\);\s*\}\s*\},.*?\]\);', '', content, flags=re.DOTALL)

# 4. Remove handleAddToCart
content = re.sub(r'const handleAddToCart\s*=\s*\(product,\s*change\)\s*=>\s*\{.*?return\s*prev;\s*\}\);\s*\};', '', content, flags=re.DOTALL)

# 5. Remove getCartQuantity
content = re.sub(r'const getCartQuantity\s*=\s*\(productId\)\s*=>\s*\{.*?\};', '', content, flags=re.DOTALL)

# 6. Change handleCheckoutProcess signature
content = content.replace("const handleCheckoutProcess = (orderBreakdown) => {", "const handleCheckoutProcess = (orderBreakdown, address, delivery, payment) => {")
content = content.replace("deliveryAddress: location || \"Connaught Place, Central Delhi\",", "deliveryAddress: address || location || \"Connaught Place, Central Delhi\",")
content = content.replace("estimatedDelivery: \"1-2 Days\",", "estimatedDelivery: delivery === 'express' ? 'Under 30 mins' : '1-2 Days',")
content = content.replace("payment: { method: \"Wallet/UPI\", status: \"SUCCESS\" },", "payment: { method: payment || \"UPI\", status: \"SUCCESS\" },")

# Remove items passing inside handleCheckoutProcess: `items: cartItems.map`
# Wait, handleCheckoutProcess uses cartItems! We need cartItems in handleCheckoutProcess.
# How to get cartItems? handleCheckoutProcess should accept cartItems.
# Let's change handleCheckoutProcess to accept `(orderBreakdown, address, delivery, payment, cartItems)`
content = content.replace("const handleCheckoutProcess = (orderBreakdown, address, delivery, payment) => {", "const handleCheckoutProcess = (orderBreakdown, address, delivery, payment, cartItems) => {")

# 7. Update CartPage rendering
cart_page_regex = r"if\s*\(activePage\s*===\s*'cart'\)\s*\{\s*return\s*\(\s*<CartPage[\s\S]*?/>\s*\);\s*\}"
new_cart_page = """if (activePage === 'cart') {
    return (
      <CartPage 
        onCheckout={() => setActivePage('checkout')}
        onBack={() => setActivePage('home')} 
      />
    );
  }

  if (activePage === 'checkout') {
    return <CheckoutPage onBack={() => setActivePage('cart')} onConfirmOrder={(data) => {
      // Need to get cartItems from context inside App? Wait.
      // App.jsx is a component. Can it use useCart()?
      // NO, because App is NOT wrapped inside CartProvider inside its own definition.
      // So CheckoutPage needs to pass cartItems back.
      handleCheckoutProcess(data.orderBreakdown, data.address, data.deliveryMethod, data.paymentMethod, data.cartItems);
      setActivePage('order-confirmation');
    }} />
  }"""
content = re.sub(cart_page_regex, new_cart_page, content)

# 8. Remove cartItems and methods from other page renders (HomePage, DeliveryPartnerPortalPage, etc)
# Instead of doing complicated regex, I'll just let the props be passed (they will be undefined). But it's better to remove them.
# Let's remove them from HomePage rendering
content = re.sub(r'cartItems=\{cartItems\}', '', content)
content = re.sub(r'cartCount=\{cartCount\}', '', content)
content = re.sub(r'cartTotal=\{cartTotal\}', '', content)
content = re.sub(r'onAddToCart=\{handleAddToCart\}', '', content)
content = re.sub(r'handleAddToCart=\{handleAddToCart\}', '', content)
content = re.sub(r'getCartQuantity=\{getCartQuantity\}', '', content)
content = re.sub(r'setCartItems=\{setCartItems\}', '', content)

with open('src/App.jsx', 'w') as f:
    f.write(content)
