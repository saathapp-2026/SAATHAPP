const fs = require('fs');

const path = 'src/pages/HelpCenter/components/Navbar.jsx';
let content = fs.readFileSync(path, 'utf8');

// replace navItems
content = content.replace(/const navItems = \[[\s\S]*?\];/, `const navItems = [
  { label: "Home", to: "/" },
  { label: "Help Center", to: "/help-support" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/customer-support" },
];`);

// replace <a ... > with <Link to={item.to} ...>
content = content.replace(/<a\s+key=\{item\.label\}\s+href=\{item\.href\}\s+onClick=\{\(e\) => scrollToSection\(e, item\.href\)\}/g, '<Link\n              key={item.label}\n              to={item.to}\n              onClick={() => setMobileMenuOpen(false)}');
content = content.replace(/<\/a>/g, '</Link>');

// Wait, the "Support" button has href="#contact"
content = content.replace(/<a\n\s+href="#contact"[\s\S]*?onClick=\{\(e\) => scrollToSection\(e, "#contact"\)\}/g, '<Link\n            to="/customer-support"');
content = content.replace(/<a\n\s+href="#contact"\n\s+onClick=\{\(e\) => scrollToSection\(e, "#contact"\)\}/g, '<Link\n                to="/customer-support"');

fs.writeFileSync(path, content);
