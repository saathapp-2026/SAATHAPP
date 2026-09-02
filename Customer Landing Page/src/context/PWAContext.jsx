import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PWAContext = createContext(null);

export function PWAProvider({ children }) {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[PWA] Development mode');
      console.log('[PWA] Service Worker disabled');
      
      // Cleanup stale service workers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister();
            console.log('[PWA] Development mode: Unregistered stale service worker.');
          }
        });
      }
      // Cleanup old caches
      if ('caches' in window) {
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            console.log(`[PWA] Development mode: Cleared cache ${key}`);
            return caches.delete(key);
          }));
        });
      }
    }

    // Check if app is installed
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsInstalled(mediaQuery.matches || window.navigator.standalone === true);

    const handleDisplayModeChange = (e) => {
      setIsInstalled(e.matches);
    };
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      if (import.meta.env.DEV) {
        console.log('[PWA] beforeinstallprompt received');
      }
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
    setIsIOS(isIosDevice && isSafari);

    return () => {
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (isIOS && !isInstalled) {
      if (import.meta.env.DEV) console.log('[PWA] iOS installation fallback');
      setShowIOSPrompt(true);
      return;
    }

    if (installPromptEvent) {
      installPromptEvent.prompt();
      const { outcome } = await installPromptEvent.userChoice;
      
      if (outcome === 'accepted') {
        setInstallPromptEvent(null);
      }
    } else {
      // Graceful fallback when beforeinstallprompt is missing but user clicked install
      toast.success('To install this app, please use your browser\'s "Add to Home Screen" or "Install" option from the menu.') }
  };

  const closeIOSPrompt = () => {
    setShowIOSPrompt(false);
  };

  return (
    <PWAContext.Provider value={{ 
      isInstalled, 
      canInstall: !isInstalled, // Do not hide just because beforeinstallprompt is missing
      installApp,
      showIOSPrompt,
      closeIOSPrompt
    }}>
      {children}
    </PWAContext.Provider>
  );
}

export const usePWA = () => useContext(PWAContext);
