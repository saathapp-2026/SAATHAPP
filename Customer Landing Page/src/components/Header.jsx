import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, ShoppingCart, Sun, Moon, Bell, Sparkles, Flame, History, MapPin, ChevronDown, Menu, X, LogOut, Download } from 'lucide-react';
import { usePWA } from '../context/PWAContext';
import SaathAppLogo from '../assets/saathapp-logo.jpeg';
import { useLanguage } from '../context/LanguageContext';
import { getCustomerMenu } from '../config/customerMenu';

export default function Header({
  cartCount,
  onCartClick,
  location,
  _onLocationClick,
  _onLocationChange,
  onSearch,
  onLogin,
  onSignup,
  _onProfile,
  user,
  isAuthenticated = false,
  _onCartPage,
  _onOrdersPage,
  _onWishlistPage,
  _onSettingsPage,
  onLogout,
  darkMode,
  toggleDarkMode,
  onVoiceSearchClick,
  onImageSearchClick
}) {
  const { t } = useLanguage();
  const { canInstall, isInstalled, installApp } = usePWA();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCustomerMenuOpen, setIsCustomerMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const popularSearches = [
    'Electrician', 'Plumber', 'Electricals', 'Hardware', 'AC Servicing', 'Groceries'
  ];

  const recentSearches = [];

  // Simulated live suggestion generator
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    const terms = [
      'Electrician', 'Plumbing Service', 'Hardware Tools', 'AC Servicing',
      'Painting Service', 'Grocery Store', 'Electrical Parts'
    ];
    const filtered = terms.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    setSuggestions(filtered);
  }, [searchQuery]);

  // Close search suggestions on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchFocused(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-xs">
        <div className="w-full px-3 sm:px-6 lg:px-8">

          {/* ========================================================= */}
          {/* MOBILE HEADER (Blinkit / Swiggy / Zomato style for < sm) */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-2 py-2 sm:hidden">
            {/* Mobile Row 1: Logo (Left) + Primary Actions: Cart, Profile, Hamburger Menu (Right) */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={(event) => {
                  if (window.location.pathname === '/') {
                    event.preventDefault();
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }
                }}
                aria-label="Go to Home"
              >
                <div className="h-7 w-24 cursor-pointer">
                  <img
                    src={SaathAppLogo}
                    alt="SaathApp Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </Link>

              {/* Mobile Right Action Icons */}
              <div className="flex items-center gap-2">
                {/* Cart Button */}
                <motion.button
                  onClick={onCartClick}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t('my_cart') || 'Cart'}
                  title={t('my_cart') || 'Cart'}
                  className="relative p-1.5 rounded-btn bg-gradient-primary text-white shadow-sm flex items-center justify-center"
                >
                  <ShoppingCart size={17} />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1.5 -right-1.5 bg-secondary-dark text-white border border-primary font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Profile Icon */}
                <button
                  onClick={() => navigate('/profile')}
                  className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0"
                  title="Open profile"
                >
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name || 'Profile'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-black">{(user?.name || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </button>

                {/* Hamburger Menu Toggle */}
                <button
                  onClick={() => setIsCustomerMenuOpen(true)}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors rounded-btn cursor-pointer"
                  title="Open menu"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Row 2: Deliver To (Single Compact Line) */}
            <button
              type="button"
              onClick={() => navigate('/location')}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 text-xs font-semibold py-0.5 hover:opacity-80 text-left cursor-pointer"
            >
              <MapPin size={14} className="text-primary shrink-0" />
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Deliver to:</span>
              <span className="truncate text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[200px]">
                {location || 'Select Location...'}
              </span>
              <ChevronDown size={13} className="text-slate-400 shrink-0" />
            </button>

            {/* Mobile Row 3: Full-width Search Bar */}
            <div ref={searchRef} className="relative z-40 w-full">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder={t('search') + '...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full h-9 pl-9 pr-9 rounded-btn border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs text-xs"
                  />

                  {/* Search Icon */}
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400">
                    <Search size={15} />
                  </div>

                  {/* Voice Search trigger */}
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <motion.button
                      type="button"
                      onClick={onVoiceSearchClick}
                      whileHover={{ scale: 1.1, color: '#1565C0' }}
                      className="p-1 text-slate-400 hover:text-accent rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                      title="Voice Search"
                    >
                      <Mic size={15} />
                    </motion.button>
                  </div>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-card shadow-premium overflow-hidden z-50 text-left"
                  >
                    {searchQuery.trim() === '' ? (
                      <div className="p-4">
                        <div className="mb-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                            <History size={12} /> Recent Searches
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {recentSearches.map((term, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setSearchQuery(term);
                                  onSearch(term);
                                  setIsSearchFocused(false);
                                }}
                                className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 py-1 px-2.5 rounded-full transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                            <Flame size={12} className="text-amber-500" /> Popular Searches
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {popularSearches.map((term, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setSearchQuery(term);
                                  onSearch(term);
                                  setIsSearchFocused(false);
                                }}
                                className="text-[11px] font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 py-1 px-2.5 rounded-full flex items-center gap-1 transition-all"
                              >
                                <Sparkles size={10} className="text-amber-500" />
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-2 max-h-64 overflow-y-auto">
                        {suggestions.length > 0 ? (
                          suggestions.map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                onSearch(suggestion);
                                setIsSearchFocused(false);
                              }}
                              className="w-full px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center gap-2.5 transition-colors border-b border-slate-100/50 dark:border-slate-900/50 last:border-b-0"
                            >
                              <Search size={13} className="text-slate-400 shrink-0" />
                              <span>{suggestion}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-2.5 text-xs text-slate-400 italic">
                            No direct match. Press Enter to search "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DESKTOP & TABLET HEADER (Preserved 100% for sm: and above) */}
          {/* ========================================================= */}
          <div className="hidden sm:flex items-center justify-between h-[72px] gap-4 py-1.5">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/"
                onClick={(event) => {
                  if (window.location.pathname === '/') {
                    event.preventDefault();
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }
                }}
                aria-label="Go to Home"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-32 cursor-pointer"
                >
                  <img
                    src={SaathAppLogo}
                    alt="SaathApp Logo"
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Deliver To */}
            <button
              type="button"
              onClick={() => navigate('/location')}
              className="flex items-center gap-2 rounded-btn border border-slate-200/70 bg-slate-100/90 px-3 py-2 text-slate-700 shadow-xs transition hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200 cursor-pointer shrink-0"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-light shrink-0">
                <MapPin size={15} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-400">Deliver to</div>
                <div className="max-w-[150px] md:max-w-[200px] truncate text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">{location || 'Select Location...'}</div>
              </div>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-400 shrink-0" />
            </button>

            {/* Desktop Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-[380px] md:max-w-[400px] relative z-40">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder={t('search') + '...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full h-11 pl-10 pr-10 rounded-btn border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-sm"
                  />

                  {/* Search Icon */}
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400">
                    <Search size={18} />
                  </div>

                  {/* Voice Search trigger */}
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <motion.button
                      type="button"
                      onClick={onVoiceSearchClick}
                      whileHover={{ scale: 1.1, color: '#1565C0' }}
                      className="p-1.5 text-slate-400 hover:text-accent rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                      title="Voice Search"
                    >
                      <Mic size={18} />
                    </motion.button>
                  </div>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-card shadow-premium overflow-hidden z-50 text-left"
                  >
                    {searchQuery.trim() === '' ? (
                      <div className="p-5">
                        <div className="mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                            <History size={13} /> Recent Searches
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((term, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setSearchQuery(term);
                                  onSearch(term);
                                  setIsSearchFocused(false);
                                }}
                                className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-1.5 px-3 rounded-full transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                            <Flame size={13} className="text-amber-500" /> Popular Searches
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {popularSearches.map((term, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setSearchQuery(term);
                                  onSearch(term);
                                  setIsSearchFocused(false);
                                }}
                                className="text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 hover:bg-primary/5 hover:border-primary/30 dark:hover:bg-primary/10 py-1.5 px-3 rounded-full flex items-center gap-1 transition-all"
                              >
                                <Sparkles size={11} className="text-amber-500" />
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-2.5 max-h-80 overflow-y-auto">
                        {suggestions.length > 0 ? (
                          suggestions.map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                onSearch(suggestion);
                                setIsSearchFocused(false);
                              }}
                              className="w-full px-4.5 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center gap-3 transition-colors border-b border-slate-100/50 dark:border-slate-900/50 last:border-b-0"
                            >
                              <Search size={14} className="text-slate-400 shrink-0" />
                              <span>{suggestion}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-slate-400 italic">
                            No direct match. Press Enter to search "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-btn text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors shrink-0"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
              </motion.button>

              <button className="relative p-2 rounded-btn text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors shrink-0">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
              </button>

              {/* Install App Button */}
              {canInstall && !isInstalled && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={installApp}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-btn transition-colors"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Install App</span>
                  <span className="sm:hidden">Install</span>
                </motion.button>
              )}

              {!isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={onLogin}
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 hover:bg-slate-100 dark:bg-slate-900/70 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 rounded-btn transition-all"
                >
                  <span>{t('login')}</span>
                </motion.button>
              )}

              {!isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={onSignup}
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-gradient-primary hover:bg-gradient-primary/95 rounded-btn shadow-glow-primary transition-all"
                >
                  <span>{t('signup')}</span>
                </motion.button>
              )}

              <motion.button
                onClick={onCartClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('my_cart') || 'Cart'}
                title={t('my_cart') || 'Cart'}
                className="relative p-2 rounded-btn bg-gradient-primary hover:bg-gradient-primary/95 text-white shadow-glow-primary transition-all select-none flex items-center justify-center shrink-0"
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-secondary-dark text-white border border-primary font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                onClick={() => navigate('/profile')}
                className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden cursor-pointer border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 shrink-0"
                title="Open profile"
              >
                {user?.photo ? (
                  <img src={user.photo} alt={user.name || 'Profile'} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-black">{(user?.name || 'U').charAt(0).toUpperCase()}</span>
                )}
              </button>

              <button
                onClick={() => setIsCustomerMenuOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors rounded-btn cursor-pointer shrink-0"
                title="Open customer dashboard menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Customer Dashboard Navigation Drawer */}
      <AnimatePresence>
        {isCustomerMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomerMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 shadow-2xl z-[60] flex flex-col border-l border-slate-200 dark:border-slate-800"
            >
              {/* Drawer Header with Quick Utilities */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  {/* Theme Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs cursor-pointer"
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  >
                    {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
                  </motion.button>

                  {/* Notification Bell */}
                  <button className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs cursor-pointer">
                    <Bell size={17} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
                  </button>
                </div>

                <button
                  onClick={() => setIsCustomerMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {getCustomerMenu(t).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => {
                        setIsCustomerMenuOpen(false);
                        navigate('/customer/dashboard', { state: { activeTab: item.tab } });
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-[#6C3BFF] dark:hover:text-white"
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setIsCustomerMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-xs font-black uppercase tracking-wider text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-955/20 text-left transition-all cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>{t('logout')}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
