with open('./src/pages/worker/Register.jsx', 'r') as f:
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
      const maxMb = docType === 'aadhaar' ? 5 : 2;
      if (file.size > maxMb * 1024 * 1024) {
        setError(`File must be smaller than ${maxMb}MB.`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Only JPEG/PNG images are supported.');
        return;
      }
      setFiles((prev) => ({ ...prev, [docType]: file.name }));
    }
  };"""
)

with open('./src/pages/worker/Register.jsx', 'w') as f:
    f.write(content)
