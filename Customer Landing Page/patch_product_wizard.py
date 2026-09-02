with open('./src/components/seller/products/ProductWizard.jsx', 'r') as f:
    content = f.read()

import re

content = content.replace(
    """    </div>
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
    </div>
  );
}"""
)

with open('./src/components/seller/products/ProductWizard.jsx', 'w') as f:
    f.write(content)
