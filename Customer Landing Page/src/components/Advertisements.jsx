import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { advertisements } from '../data/mockData';

export default function Advertisements() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % advertisements.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % advertisements.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const active = advertisements[currentIndex];

  return (
    <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40 relative w-full">
      {/* Full-width Carousel Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-200/50 hover:bg-slate-300 dark:bg-slate-800/50 dark:hover:bg-slate-700 text-slate-700 dark:text-white hidden md:flex items-center justify-center backdrop-blur-sm z-20 transition-all shadow-sm border border-slate-300 dark:border-slate-600"
        title="Previous ad"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-200/50 hover:bg-slate-300 dark:bg-slate-800/50 dark:hover:bg-slate-700 text-slate-700 dark:text-white hidden md:flex items-center justify-center backdrop-blur-sm z-20 transition-all shadow-sm border border-slate-300 dark:border-slate-600"
        title="Next ad"
      >
        <ChevronRight size={16} />
      </button>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Banner Frame */}
        <div className="relative rounded-card overflow-hidden shadow-soft border border-slate-200/50 dark:border-slate-800 min-h-[160px] sm:min-h-[180px] flex items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 bg-gradient-to-r ${active.color} text-white flex items-center`}
            >
              {/* Background cover image with opacity blending */}
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 overflow-hidden opacity-30 md:opacity-55">
                <img 
                  src={active.banner} 
                  alt={active.title} 
                  className="w-full h-full object-cover"
                />
                {/* Horizontal gradient overlay to mask image left edge */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/40 hidden md:block" />
              </div>

              {/* Text contents */}
              <div className="relative z-10 p-6 sm:p-8 max-w-xl text-left space-y-3.5">
                <span className="inline-flex items-center gap-1 py-1 px-2.5 rounded-full bg-white/20 text-[9px] font-black uppercase tracking-wider">
                  <Tag size={10} />
                  {active.tag}
                </span>
                
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-medium">
                    {active.subtitle}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-8 px-4 rounded-full bg-white text-slate-900 font-extrabold text-[11px] flex items-center gap-1 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <span>{active.cta}</span>
                  <ArrowRight size={11} />
                </motion.button>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-20">
            {advertisements.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
                title={`Ad slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
