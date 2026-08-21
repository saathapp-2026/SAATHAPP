import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getStoredSellerAuth, isSellerSessionValid } from '../../services/sellerAuthService';
import { ShoppingBag, ShoppingCart, Package, Box, MapPin, Truck, CheckCircle2, ChevronRight, AlertCircle, LogIn, UserPlus } from 'lucide-react';
import { saathPackProducts } from '../../data/saathPackProducts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import paperBagsImg from '../../assets/saathpack-paper-bags.png';
import deliveryBagsImg from '../../assets/saathpack-delivery-bags.png';
import pouchesImg from '../../assets/saathpack-pouches.png';
import corrugatedBoxesImg from '../../assets/saathpack-corrugated-boxes.png';
import cartonBoxesImg from '../../assets/saathpack-carton-boxes.png';
import foilWrapsImg from '../../assets/saathpack-foil-wraps.png';
import tapesLabelsImg from '../../assets/saathpack-tapes-labels.png';
import otherSuppliesImg from '../../assets/saathpack-other-supplies.png';

export default function SaathPackLandingPage({
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
  const [authStatus, setAuthStatus] = useState('checking'); // 'checking', 'unauthenticated', 'unauthorized', 'authorized'

  useEffect(() => {
    // 1. Check Seller Session First
    const sellerSession = getStoredSellerAuth();
    if (sellerSession && isSellerSessionValid(sellerSession)) {
      setAuthStatus('authorized');
      return;
    }

    // 2. Check Customer Session
    const customerSession = typeof window !== 'undefined' ? window.sessionStorage.getItem('saathapp-auth-session') : null;
    if (customerSession) {
      // They are logged in as customer, but not as a seller (since seller check failed above)
      setAuthStatus('unauthorized');
    } else {
      setAuthStatus('unauthenticated');
    }
  }, []);

  if (authStatus === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Guard: Not logged in at all
  if (authStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
          <Package className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">SaathPack Access</h2>
          <p className="text-slate-600 mb-6">
            SaathPack is exclusively available for registered SaathApp businesses, sellers, vendors, partners and franchisees.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/seller/login')}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <LogIn className="w-5 h-5" /> Login
            </button>
            <button 
              onClick={() => navigate('/seller/register')}
              className="w-full bg-slate-100 text-slate-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
            >
              <UserPlus className="w-5 h-5" /> Register as Business
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Guard: Logged in as normal customer, not a seller
  if (authStatus === 'unauthorized') {
    return (
      <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Business Account Required</h2>
          <p className="text-slate-600 mb-6">
            SaathPack is available only to registered SaathApp sellers, vendors, suppliers, partners and franchisees. No ordering capability for standard accounts.
          </p>
          <button 
            onClick={() => navigate('/seller/login')}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Switch to Business Account
          </button>
        </div>
      </div>
    );
  }

  // Fully Authorized View
  const categories = [
    { name: 'Paper Bags', desc: 'All sizes', img: paperBagsImg },
    { name: 'Delivery Bags', desc: 'All types', img: deliveryBagsImg },
    { name: 'Pouches', desc: 'Kraft, Standup, Ziplock & more', img: pouchesImg },
    { name: 'Corrugated Boxes', desc: 'All sizes', img: corrugatedBoxesImg },
    { name: 'Carton Boxes', desc: 'All sizes', img: cartonBoxesImg },
    { name: 'Foil & Wraps', desc: 'Foil, Butter Paper, Cling Film & more', img: foilWrapsImg },
    { name: 'Tapes & Labels', desc: 'Tapes, Labels, Stickers & more', img: tapesLabelsImg },
    { name: 'Other Supplies', desc: 'Bubble Wrap, Strapping & more', img: otherSuppliesImg },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-20">
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
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-green-700 text-sm font-bold mb-6 bg-green-100/50 w-fit px-3 py-1.5 rounded-full border border-green-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Exclusively for Businesses
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              Saath<span className="text-primary">Pack</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              Packaging Supplies for Your Business
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mb-10 leading-relaxed">
              High quality packaging materials at better prices. Exclusively for SaathApp businesses, sellers, vendors, partners and franchisees.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-3 shadow-sm border border-slate-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Best Quality</h3>
                <p className="text-slate-500 text-xs">Premium materials you can trust</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-3 shadow-sm border border-slate-100">
                  <span className="font-bold text-xl">₹</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Better Prices</h3>
                <p className="text-slate-500 text-xs">Market rate se kam, business ke liye best</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-3 shadow-sm border border-slate-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Bulk Supply</h3>
                <p className="text-slate-500 text-xs">Bulk procurement, better savings</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-3 shadow-sm border border-slate-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Trusted Supply</h3>
                <p className="text-slate-500 text-xs">Quality check ke baad safe delivery</p>
              </div>
            </div>

            {/* Exclusive Access Alert */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200/60 max-w-xl">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-green-900 text-sm mb-1">Exclusive Access</h4>
                  <p className="text-sm text-green-800">
                    SaathPack is only available for registered SaathApp businesses, sellers, vendors, partners and franchisees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image & Cards */}
          <div className="flex-1 relative flex justify-center items-center">
            {/* Using a placeholder for the actual composition image in the design */}
            <img 
              src="https://placehold.co/600x500/e2d1c3/3a291f?text=SaathPack+Products" 
              alt="SaathPack Products" 
              className="w-full max-w-lg object-contain mix-blend-multiply" 
            />
            
            {/* Floating Cards (Simulated) */}
            <div className="absolute top-4 right-0 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 max-w-[200px]">
              <div className="flex gap-3 mb-1">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <h4 className="font-bold text-slate-900 text-sm">Delivery Timeline</h4>
              </div>
              <p className="text-xs text-slate-600 pl-8">All orders will be delivered within <span className="font-bold text-primary">5 to 10 working days.</span></p>
            </div>
            
            <div className="absolute bottom-12 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 max-w-[200px]">
              <div className="flex gap-3 mb-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                <h4 className="font-bold text-slate-900 text-sm">Quality Assured</h4>
              </div>
              <p className="text-xs text-slate-600 pl-8">Every product is quality checked before dispatch.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex items-center gap-4 md:px-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">For Businesses Only</h4>
                <p className="text-xs text-slate-500">Only for SaathApp registered business accounts</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:px-4 pt-4 md:pt-0">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Market se Kam Price</h4>
                <p className="text-xs text-slate-500">Bulk buying power se best possible rates</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:px-4 pt-4 md:pt-0">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">5 - 10 Days Delivery</h4>
                <p className="text-xs text-slate-500">Planned delivery within 5 to 10 working days</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:px-4 pt-4 md:pt-0">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-primary shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Dedicated Support</h4>
                <p className="text-xs text-slate-500">Priority support for business accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-black text-slate-900">Shop by Category</h2>
            <button 
              onClick={() => navigate('/products/saathpack')}
              className="text-primary font-bold hover:underline"
            >
              View All Categories
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative">
            {categories.map((cat) => (
              <div 
                key={cat.name} 
                onClick={() => navigate(`/saathpack/products?category=${encodeURIComponent(cat.name)}`)}
                className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center text-center cursor-pointer hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-full aspect-square mb-4 p-2 overflow-hidden rounded-lg">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full group-hover:scale-105 transition-transform rounded-lg" 
                    style={{ width: '100%', height: '100%', objectFit: (typeof cat.img === 'string' && cat.img.startsWith('http')) ? 'contain' : 'cover' }} 
                  />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4 h-8 flex items-center justify-center">{cat.desc}</p>
                <button className="w-full py-1.5 border border-primary text-primary text-xs font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors mt-auto">
                  Shop Now
                </button>
              </div>
            ))}
            
            {/* Scroll arrow like in design */}
            <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full items-center justify-center shadow-md cursor-pointer hover:bg-slate-50 z-10">
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* How SaathPack Works */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-16">How SaathPack Works</h2>
          
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-green-200 border-t border-dashed border-green-300"></div>

            <div className="flex-1 text-center relative z-10 px-4 mb-8 md:mb-0">
              <div className="w-16 h-16 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">1. Select Products</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">Choose the packaging materials you need for your business.</p>
            </div>
            
            <div className="flex-1 text-center relative z-10 px-4 mb-8 md:mb-0">
              <div className="w-16 h-16 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">2. Place Order</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">Add to cart and place your order with required quantity.</p>
            </div>
            
            <div className="flex-1 text-center relative z-10 px-4 mb-8 md:mb-0">
              <div className="w-16 h-16 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
                <Box className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">3. We Prepare</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">Your order is planned, procured and quality checked.</p>
            </div>
            
            <div className="flex-1 text-center relative z-10 px-4 mb-8 md:mb-0">
              <div className="w-16 h-16 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">4. Delivery in 5 - 10 Days</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">Your packaging supplies will be delivered to your business address.</p>
            </div>
            
            <div className="flex-1 text-center relative z-10 px-4">
              <div className="w-16 h-16 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">5. Use & Grow</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">Use quality packaging and grow your business with SaathApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Login Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">SaathPack is a business-only service.</h3>
              <p className="text-slate-600 text-sm">Only registered SaathApp sellers, vendors, partners and franchisees can place orders.</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/products/saathpack')}
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
