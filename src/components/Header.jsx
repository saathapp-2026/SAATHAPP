import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Mic, Camera, ShoppingCart, User, Menu, Sun, Moon, Bell, ArrowRight, X, Sparkles, Flame, History,
  Heart, Package, Settings, LogOut, MapPin, ChevronDown
} from 'lucide-react';
import SaathAppLogo from '../assets/saathapp-logo.jpeg';

export default function Header({ 
  cartCount, 
  onCartClick, 
  location, 
  onLocationClick,
  onLocationChange,
  onSearch, 
  onLogin,
  onSignup,
  onProfile,
  user,
  isAuthenticated = false,
  onCartPage,
  onOrdersPage,
  onWishlistPage,
  onSettingsPage,
  onLogout,
  darkMode, 
  toggleDarkMode,
  onVoiceSearchClick,
  onImageSearchClick
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const popularSearches = [
    'Electrician', 'Tomato 1kg', 'Ultratech Cement', 'AC Servicing', 'Cables', 'Ghee'
  ];

  const recentSearches = [
    'Fresh milk', 'Screwdriver set', 'Plumber'
  ];

  // Simulated live suggestion generator
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    const terms = [
      'Alphonso Mangoes', 'AC Repair Service', 'Amul Cow Ghee 1L', 'Asian Paints Distemper',
      'Agriculture NPK Fertilizer', 'Amul Butter', 'Anchor Electrical Switched', 
      'Cables Heavy Duty', 'Cement Bags 50kg', 'Electrician Fitting', 'Emergency Plumber'
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
    <header className="sticky top-0 z-50 w-full transition-all duration-300 glass-premium border-b border-slate-200/80 dark:border-slate-800/80 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
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

          <button
            type="button"
            onClick={() => navigate('/location')}
            className="hidden md:flex items-center gap-2 rounded-btn border border-slate-200/70 bg-slate-100/90 px-3.5 py-2.5 text-slate-700 shadow-sm transition hover:shadow-md dark:border-slate-700/70 dark:bg-slate-800/70 dark:text-slate-200"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin size={16} />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Deliver to</div>
              <div className="max-w-[220px] truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{location || 'Select Location...'}</div>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Amazon style Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative z-40">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder='Search for "Electrician", "Tomatoes", "Cement", "Cables"...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full h-11 sm:h-12 pl-11 pr-24 rounded-btn border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                />
                
                {/* Search Icon */}
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search size={18} className="dark:text-slate-500" />
                </div>

                {/* Voice & Image Search triggers */}
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
                  <motion.button
                    type="button"
                    onClick={onImageSearchClick}
                    whileHover={{ scale: 1.1, color: '#2E7D32' }}
                    className="p-1.5 text-slate-400 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    title="Image Search"
                  >
                    <Camera size={18} />
                  </motion.button>
                </div>
              </div>
            </form>

            {/* Suggestions Dropdown (Glassmorphic Amazon Style) */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-card shadow-premium overflow-hidden z-50 text-left"
                >
                  {/* Empty state: popular & recent */}
                  {searchQuery.trim() === '' ? (
                    <div className="p-4 sm:p-5">
                      {/* Recent searches */}
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

                      {/* Popular searches */}
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
                    // Live match results
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

          {/* Right Header Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-btn text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </motion.button>

            {/* Notification bell */}
            <button className="relative p-2 rounded-btn text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
            </button>

            {!isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={onLogin}
                className="hidden sm:flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 hover:bg-slate-100 dark:bg-slate-900/70 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 rounded-btn transition-all"
              >
                <span>Login</span>
              </motion.button>
            )}

            {!isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={onSignup}
                className="hidden sm:flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-gradient-primary hover:bg-gradient-primary/95 rounded-btn shadow-glow-primary transition-all"
              >
                <span>Sign Up</span>
              </motion.button>
            )}

            {/* Partner Button (Urban Company / Meesho feel) */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="hidden lg:flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-primary dark:text-primary-light bg-primary/5 hover:bg-primary/10 border border-primary/20 dark:border-primary/10 rounded-btn transition-all"
            >
              <span>Become Partner</span>
              <ArrowRight size={12} />
            </motion.button>

            {/* Zepto/Blinkit Style Cart Button */}
            <motion.button
              onClick={onCartClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gradient-primary hover:bg-gradient-primary/95 text-white py-2.5 px-4 sm:px-5 rounded-btn font-bold text-sm shadow-glow-primary transition-all select-none"
            >
              <div className="relative">
                <ShoppingCart size={18} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2.5 -right-2.5 bg-secondary-dark text-white border border-primary font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden sm:inline">My Cart</span>
            </motion.button>

            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onLogout}
                className="hidden sm:flex items-center gap-1.5 rounded-btn border border-slate-200 bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span>Logout</span>
              </motion.button>
            )}

            {/* User Profile Avatar — direct navigation (no dropdown) */}
            <div className="relative">
              <button
                onClick={() => onProfile()}
                className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden cursor-pointer border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 shrink-0"
                title="Open profile"
              >
                {user?.photo ? (
                  <img src={user.photo} alt={user.name || 'Profile'} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-black">{(user?.name || 'U').charAt(0).toUpperCase()}</span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
