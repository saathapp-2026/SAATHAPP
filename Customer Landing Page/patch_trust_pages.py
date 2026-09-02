import sys

file_path = 'src/App.jsx'
with open(file_path, 'r') as f:
    content = f.read()

replacements = [
  ('<PrivacyPolicyPublicPage />', '<PrivacyPolicyPublicPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'),
  ('<ServiceWarrantyPolicyPage />', '<ServiceWarrantyPolicyPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'),
  ('<VerifiedSellersPage />', '<VerifiedSellersPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'),
  ('<SecureOnlinePaymentsPage />', '<SecureOnlinePaymentsPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'),
  ('<PrivacyProtectedPage />', '<PrivacyProtectedPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'),
  ('<CustomerSupportPage />', '<CustomerSupportPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(file_path, 'w') as f:
    f.write(content)
