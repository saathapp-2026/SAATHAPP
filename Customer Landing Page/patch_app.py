import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# Replace handleLogin
new_handle_login = """
  const handleLogin = (response) => {
    // response is { user, token }
    setUser(response.user);
    setIsAuthenticated(true);
    saveAuthSession(response.user);
    setAuthView('home');
    setActivePage('home');
    setErrorMessage('');
    
    const returnTo = routerLocation.state?.from || '/';
    navigate(returnTo, { replace: true });
  };
"""

content = re.sub(
    r"const handleLogin = async \(\{ identifier, password, _mode \}\) => \{.*?\n  \};\n",
    new_handle_login + "\n",
    content,
    flags=re.DOTALL
)

# Protect checkout
checkout_protection = """
  if (activePage === 'checkout' || routerLocation.pathname === '/checkout') {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        setTimeout(() => navigate('/login', { state: { from: '/checkout' } }), 0);
      }
      return null;
    }
    return (
"""
content = content.replace("  if (activePage === 'checkout' || routerLocation.pathname === '/checkout') {\n    return (", checkout_protection)

# Protect orders
orders_protection = """
  if (activePage === 'orders' || routerLocation.pathname === '/orders') {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        setTimeout(() => navigate('/login', { state: { from: '/orders' } }), 0);
      }
      return null;
    }
    return <OrdersPage"""
content = content.replace("  if (activePage === 'orders' || routerLocation.pathname === '/orders') {\n    return <OrdersPage", orders_protection)

# Protect customer dashboard
dashboard_protection = """
  if (routerLocation.pathname === '/customer/dashboard' || routerLocation.pathname === '/profile' || routerLocation.pathname === '/account') {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        setTimeout(() => navigate('/login', { state: { from: routerLocation.pathname } }), 0);
      }
      return null;
    }
    // We assume the rendering of Profile/Dashboard happens elsewhere or here.
"""
# Need to see if App.jsx handles /profile or /customer/dashboard explicitly in AppContent
with open("src/App.jsx", "w") as f:
    f.write(content)

