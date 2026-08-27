import React from 'react';
import lightLogo from '../assets/saathapp-logo.png';
import darkLogo from '../assets/saathapp-logo-dark.png';

export default function ThemeLogo({ className = "w-full h-full" }) {
  return (
    <div className={`relative ${className}`}>
      <img src={lightLogo} className="absolute inset-0 w-full h-full object-contain dark:hidden" alt="SaathApp Logo" />
      <img src={darkLogo} className="absolute inset-0 w-full h-full object-contain hidden dark:block" alt="SaathApp Logo" />
    </div>
  );
}
