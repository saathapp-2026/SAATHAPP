import re

with open('src/pages/Profile.jsx', 'r') as f:
    content = f.read()

old_str = """                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                          toast.success('All notifications marked as read.') }}"""

new_str = """                        onClick={() => {
                          const updated = notifications.map(n => ({ ...n, read: true }));
                          setNotifications(updated);
                          localStorage.setItem('saath_notifications', JSON.stringify(updated));
                          toast.success('All notifications marked as read.');
                        }}"""

if old_str in content:
    content = content.replace(old_str, new_str)
else:
    print("Could not find mark all string!")

with open('src/pages/Profile.jsx', 'w') as f:
    f.write(content)
