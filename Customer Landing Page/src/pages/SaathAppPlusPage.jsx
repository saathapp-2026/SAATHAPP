import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Percent,
  Truck,
  Headphones,
  Tag,
  Star,
  Gift,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  HeartHandshake,
  Rocket,
  Wallet,
  Check,
  HelpCircle,
  CreditCard,
  Building,
  Smartphone
} from 'lucide-react';
import Header from '../components/Header';
import LocationBar from '../components/LocationBar';
import Footer from '../components/Footer';
import SubscriptionModal from '../components/plus/SubscriptionModal';
import { useMembership } from '../context/MembershipContext';
import { useNavigate } from 'react-router-dom';

export default function SaathAppPlusPage({
  cartCount,
  onCartClick,
  location,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode,
  onVoiceSearchClick
}) {
  const { PLAN_DETAILS, membership } = useMembership();
  const navigate = useNavigate();

  // Billing Cycle Toggle (Monthly vs Yearly)
  const [billingCycle, setBillingCycle] = useState('monthly');

  // ROI Calculator State
  const [calcOrders, setCalcOrders] = useState(8);
  const [calcDeliveryFee, setCalcDeliveryFee] = useState(30);
  const [calcSpending, setCalcSpending] = useState(4500);

  // Subscription Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('premium');

  // FAQ Accordion State (10 FAQs)
  const [openFaq, setOpenFaq] = useState({});

  const toggleFaq = (index) => {
    setOpenFaq((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const isYearly = billingCycle === 'yearly';

  // ROI Calculations
  const deliverySavings = calcOrders * calcDeliveryFee;
  const memberDiscounts = Math.round(calcSpending * 0.04);
  const couponsOffers = 100;
  const totalSavings = deliverySavings + memberDiscounts + couponsOffers;
  const planCost = isYearly ? PLAN_DETAILS.smart.yearlyPrice : PLAN_DETAILS.smart.monthlyPrice;
  const netSaving = totalSavings - planCost;

  const handleOpenSubscription = (planId) => {
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-page text-theme font-sans transition-colors duration-300">
      {/* SECTION 1: HEADER & LOCATION BAR */}
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
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onVoiceSearchClick={onVoiceSearchClick}
      />
      <LocationBar location={location} onLocationClick={onLocationClick} />

      <main className="flex-1">
        {/* SECTION 2: HERO SECTION */}
        <section className="relative overflow-hidden py-10 sm:py-12 lg:py-14 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent border-b border-theme-border">
          {/* Ambient Lighting Background Accents */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest mb-4 shadow-sm"
            >
              <Sparkles size={15} className="text-amber-500 animate-pulse" />
              <span>NEW · EXPERIENCE PREMIUM</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-theme mb-3"
            >
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                SAATHAPP PLUS
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-2xl lg:text-3xl font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4"
            >
              SAVE MORE. GET FASTER. EXPERIENCE PREMIUM.
            </motion.h2>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto text-base sm:text-lg text-theme-secondary font-medium mb-6 leading-relaxed"
            >
              Unlock exclusive savings, faster delivery, priority support and premium benefits across SaathApp.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => scrollToSection('membership-plans')}
                className="w-full sm:w-auto px-9 py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Crown size={20} />
                <span>JOIN SAATHAPP PLUS</span>
              </button>

              <button
                onClick={() => scrollToSection('compare-plans')}
                className="w-full sm:w-auto px-9 py-4.5 rounded-2xl border-2 border-theme-border bg-surface hover:bg-page text-theme font-extrabold text-sm uppercase tracking-wider hover:border-amber-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>COMPARE PLANS</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: MONTHLY / YEARLY TOGGLE */}
        <section className="py-5 sm:py-6 bg-page/60 border-b border-theme-border">
          <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center">
            <div className="relative flex items-center p-1.5 rounded-full bg-surface border border-theme-border shadow-md">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-9 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20'
                    : 'text-theme-secondary hover:text-theme'
                  }`}
              >
                MONTHLY
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`relative px-9 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20'
                    : 'text-theme-secondary hover:text-theme'
                  }`}
              >
                YEARLY
              </button>

              {/* SAVE 20% Badge */}
              <span className="absolute -top-3.5 -right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-lg shadow-emerald-500/30 animate-bounce">
                SAVE 20%
              </span>
            </div>
            <p className="text-xs text-theme-secondary font-medium mt-2.5">
              {isYearly ? '🎉 Showing discounted yearly rates (billed annually)' : '💡 Switch to yearly to get 20% off all plans'}
            </p>
          </div>
        </section>

        {/* SECTION 4: MEMBERSHIP PLANS (5 Tiers) */}
        <section id="membership-plans" className="py-10 sm:py-12 lg:py-14 bg-page">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-theme dark:text-slate-100">
                Choose Your Plus Plan
              </h2>
              <p className="text-sm sm:text-base text-theme-secondary dark:text-slate-300 mt-3 font-medium">
                Five tiers crafted for every shopping style — upgrade or downgrade anytime.
              </p>
            </div>

            {/* 5 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6 items-stretch">
              {/* Tier 1: Basic Plus */}
              <div className="flex flex-col justify-between p-5 lg:p-6 rounded-[24px] bg-gradient-to-b from-slate-100/70 via-surface to-surface border border-slate-200/90 dark:from-slate-800/40 dark:via-slate-900 dark:to-slate-900 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-500/15 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-sm">
                      ⚡
                    </div>
                    <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">Basic Plus</h3>
                  </div>
                  <div className="my-3">
                    <span className="text-3xl lg:text-4xl font-black text-theme dark:text-slate-100">
                      ₹{isYearly ? PLAN_DETAILS.basic.yearlyPrice : PLAN_DETAILS.basic.monthlyPrice}
                    </span>
                    <span className="text-xs text-theme-secondary dark:text-slate-400 font-medium"> / month</span>
                  </div>
                  <button
                    onClick={() => handleOpenSubscription('basic')}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 text-white font-bold text-xs hover:shadow-md transition-all mb-3.5 cursor-pointer"
                  >
                    SUBSCRIBE NOW
                  </button>
                  <ul className="space-y-2 text-xs text-theme-secondary dark:text-slate-300 font-medium border-t border-slate-200 dark:border-slate-800 pt-3.5">
                    {PLAN_DETAILS.basic.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tier 2: Smart Plus */}
              <div className="flex flex-col justify-between p-5 lg:p-6 rounded-[24px] bg-gradient-to-b from-blue-500/10 via-surface to-surface border border-blue-200/80 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 dark:border-blue-900/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold text-sm">
                      🚀
                    </div>
                    <h3 className="font-extrabold text-base text-blue-600 dark:text-blue-400">Smart Plus</h3>
                  </div>
                  <div className="my-3">
                    <span className="text-3xl lg:text-4xl font-black text-blue-600 dark:text-blue-400">
                      ₹{isYearly ? PLAN_DETAILS.smart.yearlyPrice : PLAN_DETAILS.smart.monthlyPrice}
                    </span>
                    <span className="text-xs text-theme-secondary dark:text-slate-400 font-medium"> / month</span>
                  </div>
                  <button
                    onClick={() => handleOpenSubscription('smart')}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all mb-3.5 cursor-pointer"
                  >
                    SUBSCRIBE NOW
                  </button>
                  <ul className="space-y-2 text-xs text-theme-secondary dark:text-slate-300 font-medium border-t border-blue-200/60 dark:border-blue-900/40 pt-3.5">
                    {PLAN_DETAILS.smart.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tier 3: Premium Plus ⭐ Recommended (HIGHLIGHTED STANDOUT CARD) */}
              <div className="relative flex flex-col justify-between p-5 lg:p-6 rounded-[28px] bg-gradient-to-b from-emerald-500/15 via-surface to-surface border-2 border-emerald-500 dark:from-emerald-950/50 dark:via-slate-900 dark:to-slate-900 dark:border-emerald-500 shadow-2xl shadow-emerald-500/20 transform lg:-translate-y-2 transition-all duration-300 hover:-translate-y-3">
                {/* Recommended Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1 tracking-wider whitespace-nowrap">
                  <Star size={11} className="fill-current text-amber-300" />
                  <span>RECOMMENDED</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 mt-1">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-sm">
                      👑
                    </div>
                    <h3 className="font-black text-lg text-emerald-600 dark:text-emerald-400">Premium Plus</h3>
                  </div>
                  <div className="my-3">
                    <span className="text-4xl lg:text-5xl font-black text-emerald-500">
                      ₹{isYearly ? PLAN_DETAILS.premium.yearlyPrice : PLAN_DETAILS.premium.monthlyPrice}
                    </span>
                    <span className="text-xs text-theme-secondary dark:text-slate-400 font-medium"> / month</span>
                  </div>
                  <button
                    onClick={() => handleOpenSubscription('premium')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-xl shadow-emerald-500/30 transition-all mb-3.5 cursor-pointer uppercase tracking-wider"
                  >
                    SUBSCRIBE NOW
                  </button>
                  <ul className="space-y-2 text-xs text-theme-secondary dark:text-slate-300 font-medium border-t border-emerald-500/30 pt-3.5">
                    {PLAN_DETAILS.premium.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-bold text-theme dark:text-slate-100">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tier 4: Gold Plus */}
              <div className="flex flex-col justify-between p-5 lg:p-6 rounded-[24px] bg-gradient-to-b from-amber-500/12 via-surface to-surface border border-amber-300/70 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 dark:border-amber-900/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold text-sm">
                      🛡️
                    </div>
                    <h3 className="font-extrabold text-base text-amber-600 dark:text-amber-400">Gold Plus</h3>
                  </div>
                  <div className="my-3">
                    <span className="text-3xl lg:text-4xl font-black text-amber-600 dark:text-amber-400">
                      ₹{isYearly ? PLAN_DETAILS.gold.yearlyPrice : PLAN_DETAILS.gold.monthlyPrice}
                    </span>
                    <span className="text-xs text-theme-secondary dark:text-slate-400 font-medium"> / month</span>
                  </div>
                  <button
                    onClick={() => handleOpenSubscription('gold')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 transition-all mb-3.5 cursor-pointer"
                  >
                    SUBSCRIBE NOW
                  </button>
                  <ul className="space-y-2 text-xs text-theme-secondary dark:text-slate-300 font-medium border-t border-amber-200/60 dark:border-amber-900/40 pt-3.5">
                    {PLAN_DETAILS.gold.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tier 5: Platinum Plus (BEST VALUE BADGE) */}
              <div className="relative flex flex-col justify-between p-5 lg:p-6 rounded-[24px] bg-gradient-to-b from-purple-500/12 via-surface to-surface border border-purple-300/70 dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-900 dark:border-purple-900/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Best Value Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md">
                  BEST VALUE
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 mt-1">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold text-sm">
                      💎
                    </div>
                    <h3 className="font-extrabold text-base text-purple-600 dark:text-purple-400">Platinum Plus</h3>
                  </div>
                  <div className="my-3">
                    <span className="text-3xl lg:text-4xl font-black text-purple-600 dark:text-purple-400">
                      ₹{isYearly ? PLAN_DETAILS.platinum.yearlyPrice : PLAN_DETAILS.platinum.monthlyPrice}
                    </span>
                    <span className="text-xs text-theme-secondary dark:text-slate-400 font-medium"> / month</span>
                  </div>
                  <button
                    onClick={() => handleOpenSubscription('platinum')}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all mb-3.5 cursor-pointer"
                  >
                    SUBSCRIBE NOW
                  </button>
                  <ul className="space-y-2 text-xs text-theme-secondary dark:text-slate-300 font-medium border-t border-purple-200/60 dark:border-purple-900/40 pt-3.5">
                    {PLAN_DETAILS.platinum.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: MEMBERSHIP BENEFITS (6 Cards) */}
        <section className="py-10 sm:py-12 lg:py-14 bg-page/40 border-y border-theme-border dark:bg-slate-950/40 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-theme dark:text-slate-100">
                MEMBERSHIP BENEFITS
              </h2>
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 mt-3">
                EVERYTHING YOU GET WHEN YOU UPGRADE TO THE SAATHAPP PREMIUM EXPERIENCE.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {/* Card 1: SAVE MORE */}
              <div className="p-7 sm:p-8 rounded-[28px] bg-surface border border-theme-border/80 dark:bg-slate-900/90 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Wallet size={28} />
                </div>
                <h3 className="font-black text-lg text-theme dark:text-slate-100 uppercase tracking-wider mb-2">SAVE MORE</h3>
                <p className="text-sm text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Unlock discounts, free deliveries and exclusive cashback.
                </p>
              </div>

              {/* Card 2: FAST DELIVERY */}
              <div className="p-7 sm:p-8 rounded-[28px] bg-surface border border-theme-border/80 dark:bg-slate-900/90 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Rocket size={28} />
                </div>
                <h3 className="font-black text-lg text-theme dark:text-slate-100 uppercase tracking-wider mb-2">FAST DELIVERY</h3>
                <p className="text-sm text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Get priority processing and faster delivery where available.
                </p>
              </div>

              {/* Card 3: PRIORITY SUPPORT */}
              <div className="p-7 sm:p-8 rounded-[28px] bg-surface border border-theme-border/80 dark:bg-slate-900/90 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Headphones size={28} />
                </div>
                <h3 className="font-black text-lg text-theme dark:text-slate-100 uppercase tracking-wider mb-2">PRIORITY SUPPORT</h3>
                <p className="text-sm text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Get faster access to dedicated customer support.
                </p>
              </div>

              {/* Card 4: PREMIUM COUPONS */}
              <div className="p-7 sm:p-8 rounded-[28px] bg-surface border border-theme-border/80 dark:bg-slate-900/90 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Tag size={28} />
                </div>
                <h3 className="font-black text-lg text-theme dark:text-slate-100 uppercase tracking-wider mb-2">PREMIUM COUPONS</h3>
                <p className="text-sm text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Receive member-only coupons and rewards.
                </p>
              </div>

              {/* Card 5: EXCLUSIVE DEALS */}
              <div className="p-7 sm:p-8 rounded-[28px] bg-surface border border-theme-border/80 dark:bg-slate-900/90 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Gift size={28} />
                </div>
                <h3 className="font-black text-lg text-theme dark:text-slate-100 uppercase tracking-wider mb-2">EXCLUSIVE DEALS</h3>
                <p className="text-sm text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Access special partner deals and festival offers.
                </p>
              </div>

              {/* Card 6: BETTER EXPERIENCE */}
              <div className="p-7 sm:p-8 rounded-[28px] bg-surface border border-theme-border/80 dark:bg-slate-900/90 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Star size={28} />
                </div>
                <h3 className="font-black text-lg text-theme dark:text-slate-100 uppercase tracking-wider mb-2">BETTER EXPERIENCE</h3>
                <p className="text-sm text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Enjoy priority services, early access and premium features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CHECKOUT ADVANTAGES (Dark Navy Theme - Reference Layout) */}
        <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-b from-[#090F22] via-[#0B132B] to-[#0D1836] text-white relative overflow-hidden">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            {/* Header & Delivery Rider Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
              {/* Left Column: Heading, Subtitle & 5 Vertical Benefit Cards (8 cols on lg) */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                    CHECKOUT ADVANTAGES
                  </h2>
                  <p className="text-base text-slate-300 font-medium mt-3">
                    Experience the magic of SaathApp Plus every time you shop.
                  </p>
                </div>

                {/* 5 Vertical Stacked Benefit Cards in a Horizontal Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
                  {/* Card 1: FREE DELIVERY APPLIED */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#121B35]/90 border border-slate-700/60 hover:border-emerald-500/60 shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[170px] sm:min-h-[190px] group cursor-default">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Truck size={26} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100 leading-tight">
                      FREE DELIVERY<br />APPLIED
                    </div>
                  </div>

                  {/* Card 2: PRIORITY DELIVERY ENABLED */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#121B35]/90 border border-slate-700/60 hover:border-blue-500/60 shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[170px] sm:min-h-[190px] group cursor-default">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Rocket size={26} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100 leading-tight">
                      PRIORITY DELIVERY<br />ENABLED
                    </div>
                  </div>

                  {/* Card 3: MEMBER DISCOUNT APPLIED */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#121B35]/90 border border-slate-700/60 hover:border-rose-500/60 shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[170px] sm:min-h-[190px] group cursor-default">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
                      <Percent size={26} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100 leading-tight">
                      MEMBER DISCOUNT<br />APPLIED
                    </div>
                  </div>

                  {/* Card 4: PRIORITY SUPPORT ENABLED */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#121B35]/90 border border-slate-700/60 hover:border-purple-500/60 shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[170px] sm:min-h-[190px] group cursor-default">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                      <Headphones size={26} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100 leading-tight">
                      PRIORITY SUPPORT<br />ENABLED
                    </div>
                  </div>

                  {/* Card 5: FASTER DELIVERY ESTIMATE */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#121B35]/90 border border-slate-700/60 hover:border-teal-500/60 shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[170px] sm:min-h-[190px] group cursor-default">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                      <Clock size={26} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100 leading-tight">
                      FASTER DELIVERY<br />ESTIMATE
                    </div>
                  </div>
                </div>

                {/* Carousel Dots */}
                <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                </div>
              </div>

              {/* Right Column: Delivery Rider Graphic Card (4 cols on lg) */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-sm p-6 rounded-3xl bg-gradient-to-b from-[#152244] via-[#101935] to-[#0D142B] border border-slate-700/60 shadow-2xl overflow-hidden flex flex-col items-center text-center">
                  {/* Delivery Hero Avatar Graphic */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 p-1.5 shadow-2xl shadow-emerald-500/30 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                        <span className="text-6xl">🚚</span>
                      </div>
                    </div>
                    {/* Thumbs up badge */}
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white font-black text-xs p-2 rounded-full shadow-lg border-2 border-slate-900 flex items-center justify-center">
                      👍
                    </div>
                  </div>

                  {/* Parcel Box Graphic */}
                  <div className="w-full py-3 px-4 rounded-2xl bg-amber-900/40 border border-amber-500/40 flex items-center justify-between text-amber-200 font-extrabold text-xs mb-3 shadow-inner">
                    <span className="flex items-center gap-2">📦 SaathApp Package</span>
                    <span className="text-emerald-400 font-black">EXPRESS</span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Guaranteed priority handling by certified SaathApp delivery partners.
                  </p>
                </div>
              </div>
            </div>

            {/* Side-by-side comparison box */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Regular User */}
              <div className="p-8 rounded-[32px] bg-[#1C2541]/90 border border-slate-700/60 space-y-5 shadow-xl">
                <div className="text-xs font-black uppercase tracking-widest text-slate-400">Regular User</div>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-3">
                    <span className="text-slate-300 font-medium">Delivery Fee:</span>
                    <span className="font-extrabold text-rose-400 text-base">₹40</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-3">
                    <span className="text-slate-300 font-medium">Estimated Delivery:</span>
                    <span className="font-extrabold text-slate-300 text-base">45 min</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300 font-medium">Support Priority:</span>
                    <span className="text-slate-400 font-bold">Standard</span>
                  </div>
                </div>
              </div>

              {/* SaathApp Plus Member */}
              <div className="p-8 rounded-[32px] bg-gradient-to-br from-emerald-500/20 via-[#1C2541] to-[#1C2541] border-2 border-emerald-500 space-y-5 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-widest text-emerald-400">SaathApp Plus Member</div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-[10px] tracking-wider uppercase shadow-md">PLUS SAVER</span>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center text-sm border-b border-emerald-500/20 pb-3">
                    <span className="text-slate-300 font-medium">Delivery Fee:</span>
                    <span className="font-black text-emerald-400 text-lg">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-emerald-500/20 pb-3">
                    <span className="text-slate-300 font-medium">Estimated Delivery:</span>
                    <span className="font-black text-amber-400 text-base flex items-center gap-1.5">
                      <Zap size={16} /> 30 min
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300 font-medium">Support Priority:</span>
                    <span className="font-black text-amber-400">Instant VIP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 & 8: COMPARE PLANS & ROI CALCULATOR */}
        <section id="compare-plans" className="py-10 sm:py-12 lg:py-14 bg-page">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-theme dark:text-slate-100">
                COMPARE PLANS & CALCULATE SAVINGS
              </h2>
              <p className="text-base text-theme-secondary dark:text-slate-300 font-medium mt-3">
                Find the perfect membership for your needs and see your exact monthly returns.
              </p>
            </div>

            {/* Grid for Compare Table + ROI Calculator Side by Side on Large Screens */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Compare Table (8 cols on lg) */}
              <div className="lg:col-span-7 overflow-x-auto rounded-[28px] border border-theme-border/80 dark:border-slate-800 bg-surface dark:bg-slate-900/90 shadow-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="transition-colors hover:bg-emerald-50/30 border-b border-theme-border dark:border-slate-800 bg-page/70 dark:bg-slate-950/80 text-theme dark:text-slate-100 font-black">
                      <th className="p-4 sm:p-5">Feature</th>
                      <th className="p-4 sm:p-5 text-center">Basic</th>
                      <th className="p-4 sm:p-5 text-center">Smart</th>
                      <th className="p-4 sm:p-5 text-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20">Premium ⭐</th>
                      <th className="p-4 sm:p-5 text-center">Gold</th>
                      <th className="p-4 sm:p-5 text-center">Platinum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-border/60 dark:divide-slate-800 text-theme-secondary dark:text-slate-300 font-medium">
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Free Deliveries</td>
                      <td className="p-4 text-center">5/mo</td>
                      <td className="p-4 text-center">10/mo</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">Eligible orders</td>
                      <td className="p-4 text-center font-bold">Eligible orders</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Priority</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Delivery Speed</td>
                      <td className="p-4 text-center">Faster</td>
                      <td className="p-4 text-center">Faster</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">Priority</td>
                      <td className="p-4 text-center font-bold">Super Fast</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Fastest</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Support Level</td>
                      <td className="p-4 text-center">Priority</td>
                      <td className="p-4 text-center">Premium</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">Premium</td>
                      <td className="p-4 text-center font-bold">VIP</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Instant VIP</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Exclusive Coupons</td>
                      <td className="p-4 text-center">✓</td>
                      <td className="p-4 text-center">✓</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">✓</td>
                      <td className="p-4 text-center font-bold">✓</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Premium</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Cashback</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center">Extra</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">Extra</td>
                      <td className="p-4 text-center font-bold">Premium</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Premium</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Priority Booking (Services)</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">✓</td>
                      <td className="p-4 text-center font-bold">✓</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Free</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Family Sharing</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center bg-emerald-500/5 dark:bg-emerald-500/10">—</td>
                      <td className="p-4 text-center font-bold">2 members</td>
                      <td className="p-4 text-center font-bold text-emerald-500">5 members</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Festival Offers</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center">✓</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">Priority</td>
                      <td className="p-4 text-center font-bold">✓</td>
                      <td className="p-4 text-center font-bold text-emerald-500">✓</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Beta Access</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">✓</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Early</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-extrabold text-theme dark:text-slate-100">Refund Priority</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center">—</td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10">Faster</td>
                      <td className="p-4 text-center font-bold">Instant</td>
                      <td className="p-4 text-center font-bold text-emerald-500">Instant</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ROI Calculator Widget (5 cols on lg) */}
              <div className="lg:col-span-5 p-8 lg:p-9 rounded-[32px] bg-surface dark:bg-slate-900/90 border border-theme-border/80 dark:border-slate-800 shadow-xl space-y-6">
                <div>
                  <h3 className="text-xl font-black text-theme dark:text-slate-100 uppercase tracking-tight">
                    Will SaathApp Plus Save You Money?
                  </h3>
                  <p className="text-xs text-theme-secondary dark:text-slate-400 mt-1 font-medium">
                    Calculate your potential monthly savings.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="flex justify-between text-xs font-bold text-theme dark:text-slate-200 mb-2">
                      <span>Monthly Orders</span>
                      <span className="text-amber-500 font-extrabold">{calcOrders} orders</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={calcOrders}
                      onChange={(e) => setCalcOrders(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-200 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-xs font-bold text-theme dark:text-slate-200 mb-2">
                      <span>Average Delivery Fee</span>
                      <span className="text-amber-500 font-extrabold">₹{calcDeliveryFee}</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={calcDeliveryFee}
                      onChange={(e) => setCalcDeliveryFee(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-200 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-xs font-bold text-theme dark:text-slate-200 mb-2">
                      <span>Average Monthly Spending</span>
                      <span className="text-amber-500 font-extrabold">₹{calcSpending.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min={500}
                      max={20000}
                      step={500}
                      value={calcSpending}
                      onChange={(e) => setCalcSpending(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-200 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-page/70 dark:bg-slate-950/80 border border-theme-border/80 dark:border-slate-800 space-y-3 text-xs">
                  <div className="text-[11px] font-black uppercase tracking-widest text-theme-secondary dark:text-slate-400 mb-1">
                    Estimated Monthly Savings
                  </div>
                  <div className="flex justify-between text-theme-secondary dark:text-slate-300">
                    <span>Delivery Savings</span>
                    <span className="font-bold text-theme dark:text-slate-100">₹{deliverySavings}</span>
                  </div>
                  <div className="flex justify-between text-theme-secondary dark:text-slate-300">
                    <span>Member Discounts</span>
                    <span className="font-bold text-theme dark:text-slate-100">₹{memberDiscounts}</span>
                  </div>
                  <div className="flex justify-between text-theme-secondary dark:text-slate-300">
                    <span>Coupons & Offers</span>
                    <span className="font-bold text-theme dark:text-slate-100">₹{couponsOffers}</span>
                  </div>

                  <div className="border-t border-theme-border/80 dark:border-slate-800 pt-2 flex justify-between font-extrabold text-sm text-theme dark:text-slate-100">
                    <span>Total Savings</span>
                    <span className="text-emerald-500">₹{totalSavings}</span>
                  </div>

                  <div className="flex justify-between text-theme-secondary dark:text-slate-400 text-xs">
                    <span>Membership Cost (Smart Plus)</span>
                    <span>₹{planCost}</span>
                  </div>

                  <div className="border-t border-theme-border/80 dark:border-slate-800 pt-3 flex justify-between items-center">
                    <span className="font-black text-sm uppercase text-theme dark:text-slate-100">NET SAVING</span>
                    <span className="text-2xl font-black text-amber-500">₹{netSaving}</span>
                  </div>

                  <button
                    onClick={() => handleOpenSubscription('smart')}
                    className="w-full py-4 mt-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer"
                  >
                    GET SMART PLUS
                  </button>
                  <p className="text-[10px] text-center text-theme-secondary dark:text-slate-400 italic mt-1">
                    *Savings are estimated and may vary based on location and usage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: WHY SAATHAPP PLUS (ECOSYSTEM + FESTIVAL CONNECTION) */}
        <section className="py-10 sm:py-12 lg:py-14 bg-page">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-theme dark:text-slate-100">
                WHY SAATHAPP PLUS?
              </h2>
              <p className="text-base text-theme-secondary dark:text-slate-300 font-medium mt-3">
                It's not merely a delivery subscription. It's a complete SaathApp ecosystem membership.
              </p>
            </div>

            {/* Ecosystem Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
              <div className="p-8 rounded-[28px] bg-surface dark:bg-slate-900/90 border border-theme-border/80 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl transition-all text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center font-black text-2xl">
                  🛍️
                </div>
                <h3 className="font-black text-lg uppercase text-theme dark:text-slate-100">SHOPPING</h3>
                <p className="text-xs text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Free delivery on grocery, electronics, fashion & extra cashback on every checkout.
                </p>
              </div>

              <div className="p-8 rounded-[28px] bg-surface dark:bg-slate-900/90 border border-theme-border/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center font-black text-2xl">
                  🛠️
                </div>
                <h3 className="font-black text-lg uppercase text-theme dark:text-slate-100">SERVICES</h3>
                <p className="text-xs text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Priority booking for electricians, plumbers, home repairs & faster support dispatch.
                </p>
              </div>

              <div className="p-8 rounded-[28px] bg-surface dark:bg-slate-900/90 border border-theme-border/80 dark:border-slate-800 hover:border-purple-500/50 hover:shadow-xl transition-all text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center font-black text-2xl">
                  🎁
                </div>
                <h3 className="font-black text-lg uppercase text-theme dark:text-slate-100">OFFERS</h3>
                <p className="text-xs text-theme-secondary dark:text-slate-300 font-medium leading-relaxed">
                  Member-only coupons, flash deal early access & festival season rewards.
                </p>
              </div>
            </div>

            {/* Festival + Spiritual / Puja Category Connection */}
            <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/40 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-4 max-w-xl">
                  <span className="px-3.5 py-1 rounded-full bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest shadow-sm">
                    FESTIVAL & SPIRITUAL PUJA PERKS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-theme dark:text-slate-100">
                    Exclusive Festival Benefits Year-Round
                  </h3>
                  <p className="text-xs sm:text-sm text-theme-secondary dark:text-slate-300 leading-relaxed font-medium">
                    Enjoy early access and special savings during major festive celebrations like <span className="font-extrabold text-theme dark:text-slate-100">Diwali, Chhath Puja, Navratri, Janmashtami, and Mahashivratri</span>:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-theme dark:text-slate-200 pt-2">
                    <li className="flex items-center gap-2">✦ Early access to festival deals</li>
                    <li className="flex items-center gap-2">✦ Exclusive Puja Kit discounts</li>
                    <li className="flex items-center gap-2">✦ Free/discounted eligible delivery</li>
                    <li className="flex items-center gap-2">✦ Exclusive festival coupons</li>
                    <li className="flex items-center gap-2">✦ Priority delivery for puja items</li>
                    <li className="flex items-center gap-2">✦ Early access to Festival Collections</li>
                  </ul>
                </div>

                <div className="shrink-0 text-center p-8 rounded-[28px] bg-surface dark:bg-slate-900/90 border border-amber-500/40 shadow-xl">
                  <div className="text-5xl mb-3">🪔 🌸 🙏</div>
                  <div className="font-black text-base text-amber-600 dark:text-amber-400 uppercase">Spiritual & Puja Ready</div>
                  <div className="text-xs text-theme-secondary dark:text-slate-400 mt-2 max-w-[220px] font-medium leading-relaxed">
                    Never miss a puja item during peak festive rush.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: FAQ SECTION */}
        <section className="py-8 sm:py-10 bg-page/40 dark:bg-slate-950/40 border-t border-theme-border dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-theme dark:text-slate-100">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="text-base text-theme-secondary dark:text-slate-300 font-medium mt-2">
                Have questions about SaathApp Plus? We've got answers.
              </p>
            </div>

            {/* 2-Column Accordion Grid for Desktop, 1-Column for Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 items-start">
              {[
                {
                  q: "What is SaathApp Plus?",
                  a: "SaathApp Plus is our premium membership program offering free deliveries, faster processing, exclusive member coupons, priority customer support, and special ecosystem perks across Shopping, Services, and Offers."
                },
                {
                  q: "How does monthly vs yearly billing work?",
                  a: "Monthly plans bill automatically every 30 days. Yearly plans are billed upfront once per year at a 20% discounted rate, saving you money over 12 months."
                },
                {
                  q: "Can I upgrade my plan later?",
                  a: "Yes! You can upgrade your plan tier anytime from your Membership Dashboard. The price difference will be prorated."
                },
                {
                  q: "Can I cancel my membership?",
                  a: "Absolutely. You can cancel anytime from your account dashboard with zero cancellation fees. Your benefits remain active until the end of your current billing period."
                },
                {
                  q: "What is your refund policy?",
                  a: "If you cancel within 48 hours of subscribing without having used any free delivery benefits, you are eligible for a full refund."
                },
                {
                  q: "Does the subscription auto-renew?",
                  a: "Yes, subscriptions renew automatically at the end of each billing cycle unless cancelled beforehand."
                },
                {
                  q: "Are all deliveries free?",
                  a: "Deliveries on eligible orders above minimum order values are 100% free for Premium Plus, Gold Plus, and Platinum Plus members. Basic and Smart Plus tiers include monthly free delivery credits."
                },
                {
                  q: "Can my family use my membership?",
                  a: "Family sharing is available on Gold Plus (up to 2 members) and Platinum Plus (up to 5 members) tiers."
                },
                {
                  q: "Which benefits are available in my location?",
                  a: "All digital benefits, coupons, and cashback are available nationwide. Fast delivery slots and priority service booking depend on active local partner coverage."
                },
                {
                  q: "Can I use Plus benefits on Services?",
                  a: "Yes! SaathApp Plus members receive priority booking, zero service dispatch fee, and dedicated customer support for all electrical, plumbing, and home repair services."
                }
              ].map((faq, idx) => {
                const isOpen = !!openFaq[idx];
                return (
                  <div
                    key={idx}
                    className={`group rounded-[20px] sm:rounded-[24px] border transition-all duration-300 shadow-xs hover:shadow-md ${
                      isOpen
                        ? 'bg-gradient-to-r from-amber-500/[0.06] via-surface to-amber-500/[0.04] dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border-amber-500/50 shadow-amber-500/10'
                        : 'bg-gradient-to-r from-emerald-500/[0.02] via-slate-50/90 to-amber-500/[0.02] dark:from-slate-900/90 dark:to-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-3.5 sm:p-4.5 px-4 sm:px-5 text-left font-black text-xs sm:text-sm text-theme dark:text-slate-100 flex items-center justify-between gap-3.5 cursor-pointer"
                    >
                      <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {faq.q}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30 rotate-180'
                            : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-amber-500/15 group-hover:text-amber-500'
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-theme-secondary dark:text-slate-300 leading-relaxed border-t border-amber-500/20 dark:border-slate-800/80 pt-3 font-medium"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 11: PAYMENT METHODS BAR */}
        <section className="py-10 sm:py-12 bg-page/40 dark:bg-slate-950/40 border-t border-theme-border dark:border-slate-800 text-center">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-emerald-500/[0.04] via-surface to-amber-500/[0.04] dark:from-slate-900/90 dark:via-slate-900/95 dark:to-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100 mb-6">
                SUPPORTED PAYMENT GATEWAYS & PAYMENT METHODS
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 text-xs sm:text-sm font-extrabold">
                <span className="px-5 py-3 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-2.5">
                  <Smartphone size={18} className="text-amber-500 shrink-0" />
                  <span>UPI (GPay / PhonePe / Paytm)</span>
                </span>
                <span className="px-5 py-3 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-900 dark:text-blue-300 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-2.5">
                  <CreditCard size={18} className="text-blue-500 shrink-0" />
                  <span>Visa / Mastercard / RuPay</span>
                </span>
                <span className="px-5 py-3 rounded-full bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/30 text-purple-900 dark:text-purple-300 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-2.5">
                  <Building size={18} className="text-purple-500 shrink-0" />
                  <span>Net Banking (50+ Banks)</span>
                </span>
                <span className="px-5 py-3 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-2.5">
                  <Wallet size={18} className="text-emerald-500 shrink-0" />
                  <span>Wallets & Pay Later</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* SUBSCRIPTION MODAL WIZARD */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlanId={selectedPlanId}
        initialBillingCycle={billingCycle}
      />
    </div>
  );
}
