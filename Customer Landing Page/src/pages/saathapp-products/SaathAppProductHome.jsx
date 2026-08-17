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
        <ProductHero />
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Shop by Category</h2>
            <button onClick={() => navigate('/saathapp-products/all')} className="text-sm font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {saathAppCategories.map((cat) => (
              <ProductCategoryCard key={cat.id} category={cat} onClick={() => navigate(`/saathapp-products/category/${cat.id}`)} />
            ))}
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/saathapp-products/all')} className="text-primary font-semibold text-sm">All Products</button></li>
                {saathAppCategories.map((cat) => (
                  <li key={cat.id}>
                    <button onClick={() => navigate(`/saathapp-products/category/${cat.id}`)} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
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
