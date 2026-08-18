import re

with open('src/main.jsx', 'r') as f:
    content = f.read()

import_statement = "import { CartProvider } from './context/CartContext.jsx';\n"
if "CartProvider" not in content:
    content = content.replace("import { MembershipProvider }", import_statement + "import { MembershipProvider }")
    content = content.replace("<MembershipProvider>", "<MembershipProvider>\n                <CartProvider>")
    content = content.replace("</MembershipProvider>", "</CartProvider>\n              </MembershipProvider>")

with open('src/main.jsx', 'w') as f:
    f.write(content)
