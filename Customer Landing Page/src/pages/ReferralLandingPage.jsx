import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gift,
  Users,
  Award,
  ShieldCheck,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  MessageSquare,
  Mail,
  Smartphone,
  ChevronDown,
  ArrowLeft,
  ShoppingBag,
  Tag,
  Store,
  Sparkles,
} from 'lucide-react';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import {
  REFERRAL_TYPES,
  submitReferral,
  generateReferralLink,
  getSocialShareLinks,
} from '../services/referralService';

export default function ReferralLandingPage({
  user = null,
  cartCount = 0,
  location = 'Bengaluru, Karnataka',
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated = false,
  darkMode = false,
  toggleDarkMode,
}) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [referralType, setReferralType] = useState('Customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralLink = generateReferralLink(user);
  const socialLinks = getSocialShareLinks(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) return;

    setIsSubmitting(true);
    const formattedPhone = `${countryCode} ${mobileNumber.trim()}`;

    submitReferral(
      {
        referredName: fullName,
        referredPhone: formattedPhone,
        referredEmail: emailAddress,
        referralType: referralType,
      },
      user
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Header / Navigation */}
      <TopNav
        cartCount={cartCount}
        location={location}
        onCartClick={onCartClick || (() => navigate('/cart'))}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin || (() => navigate('/login'))}
        onSignup={onSignup || (() => navigate('/signup'))}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50 via-teal-50/50 to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 border-b border-emerald-100/60 dark:border-emerald-900/30 py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Hero Details */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded-full text-[11px] font-extrabold tracking-wider uppercase">
                  <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Refer & Grow Together</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    Refer Someone.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                      Grow Together.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                    Invite people to join SaathApp and help them discover the best local products and services. Together, let's build a stronger local community.
                  </p>
                </div>

                {/* 3 Feature Pills */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-xl flex flex-col items-center text-center space-y-1.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Users size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Help Others</span>
                    <p className="text-[10px] text-slate-500 leading-tight hidden sm:block">Introduce SaathApp to benefit others</p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-xl flex flex-col items-center text-center space-y-1.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                      <Gift size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Earn Rewards</span>
                    <p className="text-[10px] text-slate-500 leading-tight hidden sm:block">Get exciting rewards when they join</p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-xl flex flex-col items-center text-center space-y-1.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Build Community</span>
                    <p className="text-[10px] text-slate-500 leading-tight hidden sm:block">Support local sellers & ecosystem</p>
                  </div>
                </div>

                {/* Direct Share Link Box */}
                <div className="bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/60 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Share2 size={14} className="text-emerald-600" />
                      Your Referral Link:
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      1-Click Share
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* 1-Click Social Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare size={13} />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={socialLinks.sms}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Smartphone size={13} />
                      <span>SMS</span>
                    </a>
                    <a
                      href={socialLinks.email}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Mail size={13} />
                      <span>Email</span>
                    </a>
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Facebook</span>
                    </a>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>𝕏 X</span>
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Form Card & Visual Card (PDF Page 7 Exact Mockup) */}
              <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Embedded Form Card */}
                <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl text-left flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Refer Someone to SaathApp
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
                      Fill in the details below and we'll take care of the rest.
                    </p>

                    {isSubmitted ? (
                      <div className="py-8 text-center space-y-3">
                        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 size={32} />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          Referral Submitted!
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                          Thank you for referring <span className="font-semibold text-slate-800 dark:text-slate-200">{fullName}</span>. We will reach out to them soon!
                        </p>
                        <button
                          onClick={() => {
                            setIsSubmitted(false);
                            setFullName('');
                            setMobileNumber('');
                            setEmailAddress('');
                          }}
                          className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold underline cursor-pointer"
                        >
                          Refer Another Person
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-2">
                            <div className="relative shrink-0">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="h-10 pl-2.5 pr-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none appearance-none cursor-pointer"
                              >
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                              </select>
                              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                            </div>
                            <input
                              type="tel"
                              required
                              placeholder="Enter mobile number"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="Enter email address"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        {/* Who are you referring? */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Who are you referring? <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={referralType}
                              onChange={(e) => setReferralType(e.target.value)}
                              className="w-full h-10 pl-3 pr-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                            >
                              {REFERRAL_TYPES.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Send Referral Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            <Send size={14} />
                            <span>{isSubmitting ? 'Sending...' : 'Send Referral'}</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-400 text-center font-medium mt-3">
                    🔒 We respect your privacy. Your details are safe with us.
                  </p>
                </div>

                {/* Right Visual Card Showcase */}
                <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="space-y-4 relative z-10 text-left">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">You're invited!</h3>
                      <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                        Join SaathApp and enjoy amazing products, services and local deals.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 relative z-10">
                    <button
                      onClick={() => navigate('/products')}
                      className="w-full py-2.5 bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      Join Now
                    </button>
                  </div>

                  {/* Subtle Background Art */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                How It Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Simple 4-step process to refer anyone into the SaathApp hyperlocal ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  1
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Refer Someone</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Fill in their details and submit the referral form.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  2
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">We Reach Out</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We will contact them and help them get onboarded easily.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  3
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">They Join & Grow</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  When they join SaathApp and start selling, buying or servicing.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  4
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">You Earn Rewards</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  You earn exciting rewards for successful referrals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Why Refer Someone? */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Why Refer Someone?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Help friends, sellers, and service technicians unlock hyper-local opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Great Products & Services</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    They get access to the best local products, technician repairs, and fast delivery.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                  <Tag size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Exclusive Offers</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    They get exciting welcome discounts and benefits on their initial orders.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                  <Store size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Support Local</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Empower local neighbourhood shops, farmers, and technicians to grow digital business.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Stronger Community</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Together we build a self-reliant, transparent, and connected local marketplace.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Trust Banner (PDF Page 7) */}
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 py-3.5 px-6 rounded-2xl text-center flex items-center justify-center gap-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              <span>
                Trusted by thousands of users across India. SaathApp is India's premier hyperlocal marketplace.
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
