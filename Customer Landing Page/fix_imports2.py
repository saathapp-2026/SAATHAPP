import re

files_to_fix = {
    'src/components/seller/products/ProductWizard.jsx': "import ConfirmDialog from '../orders/ConfirmDialog';",
    'src/pages/seller/dashboard/ProductsPage.jsx': "import ConfirmDialog from '../../../components/seller/orders/ConfirmDialog';",
    'src/components/seller/orders/OrdersTable.jsx': "import { EmptyState } from '../../common/StateComponents';",
    'src/pages/seller/Membership.jsx': "import ConfirmDialog from '../../components/seller/orders/ConfirmDialog';",
    'src/components/seller/invoices/InvoiceWizard.jsx': "import ConfirmDialog from '../orders/ConfirmDialog';",
    'src/components/seller/coupons/CouponWizard.jsx': "import ConfirmDialog from '../orders/ConfirmDialog';"
}

for filepath, import_stmt in files_to_fix.items():
    with open(filepath, 'r') as f:
        content = f.read()
    
    if import_stmt not in content:
        content = content.replace("import React", f"{import_stmt}\nimport React", 1)
        
    with open(filepath, 'w') as f:
        f.write(content)

