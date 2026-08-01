import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Store, Timer, HelpCircle } from 'lucide-react';

export default function LocationBar({ 
  location, 
  pincode, 
  onLocationClick, 
  onDetectGPS 
}) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 py-2.5 shadow-sm text-slate-600 dark:text-slate-300 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        
        {/* Left Side: Address Details & GPS Trigger */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-slate-400">Current Location:</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
              <MapPin size={13} className="text-primary" />
              {location || 'Not Selected'} 
              {pincode ? ` - ${pincode}` : ''}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          {/* GPS Detect trigger button */}
          <motion.button
            onClick={onDetectGPS}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-light font-bold transition-colors border border-primary/10"
          >
            <Navigation size={12} className="animate-pulse" />
            <span>Detect GPS</span>
          </motion.button>

          {/* Manual change address */}
          <button 
            onClick={onLocationClick}
            className="text-slate-400 hover:text-primary font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            Change Address
          </button>
        </div>

        {/* Right Side: Delivery speed and Store counts */}
        <div className="flex items-center gap-4 sm:gap-6 font-medium text-[11px] sm:text-xs">
          {/* Estimated delivery speed */}
          <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 py-1 px-2.5 rounded-full border border-green-100/50 dark:border-green-950/50">
            <Timer size={14} className="text-green-600 dark:text-green-400" />
            <span>Delivery: <strong className="font-extrabold text-green-800 dark:text-green-300">12 Mins</strong> (Superfast)</span>
          </div>

          {/* Nearby Stores Indicator */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Store size={14} className="text-accent" />
            <span>Nearby Stores: <strong className="font-extrabold text-slate-800 dark:text-slate-200">18 Active</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
}
