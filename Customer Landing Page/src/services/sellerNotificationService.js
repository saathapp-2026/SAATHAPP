const NOTIFICATIONS_KEY = 'saathapp-seller-notifications';

const DEFAULT_NOTIFICATIONS = [
  { id: 'n_1', title: 'New Order Received', body: 'Order #ORD-10022 placed for 3 items.', time: '10 min ago', read: false, createdAt: Date.now() - 600000, type: 'order' },
  { id: 'n_2', title: 'Payout Processed', body: 'Your weekly payout of ₹12,450 has been processed.', time: 'Yesterday', read: false, createdAt: Date.now() - 86400000, type: 'payment' },
  { id: 'n_3', title: 'Low Stock Alert', body: 'SKU "PREM-TEA" is running low (2 left).', time: '2 days ago', read: true, createdAt: Date.now() - 172800000, type: 'inventory' }
];

export function getNotifications() {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
  return DEFAULT_NOTIFICATIONS;
}

export function saveNotifications(notifications) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  return notifications;
}

export function markNotificationRead(id) {
  const notifications = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  return saveNotifications(notifications);
}

export function markAllNotificationsRead() {
  const notifications = getNotifications().map((n) => ({ ...n, read: true }));
  return saveNotifications(notifications);
}

export function getUnreadCount() {
  return getNotifications().filter((n) => !n.read).length;
}

export function addNotification({ title, body }) {
  const entry = {
    id: `n_${Date.now()}`,
    title,
    body,
    time: 'Just now',
    read: false,
    createdAt: Date.now(),
  };
  const notifications = [entry, ...getNotifications()];
  return saveNotifications(notifications);
}
