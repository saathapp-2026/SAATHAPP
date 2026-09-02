with open('./src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """  const handleDeleteDraft = () => {
    if (window.confirm('Are you sure you want to reset and clear this product form?')) {
      setFormData(INITIAL_FORM_STATE);
      setCurrentStep(1);
      addToast?.('Form cleared and reset to initial template.', 'info');
    }
  };""",
    """  const handleDeleteDraft = () => {
    setConfirmCancel(true);
  };"""
)

with open('./src/components/wholesale/dashboard/WholesaleAddProductModal.jsx', 'w') as f:
    f.write(content)
