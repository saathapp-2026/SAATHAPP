import re

with open("src/pages/Checkout.jsx", "r") as f:
    content = f.read()

handle_confirm_old = r"""  const handleConfirm = () => {
    if (paymentMethod !== 'cod' && !import.meta.env.VITE_PAYMENT_GATEWAY_KEY) {"""

handle_confirm_new = r"""  const handleConfirm = () => {
    const isDevMockEnabled = import.meta.env.VITE_ENABLE_DEV_MOCK_LOGIN === 'true';
    if (paymentMethod !== 'cod' && !import.meta.env.VITE_PAYMENT_GATEWAY_KEY && !isDevMockEnabled) {"""

content = content.replace(handle_confirm_old, handle_confirm_new)

with open("src/pages/Checkout.jsx", "w") as f:
    f.write(content)
