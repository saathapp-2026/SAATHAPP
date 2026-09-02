with open('./src/components/seller/reports/ReportWizard.jsx', 'r') as f:
    content = f.read()

import re

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import SellerOverlay from '../SellerOverlay';",
        "import SellerOverlay from '../SellerOverlay';\nimport ConfirmDialog from '../orders/ConfirmDialog';"
    )
    content = content.replace(
        "const [dirty, setDirty] = useState(false);",
        "const [dirty, setDirty] = useState(false);\n  const [confirmCancel, setConfirmCancel] = useState(false);"
    )
    content = content.replace(
        "if (dirty && !window.confirm('You have unsaved draft selections. Leave without generating?')) return;",
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
        message="Your unsaved draft selections will be lost."
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
    with open('./src/components/seller/reports/ReportWizard.jsx', 'w') as f:
        f.write(content)

with open('./src/components/ad-manager/AdWizard.jsx', 'r') as f:
    content = f.read()

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import SellerOverlay from '../seller/SellerOverlay';",
        "import SellerOverlay from '../seller/SellerOverlay';\nimport ConfirmDialog from '../seller/orders/ConfirmDialog';"
    )
    content = content.replace(
        "const [dirty, setDirty] = useState(false);",
        "const [dirty, setDirty] = useState(false);\n  const [confirmCancel, setConfirmCancel] = useState(false);"
    )
    content = content.replace(
        "if (dirty && !window.confirm('You have unsaved changes. Leave without submitting?')) return;",
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
    with open('./src/components/ad-manager/AdWizard.jsx', 'w') as f:
        f.write(content)

