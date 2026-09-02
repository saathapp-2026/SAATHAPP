import re

with open('src/pages/worker/Dashboard.jsx', 'r') as f:
    content = f.read()

state_repl = """  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('saath_worker_notifs');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: '1', type: 'new_job', title: 'New Job Assigned', description: 'Deep Cleaning service at Andheri East assigned for Tomorrow.', time: '10 min ago', read: false },
      { id: '2', type: 'salary_credited', title: 'Weekly Payout', description: '₹4,500 credited to your registered bank account.', time: 'Yesterday', read: false },
      { id: '3', type: 'review_received', title: '5-Star Rating', description: 'Customer gave you 5 stars for AC Repair service.', time: '3 days ago', read: true }
    ];
  });
"""

content = content.replace("  const [notifications, setNotifications] = useState([]);", state_repl)

# also fix handleMarkRead and handleClearAllNotifs if they don't persist
# I need to see what they do.
