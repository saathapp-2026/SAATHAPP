import sys

files = [
    'src/pages/TermsOfService.jsx',
    'src/pages/trust/CustomerSupport.jsx',
    'src/pages/trust/PrivacyProtected.jsx',
    'src/pages/trust/SecureOnlinePayments.jsx',
    'src/pages/trust/VerifiedSellers.jsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()

    # 1. Add props to the function signature
    old_func = 'export default function ' + file_path.split('/')[-1].split('.')[0] + 'Page()'
    new_func = 'export default function ' + file_path.split('/')[-1].split('.')[0] + 'Page({ location, onLocationClick })'
    content = content.replace(old_func, new_func)

    # 2. Add props to <Header>
    # Find <Header and inject location={location} onLocationClick={onLocationClick}
    # Some have <Header\n or <Header ...
    if '<Header' in content:
        # Just replace the first <Header with <Header location={location} onLocationClick={onLocationClick}
        content = content.replace('<Header', '<Header location={location} onLocationClick={onLocationClick}', 1)
    
    with open(file_path, 'w') as f:
        f.write(content)
