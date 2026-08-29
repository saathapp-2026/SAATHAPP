with open('./src/components/seller/invoices/InvoiceWizard.jsx', 'r') as f:
    content = f.read()

import re

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import { FileText, Plus, X, Search, User, Briefcase, FileSignature, CheckCircle2 } from 'lucide-react';",
        "import { FileText, Plus, X, Search, User, Briefcase, FileSignature, CheckCircle2 } from 'lucide-react';\nimport ConfirmDialog from '../orders/ConfirmDialog';"
    )

    content = content.replace(
        "const [dirty, setDirty] = useState(false);",
        "const [dirty, setDirty] = useState(false);\n  const [confirmCancel, setConfirmCancel] = useState(false);"
    )

    content = content.replace(
        "if (dirty && !window.confirm('You have unsaved changes. Leave anyway?')) return;",
        """if (dirty) {
      setConfirmCancel(true);
      return;
    }"""
    )

    content = content.replace(
        """    </SellerOverlay>
  );
}""",
        """      <ConfirmDialog
        open={confirmCancel}
        title="Discard changes?"
        message="Your unsaved changes will be lost."
        danger={true}
        confirmLabel="Discard Changes"
        cancelLabel="Keep Editing"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => {
          setConfirmCancel(false);
          onClose();
        }}
      />
    </SellerOverlay>
  );
}"""
    )

    with open('./src/components/seller/invoices/InvoiceWizard.jsx', 'w') as f:
        f.write(content)
