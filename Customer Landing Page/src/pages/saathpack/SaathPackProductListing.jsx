import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Filter, Search, Truck, ChevronRight, CheckCircle2, Package } from 'lucide-react';
import { saathPackProducts } from '../../data/saathPackProducts';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SaathPackProductListing({
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
  toggleDarkMode
}) {
  const navigate = useNavigate();
  const reactLocation = useLocation();
  const queryParams = new URLSearchParams(reactLocation.search);
  const initialCategory = queryParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedItems, setAddedItems] = useState({});
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedPackQty, setSelectedPackQty] = useState([]);
  const [sortBy, setSortBy] = useState('Popularity');
  const { handleAddToCart, getCartQuantity } = useCart();

  const categories = ['All', 'Paper Bags', 'Delivery Bags', 'Pouches', 'Corrugated Boxes', 'Carton Boxes', 'Foil & Wraps', 'Tapes & Labels', 'Other Supplies'];

  const handleAdd = (id, product) => {
    const productForCart = {
      ...product,
      name: `${product.name} (Pack of ${product.packSize})`,
    };
    handleAddToCart(productForCart, 1);
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const toggleFilter = (setFn, value) => {
    setFn(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedMaterials([]);
    setSelectedPackQty([]);
    setSortBy('Popularity');
  };

  let filteredProducts = [...saathPackProducts];

  if (selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (selectedSizes.length > 0 && !selectedSizes.includes('All Sizes')) {
    filteredProducts = filteredProducts.filter(p => selectedSizes.includes(p.sizeBucket));
  }

  if (selectedMaterials.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      selectedMaterials.includes(p.material) || 
      (selectedMaterials.includes('Others') && !['Kraft Paper', 'Corrugated', 'Plastic', 'Aluminium'].includes(p.material))
    );
  }

  if (selectedPackQty.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      if (selectedPackQty.includes('10 - 50') && p.packSize >= 10 && p.packSize <= 50) return true;
      if (selectedPackQty.includes('51 - 100') && p.packSize >= 51 && p.packSize <= 100) return true;
      if (selectedPackQty.includes('101 - 500') && p.packSize >= 101 && p.packSize <= 500) return true;
      if (selectedPackQty.includes('501 & above') && p.packSize >= 501) return true;
      return false;
    });
  }

  if (sortBy === 'Price: Low to High') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'Popularity') {
    filteredProducts.sort((a, b) => b.reviews - a.reviews);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] font-sans pb-20">
      <Header
        cartCount={cartCount}
        location={location}
        onCartClick={onCartClick}
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
      {/* Top Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6">
          <div className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-semibold">
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/')}>Home</span> 
            <ChevronRight className="inline w-3 h-3 mx-1" /> 
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/products')}>Categories</span> 
            <ChevronRight className="inline w-3 h-3 mx-1" /> 
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/products/saathpack/landing')}>SaathPack</span>
            <ChevronRight className="inline w-3 h-3 mx-1" /> 
            <span className="text-slate-800">Products</span>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-2">
                All Saath<span className="text-primary">Pack</span> Products
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Exclusively for registered SaathApp businesses, sellers, vendors, partners and franchisees.
              </div>
            </div>
            
            {/* Features Banner (Right side of header) */}
            <div className="bg-green-50/80 border border-green-100 rounded-2xl py-3 px-6 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                <div>
                  <h4 className="font-bold text-xs text-green-900">Best Quality</h4>
                  <p className="text-[10px] text-green-700">Premium materials</p>
                </div>
              </div>
              <div className="w-px h-8 bg-green-200"></div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-xl text-primary">₹</span>
                <div>
                  <h4 className="font-bold text-xs text-green-900">Better Prices</h4>
                  <p className="text-[10px] text-green-700">Market se kam</p>
                </div>
              </div>
              <div className="w-px h-8 bg-green-200"></div>
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                <div>
                  <h4 className="font-bold text-xs text-green-900">Bulk Supply</h4>
                  <p className="text-[10px] text-green-700">Bigger savings</p>
                </div>
              </div>
              <div className="w-px h-8 bg-green-200"></div>
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <h4 className="font-bold text-xs text-green-900">5-10 Days Delivery</h4>
                  <p className="text-[10px] text-green-700">Planned delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black text-slate-800 text-sm tracking-wide">FILTERS</h2>
              <button 
                onClick={clearAllFilters} 
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none text-primary text-xs font-bold hover:underline"
              >
                Clear All
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6 border-b border-slate-100 pb-6">
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="font-bold text-slate-800 text-sm">Category</h3>
                <ChevronRight className="w-4 h-4 text-slate-400 rotate-270 -rotate-90" />
              </div>
              <div className="flex flex-col gap-3">
                <label 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setSelectedCategory('All')}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${selectedCategory === 'All' ? 'border-[5px] border-primary' : 'border border-slate-300 group-hover:border-primary w-3.5 h-3.5 ml-[1px]'}`}></div>
                  <span className={`text-sm transition-colors ${selectedCategory === 'All' ? 'font-semibold text-slate-800' : 'text-slate-600 group-hover:text-primary'}`}>All Categories</span>
                </label>
                {categories.filter(c => c !== 'All').map(cat => (
                  <label 
                    key={cat} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${selectedCategory === cat ? 'border-[5px] border-primary' : 'border border-slate-300 group-hover:border-primary w-3.5 h-3.5 ml-[1px]'}`}></div>
                    <span className={`text-sm transition-colors ${selectedCategory === cat ? 'font-semibold text-slate-800' : 'text-slate-600 group-hover:text-primary'}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6 border-b border-slate-100 pb-6">
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="font-bold text-slate-800 text-sm">Size</h3>
                <ChevronRight className="w-4 h-4 text-slate-400 -rotate-90" />
              </div>
              <div className="flex flex-col gap-3">
                {['Small', 'Medium', 'Large', 'Extra Large', 'All Sizes'].map(size => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" 
                      checked={selectedSizes.includes(size)}
                      onChange={() => toggleFilter(setSelectedSizes, size)}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="mb-6 border-b border-slate-100 pb-6">
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="font-bold text-slate-800 text-sm">Material</h3>
                <ChevronRight className="w-4 h-4 text-slate-400 -rotate-90" />
              </div>
              <div className="flex flex-col gap-3">
                {['Kraft Paper', 'Corrugated', 'Plastic', 'Aluminium', 'Others'].map(mat => (
                  <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" 
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleFilter(setSelectedMaterials, mat)}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pack Quantity Filter */}
            <div className="mb-6 border-b border-slate-100 pb-6">
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="font-bold text-slate-800 text-sm">Pack Quantity</h3>
                <ChevronRight className="w-4 h-4 text-slate-400 -rotate-90" />
              </div>
              <div className="flex flex-col gap-3">
                {['10 - 50', '51 - 100', '101 - 500', '501 & above'].map(qty => (
                  <label key={qty} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" 
                      checked={selectedPackQty.includes(qty)}
                      onChange={() => toggleFilter(setSelectedPackQty, qty)}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{qty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="font-bold text-slate-800 text-sm">Price Range</h3>
                <ChevronRight className="w-4 h-4 text-slate-400 -rotate-90" />
              </div>
              <div className="px-1">
                <div className="h-1.5 w-full bg-slate-200 rounded-full relative mb-3">
                  <div className="absolute left-[0%] right-[30%] h-full bg-primary rounded-full"></div>
                  <div className="absolute left-[0%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-grab"></div>
                  <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-grab"></div>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-600">
                  <span>₹0</span>
                  <span>₹50,000+</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-sm text-slate-600 font-medium">
              Showing {filteredProducts.length > 0 ? '1' : '0'}-{Math.min(24, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <select 
                  className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none border-none bg-transparent text-sm font-bold text-slate-800 focus:ring-0 cursor-pointer pr-8 py-1 appearance-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Popularity">Popularity</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
                <ChevronRight className="w-4 h-4 text-slate-400 rotate-90 -ml-6 pointer-events-none" />
              </div>

              <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1 bg-white">
                <button className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-1.5 bg-slate-100 rounded text-slate-800"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></button>
                <button className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-1.5 text-slate-400 hover:text-slate-800"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></button>
              </div>

              {/* Top Pagination */}
              <div className="hidden md:flex items-center gap-1">
                <button onClick={() => setCurrentPage(1)} className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${currentPage === 1 ? 'bg-primary text-white' : 'hover:bg-slate-100 text-slate-600'}`}>1</button>
                <button onClick={() => setCurrentPage(2)} className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${currentPage === 2 ? 'bg-primary text-white' : 'hover:bg-slate-100 text-slate-600'}`}>2</button>
                <button onClick={() => setCurrentPage(3)} className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${currentPage === 3 ? 'bg-primary text-white' : 'hover:bg-slate-100 text-slate-600'}`}>3</button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">...</span>
                <button onClick={() => setCurrentPage(11)} className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${currentPage === 11 ? 'bg-primary text-white' : 'hover:bg-slate-100 text-slate-600'}`}>11</button>
                <button onClick={() => setCurrentPage(prev => Math.min(11, prev + 1))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/5 transition-all group flex flex-col overflow-hidden">
                <div 
                  className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] relative aspect-[4/3] bg-white cursor-pointer p-6 flex items-center justify-center border-b border-slate-50"
                  onClick={() => navigate(`/products/saathpack/product/${product.id}`)}
                >
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                  ) : null}
                  
                  {product.isBestSeller && (
                    <div className="absolute top-3 left-3 bg-[#249942] text-white text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                      BEST SELLER
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-[#FF9800] text-white text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                      NEW
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 
                    className="font-bold text-slate-900 text-sm mb-1 cursor-pointer hover:text-primary transition-colors leading-tight"
                    onClick={() => navigate(`/products/saathpack/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="text-xs text-slate-500 mb-4">
                    <div>{product.material} • {product.size}</div>
                    <div className="mt-0.5">Pack of {product.packSize}</div>
                  </div>

                  <div className="mt-auto">
                    <div className="text-xl font-black text-slate-900 mb-3">
                      ₹{product.price}
                    </div>
                    
                    <div className="text-[11px] text-[#249942] font-semibold mb-4 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" /> Delivery in {product.delivery}
                    </div>
                    
                    {getCartQuantity(product.id) > 0 ? (
                      <div className="w-full py-2.5 rounded-xl flex items-center justify-between px-4 font-bold text-sm bg-primary text-white shadow-lg shadow-primary/30">
                        <button onClick={() => handleAddToCart({ ...product, name: `${product.name} (Pack of ${product.packSize})` }, -1)} className="text-xl w-6 hover:scale-110 active:scale-95 transition-transform">-</button>
                        <span>{getCartQuantity(product.id)}</span>
                        <button onClick={() => handleAddToCart({ ...product, name: `${product.name} (Pack of ${product.packSize})` }, 1)} className="text-xl w-6 hover:scale-110 active:scale-95 transition-transform">+</button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAdd(product.id, product)}
                        className={`w-full font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                          addedItems[product.id] 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-white border border-primary text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {addedItems[product.id] ? (
                          <><CheckCircle2 className="w-4 h-4" /> Added to Cart</>
                        ) : (
                          <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button onClick={() => setCurrentPage(1)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm shadow-sm transition-colors ${currentPage === 1 ? 'bg-primary text-white' : 'hover:bg-slate-200 text-slate-600 bg-white border border-slate-100'}`}>1</button>
            <button onClick={() => setCurrentPage(2)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm shadow-sm transition-colors ${currentPage === 2 ? 'bg-primary text-white' : 'hover:bg-slate-200 text-slate-600 bg-white border border-slate-100'}`}>2</button>
            <button onClick={() => setCurrentPage(3)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm shadow-sm transition-colors ${currentPage === 3 ? 'bg-primary text-white' : 'hover:bg-slate-200 text-slate-600 bg-white border border-slate-100'}`}>3</button>
            <span className="w-10 h-10 flex items-center justify-center text-slate-400 font-medium">...</span>
            <button onClick={() => setCurrentPage(11)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm shadow-sm transition-colors ${currentPage === 11 ? 'bg-primary text-white' : 'hover:bg-slate-200 text-slate-600 bg-white border border-slate-100'}`}>11</button>
            <button onClick={() => setCurrentPage(prev => Math.min(11, prev + 1))} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Bottom Login Banner */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 border-t border-slate-200 mt-8">
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">SaathPack is a business-only service.</h3>
              <p className="text-slate-600 text-sm">Only registered SaathApp businesses, sellers, vendors, partners and franchisees can place orders.</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/seller/login')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold whitespace-nowrap hover:bg-primary/90 transition-colors shadow-sm"
          >
            Login to Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
