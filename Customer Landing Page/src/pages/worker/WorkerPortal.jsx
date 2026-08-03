import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Award, Clock, Wallet, TrendingUp, UserCheck, BookOpen,
  ShieldCheck, MapPin, Star, PhoneCall, HelpCircle, Plus, Minus,
  ChevronDown, ChevronUp, Wrench, Sparkles, DollarSign, Calendar, Briefcase, ArrowRight,
  Lock, UploadCloud, FileText, Camera, Check, Search, Shield, Zap, Info, Play, Hammer,
  User, Clipboard, ThumbsUp, AlertCircle, HardHat
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WorkerPortal({
  cartItems,
  cartCount,
  cartTotal,
  location,
  pincode,
  darkMode,
  isCartOpen,
  isVoiceModalOpen,
  isImageModalOpen,
  isLocationModalOpen,
  isGpsLoading,
  isListening,
  isUploading,
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
  onDetectGPS,
  onAddToCart,
  onCategorySelect,
  onBack
}) {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('hero');
  const [faqOpen, setFaqOpen] = useState([false, false, false, false, false]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyFormSubmitted, setApplyFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    category: 'Electrician Assistant',
    experience: 'Fresher (< 1 Year)',
    terms: true
  });

  const sectionRefs = {
    hero: useRef(null),
    whyjoin: useRef(null),
    categories: useRef(null),
    process: useRef(null),
    documents: useRef(null),
    earnings: useRef(null),
    faq: useRef(null)
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Become a Service Worker | SaathApp';
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setApplyFormSubmitted(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setApplyFormSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        city: '',
        category: 'Electrician Assistant',
        experience: 'Fresher (< 1 Year)',
        terms: true
      });
      alert('Application submitted successfully! Our partner agency will contact you.');
    }, 2000);
  };

  const benefits = [
    { title: 'Flexible Working Hours', text: 'Work on your own schedule. Activate your duty status in the app whenever you are free and ready for jobs.', icon: Clock, color: 'from-blue-500 to-indigo-600' },
    { title: 'Weekly Payouts', text: 'Steady income guaranteed. Your accumulated salary, incentives, and task bonuses are deposited directly every Tuesday.', icon: Wallet, color: 'from-emerald-500 to-green-600' },
    { title: 'More Local Jobs', text: 'Never sit idle. Receive regular job assignments in your preferred local area from certified service providers.', icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
    { title: 'Verified Badge', text: 'Boost your rating status. Get background checked and display a professional badge to secure priority leads.', icon: ShieldCheck, color: 'from-purple-500 to-violet-600' },
    { title: 'Full Insurance Cover', text: 'Accident insurance protection covered by SaathApp for all registered workers during active service hours.', icon: Shield, color: 'from-rose-500 to-pink-600' },
    { title: 'Free Skill Training', text: 'Improve your expertise. Get access to free expert certification workshops and safety training courses.', icon: BookOpen, color: 'from-teal-500 to-cyan-600' }
  ];

  const categories = [
    { name: 'Electrician', icon: Zap, desc: 'Assist in home lighting and circuit wiring.' },
    { name: 'Plumber', icon: Wrench, desc: 'Leakage checks, drain cleaning and fixture fittings.' },
    { name: 'Painter', icon: Sparkles, desc: 'Sanding, wall priming and coat painting support.' },
    { name: 'Carpenter', icon: Hammer, desc: 'Furniture installations and cabinet assembly helper.' },
    { name: 'Cleaner', icon: Sparkles, desc: 'Deep home sweeping, carpet washing and sanitization.' },
    { name: 'AC Technician', icon: HardHat, desc: 'AC filter washing, coil checks, and gas charge aid.' },
    { name: 'Appliance Repair', icon: Info, desc: 'Washing machines, TVs, and microwave repair aid.' },
    { name: 'Agriculture Worker', icon: Sparkles, desc: 'Field crop checks, organic fertilizing and soil tiling.' },
    { name: 'Construction Worker', icon: Hammer, desc: 'Bricks tamping, plaster prep and home masonry work.' }
  ];

  const processSteps = [
    { step: 'Step 1 Apply', title: 'Fill application form', desc: 'Click Apply Now to register your contact details and select your service skills.' },
    { step: 'Step 2 Verification', title: 'Submit government KYC', desc: 'Upload your Aadhaar card and PAN details for verified identity background screening.' },
    { step: 'Step 3 Training', title: 'Complete onboarding', desc: 'Join our brief 1-day safety orientation and customer communication coaching program.' },
    { step: 'Step 4 Start Working', title: 'Log in & accept jobs', desc: 'Install the SaathApp partner app, switch status to Online, and begin receiving jobs near you.' }
  ];

  const requiredDocuments = [
    { title: 'Aadhaar Card', desc: 'For government registered legal identity verification checks.', icon: Clipboard },
    { title: 'PAN Card', desc: 'For standard tax declaration and banking settlements.', icon: FileText },
    { title: 'Bank Passbook / Cancelled Cheque', desc: 'To credit weekly payouts and task bonuses directly.', icon: Wallet },
    { title: 'Profile Passport Photo', desc: 'For printing your SaathApp physical ID and app profile display.', icon: Camera },
    { title: 'Experience Certificate', desc: 'Prior service work certificates or reference contacts (if available).', icon: Award }
  ];

  const earningsModel = [
    { title: 'Monthly Base Salary', highlight: 'Up to ₹25,000 /mo', desc: 'Steady minimum base earnings for workers completing standard shift hours on time.', progress: 90, progressColor: 'bg-primary' },
    { title: 'Task Incentives', highlight: '₹200–500 per extra job', desc: 'Earn incremental cash bonuses for every customer job completed past target limits.', progress: 100, progressColor: 'bg-emerald-500' },
    { title: 'Performance Bonus', highlight: 'Up to ₹3,000 /mo bonus', desc: 'Cash rewards for partners maintaining a 4.8+ star rating with zero customer complaints.', progress: 80, progressColor: 'bg-amber-500' },
    { title: 'Customer Tips', highlight: '100% kept by worker', desc: 'All cash or wallet tips sent by customers go entirely to you, with zero platform commissions.', progress: 95, progressColor: 'bg-blue-500' }
  ];

  const faqs = [
    { q: 'Is there any joining fee to register as a worker?', a: 'No, registration as a service worker on SaathApp is completely free. We do not charge any upfront security deposits or onboarding fees.' },
    { q: 'How do I receive my weekly earnings?', a: 'Your payouts are calculated every Monday and deposited directly into your registered bank account on Tuesday mornings.' },
    { q: 'What happens if I get injured during a job?', a: 'SaathApp provides accident insurance coverage of up to ₹2,00,000 for all online and active workers. Raise an insurance claim inside the support tab.' },
    { q: 'Do I get uniform shirts and identity cards?', a: 'Yes! Upon passing KYC checks and onboarding training, you will receive SaathApp branded shirts and a verified partner ID card.' },
    { q: 'How many jobs can I reject?', a: 'We allow workers to reject jobs when busy or during emergencies. However, maintaining an acceptance rate above 85% qualifies you for priority booking incentives.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
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
                <HardHat size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-wider text-primary">Join India's Hyperlocal Workforce</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                Earn Steady Income as a <br />
                <span className="bg-gradient-to-r from-primary to-indigo-650 bg-clip-text text-transparent">Service Worker</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-350 font-medium leading-relaxed max-w-xl">
                Partner with verified professionals, get steady local job assignments, secure weekly salary payouts, and grow your career with SaathApp.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.button
                  onClick={() => setShowApplyModal(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3.5 px-8 rounded-btn bg-[#6C3BFF] text-white font-extrabold text-sm sm:text-base cursor-pointer hover:bg-[#582dd6] shadow-premium hover:shadow-glow-primary transition-colors flex items-center gap-2 border-0"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  onClick={() => {
                    navigate('/worker/login');
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3.5 px-8 rounded-btn border border-slate-205 dark:border-slate-800 bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 font-extrabold text-sm sm:text-base cursor-pointer hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors"
                >
                  Worker Login
                </motion.button>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative flex justify-center items-center">
              <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative w-80 h-80 rounded-card bg-gradient-to-br from-indigo-750 via-[#6C3BFF] to-blue-650 p-8 text-white flex flex-col justify-between shadow-premium overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">👷</div>
                  <span className="px-3 py-1 rounded-full bg-white/25 text-[10px] font-black uppercase tracking-wider">SaathApp Worker</span>
                </div>
                <div className="text-left space-y-2">
                  <h4 className="text-xl font-black">Guaranteed Weekly Earnings</h4>
                  <p className="text-xs text-white/80 font-medium">Verify assignments, record attendance daily, and track your salaries and badges easily.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Join SaathApp */}
        <section ref={sectionRefs.whyjoin} className="py-16 bg-slate-100/50 dark:bg-slate-900/20 border-t border-b border-slate-200/50 dark:border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Why Join SaathApp</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">Join thousands of verified workers getting steady income, training, and benefits.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-card border border-slate-200/40 dark:border-slate-800 text-left space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#6C3BFF]/10 text-[#6C3BFF] dark:bg-[#6C3BFF]/15 flex items-center justify-center">
                    <benefit.icon size={22} />
                  </div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{benefit.title}</h3>
                  <p className="text-xs text-slate-455 dark:text-slate-400 font-semibold leading-relaxed">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Job Categories */}
        <section ref={sectionRefs.categories} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Available Job Categories</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">We have helper vacancies across multiple skillsets. Choose yours today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-card border border-slate-200/40 dark:border-slate-800 text-left flex items-start gap-4 shadow-sm hover:shadow-soft transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <category.icon size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider">{category.name}</h4>
                  <p className="text-xs text-slate-450 dark:text-slate-400 font-semibold leading-relaxed">{category.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Registration Process */}
        <section ref={sectionRefs.process} className="py-16 bg-slate-100/50 dark:bg-slate-900/20 border-t border-b border-slate-200/50 dark:border-slate-850 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Registration Process</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">Begin earning in four simple onboarding steps.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step, idx) => (
                <div key={idx} className="space-y-4 text-left bg-white dark:bg-slate-900 p-6 rounded-card border border-slate-200/40 dark:border-slate-800 shadow-sm relative z-10">
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

        {/* Section 5: Documents Required */}
        <section ref={sectionRefs.documents} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Required Documents</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">Please keep these original documents ready for government verification.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {requiredDocuments.map((doc, idx) => (
              <div key={idx} className="p-5 bg-white dark:bg-slate-900 rounded-card border border-slate-200/40 dark:border-slate-800 text-left space-y-3 shadow-sm hover:shadow-soft transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#6C3BFF]/10 text-[#6C3BFF] dark:bg-[#6C3BFF]/20 flex items-center justify-center">
                  <doc.icon size={20} />
                </div>
                <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{doc.title}</h4>
                <p className="text-[11px] text-slate-450 dark:text-slate-400 font-semibold leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Earnings */}
        <section ref={sectionRefs.earnings} className="py-16 bg-slate-100/50 dark:bg-slate-900/20 border-t border-b border-slate-200/50 dark:border-slate-850 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Earnings and Incentives</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">SaathApp pays the best wages in the market. Check our incentive structures below.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {earningsModel.map((model, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-card shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{model.title}</h3>
                    <span className="text-xs font-black text-[#6C3BFF] uppercase tracking-wider">{model.highlight}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{model.desc}</p>
                  
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>Earning Limit Target</span>
                      <span>{model.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${model.progressColor}`} style={{ width: `${model.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: FAQs */}
        <section ref={sectionRefs.faq} className="py-16 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">Find answers to queries regarding work timings, tools, and payouts.</p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-xs sm:text-sm font-black text-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850/30 text-left transition-colors cursor-pointer"
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
        </section>

        {/* CTA section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#6C3BFF] via-[#5b2cd3] to-indigo-800 rounded-card p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-slate-900/35 px-4 py-1.5 rounded-full inline-block border border-white/15">
                Start Earning Today
              </span>
              
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                Ready to Join SaathApp Service Worker Fleet?
              </h2>
              
              <p className="text-xs sm:text-base text-white/90 font-medium leading-relaxed max-w-lg mx-auto">
                Fill the onboarding form, upload your KYC verification documents, complete our training session, and start earning weekly payouts.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="py-3.5 px-8 rounded-btn bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-sm sm:text-base cursor-pointer shadow-md hover:shadow-lg transition-all border-0"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => navigate('/worker/login')}
                  className="py-3.5 px-8 rounded-btn border border-white/40 hover:bg-white/10 text-white font-extrabold text-sm sm:text-base cursor-pointer transition-all bg-transparent"
                >
                  Worker Login
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* SIMULATED APPLICATION MODAL */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-card border border-slate-205 dark:border-slate-800 shadow-premium overflow-hidden text-left"
            >
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/40 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">Worker Onboarding Form</h3>
                  <p className="text-[10px] text-slate-450 mt-0.5">Register as an assistant service partner</p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {!applyFormSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                      <input
                        type="text"
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Legal full name as in Aadhaar card"
                        className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-950 text-slate-800 dark:text-white font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        placeholder="10-digit phone number"
                        className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-950 text-slate-800 dark:text-white font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400">Serving City</label>
                        <input
                          type="text"
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Patna"
                          className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-950 text-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400">Experience</label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-950 font-semibold"
                        >
                          <option>Fresher (&lt; 1 Year)</option>
                          <option>1-2 Years</option>
                          <option>2-5 Years</option>
                          <option>5+ Years</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Main Skill Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4.5 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none dark:bg-slate-950 font-semibold"
                      >
                        <option>Electrician Assistant</option>
                        <option>Plumbing Helper</option>
                        <option>Painter Assistant</option>
                        <option>Carpenter Helper</option>
                        <option>Appliance Transport Helper</option>
                        <option>Delivery Fleet Agent</option>
                        <option>Agriculture Helper</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md text-center"
                    >
                      Submit Onboarding Application
                    </button>
                  </form>
                ) : (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-slate-800 dark:text-white">Application Received!</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                        Thank you for applying. SaathApp partner operations will reach out on your mobile number <strong>+91 {formData.phone}</strong> for physical document verification.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
