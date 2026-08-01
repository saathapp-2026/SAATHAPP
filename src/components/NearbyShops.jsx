import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Store, Star, ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { nearbyShops } from '../data/mockData';

export default function NearbyShops({ onShopSelect }) {
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
    <section className="py-12 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with custom scroll buttons */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Local Commerce</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">Shop From Local Stores Near You</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200/50 dark:border-slate-750"
              title="Scroll Left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200/50 dark:border-slate-750"
              title="Scroll Right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Shop Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {nearbyShops.map((shop, index) => {
            const isClosed = shop.status === 'Closed';

            return (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-none w-72 sm:w-80 snap-start bg-white dark:bg-slate-900 rounded-card overflow-hidden border border-slate-200/60 dark:border-slate-800/50 shadow-soft hover:shadow-premium group"
              >
                {/* Shop Banner with gradient overlay */}
                <div className="w-full h-36 bg-slate-200 relative overflow-hidden">
                  <img 
                    src={shop.banner} 
                    alt={shop.name} 
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  
                  {/* Floating Left: Store Logo Tag */}
                  <div className={`absolute -bottom-5 left-4 w-12 h-12 rounded-2xl ${shop.color} text-white font-extrabold flex items-center justify-center text-sm shadow-md border-2 border-white dark:border-slate-900 z-10`}>
                    {shop.logo}
                  </div>

                  {/* Floating Right: Open/Closed Tag */}
                  <span className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10 ${
                    isClosed 
                      ? 'bg-danger text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    {shop.status}
                  </span>
                </div>

                {/* Card Content details */}
                <div className="p-4.5 pt-7 text-left space-y-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">
                      {shop.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                      {shop.category}
                    </p>
                  </div>

                  {/* Specs: Distance, Delivery Time, Rating */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800/40 text-[11px] font-bold text-slate-500">
                    <div className="flex flex-col items-center border-r border-slate-100 dark:border-slate-800/40">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Distance</span>
                      <span className="text-slate-700 dark:text-slate-200 mt-0.5 flex items-center gap-0.5">
                        <MapPin size={10} className="text-primary" /> {shop.distance}
                      </span>
                    </div>

                    <div className="flex flex-col items-center border-r border-slate-100 dark:border-slate-800/40">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Delivery</span>
                      <span className="text-slate-750 dark:text-slate-200 mt-0.5 text-green-600 dark:text-green-400">
                        {shop.deliveryTime}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Rating</span>
                      <span className="text-slate-750 dark:text-slate-200 mt-0.5 flex items-center gap-0.5">
                        <Star size={10} className="text-secondary fill-secondary" /> {shop.rating}
                      </span>
                    </div>
                  </div>

                  {/* Minimum order and Shop Now CTA button */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[10px] text-slate-400 leading-none">
                      <span className="block font-bold">MIN. ORDER</span>
                      <span className="text-xs font-black text-slate-700 dark:text-slate-200 mt-1 block">₹{shop.minOrder}</span>
                    </div>

                    <motion.button
                      disabled={isClosed}
                      onClick={() => onShopSelect(shop)}
                      whileHover={isClosed ? {} : { scale: 1.03 }}
                      whileTap={isClosed ? {} : { scale: 0.97 }}
                      className={`h-9 px-4 rounded-btn font-extrabold text-xs flex items-center gap-1 transition-all ${
                        isClosed 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-transparent' 
                          : 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md'
                      }`}
                    >
                      <span>Shop Now</span>
                      <ArrowRight size={12} />
                    </motion.button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
