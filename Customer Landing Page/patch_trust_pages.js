const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  ['<PrivacyPolicyPublicPage />', '<PrivacyPolicyPublicPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'],
  ['<ServiceWarrantyPolicyPage />', '<ServiceWarrantyPolicyPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'],
  ['<VerifiedSellersPage />', '<VerifiedSellersPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'],
  ['<SecureOnlinePaymentsPage />', '<SecureOnlinePaymentsPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'],
  ['<PrivacyProtectedPage />', '<PrivacyProtectedPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'],
  ['<CustomerSupportPage />', '<CustomerSupportPage location={location} onLocationClick={() => setIsLocationModalOpen(true)} />'],
];

replacements.forEach(([from, to]) => {
  content = content.split(from).join(to);
});

fs.writeFileSync(file, content);
