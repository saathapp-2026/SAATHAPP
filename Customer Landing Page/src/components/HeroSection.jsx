import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Zap, Hammer, Tractor, ShoppingCart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Everything Near You.',
    highlight: 'Delivered Today.',
    description: 'Get local groceries, hardware tools, agricultural supplies and professional services at the lowest rates from verified local vendors.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    color: 'from-green-600 via-green-700 to-emerald-800',
    primaryCta: 'Shop Now',
    secondaryCta: 'Book Service',
    badge: '★ Super App Hub',
    icon: ShoppingBag
  },
  {
    id: 2,
    title: 'Book Trusted Electricians',
    highlight: 'In Minutes.',
    description: 'Tired of waiting? Get verified home electricians, plumbers, painters, and AC technicians at fixed upfront pricing with a 30-day warranty.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-600 via-blue-700 to-indigo-800',
    primaryCta: 'Book Service',
    secondaryCta: 'Become Provider',
    badge: '⚡ Verified Professionals',
    icon: Zap
  },
  {
    id: 3,
    title: 'Construction Materials',
    highlight: 'Delivered Fast.',
    description: 'Order Cement, Sand, Steel Rods, Bricks, and Hardware fittings from your local suppliers. Guaranteed load dispatch within 60 minutes.',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
    color: 'from-slate-700 via-slate-800 to-slate-900',
    primaryCta: 'Order Materials',
    secondaryCta: 'View Dealers',
    badge: '🧱 Bulk Logistics',
    icon: Hammer
  },
  {
    id: 4,
    title: 'Farm Supplies',
    highlight: 'At Your Doorstep.',
    description: 'Seeds, Organic fertilizers, crop protection and modern tractor parts. Book direct agriculture expert visits right from your farm fields.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-600 via-amber-700 to-green-800',
    primaryCta: 'Order Supplies',
    secondaryCta: 'Consult Expert',
    badge: '🌾 Farmers First',
    icon: Tractor
  },
  {
    id: 5,
    title: 'Fresh Grocery',
    highlight: 'In 15 Minutes.',
    description: 'Fresh farm tomatoes, milk, local sweets, and groceries delivered hyper-locally with zero shipping fees on orders above ₹99.',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    color: 'from-rose-600 via-rose-700 to-red-800',
    primaryCta: 'Shop Grocery',
    secondaryCta: 'Flash Deals',
    badge: '🍎 Instant Freshness',
    icon: ShoppingCart
  }
];

export default function HeroSection({ onShopNow, onBookService, onBecomeSeller }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const current = slides[currentSlide];
  const IconComponent = current.icon;

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 min-h-[500px] md:min-h-[550px] lg:min-h-[600px] flex items-center">
      
      {/* Background shape particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-30">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-3xl -top-20 -left-20 animate-blob-1" />
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-accent/30 to-transparent blur-3xl -bottom-20 -right-20 animate-blob-2" />
        
        {/* Floating animated item simulator particles */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] text-white/10 hidden md:block"
        >
          <Zap size={44} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[40%] text-white/10 hidden md:block"
        >
          <Tractor size={50} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -25, 0], rotate: [0, 180, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[15%] text-white/10 hidden md:block"
        >
          <ShoppingCart size={40} />
        </motion.div>
      </div>

      {/* Main slide display with AnimatePresence */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
            className={`w-full h-full bg-gradient-to-r ${current.color} text-white flex items-center py-16 md:py-20 lg:py-24`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Slide Text Information */}
              <div className="lg:col-span-7 text-left space-y-6 z-20">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-white/15 backdrop-blur-md border border-white/15 text-xs font-bold text-secondary tracking-wide shadow-sm"
                >
                  <Sparkles size={12} className="text-secondary" />
                  <span>{current.badge}</span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="block"
                  >
                    {current.title}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-secondary via-secondary-light to-amber-200 bg-clip-text text-transparent drop-shadow-sm block mt-1"
                  >
                    {current.highlight}
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg text-white/80 max-w-xl font-normal leading-relaxed"
                >
                  {current.description}
                </motion.p>

                {/* Call-to-actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4 pt-3"
                >
                  {/* Shop now/Book service depending on active slide */}
                  <motion.button
                    onClick={() => {
                      if (current.primaryCta.includes('Book') || current.primaryCta.includes('Consult')) {
                        onBookService();
                      } else {
                        onShopNow();
                      }
                    }}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 20px -5px rgba(255, 193, 7, 0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3.5 rounded-btn bg-secondary text-slate-900 font-extrabold text-sm flex items-center gap-2 hover:bg-secondary-dark transition-all shadow-lg"
                  >
                    <IconComponent size={16} />
                    <span>{current.primaryCta}</span>
                  </motion.button>

                  {/* Secondary trigger */}
                  <motion.button
                    onClick={() => {
                      if (current.secondaryCta.includes('Become')) {
                        onBecomeSeller();
                      } else {
                        onShopNow();
                      }
                    }}
                    whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3.5 rounded-btn bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm flex items-center gap-2 backdrop-blur-sm transition-all"
                  >
                    <span>{current.secondaryCta}</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Side: Slide Graphic Presentation */}
              <div className="lg:col-span-5 relative flex justify-center z-20 mt-8 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-card overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-900"
                >
                  {/* Image with gradient mask overlay */}
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover transition-transform duration-[6s] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </motion.div>

                {/* Floating Micro Badge on image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 sm:-left-8 glass-premium dark:glass-dark p-3.5 rounded-card shadow-premium border border-white/20 text-slate-800 dark:text-slate-100 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light font-bold text-sm">
                    ✓
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">Saath Assured</span>
                    <span className="text-xs font-bold">100% Quality Guarantee</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-secondary' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/20 hover:bg-black/45 text-white border border-white/10 hidden md:flex items-center justify-center backdrop-blur-sm z-30 transition-all"
          title="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/20 hover:bg-black/45 text-white border border-white/10 hidden md:flex items-center justify-center backdrop-blur-sm z-30 transition-all"
          title="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </section>
  );
}
