with open('./src/components/seller/orders/ReasonDialog.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    "loading={loading}",
    "loading={loading}\n      confirmDisabled={reason === 'Custom Reason' && !customReason.trim()}"
)

with open('./src/components/seller/orders/ReasonDialog.jsx', 'w') as f:
    f.write(content)

with open('./src/components/seller/orders/ConfirmDialog.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    "loading = false,",
    "loading = false,\n  confirmDisabled = false,"
)
content = content.replace(
    "disabled={loading}",
    "disabled={loading || confirmDisabled}"
)

with open('./src/components/seller/orders/ConfirmDialog.jsx', 'w') as f:
    f.write(content)
