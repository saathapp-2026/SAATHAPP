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

import BecomePartner from '../components/BecomePartner';
import SaathAppPlusHomeSection from '../components/plus/SaathAppPlusHomeSection';
import ShopMoreHomePromo from '../components/ShoppingJourney/ShopMoreHomePromo';

import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Grid, Briefcase, ShoppingCart, User, HardHat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getStoredPartnerSession } from '../services/authService';

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
  _quickViewProduct,
  _isVoiceModalOpen,
  _isImageModalOpen,
  _isLocationModalOpen,
  _isGpsLoading,
  _isListening,
  _isUploading,
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
  _onAddToCart,
  _onQuickView,
  _onCategorySelect,
  onBecomePartnerSelect,
  onShopSelect,
  onServiceBook,
  _onCheckout,
  _onCloseCart,
  _onCloseQuickView,
  _onCloseVoiceModal,
  _onCloseImageModal,
  _onCloseLocationModal,
  setSelectedCategory,
  _setCartItems,
  _getCartQuantity,
  handleAddToCart,
  setIsCartOpen,
  setQuickViewProduct,
  _setIsVoiceModalOpen,
  _setIsImageModalOpen,
  _setIsLocationModalOpen,
  setLocation,
  _setPincode,
  _setIsGpsLoading,
  _setIsListening,
  _setIsUploading,
  _handleGPSDetect,
  _handleVoiceSearch,
  _handleImageSearch,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-page dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
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

        <div id="categories-section">
          <Categories
            activeCategory={selectedCategory}
            onCategorySelect={(cat) => {
              if (cat === 'all') {
                navigate('/products');
              } else if (cat === 'services') {
                navigate('/products/services');
              } else {
                navigate(`/products/${cat}`);
              }
            }}
          />
        </div>

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

        <div className="saath-container py-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
            <SaathAppPlusHomeSection />
            <ShopMoreHomePromo />
          </div>
        </div>

        <Advertisements />


        <div id="partner-section">
          <BecomePartner onBecomePartnerSelect={onBecomePartnerSelect} />
        </div>


      </main>

      <Footer />



      {cartCount > 0 && !isCartOpen && (
        <motion.div initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} className="hidden md:block fixed bottom-6 right-6 z-40">
          <button onClick={onCartPage} className="flex items-center gap-3 bg-gradient-primary text-white py-3.5 px-6 rounded-full shadow-premium hover:shadow-glow-primary transition-all font-black text-sm cursor-pointer">
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
