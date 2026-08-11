import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40 relative w-full">
      {/* Arrow Navigation */}
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

      <div className="w-full px-4 sm:px-6 relative text-center">
        
        {/* Title */}
        <div className="mb-10">
          <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Testimonials</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">What Our Customers Say</h2>
        </div>

        {/* Testimonials Slider Area */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Quote Icon */}
              <div className="text-primary/10 flex justify-center">
                <Quote size={56} className="rotate-180" fill="currentColor" />
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-200 italic leading-relaxed max-w-2xl mx-auto font-medium">
                "{current.text}"
              </p>

              {/* User Bio */}
              <div className="flex flex-col items-center gap-2">
                
                {/* Profile Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm bg-slate-200">
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 justify-center">
                    {current.name}
                    {current.verified && (
                      <ShieldCheck size={14} className="text-green-600" title="Verified Customer" />
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                    {current.role}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < Math.floor(current.rating) ? 'fill-secondary' : 'text-slate-250'} 
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-5 bg-primary' : 'w-1.5 bg-slate-350 hover:bg-slate-400'
              }`}
              title={`Review ${i + 1}`}
            />
          ))}
        </div>


      </div>
    </section>
  );
}
