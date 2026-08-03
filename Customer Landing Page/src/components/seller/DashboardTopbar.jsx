import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bell, Globe, Menu, ChevronDown, Sun, Moon, User, Settings, LogOut, X,
  CreditCard, HelpCircle, Building2, CheckCheck,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { resolveDashboardSearch } from '../../config/sellerDashboardSearch';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
} from '../../services/sellerNotificationService';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
];

export default function DashboardTopbar({ seller, onLogout, onMenuClick }) {
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(getNotifications);
  const notifRef = useRef(null);
  const langRef = useRef(null);
  const profileRef = useRef(null);

  const darkMode = resolvedTheme === 'dark';
  const unread = getUnreadCount();

  const refreshNotifications = useCallback(() => {
    setNotifications(getNotifications());
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (langRef.current && !langRef.current.contains(e.target)) setShowLang(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const path = resolveDashboardSearch(searchQuery);
    navigate(path);
    setSearchQuery('');
  };

  const handleMarkRead = (id) => {
    markNotificationRead(id);
    refreshNotifications();
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    refreshNotifications();
  };

  const currentLang = LANGUAGES.find((l) => l.code === language)?.label || 'English';

  const profileLinks = [
    { label: 'Profile', icon: User, path: '/seller/dashboard/settings' },
    { label: 'Business Profile', icon: Building2, path: '/seller/dashboard/settings' },
    { label: 'Membership', icon: CreditCard, path: '/seller/dashboard/membership' },
    { label: 'Billing', icon: CreditCard, path: '/seller/dashboard/payments' },
    { label: 'Settings', icon: Settings, path: '/seller/dashboard/settings' },
    { label: 'Help', icon: HelpCircle, path: '/seller/dashboard/support' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <form onSubmit={handleSearch} className="flex-1 max-w-md relative" role="search">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, customers, reports..."
            aria-label="Search dashboard"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </form>

        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setTheme(darkMode ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => { setShowLang(!showLang); setShowNotifications(false); setShowProfile(false); }}
              className="flex items-center gap-1 p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Change language"
              aria-expanded={showLang}
            >
              <Globe size={18} />
              <span className="hidden md:inline">{currentLang}</span>
              <ChevronDown size={14} />
            </button>
            {showLang && (
              <div className="absolute right-0 mt-1 w-40 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50" role="menu">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    role="menuitem"
                    onClick={() => { changeLanguage(lang.code); setShowLang(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800 ${language === lang.code ? 'text-emerald-600 font-medium' : ''}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => { setShowNotifications(!showNotifications); setShowLang(false); setShowProfile(false); }}
              className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ''}`}
              aria-expanded={showNotifications}
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center" aria-hidden="true">
                  {unread}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-1 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50" role="dialog" aria-label="Notifications">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-semibold text-sm">Notifications</span>
                  <div className="flex items-center gap-2">
                    {unread > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 focus:outline-none focus:underline"
                      >
                        <CheckCheck size={14} />
                        Mark all read
                      </button>
                    )}
                    <button type="button" onClick={() => setShowNotifications(false)} aria-label="Close notifications">
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-slate-500 text-center">No notifications yet</p>
                  ) : (
                    notifications.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => handleMarkRead(n.id)}
                        className={`w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800/50 ${!n.read ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}
                      >
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>
                        <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => { setShowProfile(!showProfile); setShowLang(false); setShowNotifications(false); }}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Profile menu"
              aria-expanded={showProfile}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-semibold text-sm" aria-hidden="true">
                {(seller?.fullName || seller?.email || 'S')[0].toUpperCase()}
              </div>
              <span className="hidden md:block text-sm font-medium max-w-[120px] truncate">
                {seller?.fullName || seller?.email}
              </span>
              <ChevronDown size={14} className="hidden md:block text-slate-400" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-1 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50" role="menu">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-semibold truncate">{seller?.fullName}</p>
                  <p className="text-xs text-slate-500 truncate">{seller?.email}</p>
                </div>
                {profileLinks.map(({ label, icon: Icon, path }) => (
                  <button
                    key={label}
                    type="button"
                    role="menuitem"
                    onClick={() => { navigate(path); setShowProfile(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800"
                  >
                    <Icon size={16} /> {label}
                  </button>
                ))}
                <button
                  type="button"
                  role="menuitem"
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 focus:outline-none focus:bg-red-50 dark:focus:bg-red-950/30 border-t border-slate-200 dark:border-slate-800 mt-1"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
