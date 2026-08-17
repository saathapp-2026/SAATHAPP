import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'All Categories', path: '/products' },
  { name: 'Grocery', path: '/products/grocery' },
  { name: 'Electronics', path: '/products/electronics' },
  { name: 'Mobiles', path: '/products/mobiles' },
  { name: 'Fashion', path: '/products/fashion' },
  { name: 'Home & Kitchen', path: '/products/home-kitchen' },
  { name: 'Hardware', path: '/products/hardware' },
  { name: 'Services', path: '/services' },
  { name: 'SaathApp Product', path: '/products/saathapp', isNew: true },
  { name: 'Offers', path: '/offers', icon: 'Offers' },
];

export default function TopNav() {
  const location = useLocation();

  return (
    <div className="hidden sm:block w-full border-t border-theme-border text-theme-secondary text-xs font-semibold uppercase tracking-wider py-2 transition-colors relative z-40">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          
          <Link
            to="/"
            className={`flex items-center gap-1.5 whitespace-nowrap hover:text-primary transition-colors ${
              location.pathname === '/'
                ? 'text-primary dark:text-primary-light border-b-2 border-primary pb-0.5'
                : 'text-theme-secondary'
            }`}
          >
            HOME
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-1.5 whitespace-nowrap hover:text-primary transition-colors ${
                (item.path === '/products' ? (location.pathname === '/products' || location.pathname === '/products/') : location.pathname.startsWith(item.path))
                  ? 'text-primary dark:text-primary-light border-b-2 border-primary pb-0.5'
                  : 'text-theme-secondary'
              }`}
            >
              {item.name === 'Offers' && <span className="text-amber-500 text-sm">♡</span>}
              {item.name}
              {item.isNew && (
                <span className="bg-primary text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold ml-1">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
