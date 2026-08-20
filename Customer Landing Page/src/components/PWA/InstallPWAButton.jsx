import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
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
      // Installation unavailable (iOS or unsupported)
      alert('To install, tap the Share icon in your browser and select "Add to Home Screen".');
      return;
    }

    console.log('Track: install CTA clicked');
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  if (isInstalled) {
    return (
      <button className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 w-full md:w-auto">
        Open SaathApp
      </button>
    );
  }

  if (!installPrompt && !isSupported) {
    return (
      <button 
        onClick={() => alert("To install the SaathApp PWA, use Chrome/Edge and select 'Install' from the URL bar, or 'Add to Home Screen' on mobile Safari.")}
        className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg w-full md:w-auto shadow-md"
      >
        Install SaathApp
      </button>
    );
  }

  return (
    <button 
      onClick={handleInstallClick}
      className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 w-full md:w-auto"
    >
      ↓ Install SaathApp
    </button>
  );
};

export default InstallPWAButton;
