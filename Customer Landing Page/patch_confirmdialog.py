with open('./src/components/seller/orders/ConfirmDialog.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    "<SellerOverlay open={open} onClose={onCancel} labelledBy=\"confirm-title\" zIndex={SELLER_Z.modal}>",
    "<SellerOverlay open={open} onClose={onCancel} preventBackdropClose={danger} labelledBy=\"confirm-title\" zIndex={SELLER_Z.modal}>"
)

with open('./src/components/seller/orders/ConfirmDialog.jsx', 'w') as f:
    f.write(content)
