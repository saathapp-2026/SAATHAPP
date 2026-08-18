import React, { useEffect, useState } from 'react';
import { useTheme } from "./context/ThemeContext";
import { useLocation, useNavigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import MobileBottomNav from "./components/customer/MobileBottomNav";
import { useCart } from './hooks/useCart';
import OrdersPage from './pages/Orders';
import OrderConfirmationPage from './pages/OrderConfirmation';
import WishlistPage from './pages/Wishlist';
import SettingsPage from './pages/Settings';
import EditProfilePage from './pages/EditProfile';
import WalletPage from './pages/Wallet';
import RewardsPage from './pages/Rewards';
import AddressPage from './pages/Address';
import NotificationsPage from './pages/Notifications';
import PaymentPage from './pages/Payment';
import HelpSupportPage from './pages/HelpSupport';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import TermsPage from './pages/Terms';
import AboutPage from './pages/About';
import ServiceWarrantyPage from './pages/ServiceWarranty';
import OurStoryPage from './pages/OurStory';
import DeliveryPartnerAgreementPage from './pages/DeliveryPartnerAgreement';
import { trackEvent } from './utils/analytics';
import TermsOfServicePage from './pages/TermsOfService';
import PrivacyPolicyPublicPage from './pages/PrivacyPolicyPublic';
import ServiceWarrantyPolicyPage from './pages/ServiceWarrantyPolicy';
import SellerPolicyPage from './pages/SellerPolicy';
import RefundCancellationPolicyPage from './pages/RefundCancellationPolicy';
import DeliveryAgentLandingPage from './pages/DeliveryAgentLanding';
import FaqPage from './pages/Faq';
import LocationPage from './pages/LocationPage';
import AddAddressPage from './pages/AddAddressPage';
import ServiceProfessionalPage from './pages/ServiceProfessional';
import FranchisePage from './pages/FranchisePage';
import CustomerPortalPage from './pages/customer/CustomerPortal';
import WorkerPortalPage from './pages/worker/WorkerPortal';
import ProfessionalLoginPage from './pages/professional/Login';
import ProfessionalRegisterPage from './pages/professional/Register';
import ProfessionalOnboardingFeePage from './pages/professional/OnboardingFee';
import ProfessionalPaymentSuccessPage from './pages/professional/PaymentSuccess';
import ProfessionalReviewPage from './pages/professional/Review';
import ProfessionalSubmittedPage from './pages/professional/Submitted';
import ProfessionalTermsPage from './pages/professional/TermsAndConditions';
import AdvertisementsPage from './pages/AdvertisementsPage';
import CreateAdvertisementPage from './pages/CreateAdvertisementPage';
import { ProfessionalOnboardingProvider } from './context/ProfessionalOnboardingContext';
import { products } from './data/products';
import { mockSaathAppProducts } from './data/saathAppProducts';
import WorkerLoginPage from './pages/worker/Login';
import WorkerRegisterPage from './pages/worker/Register';
import ProfessionalDashboardPage from './pages/professional/Dashboard';
import WorkerDashboardPage from './pages/worker/Dashboard';
import HelpCenterPage from './pages/HelpCenter/HelpCenterPage';
import VerifiedSellersPage from "./pages/trust/VerifiedSellers";
import SecureOnlinePaymentsPage from "./pages/trust/SecureOnlinePayments";
import PrivacyProtectedPage from "./pages/trust/PrivacyProtected";
import CustomerSupportPage from "./pages/trust/CustomerSupport";
import WholesalePortalPage from "./pages/wholesale/WholesalePortalPage";
import DeliveryPartnerPortalPage from "./pages/delivery/DeliveryPartnerPortalPage";
import SellerRoutes from './pages/seller/SellerRoutes';
import { getStoredUsers, registerUser, authenticateUser, getStoredAuthSession, saveAuthSession, clearAuthSession, isSessionValid, getStoredPartnerSession, clearPartnerSession } from './services/authService';
import SaathAppProductHome from './pages/saathapp-products/SaathAppProductHome';
import SaathAppTierListing from './pages/saathapp-products/SaathAppTierListing';
import ProductListing from './pages/saathapp-products/ProductListing';
import ServiceListing from './pages/saathapp-products/ServiceListing';
import ServiceDetails from './pages/saathapp-products/ServiceDetails';
import ServiceBookingFlow from './pages/saathapp-products/ServiceBookingFlow';
import ServiceBookingConfirmation from './pages/saathapp-products/ServiceBookingConfirmation';
import ProductDetails from './pages/saathapp-products/ProductDetails';
import BulkOrders from './pages/saathapp-products/BulkOrders';
import TopNav from './components/TopNav';
import SaathAppPlusPage from './pages/SaathAppPlusPage';
import MembershipDashboardPage from './pages/MembershipDashboardPage';
import GiftSetPage from './pages/GiftSetPage';
import AdminCategoryManagement from './pages/admin/AdminCategoryManagement';

function AppContent() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const initialAuthSession = typeof window !== 'undefined' ? getStoredAuthSession() : null;
  const { cartItems, totals, clearCart, handleAddToCart, getCartQuantity } = useCart();
  const cartCount = totals.itemCount;
  const cartTotal = totals.finalTotal;
  const [location, setLocation] = useState('Green Park, New Delhi');
  const [pincode, setPincode] = useState('110016');
  const [savedAddresses, setSavedAddresses] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('saathapp-addresses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedAddress, setSelectedAddress] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = window.localStorage.getItem('saathapp-selected-address');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { resolvedTheme, setTheme } = useTheme();
  const darkMode = resolvedTheme === "dark";
  const toggleDarkMode = () => setTheme(darkMode ? "light" : "dark");
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.sessionStorage.getItem('saathapp-splash-shown');
  });
  const [, setAuthView] = useState(initialAuthSession && isSessionValid(initialAuthSession) ? 'home' : 'login');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialAuthSession && isSessionValid(initialAuthSession)));
  const [user, setUser] = useState(initialAuthSession?.user ?? null);
  const [authReady, setAuthReady] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState(getStoredUsers());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [orders, setOrders] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('saathapp_customer_orders');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [latestOrder, setLatestOrder] = useState(null);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedSession = getStoredAuthSession();
    if (storedSession && isSessionValid(storedSession)) {
      setUser(storedSession.user);
      setIsAuthenticated(true);
    } else {
      clearAuthSession();
      setUser(null);
      setIsAuthenticated(false);
    }
    setAuthReady(true);
  }, [routerLocation.pathname]);

  useEffect(() => {
    if (!authReady) return;
    if (isAuthenticated && user) {
      saveAuthSession(user);
    } else {
      clearAuthSession();
    }
  }, [authReady, isAuthenticated, user]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [routerLocation.pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saathapp-addresses', JSON.stringify(savedAddresses));
    }
  }, [savedAddresses]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saathapp-selected-address', JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  const handleCheckoutProcess = (orderBreakdown, address, delivery, payment, checkoutCartItems) => {
    // 1. Generate Order Record (BEFORE inventory decrement)
    const newOrder = {
      orderId: `SAATH${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      customer: user ? user.name : 'Guest Customer',
      items: checkoutCartItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        groceryTier: item.groceryTier || null,
        electronicsType: item.electronicsType || null,
        spiritualType: item.spiritualType || null,
        seller: item.brand || 'SaathApp Official',
        image: item.image
      })),
      breakdown: orderBreakdown,
      deliveryAddress: address || location || "Connaught Place, Central Delhi",
      estimatedDelivery: delivery === 'express' ? 'Under 30 mins' : '1-2 Days',
      payment: { method: payment || "UPI", status: "SUCCESS" },
      status: "CONFIRMED"
    };

    // Save to local state & storage
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saathapp_customer_orders', JSON.stringify(updatedOrders));
    }

    setLatestOrder(newOrder);

    // 1.5 Fire Unified Analytics Events
    checkoutCartItems.forEach(item => {
      const payload = {
        productId: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        seller: item.brand || 'SaathApp Official',
        ...(item.groceryTier && { groceryTier: item.groceryTier }),
        ...(item.electronicsType && { electronicsType: item.electronicsType }),
        ...(item.spiritualType && { spiritualType: item.spiritualType })
      };
      trackEvent('checkout', payload);
      trackEvent('purchase', payload);
    });

    // 2. Deduct stock in memory
    checkoutCartItems.forEach(cartItem => {
      const prod = products.find(p => p.id === cartItem.id);
      if (prod && typeof prod.stock === 'number') {
        prod.stock = Math.max(0, prod.stock - cartItem.quantity);
      }
      const saathProd = mockSaathAppProducts.find(p => p.id === cartItem.id);
      if (saathProd && typeof saathProd.stock === 'number') {
        saathProd.stock = Math.max(0, saathProd.stock - cartItem.quantity);
      }
    });

    // 3. Deduct stock in Admin LocalStorage so it syncs back
    if (typeof window !== 'undefined') {
      try {
        const adminProductsJson = window.localStorage.getItem('saathapp_admin_products');
        if (adminProductsJson) {
          const adminProducts = JSON.parse(adminProductsJson);
          checkoutCartItems.forEach(cartItem => {
            const adminRow = adminProducts.find(row => row[6] && row[6].product === cartItem.name);
            if (adminRow) {
              const currentStock = parseInt(adminRow[6].stock || 0);
              const newStock = Math.max(0, currentStock - cartItem.quantity);
              adminRow[6].stock = String(newStock);
              adminRow[4] = String(newStock);
            }
          });
          window.localStorage.setItem('saathapp_admin_products', JSON.stringify(adminProducts));
        }

        // 4. Sync Order to Admin Orders Table
        const adminOrdersJson = window.localStorage.getItem('saathapp_admin_orders');
        let adminOrders = [];
        if (adminOrdersJson) {
           adminOrders = JSON.parse(adminOrdersJson);
        } else {
           adminOrders = [
             ["ORD-99120", "Ravi Kumar", "₹420", "Mysuru", "Today", "Delivered", {}],
             ["ORD-99121", "Aisha Fernandes", "₹1,280", "Mumbai", "Today", "Processing", {}]
           ]; // Initial mock from Admin config
        }
        
        // City parsing from address
        let city = "New Delhi";
        if (newOrder.deliveryAddress) {
          const parts = newOrder.deliveryAddress.split(',');
          if (parts.length > 1) {
            city = parts[parts.length - 1].trim();
          }
        }

        const adminOrderRow = [
          newOrder.orderId,
          newOrder.customer,
          `₹${newOrder.breakdown.finalTotal.toFixed(2)}`,
          city,
          "Today",
          "Processing",
          { items: newOrder.items, breakdown: newOrder.breakdown }
        ];
        adminOrders.unshift(adminOrderRow);
        window.localStorage.setItem('saathapp_admin_orders', JSON.stringify(adminOrders));

      } catch (e) {
        console.warn('Could not update admin sync', e);
      }
    }

    setIsCartOpen(false);
  };

  const handleGPSDetect = () => {
    setIsGpsLoading(true);
    setTimeout(() => {
      setLocation('Connaught Place, Central Delhi');
      setPincode('110001');
      setIsGpsLoading(false);
      setIsLocationModalOpen(false);
    }, 2000);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await response.json();
          const address = data?.address || {};
          const area = address.suburb || address.neighbourhood || address.village || address.city || 'Current location';
          const city = address.city || address.town || address.village || area;
          const state = address.state || 'State';
          const pincode = address.postcode || '000000';
          const label = `${area}, ${city}, ${state} - ${pincode}`;
          const nextAddress = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            title: 'Current Location',
            label,
            fullAddress: data?.display_name || label,
            area,
            city,
            state,
            pincode,
            phoneNumber: '',
            receiverName: '',
            addressType: 'Home',
            source: 'gps',
            createdAt: new Date().toISOString(),
          };
          setSavedAddresses((prev) => [nextAddress, ...prev]);
          setSelectedAddress(nextAddress);
          setLocation(label);
          setPincode(pincode);
          if (routerLocation.pathname === '/location/add') {
            navigate('/location');
          }
        } catch {
          alert('Unable to resolve the current location right now.');
        }
      },
      () => {
        alert('Location permission was denied. You can still add a location manually.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSaveAddress = (address) => {
    setSavedAddresses((prev) => [address, ...prev]);
    setSelectedAddress(address);
    setLocation(address.label);
    setPincode(address.pincode || '000000');
    navigate('/location');
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setLocation(address.label);
    setPincode(address.pincode || '000000');
    navigate('/');
  };

  const handleDeleteAddress = (addressId) => {
    setSavedAddresses((prev) => prev.filter((address) => address.id !== addressId));
    setSelectedAddress((prev) => (prev?.id === addressId ? null : prev));
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setIsVoiceModalOpen(false);
      setSearchQuery('AC Servicing');
      setSelectedCategory('repairs');
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  const handleImageSearch = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsImageModalOpen(false);
      setSearchQuery('Mangoes');
      setSelectedCategory('grocery');
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 2500);
  };



  const handleLogin = async ({ identifier, password, _mode }) => {
    const result = await authenticateUser(users, { identifier, password });
    if (!result.success) {
      if (result.reason === 'not_found') {
        setErrorMessage('Account not found. Please sign up to continue.');
        setAuthView('login');
      } else {
        setErrorMessage('Incorrect password. Please try again or use Forgot Password.');
      }
      return;
    }

    setUsers((prev) => prev.map((entry) => (entry.id === result.user.id ? { ...entry, lastLogin: new Date().toISOString() } : entry)));
    setUser(result.user);
    setIsAuthenticated(true);
    setAuthView('home');
    setActivePage('home');
    setErrorMessage('');
    
    if (routerLocation.pathname === '/customer/dashboard' || routerLocation.pathname === '/profile' || routerLocation.state?.from === '/customer/dashboard') {
      navigate('/customer/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleSignup = async (form) => {
    const result = await registerUser(users, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    setUsers(result.users);
    setUser(result.user);
    setIsAuthenticated(true);
    setAuthView('home');
    setActivePage('home');
    setErrorMessage('');
    
    if (routerLocation.pathname === '/customer/dashboard' || routerLocation.pathname === '/profile' || routerLocation.state?.from === '/customer/dashboard') {
      navigate('/customer/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setIsAuthenticated(false);
    setUser(null);
    setAuthView('login');
    setActivePage('home');
    setErrorMessage('You have been logged out.');
    navigate('/');
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => {
      setShowSplash(false);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('saathapp-splash-shown', 'true');
      }
    }} />;
  }

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-sans">
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold tracking-wider">LOADING SAATHAPP</p>
        </div>
      </div>
    );
  }

  // Legacy activePage overrides (priority)
  if (activePage === 'cart' || routerLocation.pathname === '/cart') {
    return (
      <CartPage 
        onCheckout={() => { setActivePage('checkout'); navigate('/checkout'); }}
        onBack={() => { setActivePage('home'); navigate('/'); }} 
      />
    );
  }

  if (activePage === 'checkout' || routerLocation.pathname === '/checkout') {
    return (
      <CheckoutPage 
        onBack={() => { setActivePage('cart'); navigate('/cart'); }} 
        onConfirmOrder={(data) => {
          handleCheckoutProcess(data.orderBreakdown, data.address, data.deliveryMethod, data.paymentMethod, cartItems);
          clearCart();
          setActivePage('order-confirmation');
          navigate('/order-confirmation');
        }} 
      />
    );
  }

  if (activePage === 'order-confirmation' || routerLocation.pathname === '/order-confirmation') {
    return (
      <OrderConfirmationPage 
        order={latestOrder} 
        onBack={() => { setActivePage('home'); navigate('/'); }} 
        onViewOrders={() => { setActivePage('orders'); navigate('/orders'); }} 
      />
    );
  }

  if (activePage === 'orders' || routerLocation.pathname === '/orders') {
    return <OrdersPage orders={orders} onBack={() => { setActivePage('home'); navigate('/'); }} />;
  }

  const trustRoutes = ['/verified-sellers', '/secure-online-payments', '/privacy-protected', '/customer-support'];
  const partnerRoutes = [
    '/service-professional', '/become-professional', '/professional', '/become-worker', '/customer',
    '/professional/login', '/professional/register', '/professional/onboarding-fee',
    '/professional/payment-success', '/professional/review', '/professional/submitted',
    '/professional/terms', '/worker/login', '/worker/register',
    '/professional/dashboard', '/worker/dashboard'
  ];
  const isSellerRoute = routerLocation.pathname.startsWith('/seller') && routerLocation.pathname !== '/seller-policy';
  const isPublicRoute = routerLocation.pathname === '/' ||
    routerLocation.pathname === '/about' ||
    routerLocation.pathname === '/service-warranty' ||
    routerLocation.pathname === '/our-story' ||
    routerLocation.pathname === '/faq' ||
    routerLocation.pathname === '/login' ||
    routerLocation.pathname === '/signup' ||
    routerLocation.pathname === '/help-support' ||
    routerLocation.pathname === '/seller-policy' ||
    routerLocation.pathname === '/privacy-policy' ||
    routerLocation.pathname === '/terms-of-service' ||
    routerLocation.pathname === '/refund-cancellation-policy' ||
    routerLocation.pathname === '/service-warranty-policy' ||
    routerLocation.pathname.startsWith('/wholesale') ||
    routerLocation.pathname === '/become-a-wholeseller' ||
    routerLocation.pathname === '/become-delivery-partner' ||
    routerLocation.pathname === '/franchise' ||
    routerLocation.pathname === '/advertise' ||
    routerLocation.pathname === '/advertise/create' ||
    routerLocation.pathname === '/plus' ||
    routerLocation.pathname === '/membership' ||
    routerLocation.pathname === '/account/membership' ||
    partnerRoutes.includes(routerLocation.pathname) ||
    trustRoutes.includes(routerLocation.pathname) ||
    isSellerRoute;

  if (routerLocation.pathname === '/seller-policy') {
    return <SellerPolicyPage />;
  }

  if (routerLocation.pathname === '/advertise') {
    return <AdvertisementsPage onBack={() => navigate('/')} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (routerLocation.pathname === '/advertise/create') {
    return <CreateAdvertisementPage onBack={() => navigate('/advertise')} user={user} />;
  }

  if (isSellerRoute) {
    return <SellerRoutes />;
  }

  if (routerLocation.pathname === '/membership') {
    navigate('/plus');
    return null;
  }

  if (routerLocation.pathname === '/plus' || routerLocation.pathname === '/plus/') {
    return (
      <SaathAppPlusPage
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/saathapp-products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
      />
    );
  }

  if (routerLocation.pathname === '/account/membership') {
    return (
      <MembershipDashboardPage
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/saathapp-products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  if (routerLocation.pathname === '/saathapp-products/bulk-orders') {
    return (
      <BulkOrders
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/saathapp-products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  if (routerLocation.pathname === '/products/gift-set' || routerLocation.pathname === '/products/gift-set/' || routerLocation.pathname === '/gift-set' || routerLocation.pathname === '/gift-set/') {
    return (
      <GiftSetPage
        cartCount={cartCount}
        location={location}
        onCartClick={() => setIsCartOpen(true)}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleAddToCart={handleAddToCart}
      />
    );
  }

  if (routerLocation.pathname === '/admin/categories' || routerLocation.pathname === '/admin/categories/') {
    return (
      <AdminCategoryManagement
        cartCount={cartCount}
        location={location}
        onCartClick={() => setIsCartOpen(true)}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  const isServiceListing = routerLocation.pathname === '/services' || routerLocation.pathname === '/services/';
  
  if (isServiceListing) {
    return (
      <ServiceListing
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/services');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }
  
  const isServiceBookingConfirmed = routerLocation.pathname === '/services/booking-confirmed';
  
  if (isServiceBookingConfirmed) {
    return (
      <ServiceBookingConfirmation
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  const isServiceBookingFlow = routerLocation.pathname.startsWith('/services/book/');
  
  if (isServiceBookingFlow) {
    return (
      <ServiceBookingFlow
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        savedAddresses={savedAddresses}
      />
    );
  }

  const isServiceDetails = routerLocation.pathname.startsWith('/services/') && !routerLocation.pathname.startsWith('/services/book');
  
  if (isServiceDetails) {
    return (
      <ServiceDetails
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/services');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  // 301 SEO & Alias Redirect for renamed legacy categories (e.g. Home & Kitchen -> Household Items)
  if (routerLocation.pathname.startsWith('/products/home-kitchen')) {
    const redirectPath = routerLocation.pathname.replace('/products/home-kitchen', '/products/household-items');
    navigate(redirectPath, { replace: true });
    return null;
  }

  const isOffers = routerLocation.pathname === '/offers';
  const isAllCategories = routerLocation.pathname === '/products' || routerLocation.pathname === '/products/';
  const isProductListing = (routerLocation.pathname.startsWith('/products/') && routerLocation.pathname !== '/products/saathapp' && routerLocation.pathname !== '/products/saathapp/' && !routerLocation.pathname.startsWith('/products/gift-set')) || isOffers || isAllCategories;

  if (isProductListing) {
    return (
      <ProductListing
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/products/search'); // updated search path
        }}
        searchQuery={searchQuery}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleAddToCart={handleAddToCart}
        isOffersPage={isOffers}
        isAllCategories={isAllCategories}
      />
    );
  }

  if (routerLocation.pathname === '/products/saathapp' || routerLocation.pathname === '/products/saathapp/' || routerLocation.pathname === '/saathapp-products' || routerLocation.pathname === '/saathapp-products/') {
    return (
      <SaathAppProductHome
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleAddToCart={handleAddToCart}
      />
    );
  }

  if (routerLocation.pathname.startsWith('/saathapp-products/normal') || routerLocation.pathname.startsWith('/saathapp-products/premium')) {
    return (
      <SaathAppTierListing
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleAddToCart={handleAddToCart}
      />
    );
  }

  if (routerLocation.pathname.startsWith('/product/')) {
    return (
      <ProductDetails
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/products/search');
        }}
        onLogin={() => { setAuthView('login'); navigate('/login'); }}
        onSignup={() => { setAuthView('signup'); navigate('/signup'); }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleAddToCart={handleAddToCart}
      />
    );
  }

  if (routerLocation.pathname === '/help-support') {
    return <HelpSupportPage onBack={() => navigate('/')} />;
  }

  if (routerLocation.pathname === '/about') {
    return <AboutPage onBack={() => navigate('/', { replace: true })} onLogout={handleLogout} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (routerLocation.pathname === '/service-warranty') {
    return <ServiceWarrantyPage onBack={() => navigate('/', { replace: true })} onLogout={handleLogout} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (routerLocation.pathname === '/our-story') {
    return <OurStoryPage onBack={() => navigate('/', { replace: true })} onLogout={handleLogout} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (routerLocation.pathname === '/faq') {
    return <FaqPage onBack={() => navigate('/')} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (routerLocation.pathname === '/delivery-partner-agreement') {
    return <DeliveryPartnerAgreementPage isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (routerLocation.pathname === '/franchise') {
    return (
      <FranchisePage
        cartCount={cartCount}
        onCartClick={() => setActivePage('cart')}
        location={location}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/');
          setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onLogin={() => {
          setAuthView('login');
          navigate('/login');
        }}
        onSignup={() => {
          setAuthView('signup');
          navigate('/signup');
        }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
        onImageSearchClick={() => setIsImageModalOpen(true)}
        onBack={() => navigate('/')}
      />
    );
  }

  if (
    routerLocation.pathname === '/service-professional'
    || routerLocation.pathname === '/become-professional'
    || routerLocation.pathname === '/professional'
  ) {
    return (
      <ServiceProfessionalPage
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        location={location}
        pincode={pincode}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        darkMode={darkMode}
        isCartOpen={isCartOpen}
        isVoiceModalOpen={isVoiceModalOpen}
        isImageModalOpen={isImageModalOpen}
        isLocationModalOpen={isLocationModalOpen}
        isGpsLoading={isGpsLoading}
        isListening={isListening}
        isUploading={isUploading}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={() => navigate('/profile')}
        onLogout={handleLogout}
        onCartPage={() => {
          setActivePage('cart');
          navigate('/');
        }}
        onOrdersPage={() => {
          setActivePage('orders');
          navigate('/');
        }}
        onWishlistPage={() => {
          setActivePage('wishlist');
          navigate('/');
        }}
        onSettingsPage={() => {
          setActivePage('settings');
          navigate('/');
        }}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/');
          setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
        onImageSearchClick={() => setIsImageModalOpen(true)}
        onDetectGPS={handleGPSDetect}
        onAddToCart={handleAddToCart}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          navigate('/');
          setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onLogout={handleLogout}
        onBack={() => navigate('/')}
      />
    );
  }

  if (routerLocation.pathname === '/customer') {
    return (
      <CustomerPortalPage
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        location={location}
        pincode={pincode}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        darkMode={darkMode}
        isCartOpen={isCartOpen}
        isVoiceModalOpen={isVoiceModalOpen}
        isImageModalOpen={isImageModalOpen}
        isLocationModalOpen={isLocationModalOpen}
        isGpsLoading={isGpsLoading}
        isListening={isListening}
        isUploading={isUploading}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/');
          setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onLogin={() => {
          setAuthView('login');
          navigate('/login');
        }}
        onSignup={() => {
          setAuthView('signup');
          navigate('/signup');
        }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={() => navigate('/profile')}
        onLogout={handleLogout}
        onCartPage={() => {
          setActivePage('cart');
          navigate('/');
        }}
        onOrdersPage={() => {
          setActivePage('orders');
          navigate('/');
        }}
        onWishlistPage={() => {
          setActivePage('wishlist');
          navigate('/');
        }}
        onSettingsPage={() => {
          setActivePage('settings');
          navigate('/');
        }}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
        onImageSearchClick={() => setIsImageModalOpen(true)}
        onDetectGPS={handleGPSDetect}
        onAddToCart={handleAddToCart}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          navigate('/');
          setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onBack={() => navigate('/')}
      />
    );
  }

  if (routerLocation.pathname === '/become-worker') {
    return (
      <WorkerPortalPage
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        location={location}
        pincode={pincode}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        darkMode={darkMode}
        isCartOpen={isCartOpen}
        isVoiceModalOpen={isVoiceModalOpen}
        isImageModalOpen={isImageModalOpen}
        isLocationModalOpen={isLocationModalOpen}
        isGpsLoading={isGpsLoading}
        isListening={isListening}
        isUploading={isUploading}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/');
          setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onLogin={() => {
          setAuthView('login');
          navigate('/login');
        }}
        onSignup={() => {
          setAuthView('signup');
          navigate('/signup');
        }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={() => navigate('/profile')}
        onLogout={handleLogout}
        onCartPage={() => {
          setActivePage('cart');
          navigate('/');
        }}
        onOrdersPage={() => {
          setActivePage('orders');
          navigate('/');
        }}
        onWishlistPage={() => {
          setActivePage('wishlist');
          navigate('/');
        }}
        onSettingsPage={() => {
          setActivePage('settings');
          navigate('/');
        }}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
        onImageSearchClick={() => setIsImageModalOpen(true)}
        onDetectGPS={handleGPSDetect}
        onAddToCart={handleAddToCart}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          navigate('/');
          setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onBack={() => navigate('/')}
      />
    );
  }

  if (routerLocation.pathname === '/professional/login') {
    return <ProfessionalLoginPage />;
  }

  const professionalOnboardingRoutes = [
    '/professional/register',
    '/professional/onboarding-fee',
    '/professional/payment-success',
    '/professional/review',
    '/professional/submitted',
    '/professional/terms',
  ];

  if (professionalOnboardingRoutes.includes(routerLocation.pathname)) {
    const pageMap = {
      '/professional/register': <ProfessionalRegisterPage />,
      '/professional/onboarding-fee': <ProfessionalOnboardingFeePage />,
      '/professional/payment-success': <ProfessionalPaymentSuccessPage />,
      '/professional/review': <ProfessionalReviewPage />,
      '/professional/submitted': <ProfessionalSubmittedPage />,
      '/professional/terms': <ProfessionalTermsPage />,
    };
    return (
      <ProfessionalOnboardingProvider>
        {pageMap[routerLocation.pathname]}
      </ProfessionalOnboardingProvider>
    );
  }

  if (routerLocation.pathname === '/worker/login') {
    return <WorkerLoginPage />;
  }

  if (routerLocation.pathname === '/worker/register') {
    return <WorkerRegisterPage />;
  }

  if (routerLocation.pathname === '/professional/dashboard') {
    const session = getStoredPartnerSession();
    if (!session || session.user.role !== 'professional') {
      return <ProfessionalLoginPage />;
    }
    return (
      <ProfessionalDashboardPage
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onLogout={() => {
          clearPartnerSession();
          navigate('/professional/login');
        }}
        onBack={() => navigate('/')}
      />
    );
  }

  if (routerLocation.pathname === '/worker/dashboard') {
    const session = getStoredPartnerSession();
    if (!session || session.user.role !== 'worker') {
      return <WorkerLoginPage />;
    }
    return (
      <WorkerDashboardPage
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onLogout={() => {
          clearPartnerSession();
          navigate('/worker/login');
        }}
        onBack={() => navigate('/')}
      />
    );
  }

  if (routerLocation.pathname === '/terms-of-service') {
    return <TermsOfServicePage />;
  }

  if (routerLocation.pathname === '/privacy-policy') {
    return <PrivacyPolicyPublicPage />;
  }

  if (routerLocation.pathname === '/service-warranty-policy') {
    return <ServiceWarrantyPolicyPage />;
  }

  if (routerLocation.pathname === '/seller-policy') {
    return <SellerPolicyPage />;
  }

  if (routerLocation.pathname === '/refund-cancellation-policy') {
    return <RefundCancellationPolicyPage />;
  }

  if (routerLocation.pathname.startsWith('/become-delivery-partner') || routerLocation.pathname.startsWith('/delivery')) {
    return (
      <DeliveryPartnerPortalPage
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onLogin={() => navigate('/login')}
        onSignup={() => navigate('/signup')}
        onProfile={() => navigate('/profile')}
        onLogout={handleLogout}
        onCartPage={() => {
          setActivePage('cart');
          navigate('/');
        }}
        onOrdersPage={() => {
          setActivePage('orders');
          navigate('/');
        }}
      />
    );
  }

  if (routerLocation.pathname === '/become-a-wholeseller') {
    navigate('/wholesale', { replace: true });
    return null;
  }

  if (routerLocation.pathname.startsWith('/wholesale')) {
    return (
      <WholesalePortalPage
        cartCount={cartCount}
        location={location}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onLogin={() => navigate('/login')}
        onSignup={() => navigate('/signup')}
        onProfile={() => navigate('/profile')}
        onLogout={handleLogout}
        onCartPage={() => {
          setActivePage('cart');
          navigate('/');
        }}
        onOrdersPage={() => {
          setActivePage('orders');
          navigate('/');
        }}
        onWishlistPage={() => {
          setActivePage('wishlist');
          navigate('/');
        }}
        onSettingsPage={() => {
          setActivePage('settings');
          navigate('/');
        }}
        onLogout={handleLogout}
        onSearch={(query) => {
          setSearchQuery(query);
          navigate('/');
        }}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
        onImageSearchClick={() => setIsImageModalOpen(true)}
      />
    );
  }

  if (routerLocation.pathname === '/verified-sellers') {
    return <VerifiedSellersPage />;
  }

  if (routerLocation.pathname === '/secure-online-payments') {
    return <SecureOnlinePaymentsPage />;
  }

  if (routerLocation.pathname === '/privacy-protected') {
    return <PrivacyProtectedPage />;
  }

  if (routerLocation.pathname === '/customer-support') {
    return <CustomerSupportPage />;
  }

  if (routerLocation.pathname === '/location') {
    return (
      <LocationPage
        savedAddresses={savedAddresses}
        selectedAddress={selectedAddress}
        onBack={() => navigate('/')}
        onAddAddress={() => navigate('/location/add')}
        onSelectAddress={handleSelectAddress}
        onDeleteAddress={handleDeleteAddress}
        onUseCurrentLocation={handleUseCurrentLocation}
      />
    );
  }

  if (routerLocation.pathname === '/location/add') {
    return (
      <AddAddressPage
        onBack={() => navigate('/location')}
        onSaveAddress={handleSaveAddress}
        onUseCurrentLocation={handleUseCurrentLocation}
      />
    );
  }

  if (routerLocation.pathname === '/login') {
    return <LoginPage onLogin={handleLogin} onSignup={() => {
      setAuthView('signup');
      navigate('/signup');
    }} onForgotPassword={() => {
      setAuthView('forgot-password');
      navigate('/login');
    }} onOtpLogin={() => {
      setAuthView('verify-otp');
      navigate('/login');
    }} error={errorMessage} />;
  }

  if (routerLocation.pathname === '/signup') {
    return <SignupPage onLogin={() => navigate('/login')} onSignup={handleSignup} />;
  }

  if (routerLocation.pathname === '/') {
    return (
      <HomePage
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        location={location}
        pincode={pincode}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        darkMode={darkMode}
        isCartOpen={isCartOpen}
        quickViewProduct={null}
        isVoiceModalOpen={isVoiceModalOpen}
        isImageModalOpen={isImageModalOpen}
        isLocationModalOpen={isLocationModalOpen}
        isGpsLoading={isGpsLoading}
        isListening={isListening}
        isUploading={isUploading}
        onCartClick={() => setActivePage('cart')}
        onLocationClick={() => setIsLocationModalOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={() => {
          setAuthView('login');
          navigate('/login');
        }}
        onSignup={() => {
          setAuthView('signup');
          navigate('/signup');
        }}
        onProfile={() => navigate('/profile')}
        onLogout={handleLogout}
        onCartPage={() => setActivePage('cart')}
        onOrdersPage={() => setActivePage('orders')}
        onWishlistPage={() => setActivePage('wishlist')}
        onSettingsPage={() => setActivePage('settings')}
        onSearch={(query) => {
          setSearchQuery(query);
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
        onImageSearchClick={() => setIsImageModalOpen(true)}
        onDetectGPS={handleGPSDetect}
        onAddToCart={handleAddToCart}
        onQuickView={() => {}}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onBecomePartnerSelect={(role) => {
          if (role === 'Become a Service Professional') {
            navigate('/become-professional');
            return;
          }
          if (role === 'Become Delivery Agent') {
            navigate('/become-delivery-partner');
            return;
          }
          if (role === 'Become a Service Worker') {
            navigate('/become-worker');
            return;
          }
          if (role === 'Become a Seller') {
            navigate('/seller');
            return;
          }
          if (role.includes('Wholesale') || role.includes('Wholesaler')) {
            navigate('/wholesale');
            return;
          }
          if (role === 'Become a Franchise' || role === 'Become a Franchise Partner' || role === 'Franchise') {
            navigate('/franchise');
            return;
          }
          if (role === 'Advertise With Us') {
            navigate('/advertise');
            return;
          }
          alert(`Partner application loading for: ${role}`);
        }}
        onShopSelect={(shop) => {
          alert(`Selected Store: ${shop.name}. Browsing inventory catalog in simulation.`);
        }}
        onServiceBook={(service) => {
          alert(`Booking created for: ${service.name}. Starting scheduler flow.`);
        }}
        onCheckout={() => handleCheckoutProcess(cartTotal)}
        onCloseCart={() => setIsCartOpen(false)}
        onCloseQuickView={() => {}}
        onCloseVoiceModal={() => setIsVoiceModalOpen(false)}
        onCloseImageModal={() => setIsImageModalOpen(false)}
        onCloseLocationModal={() => setIsLocationModalOpen(false)}
        setSelectedCategory={setSelectedCategory}

        getCartQuantity={getCartQuantity}
        handleAddToCart={handleAddToCart}
        setIsCartOpen={setIsCartOpen}
        setQuickViewProduct={() => {}}
        setIsVoiceModalOpen={setIsVoiceModalOpen}
        setIsImageModalOpen={setIsImageModalOpen}
        setIsLocationModalOpen={setIsLocationModalOpen}
        setLocation={setLocation}
        setPincode={setPincode}
        setIsGpsLoading={setIsGpsLoading}
        setIsListening={setIsListening}
        setIsUploading={setIsUploading}
        handleGPSDetect={handleGPSDetect}
        handleVoiceSearch={handleVoiceSearch}
        handleImageSearch={handleImageSearch}
        onLogout={handleLogout}
      />
    );
  }

  const currentSession = getStoredAuthSession();
  const hasValidSession = Boolean(currentSession && isSessionValid(currentSession) && isAuthenticated && user);

  const isProtectedPath = routerLocation.pathname === '/profile' || routerLocation.pathname === '/customer/dashboard';
  const protectedActivePages = ['edit-profile', 'wallet', 'rewards', 'addresses', 'notifications', 'payment', 'cart', 'orders', 'wishlist', 'settings'];
  const isProtectedActivePage = protectedActivePages.includes(activePage);

  if ((isProtectedPath || isProtectedActivePage || !isPublicRoute) && !hasValidSession) {
    return <LoginPage onLogin={handleLogin} onSignup={() => navigate('/signup')} onForgotPassword={() => navigate('/login')} onOtpLogin={() => navigate('/login')} error={errorMessage} />;
  }

  if (routerLocation.pathname === '/profile' || routerLocation.pathname === '/customer/dashboard') {
    return <ProfilePage user={user} onBack={() => navigate('/')} onLogout={handleLogout} onNavigate={(view) => {
      if (view === 'about') {
        navigate('/about');
      } else if (view === 'home') {
        navigate('/');
      } else {
        setActivePage(view);
      }
    }} />;
  }

  if (activePage === 'edit-profile') {
    return <EditProfilePage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'wallet') {
    return <WalletPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'rewards') {
    return <RewardsPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'addresses') {
    return <AddressPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'notifications') {
    return <NotificationsPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'payment') {
    return <PaymentPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'help-support') {
    return <HelpSupportPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'privacy-policy') {
    return <PrivacyPolicyPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'terms') {
    return <TermsPage onBack={() => setActivePage('profile')} />;
  }

  if (activePage === 'about') {
    return <AboutPage onBack={() => setActivePage('home')} onLogout={handleLogout} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (activePage === 'service-warranty') {
    return <ServiceWarrantyPage onBack={() => setActivePage('home')} onLogout={handleLogout} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  if (activePage === 'our-story') {
    return <OurStoryPage onBack={() => setActivePage('home')} onLogout={handleLogout} isAuthenticated={isAuthenticated} user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }


  if (activePage === 'wishlist') {
    return <WishlistPage onBack={() => setActivePage('home')} />;
  }

  if (activePage === 'settings') {
    return <SettingsPage onBack={() => setActivePage('home')} />;
  }

  // Fallback default: Render HomePage instead of returning null (prevents blank screen)
  return (
    <HomePage
      cartItems={cartItems}
      cartCount={cartCount}
      cartTotal={cartTotal}
      location={location}
      pincode={pincode}
      selectedCategory={selectedCategory}
      searchQuery={searchQuery}
      darkMode={darkMode}
      isCartOpen={isCartOpen}
      quickViewProduct={null}
      isVoiceModalOpen={isVoiceModalOpen}
      isImageModalOpen={isImageModalOpen}
      isLocationModalOpen={isLocationModalOpen}
      isGpsLoading={isGpsLoading}
      isListening={isListening}
      isUploading={isUploading}
      onCartClick={() => setActivePage('cart')}
      onLocationClick={() => setIsLocationModalOpen(true)}
      isAuthenticated={isAuthenticated}
      user={user}
      onLogin={() => {
        setAuthView('login');
        navigate('/login');
      }}
      onSignup={() => {
        setAuthView('signup');
        navigate('/signup');
      }}
      onProfile={() => navigate('/profile')}
        onLogout={handleLogout}
      onCartPage={() => setActivePage('cart')}
      onOrdersPage={() => setActivePage('orders')}
      onWishlistPage={() => setActivePage('wishlist')}
      onSettingsPage={() => setActivePage('settings')}
      onSearch={(query) => {
        setSearchQuery(query);
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      }}
      toggleDarkMode={toggleDarkMode}
      onVoiceSearchClick={() => setIsVoiceModalOpen(true)}
      onImageSearchClick={() => setIsImageModalOpen(true)}
      onDetectGPS={handleGPSDetect}
      onAddToCart={handleAddToCart}
      onQuickView={() => {}}
      onCategorySelect={(category) => {
        setSelectedCategory(category);
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      }}
      onBecomePartnerSelect={(role) => {
        if (role === 'Become a Service Professional') {
          navigate('/become-professional');
          return;
        }
        if (role === 'Become Delivery Agent') {
          navigate('/become-delivery-partner');
          return;
        }
        if (role === 'Become a Service Worker') {
          navigate('/become-worker');
          return;
        }
        if (role === 'Become a Seller') {
          navigate('/seller');
          return;
        }
        if (role.includes('Wholesale') || role.includes('Wholesaler')) {
          navigate('/wholesale');
          return;
        }
        if (role === 'Become a Franchise' || role === 'Become a Franchise Partner' || role === 'Franchise') {
          navigate('/franchise');
          return;
        }
        if (role === 'Advertise With Us') {
          navigate('/advertise');
          return;
        }
        alert(`Partner application loading for: ${role}`);
      }}
      onShopSelect={(shop) => {
        alert(`Selected Store: ${shop.name}. Browsing inventory catalog in simulation.`);
      }}
      onServiceBook={(service) => {
        alert(`Booking created for: ${service.name}. Starting scheduler flow.`);
      }}
      onCheckout={() => handleCheckoutProcess(cartTotal)}
      onCloseCart={() => setIsCartOpen(false)}
      onCloseQuickView={() => {}}
      onCloseVoiceModal={() => setIsVoiceModalOpen(false)}
      onCloseImageModal={() => setIsImageModalOpen(false)}
      onCloseLocationModal={() => setIsLocationModalOpen(false)}
      setSelectedCategory={setSelectedCategory}

      getCartQuantity={getCartQuantity}
      handleAddToCart={handleAddToCart}
      setIsCartOpen={setIsCartOpen}
      setQuickViewProduct={() => {}}
      setIsVoiceModalOpen={setIsVoiceModalOpen}
      setIsImageModalOpen={setIsImageModalOpen}
      setIsLocationModalOpen={setIsLocationModalOpen}
      setLocation={setLocation}
      setPincode={setPincode}
      setIsGpsLoading={setIsGpsLoading}
      setIsListening={setIsListening}
      setIsUploading={setIsUploading}
      handleGPSDetect={handleGPSDetect}
      handleVoiceSearch={handleVoiceSearch}
      handleImageSearch={handleImageSearch}
      onLogout={handleLogout}
    />
  );
}

export default function App() {
  return (
    <div className="pb-[72px] md:pb-0 min-h-screen">
      <AppContent />
      <MobileBottomNav />
    </div>
  );
}
