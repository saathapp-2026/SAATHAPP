import re

with open("src/App.jsx", "r") as f:
    content = f.read()

profile_protection = """
  if (routerLocation.pathname === '/profile' || routerLocation.pathname === '/customer/dashboard') {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        setTimeout(() => navigate('/login', { state: { from: routerLocation.pathname } }), 0);
      }
      return null;
    }
    return <ProfilePage"""

content = content.replace("  if (routerLocation.pathname === '/profile' || routerLocation.pathname === '/customer/dashboard') {\n    return <ProfilePage", profile_protection)

with open("src/App.jsx", "w") as f:
    f.write(content)

