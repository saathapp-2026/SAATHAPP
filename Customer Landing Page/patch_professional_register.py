with open('./src/pages/professional/Register.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """  const handleFileChange = (e, docType) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [docType]: e.target.files[0].name }));
    }
  };""",
    """  const handleFileChange = (e, docType) => {
    setError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError(`File must be smaller than 5MB.`);
        return;
      }
      setFiles((prev) => ({ ...prev, [docType]: file.name }));
    }
  };"""
)

with open('./src/pages/professional/Register.jsx', 'w') as f:
    f.write(content)
