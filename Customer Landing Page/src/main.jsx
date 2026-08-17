import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n/i18n.js';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { PWAProvider } from './context/PWAContext.jsx';
import PWAInstallModal from './components/PWAInstallModal.jsx';

// Handle Vite dynamic import preload errors (e.g., stale deployment chunks)
window.addEventListener('vite:preloadError', (event) => {
  const lastReload = parseInt(sessionStorage.getItem('chunk-error-last-reload') || '0', 10);
  const now = Date.now();
  if (now - lastReload > 10000) {
    sessionStorage.setItem('chunk-error-last-reload', now.toString());
    event.preventDefault(); // Prevent default error logging/handling
    
    // Attempt to clear SW cache if possible to get fresh assets
    if (window.caches) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      }).finally(() => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <PWAProvider>
              <App />
              <PWAInstallModal />
            </PWAProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
