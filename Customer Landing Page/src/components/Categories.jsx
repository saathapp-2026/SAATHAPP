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
    <section className="py-8 bg-surface border-b border-theme-border relative w-full transition-colors">
      {/* Full-width Carousel Controls */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 sm:left-4 top-[55%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface hover:bg-page text-slate-600 dark:text-slate-300 hidden md:flex items-center justify-center transition-colors shadow-sm border border-theme-border cursor-pointer"
        title="Scroll Left"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 sm:right-4 top-[55%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface hover:bg-page text-slate-600 dark:text-slate-300 hidden md:flex items-center justify-center transition-colors shadow-sm border border-theme-border cursor-pointer"
        title="Scroll Right"
      >
        <ChevronRight size={16} />
      </button>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 tracking-wider uppercase block">Explore Categories</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">What are you looking for?</h2>
          </div>
        </div>

        {/* Categories slider */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {MASTER_CATEGORIES.map((category, index) => {
            const IconComponent = ICON_COMPONENTS[category.id] || ShoppingBag;
            const isActive = activeCategory === category.id;
            const isGrocery = category.id === 'grocery';
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onCategorySelect(category.id)}
                whileHover={{ y: -4 }}
                className={`flex-none w-36 sm:w-40 snap-start cursor-pointer rounded-3xl p-3.5 text-center transition-all bg-white dark:bg-slate-900 border ${
                  isActive 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg' 
                    : 'border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-emerald-400 hover:shadow-md'
                }`}
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-contain p-1.5 rounded-2xl mix-blend-multiply" 
                    />
                  ) : (
                    <IconComponent size={26} />
                  )}
                </div>

                {/* Text title */}
                <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                  {category.name}
                </h3>
              </motion.div>
            );
          })}

          {/* See All Card */}
          <motion.div
            onClick={() => onCategorySelect('all')}
            whileHover={{ y: -4 }}
            className="flex-none w-36 sm:w-40 snap-start cursor-pointer rounded-3xl p-3 text-center bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center h-[126px] transition-all hover:border-emerald-500"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-2 shadow-2xs">
              <ChevronRight size={18} />
            </div>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">See All</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">16 Verticals</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
