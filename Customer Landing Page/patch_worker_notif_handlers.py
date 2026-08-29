import re

with open('src/pages/worker/Dashboard.jsx', 'r') as f:
    content = f.read()

replacement = """  const handleMarkRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('saath_worker_notifs', JSON.stringify(updated));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
    localStorage.setItem('saath_worker_notifs', JSON.stringify([]));
  };"""

content = content.replace("""  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };""", replacement)

with open('src/pages/worker/Dashboard.jsx', 'w') as f:
    f.write(content)
