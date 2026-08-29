import React, { useState } from 'react';
import { useParams, useNavigate, useLocation as useReactLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OfficialBadge from '../../components/saathapp-product/OfficialBadge';
import { products, categories } from '../../data/products';
import { mockSaathAppProducts, saathAppCategories } from '../../data/saathAppProducts';
import { ChevronRight, Home, Star, Heart, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

import { trackEvent } from '../../utils/analytics';
import ProductGrid from '../../components/saathapp-product/ProductGrid';
import { useLocationContext } from '../../context/LocationContext';

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

  // Look in both normal products and mockSaathAppProducts
  const product = products.find(p => p.id === slug || p.slug === slug)
    || mockSaathAppProducts.find(p => p.id === slug || p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { pincode } = useLocationContext();
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  React.useEffect(() => {
    if (product) {
      document.title = product.category === 'spiritual-puja'
        ? `${product.name} | Spiritual & Puja Items Online | SaathApp`
        : `${product.name} | SaathApp Official`;

      trackEvent('product_view', {
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        ...(product.groceryTier && { groceryTier: product.groceryTier }),
        ...(product.electronicsType && { electronicsType: product.electronicsType }),
        ...(product.spiritualType && { spiritualType: product.spiritualType })
      });
      // Track recently viewed
      const stored = window.localStorage.getItem('saathapp_recently_viewed');
      let recent = stored ? JSON.parse(stored) : [];
      recent = recent.filter(id => id !== product.id);
      recent.unshift(product.id);
      recent = recent.slice(0, 8); // keep last 8
      window.localStorage.setItem('saathapp_recently_viewed', JSON.stringify(recent));
      
      const allProducts = [...products, ...mockSaathAppProducts];
      const hydratedRecent = recent.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
      setRecentlyViewed(hydratedRecent);
    }
  }, [product]);

  // Derived Pricing
  const sellingPrice = 0;
  const mrp = 0;
  const discountPercent = 0;

  // Recommended products (Frequently Bought Together)
  const recommendedProducts = React.useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/products/saathapp')} className="text-primary hover:underline">Return to Shop</button>
      </div>
    );
  }

  // Gallery Images Array (uses product images or fallback gallery)
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.image, product.image, product.image].filter(Boolean);

  const currentMainImage = galleryImages[selectedImageIndex] || product.image;

  // Mock variants for demo purposes based on category
  const variants = product.category === 't-shirts-apparel' ? {
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy']
  } : product.category === 'bottles' ? {
    capacity: ['500ml', '750ml', '1L']
  } : null;

  // Delivery ETA Logic
  const fastDeliveryPincodes = ['110001', '400001', '560001', '600001', '700001'];
  const getETA = () => {
    if (product?.availabilityMode === 'LIMITED' && product?.availableQuantity <= 0) return 'Sold Out';
    if (fastDeliveryPincodes.includes(pincode)) {
      return 'Blink Delivery in 10 mins';
    }
    return 'Standard 1-Day Delivery';
  };
  const deliveryETA = getETA();

  let bestSeller = null;
  if (product?.sellers && product.sellers.length > 0) {
    const availableSellers = product.sellers.filter(s => s.stock >= quantity);
    if (availableSellers.length > 0) {
      bestSeller = { ...availableSellers[0], distance: 1.2, eta: deliveryETA };
    }
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
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1"><Home size={12} /> Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/products')} className="hover:text-primary">Products</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate(`/products/${product.category}`)} className="hover:text-primary capitalize">{categories.find(c => c.id === product.category)?.name || product.category.replace('-', ' ')}</button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-300 line-clamp-1">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center p-8 relative">
              <button className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full hover:text-rose-500 transition-colors shadow-sm">
                <Heart size={20} />
              </button>
              {currentMainImage ? (
                {/* Image removed as requested */}
              ) : (
                null
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {[0, 1, 2, 3].map((idx) => {
                const imgUrl = galleryImages[idx] || product.image;
                const isSelected = selectedImageIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 shrink-0 bg-white dark:bg-slate-900 border-2 rounded-xl flex items-center justify-center cursor-pointer transition-all ${isSelected ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                  >
                    {imgUrl ? (
                      {/* Thumbnail Image removed as requested */}
                    ) : (
                      null
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-4">
              {product.productTier === 'PREMIUM' ? (
                <div className="mb-3 inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">
                  <Star size={12} className="fill-white" /> Premium Limited Edition
                </div>
              ) : product.brand === 'SaathApp Official' ? (
                <div className="mb-3 inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">
                  ✓ SaathApp Official
                </div>
              ) : (
                <div className="mb-3 inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide border border-slate-200 dark:border-slate-700">
                  Verified Seller
                </div>
              )}
              <h1 className="text-3xl lg:text-4xl font-black mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={16} className="fill-amber-500" />
                  {product.rating}
                </div>
                <div className="text-primary font-semibold underline cursor-pointer">{product.reviews} Reviews</div>
                {product.availabilityMode === 'LIMITED' ? (
                  <div className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                    <ShieldCheck size={14} /> {product.availableQuantity <= 0 ? 'Sold Out' : `Limited Stock: ${product.availableQuantity} left`}
                  </div>
                ) : (
                  <div className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                    <ShieldCheck size={14} /> {(product.stock !== undefined && product.stock <= 0) ? 'Out of Stock' : 'In Stock'}
                  </div>
                )}
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-black">₹{sellingPrice}</span>
                <span className="text-lg text-slate-400 line-through font-semibold">₹{mrp}</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 mb-1">
                  {discountPercent}% OFF
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Inclusive of all taxes</p>

              {product.promotion?.active && (
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                      {product.promotion.type.replace(/_/g, ' ')}
                    </span>
                    <span className="font-bold text-rose-700 dark:text-rose-400">
                      {product.promotion.discount} OFF
                    </span>
                  </div>
                  <p className="text-sm text-rose-600 dark:text-rose-300">
                    Special promotion applied to this product.
                  </p>
                </div>
              )}

              {/* Vertical Specific Fields */}
              <div className="flex gap-4">
                {product.category === 'grocery' && product.groceryTier && (
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 inline-flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Grocery Tier</span>
                    <span className="text-sm font-semibold">{product.groceryTier === 'Premium' ? 'Premium Grocery' : 'Normal Grocery'}</span>
                  </div>
                )}
                {product.category === 'electronics' && product.electronicsType && (
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 inline-flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Electronics Type</span>
                    <span className="text-sm font-semibold">{product.electronicsType}</span>
                  </div>
                )}
                {product.category === 'spiritual-puja' && product.spiritualType && (
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 inline-flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Spiritual Type</span>
                    <span className="text-sm font-semibold">{product.spiritualType}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-6" />

            {/* Variants Selection */}
            {variants && (
              <div className="space-y-6 mb-8">
                {variants.sizes && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-sm uppercase tracking-wide">Select Size</h3>
                      <button className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none text-primary text-xs font-semibold hover:underline">Size Chart</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {variants.sizes.map(size => (
                        <button key={size} 
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary'}`}>
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
                        <button key={color} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex flex-col items-center gap-2 group">
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
                        <button key={cap} className="duration-200 active:scale-[0.98] px-4 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold hover:border-primary focus:border-primary focus:bg-primary/5 transition-all">
                          {cap}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-2 sm:gap-4 mb-8">
              <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden h-14 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
                  className="w-10 sm:w-12 h-full flex items-center justify-center font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  -
                </button>
                <div className="w-10 sm:w-12 h-full flex items-center justify-center font-black bg-slate-50 dark:bg-slate-800/50">
                  {quantity}
                </div>
                <button
                  onClick={() => {
                    const max = product.availabilityMode === 'LIMITED' ? product.availableQuantity : product.stock;
                    setQuantity(max !== undefined ? Math.min(max, quantity + 1) : quantity + 1);
                  }}
                  disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
                  className="w-10 sm:w-12 h-full flex items-center justify-center font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(product, quantity)}
                disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
                className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-black text-sm sm:text-lg transition-all transform active:scale-[0.98] ${
                  (product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0))
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <ShoppingCart size={20} className="hidden sm:block" />
                Add to Cart
              </button>
              <button 
                onClick={() => {
                  handleAddToCart(product, quantity);
                  navigate('/checkout');
                }}
                disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
                className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-black text-sm sm:text-lg transition-all transform active:scale-[0.98] ${
                  (product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0))
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
                  : 'bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-glow-primary'
                }`}
              >
                {(product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)) ? 'Sold Out' : 'Buy Now'}
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-8">
              <div className="flex flex-col gap-4">
                {bestSeller ? (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                        Delivery available
                        <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider">✓ In Stock</span>
                      </h4>
                      <p className="text-xs text-slate-500 mb-1">
                        From <span className="font-semibold text-slate-700 dark:text-slate-300">{bestSeller.name}</span> ({bestSeller.distance.toFixed(1)} km away)
                      </p>
                      <p className="text-sm font-black text-green-600 dark:text-green-400">
                        Arrives in {bestSeller.eta}
                      </p>
                    </div>
                  </div>
                ) : product?.sellers ? (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">Out of Local Stock</h4>
                      <p className="text-xs text-slate-500 mb-1">No nearby sellers have requested quantity.</p>
                      <p className="text-sm font-black text-slate-700 dark:text-slate-300">
                        Delivery in 1–2 days
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">Fast Delivery</h4>
                      <p className="text-xs text-slate-500">Delivery in 2-3 business days to your location.</p>
                    </div>
                  </div>
                )}
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

            {/* Product Details Tabs */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
              <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-3 text-sm transition-colors cursor-pointer ${activeTab === 'description'
                      ? 'font-bold text-primary border-b-2 border-primary'
                      : 'font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('specifications')}
                  className={`flex-1 py-3 text-sm transition-colors cursor-pointer ${activeTab === 'specifications'
                      ? 'font-bold text-primary border-b-2 border-primary'
                      : 'font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                >
                  Specifications
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' ? (
                  <>
                    <h4 className="font-bold mb-3">Product Description</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {product.description || `Premium quality ${product.name.toLowerCase()} designed for maximum comfort and durability. This is an official SaathApp merchandise product, guaranteed to meet our high quality standards. Perfect for daily use or as a thoughtful gift.`}
                    </p>
                    <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li>Official SaathApp branding</li>
                      <li>Premium quality materials</li>
                      <li>Durable and long-lasting</li>
                      <li>Includes authenticity tag</li>
                    </ul>

                    {product.productTier === 'PREMIUM' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl mt-6">
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-600/70 dark:text-amber-500/70">Materials</span>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{product.materials || 'Premium Grade'}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-600/70 dark:text-amber-500/70">Craftsmanship</span>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{product.craftsmanship || 'Expertly Crafted'}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-600/70 dark:text-amber-500/70">Packaging</span>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{product.packaging || 'Signature Box'}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-600/70 dark:text-amber-500/70">Warranty</span>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{product.warranty || 'Limited Warranty'}</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h4 className="font-bold mb-3">Technical Specifications</h4>
                    <div className="space-y-2.5 text-sm mb-6">
                      <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="w-1/3 text-slate-500 font-medium">Brand</span>
                        <span className="w-2/3 font-bold text-slate-800 dark:text-slate-200">{product.brand || 'SaathApp Official'}</span>
                      </div>
                      <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="w-1/3 text-slate-500 font-medium">Category</span>
                        <span className="w-2/3 font-bold text-slate-800 dark:text-slate-200 capitalize">{product.category ? product.category.replace('-', ' ') : 'General'}</span>
                      </div>
                      {product.subCategory && (
                        <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
                          <span className="w-1/3 text-slate-500 font-medium">Subcategory</span>
                          <span className="w-2/3 font-bold text-slate-800 dark:text-slate-200">{product.subCategory}</span>
                        </div>
                      )}
                      <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="w-1/3 text-slate-500 font-medium">Item SKU / ID</span>
                        <span className="w-2/3 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{product.id}</span>
                      </div>
                      <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="w-1/3 text-slate-500 font-medium">Availability</span>
                        <span className="w-2/3 font-bold text-green-600 dark:text-green-400">In Stock ({product.stock || 50} units)</span>
                      </div>
                      <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="w-1/3 text-slate-500 font-medium">Seller Type</span>
                        <span className="w-2/3 font-bold text-slate-800 dark:text-slate-200">{product.sellerType || 'Verified Partner'}</span>
                      </div>
                      <div className="flex pb-1">
                        <span className="w-1/3 text-slate-500 font-medium">Delivery</span>
                        <span className="w-2/3 font-bold text-slate-800 dark:text-slate-200">{product.deliveryType || 'Standard Fast Delivery'}</span>
                      </div>
                    </div>

                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-4">Additional Details</h3>
                        <ul className="space-y-4">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <li key={key} className="flex gap-4">
                              <span className="w-1/3 text-slate-500 text-sm font-medium">{key}</span>
                              <span className="w-2/3 text-slate-800 dark:text-slate-200 text-sm">{value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Cross Selling UI */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Star className="text-amber-500 fill-amber-500" size={24} /> 
              Frequently Bought Together
            </h2>
            <ProductGrid products={recommendedProducts} onAddToCart={handleAddToCart} />
          </div>
        )}

        {recentlyViewed.length > 1 && (
          <div className="mt-12 mb-12">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
              Recently Viewed
            </h2>
            <ProductGrid products={recentlyViewed.filter(p => p.id !== product.id)} onAddToCart={handleAddToCart} />
          </div>
        )}
      </main>

      {/* Sticky Mobile Add to Cart & Buy Now */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-3 pb-safe flex items-center gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => handleAddToCart(product, quantity)}
          disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
          className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-black transition-transform ${
            (product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0))
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 active:scale-[0.98]'
          }`}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
        <button 
          onClick={() => {
            handleAddToCart(product, quantity);
            navigate('/checkout');
          }}
          disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
          className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-black shadow-glow-primary active:scale-[0.98] transition-transform ${
            (product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0))
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
              : 'bg-gradient-primary text-white hover:bg-gradient-primary/90'
          }`}
        >
          {(product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)) ? 'Sold Out' : 'Buy Now'}
        </button>
      </div>

      <Footer />
    </div>
  );
}
