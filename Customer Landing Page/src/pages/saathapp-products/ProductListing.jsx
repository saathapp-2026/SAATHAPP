import React, { useState } from 'react';
import { useParams, useNavigate, useLocation as useReactLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/saathapp-product/ProductGrid';
import ProductFilters from '../../components/saathapp-product/ProductFilters';
import { products, categories, subcategories, festivals } from '../../data/products';
import { mockSaathAppProducts } from '../../data/saathAppProducts';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export default function ProductListing({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  onSearch,
  searchQuery,
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
  const reactLocation = useReactLocation();
  const searchParams = new URLSearchParams(reactLocation.search);
  const festivalFilter = searchParams.get('festival');

  const pathParts = reactLocation.pathname.split('/').filter(Boolean);
  let categoryId = null;
  let subCategoryId = null;

  if (pathParts[0] === 'products') {
    if (pathParts[1]) categoryId = pathParts[1];
    if (pathParts[2]) subCategoryId = pathParts[2];
  }

  React.useEffect(() => {
    if (categoryId && categoryId !== 'all') {
      trackEvent('category_view', {
        category: categoryId,
        subCategory: subCategoryId || null,
        festival: festivalFilter || null,
        isSearch: !!searchQuery
      });
    }
  }, [categoryId, subCategoryId, festivalFilter, searchQuery]);

  const isSearch = categoryId === 'search';
  const isOffersPage = categoryId === 'offers';
  const isAllCategories = categoryId === 'all' || (!categoryId && !festivalFilter);

  if (isSearch || categoryId === 'all') categoryId = null;

  const categoryInfo = categories.find(c => c.id === categoryId);
  const subCategoryInfo = categoryId && subCategoryId && subcategories[categoryId] ? subcategories[categoryId].find(s => s.id === subCategoryId) : null;

  let title = 'All Products';
  let seoTitle = 'Buy Products Online | SaathApp';
  
  if (isSearch) {
    title = `Search Results for "${searchQuery}"`;
    seoTitle = title;
  } else if (isOffersPage) {
    title = 'Special Offers';
    seoTitle = title;
  } else if (festivalFilter) {
    const fest = festivals.find(f => f.id === festivalFilter);
    title = fest ? `${fest.name} Collection` : 'Festival Collection';
    seoTitle = `${title} | SaathApp`;
  } else if (subCategoryInfo) {
    title = subCategoryInfo.name;
    seoTitle = categoryId === 'spiritual-puja' 
      ? `${subCategoryInfo.name} Online | SaathApp` 
      : `${subCategoryInfo.name} | SaathApp Official`;
  } else if (categoryInfo) {
    title = categoryInfo.name;
    seoTitle = categoryId === 'spiritual-puja'
      ? `Spiritual & Puja Items Online | SaathApp`
      : `${categoryInfo.name} | SaathApp Official`;
  }
  
  React.useEffect(() => {
    document.title = seoTitle;
    
    // Analytics tracking
    if (categoryId === 'spiritual-puja') {
      if (festivalFilter) {
        trackEvent('festival_collection_click', { festival: festivalFilter });
      } else if (subCategoryId) {
        trackEvent('spiritual_subcategory_click', { subcategory: subCategoryId });
      } else {
        trackEvent('spiritual_category_view', { category: 'spiritual-puja' });
      }
    }
  }, [seoTitle, categoryId, subCategoryId, festivalFilter]);

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
  }, [categoryId, filters, sort, isOffersPage, isAllCategories, searchQuery, festivalFilter]);

  // Combine products for global search, removing duplicates by id
  const allProducts = [...products];
  for (const mp of mockSaathAppProducts) {
    if (!allProducts.some(p => p.id === mp.id)) {
      allProducts.push(mp);
    }
  }

  // Filter products based on category ID, offers, search, or all
  let filteredProducts = products;
  
  if (isSearch && searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    const queryTerms = query.split(' ').filter(Boolean);
    
    const getScore = (p) => {
      const name = (p.name || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const sub = (p.subCategory || '').toLowerCase().replace('-', ' ');
      const desc = (p.description || '').toLowerCase();
      const seller = (p.brand || '').toLowerCase();
      const groceryTier = (p.groceryTier || '').toLowerCase();
      const electronicsType = (p.electronicsType || '').toLowerCase();
      const spiritualType = (p.spiritualType || '').toLowerCase();
      
      if (name === query) return 100;
      if (name.startsWith(query)) return 50;
      if (name.includes(query)) return 20;
      
      const searchFields = [name, cat, sub, desc, seller, groceryTier, electronicsType, spiritualType];
      
      const matchesAll = queryTerms.every(t => searchFields.some(field => field.includes(t)));
      if (matchesAll) return 10;
      
      const matchesSome = queryTerms.some(t => [name, cat, sub, seller, groceryTier].some(field => field.includes(t)));
      if (matchesSome) return 1;
      
      return 0;
    };

    filteredProducts = allProducts
      .filter(p => getScore(p) > 0)
      .sort((a, b) => getScore(b) - getScore(a));
  } else if (isOffersPage) {
    filteredProducts = products.filter(p => p.promotion?.active);
  } else if (!isAllCategories && categoryId && categoryId !== 'all') {
    filteredProducts = products.filter(p => p.category === categoryId);
    if (subCategoryId) {
      filteredProducts = filteredProducts.filter(p => p.subCategory === subCategoryId);
    }
  }

  if (festivalFilter) {
    filteredProducts = filteredProducts.filter(p => p.festival === festivalFilter);
  }

  // Apply filters from ProductFilters sidebar
  if (filters.priceRange) {
    if (filters.priceRange === 'Under ₹199') filteredProducts = filteredProducts.filter(p => p.price < 199);
    else if (filters.priceRange === '₹199 - ₹499') filteredProducts = filteredProducts.filter(p => p.price >= 199 && p.price <= 499);
    else if (filters.priceRange === '₹500 - ₹999') filteredProducts = filteredProducts.filter(p => p.price >= 500 && p.price <= 999);
    else if (filters.priceRange === '₹1,000+') filteredProducts = filteredProducts.filter(p => p.price >= 1000);
  }
  if (filters.rating) {
    const minRating = parseInt(filters.rating.charAt(0));
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating);
  }
  // Custom Spiritual filters
  if (filters.deity) {
    const d = filters.deity.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.description?.toLowerCase().includes(d) || p.name?.toLowerCase().includes(d));
  }
  if (filters.material) {
    const m = filters.material.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.description?.toLowerCase().includes(m) || p.name?.toLowerCase().includes(m));
  }
  if (filters.occasion) {
    const o = filters.occasion.toLowerCase();
    // Special handling for "Daily Puja" since description might just have "daily"
    const isDaily = o === 'daily puja';
    filteredProducts = filteredProducts.filter(p => 
      p.description?.toLowerCase().includes(isDaily ? 'daily' : o) || 
      p.name?.toLowerCase().includes(isDaily ? 'daily' : o)
    );
  }
  
  if (filters.groceryTier) {
    if (filters.groceryTier === 'Premium Grocery') {
      filteredProducts = filteredProducts.filter(p => p.groceryTier === 'Premium');
    } else if (filters.groceryTier === 'Normal Grocery') {
      filteredProducts = filteredProducts.filter(p => p.groceryTier === 'Normal');
    }
  }
  
  if (filters.electronicsType) {
    filteredProducts = filteredProducts.filter(p => p.electronicsType === filters.electronicsType);
  }

  if (filters.spiritualType) {
    filteredProducts = filteredProducts.filter(p => p.spiritualType === filters.spiritualType);
  }

  // Apply sorting
  if (sort === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));


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
              <button onClick={() => navigate(`/products/${categoryId}`)} className={`${subCategoryId ? 'hover:text-primary' : 'text-slate-800 dark:text-slate-300'}`}>
                {categoryInfo ? categoryInfo.name : categoryId}
              </button>
            </>
          )}
          {subCategoryId && (
            <>
              <ChevronRight size={12} />
              <span className="text-slate-800 dark:text-slate-300">{subCategoryInfo ? subCategoryInfo.name : subCategoryId}</span>
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

        {/* Grocery Homepage Merchandising */}
        {categoryId === 'grocery' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <div className="mb-10">
            <h2 className="text-xl font-black mb-4">Shop Grocery</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <button onClick={() => setFilters({...filters, groceryTier: 'Normal Grocery'})} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary hover:shadow-lg transition-all group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🛒</span>
                <span className="font-bold text-sm text-center">Normal Grocery</span>
              </button>
              <button onClick={() => setFilters({...filters, groceryTier: 'Premium Grocery'})} className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl hover:shadow-lg transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 blur-2xl opacity-20"></div>
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">✨</span>
                <span className="font-bold text-sm text-center text-amber-900 dark:text-amber-100">Premium Grocery</span>
              </button>
              <button onClick={() => navigate('/products/grocery/fruits-vegetables')} className="flex flex-col items-center justify-center p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl hover:shadow-lg transition-all group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🥬</span>
                <span className="font-bold text-sm text-center text-emerald-900 dark:text-emerald-100">Fresh Fruits & Veg</span>
              </button>
              <button onClick={() => navigate('/products/grocery/dairy-bakery')} className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl hover:shadow-lg transition-all group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🥛</span>
                <span className="font-bold text-sm text-center text-blue-900 dark:text-blue-100">Dairy & Bakery</span>
              </button>
              <button onClick={() => navigate('/products/offers')} className="flex flex-col items-center justify-center p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-2xl hover:shadow-lg transition-all group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏷️</span>
                <span className="font-bold text-sm text-center text-rose-900 dark:text-rose-100">Deals</span>
              </button>
            </div>
            
            {/* Grocery Quick Tier Filter */}
            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-px mb-6">
              <button 
                onClick={() => setFilters({...filters, groceryTier: ''})}
                className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 ${!filters.groceryTier ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilters({...filters, groceryTier: 'Normal Grocery'})}
                className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 ${filters.groceryTier === 'Normal Grocery' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              >
                Normal Grocery
              </button>
              <button 
                onClick={() => setFilters({...filters, groceryTier: 'Premium Grocery'})}
                className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 ${filters.groceryTier === 'Premium Grocery' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              >
                Premium Grocery
              </button>
            </div>
          </div>
        )}

        {categoryId && subcategories[categoryId] && categoryId !== 'grocery' && !isSearch && !isAllCategories && !isOffersPage && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Quick Categories</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
              {subcategories[categoryId].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => navigate(`/products/${categoryId}/${sub.id}`)}
                  className={`flex-none px-6 py-3 rounded-full text-sm font-bold border transition-all snap-start ${
                    subCategoryId === sub.id 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Festival Engine Integration */}
        {(categoryId === 'spiritual-puja' || festivalFilter) && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-amber-500" size={20} />
              Shop by Festival
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {festivals.map(fest => (
                <button
                  key={fest.id}
                  onClick={() => navigate(`/products/spiritual-puja?festival=${fest.id}`)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                    festivalFilter === fest.id 
                      ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-500/20' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${festivalFilter === fest.id ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Sparkles size={20} />
                  </div>
                  <span className={`text-xs font-bold text-center ${festivalFilter === fest.id ? 'text-amber-700' : 'text-slate-700 dark:text-slate-300'}`}>
                    {fest.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

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
