with open('./src/components/seller/coupons/CouponWizard.jsx', 'r') as f:
    content = f.read()

import re

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import { Ticket, Percent, Plus, X, Users, Box, CheckCircle2 } from 'lucide-react';",
        "import { Ticket, Percent, Plus, X, Users, Box, CheckCircle2 } from 'lucide-react';\nimport ConfirmDialog from '../orders/ConfirmDialog';"
    )

    content = content.replace(
        "const [dirty, setDirty] = useState(false);",
        "const [dirty, setDirty] = useState(false);\n  const [confirmCancel, setConfirmCancel] = useState(false);"
    )

    content = content.replace(
        "if (dirty && !window.confirm('Leave without publishing? Draft will be kept.')) return;",
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

    with open('./src/components/seller/coupons/CouponWizard.jsx', 'w') as f:
        f.write(content)
