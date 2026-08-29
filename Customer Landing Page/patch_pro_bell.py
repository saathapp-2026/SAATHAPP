with open('src/components/professional/Topbar.jsx', 'r') as f:
    content = f.read()

content = content.replace("toast.success('View notifications via the Sidebar menu option.') }", "onNavigateTab?.('notifications') }")

with open('src/components/professional/Topbar.jsx', 'w') as f:
    f.write(content)
