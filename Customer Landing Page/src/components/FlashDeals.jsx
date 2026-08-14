import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, ShoppingCart, Heart, Eye, Star, Flame } from 'lucide-react';
// Removed mockData dependency

export default function FlashDeals({ onAddToCart, onQuickView, cartItems }) {
  const [flashDeals, setFlashDeals] = useState(Array.from({ length: 5 }, (_, i) => ({
    id: `placeholder-${i}`,
    name: '\u00A0',
    price: '0',
    oldPrice: '0',
    rating: '0',
    deliveryTime: '—',
    discount: 0,
    stockLeft: 0,
    totalStock: 100,
    image: ''
  })));
  // Countdown Timer state: e.g., 01:24:45
  const [timeLeft, setTimeLeft] = useState(5085); // 1 hr 24 mins 45 secs in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 5085));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="text-left flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger animate-pulse">
              <Flame size={20} fill="currentColor" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-danger tracking-wider uppercase block">Rush Hours</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">Flash Deals Today</h2>
            </div>
          </div>

          {/* Countdown Clock Widget */}
          <div className="flex items-center gap-2 bg-danger text-white py-2 px-4 rounded-btn shadow-md text-sm font-extrabold">
            <Timer size={16} className="animate-spin-slow" />
            <span>ENDS IN:</span>
            <span className="font-mono text-base tracking-wider bg-black/20 py-0.5 px-2 rounded-md">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Horizontal Slider Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {flashDeals.length === 0 ? (
            <div className="col-span-full py-10 text-center text-sm font-semibold text-slate-400">
              No active flash deals at the moment.
            </div>
          ) : (
            flashDeals.map((deal) => {
            const qty = getCartQuantity(deal.id);
            const isLowStock = deal.stockLeft <= 5;
            const stockPct = (deal.stockLeft / deal.totalStock) * 100;

            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 rounded-card p-3 sm:p-4 border border-slate-200/60 dark:border-slate-800/50 shadow-soft hover:shadow-premium relative flex flex-col justify-between group"
              >
                {/* Discount Badge overlay */}
                <span className="absolute top-3 left-3 bg-danger text-white text-[10px] font-black uppercase tracking-wider py-1 px-2 rounded-full z-15 shadow-sm">
                  {deal.discount}% OFF
                </span>

                {/* Wishlist & Quick View Hover buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-7.5 h-7.5 rounded-full bg-white/95 dark:bg-slate-800 text-slate-400 hover:text-danger flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-700"
                    title="Add to Wishlist"
                  >
                    <Heart size={14} />
                  </motion.button>
                  <motion.button 
                    onClick={() => onQuickView(deal)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-7.5 h-7.5 rounded-full bg-white/95 dark:bg-slate-800 text-slate-400 hover:text-primary flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-700"
                    title="Quick View"
                  >
                    <Eye size={14} />
                  </motion.button>
                </div>

                {/* Product Image & Meta */}
                <div>
                  <div className="w-full aspect-square rounded-card overflow-hidden bg-slate-100 mb-3 relative flex items-center justify-center">
                    {deal.image && (
                      <img 
                        src={deal.image} 
                        alt={deal.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    
                    {/* Delivery Time Badge */}
                    <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200/30">
                      ⏱ {deal.deliveryTime}
                    </div>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={12} className="text-secondary fill-secondary" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{deal.rating}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 line-clamp-2 h-9 text-left">
                    {deal.name}
                  </h3>

                  {/* Stock Level Bar */}
                  <div className="mt-3 mb-4 text-left">
                    <div className="flex justify-between text-[9px] font-bold mb-1">
                      <span className={isLowStock ? 'text-danger animate-pulse' : 'text-slate-400'}>
                        {isLowStock ? `Only ${deal.stockLeft} left!` : 'In Stock'}
                      </span>
                      <span className="text-slate-400">{deal.stockLeft}/{deal.totalStock} units</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isLowStock ? 'bg-danger' : 'bg-secondary'}`}
                        style={{ width: `${stockPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price tag & add button */}
                <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/40">
                  <div className="text-left">
                    <span className="text-base font-black text-slate-950 dark:text-white">₹{deal.price}</span>
                    <span className="text-[11px] text-slate-400 line-through block leading-none">₹{deal.oldPrice}</span>
                  </div>

                  {/* Counter / Add Button */}
                  {qty > 0 ? (
                    <div className="flex items-center bg-primary text-white rounded-btn h-9 shadow-glow-primary overflow-hidden">
                      <button 
                        onClick={() => onAddToCart(deal, -1)}
                        className="px-2.5 h-full hover:bg-primary-dark font-black transition-colors"
                      >
                        -
                      </button>
                      <span className="px-1 text-xs font-black min-w-[20px] text-center">{qty}</span>
                      <button 
                        onClick={() => onAddToCart(deal, 1)}
                        className="px-2.5 h-full hover:bg-primary-dark font-black transition-colors"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => onAddToCart(deal, 1)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-9 px-4 rounded-btn bg-primary/10 hover:bg-primary text-primary hover:text-white font-extrabold text-xs transition-colors flex items-center gap-1 border border-primary/20 hover:border-transparent"
                    >
                      <ShoppingCart size={13} />
                      <span>ADD</span>
                    </motion.button>
                  )}
                </div>

              </motion.div>
            );
          }))}
        </div>

      </div>
    </section>
  );
}
