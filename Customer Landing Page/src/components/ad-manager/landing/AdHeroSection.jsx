import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, ShieldCheck, Infinity, Plus, Monitor, Megaphone, TrendingUp, Sparkles } from 'lucide-react';

export default function AdHeroSection({ onCreateAds }) {
  const features = [
    { icon: Eye, label: 'More Visibility', desc: 'Reach the right audience', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { icon: TrendingUp, label: 'More Customers', desc: 'Increase traffic to your store', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
    { icon: ShieldCheck, label: 'Fixed Pricing', desc: 'Pay once & get max exposure', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { icon: Infinity, label: 'Unlimited Clicks', desc: 'No extra charges for click', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  ];

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 relative z-10 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-emerald-600 dark:text-emerald-400 font-bold text-lg sm:text-xl tracking-tight">
                Grow Your Business With
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Advertise <br className="hidden lg:block" />
                <span className="text-emerald-600 dark:text-emerald-500">With Us</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Promote your products, store or brand on SaathApp and reach thousands of local customers every day. <br className="hidden sm:block" />
                <span className="text-slate-900 dark:text-slate-200 font-bold">Fixed pricing. Unlimited clicks. No hidden charges.</span>
              </p>
            </motion.div>

            {/* Create Ads CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={onCreateAds}
                className="group relative flex items-center gap-2.5 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg shadow-[0_8px_20px_rgb(5,150,105,0.3)] hover:shadow-[0_10px_25px_rgb(5,150,105,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Plus size={16} strokeWidth={3} className="text-white" />
                </div>
                Create Ads
              </button>
            </motion.div>

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start space-y-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${f.bg} ${f.color} shadow-sm`}>
                    <f.icon size={24} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1 text-center lg:text-left">
                    <h4 className={`text-sm font-bold ${f.color}`}>{f.label}</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-lg mx-auto lg:max-w-none"
          >
            {/* Custom SVG / CSS Illustration */}
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-[2.5rem] bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/20 dark:to-emerald-900/10 border border-emerald-100/50 dark:border-emerald-800/30 flex items-center justify-center p-8 overflow-hidden">
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
              
              <div className="relative w-full max-w-sm mx-auto">
                {/* Desktop Monitor Mockup */}
                <div className="relative bg-white dark:bg-slate-900 rounded-t-2xl rounded-b border-[6px] border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-video">
                  {/* Browser Bar */}
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 flex items-center px-2 gap-1.5 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <div className="ml-2 h-2 w-24 bg-white dark:bg-slate-900 rounded-sm" />
                  </div>
                  {/* Fake UI Content */}
                  <div className="p-2 h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex flex-col">
                    {/* Fake Header */}
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                      <div className="w-12 h-2 bg-emerald-500 rounded-sm" />
                      <div className="flex gap-1">
                        <div className="w-4 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                        <div className="w-4 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                      </div>
                    </div>
                    {/* Fake Banner Ad */}
                    <div className="flex-1 rounded-lg bg-gradient-to-br from-emerald-500/80 to-emerald-700/80 p-2 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50" />
                      <Sparkles size={16} className="text-white mb-1" />
                      <h3 className="text-[10px] font-black text-white uppercase tracking-widest text-center leading-tight mb-1 relative z-10">
                        YOUR AD <br /> CAN BE HERE
                      </h3>
                      <div className="px-2 py-0.5 bg-amber-400 text-amber-950 text-[6px] font-bold rounded shadow-sm relative z-10">
                        Advertise Now
                      </div>
                    </div>
                  </div>
                </div>
                {/* Monitor Stand */}
                <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 mx-auto rounded-b shadow-inner border-x border-slate-400 dark:border-slate-600" />
                <div className="w-24 h-1.5 bg-slate-300 dark:bg-slate-600 mx-auto rounded-full mt-0 shadow-md" />

                {/* Floating Megaphone Badge */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -right-6 -bottom-6 sm:-right-8 sm:-bottom-6 z-20"
                >
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-[0_10px_30px_rgb(5,150,105,0.4)] flex flex-col items-center justify-center p-3 text-center border-4 border-white dark:border-slate-950">
                      <Megaphone size={28} className="text-white mb-1 drop-shadow-md" />
                      <span className="text-white text-[9px] sm:text-[10px] font-bold leading-tight drop-shadow-sm">
                        Promote<br/>Your Business<br/><span className="text-amber-300">Today!</span>
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
