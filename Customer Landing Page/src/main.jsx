import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n/i18n.js';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { PWAProvider } from './context/PWAContext.jsx';
import { MembershipProvider } from './context/MembershipContext.jsx';
import PWAInstallModal from './components/PWAInstallModal.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { LocationProvider } from './context/LocationContext.jsx';

// Handle Vite dynamic import preload errors (e.g., stale deployment chunks)
window.addEventListener('vite:preloadError', async (event) => {
  const lastReload = parseInt(sessionStorage.getItem('chunk-error-last-reload') || '0', 10);
  const now = Date.now();
  if (now - lastReload > 10000) {
    sessionStorage.setItem('chunk-error-last-reload', now.toString());
    event.preventDefault(); // Prevent default error logging/handling
    
    // Unregister service workers and clear caches to force fresh network request
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      } catch (e) {
        console.error('SW unregister failed', e);
      }
    }
    if (window.caches) {
      try {
        const names = await caches.keys();
        for (const name of names) {
          await caches.delete(name);
        }
      } catch (e) {
        console.error('Cache clear failed', e);
      }
    }
    // Append a query param to strictly bypass browser cache for index.html
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('v', Date.now().toString());
    window.location.href = newUrl.toString();
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <PWAProvider>
              <MembershipProvider>
                <LocationProvider>
                  <CartProvider>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'missing-client-id'}><App /></GoogleOAuthProvider>
                    <PWAInstallModal />
                  </CartProvider>
                </LocationProvider>
              </MembershipProvider>
            </PWAProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
