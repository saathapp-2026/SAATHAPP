import re

with open('src/pages/professional/Dashboard.jsx', 'r') as f:
    content = f.read()

state_repl = """  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('saath_professional_notifs');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: '1', type: 'new_booking', title: 'New Booking Request', description: 'Plumbing service request for Tomorrow 10 AM.', time: '5 min ago', read: false },
      { id: '2', type: 'payment', title: 'Payment Settled', description: '₹1,500 settled for Booking #BK-1204.', time: '1 hr ago', read: false },
      { id: '3', type: 'system', title: 'Document Verified', description: 'Your submitted ID proof has been verified successfully.', time: 'Yesterday', read: true }
    ];
  });
"""

content = content.replace("  const [notifications, setNotifications] = useState([]);", state_repl)

handlers_repl = """  const handleMarkRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('saath_professional_notifs', JSON.stringify(updated));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
    localStorage.setItem('saath_professional_notifs', JSON.stringify([]));
  };"""

content = content.replace("""  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };""", handlers_repl)

with open('src/pages/professional/Dashboard.jsx', 'w') as f:
    f.write(content)
