import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../../Header';
import Footer from '../../Footer';

export default function WholesaleLayout({
  children,
  cartCount = 0,
  location = 'Green Park, New Delhi',
  onCartClick = () => {},
  onLocationClick = () => {},
  onSearch = () => {},
  onLogin = () => {},
  onSignup = () => {},
  onProfile = () => {},
  onCartPage = () => {},
  onOrdersPage = () => {},
  onWishlistPage = () => {},
  onSettingsPage = () => {},
  onLogout = () => {},
  user = null,
  isAuthenticated = false,
  darkMode = false,
  toggleDarkMode = () => {},
  onVoiceSearchClick = () => {},
  onImageSearchClick = () => {},
  showBackLink = true,
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onProfile={onProfile}
        user={user}
        isAuthenticated={isAuthenticated}
        onCartPage={onCartPage}
        onOrdersPage={onOrdersPage}
        onWishlistPage={onWishlistPage}
        onSettingsPage={onSettingsPage}
        onLogout={onLogout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={onVoiceSearchClick}
        onImageSearchClick={onImageSearchClick}
      />

      <main id="main-content" className="flex-1">
        {showBackLink && (
          <div className="border-b border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-soft transition hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Home
              </Link>
            </div>
          </div>
        )}
        {children}
      </main>

      <Footer />
    </div>
  );
}
