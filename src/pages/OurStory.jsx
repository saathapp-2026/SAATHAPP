import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowLeft, ChevronUp, Mail, MapPin, Globe, User, BookOpen, 
  Sparkles, Heart, Compass, Award 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OurStory({ onBack, onLogout, isAuthenticated = false, user = null, darkMode = false, toggleDarkMode = () => {} }) {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll tracking for progress bar and back-to-top button
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = 'Our Story | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const descText = 'Learn the inspiring journey behind SaathApp and the vision of SAATHAPPNOVA PRIVATE LIMITED to digitally empower local businesses and communities across India.';
    if (metaDescription) {
      metaDescription.setAttribute('content', descText);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descText;
      document.head.appendChild(meta);
    }

    // Scroll restoration
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/', { replace: true });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 relative" style={{ scrollBehavior: 'smooth' }}>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50" 
        style={{ scaleX }} 
      />

      {/* Header */}
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

      {/* Top Back to Home Button */}
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl">
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="inline-flex">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 py-2 text-sm font-semibold text-slate-750 dark:text-slate-300 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          
          {/* Hero Banner Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-emerald-100 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 sm:p-10 lg:p-12 text-white shadow-[0_20px_50px_rgba(16,185,129,0.15)] text-left"
          >
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.25em]">
                <BookOpen size={14} />
                Our Story
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                OUR STORY
              </h1>
              <p className="text-lg font-bold text-emerald-100 uppercase tracking-wider">
                SAATHAPPNOVA PRIVATE LIMITED
              </p>
              <div className="h-1 w-16 bg-white/30 rounded-full" />
              <p className="text-xl sm:text-2xl font-black text-emerald-50">
                Building the Future of Bharat — Together.
              </p>
            </div>
          </motion.section>

          {/* Timeline & Story Text Container */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm text-left relative overflow-hidden"
          >
            {/* Timeline Line decorator (for large screens) */}
            <div className="absolute left-8 sm:left-14 top-16 bottom-16 w-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block" />

            <div className="space-y-12">
              
              {/* Timeline Block 1 */}
              <div className="relative md:pl-16 grid grid-cols-1 gap-3">
                {/* Bullet */}
                <div className="absolute left-8 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Compass size={16} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Every great journey begins with a problem</h3>
                </div>
                <div className="text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
                  <p>
                    SaathApp was not created in a corporate boardroom or by following a trend. It was born from real-life experiences, everyday challenges, and a simple question:
                  </p>
                  <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic font-bold text-slate-800 dark:text-slate-100 my-3">
                    "Why should accessing local products and services still be so difficult in the digital age?"
                  </blockquote>
                  <p>
                    I am Saurabh Kumar, born and raised in Village Bhatahar, District Nalanda, Bihar, India. While pursuing my Bachelor of Technology (B.Tech) in Computer Science and Engineering at Lovely Professional University (LPU), Punjab, I realized that the problems faced by people in villages, towns, and even many cities were very different from those being solved by existing digital platforms.
                  </p>
                </div>
              </div>

              {/* Timeline Block 2 */}
              <div className="relative md:pl-16 grid grid-cols-1 gap-3">
                {/* Bullet */}
                <div className="absolute left-8 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <MapPin size={16} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Identifying the Local Underserved Communities</h3>
                </div>
                <div className="text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
                  <p>
                    Every day, we saw people struggling to find reliable local shops, skilled workers, trusted service professionals, construction materials, agricultural supplies, spare parts, electricians, plumbers, carpenters, hospitals, hotels, transport services, and many other essential services. Small shop owners and local businesses wanted to grow digitally but lacked affordable technology, online visibility, and access to customers.
                  </p>
                  <p>
                    At the same time, we observed that many large technology companies primarily focused on metropolitan cities and major urban markets. While these platforms transformed commerce in large cities, millions of businesses and customers in villages, small towns, and developing regions remained underserved.
                  </p>
                </div>
              </div>

              {/* Timeline Block 3 */}
              <div className="relative md:pl-16 grid grid-cols-1 gap-3">
                {/* Bullet */}
                <div className="absolute left-8 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">A Shared Vision: SaathApp</h3>
                </div>
                <div className="text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
                  <p>
                    This inspired a vision. Instead of building another online marketplace, we wanted to create a platform that strengthens local economies, empowers businesses of every size, and connects every participant in the local ecosystem.
                  </p>
                  <p>
                    That vision became SaathApp. The name "Saath" represents togetherness. Our belief is that real progress happens when people grow together. SaathApp is designed to bring together customers, local shops, retailers, wholesalers, manufacturers, service professionals, delivery partners, startups, companies, hospitals, hotels, educational institutions, logistics providers, and many other businesses on one trusted digital platform.
                  </p>
                </div>
              </div>

              {/* Timeline Block 4 */}
              <div className="relative md:pl-16 grid grid-cols-1 gap-3">
                {/* Bullet */}
                <div className="absolute left-8 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Heart size={16} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Empowering Local Ecosystems</h3>
                </div>
                <div className="text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
                  <p>
                    Our goal is not simply to help people buy products online. We want to create opportunities. We want a local grocery store to compete digitally with larger retailers. We want a hardware shop to receive online orders from nearby customers. We want electricians, plumbers, carpenters, mechanics, technicians, and other skilled professionals to find work through technology. We want small manufacturers to reach new markets without requiring expensive digital infrastructure. We want hospitals, hotels, pharmacies, restaurants, schools, coaching institutes, and service providers to connect directly with the communities they serve.
                  </p>
                  <p>
                    SaathApp is built to support businesses at every stage—from small family-owned stores and local vendors to retailers, distributors, wholesalers, manufacturers, and established enterprises. We also aim to provide businesses with advertising, digital visibility, customer engagement tools, and technology solutions that help them grow sustainably.
                  </p>
                </div>
              </div>

              {/* Timeline Block 5 */}
              <div className="relative md:pl-16 grid grid-cols-1 gap-3">
                {/* Bullet */}
                <div className="absolute left-8 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Award size={16} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Connecting Villages, Towns, and Cities</h3>
                </div>
                <div className="text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
                  <p>
                    We believe technology should not be limited to a few large cities. Innovation should reach every village, every town, every district, and every state. Our long-term vision is to build a technology ecosystem that contributes to the digital transformation of Bharat. We aspire to support local entrepreneurship, create employment opportunities, strengthen supply chains, encourage innovation, and help businesses embrace digital commerce.
                  </p>
                  <p>
                    SaathApp is more than a marketplace. It is a platform built with the belief that every business deserves an opportunity to grow, every worker deserves access to better opportunities, every customer deserves trusted local services, and every community deserves technology that works for them.
                  </p>
                  <p>
                    This journey started with one student's observation of everyday problems. Today, it continues with a larger mission—to build solutions that connect people, businesses, and communities while contributing to the future of a stronger, more digitally connected India. SaathApp is not just about technology. It is about empowering people, enabling businesses, and building the future of Bharat—together.
                  </p>
                </div>
              </div>

            </div>
          </motion.section>

          {/* A Message from the Founder */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm text-left space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <User size={20} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">A Message from the Founder</h2>
            </div>
            
            <div className="text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
              <p className="font-bold text-slate-800 dark:text-white">Dear Friends,</p>
              <p>
                SaathApp was born from the same everyday experiences that millions of Indians face. We have stood in long queues, searched for trusted services, struggled to find nearby businesses, and seen hardworking shopkeepers, workers, and small entrepreneurs miss opportunities simply because they were not digitally connected.
              </p>
              <p>
                Coming from a small village in Bihar, I have always believed that talent, hard work, and dreams are not limited by where someone is born. Every village, every town, every city, every shop, every worker, and every family deserves equal opportunities to grow.
              </p>
              <p>
                SaathApp is our humble effort to bring people closer, strengthen local businesses, create employment, and build a future where technology works for everyone—not just a few.
              </p>
              <p>
                This is not only our dream; it is a shared journey with every customer, every seller, every delivery partner, every service professional, and every entrepreneur who believes in the power of growing together.
              </p>
              <p>
                Thank you for believing in us and becoming a part of this journey. Together, let us build a stronger, smarter, and more connected Bharat.
              </p>
              <p className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">ALWAYS With You.</p>
              
              <div className="pt-2">
                <p className="font-black text-slate-850 dark:text-slate-100">Best Regards,</p>
                <p className="font-black text-lg text-emerald-600 dark:text-emerald-450 mt-1">Saurabh Kumar</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Founder & Chief Executive Officer (CEO)</p>
                <p className="text-xs text-slate-500 font-bold">SAATHAPPNOVA PRIVATE LIMITED (SaathApp)</p>
              </div>
            </div>

            {/* Premium Founder Information Card */}
            <div className="mt-8 border-t border-slate-150 dark:border-slate-800 pt-8">
              <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-slate-55/40 dark:bg-slate-900/60 p-6 sm:p-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between hover:shadow-soft transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <User size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-slate-900 dark:text-white">Saurabh Kumar</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Founder & CEO</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs sm:text-sm font-semibold text-slate-650 dark:text-slate-350">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-slate-800 dark:text-slate-250 text-xs uppercase tracking-wider mb-0.5">Registered Office</span>
                        <span className="leading-relaxed">
                          Bhatahar, Tharthari,<br />
                          Nalanda,<br />
                          Bihar – 801307<br />
                          India
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:text-right">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 md:justify-end">
                      <Mail size={12} className="text-emerald-500" /> Email
                    </p>
                    <a 
                      href="mailto:founder@saathapp.in" 
                      className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline block"
                    >
                      founder@saathapp.in
                    </a>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 md:justify-end">
                      <Globe size={12} className="text-emerald-500" /> Website
                    </p>
                    <a 
                      href="https://www.saurabhkumar15689.live" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline block"
                    >
                      www.saurabhkumar15689.live
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </motion.section>

        </div>
      </main>

      {/* Bottom Back to Home Button */}
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl justify-center">
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="inline-flex">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-350 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-450"
          title="Scroll to Top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}

    </div>
  );
}
