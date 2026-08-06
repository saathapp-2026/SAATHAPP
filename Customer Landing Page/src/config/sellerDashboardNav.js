import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Wallet, Settings, HelpCircle, Store, Crown, Boxes, Megaphone, CreditCard, Receipt, FileBarChart, Ticket, Monitor, FolderOpen, BadgeCheck, Gift, ShoppingBag } from 'lucide-react';

export const DASHBOARD_NAV_ITEMS = [
  { path: '/seller/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/seller/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/seller/dashboard/products', label: 'Products', icon: Package },
  { path: '/seller/dashboard/inventory', label: 'Inventory', icon: Boxes },
  { path: '/seller/dashboard/customers', label: 'Customers', icon: Users },
  { path: '/seller/dashboard/marketing', label: 'Marketing', icon: Megaphone },
  { path: '/seller/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/seller/dashboard/wallet', label: 'Wallet', icon: Wallet },
  { path: '/seller/dashboard/payments', label: 'Payments', icon: CreditCard },
  { path: '/seller/dashboard/invoices', label: 'Invoices', icon: Receipt },
  { path: '/seller/dashboard/reports', label: 'Reports', icon: FileBarChart },
  { path: '/seller/dashboard/coupons', label: 'Coupons', icon: Ticket },
  { path: '/seller/dashboard/onboarding', label: 'Onboarding', icon: BadgeCheck },
  { path: '/seller/dashboard/membership', label: 'Membership', icon: Crown },
  { path: '/seller/dashboard/welcome-kit', label: 'Welcome Kit', icon: Gift },
  { path: '/seller/dashboard/branding', label: 'Branding Store', icon: ShoppingBag },
  { path: '/seller/dashboard/settings', label: 'Store Settings', icon: Settings },
  { path: '/seller/dashboard/documents', label: 'Documents', icon: FolderOpen },
  { path: '/seller/dashboard/support', label: 'Support', icon: HelpCircle },
];

export const DASHBOARD_BREADCRUMB_LABELS = {
  '/seller/dashboard': 'Dashboard',
  '/seller/dashboard/orders': 'Orders',
  '/seller/dashboard/products': 'Products',
  '/seller/dashboard/inventory': 'Inventory',
  '/seller/dashboard/customers': 'Customers',
  '/seller/dashboard/marketing': 'Marketing',
  '/seller/dashboard/analytics': 'Analytics',
  '/seller/dashboard/wallet': 'Wallet',
  '/seller/dashboard/payments': 'Payments',
  '/seller/dashboard/invoices': 'Invoices',
  '/seller/dashboard/reports': 'Reports',
  '/seller/dashboard/coupons': 'Coupons',
  '/seller/dashboard/onboarding': 'Onboarding',
  '/seller/dashboard/membership': 'Membership',
  '/seller/dashboard/welcome-kit': 'Welcome Kit',
  '/seller/dashboard/branding': 'Branding Store',
  '/seller/dashboard/settings': 'Store Settings',
  '/seller/dashboard/documents': 'Documents',
  '/seller/dashboard/support': 'Support',
};

export { Store };
