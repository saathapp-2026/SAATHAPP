import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Bell, Heart, ShoppingBag, MapPin, Settings, Wallet, ShieldCheck,
  LogOut, Pencil, Sparkles, Globe, CreditCard, Gift, RefreshCw, Shield,
  HelpCircle, FileText, Info, ArrowRight, User, Trash2, CheckCircle2,
  Lock, KeyRound, Eye, Plus, Check, Moon, Sun, Smartphone, Laptop, Calendar, Search,
  Wrench, Star, ShoppingCart
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Import customer dashboard sub-tabs
import ServicesTab from '../components/customer/ServicesTab';
import WishlistTab from '../components/customer/WishlistTab';
import CartTab from '../components/customer/CartTab';
import PaymentsTab from '../components/customer/PaymentsTab';
import ReviewsTab from '../components/customer/ReviewsTab';

// ==========================================
// 1. LOCAL STORAGE MOCK DATABASE INITIALIZER
// ==========================================
const initMockDB = (user) => {
  if (!localStorage.getItem('saath_profile')) {
    localStorage.setItem('saath_profile', JSON.stringify({
      name: user?.name || 'Nikita Sharma',
      email: user?.email || 'demo@saathapp.com',
      phone: user?.phone || '+91 9128842027',
      gender: 'Female',
      dob: '1998-05-15',
      emailVerified: true,
      mobileVerified: true,
      twoFactor: false,
      lastLogin: 'Today, 02:10 PM'
    }));
  }
  if (!localStorage.getItem('saath_wallet_balance')) {
    localStorage.setItem('saath_wallet_balance', '450.00');
  }
  if (!localStorage.getItem('saath_addresses')) {
    localStorage.setItem('saath_addresses', JSON.stringify([
      { id: 1, type: 'Home', address: 'Bhatahar, Tharthari, Nalanda, Bihar – 801307, India', isDefault: true },
      { id: 2, type: 'Work', address: '5th Floor, Block C, Tech Park, Sector 62, Noida, UP – 201301', isDefault: false }
    ]));
  }
  if (!localStorage.getItem('saath_orders')) {
    localStorage.setItem('saath_orders', JSON.stringify([
      { id: 'ORD-8942', status: 'Delivered', date: 'July 25, 2026', total: 1249.00, items: ['Tomato 1kg', 'Ghee 500g'], thumbnail: '🍅' },
      { id: 'ORD-7711', status: 'In Transit', date: 'July 26, 2026', total: 350.00, items: ['AC Servicing'], thumbnail: '⚙️' },
      { id: 'ORD-3012', status: 'Pending', date: 'July 26, 2026', total: 5500.00, items: ['Ultratech Cement x10'], thumbnail: '🧱' },
      { id: 'ORD-1209', status: 'Cancelled', date: 'July 20, 2026', total: 180.00, items: ['Cables'], thumbnail: '🔌' }
    ]));
  }
  if (!localStorage.getItem('saath_transactions')) {
    localStorage.setItem('saath_transactions', JSON.stringify([
      { id: 'TXN-902', type: 'Credit', amount: 500, date: 'July 25, 2026', desc: 'Added money via UPI', method: 'UPI', status: 'Success' },
      { id: 'TXN-884', type: 'Debit', amount: 1249, date: 'July 25, 2026', desc: 'Order Payment ORD-8942', method: 'Saath Wallet', status: 'Success' },
      { id: 'TXN-712', type: 'Credit', amount: 200, date: 'July 22, 2026', desc: 'Redeemed Voucher VCH-882', method: 'Voucher', status: 'Success' }
    ]));
  }
  if (!localStorage.getItem('saath_bookings')) {
    localStorage.setItem('saath_bookings', JSON.stringify([
      { id: 'BKG-5521', service: 'AC Deep Cleaning', date: 'July 27, 2026', time: '10:00 AM', status: 'Scheduled', provider: 'Suresh Kumar', price: 699 },
      { id: 'BKG-4410', service: 'Kitchen Sink Plumbing', date: 'July 26, 2026', time: '03:00 PM', status: 'In Progress', provider: 'Ram Prasad', price: 299 },
      { id: 'BKG-1102', service: 'Living Room Painting', date: 'July 15, 2026', time: '09:00 AM', status: 'Completed', provider: 'Vijay Painters', price: 4500 }
    ]));
  }
  if (!localStorage.getItem('saath_rewards')) {
    localStorage.setItem('saath_rewards', JSON.stringify({
      points: 750,
      history: [
        { id: 'REW-91', desc: 'Bonus points on registration', points: 200, date: 'July 10, 2026', type: 'Credit' },
        { id: 'REW-92', desc: 'Completed Order ORD-8942 reward', points: 150, date: 'July 25, 2026', type: 'Credit' },
        { id: 'REW-93', desc: 'Referral reward from Nikita', points: 400, date: 'July 26, 2026', type: 'Credit' }
      ]
    }));
  }
  if (!localStorage.getItem('saath_notifications')) {
    localStorage.setItem('saath_notifications', JSON.stringify([
      { id: 1, title: 'Booking Confirmed!', message: 'Your AC Deep Cleaning has been scheduled with Suresh Kumar.', time: '10 mins ago', read: false },
      { id: 2, title: 'Wallet Credited', message: '₹500.00 was successfully added via UPI.', time: '2 hours ago', read: true },
      { id: 3, title: 'Welcome to SaathApp!', message: 'Explore local stores, professional technicians, and agricultural resources near you.', time: '2 days ago', read: true }
    ]));
  }
  if (!localStorage.getItem('saath_tickets')) {
    localStorage.setItem('saath_tickets', JSON.stringify([
      { id: 'TCK-229', subject: 'Refund delay for cancelled order', category: 'Refunds', status: 'Open', lastUpdated: 'July 26, 2026' },
      { id: 'TCK-104', subject: 'Address mismatch during geolocation selection', category: 'Saved Addresses', status: 'Closed', lastUpdated: 'July 22, 2026' }
    ]));
  }
};

