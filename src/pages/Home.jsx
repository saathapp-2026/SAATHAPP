import React from 'react';
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
import { Home as HomeIcon, Grid, Briefcase, ShoppingCart } from 'lucide-react';

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
  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-background text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
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
