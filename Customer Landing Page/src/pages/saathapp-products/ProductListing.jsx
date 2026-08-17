import React, { useState } from 'react';
import { useParams, useNavigate, useLocation as useReactLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/saathapp-product/ProductGrid';
import ProductFilters from '../../components/saathapp-product/ProductFilters';
import { products, categories } from '../../data/products';
import { ChevronRight, Home } from 'lucide-react';

export default function ProductListing({
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
  isOffersPage = false,
  isAllCategories = false
}) {
  const routerLocation = useReactLocation();
  const pathParts = routerLocation.pathname.split('/');
  // Expected paths: /products/:categoryId or /products/saathapp-products/category/:categoryId
  let categoryId = pathParts[pathParts.length - 1];
  if (categoryId === 'products' || categoryId === 'search') categoryId = null;
  const navigate = useNavigate();
  
  const categoryInfo = categories.find(c => c.id === categoryId);
  const title = isOffersPage ? 'Special Offers' : isAllCategories ? 'All Categories' : categoryInfo ? categoryInfo.name : 'All Products';
  
  React.useEffect(() => {
    document.title = `${title} | SaathApp Official`;
  }, [title]);

  const [filters, setFilters] = useState({
    priceRange: '',
    availability: '',
    rating: '',
    type: ''
  });
  
  const [sort, setSort] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network request
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [categoryId, filters, sort, isOffersPage, isAllCategories]);

  // Filter products based on category ID, offers, or all
  let filteredProducts = products;
  if (isOffersPage) {
    filteredProducts = products.filter(p => p.isOffer);
  } else if (!isAllCategories && categoryId && categoryId !== 'all') {
    filteredProducts = products.filter(p => p.category === categoryId);
  }

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
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1"><Home size={12} /> Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/products')} className="hover:text-primary">Products</button>
          {categoryId && (
            <>
              <ChevronRight size={12} />
              <span className="text-slate-800 dark:text-slate-300">{title}</span>
            </>
          )}
          {isOffersPage && (
            <>
              <ChevronRight size={12} />
              <span className="text-slate-800 dark:text-slate-300">Offers</span>
            </>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2">{title}</h1>
          <p className="text-slate-500">{filteredProducts.length} Products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <ProductFilters 
              filters={filters} 
              setFilters={setFilters} 
              activeCategory={categoryId} 
              onCategoryChange={(cat) => navigate(cat === 'all' ? '/products' : `/products/${cat}`)} 
            />
          </aside>
          
          {/* Product Grid & Sort */}
          <div className="flex-1">
            {isAllCategories ? (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {categories.map(cat => (
                    <div 
                      key={cat.id} 
                      onClick={() => navigate(`/products/${cat.id}`)}
                      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:shadow-lg transition-all group aspect-square"
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">{cat.id === 'grocery' ? '🥬' : cat.id === 'electronics' ? '📱' : cat.id === 'fashion' ? '👕' : '🛍️'}</span>
                      </div>
                      <h3 className="font-bold text-lg">{cat.name}</h3>
                      <p className="text-xs text-slate-500 mt-2">{products.filter(p => p.category === cat.id).length} Products</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
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
                      <option value="rating">Rating</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
                
                {filteredProducts.length > 0 || isLoading ? (
                  <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} isLoading={isLoading} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <span className="text-6xl mb-4">🔍</span>
                    <h3 className="text-xl font-bold mb-2">No products found</h3>
                    <p className="text-slate-500 max-w-sm">We couldn't find any products matching your selected filters. Try adjusting them.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
