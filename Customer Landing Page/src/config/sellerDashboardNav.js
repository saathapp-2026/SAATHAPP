import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Wallet, Settings, HelpCircle, Store, Crown, Megaphone } from 'lucide-react';

export const DASHBOARD_NAV_ITEMS = [
  { path: '/seller/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/seller/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/seller/dashboard/products', label: 'Products', icon: Package },
  { path: '/seller/dashboard/customers', label: 'Customers', icon: Users },
  { path: '/seller/dashboard/marketing', label: 'Marketing', icon: Megaphone },
  { path: '/seller/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/seller/dashboard/wallet', label: 'Wallet', icon: Wallet },
  { path: '/seller/dashboard/profile', label: 'Profile & Settings', icon: Settings },
  { path: '/seller/dashboard/membership', label: 'Membership', icon: Crown },
  { path: '/seller/dashboard/support', label: 'Support', icon: HelpCircle },
];

export const DASHBOARD_BREADCRUMB_LABELS = {
  '/seller/dashboard': 'Dashboard',
  '/seller/dashboard/orders': 'Orders',
  '/seller/dashboard/products': 'Products',
  '/seller/dashboard/customers': 'Customers',
  '/seller/dashboard/marketing': 'Marketing',
  '/seller/dashboard/analytics': 'Analytics',
  '/seller/dashboard/wallet': 'Wallet',
  '/seller/dashboard/profile': 'Profile & Settings',
  '/seller/dashboard/profile/onboarding': 'Profile & Settings / Onboarding',
  '/seller/dashboard/profile/store': 'Profile & Settings / Store Profile',
  '/seller/dashboard/profile/documents': 'Profile & Settings / Documents',
  '/seller/dashboard/membership': 'Membership',
  '/seller/dashboard/support': 'Support',
};

export { Store };
