import { Laptop, ShoppingBag, Wrench, Calendar, Heart, ShoppingCart, MapPin, CreditCard, Wallet, Star, HelpCircle, Bell, Settings } from 'lucide-react';

export const getCustomerMenu = (t) => [
  { tab: 'dashboard', label: t('dashboard'), icon: Laptop },
  { tab: 'orders', label: t('orders'), icon: ShoppingBag },
  { tab: 'services', label: 'Services', icon: Wrench },
  { tab: 'bookings', label: t('bookings'), icon: Calendar },
  { tab: 'wishlist', label: 'Wishlist', icon: Heart },
  { tab: 'cart', label: 'Cart', icon: ShoppingCart },
  { tab: 'addresses', label: t('saved_addresses'), icon: MapPin },
  { tab: 'payments', label: 'Payments', icon: CreditCard },
  { tab: 'wallet', label: t('wallet'), icon: Wallet },
  { tab: 'reviews', label: 'Reviews', icon: Star },
  { tab: 'support', label: t('customer_support'), icon: HelpCircle },
  { tab: 'notifications', label: t('notifications'), icon: Bell },
  { tab: 'settings', label: t('settings'), icon: Settings },
];
