import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    has_changes = False

    # Find if we need to inject toast
    needs_toast = False
    
    # Simple alert replacements
    if 'alert(' in content:
        needs_toast = True
        content = re.sub(r'alert\((.*?)\);?', r'toast.success(\1);', content)
        
    if needs_toast and "import toast" not in content and "react-hot-toast" not in content:
        # try to inject after the last import
        imports = re.findall(r'^import .*;', content, re.MULTILINE)
        if imports:
            last_import = imports[-1]
            content = content.replace(last_import, last_import + "\nimport toast from 'react-hot-toast';")
        else:
            content = "import toast from 'react-hot-toast';\n" + content
            
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Patched {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            process_file(os.path.join(root, file))
