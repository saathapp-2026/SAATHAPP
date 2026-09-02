import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    content = content.replace("toast.success(msg);", "toast.success(msg)")
    content = re.sub(r'toast\.success\((.*?)\);\s*\}', r'toast.success(\1) }', content)
    # Also for `toast.success(...);` at the end of an arrow function like `() => toast.success(...);` inside JSX `{ ... }`
    # Basically if we see `toast.success(...);}` we change it to `toast.success(...)}`
    
    # Better: just remove `;` after `toast.success(...)` if it's immediately followed by `}` or `</` or ` className` etc. 
    # Let's just find all `toast.success(...);` inside `{ ... }`
    # Let's fix the specific ones
    content = content.replace(");}", ")}")
    content = content.replace("); }", ") }")
    content = content.replace("); \n", ");\n")
    
    # Let's just use regex to remove `;` if it's right before a `}` (with optional spaces)
    content = re.sub(r'toast\.success\((.*?)\);\s*\}', r'toast.success(\1)}', content)
    
    # Another issue: onClick={() => toast.success("xyz");}
    # It matched `);}` and became `)}` which is `onClick={() => toast.success("xyz")}` - perfect!
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            process_file(os.path.join(root, file))
