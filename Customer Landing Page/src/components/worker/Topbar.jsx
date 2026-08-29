import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Globe, Menu, ChevronDown, Check, Sun, Moon, Sparkles, User, Settings, LogOut
} from 'lucide-react';

export default function Topbar({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  toggleDarkMode,
  notifications,
  onLogout,
  onNavigateTab,
  searchQuery = '',
  onSearchChange,
}) {
  
  const [langDropdown, setLangDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [greeting, setGreeting] = useState('Good Morning');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting('Good Morning');
    else if (hrs < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentTime(new Date().toLocaleDateString('en-IN', options));
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 dark:border-slate-800/80 bg-white/70 backdrop-blur-xl py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-page"
        >
          <Menu size={20} />
        </button>

        <div className="text-left hidden sm:block min-w-0">
          <h1 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5 truncate">
            {greeting}, Worker
            <Sparkles size={14} className="text-secondary shrink-0" />
          </h1>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">{currentTime}</p>
        </div>
      </div>

      <div className="flex-1 max-w-md relative hidden md:block">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search jobs, customers, earnings..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-slate-700 dark:text-slate-200 shadow-sm"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-white/80 transition-colors"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setLangDropdown(!langDropdown)}
            onBlur={() => setTimeout(() => setLangDropdown(false), 200)}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200/60 hover:bg-white/80 text-xs font-bold text-slate-600 dark:text-slate-300"
          >
            <Globe size={14} />
            <span className="hidden sm:inline">{selectedLang}</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          <AnimatePresence>
            {langDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-1.5 w-36 bg-white/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-premium py-1 z-50"
              >
                {['English', 'Hindi', 'Bengali'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-page flex items-center justify-between"
                  >
                    {lang}
                    {selectedLang === lang && <Check size={10} className="text-primary" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab?.('notifications')}
          className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-white/80 relative"
        >
          <Bell size={18} />
          {unreadNotifications > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-0.5 bg-danger text-white border border-white dark:border-slate-900 rounded-full text-[9px] font-black flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdown(!profileDropdown)}
            onBlur={() => setTimeout(() => setProfileDropdown(false), 200)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-primary/15 shadow-sm bg-primary flex items-center justify-center text-white font-black text-sm">
              SW
            </div>
            <ChevronDown size={12} className="text-slate-400 hidden sm:block" />
          </button>

          <AnimatePresence>
            {profileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-1.5 w-52 bg-white/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-premium py-1 z-50"
              >
                <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-black text-slate-800 dark:text-white">Service Worker</p>
                  <p className="text-[10px] text-slate-500 truncate">Pending account</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onNavigateTab?.('profile');
                    setProfileDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-page flex items-center gap-2"
                >
                  <User size={14} /> My Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigateTab?.('settings');
                    setProfileDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-page flex items-center gap-2"
                >
                  <Settings size={14} /> Settings
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800"
                >
                  <LogOut size={14} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
