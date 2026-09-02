import sys, re

path = 'src/pages/HelpCenter/components/Navbar.jsx'
with open(path, 'r') as f:
    content = f.read()

new_nav_items = """const navItems = [
  { label: "Home", to: "/" },
  { label: "Help Center", to: "/help-support" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/customer-support" },
];"""

content = re.sub(r'const navItems = \[.*?\];', new_nav_items, content, flags=re.DOTALL)

# replace <a> in loop with <Link>
content = re.sub(r'<a\s+key=\{item\.label\}\s+href=\{item\.href\}\s+onClick=\{\(e\) => scrollToSection\(e, item\.href\)\}',
    r'<Link\n              key={item.label}\n              to={item.to}\n              onClick={() => setMobileMenuOpen(false)}', content)

# replace </a> with </Link> (since we changed the <a key={item.label} ... to <Link)
# Wait, some <a> are not in the loop. The "Support" buttons:
# 1. Desktop Support Button
content = re.sub(r'<a\s+href="#contact"\s+onClick=\{\(e\) => scrollToSection\(e, "#contact"\)\}', r'<Link\n            to="/customer-support"', content)

# 2. Mobile Support Button
content = re.sub(r'<a\s+href="#contact"\s+onClick=\{\(e\) => scrollToSection\(e, "#contact"\)\}', r'<Link\n                to="/customer-support"', content)

content = content.replace('</a>', '</Link>')

with open(path, 'w') as f:
    f.write(content)
