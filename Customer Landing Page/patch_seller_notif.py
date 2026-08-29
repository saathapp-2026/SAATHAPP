with open('src/services/sellerNotificationService.js', 'r') as f:
    content = f.read()

mock_data = """const DEFAULT_NOTIFICATIONS = [
  { id: 'n_1', title: 'New Order Received', body: 'Order #ORD-10022 placed for 3 items.', time: '10 min ago', read: false, createdAt: Date.now() - 600000, type: 'order' },
  { id: 'n_2', title: 'Payout Processed', body: 'Your weekly payout of ₹12,450 has been processed.', time: 'Yesterday', read: false, createdAt: Date.now() - 86400000, type: 'payment' },
  { id: 'n_3', title: 'Low Stock Alert', body: 'SKU "PREM-TEA" is running low (2 left).', time: '2 days ago', read: true, createdAt: Date.now() - 172800000, type: 'inventory' }
];"""

content = content.replace("const DEFAULT_NOTIFICATIONS = [];", mock_data)

with open('src/services/sellerNotificationService.js', 'w') as f:
    f.write(content)
