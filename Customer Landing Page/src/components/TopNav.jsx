import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HEADER_NAV_ITEMS } from '../config/categoryConfig';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopNav() {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    // 5px tolerance to hide the right arrow when fully scrolled
    setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    // Initial check
    setTimeout(handleScroll, 100);
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="block w-full border-t border-theme-border text-theme-secondary text-[11px] sm:text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-950 transition-colors relative z-40 group">
      <div className="saath-container relative">
        
        {/* Left Arrow */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-10 flex items-center justify-start transition-opacity duration-300 ${showLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button onClick={() => scroll('left')} className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary shadow-sm cursor-pointer ml-1">
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Scrollable Nav Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center justify-start w-full gap-6 md:gap-8 overflow-x-auto no-scrollbar py-2 sm:py-2.5 px-2"
        >
          
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

        {/* Right Arrow */}
        <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-10 flex items-center justify-end transition-opacity duration-300 ${showRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button onClick={() => scroll('right')} className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary shadow-sm cursor-pointer mr-1">
            <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
