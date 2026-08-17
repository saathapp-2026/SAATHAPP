import React, { useState } from 'react';
import { useParams, useNavigate, useLocation as useReactLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OfficialBadge from '../../components/saathapp-product/OfficialBadge';
import { products, categories } from '../../data/products';
import { ChevronRight, Home, Star, Heart, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetails({
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
  const routerLocation = useReactLocation();
  const pathParts = routerLocation.pathname.split('/');
  const slug = pathParts[pathParts.length - 1];
  const navigate = useNavigate();
  const product = products.find(p => p.id === slug || p.slug === slug);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  React.useEffect(() => {
    if (product) {
      document.title = `${product.name} | SaathApp Official`;
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/saathapp-products')} className="text-primary hover:underline">Return to Shop</button>
      </div>
    );
  }

  // Mock variants for demo purposes based on category
  const variants = product.category === 't-shirts-apparel' ? {
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy']
  } : product.category === 'bottles' ? {
    capacity: ['500ml', '750ml', '1L']
  } : null;

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
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1"><Home size={12} /> Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/products')} className="hover:text-primary">Products</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate(`/products/${product.category}`)} className="hover:text-primary capitalize">{categories.find(c => c.id === product.category)?.name || product.category.replace('-', ' ')}</button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-300 line-clamp-1">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center p-8 relative">
               <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full hover:text-rose-500 transition-colors shadow-sm">
                 <Heart size={20} />
               </button>
               {product.image ? (
                 <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
               ) : (
                 <span className="text-8xl">🛍️</span>
               )}
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className={`w-20 h-24 shrink-0 bg-white dark:bg-slate-900 border-2 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${idx === 1 ? 'border-primary' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}`}>
                  {product.image ? (
                     <img src={product.image} alt="Thumbnail" loading="lazy" className="w-full h-full object-contain p-2" />
                  ) : (
                     <span className="text-2xl">🛍️</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-4">
              <OfficialBadge className="mb-3" />
              <h1 className="text-3xl lg:text-4xl font-black mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={16} className="fill-amber-500" />
                  {product.rating}
                </div>
                <div className="text-primary font-semibold underline cursor-pointer">{product.reviews} Reviews</div>
                <div className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                  <ShieldCheck size={14} /> In Stock
                </div>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-black">₹{product.price}</span>
                <span className="text-lg text-slate-400 line-through font-semibold">₹{product.price + 200}</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 mb-1">Save ₹200 (25% Off)</span>
              </div>
              <p className="text-sm text-slate-500">Inclusive of all taxes</p>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-6" />

            {/* Variants Selection */}
            {variants && (
              <div className="space-y-6 mb-8">
                {variants.sizes && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-sm uppercase tracking-wide">Select Size</h3>
                      <button className="text-primary text-xs font-semibold hover:underline">Size Chart</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {variants.sizes.map(size => (
                        <button key={size} className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold hover:border-primary focus:border-primary focus:bg-primary/5 transition-all">
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {variants.colors && (
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-3">Select Color</h3>
                    <div className="flex flex-wrap gap-4">
                      {variants.colors.map(color => (
                        <button key={color} className="flex flex-col items-center gap-2 group">
                          <div className={`w-10 h-10 rounded-full border-2 border-slate-200 group-hover:border-primary transition-all flex items-center justify-center p-0.5`} style={{ backgroundColor: color.toLowerCase() === 'white' ? '#f8fafc' : color.toLowerCase() }}>
                            <div className="w-full h-full rounded-full bg-transparent border border-white/20"></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">{color}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {variants.capacity && (
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-3">Select Capacity</h3>
                    <div className="flex flex-wrap gap-3">
                      {variants.capacity.map(cap => (
                        <button key={cap} className="px-4 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold hover:border-primary focus:border-primary focus:bg-primary/5 transition-all">
                          {cap}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  -
                </button>
                <div className="w-12 h-full flex items-center justify-center font-black bg-slate-50 dark:bg-slate-800/50">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => handleAddToCart(product, quantity)}
                className="flex-1 h-14 bg-gradient-primary hover:bg-gradient-primary/90 text-white rounded-xl flex items-center justify-center gap-2 font-black text-lg shadow-glow-primary transition-all transform active:scale-[0.98]"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Fast Delivery</h4>
                    <p className="text-xs text-slate-500">Delivery in 2-3 business days to your location.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <RotateCcw size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">7 Days Return Policy</h4>
                    <p className="text-xs text-slate-500">Hassle free returns and exchanges.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs (Simple View) */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
              <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <button className="flex-1 py-3 text-sm font-bold text-primary border-b-2 border-primary">Description</button>
                <button className="flex-1 py-3 text-sm font-semibold text-slate-500 hover:text-slate-800">Specifications</button>
              </div>
              <div className="p-6">
                <h4 className="font-bold mb-3">Product Description</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Premium quality {product.name.toLowerCase()} designed for maximum comfort and durability. This is an official SaathApp merchandise product, guaranteed to meet our high quality standards. Perfect for daily use or as a thoughtful gift.
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>Official SaathApp branding</li>
                  <li>Premium materials used</li>
                  <li>Durable and long-lasting</li>
                  <li>Includes authenticity tag</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Sticky Mobile Add to Cart */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 pb-safe flex items-center gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex-1 flex flex-col">
          <span className="text-lg font-black leading-none mb-0.5">₹{product.price * quantity}</span>
          <span className="text-[10px] text-green-600 dark:text-green-400 font-bold uppercase tracking-wide">In Stock</span>
        </div>
        <button 
          onClick={() => handleAddToCart(product, quantity)}
          className="flex-[2] h-12 bg-gradient-primary text-white rounded-xl flex items-center justify-center gap-2 font-black shadow-glow-primary active:scale-[0.98] transition-transform"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>

      <Footer />
    </div>
  );
}
