import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, LayoutGrid } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totals } = useCart();
  const cartCount = totals?.itemCount || 0;

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Categories', icon: LayoutGrid, path: '/products' },
    { label: 'Search', icon: Search, path: '/#search' },
    { label: 'Cart', icon: ShoppingBag, path: '/cart', badge: cartCount },
    { label: 'Profile', icon: User, path: '/profile' }
  ];

  const handleNav = (item) => {
    if (item.path === '/#search') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) searchInput.focus();
      }, 300);
      return;
    }

    if (item.path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(item.path.substring(2) + '-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(item.path.substring(2) + '-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => {
    if (path.startsWith('/#')) return false; // Highlight logic for hash links can be complex, default to false
    if (path === '/' && location.pathname !== '/') return false;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return location.pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-theme-border pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex justify-between items-center px-6 py-2.5">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className={`relative flex flex-col items-center justify-center gap-1 w-12 h-12 transition-colors ${active ? 'text-[#6C3BFF]' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} className={active ? 'scale-110 transition-transform' : ''} />
              <span className={`text-[9px] font-bold tracking-wide ${active ? 'opacity-100' : 'opacity-80'}`}>{item.label}</span>
              
              {/* Cart Badge */}
              {item.badge > 0 && (
                <div className="absolute top-0.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black border border-white dark:border-slate-900 shadow-sm">
                  {item.badge}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
