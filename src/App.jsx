import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Grid, Briefcase, Search, ShoppingBag, X, Mic, 
  Camera, Upload, Check, Navigation, AlertCircle, ShoppingCart, 
  MapPin, Heart, Star, Sparkles, Smile, ShieldCheck 
} from 'lucide-react';

import Header from './components/Header';
import LocationBar from './components/LocationBar';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import FlashDeals from './components/FlashDeals';
import FeaturedProducts from './components/FeaturedProducts';
import NearbyShops from './components/NearbyShops';
import ServiceSection from './components/ServiceSection';
import Advertisements from './components/Advertisements';
import WhySaathApp from './components/WhySaathApp';
import HowItWorks from './components/HowItWorks';
import LiveStats from './components/LiveStats';
import Reviews from './components/Reviews';
import BecomePartner from './components/BecomePartner';
import DownloadApp from './components/DownloadApp';
import Footer from './components/Footer';

export default function App() {
  // Global States
  const [cartItems, setCartItems] = useState([]);
  const [location, setLocation] = useState('Green Park, New Delhi');
  const [pincode, setPincode] = useState('110016');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Modals Toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  // Simulated loading states
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Sync dark mode class with body element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddToCart = (product, change) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const nextQty = existing.quantity + change;
        if (nextQty <= 0) {
          return prev.filter(item => item.id !== product.id);
        }
        return prev.map(item => item.id === product.id ? { ...item, quantity: nextQty } : item);
      }
      if (change > 0) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev;
    });
  };

  const handleGPSDetect = () => {
    setIsGpsLoading(true);
    setTimeout(() => {
      setLocation('Connaught Place, Central Delhi');
      setPincode('110001');
      setIsGpsLoading(false);
      setIsLocationModalOpen(false);
    }, 2000);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setIsVoiceModalOpen(false);
      setSearchQuery('AC Servicing');
      setSelectedCategory('repairs');
      // Scroll to service section
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  const handleImageSearch = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsImageModalOpen(false);
      setSearchQuery('Mangoes');
      setSelectedCategory('grocery');
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 2500);
  };

  // Compute Cart Summary
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-background text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Header Widget */}
      <Header 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        location={location}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
        onImageSearchClick={() => setIsImageModalOpen(true)}
      />

      {/* Location Bar */}
      <LocationBar 
        location={location}
        pincode={pincode}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onDetectGPS={handleGPSDetect}
      />

      {/* Main Pages content stack */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <HeroSection 
          onShopNow={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
          onBookService={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
          onBecomeSeller={() => document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' })}
        />

        {/* Categories Bar */}
        <Categories 
          activeCategory={selectedCategory}
          onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Flash Deals Rush Hour */}
        <FlashDeals 
          onAddToCart={handleAddToCart}
          onQuickView={setQuickViewProduct}
          cartItems={cartItems}
        />

        {/* Main Stores Carousel */}
        <NearbyShops 
          onShopSelect={(shop) => {
            alert(`Selected Store: ${shop.name}. Browsing inventory catalog in simulation.`);
          }}
        />

        {/* Featured Products Catalog */}
        <div id="products-section">
          <FeaturedProducts 
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            cartItems={cartItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Local Services Grid */}
        <div id="services-section">
          <ServiceSection 
            onBookService={(service) => {
              alert(`Booking created for: ${service.name}. Starting scheduler flow.`);
            }}
          />
        </div>

        {/* Advertisements Scroller */}
        <Advertisements />

        {/* Why SaathApp Trust Segment */}
        <WhySaathApp />

        {/* Stepper Timeline Workflow */}
        <HowItWorks />

        {/* Live Counters */}
        <LiveStats />

        {/* Customer Reviews Testimonials */}
        <Reviews />

        {/* Become Partner options */}
        <div id="partner-section">
          <BecomePartner 
            onBecomePartnerSelect={(role) => {
              alert(`Partner application loading for: ${role}`);
            }}
          />
        </div>

        {/* Download App mockup promotion */}
        <DownloadApp />
      </main>

      {/* Footer Segment */}
      <Footer />

      {/* Sticky Bottom Navigation (Mobile View) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-850 px-4 py-2 flex items-center justify-around shadow-premium">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-primary"
        >
          <Home size={20} />
          <span className="text-[9px] font-black uppercase">Home</span>
        </button>
        
        <button 
          onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-primary transition-colors"
        >
          <Grid size={20} />
          <span className="text-[9px] font-black uppercase">Store</span>
        </button>

        <button 
          onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-primary transition-colors"
        >
          <Briefcase size={20} />
          <span className="text-[9px] font-black uppercase">Services</span>
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-primary transition-colors relative"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-danger text-white border border-white font-extrabold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[9px] font-black uppercase">Cart</span>
        </button>
      </div>

      {/* Sticky float cart button for desktop */}
      {cartCount > 0 && !isCartOpen && (
        <motion.div 
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          className="hidden md:block fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-gradient-primary text-white py-3.5 px-6 rounded-full shadow-premium hover:shadow-glow-primary transition-all font-black text-sm cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-2.5 -right-2 bg-secondary text-slate-900 border border-primary font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span>CHECKOUT (₹{cartTotal})</span>
          </button>
        </motion.div>
      )}

      {/* -------------------- MODALS & OVERLAYS -------------------- */}

      <AnimatePresence>
        
        {/* 1. Global Shopping Cart Sidebar (Glassmorphic) */}
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            
            {/* Sidebar content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 right-0 w-full sm:w-[400px] bg-white dark:bg-slate-950 shadow-premium z-50 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-primary" size={20} />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Your Shopping Cart</h3>
                  <span className="text-xs text-slate-400 font-bold">({cartCount} items)</span>
                </div>
                
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-card bg-slate-50 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/40 relative">
                      <div className="w-16 h-16 rounded-xl bg-white overflow-hidden border border-slate-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 line-clamp-1">{item.name}</h4>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Delivery in {item.deliveryTime}</span>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-black text-slate-950 dark:text-white">₹{item.price * item.quantity}</span>
                          
                          {/* Counter inside cart */}
                          <div className="flex items-center bg-primary text-white rounded-btn h-7.5 overflow-hidden">
                            <button 
                              onClick={() => handleAddToCart(item, -1)}
                              className="px-2 h-full hover:bg-primary-dark font-black text-xs transition-colors"
                            >
                              -
                            </button>
                            <span className="px-1 text-[10px] font-black min-w-[16px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleAddToCart(item, 1)}
                              className="px-2 h-full hover:bg-primary-dark font-black text-xs transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 flex items-center justify-center mx-auto shadow-inner">
                      <ShoppingBag size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Your Cart is Empty</h4>
                      <p className="text-xs text-slate-400 font-medium">Add fresh goods or book local repair saathis from store list.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer summary */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 backdrop-blur-md space-y-4">
                  <div className="space-y-2 text-xs font-bold text-slate-650 dark:text-slate-350">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-slate-900 dark:text-white">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-green-600 font-black">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax & Services</span>
                      <span className="text-slate-900 dark:text-white">₹0.00</span>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-850 my-2" />
                    <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white">
                      <span>Grand Total</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => {
                      alert(`Checkout completed for total amount ₹${cartTotal}! Thank you for using SaathApp.`);
                      setCartItems([]);
                      setIsCartOpen(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-btn bg-gradient-primary text-white font-extrabold text-sm shadow-glow-primary transition-colors cursor-pointer"
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              )}

            </motion.div>
          </>
        )}

        {/* 2. Product Detail Quick View Modal */}
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-card p-6 shadow-premium z-50 overflow-hidden text-left border border-slate-250/20 dark:border-slate-800"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-5 pb-3.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-extrabold text-primary flex items-center gap-1">
                  <Sparkles size={13} className="text-secondary" />
                  Saath Verified Item
                </span>
                
                <button 
                  onClick={() => setQuickViewProduct(null)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Left side: Image */}
                <div className="w-full aspect-square rounded-card overflow-hidden bg-slate-100">
                  <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
                </div>

                {/* Right side: Product details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                      {quickViewProduct.name}
                    </h3>
                    
                    {/* Rating info */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-semibold">
                      <div className="flex items-center gap-0.5 text-secondary">
                        <Star size={13} className="fill-secondary text-secondary" />
                        <span className="text-slate-800 dark:text-slate-200 font-bold">{quickViewProduct.rating || 4.7}</span>
                      </div>
                      <span>•</span>
                      <span>Delivery in <strong className="text-green-600">{quickViewProduct.deliveryTime}</strong></span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Pure, quality-tested product packaged and dispatched directly from authorized local neighborhood stores under our standard SaathApp quality audits. Complete buyer protection guarantees.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-card border border-slate-200/30 dark:border-slate-850 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">Supplier:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-black">Saath Assured Store Partner</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-left">
                      <span className="text-2xl font-black text-slate-950 dark:text-white">₹{quickViewProduct.price}</span>
                      {quickViewProduct.oldPrice && (
                        <span className="text-xs text-slate-400 line-through block leading-none mt-1">₹{quickViewProduct.oldPrice}</span>
                      )}
                    </div>

                    {/* Cart Add widget */}
                    <div>
                      {getCartQuantity(quickViewProduct.id) > 0 ? (
                        <div className="flex items-center bg-primary text-white rounded-btn h-10 shadow-glow-primary overflow-hidden">
                          <button 
                            onClick={() => handleAddToCart(quickViewProduct, -1)}
                            className="px-3.5 h-full hover:bg-primary-dark font-black transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-black min-w-[24px] text-center">{getCartQuantity(quickViewProduct.id)}</span>
                          <button 
                            onClick={() => handleAddToCart(quickViewProduct, 1)}
                            className="px-3.5 h-full hover:bg-primary-dark font-black transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(quickViewProduct, 1)}
                          className="h-10 px-6 rounded-btn bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-md transition-colors"
                        >
                          Add to Shopping Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* 3. Voice Search Modal Simulator */}
        {isVoiceModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVoiceModalOpen(false)}
              className="fixed inset-0 bg-slate-950 z-50 cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-[32px] p-8 shadow-premium z-50 text-center border-t border-slate-200/50 dark:border-slate-800"
            >
              <div className="max-w-md mx-auto space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Voice Assist</span>
                  <button 
                    onClick={() => setIsVoiceModalOpen(false)}
                    className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-850 dark:text-slate-100">
                    {isListening ? 'Listening to voice...' : 'Speak now'}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Say things like "AC Repair Service" or "Fresh Milk"</p>
                </div>

                {/* Animated Voice Waves */}
                <div className="h-24 flex items-center justify-center gap-1.5">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isListening 
                        ? { height: [12, i % 2 === 0 ? 56 : 38, 12] } 
                        : { height: 12 }
                      }
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                      className="w-1.5 bg-accent rounded-full"
                    />
                  ))}
                </div>

                <div className="pt-2">
                  {!isListening ? (
                    <button
                      onClick={handleVoiceSearch}
                      className="h-12 w-full rounded-btn bg-accent hover:bg-accent-dark text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                    >
                      <Mic size={18} />
                      <span>Start Speaking</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-450 italic">Processing voice algorithms...</span>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* 4. Image Search Modal Simulator */}
        {isImageModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageModalOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-card p-6 shadow-premium z-50 text-left border border-slate-200/50 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-850">
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Search by Product Photo</h3>
                <button 
                  onClick={() => setIsImageModalOpen(false)}
                  className="p-1 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-5 text-center">
                {/* Upload drag drop box */}
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-card p-8 bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100/50 dark:hover:bg-slate-950/80 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Camera size={22} />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 block">Drag & Drop Product Photo</span>
                    <span className="text-[10px] text-slate-400 font-bold block">or click to browse local files</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  We'll detect features, label names, and matching local vendor stocks instantly.
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleImageSearch}
                    disabled={isUploading}
                    className="h-11 w-full rounded-btn bg-primary hover:bg-primary-dark text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span>Running AI Matcher...</span>
                    ) : (
                      <>
                        <Upload size={14} />
                        <span>Upload Sample Photo (Tomato/AC)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* 5. Address / Location Selector Modal */}
        {isLocationModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationModalOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-card p-6 shadow-premium z-50 text-left border border-slate-200/50 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-850">
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Choose Your Delivery Location</h3>
                <button 
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-1 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {/* GPS Detect trigger */}
                <button
                  onClick={handleGPSDetect}
                  disabled={isGpsLoading}
                  className="w-full h-12 rounded-btn bg-primary text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-glow-primary transition-colors disabled:opacity-50"
                >
                  <Navigation size={14} className={isGpsLoading ? 'animate-spin' : ''} />
                  <span>{isGpsLoading ? 'Getting coordinates...' : 'Detect Location via GPS'}</span>
                </button>

                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <div className="h-px bg-slate-200 dark:bg-slate-850 w-full shrink-0 max-w-[40%]" />
                  <span>OR</span>
                  <div className="h-px bg-slate-200 dark:bg-slate-850 w-full shrink-0 max-w-[40%]" />
                </div>

                {/* Form fields */}
                <div className="space-y-3.5">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Enter Area Address</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Green Park Extension, New Delhi" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-btn border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Pincode</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 110016" 
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-btn border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsLocationModalOpen(false)}
                    className="h-10 w-full rounded-btn bg-slate-100 hover:bg-primary dark:bg-slate-800 hover:text-white text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-colors cursor-pointer"
                  >
                    Save & Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

      </AnimatePresence>

    </div>
  );
}
