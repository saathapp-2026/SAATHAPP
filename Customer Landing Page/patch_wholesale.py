import re

with open('src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'r') as f:
    content = f.read()

if "import ConfirmDialog from" not in content:
    content = content.replace("import toast from 'react-hot-toast';", "import toast from 'react-hot-toast';\nimport ConfirmDialog from '../../seller/orders/ConfirmDialog';")

with open('src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'w') as f:
    f.write(content)
