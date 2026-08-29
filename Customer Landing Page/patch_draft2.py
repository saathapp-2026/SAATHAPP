with open('./src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'r') as f:
    content = f.read()

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import { X, Save, ShieldAlert, Sparkles, AlertCircle, Info, FileText } from 'lucide-react';",
        "import { X, Save, ShieldAlert, Sparkles, AlertCircle, Info, FileText } from 'lucide-react';\nimport ConfirmDialog from '../../seller/orders/ConfirmDialog';"
    )
    content = content.replace(
        "const [currentStep, setCurrentStep] = useState(1);",
        "const [currentStep, setCurrentStep] = useState(1);\n  const [confirmCancel, setConfirmCancel] = useState(false);"
    )
    content = content.replace(
        """    </div>
  );
}""",
        """      <ConfirmDialog
        open={confirmCancel}
        title="Reset Form?"
        message="Are you sure you want to reset and clear this product form?"
        danger={true}
        confirmLabel="Reset Form"
        cancelLabel="Keep Editing"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => {
          setConfirmCancel(false);
          setFormData(INITIAL_FORM_STATE);
          setCurrentStep(1);
          addToast?.('Form cleared and reset to initial template.', 'info');
        }}
      />
    </div>
  );
}"""
    )

with open('./src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'w') as f:
    f.write(content)
