import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LocationBar from '../components/LocationBar';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import FlashDeals from '../components/FlashDeals';
import FeaturedProducts from '../components/FeaturedProducts';
import NearbyShops from '../components/NearbyShops';
import ServiceSection from '../components/ServiceSection';
import Advertisements from '../components/Advertisements';
import WhySaathApp from '../components/WhySaathApp';
import HowItWorks from '../components/HowItWorks';
import LiveStats from '../components/LiveStats';
import Reviews from '../components/Reviews';
import BecomePartner from '../components/BecomePartner';
import DownloadApp from '../components/DownloadApp';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Grid, Briefcase, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Home({
  cartItems,
  cartCount,
  cartTotal,
  location,
  pincode,
  selectedCategory,
  searchQuery,
  darkMode,
  isCartOpen,
  quickViewProduct,
  isVoiceModalOpen,
  isImageModalOpen,
  isLocationModalOpen,
  isGpsLoading,
  isListening,
  isUploading,
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated = false,
  user,
  onProfile,
  onCartPage,
  onOrdersPage,
  onWishlistPage,
  onSettingsPage,
  toggleDarkMode,
  onVoiceSearchClick,
  onImageSearchClick,
  onDetectGPS,
  onAddToCart,
  onQuickView,
  onCategorySelect,
  onBecomePartnerSelect,
  onShopSelect,
  onServiceBook,
  onCheckout,
  onCloseCart,
  onCloseQuickView,
  onCloseVoiceModal,
  onCloseImageModal,
  onCloseLocationModal,
  setSelectedCategory,
  setCartItems,
  getCartQuantity,
  handleAddToCart,
  setIsCartOpen,
  setQuickViewProduct,
  setIsVoiceModalOpen,
  setIsImageModalOpen,
  setIsLocationModalOpen,
  setLocation,
  setPincode,
  setIsGpsLoading,
  setIsListening,
  setIsUploading,
  handleGPSDetect,
  handleVoiceSearch,
  handleImageSearch,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-background text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onLocationChange={setLocation}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={onProfile}
        onCartPage={onCartPage}
        onOrdersPage={onOrdersPage}
        onWishlistPage={onWishlistPage}
        onSettingsPage={onSettingsPage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={onVoiceSearchClick}
        onImageSearchClick={onImageSearchClick}
      />

      <LocationBar
        location={location}
        pincode={pincode}
        onLocationClick={onLocationClick}
        onDetectGPS={onDetectGPS}
      />

      <main className="flex-1">
        <HeroSection
          onShopNow={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
          onBookService={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
          onBecomeSeller={() => document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' })}
        />

        <Categories
          activeCategory={selectedCategory}
          onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <FlashDeals onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} cartItems={cartItems} />

        <NearbyShops onShopSelect={onShopSelect} />

        <div id="products-section">
          <FeaturedProducts
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            cartItems={cartItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
          />
        </div>

        <div id="services-section">
          <ServiceSection onBookService={onServiceBook} />
        </div>

        <Advertisements />
        <WhySaathApp />
        <HowItWorks />
        <LiveStats />
        <Reviews />

        {/* 🚀 Become a Service Professional Glassmorphic Section */}
        <section className="py-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              onClick={() => navigate('/service-professional')}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative overflow-hidden cursor-pointer rounded-card bg-gradient-to-br from-emerald-600 via-primary to-indigo-700 p-8 sm:p-12 border-0 shadow-premium hover:shadow-glow-primary transition-all flex flex-col md:flex-row items-center justify-between gap-8 group"
            >
              {/* Background glowing gradients */}
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-white/10 blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              
              {/* Left Side Info */}
              <div className="flex-1 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">🚀 {t('become_a_service_professional')}</span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                    {t('become_a_service_professional')}
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-50/90 font-medium leading-relaxed max-w-2xl drop-shadow">
                    Join India's trusted hyperlocal service network. Earn more, work flexibly and grow your business with SaathApp.
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="py-3 px-6 rounded-btn bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-colors border-0"
                  >
                    <span>Join Now</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="py-3 px-6 rounded-btn border border-white/30 bg-white/10 text-white font-extrabold text-xs sm:text-sm cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>

              {/* Right Side Illustration */}
              <div className="relative w-full md:w-80 h-64 flex items-center justify-center shrink-0">
                {/* Background decorative rings */}
                <div className="absolute w-48 h-48 rounded-full border border-white/10 animate-spin-slow pointer-events-none" />
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-white/20 animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
                
                {/* Character Illustration Container */}
                <div className="relative z-10 w-44 h-44 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-premium group-hover:scale-105 transition-transform duration-500">
                  {/* Floating tools icons */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-3 -left-3 p-2.5 rounded-xl bg-amber-50 shadow-premium border border-amber-250/50 flex items-center justify-center"
                  >
                    <span className="text-2xl leading-none">🔧</span>
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-3 -right-3 p-2.5 rounded-xl bg-blue-50 shadow-premium border border-blue-200/50 flex items-center justify-center"
                  >
                    <span className="text-2xl leading-none">⚡</span>
                  </motion.div>
                  <motion.div 
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/2 -right-6 p-2.5 rounded-xl bg-purple-50 shadow-premium border border-purple-200/50 -translate-y-1/2 flex items-center justify-center"
                  >
                    <span className="text-2xl leading-none">🧹</span>
                  </motion.div>

                  {/* Character Illustration SVG */}
                  <svg viewBox="0 0 100 100" className="w-28 h-28 text-white drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.15" />
                    <path d="M25 80C25 70 30 62 40 58L50 65L60 58C70 62 75 70 75 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M45 58V50H55V58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="50" cy="40" r="14" stroke="currentColor" strokeWidth="4" />
                    <path d="M36 36C36 28 42 22 50 22C58 22 64 28 64 36" stroke="#FFC107" strokeWidth="5" strokeLinecap="round" />
                    <path d="M30 36H70" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" />
                    <path d="M48 29L52 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* 👤 Customer Dashboard Glassmorphic Section */}
            <motion.div
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/customer/dashboard');
                } else {
                  navigate('/login', { state: { from: '/customer/dashboard' } });
                }
              }}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="mt-6 relative overflow-hidden cursor-pointer rounded-card bg-gradient-to-br from-indigo-600 via-[#6C3BFF] to-[#FF5A7A] p-8 sm:p-12 border-0 shadow-premium hover:shadow-glow-primary transition-all flex flex-col md:flex-row items-center justify-between gap-8 group"
            >
              {/* Background glowing gradients */}
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-white/10 blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-white/10 blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              
              {/* Left Side Info */}
              <div className="flex-1 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">👤 {t('profile')} / {t('dashboard')}</span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                    Customer Dashboard
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-2xl drop-shadow">
                    Manage your orders, bookings, wallet, addresses, profile, rewards and settings from one place.
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isAuthenticated) {
                        navigate('/customer/dashboard');
                      } else {
                        navigate('/login', { state: { from: '/customer/dashboard' } });
                      }
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="py-3 px-6 rounded-btn bg-white hover:bg-slate-100 text-[#6C3BFF] font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-colors border-0"
                  >
                    <span>Go to Dashboard</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('SaathApp Customer Dashboard allows you to manage purchases, schedule on-demand home repairs, check rewards balance, and update default profile addresses.');
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="py-3 px-6 rounded-btn border border-white/30 bg-white/10 text-white font-extrabold text-xs sm:text-sm cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>

              {/* Right Side Illustration */}
              <div className="relative w-full md:w-80 h-64 flex items-center justify-center shrink-0">
                {/* Background decorative rings */}
                <div className="absolute w-48 h-48 rounded-full border border-white/10 animate-spin-slow pointer-events-none" />
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-white/20 animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
                
                {/* Character Illustration Container */}
                <div className="relative z-10 w-44 h-44 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-premium group-hover:scale-105 transition-transform duration-500">
                  <User size={64} className="text-white drop-shadow" />
                  
                  {/* Floating helper icons */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-3 -left-3 p-2.5 rounded-xl bg-white text-[#6C3BFF] shadow-premium border border-white/20 flex items-center justify-center"
                  >
                    <span className="text-xl leading-none">📦</span>
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                    className="absolute -bottom-3 -right-3 p-2.5 rounded-xl bg-white text-emerald-500 shadow-premium border border-white/20 flex items-center justify-center"
                  >
                    <span className="text-xl leading-none">💰</span>
                  </motion.div>
                  <motion.div 
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeInOut" }}
                    className="absolute top-1/2 -right-6 -translate-y-1/2 p-2.5 rounded-xl bg-white text-rose-500 shadow-premium border border-white/20 flex items-center justify-center"
                  >
                    <span className="text-xl leading-none">📍</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div id="partner-section">
          <BecomePartner onBecomePartnerSelect={onBecomePartnerSelect} />
        </div>

        <DownloadApp />
      </main>

      <Footer />

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-850 px-4 py-2 flex items-center justify-around shadow-premium">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-primary">
          <HomeIcon size={20} />
          <span className="text-[9px] font-black uppercase">Home</span>
        </button>
        <button onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-primary transition-colors">
          <Grid size={20} />
          <span className="text-[9px] font-black uppercase">Store</span>
        </button>
        <button onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-primary transition-colors">
          <Briefcase size={20} />
          <span className="text-[9px] font-black uppercase">Services</span>
        </button>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-primary transition-colors relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-danger text-white border border-white font-extrabold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[9px] font-black uppercase">Cart</span>
        </button>
      </div>

      {cartCount > 0 && !isCartOpen && (
        <motion.div initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} className="hidden md:block fixed bottom-6 right-6 z-40">
          <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-3 bg-gradient-primary text-white py-3.5 px-6 rounded-full shadow-premium hover:shadow-glow-primary transition-all font-black text-sm cursor-pointer">
            <div className="relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-2.5 -right-2 bg-secondary text-slate-900 border border-primary font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span>CHECKOUT (₹{cartTotal})</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
