import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, Smartphone, Cross, Shirt, Package, Hammer, Wrench, BookOpen,
  Footprints, Gift, Sparkles, Sprout, HardHat, Car, Flame, ShoppingBag,
  ChevronRight, ChevronLeft
} from 'lucide-react';
import { MASTER_CATEGORIES } from '../config/categoryConfig';

const ICON_COMPONENTS = {
  grocery: Leaf,
  electronics: Smartphone,
  mobiles: Smartphone,
  'medicine-healthcare': Cross,
  fashion: Shirt,
  'household-items': Package,
  hardware: Hammer,
  services: Wrench,
  'books-stationery': BookOpen,
  footwear: Footprints,
  'gift-set': Gift,
  saathapp: Sparkles,
  agriculture: Sprout,
  construction: HardHat,
  vehicles: Car,
  'spiritual-puja': Flame
};

export default function Categories({ onCategorySelect, activeCategory }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-2 sm:py-4 bg-page w-full transition-colors">
      <div className="saath-container">
        
        {/* The Contained White Card */}
        <div className="bg-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-theme-border relative group">
          
          {/* Container-bounded Carousel Controls */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 sm:-left-3 top-[55%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface hover:bg-slate-50 text-slate-600 dark:text-slate-300 hidden md:flex items-center justify-center transition-all shadow-md border border-slate-200 cursor-pointer opacity-0 group-hover:opacity-100"
            title="Scroll Left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 sm:-right-3 top-[55%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface hover:bg-slate-50 text-slate-600 dark:text-slate-300 hidden md:flex items-center justify-center transition-all shadow-md border border-slate-200 cursor-pointer opacity-0 group-hover:opacity-100"
            title="Scroll Right"
          >
            <ChevronRight size={16} />
          </button>
          
          {/* Header Title & See All */}
          <div className="flex items-center justify-between mb-4 sm:mb-5 gap-2">
          <div className="text-left flex-1">
            <h2 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider truncate">Explore Categories</h2>
          </div>
          <button 
            onClick={() => onCategorySelect('all')}
            className="text-[11px] sm:text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0 transition-colors"
          >
            See All <span className="text-lg leading-none mb-0.5">›</span>
          </button>
        </div>

        {/* Categories slider */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-rows-2 grid-flow-col md:flex md:flex-row items-start sm:items-center gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {MASTER_CATEGORIES.map((category, index) => {
            const IconComponent = ICON_COMPONENTS[category.id] || ShoppingBag;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                onClick={() => onCategorySelect(category.id)}
                whileHover={{ y: -4 }}
                className={`w-20 sm:w-32 md:w-36 shrink-0 snap-start cursor-pointer rounded-2xl sm:rounded-3xl p-2 sm:p-3.5 text-center transition-all bg-white dark:bg-slate-900 border flex flex-col items-center justify-center ${
                  isActive 
                    ? 'border-emerald-500 ring-1 sm:ring-2 ring-emerald-500/30 shadow-md sm:shadow-lg' 
                    : 'border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-emerald-400 hover:shadow-md'
                }`}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 sm:mb-3 group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-contain p-1 sm:p-1.5 rounded-xl sm:rounded-2xl mix-blend-multiply" 
                    />
                  ) : (
                    <IconComponent size={20} className="sm:hidden" />
                  )}
                  {/* Desktop icon override if image missing */}
                  {!category.image && <IconComponent size={26} className="hidden sm:block" />}
                </div>

                {/* Text title */}
                <h3 className="text-[9px] sm:text-[11px] md:text-xs font-extrabold text-slate-800 dark:text-slate-100 leading-tight w-full" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {category.name}
                </h3>
              </motion.div>
            );
          })}

          {/* See All Card */}
          <motion.div
            onClick={() => onCategorySelect('all')}
            whileHover={{ y: -4 }}
            className="w-20 sm:w-32 md:w-36 snap-start cursor-pointer rounded-2xl sm:rounded-3xl p-2 sm:p-3 text-center bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center h-full sm:h-[126px] transition-all hover:border-emerald-500 min-h-[80px]"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-1 sm:mb-2 shadow-2xs shrink-0">
              <ChevronRight size={16} className="sm:hidden" />
              <ChevronRight size={18} className="hidden sm:block" />
            </div>
            <span className="text-[10px] sm:text-xs font-extrabold text-slate-700 dark:text-slate-200 leading-tight">See All</span>
            <span className="text-[8px] sm:text-[10px] text-slate-400 font-medium mt-0.5 hidden sm:block">16 Verticals</span>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
