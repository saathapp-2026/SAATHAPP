import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BadgeCheck, CheckCircle2, ShieldCheck, Mail, Phone, Globe, 
  Award, Sparkles, Target, Eye, Heart, Compass, Zap, Users, ArrowRight 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About({ onBack, onLogout, isAuthenticated = false, user = null, darkMode = false, toggleDarkMode = () => {} }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'About Us | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Welcome to SaathApp, India's next-generation hyperlocal super app built by SAATHAPPNOVA PRIVATE LIMITED to connect people with everything they need from their own city, town, and village.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Welcome to SaathApp, India's next-generation hyperlocal super app built by SAATHAPPNOVA PRIVATE LIMITED to connect people with everything they need from their own city, town, and village.";
      document.head.appendChild(meta);
    }
    window.scrollTo(0, 0);
  }, []);

  const offers = [
    { category: 'Grocery & Daily Essentials', description: 'Fresh kitchen staples and household needs.' },
    { category: 'Fruits & Vegetables', description: 'Farm fresh produce delivered daily.' },
    { category: 'Dairy Products', description: 'Fresh milk, paneer, ghee, and curd.' },
    { category: 'Electrical & Electronics', description: 'Gadgets, appliances, and electric essentials.' },
    { category: 'Hardware & Construction Materials', description: 'Cement, paint, tools, and building supplies.' },
    { category: 'Agricultural Products', description: 'Seeds, fertilizers, and farm equipment.' },
    { category: 'Furniture & Home Essentials', description: 'Elegant home furniture and decor.' },
    { category: 'Mobile & Computer Accessories', description: 'Chargers, cases, and tech accessories.' },
    { category: 'Professional Services', description: 'Electricians, Plumbers, Carpenters, AC & Appliance Repair, Cleaning Services.' },
    { category: 'Delivery Services', description: 'Lightning-fast delivery from neighborhood shops.' },
    { category: 'Local Business Marketplace', description: 'Discover and support neighborhood stores.' }
  ];

  const whyChoose = [
    { title: 'Local First', text: 'We believe local businesses are the backbone of India\'s economy. Our platform helps them compete in the digital world.', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
    { title: 'Verified Businesses', text: 'We encourage verification of sellers and service professionals to build customer trust and maintain platform quality.', icon: BadgeCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { title: 'Faster Local Delivery', text: 'By connecting customers with nearby businesses, we aim to reduce delivery time while supporting local commerce.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { title: 'Secure Transactions', text: 'We prioritize secure payment experiences and continuously work to improve platform safety and reliability.', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { title: 'Customer-Centric Experience', text: 'Every feature is designed with simplicity, transparency, and convenience in mind.', icon: Compass, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' }
  ];

  const values = [
    { title: 'Trust', text: 'Building long-term relationships through honesty, transparency, and reliability.', icon: ShieldCheck },
    { title: 'Innovation', text: 'Using technology to simplify local commerce and improve everyday life.', icon: Sparkles },
    { title: 'Community', text: 'Supporting local businesses, entrepreneurs, and professionals.', icon: Users },
    { title: 'Quality', text: 'Maintaining high standards across products, services, and customer support.', icon: Award },
    { title: 'Responsibility', text: 'Operating responsibly while respecting customers, partners, and communities.', icon: Heart }
  ];

  const ecosystem = [
    { role: 'Customers', text: 'Shop locally, book services, and discover nearby businesses.' },
    { role: 'Sellers', text: 'Expand your business online and reach more customers.' },
    { role: 'Service Professionals', text: 'Offer your professional skills and grow your customer base.' },
    { role: 'Delivery Partners', text: 'Earn income by delivering products safely and efficiently.' }
  ];

  const futurePlans = [
    'AI-powered recommendations',
    'Smart logistics',
    'Digital payment innovations',
    'Business analytics tools',
    'Advanced seller solutions',
    'New commerce and service categories'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300" style={{ scrollBehavior: 'smooth' }}>
      <Header
        cartCount={0}
        onCartClick={() => {}}
        location="Bhatahar, Nalanda"
        onLocationClick={() => {}}
        onSearch={() => {}}
        onLogin={() => {}}
        onSignup={() => {}}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfile={() => navigate('/profile')}
        onCartPage={() => {}}
        onOrdersPage={() => {}}
        onWishlistPage={() => {}}
        onSettingsPage={() => {}}
        onLogout={onLogout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={() => {}}
        onImageSearchClick={() => {}}
      />

      {/* Back button top */}
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl">
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="inline-flex">
            <button
              type="button"
              onClick={() => (onBack ? onBack() : navigate('/', { replace: true }))}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-350 shadow-sm transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:shadow-md cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:gap-12">
          
          {/* Hero Header Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-emerald-100 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 text-white shadow-[0_20px_50px_rgba(16,185,129,0.15)] sm:p-10 lg:p-12 text-left"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
                  <Sparkles size={14} />
                  About Us
                </div>
                <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl tracking-tight leading-none">
                  SAATHAPPNOVA PRIVATE LIMITED
                </h1>
                <p className="text-xl font-bold text-emerald-150 tracking-wide uppercase">
                  Everything Near You.
                </p>
                <div className="h-1 w-20 bg-white/30 rounded-full" />
                <p className="text-base sm:text-lg leading-relaxed text-emerald-50/95 font-medium">
                  Welcome to SaathApp, India's next-generation hyperlocal super app built to connect people with everything they need from their own city, town, and village. Whether it's groceries, construction materials, hardware, agricultural supplies, home services, electronics, furniture, or daily essentials, SaathApp brings local businesses and customers together on one trusted digital platform.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-emerald-100/90">
                  Developed and operated by SAATHAPPNOVA PRIVATE LIMITED, SaathApp is on a mission to digitally empower local businesses while making shopping and service booking faster, easier, and more reliable for every Indian.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Our Story & Mission/Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Story */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-7 rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Award size={20} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Our Story</h2>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-650 dark:text-slate-300">
                  India is home to millions of local shops, skilled professionals, and small businesses that serve their communities every day. However, many of them still struggle to reach customers through digital platforms.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-slate-650 dark:text-slate-300 font-semibold text-emerald-600 dark:text-emerald-400">
                  SaathApp was created to solve this problem.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-slate-650 dark:text-slate-300">
                  Instead of replacing local businesses, we help them grow by providing technology, digital visibility, and an online marketplace where customers can discover, compare, and order products and services from nearby verified sellers.
                </p>
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-slate-55 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Our Core Vision Summary</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  Every local business deserves a digital identity, and every customer deserves easy access to trusted local products and services.
                </p>
              </div>
            </motion.section>

            {/* Mission & Vision Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm text-left flex-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    <Target size={20} />
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Our Mission</h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-300">
                  To build India's most trusted hyperlocal commerce ecosystem by connecting customers, businesses, delivery partners, and service professionals through a secure, reliable, and technology-driven platform. We aim to:
                </p>
                <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-350">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>Empower local businesses through digital transformation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>Create new opportunities for delivery partners & service pros.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>Strengthen local economies by promoting neighborhood commerce.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm text-left flex-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <Eye size={20} />
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Our Vision</h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-300">
                  To become India's leading hyperlocal super app and build a technology ecosystem that connects every village, town, and city with local commerce. We enable millions of businesses to scale through digital tools.
                </p>
              </motion.div>

            </div>
          </div>

          {/* What We Offer */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 shadow-sm text-left"
          >
            <div className="max-w-3xl space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">What We Offer</h2>
              <p className="text-sm sm:text-base text-slate-500">
                SaathApp is designed as a multi-category hyperlocal marketplace where customers discover and order products and services from verified local partners.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-55/50 dark:bg-slate-850/40 hover:border-emerald-500/30 transition-all group">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">
                    {item.category}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Why Choose SaathApp? */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="space-y-6 text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white text-center md:text-left">
              Why Choose SaathApp?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {whyChoose.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="space-y-3">
                      <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Our Core Values */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm text-left"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-55/60 dark:bg-slate-850/30 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                      <Icon size={16} />
                      <h3 className="font-bold text-sm text-slate-850 dark:text-slate-200">{val.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val.text}</p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Ecosystem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            
            {/* Our Ecosystem */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="md:col-span-8 rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Our Ecosystem</h2>
              <p className="text-sm text-slate-500 mb-6">Together, we form a connected hyperlocal ecosystem that benefits everyone.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ecosystem.map((member, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-55/30 dark:bg-slate-850/20">
                    <p className="font-black text-sm text-emerald-600 dark:text-emerald-400">{member.role}</p>
                    <p className="text-xs text-slate-650 dark:text-slate-350 mt-1 leading-relaxed">{member.text}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Our Commitment & Future */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="md:col-span-4 rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Our Future</h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Our roadmap focuses on expanding across India while continuously improving our technology platform. Future initiatives include:
                </p>
                <div className="space-y-2">
                  {futurePlans.map((plan, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <ArrowRight size={12} className="text-emerald-500 shrink-0" />
                      <span>{plan}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* Company Information & Contact Details */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-[0_20px_50px_rgba(15,23,42,0.15)] text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Globe size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">Corporate Details</p>
                <h2 className="text-2xl font-black">Company Information</h2>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Name</p>
                <p className="mt-1.5 text-sm font-black text-white">SAATHAPPNOVA PRIVATE LIMITED</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Name</p>
                <p className="mt-1.5 text-sm font-black text-white">SaathApp</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5 md:col-span-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Head Office / Registered Address</p>
                <p className="mt-1.5 text-sm font-black text-white">
                  Bhatahar, Tharthari, Nalanda, Bihar – 801307, India
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Communication Channels</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Customer Support</p>
                    <a href="mailto:support@saathapp.in" className="text-sm font-bold hover:underline text-white">support@saathapp.in</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Company</p>
                    <a href="mailto:company@saathapp.in" className="text-sm font-bold hover:underline text-white">company@saathapp.in</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Careers</p>
                    <a href="mailto:careers@saathapp.in" className="text-sm font-bold hover:underline text-white">careers@saathapp.in</a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-250 font-medium">
                <span className="flex items-center gap-2"><Phone size={14} className="text-emerald-400" /> +91 9128842027</span>
                <span className="flex items-center gap-2">
                  <Globe size={14} className="text-emerald-400" /> 
                  <a href="https://www.saathappnova.co.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-white">
                    www.saathappnova.co.in
                  </a>
                </span>
              </div>
            </div>
          </motion.section>

          {/* Our Promise Footer Banner */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-slate-55/40 dark:bg-slate-900/60 p-6 sm:p-8 text-center space-y-3"
          >
            <h3 className="font-extrabold text-slate-850 dark:text-white text-lg">Our Promise</h3>
            <p className="text-sm text-slate-600 dark:text-slate-350 max-w-3xl mx-auto leading-relaxed">
              At SaathApp, we believe technology should strengthen local communities—not replace them. Every order placed, every service booked, and every business onboarded contributes to a stronger local economy and creates new opportunities for entrepreneurs, workers, and customers alike.
            </p>
            <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              SaathApp – Everything Near You.
            </p>
          </motion.section>

        </div>
      </main>

      {/* Back button bottom */}
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl justify-center">
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="inline-flex">
            <button
              type="button"
              onClick={() => (onBack ? onBack() : navigate('/', { replace: true }))}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
