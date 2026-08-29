import re

with open('src/pages/Profile.jsx', 'r') as f:
    content = f.read()

mock_notifications = """    localStorage.setItem('saath_notifications', JSON.stringify([
      { id: 1, title: 'Order Delivered', message: 'Your order #ORD-7892 has been delivered successfully.', time: '2 hours ago', read: false },
      { id: 2, title: 'Promo Code Available', message: 'Use code SAATH50 to get ₹50 off on your next booking!', time: 'Yesterday', read: true },
      { id: 3, title: 'Welcome to SaathApp', message: 'Complete your profile to unlock all features.', time: '2 days ago', read: true }
    ]));"""

content = content.replace("    localStorage.setItem('saath_notifications', JSON.stringify([]));", mock_notifications)

with open('src/pages/Profile.jsx', 'w') as f:
    f.write(content)
