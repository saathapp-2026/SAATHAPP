import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# Find the block:
block = """  const isProtectedPath = routerLocation.pathname === '/profile' || routerLocation.pathname === '/customer/dashboard';
  const protectedActivePages = ['edit-profile', 'wallet', 'rewards', 'addresses', 'notifications', 'payment', 'cart', 'orders', 'wishlist', 'settings'];
  const isProtectedActivePage = protectedActivePages.includes(activePage);

  if ((isProtectedPath || isProtectedActivePage || !isPublicRoute) && !hasValidSession) {
    return <LoginPage onLogin={handleLogin} onSignup={() => navigate('/signup')} onForgotPassword={() => navigate('/login')} onOtpLogin={() => navigate('/login')} error={errorMessage} />;
  }"""

if block in content:
    content = content.replace(block, "")
    print("Removed legacy protection block")
else:
    print("Legacy block not found, maybe slightly different formatting?")

with open("src/App.jsx", "w") as f:
    f.write(content)
