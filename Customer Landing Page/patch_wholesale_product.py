with open('./src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'r') as f:
    content = f.read()

if 'ConfirmDialog' not in content:
    content = content.replace(
        "import { X, UploadCloud, Plus, CheckCircle2, AlertCircle } from 'lucide-react';",
        "import { X, UploadCloud, Plus, CheckCircle2, AlertCircle } from 'lucide-react';\nimport ConfirmDialog from '../../seller/orders/ConfirmDialog';"
    )
    content = content.replace(
        "const [activeTab, setActiveTab] = useState('basic');",
        "const [activeTab, setActiveTab] = useState('basic');\n  const [confirmCancel, setConfirmCancel] = useState(false);"
    )
    content = content.replace(
        """  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset and clear this product form?')) {
      setFormData(INITIAL_STATE);
      setFiles({ main: null, gallery1: null, gallery2: null, gallery3: null });
    }
  };""",
        """  const handleReset = () => {
    setConfirmCancel(true);
  };"""
    )
    content = content.replace(
        """    </div>
  );
}""",
        """      <ConfirmDialog
        open={confirmCancel}
        title="Discard changes?"
        message="Are you sure you want to reset and clear this product form?"
        danger={true}
        confirmLabel="Reset Form"
        cancelLabel="Keep Editing"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => {
          setConfirmCancel(false);
          setFormData(INITIAL_STATE);
          setFiles({ main: null, gallery1: null, gallery2: null, gallery3: null });
        }}
      />
    </div>
  );
}"""
    )
    with open('./src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'w') as f:
        f.write(content)
