import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Smartphone, Download, CheckCircle, Star, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { usePWA } from '../context/PWAContext';

export default function DownloadApp() {
  const location = useLocation();
  const { canInstall, isInstalled, installApp } = usePWA();

  // Hide mobile app banner on Wholesale pages as mobile app is currently not available
  const isWholesaleRoute = location.pathname.toLowerCase().includes('/wholesale') || 
                           location.pathname.toLowerCase().includes('/wholesaler');

  if (isWholesaleRoute) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40 overflow-hidden relative">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute w-80 h-80 rounded-full bg-primary/20 blur-3xl -top-10 -left-10" />
        <div className="absolute w-80 h-80 rounded-full bg-accent/20 blur-3xl -bottom-10 -right-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-primary rounded-card text-white p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-premium">
          
          {/* Glass Overlay Details */}
          <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[1px] pointer-events-none" />

          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left space-y-6 z-10">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-white/15 backdrop-blur-md border border-white/10 text-xs font-bold text-secondary">
              📱 Mobile App
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Get the SaathApp<br />
              <span className="text-secondary">Super App Now</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-xl font-normal leading-relaxed">
              Order daily fresh groceries, building materials, local hardware and book professional plumbing, AC service or electrician saathis instantly. Experience lightning fast checkout, real-time live tracking, and secured cash-on-delivery payments.
            </p>

            {/* List specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-secondary shrink-0" />
                <span>Superfast 10-Min Groceries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-secondary shrink-0" />
                <span>Verified Local Service Pros</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-secondary shrink-0" />
                <span>District Hardware & Farm Supplies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-secondary shrink-0" />
                <span>Live Map Order Delivery Tracking</span>
              </div>
            </div>

            {/* Downloader Action */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              {isInstalled ? (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-6 rounded-btn shadow-lg">
                  <Check size={20} className="text-secondary" />
                  <span className="font-bold">App Installed</span>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={installApp}
                  disabled={!canInstall}
                  className={`flex items-center gap-3 py-3 px-8 rounded-btn border border-white/10 transition-colors shadow-lg cursor-pointer ${
                    canInstall 
                      ? 'bg-slate-900 hover:bg-slate-950 text-white' 
                      : 'bg-slate-900/50 text-white/50 cursor-not-allowed'
                  }`}
                >
                  <Download size={22} className={canInstall ? 'text-secondary' : 'text-slate-500'} />
                  <div className="text-left leading-none">
                    <span className="text-[10px] text-white/70 block font-bold uppercase tracking-wider">
                      {canInstall ? 'Fast & Lightweight' : 'Not Supported'}
                    </span>
                    <span className="text-base font-extrabold block mt-0.5">Install App</span>
                  </div>
                </motion.button>
              )}
            </div>
          </div>

          {/* Right Phone Mockup Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-80 sm:h-96">
            
            {/* Phone Body Frame Container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-56 h-80 sm:w-64 sm:h-96 bg-slate-900 rounded-[36px] p-2.5 border-4 border-slate-950 shadow-2xl relative flex flex-col overflow-hidden"
            >
              {/* Speaker Notch */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-950 rounded-full z-30" />

              {/* Simulated App Screen */}
              <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-[28px] overflow-hidden flex flex-col p-3 relative text-slate-800 dark:text-slate-200">
                {/* Simulated Header */}
                <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-850 text-[10px] font-bold text-slate-500">
                  <span className="text-[9px] font-extrabold text-primary">SaathApp</span>
                  <span>10:24 AM</span>
                </div>

                {/* Simulated Categories Slider */}
                <div className="mt-2.5 space-y-1.5">
                  <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider text-left">Services</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Zap', 'Hammer', 'Tractor'].map((icon, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-850 p-2 rounded-xl text-center flex flex-col items-center">
                        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                          {i === 0 ? '⚡' : i === 1 ? '🔨' : '🚜'}
                        </div>
                        <span className="text-[7px] font-bold block mt-1">
                          {i === 0 ? 'Electrician' : i === 1 ? 'Hardware' : 'Agri'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Live Order Notification */}
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-4 left-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-lg text-left flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-[8px] font-extrabold text-slate-400 block uppercase tracking-wider">Live Tracker</span>
                    <span className="text-[9px] font-bold text-slate-800 dark:text-slate-200 block">Saathi arriving in 3 mins</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
