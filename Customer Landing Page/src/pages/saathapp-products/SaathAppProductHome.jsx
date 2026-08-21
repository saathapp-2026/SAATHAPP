import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductHero from '../../components/saathapp-product/ProductHero';
import ProductCategoryCard from '../../components/saathapp-product/ProductCategoryCard';
import ProductGrid from '../../components/saathapp-product/ProductGrid';
import BulkOrderBanner from '../../components/saathapp-product/BulkOrderBanner';
import TrustBadges from '../../components/saathapp-product/TrustBadges';
import { mockSaathAppProducts, saathAppCategories } from '../../data/saathAppProducts';
import premiumBannerImg from '../../assets/premium-products-banner.png';
import normalBannerImg from '../../assets/normal-products-banner.png';

export default function SaathAppProductHome({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode,
  handleAddToCart,
}) {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "SaathApp Products | Official Merchandise";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-primary flex items-center gap-1">Categories</button>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-300">SaathApp Product</span>
        </div>

        <ProductHero />
        
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Designed for Every You</h2>
            <p className="text-slate-600 dark:text-slate-400">Discover our two exclusive collections.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Normal Products Card */}
            <div 
              onClick={() => navigate('/products/saathapp/normal')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-[340px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <img
                  src={normalBannerImg}
                  alt="Normal Products Showcase"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">NORMAL PRODUCTS</h3>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">Made for Everyone.</p>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Affordable, reliable and quality-assured products designed for everyday use.</p>
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto hover:bg-primary/90 transition-colors">
                  Explore Normal Products
                </button>
              </div>
            </div>

            {/* Premium Products Card */}
            <div 
              onClick={() => navigate('/products/saathapp/premium')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-black dark:from-slate-800 dark:to-black border border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white"
            >
              <div className="h-[340px] bg-slate-900 flex items-center justify-center relative overflow-hidden">
                <img
                  src={premiumBannerImg}
                  alt="Premium Products Showcase"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-amber-400">PREMIUM PRODUCTS</h3>
                </div>
                <p className="text-lg font-medium text-slate-300 mb-4">Made for Those Who Value More.</p>
                <p className="text-slate-400 mb-6">Superior materials, refined design and genuinely limited availability.</p>
                <button className="bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold w-full sm:w-auto hover:bg-amber-400 transition-colors">
                  Explore Premium Products
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Shop by Category</h2>
            <button onClick={() => navigate('/products/saathapp/all')} className="text-sm font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {saathAppCategories.map((cat) => (
              <ProductCategoryCard key={cat.id} category={cat} onClick={() => navigate(`/products/saathapp/category/${cat.id}`)} />
            ))}
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/products/saathapp/all')} className="text-primary font-semibold text-sm">All Products</button></li>
                {saathAppCategories.map((cat) => (
                  <li key={cat.id}>
                    <button onClick={() => navigate(`/products/saathapp/category/${cat.id}`)} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg mb-4">Why SaathApp Products?</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Designed by SaathApp
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Quality Assured
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Affordable Prices
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Perfect for Gifting
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Bulk Orders Available
                </li>
              </ul>
            </div>
          </aside>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">All SaathApp Products</h2>
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button className="px-4 py-1.5 text-sm font-semibold bg-white dark:bg-slate-700 rounded-md shadow-sm">All</button>
                  <button className="px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">New Arrivals</button>
                  <button className="px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">Best Sellers</button>
                  <button className="px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">On Sale</button>
                </div>
                <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 px-3 outline-none focus:ring-2 focus:ring-primary">
                  <option>Sort by: Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>
            
            <ProductGrid products={mockSaathAppProducts} onAddToCart={handleAddToCart} />
          </div>
        </section>

        <BulkOrderBanner />
        <TrustBadges />
      </main>

      <Footer />
    </div>
  );
}
