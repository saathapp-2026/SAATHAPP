with open('./src/pages/Profile.jsx', 'r') as f:
    content = f.read()

import re

# Add useScrollLock if not present
if 'useScrollLock' not in content:
    content = content.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect } from 'react';\nimport useScrollLock from '../hooks/useScrollLock';"
    )

content = content.replace(
    "const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);",
    "const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);\n  useScrollLock(showLogoutConfirm);\n  useEffect(() => {\n    if (showLogoutConfirm) {\n      const handler = (e) => e.key === 'Escape' && setShowLogoutConfirm(false);\n      window.addEventListener('keydown', handler);\n      return () => window.removeEventListener('keydown', handler);\n    }\n  }, [showLogoutConfirm]);"
)

with open('./src/pages/Profile.jsx', 'w') as f:
    f.write(content)
