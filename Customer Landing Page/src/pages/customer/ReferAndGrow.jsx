import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Gift,
  Users,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronDown,
  UserPlus,
  ShoppingBag,
  Tag,
  Store,
  Share2,
  Copy,
  Check,
  MessageSquare,
  Mail,
  Smartphone,
  Sparkles,
  Link2,
  Sparkle,
} from 'lucide-react';
import TopNav from '../../components/TopNav';
import Footer from '../../components/Footer';
import {
  REFERRAL_TYPES,
  submitReferral,
  generateReferralLink,
  getShareMessage,
  getSocialShareLinks,
  saveActiveReferralCode,
  getUserReferralCode,
} from '../../services/referralService';

export default function ReferAndGrow({
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
  const routeLocation = useLocation();
  const params = useParams();

  // Extract referral code from path (e.g. /refer/RAUNAK123 or query)
  const pathParts = routeLocation.pathname.split('/refer/');
  const urlReferralCode = params.code || (pathParts.length > 1 && pathParts[1] ? pathParts[1].replace('/', '') : null);

  const [activeReferralCode, setActiveReferralCode] = useState(urlReferralCode || null);
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [referralType, setReferralType] = useState('Customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (urlReferralCode) {
      setActiveReferralCode(urlReferralCode);
      saveActiveReferralCode(urlReferralCode);
    }
  }, [urlReferralCode]);

  const userReferralCode = getUserReferralCode(user);
  const referralLink = generateReferralLink(user);
  const shareMessage = getShareMessage(user);
  const socialLinks = getSocialShareLinks(user);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else {
      const cleanPhone = mobileNumber.replace(/\D/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
      }
    }

    if (emailAddress.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAddress.trim())) {
        newErrors.emailAddress = 'Please enter a valid email address.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const formattedPhone = `${countryCode} ${mobileNumber.trim()}`;

    submitReferral(
      {
        referredName: fullName,
        referredPhone: formattedPhone,
        referredEmail: emailAddress,
        referralType: referralType,
        referrerCode: activeReferralCode || userReferralCode,
      },
      user
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setMobileNumber('');
    setEmailAddress('');
    setReferralType('Customer');
    setErrors({});
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* 1. HEADER */}
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

      {/* Personalized Invitation Banner if visiting via referral link */}
      {activeReferralCode && (
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white py-3 px-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md">
          <Sparkles className="text-amber-300 w-4 h-4 shrink-0 animate-pulse" />
          <span>
            You've been invited by referral code{' '}
            <span className="font-mono underline text-amber-300 px-1">{activeReferralCode}</span>! Join SaathApp to discover the best local products & services.
          </span>
        </div>
      )}

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="bg-gradient-to-b from-emerald-50/70 via-emerald-50/30 to-slate-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-950 py-10 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-emerald-100/60 dark:border-emerald-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-6 text-left">
                {/* Small green label */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-[11px] font-extrabold tracking-wider uppercase">
                  <span>REFER & GROW TOGETHER</span>
                </div>

                {/* Heading (two lines) */}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    Refer Someone.
                  </h1>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 leading-tight">
                    Grow Together.
                  </h1>
                </div>

                {/* Paragraph */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-lg">
                  Invite people to join SaathApp and help them discover the best local products and services. Together, let's build a stronger local community.
                </p>

                {/* Row of 3 icon highlights */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                      <Users size={20} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Help Others</h4>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Introduce SaathApp to someone who can benefit
                    </p>
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                      <Gift size={20} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Earn Rewards</h4>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Get exciting rewards when they join & grow
                    </p>
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                      <ShieldCheck size={20} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Build Community</h4>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Support local sellers and strengthen our ecosystem
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (Form Card + Phone Mockup Graphic) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Referral Form inside White Card */}
                <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xl text-left">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Refer Someone to SaathApp
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4 font-medium">
                    Fill in the details below and we'll take care of the rest.
                  </p>

                  {isSuccess ? (
                    <div className="py-8 text-center space-y-4 animate-fade-up">
                      <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 size={36} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                          Referral Successfully Submitted!
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                          Thank you for referring <span className="font-semibold text-slate-800 dark:text-slate-200">{fullName}</span>. We will contact them soon.
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        Submit Another Referral
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter full name"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: null });
                          }}
                          className={`w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border text-xs text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            errors.fullName ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
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
                              <option value="+971">🇦🇪 +971</option>
                            </select>
                            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                          </div>
                          <input
                            type="tel"
                            required
                            placeholder="Enter mobile number"
                            value={mobileNumber}
                            onChange={(e) => {
                              setMobileNumber(e.target.value);
                              if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: null });
                            }}
                            className={`w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border text-xs text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              errors.mobileNumber ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                            }`}
                          />
                        </div>
                        {errors.mobileNumber && (
                          <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.mobileNumber}</p>
                        )}
                      </div>

                      {/* Email Address (Optional) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          value={emailAddress}
                          onChange={(e) => {
                            setEmailAddress(e.target.value);
                            if (errors.emailAddress) setErrors({ ...errors, emailAddress: null });
                          }}
                          className={`w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border text-xs text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            errors.emailAddress ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                          }`}
                        />
                        {errors.emailAddress && (
                          <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.emailAddress}</p>
                        )}
                      </div>

                      {/* Who are you referring? */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Who are you referring? <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={referralType}
                            onChange={(e) => setReferralType(e.target.value)}
                            className="w-full h-10 pl-3 pr-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
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
                          className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          <Send size={15} />
                          <span>{isSubmitting ? 'Sending...' : 'Send Referral'}</span>
                        </button>
                      </div>

                      {/* Small privacy note */}
                      <p className="text-[11px] text-slate-400 text-center font-medium pt-1">
                        🔒 We respect your privacy. Your details are safe with us.
                      </p>
                    </form>
                  )}
                </div>

                {/* Phone Mockup / Vector Illustration Card (Far Right - Matching PDF Page 7) */}
                <div className="md:col-span-5 relative flex flex-col items-center justify-center p-4">
                  {/* Outer Frame Container */}
                  <div className="relative w-full max-w-[220px] bg-slate-900 border-4 border-slate-800 rounded-[2.5rem] p-3 shadow-2xl overflow-hidden text-center text-white">
                    {/* Top Notch */}
                    <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto mb-3" />

                    {/* Phone Screen Mockup Content */}
                    <div className="bg-gradient-to-b from-emerald-600 to-teal-700 rounded-2xl p-4 text-white space-y-3 shadow-inner">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto backdrop-blur-md">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-black tracking-tight">You're Invited!</h4>
                        <p className="text-[10px] text-emerald-100 font-medium leading-tight">
                          Join SaathApp and enjoy amazing products, services and local deals.
                        </p>
                      </div>
                      <button
                        onClick={() => navigate('/products')}
                        className="w-full py-1.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-lg text-[11px] font-extrabold shadow transition-all cursor-pointer"
                      >
                        Join Now
                      </button>
                    </div>

                    {/* Speaker Bar */}
                    <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
                  </div>

                  {/* Flanking Floating Icon Badges */}
                  <div className="absolute top-2 left-2 w-9 h-9 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center shadow-lg border border-emerald-200 dark:border-emerald-800">
                    <Share2 size={16} />
                  </div>

                  <div className="absolute bottom-2 right-2 w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    <UserPlus size={16} />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* REFERRAL LINK GENERATOR & SOCIAL SHARE SECTION (PDF PAGE 4 STEP 6) */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-emerald-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto space-y-6 text-left relative z-10">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800 pb-4">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Share Your Personalized Referral Link
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  Generate your custom referral URL and share with friends, family, and local sellers:
                </p>
              </div>

              {/* Referral Code Badge */}
              <div className="bg-emerald-950/80 border border-emerald-700/60 py-2.5 px-4 rounded-xl shrink-0">
                <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Your Referral Code</span>
                <span className="text-lg font-black text-white font-mono">{userReferralCode}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Generated Link Input & Referral Message Preview */}
              <div className="md:col-span-7 bg-emerald-950/70 border border-emerald-800/80 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 size={14} className="text-emerald-400" />
                    Generated Referral URL:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="flex-1 bg-slate-900 border border-emerald-800/90 rounded-xl px-3.5 py-2.5 text-xs font-mono text-emerald-300 focus:outline-none selection:bg-emerald-600"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md"
                    >
                      {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                {/* Referral Message Preview */}
                <div className="space-y-1.5 pt-1">
                  <span className="block text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                    Share Message Preview:
                  </span>
                  <div className="bg-slate-900/90 border border-emerald-800/80 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed space-y-1">
                    <p className="text-emerald-400 font-bold">Join SaathApp through my referral:</p>
                    <p className="text-slate-300">Help someone discover local products, on-demand services & ecosystem growth on SaathApp.</p>
                    <p className="text-emerald-300 underline font-semibold break-all">{referralLink}</p>
                  </div>
                </div>
              </div>

              {/* 7 One-Click Sharing Options Buttons (PDF Step 6 Specification) */}
              <div className="md:col-span-5 bg-emerald-950/70 border border-emerald-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-lg">
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Share2 size={14} className="text-emerald-400" />
                    Instant 1-Click Sharing Options:
                  </h4>
                  <p className="text-[11px] text-emerald-200 font-medium mb-3">
                    Click any network to share pre-formatted message instantly:
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    {/* WhatsApp */}
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-2 transition-all shadow cursor-pointer justify-center"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>

                    {/* Copy Link */}
                    <button
                      onClick={handleCopyLink}
                      className="py-2 px-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-2 transition-all shadow cursor-pointer justify-center"
                    >
                      {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>

                    {/* SMS */}
                    <a
                      href={socialLinks.sms}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center gap-2 transition-all shadow cursor-pointer justify-center"
                    >
                      <Smartphone size={14} />
                      <span>SMS</span>
                    </a>

                    {/* Email */}
                    <a
                      href={socialLinks.email}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center gap-2 transition-all shadow cursor-pointer justify-center"
                    >
                      <Mail size={14} />
                      <span>Email</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 transition-all shadow cursor-pointer justify-center"
                    >
                      <span>Facebook</span>
                    </a>

                    {/* X (Twitter) */}
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-slate-900 hover:bg-black border border-slate-700 text-white rounded-xl flex items-center gap-2 transition-all shadow cursor-pointer justify-center"
                    >
                      <span>𝕏 X</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-2 py-2 px-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 transition-all shadow cursor-pointer justify-center"
                    >
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <p className="text-[10px] text-emerald-400/80 font-mono text-center pt-1">
                  saathapp.in/refer/{userReferralCode}
                </p>
              </div>

            </div>

          </div>

          {/* Background Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* 3. "HOW IT WORKS" SECTION */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                How It Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Four simple steps to refer and start building your local community network.
              </p>
            </div>

            {/* Horizontal 4-step timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  1
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <UserPlus size={18} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Refer Someone</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Fill in their details and submit the referral.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  2
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <Send size={18} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">We Reach Out</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  We will contact them and help them get started.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  3
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <Users size={18} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">They Join & Grow</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  When they join SaathApp and start using it.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl text-center space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  4
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <Gift size={18} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">You Earn Rewards</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  You earn exciting rewards for successful referrals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. "WHY REFER SOMEONE?" SECTION */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-left space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Why Refer Someone?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Empower your local community while bringing digital convenience to everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Great Products & Services</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                    They get access to the best local products and services.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                  <Tag size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Exclusive Offers</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                    They get exciting offers and discounts on their first orders.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                  <Store size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Support Local</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                    They support local sellers and businesses.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-4 text-left shadow-sm hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Stronger Community</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                    Together we build a stronger and self-reliant community.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. TRUST BADGE */}
            <div className="pt-4 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 py-2.5 px-6 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm text-center">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>
                  Trusted by thousands of users across India. SaathApp is India's premier hyperlocal marketplace.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}
