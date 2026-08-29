import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Eye, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import { productApi } from '../services/productApi';

export default function FeaturedProducts({ 
  onAddToCart, 
  onQuickView, 
  cartItems, 
  selectedCategory, 
  setSelectedCategory,
  searchQuery = ''
}) {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistedIds, setWishlistedIds] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getProducts({ category: selectedCategory, search: searchQuery });
        setFeaturedProducts(data.products || []);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    // Debounce or call directly
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const toggleWishlist = (id) => {
    setWishlistedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();

  // Filter products by selected category and search text
  const filteredProducts = featuredProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !normalizedSearch || [
      product.name,
      product.category,
      product.badge,
      product.description
    ].some((value) => value?.toLowerCase().includes(normalizedSearch));

    return matchesCategory && matchesSearch;
  });

  const filterTabs = [
    { id: 'all', label: 'All Products' },
    { id: 'grocery', label: 'Fresh Grocery' },
    { id: 'electricals', label: 'Electricals' },
    { id: 'hardware', label: 'Hardware Parts' },
    { id: 'agriculture', label: 'Farm Supplies' }
  ];

  const getBadgeStyle = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'organic':
        return 'bg-emerald-600 text-white';
      case 'best seller':
        return 'bg-amber-500 text-slate-900';
      case 'trending':
        return 'bg-accent text-white';
      case 'new':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <section className="py-12 bg-surface border-b border-slate-100 ">
      <div className="saath-container">
        
        {/* Section Header & See All */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div className="flex items-end justify-between gap-2 w-full lg:w-auto">
            <div className="text-left flex-1 min-w-0">
              <span className="text-[10px] sm:text-xs font-extrabold text-primary tracking-wider uppercase block truncate">Saath Assured Store</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 truncate">Featured Products</h2>
            </div>
            
            {/* Mobile/Tablet See All */}
            <button 
              onClick={() => navigate('/products')}
              className="lg:hidden text-[11px] sm:text-sm font-bold text-primary flex items-center gap-1 shrink-0 mb-1 hover:underline active:text-primary-dark transition-colors"
            >
              See All <span className="text-lg leading-none mb-0.5">›</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter Tab Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-btn border transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-primary border-primary text-white shadow-glow-primary'
                      : 'bg-page border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-page'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop See All */}
            <button 
              onClick={() => navigate('/products')}
              className="hidden lg:flex text-sm font-bold text-primary items-center gap-1 shrink-0 hover:underline active:text-primary-dark transition-colors"
            >
              See All <span className="text-xl leading-none mb-0.5">›</span>
            </button>
          </div>
        </div>

        {/* Products Grid Layout */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-card p-3 sm:p-4 border border-slate-200/60 shadow-soft animate-pulse flex flex-col justify-between">
                <div>
                  <div className="w-full aspect-square rounded-card bg-slate-200 dark:bg-slate-700 mb-3"></div>
                  <div className="w-1/2 h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                  <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-2.5 border-t border-slate-100/80">
                  <div className="w-1/3 h-5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-btn"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-card border border-rose-200 bg-rose-50 dark:bg-rose-900/20 p-8 text-center flex flex-col items-center">
            <AlertCircle className="text-rose-500 mb-2" size={32} />
            <p className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-4">{error}</p>
            <button 
              onClick={() => {
                setLoading(true);
                productApi.getProducts({ category: selectedCategory, search: searchQuery })
                  .then(data => { setFeaturedProducts(data.products || []); setError(null); })
                  .catch(() => setError('Unable to load products.'))
                  .finally(() => setLoading(false));
              }}
              className="flex items-center gap-2 bg-rose-100 hover:bg-rose-200 dark:bg-rose-800 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-card border border-dashed border-slate-300 bg-page p-8 text-center text-sm font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            No products available at the moment.
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
              const qty = getCartQuantity(product.id);
              const isWishlisted = wishlistedIds.includes(product.id);

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -6 }}
                  className="bg-surface rounded-card p-3 sm:p-4 border border-theme-border shadow-soft hover:shadow-premium relative flex flex-col justify-between group"
                >
                  
                  {/* Floating Left: Badges */}
                  <div className="absolute top-3 left-3 z-15 flex flex-col gap-1 items-start">
                    {product.badge && (
                      <span className={`text-[9px] font-black uppercase tracking-wider py-0.5 px-2 rounded-full shadow-sm ${getBadgeStyle(product.badge)}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Floating Right: Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15">
                    <motion.button 
                      onClick={() => toggleWishlist(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-md border ${
                        isWishlisted 
                          ? 'bg-danger text-white border-transparent' 
                          : 'bg-white/95 text-slate-400 hover:text-danger border-slate-100'
                      }`}
                      title={isWishlisted ? "Remove Wishlist" : "Wishlist"}
                    >
                      <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                    </motion.button>
                    <motion.button 
                      onClick={() => navigate(`/product/${product.slug || product.id}`)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-7.5 h-7.5 rounded-full bg-white/95 text-slate-400 hover:text-primary flex items-center justify-center shadow-md border border-slate-100"
                      title="Quick View"
                    >
                      <Eye size={14} />
                    </motion.button>
                  </div>

                  {/* Product Image & Info */}
                  <div>
                    <div onClick={() => navigate(`/product/${product.slug || product.id}`)} className="cursor-pointer w-full aspect-square rounded-card overflow-hidden bg-page mb-3 relative flex items-center justify-center">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      
                      {/* Delivery Time counter */}
                      <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200/30">
                        ⏱ {product.deliveryTime}
                      </span>
                    </div>

                    {/* Ratings, reviews */}
                    <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold text-slate-500">
                      <div className="flex items-center gap-0.5 text-secondary">
                        <Star size={12} className="fill-secondary" />
                        <span className="text-slate-700 dark:text-slate-200">{product.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{product.reviewsCount} reviews</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 line-clamp-2 h-9 text-left">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing and Cart add button */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-2.5 border-t border-slate-100/80 ">
                    <div className="text-left">
                      <span className="text-base font-black text-slate-950 dark:text-white">₹{product.price}</span>
                      <span className="text-[11px] text-slate-400 line-through block leading-none">₹{product.oldPrice}</span>
                    </div>

                    {/* Dynamic counter block */}
                    {qty > 0 ? (
                      <div className="flex items-center bg-primary text-white rounded-btn h-9 shadow-glow-primary overflow-hidden">
                        <button 
                          onClick={() => onAddToCart(product, -1)}
                          className="px-2.5 h-full hover:bg-primary-dark font-black transition-colors"
                        >
                          -
                        </button>
                        <span className="px-1 text-xs font-black min-w-[20px] text-center">{qty}</span>
                        <button 
                          onClick={() => onAddToCart(product, 1)}
                          className="px-2.5 h-full hover:bg-primary-dark font-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => onAddToCart(product, 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-9 px-4 rounded-btn bg-primary/10 dark:bg-emerald-500/20 hover:bg-primary text-primary dark:text-emerald-400 hover:text-white font-extrabold text-xs transition-colors flex items-center gap-1 border border-primary/20 dark:border-emerald-500/30 hover:border-transparent"
                      >
                        <ShoppingCart size={13} />
                        <span>ADD</span>
                      </motion.button>
                    )}
                  </div>

                </motion.div>
              );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
