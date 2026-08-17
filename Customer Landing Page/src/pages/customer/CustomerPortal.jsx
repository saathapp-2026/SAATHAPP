import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, MapPin, ChevronUp, Wrench, Sparkles, ArrowRight, Lock, Zap, ThumbsUp, UserCheck } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CustomerPortal({
  _cartItems,
  cartCount,
  _cartTotal,
  location,
  _pincode,
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
  const [_activeSubTab, setActiveSubTab] = useState('hero');
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false]);

  const sectionRefs = {
    hero: useRef(null),
    whychoose: useRef(null),
    features: useRef(null),
    howitworks: useRef(null),
    benefits: useRef(null),
    faq: useRef(null)
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Become a Customer | SaathApp';
  }, []);

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

  const whyChooseReasons = [
    { title: 'Superfast Delivery', text: 'Get groceries, hardware, and agri-products delivered to your doorstep in minutes from verified local stores.', icon: Truck, color: 'from-blue-400 to-indigo-650' },
    { title: 'Secure Escrow Payments', text: 'Your money is safe. Payment is only released to professionals and stores after you confirm job completion.', icon: Lock, color: 'from-emerald-400 to-green-600' },
    { title: 'Verified Local Professionals', text: 'All painters, plumbers, carpenters, and electricians undergo 3-tier KYC background verification.', icon: ShieldCheck, color: 'from-cyan-400 to-teal-600' },
    { title: 'Support Local Economy', text: 'Empower local family stores, neighborhood service workers, and local suppliers near your town.', icon: ThumbsUp, color: 'from-amber-400 to-orange-500' }
  ];

  const featuresList = [
    { title: 'Shop Products', desc: 'Browse and purchase groceries, hardware tools, seeds, and electronics from your nearest storefronts.', icon: ShoppingBag },
    { title: 'Book Services', desc: 'Hire certified electricians, plumbers, carpenters, cleaners, and AC repair technicians instantly.', icon: Wrench },
    { title: 'Real-time Tracking', desc: 'Track your packages and technician arrival live on the interactive GPS map overlay.', icon: MapPin },
    { title: 'Secure Payments', desc: 'Pay via cards, UPI, netbanking, or load balance into your unified Saath Wallet.', icon: ShieldCheck },
    { title: 'Verified Professionals', desc: 'Hire safely knowing each service partner is fully verified and holds gold ratings.', icon: UserCheck },
    { title: 'Local Stores & Agri-Hubs', desc: 'Direct connection to local grocery stores, hardware distributors, and farming experts.', icon: Zap }
  ];

  const howItWorksSteps = [
    { step: 'Browse', title: 'Find anything you need', desc: 'Open the app to search for products or services in your hyperlocal area.' },
    { step: 'Order', title: 'Schedule or place order', desc: 'Choose a convenient delivery slot or service time and pay securely via the app.' },
    { step: 'Track', title: 'Live updates', desc: 'Monitor the status of your order delivery or track the assigned technician moving to your map location.' },
    { step: 'Receive', title: 'Job complete & release', desc: 'Confirm job completion or verify the products received, and release payment to the partner.' }
  ];

  const customerBenefits = [
    { title: 'Unified Experience', highlight: 'Products + Services', desc: 'No need for multiple apps. Buy milk, order a plumber, and consult a farming specialist from one single interface.', progress: 100, progressColor: 'bg-primary' },
    { title: 'Zero Risk Payments', highlight: 'Escrow System', desc: 'Your payments are held securely and only transferred when you verify that the work has been completed correctly.', progress: 95, progressColor: 'bg-emerald-500' },
    { title: 'Local Speed', highlight: 'Within 2 Hours Delivery', desc: 'Since we connect you to businesses and professionals directly inside your zip code, wait times are cut in half.', progress: 90, progressColor: 'bg-blue-500' },
    { title: 'Verified Quality', highlight: 'Top Rated Partners', desc: 'Only technicians and workers maintaining a 4.5+ star customer rating are dispatched for your home bookings.', progress: 85, progressColor: 'bg-amber-500' }
  ];

  const faqsList = [
    { q: 'How does SaathApp ensure technician safety?', a: 'Every service professional is registered, verified through government Aadhaar/PAN registries, and completes safety background screening before entering the marketplace.' },
    { q: 'What is the refund policy for cancelled services?', a: 'If you cancel a booking before the technician starts work, the full booking amount is refunded instantly to your Saath Wallet or original payment method.' },
    { q: 'Can I reschedule an upcoming plumbing or electrician booking?', a: 'Yes! Navigate to your Customer Dashboard -> Bookings tab to reschedule or change the time slot for any active booking.' },
    { q: 'Are there delivery charges for grocery and store orders?', a: 'Delivery is free for orders meeting the minimum store order value. Standard nominal distance delivery fees apply for longer distance orders.' },
    { q: 'How does the payment escrow system protect me?', a: 'When you place an order or book a service, the money is secured in our escrow gateway. The partner only receives payment after you confirm work completion via the app.' }
  ];

  return (
    <div className="min-h-screen bg-page dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
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

        {/* Hero Section */}
        <section ref={sectionRefs.hero} className="relative py-12 md:py-20 overflow-hidden text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles size={14} className="text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-primary">Your Local Super App</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                One App For All Your <br />
                <span className="bg-gradient-to-r from-primary to-indigo-650 bg-clip-text text-transparent">Daily Needs</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-350 font-medium leading-relaxed max-w-xl">
                Get fresh groceries, purchase farm supplies, hire reliable home service technicians, and track everything live. Welcome to India's trusted hyperlocal super app.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.button
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate('/customer/dashboard');
                    } else {
                      navigate('/login', { state: { from: '/customer/dashboard' } });
                    }
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3.5 px-8 rounded-btn bg-[#6C3BFF] text-white font-extrabold text-sm sm:text-base cursor-pointer hover:bg-[#582dd6] shadow-premium hover:shadow-glow-primary transition-colors flex items-center gap-2 border-0"
                >
                  <span>Get Started Now</span>
                  <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('features')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3.5 px-8 rounded-btn border border-slate-205 dark:border-slate-800 bg-white/40 text-slate-700 dark:text-slate-200 font-extrabold text-sm sm:text-base cursor-pointer hover:bg-white/70 transition-colors"
                >
                  Explore Features
                </motion.button>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative flex justify-center items-center">
              <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative w-80 h-80 rounded-card bg-gradient-to-br from-[#6C3BFF] via-[#8B5CF6] to-[#FF5A7A] p-8 text-white flex flex-col justify-between shadow-premium overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🛒</div>
                  <span className="px-3 py-1 rounded-full bg-white/25 text-[10px] font-black uppercase tracking-wider">SaathApp Customer</span>
                </div>
                <div className="text-left space-y-2">
                  <h4 className="text-xl font-black">All Local Services at 1 Place</h4>
                  <p className="text-xs text-white/80 font-medium">Verify bookings, order histories, and pay safely using the escrow model.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Choose SaathApp */}
        <section ref={sectionRefs.whychoose} className="py-16 bg-slate-100/50 border-t border-b border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Why Choose SaathApp</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">Our core values put quality, speed, and safety first for every home customer.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseReasons.map((reason, idx) => {
                const Icon = reason.icon;
                return (
                  <div key={idx} className="p-6 bg-surface rounded-card border border-slate-200/40 dark:border-slate-800 text-left space-y-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center text-white`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{reason.title}</h3>
                    <p className="text-xs text-slate-455 dark:text-slate-400 font-semibold leading-relaxed">{reason.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Features */}
        <section ref={sectionRefs.features} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Super App Features</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">Everything you need for running a modern home, farm, or local supply chain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 bg-surface rounded-card border border-slate-200/40 dark:border-slate-800 text-left flex items-start gap-4 shadow-sm hover:shadow-soft transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider">{feature.title}</h4>
                    <p className="text-xs text-slate-450 dark:text-slate-400 font-semibold leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: How It Works */}
        <section ref={sectionRefs.howitworks} className="py-16 bg-slate-100/50 border-t border-b border-slate-200/50 dark:border-slate-850 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">How It Works</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">Enjoy groceries and home services in four simple transparent steps.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {howItWorksSteps.map((step, idx) => (
                <div key={idx} className="space-y-4 text-left bg-surface p-6 rounded-card border border-slate-200/40 dark:border-slate-800 shadow-sm relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">{step.step}</span>
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 font-mono">0{idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider leading-tight">{step.title}</h4>
                  <p className="text-xs text-slate-450 dark:text-slate-400 font-semibold leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Benefits */}
        <section ref={sectionRefs.benefits} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Premium Customer Benefits</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">Get high-end service guarantees, rapid deliveries, and security assurance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {customerBenefits.map((benefit, idx) => (
              <div key={idx} className="p-6 bg-surface border border-slate-200 dark:border-slate-800 rounded-card shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{benefit.title}</h3>
                  <span className="text-xs font-black text-[#6C3BFF] uppercase tracking-wider">{benefit.highlight}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{benefit.desc}</p>
                
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>Performance Rating</span>
                    <span>{benefit.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-page rounded-full overflow-hidden">
                    <div className={`h-full ${benefit.progressColor}`} style={{ width: `${benefit.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: FAQs */}
        <section ref={sectionRefs.faq} className="py-16 bg-slate-100/50 border-t border-b border-slate-200/50 dark:border-slate-850 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Frequently Asked Questions</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">Got questions? We have answers. Find resources below or contact helper desk.</p>
            </div>

            <div className="space-y-4 text-left">
              {faqsList.map((faq, idx) => (
                <div key={idx} className="bg-surface border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-xs sm:text-sm font-black text-slate-850 dark:text-slate-200 hover:bg-page text-left transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronUp size={16} className={`text-slate-405 transition-transform duration-300 ${faqOpen[idx] ? '' : 'rotate-180'}`} />
                  </button>
                  
                  {faqOpen[idx] && (
                    <div className="px-6 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold border-t border-slate-100 dark:border-slate-850/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#6C3BFF] via-[#5b2cd3] to-indigo-800 rounded-card p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none animate-pulse" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-slate-900/35 px-4 py-1.5 rounded-full inline-block border border-white/15">
                Join SaathApp Ecosystem
              </span>
              
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                Ready to Experience Hyperlocal Super App Convenience?
              </h2>
              
              <p className="text-xs sm:text-base text-white/90 font-medium leading-relaxed max-w-lg mx-auto">
                Create a customer account now. Access organic groceries, secure carpentry, plumbing and electrical work, and load your Saath Wallet.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setAuthView('signup');
                    navigate('/signup');
                  }}
                  className="py-3.5 px-8 rounded-btn bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-sm sm:text-base cursor-pointer shadow-md hover:shadow-lg transition-all border-0"
                >
                  Sign Up Now
                </button>
                <button
                  onClick={() => {
                    setAuthView('login');
                    navigate('/login');
                  }}
                  className="py-3.5 px-8 rounded-btn border border-white/40 hover:bg-white/10 text-white font-extrabold text-sm sm:text-base cursor-pointer transition-all bg-transparent"
                >
                  Customer Login
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
