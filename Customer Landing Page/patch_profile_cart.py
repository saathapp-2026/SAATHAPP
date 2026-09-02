import re

with open('src/pages/Profile.jsx', 'r') as f:
    content = f.read()

# Add useCart import if not exists
if "import { useCart } from" not in content:
    content = content.replace("import CartTab from '../components/customer/CartTab';", "import CartTab from '../components/customer/CartTab';\nimport { useCart } from '../hooks/useCart';")

# replace local cart state
content = content.replace("  const [cart, setCart] = useState([]);", "  // Disconnected cart replaced by useCart")

if "const { cartItems, handleAddToCart, removeItem, clearCart, totals } = useCart();" not in content:
    content = content.replace("  const location = useLocation();", "  const location = useLocation();\n  const { cartItems, handleAddToCart, removeItem, clearCart, totals } = useCart();")

# pass correct props to CartTab
old_cart_tab = """                  <CartTab
                    cart={cart}
                    setCart={setCart}
                    walletBalance={walletBalance}
                    setWalletBalance={setWalletBalance}
                    orders={orders}
                    setOrders={setOrders}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    setActiveTab={setActiveTab}
                  />"""

new_cart_tab = """                  <CartTab
                    cart={cartItems}
                    setCart={() => {}}
                    walletBalance={walletBalance}
                    setWalletBalance={setWalletBalance}
                    orders={orders}
                    setOrders={setOrders}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    setActiveTab={setActiveTab}
                    handleUpdateQty={handleAddToCart}
                    handleRemoveItem={removeItem}
                    clearCart={clearCart}
                    totals={totals}
                  />"""

content = content.replace(old_cart_tab, new_cart_tab)

with open('src/pages/Profile.jsx', 'w') as f:
    f.write(content)
