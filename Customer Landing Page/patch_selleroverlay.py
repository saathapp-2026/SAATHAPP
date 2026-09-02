with open('./src/components/seller/SellerOverlay.jsx', 'r') as f:
    content = f.read()

import re

# Add useEffect for Escape key
content = content.replace(
    "useScrollLock(!!open);",
    """useScrollLock(!!open);
  
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);"""
)

with open('./src/components/seller/SellerOverlay.jsx', 'w') as f:
    f.write(content)
