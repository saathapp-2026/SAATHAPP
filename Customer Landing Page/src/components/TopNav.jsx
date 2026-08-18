import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HEADER_NAV_ITEMS } from '../config/categoryConfig';

export default function TopNav() {
  const location = useLocation();

  return (
    <div className="block w-full border-t border-theme-border text-theme-secondary text-[10px] sm:text-[10.5px] md:text-[11px] lg:text-xs font-semibold uppercase tracking-tight sm:tracking-normal lg:tracking-wider py-2 transition-colors relative z-40 overflow-x-auto scrollbar-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 min-w-max">
        <div className="flex items-center justify-start md:justify-center w-full gap-4 sm:gap-2.5 md:gap-3.5 lg:gap-4.5 xl:gap-6">
          
          <Link
            to="/"
            className={`flex items-center gap-1 whitespace-nowrap hover:text-primary transition-colors shrink-0 ${
              location.pathname === '/'
                ? 'text-primary dark:text-primary-light border-b-2 border-primary pb-0.5'
                : 'text-theme-secondary'
            }`}
          >
            HOME
          </Link>

          {HEADER_NAV_ITEMS.map((item) => {
            const isActive = item.path === '/products'
              ? (location.pathname === '/products' || location.pathname === '/products/')
              : location.pathname.startsWith(item.path);

            if (item.isPlus) {
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1 whitespace-nowrap transition-all font-black shrink-0 ${
                    isActive
                      ? 'text-amber-500 border-b-2 border-amber-500 pb-0.5'
                      : 'text-amber-600 dark:text-amber-400 hover:text-amber-500'
                  }`}
                >
                  <span className="text-amber-500 animate-pulse text-xs sm:text-sm">✦</span>
                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                    {item.name}
                  </span>
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black tracking-wider shadow-xs ml-0.5">
                    NEW
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-1 whitespace-nowrap hover:text-primary transition-colors shrink-0 ${
                  isActive
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary pb-0.5'
                    : 'text-theme-secondary'
                }`}
              >
                {item.name === 'Offers' && <span className="text-amber-500 text-xs sm:text-sm">♡</span>}
                {item.name}
                {item.isNew && (
                  <span className="bg-primary text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-sm font-bold ml-0.5">
                    NEW
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
