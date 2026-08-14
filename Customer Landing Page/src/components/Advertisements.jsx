import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { advertisements } from '../data/mockData';

export default function Advertisements() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (advertisements.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % advertisements.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (advertisements.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % advertisements.length);
  };

  const handlePrev = () => {
    if (advertisements.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const active = advertisements.length > 0 ? advertisements[currentIndex] : null;

  return (
    <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40 relative w-full">
      {/* Full-width Carousel Controls */}
      {advertisements.length > 1 && (
        <>
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
        </>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Banner Frame */}
        <div className="relative rounded-card overflow-hidden shadow-soft border border-slate-200/50 dark:border-slate-800 min-h-[160px] sm:min-h-[180px] flex items-center">
          
          {!active ? (
            <div className="w-full h-full bg-gradient-to-r from-emerald-800 to-green-700 text-white p-6 sm:p-8 flex flex-col justify-center text-left">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full w-max">
                SaathApp Partner Hub
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-2">Grow Your Local Business</h3>
              <p className="text-xs text-white/80 font-medium mt-1">Register as a SaathApp Partner store or service provider today.</p>
            </div>
          ) : (
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
                {active.banner && (
                  <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 overflow-hidden opacity-30 md:opacity-55">
                    <img 
                      src={active.banner} 
                      alt={active.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />
                  </div>
                )}

                {/* Banner Content */}
                <div className="relative z-10 p-6 sm:p-8 md:p-10 text-left max-w-xl space-y-3">
                  {/* Tag */}
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <Tag size={10} />
                    <span>{active.tag}</span>
                  </span>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight">
                      {active.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 font-medium mt-1">
                      {active.subtitle}
                    </p>
                  </div>

                  {/* CTA button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-5 bg-white text-slate-900 rounded-btn text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>{active.cta}</span>
                    <ArrowRight size={13} />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

        </div>

      </div>
    </section>
  );
}
