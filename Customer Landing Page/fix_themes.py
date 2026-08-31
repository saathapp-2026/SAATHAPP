import sys, os, glob, re

directories = [
    'src/pages/HelpCenter/components',
    'src/pages/HelpCenter',
    'src/pages/trust',
    'src/components',
]

def replace_in_file(path):
    with open(path, 'r') as f:
        content = f.read()

    original = content
    # Replace background colors
    content = content.replace('bg-[#fafafa]', 'bg-page')
    content = content.replace('bg-[#f8faf9]', 'bg-page')
    
    # Usually bg-white can be replaced by bg-surface
    # But only if it's a card or section background.
    # Let's do a regex that replaces bg-white with bg-surface
    # but not text-white or similar
    content = re.sub(r'\bbg-white\b', 'bg-surface', content)
    content = re.sub(r'\bbg-white/([0-9]+)\b', r'bg-surface/\1', content)
    
    # Some borders
    content = re.sub(r'\bborder-\[#E2E8F0\]\b', 'border-slate-200 dark:border-slate-700', content)
    content = re.sub(r'\bborder-\[#EEF2F7\]\b', 'border-slate-100 dark:border-slate-800', content)
    
    # Text colors
    content = re.sub(r'\btext-\[#0F172A\]\b', 'text-slate-900 dark:text-white', content)
    content = re.sub(r'\btext-\[#64748B\]\b', 'text-slate-500 dark:text-slate-400', content)

    if content != original:
        with open(path, 'w') as f:
            f.write(content)

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.jsx'):
                replace_in_file(os.path.join(root, file))

