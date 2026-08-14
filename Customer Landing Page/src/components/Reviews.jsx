import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials.length > 0 ? testimonials[activeIndex] : null;

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40 relative w-full">
      {/* Arrow Navigation */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hidden sm:flex items-center justify-center transition-colors shadow-sm border border-slate-200 dark:border-slate-700 z-10"
            title="Previous Review"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hidden sm:flex items-center justify-center transition-colors shadow-sm border border-slate-200 dark:border-slate-700 z-10"
            title="Next Review"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      <div className="w-full px-4 sm:px-6 relative text-center">
        
        {/* Title */}
        <div className="mb-10">
          <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Testimonials</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">What Our Customers Say</h2>
        </div>

        {/* Testimonials Slider Area */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          
          {!current ? (
            <div className="p-8 max-w-xl mx-auto rounded-card border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-center text-sm font-semibold text-slate-400">
              No customer reviews yet. Be the first to share your experience!
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                {/* Quote Icon */}
                <div className="text-primary/10 flex justify-center">
                  <Quote size={48} className="rotate-180" />
                </div>

                {/* Rating stars */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(current.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                    />
                  ))}
                  <span className="ml-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                    {current.rating.toFixed(1)}
                  </span>
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{current.text}"
                </p>

                {/* Customer Identity */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  {current.image && (
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-primary shadow-sm"
                    />
                  )}
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white leading-none">{current.name}</h4>
                      {current.verified && (
                        <ShieldCheck size={14} className="text-primary shrink-0" title="Verified Customer" />
                      )}
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 mt-1">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

        </div>

      </div>
    </section>
  );
}
