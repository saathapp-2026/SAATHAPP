import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Globe, Menu, ChevronDown, Check, Sun, Moon, Sparkles, User, LogOut } from 'lucide-react';

export default function Topbar({
  sidebarOpen,
  setSidebarOpen,
  _activeTab,
  darkMode,
  toggleDarkMode,
  notifications,
  onLogout
}) {
  const [langDropdown, setLangDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  
  const [greeting, setGreeting] = useState('Good Morning');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Dynamic greeting based on Indian Standard Time (local time)
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting('Good Morning');
    else if (hrs < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Formatting date
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    setCurrentTime(new Date().toLocaleDateString('en-US', options));
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shadow-sm">
      
      {/* Left side: Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="text-left hidden sm:block">
          <h1 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <span>{greeting}, Rahul Kumar</span>
            <Sparkles size={14} className="text-secondary" />
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{currentTime}</p>
        </div>
      </div>

      {/* Middle: Search bar */}
      <div className="flex-1 max-w-xs md:max-w-md relative hidden md:block">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search bookings, invoices, customers..."
          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl outline-none focus:border-primary/50 dark:focus:border-primary/50 transition-all text-slate-700 dark:text-slate-200"
        />
      </div>

      {/* Right side: Quick widgets */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        
        {/* Dark Mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setLangDropdown(!langDropdown)}
            onBlur={() => setTimeout(() => setLangDropdown(false), 200)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            <Globe size={14} />
            <span className="hidden sm:inline">{selectedLang}</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
          
          <AnimatePresence>
            {langDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-1.5 w-32 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl shadow-premium py-1 text-left z-55"
              >
                {['English', 'हिन्दी (Hindi)', 'বাংলা (Bengali)'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang.split(' ')[0]);
                      setLangDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-750 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span>{lang}</span>
                    {selectedLang === lang.split(' ')[0] && <Check size={10} className="text-primary" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Bell */}
        <button
          className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 relative cursor-pointer"
          onClick={() => alert('View notifications via the Sidebar menu option.')}
        >
          <Bell size={18} />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white border border-white dark:border-slate-900 rounded-full text-[9px] font-black flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Profile menu dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            onBlur={() => setTimeout(() => setProfileDropdown(false), 200)}
            className="flex items-center gap-1.5 cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100">
              <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 text-xs font-bold uppercase">
                RK
              </div>
            </div>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
          
          <AnimatePresence>
            {profileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl shadow-premium py-1 text-left z-55"
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <p className="text-xs font-black text-slate-800 dark:text-slate-200">Rahul Kumar</p>
                  <p className="text-[10px] text-slate-450 truncate">rahulkumar@saathapp.com</p>
                </div>
                <button
                  onClick={() => alert('Edit profile settings via the profile tab.')}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                >
                  <User size={14} className="text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-955 flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-slate-800/40"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </header>
  );
}
