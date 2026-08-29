import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Zap, User, ShoppingCart, Sun, Moon, Bell, Sparkles, Flame, History, MapPin, ChevronDown, Menu, X, LogOut, Download } from 'lucide-react';
import { usePWA } from '../context/PWAContext';
import ThemeLogo from './ThemeLogo';
import { useLanguage } from '../context/LanguageContext';
import { getCustomerMenu } from '../config/customerMenu';
import { useTheme } from "../context/ThemeContext";
import TopNav from './TopNav';
import useScrollLock from '../hooks/useScrollLock';

import { products, subcategories } from '../data/products';
import { mockSaathAppProducts } from '../data/saathAppProducts';

import { useLocationContext } from '../context/LocationContext';

export default function Header({
  cartCount,
  onCartClick,
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
  onVoiceSearchClick,
  onImageSearchClick
}) {
  const { location } = useLocationContext();
  const { resolvedTheme, setTheme } = useTheme();
  const darkMode = resolvedTheme === "dark";
  const toggleDarkMode = () => setTheme(darkMode ? "light" : "dark");
  const { t } = useLanguage();
  const { canInstall, isInstalled, installApp } = usePWA();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCustomerMenuOpen, setIsCustomerMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useScrollLock(isCustomerMenuOpen || showLogoutConfirm);

  const popularSearches = [
    'Gift Set', 'Notebooks', 'Slippers', 'Household Items', 'Diya & Puja', 'Groceries', 'Mobiles', 'Hardware'
  ];

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = window.localStorage.getItem('saathapp_recent_searches');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveRecentSearch = (term) => {
    if (!term) return;
    const filtered = recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase());
    const newRecent = [term, ...filtered].slice(0, 5);
    setRecentSearches(newRecent);
    window.localStorage.setItem('saathapp_recent_searches', JSON.stringify(newRecent));
  };

  const removeRecentSearch = (e, term) => {
    e.stopPropagation();
    const newRecent = recentSearches.filter(s => s !== term);
    setRecentSearches(newRecent);
    window.localStorage.setItem('saathapp_recent_searches', JSON.stringify(newRecent));
  };

  const executeSearch = (term) => {
    saveRecentSearch(term);
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  // Intelligent live suggestion generator
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    if (q === '') {
      setSuggestions([]);
      return;
    }
    const allNames = new Set([
      'Gift Set', 'Chocolate Gift Box', 'Notebooks & Registers', 'School Supplies',
      'Slippers & Sandals', 'Sports Shoes', 'Household Cleaning Items', 'Laundry Detergent',
      'Diya & Lamps', 'Puja Samagri', 'Electrician Service', 'Groceries & Atta',
      '5G Mobiles', 'Hardware Tools', 'SaathApp Official Merchandise',
      'Electrician', 'Plumber', 'Hardware', 'AC Servicing', 'Grocery', 'Spiritual Puja', 'Murtis', 'Diyas'
    ]);
    
    // Add product names
    if (products) products.forEach(p => p.name && allNames.add(p.name));
    if (mockSaathAppProducts) mockSaathAppProducts.forEach(p => p.name && allNames.add(p.name));
    
    // Add subcategories
    if (subcategories) Object.values(subcategories).flat().forEach(sub => sub.name && allNames.add(sub.name));
    
    const terms = Array.from(allNames);
    const filtered = terms.filter(t => t.toLowerCase().includes(q)).slice(0, 8);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchFocused(false);
      searchRef.current?.querySelector('input')?.blur();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      executeSearch(searchQuery.trim());
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white dark:bg-slate-950 border-b border-theme-border shadow-sm">
        <div className="saath-container">

          {/* ========================================================= */}
          {/* MOBILE HEADER */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-3 py-3 sm:hidden">
            {/* Top Row: Logo & Icons */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1 px-1 sm:px-2">
              <Link
                to="/"
                onClick={(event) => {
                  if (window.location.pathname === '/') {
                    event.preventDefault();
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }
                }}
                aria-label="Go to Home"
                className="shrink-0"
              >
                <div className="h-7 w-24 cursor-pointer">
                  <ThemeLogo />
                </div>
              </Link>

              {/* Right Group: Icons */}
              <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-auto">

                <button
                  onClick={onCartClick}
                  className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none relative text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0"
                >
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white font-bold text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigate('/profile')}
                  className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                >
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name || 'Profile'} className="w-7 h-7 rounded-full object-cover border border-slate-300" />
                  ) : (
                    <User size={22} />
                  )}
                </button>

                <button
                  onClick={() => setIsCustomerMenuOpen(true)}
                  className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

            {/* Mobile Row 2: Delivery */}
            <div className="px-2">
              <button
                type="button"
                onClick={() => navigate('/location')}
                className="flex flex-col items-start justify-center cursor-pointer"
              >
                <div className="flex items-center gap-1 text-slate-900 dark:text-white font-black text-sm tracking-tight">
                  <Zap size={14} className="fill-slate-900 dark:fill-white text-slate-900 dark:text-white" />
                  <span>20 min</span>
                </div>
                <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 mt-0.5">
                  <span className="truncate text-[11px] font-medium text-slate-900 dark:text-white">{location || 'Green Park, New Delhi'}</span>
                  <ChevronDown size={14} className="text-slate-500" />
                </div>
              </button>
            </div>

            {/* Mobile Row 3: Full-width Search Bar */}
            <div ref={searchRef} className="relative z-[60] w-full">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder='Search for "banana"'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleKeyDown}
                    className="input-field pl-10 pr-10"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary pointer-events-none">
                    <Search size={18} />
                  </div>
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </form>

              {/* Suggestions Dropdown (Mobile) */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-surface border border-theme-border rounded-xl shadow-lg overflow-hidden z-50 text-left"
                  >
                    {searchQuery.trim() === '' ? (
                      <div className="p-4">
                        {recentSearches.length > 0 && (
                          <div className="mb-4">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between mb-2">
                              <span className="flex items-center gap-1.5"><History size={12} /> Recent Searches</span>
                              <button onClick={(e) => { e.stopPropagation(); setRecentSearches([]); window.localStorage.removeItem('saathapp_recent_searches') }} className="text-primary hover:underline text-[9px]">Clear Recent Searches</button>
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {recentSearches.map((term, i) => (
                                <div key={i} className="flex items-center bg-slate-100 dark:bg-slate-800 py-1 px-2.5 rounded-full transition-colors">
                                  <button onClick={() => executeSearch(term)} className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mr-1">{term}</button>
                                  <button onClick={(e) => removeRecentSearch(e, term)} className="text-slate-400 hover:text-red-500"><X size={10} /></button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                            <Flame size={12} className="text-amber-500" /> Popular Searches
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {popularSearches.map((term, i) => (
                              <button key={i} onClick={() => executeSearch(term)} className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1 px-2.5 rounded-full flex items-center gap-1 transition-all">
                                <Sparkles size={10} className="text-amber-500" />{term}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-2 max-h-64 overflow-y-auto">
                        {suggestions.length > 0 ? (
                          suggestions.map((suggestion, i) => (
                            <button key={i} onClick={() => executeSearch(suggestion)} className="w-full px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0">
                              <Search size={13} className="text-slate-400 shrink-0" />
                              <span>{suggestion}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-2.5 text-xs text-slate-500 italic">
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
          {/* DESKTOP & TABLET HEADER */}
          {/* ========================================================= */}
          <div className="hidden sm:flex items-center justify-between h-[84px] gap-4 xl:gap-6 py-2">
            {/* Logo & Location */}
            <div className="flex items-center gap-4 xl:gap-8 shrink-0">
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
                  className="h-10 w-36 cursor-pointer"
                >
                  <ThemeLogo />
                </motion.div>
              </Link>

              {/* Deliver To */}
              <button
                type="button"
                onClick={() => navigate('/location')}
                className="flex flex-col items-start gap-0.5 cursor-pointer shrink-0 mt-1"
              >
                <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black text-lg tracking-tight">
                  <Zap size={18} className="fill-slate-900 dark:fill-white text-slate-900 dark:text-white" />
                  <span>20 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">DELIVER TO</span>
                  <span className="max-w-[180px] truncate text-xs font-semibold text-slate-900 dark:text-white">{location || 'Green Park, New Delhi'}</span>
                  <ChevronDown size={14} className="text-slate-500" />
                </div>
              </button>
            </div>

            {/* Desktop Search Bar */}
            <div ref={searchRef} className="flex-1 relative z-[60] mx-4 lg:mx-8">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder='Search for "banana"'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-11 pl-11 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-surface text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <Search size={18} />
                  </div>
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </form>

              {/* Suggestions Dropdown (Desktop) */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-surface border border-theme-border rounded-xl shadow-lg overflow-hidden z-50 text-left"
                  >
                    {searchQuery.trim() === '' ? (
                      <div className="p-5">
                        {recentSearches.length > 0 && (
                          <div className="mb-4">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between mb-2.5">
                              <span className="flex items-center gap-1.5"><History size={13} /> Recent Searches</span>
                              <button onClick={(e) => { e.stopPropagation(); setRecentSearches([]); window.localStorage.removeItem('saathapp_recent_searches') }} className="text-primary hover:underline text-[10px]">Clear Recent Searches</button>
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {recentSearches.map((term, i) => (
                                <div key={i} className="flex items-center bg-slate-100 dark:bg-slate-800 py-1 px-3 rounded-full transition-colors">
                                  <button onClick={() => executeSearch(term)} className="text-xs font-medium text-slate-700 dark:text-slate-300 mr-2">{term}</button>
                                  <button onClick={(e) => removeRecentSearch(e, term)} className="text-slate-400 hover:text-red-500"><X size={12} /></button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                            <Flame size={13} className="text-amber-500" /> Popular Searches
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {popularSearches.map((term, i) => (
                              <button key={i} onClick={() => executeSearch(term)} className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 py-1.5 px-3 rounded-full flex items-center gap-1 transition-all">
                                <Sparkles size={11} className="text-amber-500" />{term}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-2.5 max-h-80 overflow-y-auto">
                        {suggestions.length > 0 ? (
                          suggestions.map((suggestion, i) => (
                            <button key={i} onClick={() => executeSearch(suggestion)} className="w-full px-4.5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0">
                              <Search size={14} className="text-slate-400 shrink-0" />
                              <span>{suggestion}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-slate-500 italic">
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
            <div className="flex items-center gap-3 xl:gap-5 shrink-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={24} className="text-amber-400" /> : <Moon size={24} />}
              </motion.button>

              <button onClick={() => navigate('/profile?tab=notifications')} className="relative text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>

              {canInstall && !isInstalled && (
                <button
                  onClick={installApp}
                  className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <Download size={16} />
                  <span>Install App</span>
                </button>
              )}

              <button
                onClick={onCartClick}
                className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none relative text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0"
                title="Cart"
              >
                <ShoppingCart size={26} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white font-bold text-[11px] min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              >
                {user?.photo ? (
                  <img src={user.photo} alt={user.name || 'Profile'} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                ) : (
                  <User size={26} />
                )}
              </button>

              <button
                onClick={() => setIsCustomerMenuOpen(true)}
                className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0"
                title="Open customer dashboard menu"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
        <TopNav />
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
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-surface shadow-2xl z-[60] flex flex-col border-l border-theme-border"
            >
              {/* Drawer Header with Quick Utilities */}
              <div className="flex items-center justify-between p-4 border-b border-theme-border bg-page/50">
                <div className="flex items-center gap-2">
                  {/* Theme Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl text-theme-secondary bg-surface border border-theme-border shadow-xs cursor-pointer"
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  >
                    {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
                  </motion.button>

                  {/* Notification Bell */}
                  <button onClick={() => { setIsCustomerMenuOpen(false); navigate('/profile?tab=notifications'); }} className="relative p-2 rounded-xl text-theme-secondary bg-surface border border-theme-border shadow-xs cursor-pointer">
                    <Bell size={17} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
                  </button>
                </div>

                <button
                  onClick={() => setIsCustomerMenuOpen(false)}
                  className="p-1.5 text-theme-secondary hover:text-theme-secondary  bg-page rounded-lg transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {/* SaathApp Plus Highlight Item */}
                <button
                  onClick={() => {
                    setIsCustomerMenuOpen(false);
                    navigate('/plus');
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 mb-2 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all cursor-pointer bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:border-amber-500"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-amber-500 text-sm">✦</span>
                    <span className="font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                      SaathApp Plus
                    </span>
                  </div>
                  <span className="bg-amber-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black">
                    NEW
                  </span>
                </button>

                {getCustomerMenu(t).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => {
                        setIsCustomerMenuOpen(false);
                        if (item.tab === 'cart') {
                          if (onCartClick) onCartClick();
                        } else {
                          navigate('/customer/dashboard', { state: { activeTab: item.tab } });
                        }
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all cursor-pointer text-theme-secondary hover:bg-page hover:text-[#6C3BFF] dark:hover:text-white"
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setIsCustomerMenuOpen(false);
                    setShowLogoutConfirm(true);
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

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-surface border border-theme-border rounded-2xl p-6 shadow-xl text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 border border-rose-200/50 dark:border-rose-500/20 flex items-center justify-center mx-auto">
                <LogOut size={22} className="ml-0.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Logout</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Are you sure you want to logout?
                </p>
              </div>
              <div className="flex gap-3 justify-center text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-3 border border-theme-border hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold uppercase cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-600 active:scale-[0.98] text-white rounded-xl font-bold uppercase cursor-pointer transition-all shadow-sm"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