export default function Profile({ user, onBack, onLogout }) {
  const { theme, setTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(() => window.innerWidth < 768 ? 'menu' : 'dashboard');
  const [profile, setProfile] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0.00);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rewards, setRewards] = useState({ points: 0, history: [] });
  const [notifications, setNotifications] = useState([]);
  const [tickets, setTickets] = useState([]);
  
  // Custom states for new tabs
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [servicesFilter, setServicesFilter] = useState('All');
  const [servicesSearch, setServicesSearch] = useState('');
  
  // Booking modal states
  const [showBookingFormModal, setShowBookingFormModal] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00 AM - 11:00 AM');
  const [bookingDesc, setBookingDesc] = useState('');
  
  // Review modal states
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);
  const [selectedBookingToReview, setSelectedBookingToReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  // App States
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Modals & Action States
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddressType, setNewAddressType] = useState('Home');
  const [newAddressContent, setNewAddressContent] = useState('');

  // Sync state from window resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && activeTab === 'menu') {
        setActiveTab('dashboard');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  // Initial data loader
  const loadData = () => {
    initMockDB(user);
    setProfile(JSON.parse(localStorage.getItem('saath_profile') || '{}'));
    setWalletBalance(parseFloat(localStorage.getItem('saath_wallet_balance') || '0.00'));
    setOrders(JSON.parse(localStorage.getItem('saath_orders') || '[]'));
    setTransactions(JSON.parse(localStorage.getItem('saath_transactions') || '[]'));
    setAddresses(JSON.parse(localStorage.getItem('saath_addresses') || '[]'));
    setBookings(JSON.parse(localStorage.getItem('saath_bookings') || '[]'));
    setRewards(JSON.parse(localStorage.getItem('saath_rewards') || '{"points":0,"history":[]}'));
    setNotifications(JSON.parse(localStorage.getItem('saath_notifications') || '[]'));
    setTickets(JSON.parse(localStorage.getItem('saath_tickets') || '[]'));
    
    // Initialize custom states
    if (!localStorage.getItem('saath_wishlist')) {
      localStorage.setItem('saath_wishlist', JSON.stringify([
        { id: 'w-1', name: 'Syska LED Bulb 9W', price: 120, image: '💡', desc: 'Energy efficient LED bulb with 2 years warranty.' },
        { id: 'w-2', name: 'Cumi Grinding Wheel', price: 450, image: '⚙️', desc: 'Premium wheel for angle grinders.' }
      ]));
    }
    if (!localStorage.getItem('saath_cart')) {
      localStorage.setItem('saath_cart', JSON.stringify([
        { id: 'c-1', name: 'Premium Copper Wire 90m', price: 1599, count: 1, image: '🔌' },
        { id: 'c-2', name: 'Tap Connector Brass', price: 180, count: 2, image: '🚰' }
      ]));
    }
    if (!localStorage.getItem('saath_user_reviews')) {
      localStorage.setItem('saath_user_reviews', JSON.stringify([
        { id: 'rev-1', serviceName: 'Living Room Painting', rating: 5, date: 'July 15, 2026', text: 'Excellent job by Vijay Painters! Very neat work.' }
      ]));
    }
    setWishlist(JSON.parse(localStorage.getItem('saath_wishlist') || '[]'));
    setCart(JSON.parse(localStorage.getItem('saath_cart') || '[]'));
    setReviewsList(JSON.parse(localStorage.getItem('saath_user_reviews') || '[]'));
  };

  useEffect(() => {
    loadData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850); // Premium skeleton loader simulation
    return () => clearTimeout(timer);
  }, []);

  // Update profile handler
  const saveProfileChanges = (updatedProfile) => {
    localStorage.setItem('saath_profile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
  };

  // Wallet operations
  const handleAddMoney = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;
    const newBalance = (walletBalance + numericAmount).toFixed(2);
    localStorage.setItem('saath_wallet_balance', newBalance);
    setWalletBalance(parseFloat(newBalance));

    // Log transaction
    const newTxn = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      type: 'Credit',
      amount: numericAmount,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      desc: 'Added money to wallet',
      method: 'UPI / Cards',
      status: 'Success'
    };
    const updatedTxns = [newTxn, ...transactions];
    localStorage.setItem('saath_transactions', JSON.stringify(updatedTxns));
    setTransactions(updatedTxns);
    setShowAddMoneyModal(false);
    setAddMoneyAmount('');
  };

  // Address CRUD operations
  const handleSaveAddress = () => {
    if (!newAddressContent.trim()) return;
    let updatedAddresses = [...addresses];
    
    if (editingAddress) {
      updatedAddresses = updatedAddresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, type: newAddressType, address: newAddressContent }
          : addr
      );
    } else {
      const newAddr = {
        id: Math.floor(1000 + Math.random() * 9000),
        type: newAddressType,
        address: newAddressContent,
        isDefault: addresses.length === 0
      };
      updatedAddresses.push(newAddr);
    }

    localStorage.setItem('saath_addresses', JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
    setShowAddressModal(false);
    setEditingAddress(null);
    setNewAddressContent('');
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    // If we deleted the default, set default to the first one remaining
    if (updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }
    localStorage.setItem('saath_addresses', JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };

  const handleSetDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    localStorage.setItem('saath_addresses', JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };

  // Delete account trigger
  const handleDeleteAccount = () => {
    localStorage.clear();
    setShowDeleteConfirm(false);
    onLogout();
  };

  // SKELETON LOADER COMPONENT
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 text-left">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[280px] bg-white dark:bg-slate-900 h-[600px] rounded-[18px] p-6 space-y-6 animate-pulse border border-slate-200/50 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            </div>
            <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-[14px]" />
            <div className="space-y-3 pt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-[18px] p-6 sm:p-8 animate-pulse border border-slate-200/50 dark:border-slate-800 space-y-6">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-[18px]" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-[14px]" />
              ))}
            </div>
            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-[18px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 text-left transition-colors duration-300 font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* Navigation breadcrumb */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase text-slate-450 hover:text-[#6C3BFF] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>{t('return_to_homepage')}</span>
        </button>

        {/* ==========================================
            2. ACCOUNT LAYOUT CONTAINER
           ========================================== */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* LEFT SIDEBAR PANEL */}
          <div className={`w-full md:w-[280px] space-y-6 shrink-0 sticky top-6 ${activeTab !== 'menu' ? 'hidden md:block' : ''}`}>
            
            {/* Sidebar Profile Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-[18px] p-5 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#6C3BFF] to-[#FF5A7A] text-white flex items-center justify-center font-black text-2xl mx-auto border-2 border-white dark:border-slate-800 shadow-md">
                <span>{(profile?.name || 'U').charAt(0).toUpperCase()}</span>
              </div>
              <h3 className="mt-3 text-sm font-black text-slate-800 dark:text-white truncate">{profile?.name}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{profile?.phone}</p>
            </div>

            {/* Wallet Quick Balance Card */}
            <div className="bg-gradient-to-br from-[#6C3BFF] to-[#6C3BFF]/85 text-white rounded-[18px] p-5 shadow-soft relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-lg pointer-events-none" />
              <p className="text-[10px] uppercase font-bold tracking-wider text-white/70">{t('wallet')}</p>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-xs font-black">₹</span>
                <span className="text-2xl font-black tracking-tight">{walletBalance.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setShowAddMoneyModal(true)}
                className="mt-4 w-full py-2 bg-white text-[#6C3BFF] hover:bg-[#F8F9FC] active:scale-97 transition-all rounded-xl text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer"
              >
                {t('add_money')}
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-[18px] p-2.5 shadow-sm space-y-1">
              {[
                { tab: 'dashboard', label: t('dashboard'), icon: Laptop },
                { tab: 'orders', label: t('orders'), icon: ShoppingBag },
                { tab: 'services', label: 'Services', icon: Wrench },
                { tab: 'bookings', label: t('bookings'), icon: Calendar },
                { tab: 'wishlist', label: 'Wishlist', icon: Heart },
                { tab: 'cart', label: 'Cart', icon: ShoppingCart },
                { tab: 'addresses', label: t('saved_addresses'), icon: MapPin },
                { tab: 'payments', label: 'Payments', icon: CreditCard },
                { tab: 'wallet', label: t('wallet'), icon: Wallet },
                { tab: 'reviews', label: 'Reviews', icon: Star },
                { tab: 'support', label: t('customer_support'), icon: HelpCircle },
                { tab: 'notifications', label: t('notifications'), icon: Bell },
                { tab: 'profile', label: t('profile'), icon: User },
                { tab: 'settings', label: t('settings'), icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#6C3BFF]/10 text-[#6C3BFF] dark:bg-[#6C3BFF]/25 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-955/20 text-left transition-all cursor-pointer"
              >
                <LogOut size={16} />
                <span>{t('logout')}</span>
              </button>
            </div>

          </div>

          {/* RIGHT CONTENT DISPLAY WINDOW */}
          <div className={`flex-1 w-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-[18px] p-6 sm:p-8 shadow-sm ${activeTab === 'menu' ? '' : 'hidden md:block'}`}>
            
            {/* Mobile View Header & Navigation back button */}
            {activeTab !== 'menu' && (
              <button
                onClick={() => setActiveTab('menu')}
                className="md:hidden mb-4 inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#6C3BFF] cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>Account Menu</span>
              </button>
            )}

            {/* Premium Dashboard Header Segment */}
            <div className="hidden md:flex items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/50 dark:border-slate-800">
              {/* Welcome text */}
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Customer Space</span>
                <h2 className="text-base font-black text-slate-855 dark:text-white leading-none">
                  {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening'}, {profile?.name || 'Nikita'}
                </h2>
              </div>
              
              {/* Search & Actions Bar */}
              <div className="flex items-center gap-4">
                {/* Search input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search dashboard..."
                    className="w-48 xl:w-60 h-9 px-3 pl-8 text-xs bg-slate-50 dark:bg-slate-955/20 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#6C3BFF]"
                  />
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                
                {/* Language button dropdown */}
                <div className="relative group">
                  <button className="p-2 bg-slate-50 dark:bg-slate-955/20 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer">
                    <Globe size={16} className="text-[#6C3BFF]" />
                  </button>
                  {/* Hover dropdown list */}
                  <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1.5 hidden group-hover:block z-50">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'hi', label: 'हिन्दी' },
                      { code: 'bn', label: 'বাংলা' },
                      { code: 'te', label: 'తెలుగు' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 ${
                          language === lang.code ? 'text-[#6C3BFF] bg-[#6C3BFF]/5' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Theme toggle button */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 bg-slate-50 dark:bg-slate-955/20 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  {theme === 'dark' ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-[#6C3BFF]" />}
                </button>
                
                {/* Notification Bell */}
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className="relative p-2 bg-slate-50 dark:bg-slate-955/20 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  <Bell size={16} className="text-[#6C3BFF]" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
                
                {/* Profile avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#6C3BFF] to-[#FF5A7A] text-white flex items-center justify-center font-black text-xs border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse-subtle">
                  <span>{(profile?.name || 'U').charAt(0).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >

                {/* ==========================================
                    3A. DASHBOARD TAB PANEL
                   ========================================== */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Welcome message for mobile/tablet where the main header is hidden */}
                    <div className="md:hidden space-y-1">
                      <h2 className="text-xl font-black text-slate-850 dark:text-white">Hello, {profile?.name}!</h2>
                      <p className="text-xs text-slate-400 font-semibold">Welcome to your SaathApp Hub. Manage your services and payments.</p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
                      <div className="bg-[#6C3BFF]/5 dark:bg-slate-955/30 p-4.5 rounded-2xl border border-[#6C3BFF]/10 hover:shadow-soft transition-all text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
                        <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">{orders.length}</p>
                      </div>
                      <div className="bg-amber-500/5 dark:bg-slate-955/30 p-4.5 rounded-2xl border border-amber-500/10 hover:shadow-soft transition-all text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Orders</p>
                        <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">
                          {orders.filter(o => o.status === 'Pending' || o.status === 'In Transit').length}
                        </p>
                      </div>
                      <div className="bg-emerald-500/5 dark:bg-slate-955/30 p-4.5 rounded-2xl border border-emerald-500/10 hover:shadow-soft transition-all text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Orders</p>
                        <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">
                          {orders.filter(o => o.status === 'Delivered').length}
                        </p>
                      </div>
                      <div className="bg-blue-500/5 dark:bg-slate-955/30 p-4.5 rounded-2xl border border-blue-500/10 hover:shadow-soft transition-all text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wallet Balance</p>
                        <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">₹{walletBalance.toFixed(2)}</p>
                      </div>
                      <div className="bg-[#FF5A7A]/5 dark:bg-slate-955/30 p-4.5 rounded-2xl border border-[#FF5A7A]/10 hover:shadow-soft transition-all text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reward Points</p>
                        <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">{rewards?.points || 0}</p>
                      </div>
                    </div>

                    {/* Previews Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Left Column */}
                      <div className="space-y-6">
                        
                        {/* Recent Orders Preview */}
                        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Recent Orders</h4>
                            <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer">View All</button>
                          </div>
                          <div className="space-y-2">
                            {orders.slice(0, 2).map((order) => (
                              <div key={order.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800">{order.thumbnail}</span>
                                  <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px] sm:max-w-none">{order.items.join(', ')}</p>
                                    <p className="text-[9px] text-slate-400 font-semibold">{order.date}</p>
                                  </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[8px] uppercase ${
                                  order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                                  order.status === 'In Transit' ? 'bg-blue-500/10 text-blue-500' :
                                  order.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                                }`}>{order.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Upcoming Bookings Preview */}
                        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Upcoming Services</h4>
                            <button onClick={() => setActiveTab('bookings')} className="text-[10px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer">View Schedule</button>
                          </div>
                          <div className="space-y-2">
                            {bookings.filter(b => b.status === 'Scheduled' || b.status === 'In Progress').slice(0, 2).map((booking) => (
                              <div key={booking.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs">
                                <div className="space-y-0.5 text-left">
                                  <p className="font-bold text-slate-800 dark:text-slate-200">{booking.service}</p>
                                  <p className="text-[9px] text-slate-400 font-semibold">{booking.date} at {booking.time} • {booking.provider}</p>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-bold text-[8px] uppercase">{booking.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Saved Addresses Preview */}
                        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Saved Addresses</h4>
                            <button onClick={() => setActiveTab('addresses')} className="text-[10px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer">Manage</button>
                          </div>
                          <div className="space-y-2">
                            {addresses.slice(0, 2).map((addr) => (
                              <div key={addr.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs text-left">
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-[8px] uppercase tracking-wider">{addr.type}</span>
                                <p className="mt-1 text-slate-600 dark:text-slate-350 truncate">{addr.address}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        
                        {/* Notifications Preview */}
                        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Recent Notifications</h4>
                            <button onClick={() => setActiveTab('notifications')} className="text-[10px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer">Read All</button>
                          </div>
                          <div className="space-y-2">
                            {notifications.slice(0, 2).map((notif) => (
                              <div key={notif.id} className="flex gap-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs text-left">
                                <div className="w-1.5 h-1.5 bg-[#6C3BFF] rounded-full shrink-0 mt-1.5" />
                                <div>
                                  <p className="font-bold text-slate-800 dark:text-slate-200">{notif.title}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{notif.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Wallet & Rewards Summary */}
                        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                          <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Wallet Summary</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-xl text-left">
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Available Cash</p>
                              <p className="text-lg font-black text-slate-855 dark:text-white mt-0.5">₹{walletBalance.toFixed(2)}</p>
                              <button onClick={() => setShowAddMoneyModal(true)} className="mt-2 text-[9px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer">Add cash</button>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-xl text-left">
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Reward Points</p>
                              <p className="text-lg font-black text-slate-855 dark:text-white mt-0.5">{(rewards?.points || 0)} pts</p>
                              <button onClick={() => setActiveTab('rewards')} className="mt-2 text-[9px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer">Redeem</button>
                            </div>
                          </div>
                        </div>

                        {/* Support Tickets Preview */}
                        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Active Support Tickets</h4>
                            <button onClick={() => setActiveTab('support')} className="text-[10px] font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer">New Ticket</button>
                          </div>
                          <div className="space-y-2">
                            {tickets.slice(0, 2).map((ticket) => (
                              <div key={ticket.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs text-left">
                                <div>
                                  <p className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px] sm:max-w-none">{ticket.subject}</p>
                                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Category: {ticket.category} • Updated: {ticket.lastUpdated}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[8px] uppercase ${
                                  ticket.status === 'Open' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'
                                }`}>{ticket.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions Panel */}
                        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                          <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Quick Actions</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <button onClick={() => setShowAddMoneyModal(true)} className="py-2.5 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-100 dark:border-slate-800 rounded-xl text-center font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors shadow-sm">
                              💰 Add Wallet Money
                            </button>
                            <button onClick={() => { setEditingAddress(null); setNewAddressType('Home'); setNewAddressContent(''); setShowAddressModal(true); }} className="py-2.5 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-100 dark:border-slate-800 rounded-xl text-center font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors shadow-sm">
                              📍 Add New Address
                            </button>
                            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="py-2.5 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-100 dark:border-slate-800 rounded-xl text-center font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors shadow-sm">
                              🌓 Toggle Dark Theme
                            </button>
                            <button onClick={() => setActiveTab('support')} className="py-2.5 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-100 dark:border-slate-800 rounded-xl text-center font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors shadow-sm">
                              ✉️ Raise Help Ticket
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* ==========================================
                    3B. ORDERS TAB PANEL
                   ========================================== */}
                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">My Orders</h2>
                      <span className="text-xs text-slate-400 font-bold">{orders.length} total bookings</span>
                    </div>

                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-slate-205 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm text-xs">
                          {/* Top row */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                            <div>
                              <p className="font-mono text-slate-400">Order ID: <span className="font-bold text-slate-800 dark:text-white">{order.id}</span></p>
                              <p className="text-[10px] text-slate-455 mt-0.5">Placed on {order.date}</p>
                            </div>
                            <span className={`self-start sm:self-auto px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                              order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                              order.status === 'In Transit' ? 'bg-blue-500/10 text-blue-500' :
                              order.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                            }`}>{order.status}</span>
                          </div>

                          {/* Body thumbnails */}
                          <div className="flex items-center gap-4">
                            <span className="text-2xl w-12 h-12 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">{order.thumbnail}</span>
                            <div className="space-y-1">
                              <p className="font-black text-slate-800 dark:text-slate-255 text-sm leading-none">{order.items.join(', ')}</p>
                              <p className="text-[10px] text-slate-400 font-semibold">Total Invoice Amount: ₹{order.total.toFixed(2)}</p>
                            </div>
                          </div>

                          {/* Bottom controls */}
                          <div className="flex flex-wrap gap-2.5 pt-2 justify-end">
                            <button
                              onClick={() => alert(`Simulating invoice download for ${order.id}`)}
                              className="px-4.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 font-black uppercase tracking-wider cursor-pointer"
                            >
                              Download Invoice
                            </button>
                            <button
                              onClick={() => alert(`Re-ordering products in ${order.id}`)}
                              className="px-5 py-2 bg-[#6C3BFF] hover:bg-[#6C3BFF]/90 text-white rounded-xl font-black uppercase tracking-wider cursor-pointer shadow-sm"
                            >
                              Order Again
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3B-2. BOOKINGS TAB PANEL
                   ========================================== */}
                {activeTab === 'bookings' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">{t('bookings')}</h2>
                      <span className="text-xs text-slate-400 font-bold">{bookings.length} active bookings</span>
                    </div>

                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-3 text-xs">
                            <div>
                              <p className="font-black text-[#6C3BFF] dark:text-[#8B5CF6] uppercase">{booking.id}</p>
                              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Scheduled for: {booking.date} at {booking.time}</p>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                              booking.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                              booking.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                            }`}>{booking.status}</span>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                            <div className="space-y-1 text-left">
                              <p className="text-sm font-black text-slate-800 dark:text-white">{booking.service}</p>
                              <p className="text-[11px] text-slate-400 font-semibold">Assigned Technician: {booking.provider}</p>
                            </div>
                            <p className="font-extrabold text-slate-800 dark:text-slate-200">Price: ₹{booking.price}</p>
                          </div>

                          {booking.status === 'Scheduled' && (
                            <div className="flex items-center gap-2 pt-2 text-xs">
                              <button
                                onClick={() => alert(`Cancel request sent for booking ${booking.id}`)}
                                className="py-2 px-4 rounded-xl border border-red-205 hover:bg-red-50 text-red-500 transition-colors font-bold cursor-pointer"
                              >
                                Cancel Booking
                              </button>
                              <button
                                onClick={() => alert(`Reschedule dialog for booking ${booking.id}`)}
                                className="py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-55 dark:hover:bg-slate-800 transition-colors font-bold cursor-pointer"
                              >
                                Reschedule
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3C. WALLET TAB PANEL
                   ========================================== */}
                {activeTab === 'wallet' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Wallet Dashboard</h2>

                    {/* Gradient Card balance */}
                    <div className="bg-gradient-to-br from-[#6C3BFF] to-[#FF5A7A] rounded-2xl p-6 text-white shadow-premium relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="flex justify-between items-center relative z-10">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-white/80">Available balance</p>
                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-sm font-black">₹</span>
                            <span className="text-3xl font-black tracking-tight">{walletBalance.toFixed(2)}</span>
                          </div>
                        </div>
                        <Wallet size={36} className="text-white/30" />
                      </div>
                    </div>

                    {/* Quick actions row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {[
                        { label: 'Add Money', icon: Plus, action: () => setShowAddMoneyModal(true) },
                        { label: 'Withdraw', icon: ArrowRight, action: () => alert('Mock: Withdraw payout requested') },
                        { label: 'Transfer', icon: Globe, action: () => alert('Mock: Recipient transfer opened') },
                        { label: 'Redeem Voucher', icon: Gift, action: () => alert('Mock: Voucher code sheet opened') }
                      ].map((act, idx) => {
                        const Icon = act.icon;
                        return (
                          <button
                            key={idx}
                            onClick={act.action}
                            className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-[#6C3BFF]/5 dark:bg-slate-955/20 dark:hover:bg-[#6C3BFF]/10 rounded-xl border border-slate-200/50 dark:border-slate-800 transition-colors cursor-pointer text-center"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 text-[#6C3BFF] shadow-sm flex items-center justify-center">
                              <Icon size={14} />
                            </div>
                            <span className="font-black uppercase tracking-wider text-[10px] text-slate-700 dark:text-slate-355">{act.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Transaction History list */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Transaction History</h3>
                      <div className="space-y-2">
                        {transactions.map((txn) => (
                          <div key={txn.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800/80 rounded-xl text-xs gap-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
                                txn.type === 'Credit'
                                  ? 'bg-emerald-500/10 text-emerald-500'
                                  : 'bg-rose-500/10 text-rose-500'
                              }`}>
                                {txn.type === 'Credit' ? '+' : '-'}
                              </div>
                              <div>
                                <p className="font-black text-slate-800 dark:text-slate-250 leading-none">{txn.desc}</p>
                                <p className="text-[10px] text-slate-400 font-semibold mt-1">{txn.date} • {txn.method}</p>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <p className={`font-black ${
                                txn.type === 'Credit' ? 'text-emerald-500' : 'text-rose-500'
                              }`}>
                                {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount}
                              </p>
                              <span className="text-[9px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">{txn.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3C-2. REWARDS TAB PANEL
                   ========================================== */}
                {activeTab === 'rewards' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">{t('rewards')}</h2>

                    {/* Points Balance Card */}
                    <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl p-6 text-white shadow-premium relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                      <p className="text-xs font-bold uppercase tracking-wider text-white/80">Available Points Balance</p>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-3xl font-black tracking-tight">{rewards?.points || 0}</span>
                        <span className="text-xs font-bold">Points</span>
                      </div>
                      <p className="mt-3 text-[10px] text-white/70 font-semibold">100 Points = ₹10 Saath Cash. Redeem points for gift cards and discount vouchers.</p>
                    </div>

                    {/* Active Coupons Segment */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Active Vouchers & Coupons</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { code: 'SUPER50', discount: '₹50 OFF', desc: 'Valid on first grocery buy above ₹299', expiry: 'Expires July 31, 2026' },
                          { code: 'TECH150', discount: '₹150 OFF', desc: 'Valid on professional services above ₹999', expiry: 'Expires Aug 15, 2026' }
                        ].map((coupon) => (
                          <div key={coupon.code} className="p-4 border border-dashed border-amber-500/40 bg-amber-500/5 rounded-xl flex items-center justify-between gap-4 text-xs">
                            <div className="space-y-1 text-left">
                              <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-black text-[9px] uppercase tracking-wider">{coupon.code}</span>
                              <p className="font-black text-slate-800 dark:text-slate-200 mt-1">{coupon.discount} • {coupon.desc}</p>
                              <p className="text-[10px] text-slate-400 font-semibold">{coupon.expiry}</p>
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(coupon.code);
                                alert(`Coupon code ${coupon.code} copied to clipboard!`);
                              }}
                              className="py-1.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-black uppercase text-[10px] text-[#6C3BFF] cursor-pointer shadow-sm"
                            >
                              Copy Code
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Points ledger history */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Points Ledger History</h3>
                      <div className="space-y-2">
                        {rewards?.history.map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between p-3.5 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 rounded-xl text-xs">
                            <div className="space-y-0.5 text-left">
                              <p className="font-bold text-slate-800 dark:text-slate-200">{entry.desc}</p>
                              <p className="text-[10px] text-slate-400 font-semibold">{entry.date} • {entry.id}</p>
                            </div>
                            <span className="font-black text-emerald-500">+{entry.points} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3D. SAVED ADDRESSES TAB PANEL
                   ========================================== */}
                {activeTab === 'addresses' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Saved Addresses</h2>
                      <button
                        onClick={() => {
                          setEditingAddress(null);
                          setNewAddressType('Home');
                          setNewAddressContent('');
                          setShowAddressModal(true);
                        }}
                        className="px-4 py-2 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Plus size={14} />
                        <span>Add New</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addresses.map((addr) => (
                        <div key={addr.id} className={`p-5 rounded-2xl border text-xs space-y-4 shadow-sm flex flex-col justify-between ${
                          addr.isDefault
                            ? 'border-[#6C3BFF] bg-[#6C3BFF]/5 dark:bg-[#6C3BFF]/10'
                            : 'border-slate-205 dark:border-slate-800'
                        }`}>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-350 rounded-lg font-bold text-[9px] uppercase tracking-wider">
                                {addr.type}
                              </span>
                              {addr.isDefault && (
                                <span className="inline-flex items-center gap-1 text-[9px] text-[#6C3BFF] font-black uppercase tracking-wider">
                                  <Check size={10} />
                                  <span>Default</span>
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600 dark:text-slate-355 leading-relaxed font-semibold">{addr.address}</p>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 gap-2">
                            {!addr.isDefault ? (
                              <button
                                onClick={() => handleSetDefaultAddress(addr.id)}
                                className="text-[#6C3BFF] hover:underline font-black uppercase text-[10px] cursor-pointer"
                              >
                                Set as Default
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Active Address</span>
                            )}

                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingAddress(addr);
                                  setNewAddressType(addr.type);
                                  setNewAddressContent(addr.address);
                                  setShowAddressModal(true);
                                }}
                                className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-700 cursor-pointer"
                                title="Edit Address"
                              >
                                <Pencil size={12} />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="p-2 border border-rose-100 hover:bg-rose-50 rounded-lg text-rose-500 hover:text-rose-750 cursor-pointer"
                                title="Delete Address"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3D-2. NOTIFICATIONS TAB PANEL
                   ========================================== */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">{t('notifications')}</h2>
                      <button
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                          alert('All notifications marked as read.');
                        }}
                        className="text-xs font-black uppercase text-[#6C3BFF] hover:underline cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 border rounded-2xl flex items-start gap-3.5 text-xs text-left transition-all ${
                          notif.read ? 'bg-slate-50/30 dark:bg-slate-950/10 border-slate-100 dark:border-slate-800' : 'bg-[#6C3BFF]/5 dark:bg-[#6C3BFF]/10 border-[#6C3BFF]/20'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${notif.read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-[#6C3BFF]'}`} />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-black text-slate-800 dark:text-slate-200">{notif.title}</p>
                              <span className="text-[9px] text-slate-400 font-semibold">{notif.time}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{notif.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3E. CUSTOMER SUPPORT TAB PANEL
                   ========================================== */}
                {activeTab === 'support' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Customer Support</h2>

                    {/* FAQ Categories Grid */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">FAQ Categories</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        {[
                          { label: 'Orders', icon: ShoppingBag, color: 'text-amber-500 bg-amber-500/5 border-amber-500/10' },
                          { label: 'Payments', icon: CreditCard, color: 'text-blue-500 bg-blue-500/5 border-blue-500/10' },
                          { label: 'Refunds', icon: RefreshCw, color: 'text-rose-500 bg-rose-500/5 border-rose-500/10' },
                          { label: 'Wallet', icon: Wallet, color: 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10' },
                          { label: 'Offers', icon: Gift, color: 'text-[#6C3BFF] bg-[#6C3BFF]/5 border-[#6C3BFF]/10' },
                          { label: 'Delivery', icon: MapPin, color: 'text-cyan-500 bg-cyan-500/5 border-cyan-500/10' },
                          { label: 'General', icon: Info, color: 'text-slate-500 bg-slate-500/5 border-slate-500/10' },
                          { label: 'Contact Us', icon: Globe, color: 'text-[#FF5A7A] bg-[#FF5A7A]/5 border-[#FF5A7A]/10' }
                        ].map((cat, idx) => {
                          const Icon = cat.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => alert(`Simulating FAQ page loaded for ${cat.label}`)}
                              className={`flex flex-col items-center gap-2 p-4 border rounded-2xl cursor-pointer hover:shadow transition-shadow text-center ${cat.color}`}
                            >
                              <Icon size={18} />
                              <span className="font-black uppercase tracking-wider text-[10px]">{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom assistance trigger buttons */}
                    <div className="bg-slate-50 dark:bg-slate-955/20 border border-slate-205 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-center space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Need more help?</h4>
                        <p className="text-[11px] text-slate-455 font-semibold">Our tech-support executives are available 24/7 to solve your complaints.</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <button onClick={() => alert('Opening live chat...')} className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-sm">
                          Live Chat
                        </button>
                        <button onClick={() => alert('Opening support ticket...')} className="py-2.5 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-sm">
                          Raise Ticket
                        </button>
                        <button onClick={() => window.location.assign('mailto:support@saathapp.in')} className="py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 rounded-xl text-slate-700 dark:text-slate-350 font-bold uppercase tracking-wider cursor-pointer">
                          Email Support
                        </button>
                        <button onClick={() => window.location.assign('tel:+919128842027')} className="py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 rounded-xl text-slate-700 dark:text-slate-350 font-bold uppercase tracking-wider cursor-pointer">
                          Call Support
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3F. PROFILE TAB PANEL (EDITABLE & SECURITY)
                   ========================================== */}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Personal Profile</h2>

                      {/* Editable Fields Form */}
                      <ProfileForm profile={profile} onSave={saveProfileChanges} />
                    </div>

                    {/* Account Cards / Preference toggles */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Account Integrations</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {[
                          { title: 'Change Password', desc: 'Secure your login parameters', icon: KeyRound },
                          { title: 'Privacy Settings', desc: 'App permissions and cookies', icon: Shield },
                          { title: 'Notification Preferences', desc: 'Configure SMS/Push alerts', icon: Bell },
                          { title: 'Linked Accounts', desc: 'Manage Google / Social binds', icon: Globe }
                        ].map((c, idx) => {
                          const Icon = c.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => alert(`Simulating modal for ${c.title}`)}
                              className="flex items-center justify-between p-4 border border-slate-205 dark:border-slate-800 hover:border-[#6C3BFF]/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/20 rounded-xl transition-all cursor-pointer text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 text-[#6C3BFF] flex items-center justify-center shrink-0">
                                  <Icon size={16} />
                                </div>
                                <div>
                                  <p className="font-black text-slate-850 dark:text-slate-250 leading-none">{c.title}</p>
                                  <p className="text-[10px] text-slate-455 mt-1">{c.desc}</p>
                                </div>
                              </div>
                              <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECURITY SECTION */}
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      <h3 className="text-xs font-black text-slate-855 dark:text-white uppercase tracking-wider">Security & Checklists</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {/* Status Checklists */}
                        <div className="bg-slate-50 dark:bg-slate-955/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Email Address</span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                              <CheckCircle2 size={10} /> Verified
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Mobile Number</span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                              <CheckCircle2 size={10} /> Verified
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-600 dark:text-slate-400">Last Login session</span>
                            <span className="font-mono text-[10px] text-slate-500">{profile?.lastLogin}</span>
                          </div>
                        </div>

                        {/* 2FA Toggle Block */}
                        <div className="bg-slate-50 dark:bg-slate-955/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">Two-Factor Authentication (2FA)</h4>
                            <p className="text-[10px] text-slate-455 font-semibold leading-relaxed">Require security codes upon signing in from unrecognized desktop browsers.</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const updated = { ...profile, twoFactor: !profile.twoFactor };
                                saveProfileChanges(updated);
                              }}
                              className={`relative w-10 h-5.5 transition-colors duration-300 rounded-full cursor-pointer ${
                                profile?.twoFactor ? 'bg-[#6C3BFF]' : 'bg-slate-300 dark:bg-slate-800'
                              }`}
                            >
                              <span className={`absolute top-0.75 left-0.75 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                profile?.twoFactor ? 'translate-x-4.5' : 'translate-x-0'
                              }`} />
                            </button>
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-350 uppercase tracking-wider">
                              {profile?.twoFactor ? 'Active' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DANGER ZONE - DELETE ACCOUNT */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5">
                      <h3 className="text-xs font-black text-rose-500 uppercase tracking-wider">Danger Zone</h3>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div className="space-y-0.5">
                          <p className="font-black text-slate-850 dark:text-slate-200">Delete SaathApp Account</p>
                          <p className="text-[10px] text-slate-455 font-semibold">Permanently purge your booking orders, wallet balance, and address details.</p>
                        </div>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-sm"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==========================================
                    3G. SETTINGS TAB PANEL
                   ========================================== */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">Settings & Policies</h2>

                    {/* Theme Panel toggle */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{t('appearance_mode')}</h3>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        {[
                          { label: 'Light', icon: Sun, value: 'light' },
                          { label: 'Dark', icon: Moon, value: 'dark' },
                          { label: 'System', icon: Laptop, value: 'system' }
                        ].map((item) => {
                          const Icon = item.icon;
                          const isSelected = theme === item.value;
                          return (
                            <button
                              key={item.value}
                              onClick={() => setTheme(item.value)}
                              className={`flex flex-col items-center gap-2 p-4 border rounded-2xl cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[#6C3BFF] bg-[#6C3BFF]/5 text-[#6C3BFF] dark:bg-[#6C3BFF]/20 dark:text-white'
                                  : 'border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-955/20 hover:border-[#6C3BFF]/50'
                              }`}
                            >
                              <Icon size={16} className="text-[#6C3BFF]" />
                              <span className="font-black uppercase tracking-wider text-[9px]">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Language Settings */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{t('default_language')}</h3>
                      <div className="flex flex-wrap gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-350">
                        {[
                          { code: 'en', label: 'English' },
                          { code: 'hi', label: 'हिन्दी (Hindi)' },
                          { code: 'bn', label: 'বাংলা (Bengali)' },
                          { code: 'te', label: 'తెలుగు (Telugu)' }
                        ].map((lang) => {
                          const isSelected = language === lang.code;
                          return (
                            <button
                              key={lang.code}
                              onClick={() => changeLanguage(lang.code)}
                              className={`px-4.5 py-2 border rounded-xl cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[#6C3BFF] bg-[#6C3BFF]/5 text-[#6C3BFF] dark:bg-[#6C3BFF]/20 dark:text-white'
                                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                              }`}
                            >
                              {lang.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Channels toggles */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Notification Channels</h3>
                      <div className="bg-slate-50 dark:bg-slate-955/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 space-y-3.5 text-xs">
                        {[
                          { label: 'Push Notifications', desc: 'Live tracker overlay alerts on order updates' },
                          { label: 'SMS updates', desc: 'OTP verification links and billing transcripts' },
                          { label: 'Email circulars', desc: 'Promotional discount coupons and survey sheets' },
                          { label: 'Exclusive Offers', desc: 'Occasional seasonal vouchers and points benefits' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4">
                            <div>
                              <p className="font-black text-slate-850 dark:text-slate-250 leading-none">{item.label}</p>
                              <p className="text-[10px] text-slate-455 mt-1 font-semibold">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => alert('Mock: Toggle channel state')}
                              className="relative w-9 h-5 bg-[#6C3BFF] rounded-full cursor-pointer"
                            >
                              <span className="absolute top-0.75 left-0.75 w-3.5 h-3.5 bg-white rounded-full translate-x-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Policy footer links and version */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="flex gap-4 font-bold text-slate-650 dark:text-slate-355">
                        <button onClick={() => alert('Loading terms...')} className="hover:underline cursor-pointer">Terms & Conditions</button>
                        <button onClick={() => alert('Loading privacy...')} className="hover:underline cursor-pointer">Privacy Policy</button>
                      </div>
                      <span className="text-slate-400 font-mono">App Version: v2.4.2 (Production)</span>
                    </div>

                  </div>
                )}

                {activeTab === 'services' && (
                  <ServicesTab
                    bookings={bookings}
                    setBookings={setBookings}
                    walletBalance={walletBalance}
                    setWalletBalance={setWalletBalance}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    orders={orders}
                    setOrders={setOrders}
                    setActiveTab={setActiveTab}
                  />
                )}

                {activeTab === 'wishlist' && (
                  <WishlistTab
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    cart={cart}
                    setCart={setCart}
                  />
                )}

                {activeTab === 'cart' && (
                  <CartTab
                    cart={cart}
                    setCart={setCart}
                    walletBalance={walletBalance}
                    setWalletBalance={setWalletBalance}
                    orders={orders}
                    setOrders={setOrders}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    setActiveTab={setActiveTab}
                  />
                )}

                {activeTab === 'payments' && (
                  <PaymentsTab
                    orders={orders}
                    transactions={transactions}
                    walletBalance={walletBalance}
                    setShowAddMoneyModal={setShowAddMoneyModal}
                  />
                )}

                {activeTab === 'reviews' && (
                  <ReviewsTab
                    bookings={bookings}
                    reviewsList={reviewsList}
                    setReviewsList={setReviewsList}
                  />
                )}

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* ==========================================
          4. MODAL DIALOG POPUPS
         ========================================== */}
      
      {/* 4A. ADD MONEY WALLET MODAL */}
      <AnimatePresence>
        {showAddMoneyModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card p-6 shadow-premium space-y-4"
            >
              <h4 className="text-base font-black text-slate-850 dark:text-white uppercase tracking-wider">Add Money to Wallet</h4>
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                  <input
                    type="number"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    placeholder="Enter amount (e.g. 500)"
                    className="w-full pl-8.5 pr-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-950"
                  />
                </div>
                <div className="flex gap-2 text-xs font-bold">
                  {[100, 500, 1000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAddMoneyAmount(String(v))}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                    >
                      +₹{v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowAddMoneyModal(false)}
                  className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-xl font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAddMoney(addMoneyAmount)}
                  className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white rounded-xl font-bold uppercase cursor-pointer shadow-sm"
                >
                  Proceed
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4B. SAVE ADDRESS MODAL */}
      <AnimatePresence>
        {showAddressModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card p-6 shadow-premium space-y-4"
            >
              <h4 className="text-base font-black text-slate-850 dark:text-white uppercase tracking-wider">
                {editingAddress ? 'Modify Address' : 'Add New Address'}
              </h4>
              
              <div className="space-y-3.5 text-xs">
                {/* Type Selection */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 dark:text-slate-455 uppercase tracking-wide">Location Label</label>
                  <div className="flex gap-2">
                    {['Home', 'Work', 'Other'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setNewAddressType(t)}
                        className={`px-4.5 py-2 border rounded-xl font-bold uppercase cursor-pointer ${
                          newAddressType === t
                            ? 'border-[#6C3BFF] bg-[#6C3BFF]/5 text-[#6C3BFF]'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details Text Area */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 dark:text-slate-455 uppercase tracking-wide">Complete Delivery Details</label>
                  <textarea
                    rows={3}
                    value={newAddressContent}
                    onChange={(e) => setNewAddressContent(e.target.value)}
                    placeholder="Enter house number, building name, street address, area pincode..."
                    className="w-full p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-950 font-semibold"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-xl font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white rounded-xl font-bold uppercase cursor-pointer shadow-sm"
                >
                  Save Address
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4C. LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card p-6 shadow-premium text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-955/20 text-rose-500 border border-rose-200/50 flex items-center justify-center mx-auto">
                <LogOut size={22} className="ml-0.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black text-slate-855 dark:text-white uppercase tracking-wider">Logout</h4>
                <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold leading-relaxed">
                  Are you sure you want to logout?
                </p>
              </div>
              <div className="flex gap-3 justify-center text-xs">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-xl font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase cursor-pointer shadow-sm"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4D. DELETE ACCOUNT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-card p-6 shadow-premium text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-955/20 text-rose-500 border border-rose-200/50 flex items-center justify-center mx-auto">
                <Trash2 size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black text-slate-855 dark:text-white uppercase tracking-wider">Delete Account</h4>
                <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">Warning: Action is Permanent!</p>
                <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold leading-relaxed pt-1">
                  Are you sure you want to delete your SaathApp account? All your transaction history, wallet balance, and orders will be deleted.
                </p>
              </div>
              <div className="flex gap-3 justify-center text-xs">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-xl font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase cursor-pointer shadow-sm"
                >
                  Delete Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ==========================================
// 5. HELPER PROFILE EDIT FORM COMPONENT
// ==========================================
function ProfileForm({ profile, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Female');
  const [dob, setDob] = useState('');

  // Update input values when profile prop loads
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
      setGender(profile.gender || 'Female');
      setDob(profile.dob || '');
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...profile,
      name,
      email,
      gender,
      dob
    });
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-955/20 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 text-xs font-semibold">
      
      {/* Photo Initial */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6C3BFF] to-[#FF5A7A] text-white flex items-center justify-center font-black text-xl shadow-sm">
          <span>{name.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Profile Photo</p>
          <button type="button" onClick={() => alert('Mock: Uploader modal')} className="mt-1 text-[#6C3BFF] font-black uppercase text-[10px] hover:underline cursor-pointer">
            Upload New Photo
          </button>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-655 dark:text-slate-400 uppercase tracking-wide">Full Name</label>
          <input
            type="text"
            value={name}
            disabled={!isEditing}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-955 disabled:bg-slate-100 disabled:text-slate-455 dark:disabled:bg-slate-900"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-655 dark:text-slate-400 uppercase tracking-wide">Email Address</label>
          <input
            type="email"
            value={email}
            disabled={!isEditing}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-955 disabled:bg-slate-100 disabled:text-slate-455 dark:disabled:bg-slate-900"
          />
        </div>

        {/* Mobile (Read Only) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-655 dark:text-slate-400 uppercase tracking-wide">Mobile Number</label>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Read Only</span>
          </div>
          <input
            type="text"
            value={phone}
            disabled
            className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none bg-slate-100 text-slate-455 dark:bg-slate-900"
          />
        </div>

        {/* Gender Selection */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-655 dark:text-slate-400 uppercase tracking-wide">Gender</label>
          <select
            value={gender}
            disabled={!isEditing}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-955 disabled:bg-slate-100 disabled:text-slate-455 dark:disabled:bg-slate-900 font-semibold"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-655 dark:text-slate-400 uppercase tracking-wide">Date of Birth</label>
          <input
            type="date"
            value={dob}
            disabled={!isEditing}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-955 disabled:bg-slate-100 disabled:text-slate-455 dark:disabled:bg-slate-900 font-semibold"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end pt-3">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 border border-slate-250 dark:border-slate-800 hover:bg-slate-100 rounded-xl font-bold uppercase tracking-wider cursor-pointer"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setName(profile.name);
                setEmail(profile.email);
                setGender(profile.gender || 'Female');
                setDob(profile.dob || '');
                setIsEditing(false);
              }}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 rounded-xl font-bold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-sm"
            >
              Save Changes
            </button>
          </>
        )}
      </div>

    </form>
  );
}
