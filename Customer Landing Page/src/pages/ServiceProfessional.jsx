import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowLeft, CheckCircle2, Clock, Wallet, TrendingUp, UserCheck, BookOpen, ShieldCheck, MapPin, Plus, Minus, ChevronUp, Wrench, Sparkles, Briefcase, ArrowRight, Lock, UploadCloud, FileText, Check, Search, Shield, Zap, Info, Hammer, User, Clipboard, ThumbsUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServiceProfessionalPage({
  _cartItems,
  cartCount,
  _cartTotal,
  location,
  _pincode,
  _selectedCategory,
  _searchQuery,
  darkMode,
  _isCartOpen,
  _isVoiceModalOpen,
  _isImageModalOpen,
  _isLocationModalOpen,
  _isGpsLoading,
  _isListening,
  _isUploading,
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  onProfile,
  onCartPage,
  onOrdersPage,
  onWishlistPage,
  onSettingsPage,
  toggleDarkMode,
  onVoiceSearchClick,
  onImageSearchClick,
  _onDetectGPS,
  _onAddToCart,
  _onCategorySelect,
  onBack
}) {
  const navigate = useNavigate();
  // Page configurations and states
  const [activeSubTab, setActiveSubTab] = useState('hero');
  const [journeyTab, setJourneyTab] = useState('joining'); // 'booking', 'professional', 'joining'
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyFormSubmitted, _setApplyFormSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    category: 'Electrician',
    experience: '1-3 Years',
    terms: true
  });

  const sectionRefs = {
    hero: useRef(null),
    whyjoin: useRef(null),
    journey: useRef(null),
    services: useRef(null),
    benefits: useRef(null),
    faq: useRef(null)
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Become a Service Professional | SaathApp';
    
    // SEO Meta updates
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Become a verified service professional with SaathApp. Join India\'s trusted hyperlocal service network, earn more on your terms, and grow your local business.');
    }
  }, []);

  // Update active sub-navigation link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const offsetHeight = ref.current.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSubTab(key);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      const topOffset = sectionRefs[sectionId].current.offsetTop - 120;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
      setActiveSubTab(sectionId);
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => prev.map((item, i) => (i === index ? !item : item)));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowApplyModal(false);
    navigate('/professional/register');
  };

  // Badges array for Section 1 Hero illustration
  const occupations = [
    { name: 'Electrician', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10 dark:bg-amber-500/15' },
    { name: 'Plumber', icon: Wrench, color: 'text-blue-500', bg: 'bg-blue-500/10 dark:bg-blue-500/15' },
    { name: 'Cleaner', icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-500/10 dark:bg-emerald-500/15' },
    { name: 'Painter', icon: Sparkles, color: 'text-rose-500', bg: 'bg-rose-500/10 dark:bg-rose-500/15' },
    { name: 'Carpenter', icon: Hammer, color: 'text-orange-500', bg: 'bg-orange-500/10 dark:bg-orange-500/15' },
    { name: 'AC Tech', icon: ShieldCheck, color: 'text-cyan-500', bg: 'bg-cyan-500/10 dark:bg-cyan-500/15' },
    { name: 'Mechanic', icon: Wrench, color: 'text-purple-500', bg: 'bg-purple-500/10 dark:bg-purple-500/15' },
    { name: 'Agri Expert', icon: Sparkles, color: 'text-green-500', bg: 'bg-green-500/10 dark:bg-green-500/15' },
    { name: 'Builder', icon: Briefcase, color: 'text-yellow-500', bg: 'bg-yellow-500/10 dark:bg-yellow-500/15' },
    { name: 'Rider', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-500/10 dark:bg-indigo-500/15' }
  ];

  // Why Join Cards (Section 2)
  const whyJoinReasons = [
    { title: 'Flexible Working Hours', text: 'Work on your own terms. Log in whenever you want, set your availability calendar, and accept bookings.', icon: Clock, color: 'from-amber-400 to-orange-500' },
    { title: 'Weekly Payments', text: 'No waiting cycles. Your weekly earnings are processed and settled directly to your registered bank account.', icon: Wallet, color: 'from-emerald-400 to-green-600' },
    { title: 'More Customers', text: 'Get direct leads and bookings from nearby neighborhoods. No need to spend money advertising your skills.', icon: TrendingUp, color: 'from-blue-400 to-indigo-600' },
    { title: 'Verified Profile', text: 'Get an official SaathApp verification badge to build instant trust and get higher order priorities.', icon: UserCheck, color: 'from-cyan-400 to-teal-600' },
    { title: 'Training Support', text: 'Boost your skills with workshops, customer etiquette coaching, and tools training provided by experts.', icon: BookOpen, color: 'from-purple-400 to-indigo-700' },
    { title: 'Digital Business Profile', text: 'Manage reviews, display your credentials, share portfolio pictures, and attract high-paying jobs.', icon: FileText, color: 'from-pink-400 to-rose-600' },
    { title: 'Secure Payments', text: 'Every booking is secure. Escrow billing ensures payments are secured prior to work commencement.', icon: Lock, color: 'from-violet-500 to-purple-800' },
    { title: 'Work Near Your Location', text: 'Define your service territory radius so you only receive jobs nearby, cutting travel cost and time.', icon: MapPin, color: 'from-rose-400 to-red-600' }
  ];

  // Services Covered Grid (Section 4)
  const servicesCovered = [
    { name: 'Electrician', icon: Zap, count: '1,200+ Jobs Daily', bg: 'from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 border-amber-200/50 dark:border-amber-900/30' },
    { name: 'Plumber', icon: Wrench, count: '950+ Jobs Daily', bg: 'from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200/50 dark:border-blue-900/30' },
    { name: 'Cleaner', icon: Sparkles, count: '1,400+ Jobs Daily', bg: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 border-emerald-200/50 dark:border-emerald-900/30' },
    { name: 'Painter', icon: Sparkles, count: '450+ Projects Weekly', bg: 'from-rose-50 to-rose-100/50 dark:from-rose-950/20 dark:to-rose-900/10 border-rose-200/50 dark:border-rose-900/30' },
    { name: 'Carpenter', icon: Hammer, count: '820+ Jobs Daily', bg: 'from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10 border-orange-200/50 dark:border-orange-900/30' },
    { name: 'AC Repair', icon: ShieldCheck, count: '1,800+ Bookings Daily', bg: 'from-cyan-50 to-cyan-100/50 dark:from-cyan-950/20 dark:to-cyan-900/10 border-cyan-200/50 dark:border-cyan-900/30' },
    { name: 'Appliance Repair', icon: Info, count: '750+ Jobs Daily', bg: 'from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-200/50 dark:border-purple-900/30' },
    { name: 'Construction', icon: Briefcase, count: '300+ Contractors active', bg: 'from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10 border-yellow-200/50 dark:border-yellow-900/30' },
    { name: 'Agriculture', icon: Sparkles, count: '500+ Experts registered', bg: 'from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 border-green-200/50 dark:border-green-900/30' },
    { name: 'Hardware', icon: Hammer, count: '600+ Outlets connected', bg: 'from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/10 border-indigo-200/50 dark:border-indigo-900/30' },
    { name: 'Electrical', icon: Zap, count: '900+ Vendors active', bg: 'from-teal-50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/10 border-teal-200/50 dark:border-teal-900/30' },
    { name: 'Home Repair', icon: Wrench, count: '1,100+ Daily requests', bg: 'from-slate-50 to-slate-100/50 dark:from-slate-800/20 dark:to-slate-900/10 border-slate-200/50 dark:border-slate-850/40' }
  ];

  // Benefits detailed (Section 5)
  const premiumBenefits = [
    { title: 'Earn More', highlight: 'Up to ₹50,000 /mo', desc: 'SaathApp partners enjoy high volume leads and premium pricing models that reward experienced, top-rated service professionals.', progress: 92, progressColor: 'bg-primary' },
    { title: 'Weekly Payments', highlight: 'Every Tuesday Settlement', desc: 'All online collections, tips, and service margins are directly credited to your bank account weekly without any delay.', progress: 100, progressColor: 'bg-emerald-500' },
    { title: 'Flexible Schedule', highlight: 'Be your own boss', desc: 'Switch your status to active/inactive whenever you like. Choose your service hours and work dynamically as per convenience.', progress: 85, progressColor: 'bg-amber-500' },
    { title: 'Grow Your Business', highlight: 'Free organic reach', desc: 'Establish an online reputation. Build continuous repeat business from local customers who can request you directly.', progress: 78, progressColor: 'bg-blue-500' },
    { title: 'Professional Profile', highlight: 'High-end storefront', desc: 'Stand out from standard listing pages with a premium bio page displaying credentials, reviews, photos, and ratings.', progress: 88, progressColor: 'bg-purple-500' },
    { title: 'Verified Badge', highlight: 'Premium trust indicator', desc: 'Undergo simple verification processes to display the safety-check badge. Increase client callback rates by up to 60%.', progress: 95, progressColor: 'bg-cyan-500' },
    { title: 'Ratings & Reviews', highlight: 'Reward excellence', desc: 'Deliver exceptional services to secure 5-star ratings. High ratings prioritize your visibility in search algorithms.', progress: 90, progressColor: 'bg-yellow-500' },
    { title: 'Priority Customer Support', highlight: 'Dedicated partner helpline', desc: 'Enjoy round-the-clock priority support via call or chat for resolving booking disputes, GPS issues, or payment status.', progress: 96, progressColor: 'bg-rose-500' }
  ];

  return (
    <div className="min-h-screen bg-page dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Header component integration */}
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={onProfile}
        onCartPage={onCartPage}
        onOrdersPage={onOrdersPage}
        onWishlistPage={onWishlistPage}
        onSettingsPage={onSettingsPage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={onVoiceSearchClick}
        onImageSearchClick={onImageSearchClick}
      />

      {/* Main content body with back button at top */}
      <main className="flex-1 pb-16">
        
        {/* Back navigation & Page title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <motion.button
            onClick={onBack}
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </motion.button>
        </div>

        {/* SECTION 1: HERO BANNER */}
        <section
          id="hero"
          ref={sectionRefs.hero}
          className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-tr from-brand-600/10 via-brand-50 to-brand-100/30 dark:from-slate-950 dark:via-slate-900 dark:to-brand-950/20 border-b border-slate-100 dark:border-slate-900/60"
        >
          {/* Animated floating icons */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className="absolute top-1/4 left-10 text-primary-light/20 text-4xl"
            >
              🔧
            </motion.div>
            <motion.div
              animate={{ y: [15, -15, 15], scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 text-secondary-light/20 text-5xl"
            >
              ⚡
            </motion.div>
            <motion.div
              animate={{ x: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
              className="absolute top-1/3 right-12 text-blue-500/10 text-3xl"
            >
              🧹
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Information */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary-900/30 border border-primary/20">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-primary dark:text-primary-light">SaathApp Partner Program</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-[1.1] tracking-tight">
                Become a Verified <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent">Service Professional</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                Grow your income by providing trusted services through SaathApp. Join the hyperlocal super network trusted by thousands of local customers.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.button
                  onClick={() => navigate('/professional/register')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3.5 px-8 rounded-btn bg-brand-600 text-white font-extrabold text-sm sm:text-base cursor-pointer hover:bg-brand-700 shadow-premium hover:shadow-glow-primary transition-colors flex items-center gap-2 border-0"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/professional/login')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3.5 px-8 rounded-btn border border-slate-200 bg-white/40 text-slate-700 dark:text-slate-200 font-extrabold text-sm sm:text-base cursor-pointer hover:bg-white/70 transition-colors"
                >
                  Partner Login
                </motion.button>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/60  max-w-lg">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">₹50K+</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Monthly Earnings</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">24 Hours</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Quick Approval</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">Weekly</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Bank Payouts</p>
                </div>
              </div>
            </div>

            {/* Right Col: Professions Illustration Grid */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md h-[400px] flex items-center justify-center">
                {/* Visual backdrop rings */}
                <div className="absolute w-72 h-72 rounded-full border border-dashed border-primary/20 dark:border-primary/10 animate-spin-slow" />
                <div className="absolute w-56 h-56 rounded-full border border-dashed border-secondary/20 dark:border-secondary/15 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                
                {/* Glass core sphere */}
                <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-primary/10 to-brand-500/20 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-md shadow-premium border border-white/30  flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center shadow-premium border border-slate-100 dark:border-slate-800">
                    <Briefcase size={28} className="text-primary" />
                  </div>
                  <span className="text-xs font-black text-slate-600 dark:text-slate-300 mt-3 uppercase tracking-wider">Join as Partner</span>
                </div>

                {/* Badges positioned dynamically */}
                {occupations.map((occ, idx) => {
                  // Polar coordinate distribution for circles
                  const angle = (idx * 360) / occupations.length;
                  const radius = 145; // pixel distance from center
                  const x = Math.round(radius * Math.cos((angle * Math.PI) / 180));
                  const y = Math.round(radius * Math.sin((angle * Math.PI) / 180));
                  const IconComponent = occ.icon;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                      className={`absolute px-2.5 py-1.5 rounded-full border flex items-center gap-1.5 shadow-premium backdrop-blur-xl cursor-default transition-all ${occ.bg}`}
                    >
                      <IconComponent size={12} className={occ.color} />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">{occ.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* STICKY SUB-NAVIGATION */}
        <nav className="sticky top-[68px] z-30 w-full border-y border-slate-200/60 dark:border-slate-800 bg-white/80 backdrop-blur-xl transition-all shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start overflow-x-auto scrollbar-none gap-8 py-3.5">
            {[
              { id: 'hero', name: 'Overview' },
              { id: 'whyjoin', name: 'Why Join Us' },
              { id: 'journey', name: 'Our Processes' },
              { id: 'services', name: 'Services Covered' },
              { id: 'benefits', name: 'Partner Benefits' },
              { id: 'faq', name: 'FAQs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors relative pb-0.5 ${
                  activeSubTab === tab.id ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.name}
                {activeSubTab === tab.id && (
                  <motion.div
                    layoutId="activeSubTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* SECTION 2: WHY JOIN SAATHAPP */}
        <section
          id="whyjoin"
          ref={sectionRefs.whyjoin}
          className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">SaathApp Advantage</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white mt-1">
              Why Join SaathApp Network?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-lg mx-auto">
              Empowering local technicians and contractors with premium infrastructure and continuous earnings.
            </p>

            {/* Why Join Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {whyJoinReasons.map((reason, idx) => {
                const IconComponent = reason.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="bg-surface border border-slate-200/50 dark:border-slate-850 p-6 rounded-card shadow-soft hover:shadow-premium hover:border-slate-300 dark:hover:border-slate-800 text-left flex flex-col justify-between group transition-all"
                  >
                    <div className="space-y-4">
                      {/* Icon header */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${reason.color} text-white flex items-center justify-center shadow-md`}>
                        <IconComponent size={20} />
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-primary text-xs flex-shrink-0">✔</span>
                          <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100">
                            {reason.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-3">
                          {reason.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: TIMELINE JOURNEY MAP */}
        <section
          id="journey"
          ref={sectionRefs.journey}
          className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-950/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Onboarding & Operations</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white mt-1">
              Your Journey as a SaathApp Partner
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-lg mx-auto">
              How the hyperlocal ecosystem operates from onboarding to daily booking settlements.
            </p>

            {/* Timelines tabs selector */}
            <div className="flex justify-center mt-10">
              <div className="inline-flex p-1 bg-surface border border-slate-200/80 dark:border-slate-800 rounded-full shadow-sm max-w-full overflow-x-auto scrollbar-none">
                {[
                  { id: 'joining', label: '1. Onboarding Process' },
                  { id: 'booking', label: '2. Customer Booking Flow' },
                  { id: 'professional', label: '3. Professional Workday' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setJourneyTab(item.id)}
                    className={`px-4 sm:px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors relative ${
                      journeyTab === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {journeyTab === item.id && (
                      <motion.div
                        layoutId="activeJourneyTabBackground"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Timelines Panels */}
            <div className="mt-12 max-w-4xl mx-auto text-left relative">
              <AnimatePresence mode="wait">
                
                {/* JOURNEY TAB 1: JOINING PROCESS */}
                {journeyTab === 'joining' && (
                  <motion.div
                    key="joining"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800"
                  >
                    {[
                      { step: 'Step 1', title: 'Signup / Login', desc: 'Download the partner application or click Apply Now. Create a secure partner account using your mobile number and password.', icon: User },
                      { step: 'Step 2', title: 'Basic Details', desc: 'Provide your full name, working contact info, age, and verified residential address.', icon: Info },
                      { step: 'Step 3', title: 'Choose Service Categories', desc: 'Select the categories of services you wish to offer. You can choose multiple based on your experience and skill sets.', icon: Briefcase },
                      { step: 'Step 4', title: 'Upload Documents', desc: 'Upload high-resolution copies of Aadhaar Card, PAN Card, Profile Photo, and Experience Certificates (Optional but recommended).', docs: ['Aadhaar Card', 'PAN Card', 'Profile Photo', 'Experience Proof (Optional)'], icon: UploadCloud },
                      { step: 'Step 5', title: 'Set Working Area & Details', desc: 'Define your serving radius (in kilometers), working time preferences, hourly rates, and weekly availability.', icon: MapPin },
                      { step: 'Step 6', title: 'Verification & Activation', desc: 'SaathApp team reviews credentials and performs standard background checks. Your profile gets approved and a Verified Badge is activated within 24-48 hours.', icon: Shield }
                    ].map((step, idx) => {
                      const StepIcon = step.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className="relative pl-14 sm:pl-16 group"
                        >
                          {/* Circle step badge */}
                          <div className="absolute left-3 top-0.5 w-6 h-6 rounded-full bg-surface border-2 border-slate-300 dark:border-slate-850 flex items-center justify-center group-hover:border-primary transition-colors z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary" />
                          </div>

                          <div className="bg-surface border border-slate-200/60 dark:border-slate-800/80 rounded-card p-6 sm:p-8 shadow-soft hover:shadow-premium transition-all">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary block">{step.step}</span>
                            <div className="flex items-center gap-3 mt-1">
                              <StepIcon size={20} className="text-slate-700 dark:text-slate-200" />
                              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">{step.title}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-3">
                              {step.desc}
                            </p>

                            {/* Required documents badge list */}
                            {step.docs && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {step.docs.map((doc, dIdx) => (
                                  <span key={dIdx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-page dark:bg-slate-950 text-[10px] font-bold text-slate-450 border border-slate-200 dark:border-slate-850/60">
                                    <Check size={10} className="text-primary" />
                                    <span>{doc}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {/* JOURNEY TAB 2: CUSTOMER BOOKING FLOW */}
                {journeyTab === 'booking' && (
                  <motion.div
                    key="booking"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800"
                  >
                    {[
                      { step: 'Step 1', title: 'Select Service', desc: 'Customer selects a repair or professional service from categories on SaathApp dashboard.', icon: Search },
                      { step: 'Step 2', title: 'Enter Service Details', desc: 'Customer describes the issues, adds photos/videos, and selects preferred schedule details.', icon: Clipboard },
                      { step: 'Step 3', title: 'Choose Professional', desc: 'Customer reviews recommended professionals, pricing, distance, and historical ratings.', icon: User },
                      { step: 'Step 4', title: 'Booking Confirmation', desc: 'System confirms booking and issues an authorization code, locking in service rates.', icon: CheckCircle2 },
                      { step: 'Step 5', title: 'Live Tracking', desc: 'Customer views professional GPS travel progress on active mapping interfaces in real-time.', icon: MapPin },
                      { step: 'Step 6', title: 'Service Completed', desc: 'Work gets inspected, payment settles, and customer issues rating feedback.', icon: ThumbsUp }
                    ].map((step, idx) => {
                      const StepIcon = step.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className="relative pl-14 sm:pl-16 group"
                        >
                          <div className="absolute left-3 top-0.5 w-6 h-6 rounded-full bg-surface border-2 border-slate-300 dark:border-slate-850 flex items-center justify-center group-hover:border-primary transition-colors z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary" />
                          </div>

                          <div className="bg-surface border border-slate-200/60 dark:border-slate-800/80 rounded-card p-6 sm:p-8 shadow-soft hover:shadow-premium transition-all relative">
                            {/* Pulse arrow pointing downwards to symbolize flow */}
                            {idx < 5 && (
                              <div className="absolute bottom-[-24px] left-[-32px] sm:left-[-34px] text-primary animate-pulse pointer-events-none hidden md:block">
                                <motion.span
                                  animate={{ y: [0, 4, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                  ⬇
                                </motion.span>
                              </div>
                            )}

                            <span className="text-[10px] font-black uppercase tracking-widest text-primary block">{step.step}</span>
                            <div className="flex items-center gap-3 mt-1">
                              <StepIcon size={20} className="text-slate-700 dark:text-slate-200" />
                              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">{step.title}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-3">
                              {step.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {/* JOURNEY TAB 3: SERVICE PROFESSIONAL JOURNEY */}
                {journeyTab === 'professional' && (
                  <motion.div
                    key="professional"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800"
                  >
                    {[
                      { step: 'Step 1', title: 'Receive Request', prof: 'Views details of client request, estimated earnings, and distance.', cust: 'Sees "Searching for nearby service professional..." status.', payment: 'Hold amount calculated and verified.', review: 'N/A' },
                      { step: 'Step 2', title: 'Accept Job', prof: 'Clicks accept to lock request. Starts reviewing user comments.', cust: 'Sees assigned partner profile, photo, details, and phone.', payment: 'Escrow initialized; billing authorized.', review: 'N/A' },
                      { step: 'Step 3', title: 'Navigate to Customer', prof: 'Uses integrated Google Map navigation routing to user location.', cust: 'Tracks partner live location movement on real-time map.', payment: 'Escrow active.', review: 'N/A' },
                      { step: 'Step 4', title: 'Start Service', prof: 'Arrives, performs inspection, and keys in customer OTP code to start.', cust: 'Sees "Service Started" confirmation with active timer.', payment: 'Escrow active.', review: 'N/A' },
                      { step: 'Step 5', title: 'Complete Work', prof: 'Completes repair, uploads picture validation, reviews cost summary.', cust: 'Reviews completed service, validates results on verification screen.', payment: 'Customer authorizes escrow payout release.', review: 'Customer prompted to leave rating.' },
                      { step: 'Step 6', title: 'Receive Payment', prof: 'Wallet credited with earnings. Accesses payout history list.', cust: 'Receives final invoice detailing work parameters and tips.', payment: 'Funds settled instantly to wallet for weekly payout.', review: 'Partner and customer rate each other.' }
                    ].map((step, idx) => {
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className="relative pl-14 sm:pl-16 group"
                        >
                          <div className="absolute left-3 top-0.5 w-6 h-6 rounded-full bg-surface border-2 border-slate-300 dark:border-slate-850 flex items-center justify-center group-hover:border-primary transition-colors z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary" />
                          </div>

                          <div className="bg-surface border border-slate-200/60 dark:border-slate-800/80 rounded-card p-6 sm:p-8 shadow-soft hover:shadow-premium transition-all">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary block">{step.step}</span>
                            <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white mt-0.5">{step.title}</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 ">
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">💼 What Professional Does</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.prof}</p>
                              </div>
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">👁 What Customer Sees</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.cust}</p>
                              </div>
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">💳 Payment Flow</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.payment}</p>
                              </div>
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">⭐ Review Flow</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.review}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 4: SERVICES WE COVER */}
        <section
          id="services"
          ref={sectionRefs.services}
          className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Job Classifications</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white mt-1">
              Popular Service Segments We Cover
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-lg mx-auto">
              Choose from multiple categories to register. Grow your local reach.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
              {servicesCovered.map((service, idx) => {
                const ServiceIcon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-6 rounded-card border text-left flex flex-col justify-between h-44 bg-gradient-to-br ${service.bg} shadow-soft hover:shadow-premium transition-all`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface border border-slate-200/20 dark:border-slate-800 flex items-center justify-center shadow-sm">
                      <ServiceIcon size={20} className="text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100">{service.name}</h3>
                      <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold">{service.count}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* "Many More" Card */}
              <motion.div
                onClick={() => navigate('/professional/register')}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-card border text-left flex flex-col justify-between h-44 bg-gradient-primary border-primary text-white cursor-pointer shadow-premium hover:shadow-glow-primary transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-sm text-white">
                  <Plus size={20} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-black">Many More</h3>
                  <p className="text-[10px] sm:text-xs text-white/80 font-bold">Apply to check categories</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 5: BENEFITS */}
        <section
          id="benefits"
          ref={sectionRefs.benefits}
          className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-950/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Financial & Operational Benefits</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white mt-1">
              Maximize Earnings & Professional Growth
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-lg mx-auto">
              Guaranteed payment systems, ratings transparency, and operations tools.
            </p>

            {/* Benefits Large Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
              {premiumBenefits.map((benefit, idx) => {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-surface border border-slate-200/50 dark:border-slate-850 p-6 sm:p-8 rounded-card shadow-soft hover:shadow-premium transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white">{benefit.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary-950/30 border border-primary/20 text-primary dark:text-primary-light text-xs font-extrabold">
                          {benefit.highlight}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-left">
                        {benefit.desc}
                      </p>
                    </div>

                    {/* Progress indicators to make it visual/premium */}
                    <div className="mt-6 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>Partner satisfaction rate</span>
                        <span>{benefit.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-page rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${benefit.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 }}
                          className={`h-full ${benefit.progressColor} rounded-full`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
        <section
          id="faq"
          ref={sectionRefs.faq}
          className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Help & Support</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest mt-2">
              Everything you need to know about joining as a professional partner.
            </p>

            {/* Accordion list */}
            <div className="mt-12 space-y-4 text-left">
              {[
                { q: 'How do I register?', a: 'You can register by downloading the SaathApp Partner app or clicking the "Apply Now" button here. You will fill out your name, contact details, select your main service categories, and upload files for verification.' },
                { q: 'What documents are required?', a: 'We require a valid government-issued Aadhaar Card, PAN Card, and a clear Profile Photo. Having experience certificates, trade licenses, or portfolio proof of past work is optional but helps speed up verification.' },
                { q: 'How long does verification take?', a: 'Once you submit all the documents and details, our operations team processes the screening checks immediately. Verification status is usually updated, and your account activated, within 24 to 48 hours.' },
                { q: 'How are payments made?', a: 'SaathApp manages all online payment processes safely. Customer payments are held in secure escrow. Once the job is marked complete, funds are released to your app wallet. Settlements are transferred directly to your bank account weekly every Tuesday.' },
                { q: 'How do I receive bookings?', a: 'You will receive localized service notifications on your partner application. The notifications show job scopes, user distance, and guaranteed payments. You can review and choose to accept bookings that fit your schedule.' }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200/60 dark:border-slate-800/80 rounded-card bg-surface shadow-soft overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <span className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-205 pr-4">
                      {faq.q}
                    </span>
                    <span className="text-primary flex-shrink-0">
                      {faqOpen[idx] ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {faqOpen[idx] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-105  text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: CALL TO ACTION BANNER */}
        <section className="pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="relative overflow-hidden rounded-card bg-gradient-to-tr from-brand-600 to-emerald-700 text-white p-8 sm:p-16 text-center shadow-premium group"
            >
              {/* Blobs */}
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none group-hover:scale-105 transition-transform duration-700" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-slate-900/35 px-4 py-1.5 rounded-full inline-block border border-white/15">
                  Start Earning Today
                </span>
                
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                  Ready to Start Your Professional Journey?
                </h2>
                
                <p className="text-xs sm:text-base text-white/90 font-medium leading-relaxed max-w-lg mx-auto">
                  Join SaathApp partner network now. Set up your digital shop, manage booking rates, and build customer loyalty.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => navigate('/professional/register')}
                    className="py-3 px-8 rounded-btn bg-secondary hover:bg-secondary-dark text-slate-900 font-extrabold text-sm sm:text-base cursor-pointer shadow-md hover:shadow-lg transition-all border-0"
                  >
                    Apply Now
                  </button>
                  <a
                    href="tel:+911800123456"
                    className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none py-3 px-8 rounded-btn border border-white/40 hover:bg-white/10 text-white font-extrabold text-sm sm:text-base cursor-pointer transition-all"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer component integration */}
      <Footer />

      {/* BACK TO TOP FLOATING BUTTON */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-40 hidden md:block"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3.5 rounded-full bg-surface border border-slate-200/60 dark:border-slate-800 shadow-premium hover:shadow-glow-primary text-slate-500 hover:text-primary transition-all cursor-pointer"
        >
          <ChevronUp size={20} />
        </button>
      </motion.div>

      {/* SIMULATED APPLICATION MODAL */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full max-w-lg bg-surface rounded-card border border-slate-200/60 dark:border-slate-800/80 shadow-premium overflow-hidden text-left"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100  flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">Partner Application Form</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Become a verified SaathApp technician or worker</p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="w-8 h-8 rounded-full bg-page hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {!applyFormSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="field-label">Full Name</label>
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your legal full name"
                          className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none input-field dark:border-slate-800 dark:text-white"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="field-label">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}"
                          placeholder="10-digit mobile number"
                          className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none input-field dark:border-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* City */}
                        <div className="space-y-1">
                          <label className="field-label">Serving City</label>
                          <input
                            type="text"
                            required
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g. Patna, Nalanda"
                            className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none input-field dark:border-slate-800 dark:text-white"
                          />
                        </div>

                        {/* Experience */}
                        <div className="space-y-1">
                          <label className="field-label">Experience Level</label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none input-field dark:border-slate-800 dark:text-white"
                          >
                            <option>Fresher (&lt; 1 Year)</option>
                            <option>1-3 Years</option>
                            <option>3-5 Years</option>
                            <option>5+ Years</option>
                          </select>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="space-y-1">
                        <label className="field-label">Main Service Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none input-field dark:border-slate-800 dark:text-white"
                        >
                          <option>Electrician</option>
                          <option>Plumber</option>
                          <option>Cleaner</option>
                          <option>Painter</option>
                          <option>Carpenter</option>
                          <option>AC Repair & Tech</option>
                          <option>Appliance Repair</option>
                          <option>Construction / Mason</option>
                          <option>Agriculture Expert</option>
                          <option>Delivery Partner</option>
                        </select>
                      </div>

                      {/* Terms */}
                      <div className="flex items-start gap-2.5 pt-2">
                        <input
                          id="terms"
                          type="checkbox"
                          required
                          name="terms"
                          checked={formData.terms}
                          onChange={handleInputChange}
                          className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none mt-1 accent-primary"
                        />
                        <label htmlFor="terms" className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal font-medium cursor-pointer">
                          I agree to share my government details, documents, and submit background credentials for verification as per SaathApp Partner Agreements.
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none btn-primary w-full cursor-pointer mt-4"
                      >
                        Submit Application
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto animate-bounce">
                        <CheckCircle2 size={32} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-black text-slate-800 dark:text-white">Submission Successful!</h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                          Thank you for choosing SaathApp. Our verification team will review your application and contact you on <strong>+91 {formData.phone}</strong> within 24–48 hours.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-page dark:bg-slate-950 text-[10px] font-black uppercase text-slate-400 border border-slate-205 dark:border-slate-800/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span>Status: Pending Review</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
