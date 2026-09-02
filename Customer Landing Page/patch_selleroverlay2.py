with open('./src/components/seller/SellerOverlay.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    "contentClassName = '',",
    "contentClassName = '',\n  preventBackdropClose = false,"
)

content = content.replace(
    """<button
        type="button"
        className="absolute inset-0 bg-black/50"
        style={{ zIndex: 0 }}
        aria-label="Close dialog"
        onClick={onClose}
      />""",
    """<div
        className="absolute inset-0 bg-black/50"
        style={{ zIndex: 0 }}
        aria-label="Close dialog"
        onClick={() => { if (!preventBackdropClose) onClose?.(); }}
      />"""
)

with open('./src/components/seller/SellerOverlay.jsx', 'w') as f:
    f.write(content)
