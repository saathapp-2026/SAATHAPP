import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Hammer, HardHat, Wrench, ShoppingCart, Tractor, 
  Car, Home, Sofa, Smartphone, Flame, Droplet, Newspaper, ChevronRight, ChevronLeft
} from 'lucide-react';
import { categories } from '../data/mockData';

// Map icon string name to Lucide Component
const iconMap = {
  Zap, Hammer, HardHat, Wrench, ShoppingCart, Tractor, 
  Car, Home, Sofa, Smartphone, Flame, Droplet, Newspaper
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
    <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40 relative w-full">
      {/* Full-width Carousel Controls */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 sm:left-4 top-[55%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hidden md:flex items-center justify-center transition-colors shadow-sm border border-slate-200 dark:border-slate-700"
        title="Scroll Left"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 sm:right-4 top-[55%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hidden md:flex items-center justify-center transition-colors shadow-sm border border-slate-200 dark:border-slate-700"
        title="Scroll Right"
      >
        <ChevronRight size={16} />
      </button>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with navigation arrows */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Explore Categories</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">What are you looking for?</h2>
          </div>
        </div>

        {/* Categories slider */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.iconName] || ShoppingCart;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                onClick={() => onCategorySelect(category.id)}
                whileHover={{ y: -5 }}
                className={`flex-none w-36 sm:w-40 snap-start cursor-pointer rounded-card p-3 text-center transition-all ${category.gradient} ${
                  isActive 
                    ? 'ring-4 ring-primary shadow-glow-primary' 
                    : 'border border-slate-200/40 shadow-soft hover:shadow-premium'
                }`}
              >
                <div className="relative">
                  {/* Category Image - Rounded with hover scaling */}
                  <div className="w-full h-24 sm:h-28 rounded-card overflow-hidden bg-slate-200 mb-3 relative">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    
                    {/* Category Floating Icon */}
                    <div className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-800 shadow-md">
                      <IconComponent size={14} className={category.textColor} />
                    </div>

                    {/* Popular Tag Badge */}
                    {category.popular && (
                      <span className="absolute top-2 right-2 bg-secondary text-slate-900 text-[9px] font-black uppercase tracking-wider py-0.5 px-1.5 rounded-full shadow-sm">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Text titles */}
                <h3 className={`text-sm font-extrabold ${category.textColor} truncate`}>
                  {category.name}
                </h3>
                <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  {category.tagline}
                </p>
              </motion.div>
            );
          })}

          {/* See All Card */}
          <motion.div
            onClick={() => onCategorySelect('all')}
            whileHover={{ y: -5 }}
            className="flex-none w-36 sm:w-40 snap-start cursor-pointer rounded-card p-3 text-center bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center h-[162px] sm:h-[178px] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-solid hover:border-primary/50"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary dark:text-primary-light flex items-center justify-center mb-2.5 shadow-sm">
              <ChevronRight size={20} />
            </div>
            <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">See All</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">15+ Verticals</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
