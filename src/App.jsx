import React, { useEffect, useState } from 'react';
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
import { getStoredUsers, registerUser, authenticateUser, resetPassword as resetAuthPassword } from './services/authService';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [location, setLocation] = useState('Green Park, New Delhi');
  const [pincode, setPincode] = useState('110016');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [authView, setAuthView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
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
    setUser({ name: result.user.name, email: result.user.email, phone: result.user.phone });
    setIsAuthenticated(true);
    setAuthView('home');
    setActivePage('home');
    setErrorMessage('');
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
    setUser({ name: form.name, email: form.email, phone: form.phone });
    setIsAuthenticated(true);
    setAuthView('home');
    setActivePage('home');
    setErrorMessage('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setAuthView('login');
    setActivePage('login');
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    if (authView === 'signup') {
      return <SignupPage onLogin={() => setAuthView('login')} onSignup={handleSignup} />;
    }

    if (authView === 'forgot-password') {
      return <ForgotPasswordPage onBack={() => setAuthView('login')} onOtpSent={(context) => {
        setOtpContext(context);
        setAuthView('verify-otp');
      }} />;
    }

    if (authView === 'verify-otp') {
      return <VerifyOTPPage identifier={otpContext?.identifier || ''} mode={otpContext?.mode || 'email'} onBack={() => setAuthView('forgot-password')} onVerified={() => setAuthView('reset-password')} />;
    }

    if (authView === 'reset-password') {
      return <ResetPasswordPage onBack={() => setAuthView('login')} onReset={async (newPassword) => {
        const result = await resetAuthPassword(users, otpContext?.identifier || '', newPassword);
        if (result.success) {
          setUsers(result.users);
          setAuthView('login');
          setErrorMessage('Password reset successful. Please log in.');
        }
      }} />;
    }

    return <LoginPage onLogin={handleLogin} onSignup={() => setAuthView('signup')} onForgotPassword={() => setAuthView('forgot-password')} onOtpLogin={() => setAuthView('verify-otp')} error={errorMessage} />;
  }

  if (activePage === 'profile') {
    return <ProfilePage user={user} onBack={() => setActivePage('home')} onLogout={handleLogout} onNavigate={(view) => setActivePage(view)} />;
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
    return <AboutPage onBack={() => setActivePage('profile')} />;
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
      onProfile={() => setActivePage('profile')}
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
    />
  );
}
