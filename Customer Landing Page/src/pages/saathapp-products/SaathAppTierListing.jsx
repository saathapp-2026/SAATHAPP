import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/saathapp-product/ProductGrid';
import { mockSaathAppProducts, saathAppCategories } from '../../data/saathAppProducts';
import { ChevronRight, Home, Filter } from 'lucide-react';

export default function SaathAppTierListing({
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
  const routerLocation = useLocation();
  const navigate = useNavigate();
  
  const isPremium = routerLocation.pathname.includes('/premium');
  const isNormal = routerLocation.pathname.includes('/normal');
  const tier = isPremium ? 'PREMIUM' : 'NORMAL';
  
  // Also parse optional category from path: /saathapp-products/normal/:categoryId
  const pathParts = routerLocation.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  const activeCategoryId = (lastPart !== 'normal' && lastPart !== 'premium') ? lastPart : 'all';

  const title = isPremium ? 'Premium Products' : 'Normal Products';
  const subtitle = isPremium 
    ? 'Superior Quality. Exclusive Design. Limited Availability.' 
    : 'Everyday value. Reliable quality. Made for everyone.';

  useEffect(() => {
    document.title = `${title} | SaathApp Official`;
  }, [title]);

  const [sort, setSort] = useState('popular');
  const [selectedType, setSelectedType] = useState(isPremium ? 'Premium' : 'Normal');

  // We should actually let the user filter by type, but defaults are set by the route.
  useEffect(() => {
    setSelectedType(isPremium ? 'Premium' : 'Normal');
  }, [isPremium]);

  // Handle tier filter changes to redirect to correct route
  const handleTypeChange = (type) => {
    if (type === 'Normal') navigate('/saathapp-products/normal');
    else if (type === 'Premium') navigate('/saathapp-products/premium');
    else if (type === 'All') navigate('/saathapp-products');
  };

  let filteredProducts = mockSaathAppProducts.filter(p => p.productTier === tier);
  
  if (activeCategoryId && activeCategoryId !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === activeCategoryId);
  }

  // Categories available for this tier
  const availableCategories = saathAppCategories.filter(cat => 
    mockSaathAppProducts.some(p => p.productTier === tier && p.category === cat.id)
  );

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
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <button onClick={() => navigate('/saathapp-products')} className="hover:text-primary flex items-center gap-1">SaathApp Products</button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-300">{title}</span>
          {activeCategoryId !== 'all' && (
            <>
              <ChevronRight size={12} />
              <span className="text-slate-800 dark:text-slate-300">{saathAppCategories.find(c => c.id === activeCategoryId)?.name}</span>
            </>
          )}
        </div>

        {/* Header Section */}
        <div className={`mb-8 p-8 rounded-2xl ${isPremium ? 'bg-gradient-to-r from-slate-900 to-black text-amber-400 border border-slate-800' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'}`}>
          <h1 className={`text-3xl font-black mb-2 ${isPremium ? 'text-amber-400' : ''}`}>
            {isPremium && <span className="mr-2">✨</span>}
            {title}
          </h1>
          <p className={isPremium ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}>{subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Filter size={16} /> Filters</h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Product Type</h4>
                <div className="space-y-2">
                  {['All', 'Normal', 'Premium'].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="productType" 
                        className="hidden" 
                        checked={selectedType === type}
                        onChange={() => handleTypeChange(type)}
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedType === type ? 'border-primary' : 'border-slate-300 group-hover:border-primary'}`}>
                        {selectedType === type && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className={`text-sm ${selectedType === type ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Categories</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate(`/saathapp-products/${tier.toLowerCase()}`)}
                    className={`block text-sm ${activeCategoryId === 'all' ? 'font-bold text-primary' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
                  >
                    All {title}
                  </button>
                  {availableCategories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => navigate(`/saathapp-products/${tier.toLowerCase()}/${cat.id}`)}
                      className={`block text-sm text-left ${activeCategoryId === cat.id ? 'font-bold text-primary' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Showing {filteredProducts.length} results</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">Sort by:</span>
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-semibold py-1.5 px-3 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular">Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} isPremium={isPremium} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <h3 className="text-xl font-bold mb-2">No {isPremium ? 'premium' : 'normal'} products available</h3>
                <p className="text-slate-500 max-w-sm mb-6">
                  {isPremium 
                    ? 'Our next exclusive collection is coming soon.' 
                    : "We're preparing something great for you."}
                </p>
                <button 
                  onClick={() => navigate(isPremium ? '/saathapp-products/normal' : '/saathapp-products')}
                  className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
                >
                  {isPremium ? 'Explore Normal Products' : 'Explore SaathApp Products'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
