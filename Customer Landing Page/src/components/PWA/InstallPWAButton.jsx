import React, { useState, useEffect } from 'react';

const InstallPWAButton = ({ className, children }) => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Detect if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      // Track: install CTA viewed
      console.log('Track: install CTA viewed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track installation complete
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      console.log('Track: installation completed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isInstalled) {
      // Logic to open app or redirect to home if already in it
      console.log('App is already installed');
      return;
    }

    if (!installPrompt) {
      // Fallback: Directly download the Android APK if PWA prompt isn't available
      console.log('PWA prompt unavailable, falling back to direct APK download.');
      const link = document.createElement('a');
      link.href = '/SaathApp-Demo.apk';
      link.download = 'SaathApp.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    console.log('Track: install CTA clicked');
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const defaultClasses = "bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 w-full md:w-auto shadow-md";
  const buttonClass = className || defaultClasses;

  if (isInstalled) {
    return (
      <button className={buttonClass}>
        {children || "Open SaathApp"}
      </button>
    );
  }

  return (
    <button 
      onClick={handleInstallClick}
      className={buttonClass}
    >
      {children || "↓ Install SaathApp"}
    </button>
  );
};

export default InstallPWAButton;
