import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function DownloadApp() {
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

            {/* Downloader App Store Blocks & QR */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              
              {/* Stores Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-slate-900 hover:bg-slate-950 text-white py-2.5 px-5 rounded-btn border border-white/10 transition-colors shadow-lg cursor-pointer"
                >
                  {/* Custom Play Store SVG Mark */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M5,3.23C5.18,3.05 5.5,3 5.83,3.17L18.82,10.67C19.46,11.04 19.46,11.96 18.82,12.33L5.83,19.83C5.5,20 5.18,19.95 5,19.77V3.23M17.06,11.5L5.75,4.95V18.05L17.06,11.5Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[9px] text-white/50 block font-bold uppercase tracking-wider">Get it on</span>
                    <span className="text-sm font-extrabold block mt-0.5">Google Play</span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-slate-900 hover:bg-slate-950 text-white py-2.5 px-5 rounded-btn border border-white/10 transition-colors shadow-lg cursor-pointer"
                >
                  {/* Custom Apple Store SVG Mark */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,22 9.09,22.05C7.81,22.1 6.8,20.77 5.96,19.58C4.26,17.15 2.96,12.67 4.7,9.65C5.57,8.14 7.13,7.18 8.83,7.15C10.13,7.13 11.37,8 12.17,8C12.97,8 14.47,7.1 16.03,7.26C16.69,7.29 18.55,7.53 19.74,9.27C19.64,9.33 17.84,10.38 17.86,12.5C17.89,15.03 20.06,15.89 20.1,15.9C20.08,15.96 19.74,17.13 18.71,19.5M15.97,4.86C16.63,4.07 17.07,2.97 16.95,1.87C16,1.91 14.9,2.47 14.25,3.23C13.69,3.87 13.2,4.98 13.35,6.05C14.4,6.13 15.42,5.53 15.97,4.86Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[9px] text-white/50 block font-bold uppercase tracking-wider">Download on the</span>
                    <span className="text-sm font-extrabold block mt-0.5">App Store</span>
                  </div>
                </motion.button>
              </div>

              {/* QR Divider */}
              <div className="hidden sm:block h-10 w-px bg-white/20" />

              {/* Simulated QR Code */}
              <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-card border border-white/10">
                <div className="w-16 h-16 bg-white p-1 rounded-lg">
                  {/* Simulated QR SVG */}
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100">
                    <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="5" y="5" width="15" height="15" fill="white" />
                    <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="80" y="5" width="15" height="15" fill="white" />
                    <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                    <rect x="5" y="80" width="15" height="15" fill="white" />
                    {/* Random QR pixels */}
                    <rect x="35" y="10" width="10" height="10" fill="currentColor" />
                    <rect x="55" y="10" width="10" height="20" fill="currentColor" />
                    <rect x="10" y="45" width="20" height="10" fill="currentColor" />
                    <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                    <rect x="70" y="45" width="15" height="15" fill="currentColor" />
                    <rect x="45" y="75" width="10" height="15" fill="currentColor" />
                    <rect x="75" y="75" width="15" height="15" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-left text-xs font-bold leading-tight">
                  <span className="block text-secondary">Scan to Download</span>
                  <span className="text-white/60 block mt-0.5">iOS & Android</span>
                </div>
              </div>

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
