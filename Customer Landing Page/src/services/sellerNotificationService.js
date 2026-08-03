const NOTIFICATIONS_KEY = 'saathapp-seller-notifications';

const DEFAULT_NOTIFICATIONS = [
  { id: 'n1', title: 'New order received', body: 'Order #SA-1042 — ₹1,250', time: '2m ago', read: false, createdAt: Date.now() - 120000 },
  { id: 'n2', title: 'Product approved', body: 'Organic Mangoes is now live', time: '1h ago', read: false, createdAt: Date.now() - 3600000 },
  { id: 'n3', title: 'Payment settled', body: '₹8,420 credited to wallet', time: '3h ago', read: true, createdAt: Date.now() - 10800000 },
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
