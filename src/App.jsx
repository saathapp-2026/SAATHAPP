import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPassword';
import VerifyOTPPage from './pages/VerifyOTP';
import ResetPasswordPage from './pages/ResetPassword';
import ProfilePage from './pages/Profile';
import CartPage from './pages/Cart';
import OrdersPage from './pages/Orders';
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
import DeliveryPartnerAgreementPage from './pages/DeliveryPartnerAgreement';
import FaqPage from './pages/Faq';
import LocationPage from './pages/LocationPage';
import AddAddressPage from './pages/AddAddressPage';
import { getStoredUsers, registerUser, authenticateUser, resetPassword as resetAuthPassword, getStoredAuthSession, saveAuthSession, clearAuthSession, isSessionValid } from './services/authService';

export default function App() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const initialAuthSession = typeof window !== 'undefined' ? getStoredAuthSession() : null;
  const [cartItems, setCartItems] = useState([]);
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
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [authView, setAuthView] = useState(initialAuthSession && isSessionValid(initialAuthSession) ? 'home' : 'login');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialAuthSession && isSessionValid(initialAuthSession)));
  const [user, setUser] = useState(initialAuthSession?.user ?? null);
  const [authReady, setAuthReady] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpContext, setOtpContext] = useState(null);
  const [users, setUsers] = useState(getStoredUsers());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedSession = getStoredAuthSession();
    if (storedSession && isSessionValid(storedSession)) {
      setUser(storedSession.user);
      setIsAuthenticated(true);
      setAuthView('home');
      setActivePage('home');
    } else {
      clearAuthSession();
      setUser(null);
      setIsAuthenticated(false);
      setAuthView('login');
      setActivePage('login');
      setErrorMessage('Your session has expired. Please log in again.');
    }
    setAuthReady(true);
  }, []);

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

  const handleAddToCart = (product, change) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const nextQty = existing.quantity + change;
        if (nextQty <= 0) {
          return prev.filter((item) => item.id !== product.id);
        }
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: nextQty } : item));
      }
      if (change > 0) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev;
    });
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find((entry) => entry.id === productId);
    return item ? item.quantity : 0;
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

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = async ({ identifier, password, mode }) => {
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
    navigate('/');
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
    navigate('/');
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
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!authReady) {
    return null;
  }

  const isPublicRoute = routerLocation.pathname === '/' || routerLocation.pathname === '/about' || routerLocation.pathname === '/faq' || routerLocation.pathname === '/login' || routerLocation.pathname === '/signup';

  if (routerLocation.pathname === '/about') {
    return <AboutPage onBack={() => navigate('/', { replace: true })} onLogout={handleLogout} />;
  }

  if (routerLocation.pathname === '/faq') {
    return <FaqPage onBack={() => navigate('/')} />;
  }

  if (routerLocation.pathname === '/delivery-partner-agreement') {
    return <DeliveryPartnerAgreementPage />;
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
        onCartClick={() => setIsCartOpen(true)}
        onLocationClick={() => setIsLocationModalOpen(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={() => {
          setAuthView('login');
          setActivePage('login');
        }}
        onSignup={() => {
          setAuthView('signup');
          setActivePage('signup');
        }}
        onProfile={() => navigate('/profile')}
        onCartPage={() => setActivePage('cart')}
        onOrdersPage={() => setActivePage('orders')}
        onWishlistPage={() => setActivePage('wishlist')}
        onSettingsPage={() => setActivePage('settings')}
        onSearch={(query) => {
          setSearchQuery(query);
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        toggleDarkMode={() => setDarkMode((value) => !value)}
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
          alert(`Partner application loading for: ${role}`);
        }}
        onShopSelect={(shop) => {
          alert(`Selected Store: ${shop.name}. Browsing inventory catalog in simulation.`);
        }}
        onServiceBook={(service) => {
          alert(`Booking created for: ${service.name}. Starting scheduler flow.`);
        }}
        onCheckout={() => {
          alert(`Checkout completed for total amount ₹${cartTotal}! Thank you for using SaathApp.`);
          setCartItems([]);
          setIsCartOpen(false);
        }}
        onCloseCart={() => setIsCartOpen(false)}
        onCloseQuickView={() => {}}
        onCloseVoiceModal={() => setIsVoiceModalOpen(false)}
        onCloseImageModal={() => setIsImageModalOpen(false)}
        onCloseLocationModal={() => setIsLocationModalOpen(false)}
        setSelectedCategory={setSelectedCategory}
        setCartItems={setCartItems}
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

  if (!isAuthenticated && !isPublicRoute) {
    return <LoginPage onLogin={handleLogin} onSignup={() => navigate('/signup')} onForgotPassword={() => navigate('/login')} onOtpLogin={() => navigate('/login')} error={errorMessage} />;
  }

  if (routerLocation.pathname === '/profile') {
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
    return <AboutPage onBack={() => setActivePage('home')} onLogout={handleLogout} />;
  }

  if (activePage === 'cart') {
    return <CartPage onBack={() => setActivePage('home')} />;
  }

  if (activePage === 'orders') {
    return <OrdersPage onBack={() => setActivePage('home')} />;
  }

  if (activePage === 'wishlist') {
    return <WishlistPage onBack={() => setActivePage('home')} />;
  }

  if (activePage === 'settings') {
    return <SettingsPage onBack={() => setActivePage('home')} />;
  }

  return null;
}
