import re

with open('src/pages/Profile.jsx', 'r') as f:
    content = f.read()

# I want to add navigate logic to Profile notifications
target = """                        <div key={notif.id} onClick={() => {
                          if (!notif.read) {
                            const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                            setNotifications(updated);
                            localStorage.setItem('saath_notifications', JSON.stringify(updated));
                          }
                        }}"""
replacement = """                        <div key={notif.id} onClick={() => {
                          if (!notif.read) {
                            const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                            setNotifications(updated);
                            localStorage.setItem('saath_notifications', JSON.stringify(updated));
                          }
                          if (notif.title.includes('Order')) setActiveTab('orders');
                          else if (notif.title.includes('Promo')) setActiveTab('wallet');
                          else if (notif.title.includes('Welcome')) setActiveTab('profile');
                        }}"""

content = content.replace(target, replacement)

with open('src/pages/Profile.jsx', 'w') as f:
    f.write(content)
