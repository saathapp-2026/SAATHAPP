import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Award, Download, ArrowRight, ArrowLeft, Home, MapPin, Zap, Users, Globe, DollarSign,
  CheckCircle2, ChevronDown, Phone, PhoneCall, Calendar, Mail, Send, ShieldCheck, Sparkles, TrendingUp,
  Package, Truck, Store, Layers, HelpCircle, FileText, Check, Clock, ChevronRight, X, Info, ExternalLink, Share2, Printer,
  Briefcase, UserCheck, Coins, Rocket, Tag
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import saathFranchiseLogoImg from '../assets/saath-franchise-logo.png';

export default function FranchisePage({
  cartCount = 0,
  onCartClick = () => {},
  location = 'Green Park, New Delhi',
  onLocationClick = () => {},
  onSearch = () => {},
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
  isAuthenticated = false,
  user = null,
  darkMode = false,
  toggleDarkMode = () => {},
  onVoiceSearchClick = () => {},
  onImageSearchClick = () => {},
  onBack = () => {}
}) {
  const navigate = useNavigate();

  // Category filter state for Franchise Models
  const [selectedModelTab, setSelectedModelTab] = useState('all');

  // Calculator selected model state
  const [calculatorModel, setCalculatorModel] = useState('SAATH Mart Franchise');

  // Expansion roadmap active phase state
  const [activePhase, setActivePhase] = useState(1);

  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState({});

  // Interactive Modals State
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
  const [selectedModelDetail, setSelectedModelDetail] = useState(null);
  const [selectedTrustBadge, setSelectedTrustBadge] = useState(null);

  // Schedule Call Form State
  const [scheduleData, setScheduleData] = useState({
    date: 'Tomorrow',
    timeSlot: 'Morning (10:00 AM - 12:00 PM)',
    mode: 'WhatsApp Call',
    phone: '',
    notes: ''
  });
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledResult, setScheduledResult] = useState(null);

  // Application form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    occupation: '',
    city: '',
    district: '',
    state: 'Bihar',
    capital: '₹2L - ₹5 Lakhs',
    experience: 'No prior business experience',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState(null);

  useEffect(() => {
    document.title = 'Become a Franchise Partner | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Own a SaathApp Franchise in your district. Join India\'s fastest-growing digital ecosystem for hyperlocal commerce, services, and deliveries.');
    }
    window.scrollTo(0, 0);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.city || !formData.district) {
      toast.error('Please fill in all required fields marked with *');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const receipt = {
        refId: `SAATH-FRN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        ...formData
      };
      setSubmissionReceipt(receipt);
      setIsSubmittedModalOpen(true);
      toast.success(`Application ${receipt.refId} submitted successfully!`);
    }, 1200);
  };

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Helper to trigger browser file download
  const triggerFileDownload = (filename, contentText) => {
    const blob = new Blob([contentText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadBrochure = () => {
    setIsBrochureModalOpen(true);
  };

  const executeBrochureDownload = () => {
    const brochureText = `===========================================================
SAATHAPP HYPERLOCAL FRANCHISE INFORMATION BROCHURE (2026)
SAATHAPPNOVA PRIVATE LIMITED - DPIIT & STARTUP INDIA RECOGNIZED
===========================================================

ABOUT SAATHAPP:
SaathApp is India's leading Tier-2 & Tier-3 Hyperlocal Superapp connecting Kirana stores,
agricultural suppliers, hardware vendors, and service professionals onto one digital platform.

FRANCHISE OPPORTUNITY OVERVIEW:
- Franchise License & Exclusive District Rights
- Digital Billing & Catalog Software Provided
- Integrated Delivery Saathi Partner Network
- 24/7 Field Operations & Helpdesk Support

PARTNERSHIP MODELS:
1. SAATH Mart Franchise (Est. Investment: ₹2L - ₹10L | Space: 200 - 500 Sq.Ft.)
2. SAATH Fresh Franchise (Est. Investment: ₹1.5L - ₹8L | Space: 250 - 400 Sq.Ft.)
3. SAATH Electrical Franchise (Est. Investment: ₹2L - ₹12L | Space: 250 - 400 Sq.Ft.)
4. SAATH Hardware Franchise (Est. Investment: ₹2L - ₹10L | Space: 300 - 500 Sq.Ft.)
5. SAATH Agriculture Franchise (Est. Investment: ₹1L - ₹6L | Space: 250 - 400 Sq.Ft.)
6. SAATH Warehouse Franchise (Est. Investment: ₹10L - ₹50L | Space: 2000 Sq.Ft.+)
7. SAATH City Agent Franchise (Est. Investment: ₹50K - ₹2L | Office Space)
8. SAATH District Agent Franchise (Est. Investment: ₹2L - ₹10L | Office Space)
9. SAATH Farmers Center Franchise (Est. Investment: ₹1L - ₹5L | Space: 250 - 400 Sq.Ft.)

CONTACT US:
Corporate Office: Bhatahar, Tharthari, Nalanda, Bihar – 801307
Helpline: +91 91288 42027 | Email: support@saathapp.in
Website: www.saathappnova.co.in
===========================================================`;

    triggerFileDownload('SaathApp_Franchise_Brochure_2026.txt', brochureText);
    toast.success('Official SAATH Franchise Brochure downloaded!');
  };

  const handleOpenScheduleModal = () => {
    setScheduleData((prev) => ({
      ...prev,
      phone: formData.phone || prev.phone
    }));
    setScheduledResult(null);
    setIsScheduleModalOpen(true);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleData.phone) {
      toast.error('Please enter a valid phone number for scheduling.');
      return;
    }

    setIsScheduling(true);
    setTimeout(() => {
      setIsScheduling(false);
      const booking = {
        bookingId: `CALL-STH-${Math.floor(10000 + Math.random() * 90000)}`,
        date: scheduleData.date,
        timeSlot: scheduleData.timeSlot,
        mode: scheduleData.mode,
        phone: scheduleData.phone
      };
      setScheduledResult(booking);
      toast.success('Consultation Call Scheduled Successfully!');
    }, 1000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Franchise Models Data
  const models = [
    {
      id: '01',
      category: 'retail',
      title: 'SAATH Mart Franchise',
      description: 'Local retail store operating under the SAATH brand for daily household needs.',
      tag: 'Retail Outlet',
      investment: '₹2L - ₹10L',
      space: '200 - 500 Sq.Ft.',
      services: ['Grocery', 'FMCG Products', 'Packaged Foods', 'Household Essentials'],
      benefits: ['SAATH Branding', 'Marketing Support', 'Inventory Assistance', 'App Integration'],
      partner: 'Existing Kirana Stores, New Entrepreneurs'
    },
    {
      id: '02',
      category: 'retail',
      title: 'SAATH Fresh Franchise',
      description: 'Fresh fruits, vegetables, dairy, and farm products retail outlet.',
      tag: 'Retail Outlet',
      investment: '₹1.5L - ₹8L',
      space: '250 - 400 Sq.Ft.',
      services: ['Fresh Fruits & Veggies', 'Dairy Products', 'Farm Fresh Products', 'Seasonal Produce'],
      benefits: ['Farmer Network Access', 'Fresh Supply Chain', 'Daily Inventory Support', 'App Orders'],
      partner: 'Agriculture Shops, Rural Entrepreneurs'
    },
    {
      id: '03',
      category: 'retail',
      title: 'SAATH Electrical Franchise',
      description: 'Electrical product and service center.',
      tag: 'Retail Outlet',
      investment: '₹2L - ₹12L',
      space: '250 - 400 Sq.Ft.',
      services: ['Electrical Items', 'Fans & Lights', 'Wiring Products', 'Electrical Services'],
      benefits: ['B2B Supply Support', 'Contractor Network', 'Online Orders'],
      partner: 'Electrical Shop Owners, Electricians'
    },
    {
      id: '04',
      category: 'retail',
      title: 'SAATH Hardware Franchise',
      description: 'Hardware and construction support center.',
      tag: 'Retail Outlet',
      investment: '₹2L - ₹10L',
      space: '300 - 500 Sq.Ft.',
      services: ['Hardware Products', 'Tools & Fasteners', 'Plumbing Materials', 'Construction Accessories'],
      benefits: ['Contractor Connections', 'Bulk Orders', 'App Integration'],
      partner: 'Hardware Stores, Construction Suppliers'
    },
    {
      id: '05',
      category: 'agri',
      title: 'SAATH Agriculture Franchise',
      description: 'Agriculture support and farm-input center.',
      tag: 'Agri Hub',
      investment: '₹1L - ₹6L',
      space: '250 - 400 Sq.Ft.',
      services: ['Seeds & Fertilizers', 'Farm Tools', 'Irrigation Products', 'Agricultural Consultation'],
      benefits: ['Farmer Network Access', 'Seasonal Support', 'Direct Procurement Opportunities'],
      partner: 'Agriculture Shops, Rural Entrepreneurs'
    },
    {
      id: '06',
      category: 'logistics',
      title: 'SAATH Warehouse Franchise',
      description: 'Regional storage and distribution center.',
      tag: 'Logistics Hub',
      investment: '₹10L - ₹50L',
      space: '2000 Sq.Ft.+',
      services: ['Inventory Storage', 'Order Processing', 'Same-Day Delivery', 'Last Mile Fulfillment'],
      benefits: ['Multi-category Storage', 'Logistics Network', 'Inventory Management System'],
      partner: 'Investors, Logistics Operators'
    },
    {
      id: '07',
      category: 'agency',
      title: 'SAATH City Agent Franchise',
      description: 'City-level operations and partner management.',
      tag: 'Territory Agency',
      investment: '₹50K - ₹2L',
      space: 'Office Space',
      services: ['Seller Onboarding', 'Service Professional Onboarding', 'Delivery Partner Management', 'Customer Support'],
      benefits: ['Exclusive Territory Rights', 'Operational Commissions', 'Volume Incentives'],
      partner: 'Business Professionals, Local Entrepreneurs'
    },
    {
      id: '08',
      category: 'agency',
      title: 'SAATH District Agent Franchise',
      description: 'District-level operational management.',
      tag: 'Territory Agency',
      investment: '₹2L - ₹10L',
      space: 'Office Space',
      services: ['Manage City Agents', 'District Expansion', 'Franchise Monitoring', 'Business Development'],
      benefits: ['District Revenue Share', 'Corporate Lead Access', 'Regional Marketing Support'],
      partner: 'Experienced Operators, Regional Entrepreneurs'
    },
    {
      id: '09',
      category: 'agri',
      title: 'SAATH Farmers Center Franchise',
      description: 'Farmer support and procurement center.',
      tag: 'Agri Hub',
      investment: '₹1L - ₹5L',
      space: '250 - 400 Sq.Ft.',
      services: ['Farmer Registration', 'Produce Collection', 'Farm Support', 'Market Linkage'],
      benefits: ['Direct Farmer Network', 'Procurement Commissions', 'Rural Development Support'],
      partner: 'Farmer Groups, FPOs, Rural Entrepreneurs'
    }
  ];

  const filteredModels = selectedModelTab === 'all' 
    ? models 
    : models.filter(m => m.category === selectedModelTab);

  // Financial Calculator Metrics
  const calculatorData = {
    'SAATH Mart Franchise': { capital: '₹2L - ₹10L', setupTime: '15 - 20 Days', roiRange: '12 - 18 Months', marginSplit: '15-20%', profitPotential: '₹2,10,000' },
    'SAATH Fresh Franchise': { capital: '₹1.5L - ₹8L', setupTime: '10 - 15 Days', roiRange: '10 - 16 Months', marginSplit: '18-25%', profitPotential: '₹1,85,000' },
    'SAATH Electrical Franchise': { capital: '₹2L - ₹12L', setupTime: '15 - 20 Days', roiRange: '12 - 18 Months', marginSplit: '15-22%', profitPotential: '₹2,40,000' },
    'SAATH Hardware Franchise': { capital: '₹2L - ₹10L', setupTime: '15 - 20 Days', roiRange: '12 - 18 Months', marginSplit: '14-20%', profitPotential: '₹2,25,000' },
    'SAATH Agriculture Franchise': { capital: '₹1L - ₹6L', setupTime: '10 - 15 Days', roiRange: '10 - 16 Months', marginSplit: '12-18%', profitPotential: '₹1,60,000' },
    'SAATH Warehouse Franchise': { capital: '₹10L - ₹50L', setupTime: '30 - 45 Days', roiRange: '16 - 24 Months', marginSplit: '20-30%', profitPotential: '₹4,50,000' },
    'SAATH City Agent Franchise': { capital: '₹50K - ₹2L', setupTime: '7 - 10 Days', roiRange: '6 - 12 Months', marginSplit: '10-15%', profitPotential: '₹1,20,000' },
    'SAATH District Agent Franchise': { capital: '₹2L - ₹10L', setupTime: '15 - 25 Days', roiRange: '10 - 15 Months', marginSplit: '12-18%', profitPotential: '₹3,20,000' },
    'SAATH Farmers Center Franchise': { capital: '₹1L - ₹5L', setupTime: '10 - 15 Days', roiRange: '8 - 14 Months', marginSplit: '10-16%', profitPotential: '₹1,40,000' }
  };

  const selectedCalc = calculatorData[calculatorModel] || calculatorData['SAATH Mart Franchise'];

  // Roadmap Data
  const roadmapPhases = {
    1: {
      title: 'Nalanda & Suburbs: Local Launchpad',
      desc: 'Establish core operations center and pilot outlets. नालंदा serves as our central logistics base, validating local market workflows.',
      stats: [
        { label: 'Saath Mart Outlets', val: '10+ Stores' },
        { label: 'Onboarded Merchants', val: '200+ Kiranas' },
        { label: 'Local Jobs Created', val: '50+ Saathi' }
      ]
    },
    2: {
      title: 'Bihar Regional Expansion',
      desc: 'Expand territory footprint across Patna, Gaya, Muzaffarpur, and Bhagalpur districts connecting Tier 2 & Tier 3 logistics nodes.',
      stats: [
        { label: 'Saath Mart Outlets', val: '50+ Stores' },
        { label: 'Onboarded Merchants', val: '1,500+ Kiranas' },
        { label: 'Local Jobs Created', val: '350+ Saathi' }
      ]
    },
    3: {
      title: 'National Hyperlocal Grid',
      desc: 'Roll out full district agent model nationwide spanning Uttar Pradesh, Jharkhand, Madhya Pradesh, and Eastern India hub networks.',
      stats: [
        { label: 'Saath Mart Outlets', val: '500+ Stores' },
        { label: 'Onboarded Merchants', val: '20,000+ Kiranas' },
        { label: 'Local Jobs Created', val: '5,000+ Saathi' }
      ]
    }
  };

  // FAQs Data
  const faqs = [
    {
      q: 'What is SaathApp Franchise?',
      a: 'SaathApp Franchise grants exclusive operational and territory rights to manage hyperlocal ordering, retail digitization, logistics, and service assignments in your allocated city or district.'
    },
    {
      q: 'Who can apply?',
      a: 'Retail store owners, existing Kirana operators, agricultural suppliers, logistics handlers, experienced managers, and regional entrepreneurs looking for a tech-enabled growth model.'
    },
    {
      q: 'What support is provided?',
      a: 'We provide full corporate backing including official brand licenses, software admin access, mobile app integration, marketing kits, inventory guidance, and 24/7 helpdesk support.'
    },
    {
      q: 'How does revenue work?',
      a: 'Franchisees earn through product sales margins, booking commissions on local technician services, delivery splits, local in-app advertising fees, and bulk B2B procurement contracts.'
    },
    {
      q: 'How long does setup take?',
      a: 'Setup times vary from 7 to 45 days depending on the model, from simple City Agent offices (7-10 days) up to large distribution Warehouses (30-45 days).'
    },
    {
      q: 'Is training provided?',
      a: 'Yes, complete operational training is provided for store managers, delivery saathis, and billing software operators prior to official launch.'
    }
  ];

  return (
    <div className="min-h-screen bg-saath-bg flex flex-col font-body text-slate-900 overflow-x-hidden">
      
      {/* Exclusive Franchise Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-saath-border py-2.5 sm:py-3.5 px-4 sm:px-6 md:px-12 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer active:scale-95 transition-transform flex items-center"
              title="saathFranchise - Grow Together. Succeed Together."
            >
              <img 
                src={saathFranchiseLogoImg} 
                alt="saathFranchise Logo" 
                className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto object-contain max-w-[240px] sm:max-w-[300px] md:max-w-[360px] dark:bg-white/95 dark:px-2.5 dark:py-1.5 dark:rounded-xl dark:shadow-xs transition-all"
                onError={(e) => {
                  e.target.src = '/images/saath-franchise-logo.png';
                }}
              />
            </div>
            <span className="hidden md:inline-block text-[8px] sm:text-[9px] font-extrabold uppercase bg-saath-green-light text-saath-green-dark px-2 py-0.5 rounded-full tracking-wider border border-saath-green/30">
              Partner Hub
            </span>
          </div>

          {/* Desktop & Mobile Scrollable Nav Links */}
          <nav className="flex items-center space-x-3 sm:space-x-6 overflow-x-auto scrollbar-none max-w-full py-1">
            <button onClick={() => scrollToSection('why-saath')} className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-saath-green whitespace-nowrap transition-colors cursor-pointer active:scale-95">
              Why SaathApp
            </button>
            <button onClick={() => scrollToSection('models')} className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-saath-green whitespace-nowrap transition-colors cursor-pointer active:scale-95">
              Franchise Models
            </button>
            <button onClick={() => scrollToSection('investment')} className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-saath-green whitespace-nowrap transition-colors cursor-pointer active:scale-95">
              Investment & Returns
            </button>
            <button onClick={() => scrollToSection('expansion')} className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-saath-green whitespace-nowrap transition-colors cursor-pointer active:scale-95">
              Roadmap
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-saath-green whitespace-nowrap transition-colors cursor-pointer active:scale-95">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-saath-green whitespace-nowrap transition-colors cursor-pointer active:scale-95">
              Contact Us
            </button>
          </nav>

          <div className="flex items-center space-x-2 shrink-0">
            <button 
              onClick={() => scrollToSection('apply-form')} 
              className="text-xs sm:text-sm font-bold text-saath-green hover:underline px-2.5 sm:px-4 py-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              Login
            </button>
            <button 
              onClick={() => scrollToSection('apply-form')} 
              className="bg-saath-green hover:bg-saath-green-dark text-white font-extrabold text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-saath-green/20 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Apply Now
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white via-saath-bg to-saath-bg dark:from-slate-900 dark:to-slate-950">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-saath-green/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-saath-accent/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-saath-green font-bold text-xs sm:text-sm group transition-colors cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </button>
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-800 dark:text-emerald-300 font-extrabold text-xs tracking-wide uppercase">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Regional Partnership Opportunity 2026
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Own a <span className="text-saath-green">SaathApp</span> Franchise in Your City
            </h1>

            <p className="text-slate-800 dark:text-slate-100 text-base sm:text-lg md:text-xl font-semibold leading-relaxed max-w-xl">
              Build the future of hyperlocal commerce, services, and deliveries in your district with SaathApp. Join India's fastest-growing digital ecosystem.
            </p>

            {/* Interactive Responsive Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('apply-form')}
                className="w-full sm:w-auto bg-saath-green hover:bg-saath-green-dark text-white font-extrabold text-xs xs:text-sm sm:text-base text-center px-5 xs:px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-saath-green/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap group"
              >
                Apply for Franchise <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleDownloadBrochure}
                className="w-full sm:w-auto bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border-2 border-slate-300 dark:border-slate-600 hover:border-saath-green/60 text-slate-900 dark:text-white font-extrabold text-xs xs:text-sm sm:text-base text-center px-5 xs:px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-sm group hover:shadow-md"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-saath-green group-hover:translate-y-0.5 transition-transform shrink-0" /> 
                <span>Download Brochure</span>
              </button>
            </div>

            {/* Recognized Ecosystem Strip */}
            <div className="pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-slate-800">
              <p className="text-slate-700 dark:text-slate-200 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest mb-3">
                Recognized & Trusted Ecosystem (Click for info)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                <button 
                  onClick={() => setSelectedTrustBadge({ title: 'Startup India Recognized', org: 'Government of India', desc: 'Officially recognized under the Department for Promotion of Industry and Internal Trade (DPIIT) startup ecosystem.' })}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-saath-green rounded-xl px-3 py-2.5 flex flex-col items-center justify-center text-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="text-slate-900 dark:text-white font-black text-xs">Startup India</span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">Recognized</span>
                </button>

                <button 
                  onClick={() => setSelectedTrustBadge({ title: 'DPIIT Approved Organization', org: 'Ministry of Commerce & Industry', desc: 'Audited and verified entity compliant with national digital marketplace & hyperlocal trade standards.' })}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-saath-accent rounded-xl px-3 py-2.5 flex flex-col items-center justify-center text-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="text-slate-900 dark:text-white font-black text-xs">DPIIT</span>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400">Approved Org</span>
                </button>

                <button 
                  onClick={() => setSelectedTrustBadge({ title: 'MSME Registered Enterprise', org: 'Ministry of Micro, Small & Medium Enterprises', desc: 'Registered enterprise focused on boosting regional employment and Tier-2 & Tier-3 retail growth.' })}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 rounded-xl px-3 py-2.5 flex flex-col items-center justify-center text-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="text-slate-900 dark:text-white font-black text-xs">MSME</span>
                  <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">Registered</span>
                </button>

                <button 
                  onClick={() => setSelectedTrustBadge({ title: '100% Made In India', org: 'SaathApp Tech Bharat Initiative', desc: 'Dedicated to empowering local Kiranas, regional farmers, and native Indian logistics networks.' })}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-saath-green rounded-xl px-3 py-2.5 flex flex-col items-center justify-center text-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="text-slate-900 dark:text-white font-black text-xs">Made In India</span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">100% Bharat Focus</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Image / Hero Graphic */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-saath-green/10 to-transparent rounded-3xl filter blur-2xl pointer-events-none" />
            <div className="relative border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-800/70 p-3 sm:p-4 rounded-3xl shadow-2xl shadow-slate-300/40 dark:shadow-none max-w-full">
              <img 
                src="/images/franchise.jpg" 
                alt="SaathApp Franchise Hyperlocal Ecosystem illustration"
                className="rounded-2xl w-full h-auto object-cover max-w-lg lg:max-w-full hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                onClick={handleDownloadBrochure}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY SAATH SECTION */}
      <section id="why-saath" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-saath-green font-extrabold text-xs uppercase tracking-widest">Why Partner With Us?</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              The SaathApp Advantage
            </h2>
            <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-lg">
              We connect local stores, service professionals, and delivery agents onto one robust digital grid, maximizing efficiency and regional revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Cards with Interactive Click Actions & Enhanced UI */}
            {[
              { icon: Building2, color: 'text-saath-green', bg: 'bg-saath-green/10 border-saath-green/20', tag: 'Core Platform', title: 'Multi-Service Ecosystem', desc: 'Deliver groceries, assign local home services (plumbers, electricians), and handle express deliveries all through a single brand license.' },
              { icon: MapPin, color: 'text-saath-accent', bg: 'bg-saath-accent/10 border-saath-accent/20', tag: 'Hyperlocal Grid', title: 'Hyperlocal Marketplace', desc: 'Digitize brick-and-mortar local stores in your territory, making them accessible to buyers in minutes with custom store profiles.' },
              { icon: Zap, color: 'text-saath-green', bg: 'bg-saath-green/10 border-saath-green/20', tag: 'Smart Logistics', title: 'Delivery Network', desc: 'Benefit from integrated routing algorithms that assign delivery saathi partners to optimize multi-stop city distribution.' },
              { icon: Users, color: 'text-saath-accent', bg: 'bg-saath-accent/10 border-saath-accent/20', tag: 'Kirana Tech', title: 'Local Business Digitization', desc: 'Empower Kiranas, electrical, and hardware stores by providing them billing software, analytics, and instant supply restocks.' },
              { icon: Globe, color: 'text-saath-green', bg: 'bg-saath-green/10 border-saath-green/20', tag: 'Bharat Reach', title: 'Rural + Urban Expansion', desc: 'Tap into expanding Tier 2 and Tier 3 markets where rising digital literacy matches structural logistics demands.' },
              { icon: DollarSign, color: 'text-saath-accent', bg: 'bg-saath-accent/10 border-saath-accent/20', tag: 'High Margins', title: 'Scalable Revenue Model', desc: 'Earn through marketplace listings, advertising, delivery splits, logistics services, and enterprise brand setups.' }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div 
                  key={i} 
                  onClick={() => {
                    toast.success(`Selected feature: ${card.title}. Learn more in models section!`);
                    scrollToSection('models');
                  }}
                  className="group bg-white dark:bg-slate-900/90 p-6 sm:p-8 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 hover:border-saath-green dark:hover:border-saath-green hover:shadow-xl hover:shadow-saath-green/10 hover:-translate-y-1.5 transition-all duration-300 text-left cursor-pointer active:scale-[0.98] relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${card.bg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${card.color}`} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        {card.tag}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-saath-green transition-colors">{card.title}</h3>
                      <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-300 group-hover:text-saath-green transition-colors">
                    <span>Explore Models</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* SECTION 3: FRANCHISE PARTNERSHIP MODELS */}
      <section id="models" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-saath-bg dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-saath-green font-extrabold text-xs uppercase tracking-widest">Select Your Path</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Franchise Partnership Models
            </h2>
            <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-lg">
              Explore 9 diverse, highly optimized franchise models spanning retail, logistics, agriculture, and localized operational agencies.
            </p>

            {/* Responsive Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 max-w-full overflow-x-auto scrollbar-none px-1">
              {[
                { id: 'all', label: 'All Models' },
                { id: 'retail', label: 'Retail & Outlets' },
                { id: 'agri', label: 'Agriculture Hubs' },
                { id: 'logistics', label: 'Logistics Hubs' },
                { id: 'agency', label: 'Operational Agents' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedModelTab(tab.id)}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    selectedModelTab === tab.id
                      ? 'bg-saath-green text-white shadow-md shadow-saath-green/20'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredModels.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-lg shadow-slate-100 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-slate-800 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
                >
                  {/* Top Header */}
                  <div className="p-5 sm:p-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full">
                        {item.tag}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-bold font-mono">{item.id}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold">
                      {item.description}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-8 pt-4 space-y-4 flex-grow">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-slate-50 dark:bg-slate-800/50 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest block">Est. Investment</span>
                        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">{item.investment}</span>
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest block">Space Req.</span>
                        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">{item.space}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div>
                        <h4 className="text-[10px] sm:text-[11px] font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">Core Services:</h4>
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                          {item.services.map((srv, idx) => (
                            <li key={idx} className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-saath-accent shrink-0" />
                              <span className="truncate">{srv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[10px] sm:text-[11px] font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {item.benefits.map((bnf, idx) => (
                            <li key={idx} className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-saath-green shrink-0" />
                              <span>{bnf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Opens Model Detail Specification Modal */}
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-5 sm:p-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-left">
                      <span className="text-[9px] font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">Ideal Partner:</span>
                      <span className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">{item.partner}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedModelDetail(item)}
                      className="bg-white dark:bg-slate-800 hover:bg-saath-green hover:text-white border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* SECTION 4: INVESTMENT TRANSPARENCY & RETURNS CALCULATOR */}
      <section id="investment" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-saath-green font-extrabold text-xs uppercase tracking-widest">Investment Transparency</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Investment & Estimated Returns
            </h2>
            <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-lg">
              Below are transparent financial metrics. Select a franchise model to calculate setup, timelines, and projected earnings details.
            </p>
          </div>

          {/* Financial Grid Table & Interactive Estimator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Financial Grid Table */}
            <div className="lg:col-span-7 bg-saath-bg dark:bg-slate-800/40 rounded-3xl p-5 sm:p-8 border border-slate-200/60 dark:border-slate-800 space-y-4 sm:space-y-6 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Franchise Financial Grid</h3>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Setup & ROI Metrics</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-[11px] sm:text-xs font-extrabold uppercase text-slate-700 dark:text-slate-200">
                      <th className="py-3 px-2">Franchise Model</th>
                      <th className="py-3 px-2">Est. Capital</th>
                      <th className="py-3 px-2">Setup Time</th>
                      <th className="py-3 px-2">Est. ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {[
                      { name: 'SAATH Mart Franchise', cap: '₹2L - ₹10L', time: '15 - 20 Days', roi: '12 - 18 Months' },
                      { name: 'SAATH Fresh Franchise', cap: '₹1.5L - ₹8L', time: '10 - 15 Days', roi: '10 - 16 Months' },
                      { name: 'SAATH Electrical Franchise', cap: '₹2L - ₹12L', time: '15 - 20 Days', roi: '12 - 18 Months' },
                      { name: 'SAATH Hardware Franchise', cap: '₹2L - ₹10L', time: '15 - 20 Days', roi: '12 - 18 Months' },
                      { name: 'SAATH Agriculture Franchise', cap: '₹1L - ₹6L', time: '10 - 15 Days', roi: '10 - 16 Months' },
                      { name: 'SAATH Warehouse Franchise', cap: '₹10L - ₹50L', time: '30 - 45 Days', roi: '16 - 24 Months' }
                    ].map((row, i) => (
                      <tr 
                        key={i} 
                        onClick={() => {
                          setCalculatorModel(row.name);
                          toast.success(`Calculated metrics for: ${row.name}`);
                        }}
                        className={`hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-colors ${
                          calculatorModel === row.name ? 'bg-white dark:bg-slate-800 text-saath-green font-black' : ''
                        }`}
                      >
                        <td className="py-3 px-2 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${calculatorModel === row.name ? 'bg-saath-green' : 'bg-slate-400'}`} />
                          {row.name}
                        </td>
                        <td className="py-3 px-2">{row.cap}</td>
                        <td className="py-3 px-2">{row.time}</td>
                        <td className="py-3 px-2">{row.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                Capital figures represent initial setup, license fees, and stock components. Click any model to calculate live metrics.
              </p>
            </div>

            {/* Right: Returns Calculator Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl border border-slate-800 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-saath-green uppercase tracking-widest">Estimator</span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">Returns Calculator</h3>
                <p className="text-xs text-slate-300 font-medium">Select a model to estimate projected local performance metrics.</p>
              </div>

              {/* Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Choose Model</label>
                <div className="relative">
                  <select 
                    value={calculatorModel}
                    onChange={(e) => setCalculatorModel(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-white appearance-none focus:outline-none focus:border-saath-green"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.title} className="bg-slate-900 text-white">{m.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Live Calculator Outputs */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">Capital Required:</span>
                  <span className="text-base sm:text-lg font-black text-saath-green">{selectedCalc.capital}</span>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">Est. Setup Timeline:</span>
                  <span className="text-base sm:text-lg font-black text-white">{selectedCalc.setupTime}</span>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">Target ROI Range:</span>
                  <span className="text-base sm:text-lg font-black text-white">{selectedCalc.roiRange}</span>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">Projected Margin Split:</span>
                  <span className="text-base sm:text-lg font-black text-saath-accent">{selectedCalc.marginSplit}</span>
                </div>
              </div>

              {/* Projected Profit Banner */}
              <div className="bg-saath-green/10 border border-saath-green/20 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-saath-green tracking-wider block">Model Financial Framework</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{selectedCalc.profitPotential} <span className="text-xs font-semibold text-slate-300">/ month</span></span>
                </div>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-saath-green shrink-0" />
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                Estimated average territory operating net profit potential after launching store networks.
              </p>

              {/* Interactive Button */}
              <button 
                onClick={() => {
                  setFormData(prev => ({ ...prev, capital: selectedCalc.capital }));
                  scrollToSection('apply-form');
                  toast.success(`Selected model ${calculatorModel} pre-filled in application form!`);
                }}
                className="w-full bg-saath-green hover:bg-saath-green-dark text-white font-extrabold text-xs sm:text-base py-3.5 sm:py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-saath-green/20 active:scale-95"
              >
                Request Custom Proposal <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: FRANCHISE DELIVERABLES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-saath-bg dark:bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-saath-green font-bold text-xs uppercase tracking-widest">Franchise Deliverables</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              What You Get As A Partner
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-lg">
              We equip our franchisees with high-grade technology products, robust operations systems, and verified network linkages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
            {[
              { 
                title: 'Franchise License', 
                icon: ShieldCheck, 
                desc: 'Official franchise license granting exclusive rights to trade and operate SaathApp branding inside your allocated local district.',
                bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30',
                iconColor: 'text-emerald-600 dark:text-emerald-400',
                badge: 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200',
                hover: 'hover:border-emerald-500 hover:shadow-emerald-500/10'
              },
              { 
                title: 'Operations Training', 
                icon: Clock, 
                desc: 'Pre-launch onboarding modules for managers and delivery partners on supply chain logistics and customer service.',
                bg: 'bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/30',
                iconColor: 'text-sky-600 dark:text-sky-400',
                badge: 'bg-sky-100/90 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200',
                hover: 'hover:border-sky-500 hover:shadow-sky-500/10'
              },
              { 
                title: 'Business Playbook', 
                icon: FileText, 
                desc: 'A standardized directory of local pricing matrices, operational protocols, marketing assets, and regulatory checklists.',
                bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30',
                iconColor: 'text-amber-600 dark:text-amber-400',
                badge: 'bg-amber-100/90 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200',
                hover: 'hover:border-amber-500 hover:shadow-amber-500/10'
              },
              { 
                title: 'Technology Platform', 
                icon: Zap, 
                desc: 'Dedicated access to Admin Dashboards, partner app clients, live order logs, and territory heatmaps.',
                bg: 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30',
                iconColor: 'text-purple-600 dark:text-purple-400',
                badge: 'bg-purple-100/90 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200',
                hover: 'hover:border-purple-500 hover:shadow-purple-500/10'
              },
              { 
                title: 'Seller Network Tools', 
                icon: Store, 
                desc: 'Proprietary tools to quickly register local retail stores, map their catalog items, and link their billing software.',
                bg: 'bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/30',
                iconColor: 'text-teal-600 dark:text-teal-400',
                badge: 'bg-teal-100/90 text-teal-800 dark:bg-teal-500/20 dark:text-teal-300 border-teal-200',
                hover: 'hover:border-teal-500 hover:shadow-teal-500/10'
              },
              { 
                title: 'Marketing Assets', 
                icon: Sparkles, 
                desc: 'Digital templates, print brochures, banners, local SEO tools, and launching campaigns funded partially by SaathApp.',
                bg: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30',
                iconColor: 'text-rose-600 dark:text-rose-400',
                badge: 'bg-rose-100/90 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border-rose-200',
                hover: 'hover:border-rose-500 hover:shadow-rose-500/10'
              },
              { 
                title: 'Dedicated Support', 
                icon: Phone, 
                desc: '24/7 technical helpdesk support and field engineers to resolve software, merchant onboarding, or delivery queries.',
                bg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30',
                iconColor: 'text-indigo-600 dark:text-indigo-400',
                badge: 'bg-indigo-100/90 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border-indigo-200',
                hover: 'hover:border-indigo-500 hover:shadow-indigo-500/10'
              },
              { 
                title: 'Expansion Assistance', 
                icon: TrendingUp, 
                desc: 'Priority territory expansion bidding rights as adjacent sub-districts and cities open up for franchise allocations.',
                bg: 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30',
                iconColor: 'text-orange-600 dark:text-orange-400',
                badge: 'bg-orange-100/90 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200',
                hover: 'hover:border-orange-500 hover:shadow-orange-500/10'
              }
            ].map((del, i) => {
              const Icon = del.icon;
              return (
                <div 
                  key={i} 
                  onClick={() => toast.success(`Included deliverable: ${del.title}`)}
                  className={`group bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl ${del.hover} hover:-translate-y-1.5 transition-all duration-300 space-y-3 cursor-pointer active:scale-95 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${del.bg} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${del.iconColor}`} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${del.badge}`}>
                        INCLUDED
                      </span>
                    </div>
                    <h3 className={`text-base font-black text-slate-900 dark:text-white group-hover:${del.iconColor} transition-colors`}>{del.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{del.desc}</p>
                  </div>

                  <div className={`pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-extrabold ${del.iconColor} flex items-center gap-1`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Provided with License
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 6: MONETIZATION FLOW */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-saath-green font-bold text-xs uppercase tracking-widest">Monetization Flow</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Diversified Revenue Channels
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-lg">
              Earn margins through multiple transactional points in our hyperlocal distribution framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {[
              { emoji: '🛒', name: 'Product Marketplace', margin: '3% - 15% Comm.', desc: 'Earn a transaction commission on all groceries, farm goods, hardware, and home supplies sold via the SaathApp network in your district.' },
              { emoji: '⚡', name: 'Local Services', margin: '15% - 25% Share', desc: 'Retain booking fee splits from assignment of verified home professionals like plumbers, carpenters, technicians, and local medical assistants.' },
              { emoji: '🛵', name: 'Delivery Operations', margin: '₹10 - ₹35 / Delivery', desc: 'Capture delivery base fare margins as your assigned delivery saathis process routing deliveries for regional stores and online orders.' },
              { emoji: '📢', name: 'Local Advertising', margin: '50% Ad Split', desc: 'Promote local stores on the SaathApp app feed or run regional marketing banners. Retain regional advertising splits.' },
              { emoji: '📈', name: 'Franchise Expansion', margin: 'Up to 20% Fee Share', desc: 'District Agents receive sub-licensing shares when local city agent franchises onboarding inside their territories finalize operations.' },
              { emoji: '🤝', name: 'Business Partnerships', margin: 'B2B Margin Splits', desc: 'Secure bulk business distribution agreements (FPOs, farmer inputs, seeds supply, hardware orders) and collect operational commissions.' }
            ].map((rev, i) => (
              <div key={i} className="bg-saath-bg dark:bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-2xl sm:text-3xl block">{rev.emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{rev.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">{rev.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target margins</span>
                  <span className="bg-saath-green-light text-saath-green border border-saath-green/20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-black">
                    {rev.margin}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: ELIGIBILITY PARAMETERS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-saath-bg dark:bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-saath-green font-bold text-xs uppercase tracking-widest">Eligibility Parameters</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Who Can Apply For Franchise?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-lg">
              We look for growth-oriented individuals with localized network insights and business operational backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {[
              { num: '01', role: 'Entrepreneurs', icon: Rocket, iconColor: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20', badge: 'New Venture', desc: 'Self-starters looking to build and scale localized e-commerce, services, and delivery networks using structured playbook models.' },
              { num: '02', role: 'Business Owners', icon: Store, iconColor: 'text-teal-600 dark:text-teal-400', iconBg: 'bg-teal-500/10 dark:bg-teal-500/20 border-teal-500/20', badge: 'Store Digitization', desc: 'Existing retail shop owners (Kirana, Electrical, Hardware) wishing to boost inventory supply and convert to high-volume digital stores.' },
              { num: '03', role: 'Distributors', icon: Truck, iconColor: 'text-amber-600 dark:text-amber-400', iconBg: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20', badge: 'Logistics Hub', desc: 'Experienced local trading agents or FMCG distributors with warehouses who want to establish local fulfillment grids.' },
              { num: '04', role: 'Retailers', icon: Tag, iconColor: 'text-sky-600 dark:text-sky-400', iconBg: 'bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/20', badge: 'Retail Partner', desc: 'Local shop vendors wanting to sell products online, capture adjacent city markets, and implement automated digital invoicing tools.' },
              { num: '05', role: 'Professionals', icon: UserCheck, iconColor: 'text-indigo-600 dark:text-indigo-400', iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/20', badge: 'Operations Lead', desc: 'Individuals with operations management backgrounds (ex-logistics supervisors, corporate managers) looking to start their own venture.' },
              { num: '06', role: 'Investors', icon: TrendingUp, iconColor: 'text-purple-600 dark:text-purple-400', iconBg: 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/20', badge: 'Regional Investor', desc: 'Regional investors wanting to leverage the growth of hyperlocal trade and agriculture systems in Tier 2 and Tier 3 Indian towns.' }
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div 
                  key={i} 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, occupation: p.role }));
                    scrollToSection('apply-form');
                    toast.success(`Selected profile: ${p.role}`);
                  }}
                  className="group bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:shadow-saath-green/10 hover:border-saath-green dark:hover:border-saath-green hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between active:scale-[0.98]"
                >
                  {/* Subtle Corner Background Glow */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-saath-green/5 rounded-full filter blur-xl group-hover:bg-saath-green/15 transition-all pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    {/* Header Row: Icon Badge & Step Number Pill */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${p.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${p.iconColor}`} />
                      </div>
                      <span className="text-xs font-black font-mono tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-700">
                        {p.num}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-saath-green">
                        {p.badge}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-saath-green transition-colors">
                        {p.role}
                      </h3>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                      {p.desc}
                    </p>
                  </div>

                  {/* Interactive Bottom Action Bar */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-300 group-hover:text-saath-green transition-colors relative z-10">
                    <span>Select Profile</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Apply <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 8: TIMELINE FRAMEWORK */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-saath-green font-bold text-xs uppercase tracking-widest">Timeline Framework</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Franchise Launch Process
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-lg">
              Follow these seven simplified milestones to secure your territory and launch operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 text-center">
            {[
              { step: '1', title: 'Apply', sub: 'Submit digital intake' },
              { step: '2', title: 'Discussion', sub: 'Align margins' },
              { step: '3', title: 'Verification', sub: 'Address & background' },
              { step: '4', title: 'Agreement', sub: 'Sign territory contract' },
              { step: '5', title: 'Training', sub: 'Software & ops course' },
              { step: '6', title: 'Launch', sub: 'Onboard sellers' },
              { step: '7', title: 'Growth', sub: 'Scale business' }
            ].map((st, i) => (
              <div 
                key={i} 
                onClick={() => {
                  scrollToSection('apply-form');
                  toast.success(`Milestone Step ${st.step}: ${st.title}. Submit application to begin!`);
                }}
                className="group bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-saath-green hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between cursor-pointer active:scale-95"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-saath-green text-white font-black text-sm sm:text-base flex items-center justify-center shadow-md shadow-saath-green/20 group-hover:scale-110 transition-transform">
                  {st.step}
                </div>
                <div className="space-y-1 mt-3">
                  <h3 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-saath-green transition-colors">{st.title}</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">{st.sub}</p>
                </div>
                <span className="mt-3 text-[9px] font-extrabold uppercase text-saath-green opacity-0 group-hover:opacity-100 transition-opacity">Start Step</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: GROWTH VISION & ROADMAP */}
      <section id="expansion" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-saath-bg dark:bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-saath-green font-bold text-xs uppercase tracking-widest">Growth Vision</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              City Expansion Roadmap
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-lg">
              Click the phases below to view our planned launch targets and regional hyperlocal growth vision.
            </p>
          </div>

          {/* Phase Selector Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            {[
              { phase: 1, label: 'Phase 1: Nalanda' },
              { phase: 2, label: 'Phase 2: Bihar Expansion' },
              { phase: 3, label: 'Phase 3: National Grid' }
            ].map((p, idx) => (
              <React.Fragment key={p.phase}>
                <button
                  onClick={() => setActivePhase(p.phase)}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                    activePhase === p.phase
                      ? 'bg-saath-green text-white shadow-xl shadow-saath-green/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
                {idx < 2 && <span className="text-slate-400 font-bold hidden sm:inline">➔</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Phase Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-12 border border-slate-200/60 dark:border-slate-800 shadow-xl max-w-4xl mx-auto text-left space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider">
                Active phase
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {roadmapPhases[activePhase].title}
              </h3>
              <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-lg leading-relaxed">
                {roadmapPhases[activePhase].desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {roadmapPhases[activePhase].stats.map((st, i) => (
                <div key={i} className="bg-saath-bg dark:bg-slate-800/40 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-xl sm:text-3xl font-black text-saath-green block mb-1">{st.val}</span>
                  <span className="text-[10px] sm:text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: PARTNER SUCCESS STORIES */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-12 space-y-5 sm:space-y-6 text-center shadow-2xl relative overflow-hidden">
          <div className="space-y-2 sm:space-y-3">
            <span className="text-saath-green font-extrabold text-xs uppercase tracking-widest">Partner Success Stories</span>
            <h2 className="font-display text-2xl sm:text-4xl font-black">Early Partner Testimonials</h2>
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              Read how early regional agents and store operators have established operations.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 p-5 sm:p-8 rounded-2xl max-w-2xl mx-auto space-y-3 text-center">
            <span className="text-3xl sm:text-4xl block">👤</span>
            <h3 className="text-base sm:text-lg font-bold text-white">Partner Success Logs Coming Soon</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              As regional district agent agreements are finalized and launch operations complete onboarding, verified partner logs and interview cases will be featured in this panel.
            </p>
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-300 font-semibold block mb-2">Active Partner?</span>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-xs font-bold text-saath-green hover:underline active:scale-95 cursor-pointer"
            >
              If you are an active franchise partner and want to share your case study, contact your account coordinator.
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-saath-bg dark:bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          
          <div className="text-center space-y-3 sm:space-y-4">
            <span className="text-saath-green font-extrabold text-xs uppercase tracking-widest">Got Questions?</span>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-base">
              Here are direct answers to common queries regarding SaathApp franchise operational structures.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-saath-green transition-colors cursor-pointer active:scale-[0.99] gap-3"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openFaqs[idx] ? 'rotate-180 text-saath-green' : ''}`} />
                </button>
                {openFaqs[idx] && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p className="pt-3 sm:pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 12: CONTACT & APPLICATION FORM */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div id="apply-form" className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-saath-green font-bold text-xs uppercase tracking-widest">Intake Open for Q3 2026</span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Start Your Journey Today
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-lg">
              Submit your franchise query. Our regional operations team checks and processes territory allocations within 3 business days.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 text-left items-start">
            
            {/* Left Desk Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-saath-bg dark:bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 space-y-6">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Direct Communication Desk</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-saath-green-light dark:bg-saath-green/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-saath-green" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Business Help</span>
                      <a href="https://wa.me/919128842027" target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg font-black text-slate-900 dark:text-white hover:text-saath-green">
                        +91 91288 42027
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-saath-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-saath-accent" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Franchise Helpdesk</span>
                      <a href="mailto:support@saathapp.in" className="text-base sm:text-lg font-black text-slate-900 dark:text-white hover:text-saath-green">
                        support@saathapp.in
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/60 dark:border-slate-700/60 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-saath-green shrink-0" />
                    <span>Territory exclusivity assurance</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-saath-green shrink-0" />
                    <span>Full operational playbook & tech setup</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-saath-green shrink-0" />
                    <span>Response within 3 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-7 bg-saath-bg dark:bg-slate-800/40 p-6 sm:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-xl">
              <form onSubmit={handleFormSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Mobile Number (WhatsApp) *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Current Occupation</label>
                    <input 
                      type="text" 
                      name="occupation"
                      placeholder="Business / Manager / Retailer"
                      value={formData.occupation}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">City *</label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      placeholder="City name"
                      value={formData.city}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">District *</label>
                    <input 
                      type="text" 
                      name="district"
                      required
                      placeholder="District name"
                      value={formData.district}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">State *</label>
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    >
                      <option value="Bihar">Bihar</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Other State">Other State</option>
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Investment Capacity *</label>
                    <select 
                      name="capital"
                      value={formData.capital}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    >
                      <option value="₹50K - ₹2 Lakhs">₹50K - ₹2 Lakhs</option>
                      <option value="₹2L - ₹5 Lakhs">₹2L - ₹5 Lakhs</option>
                      <option value="₹5L - ₹10 Lakhs">₹5L - ₹10 Lakhs</option>
                      <option value="₹10L - ₹20 Lakhs">₹10L - ₹20 Lakhs</option>
                      <option value="₹20L - ₹50 Lakhs">₹20L - ₹50 Lakhs</option>
                      <option value="₹50 Lakhs +">₹50 Lakhs +</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Business Experience</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleFormChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    >
                      <option value="No prior business experience">No prior business experience</option>
                      <option value="1 - 3 Years">1 - 3 Years</option>
                      <option value="3 - 5 Years">3 - 5 Years</option>
                      <option value="5+ Years (FMCG / Retail)">5+ Years (FMCG / Retail)</option>
                    </select>
                  </div>

                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Message or Territory Request</label>
                  <textarea 
                    name="message"
                    rows="4"
                    placeholder="Provide details about your preferred location or specific franchise requirements..."
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green resize-none"
                  />
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-saath-green hover:bg-saath-green-dark text-white font-extrabold text-xs xs:text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-saath-green/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 whitespace-nowrap group"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    type="button"
                    onClick={handleOpenScheduleModal}
                    className="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-saath-green-light/40 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-saath-green/60 text-slate-800 dark:text-slate-100 font-extrabold text-xs xs:text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-sm group hover:shadow-md"
                  >
                    <PhoneCall className="w-4 h-4 text-saath-green group-hover:rotate-12 transition-transform shrink-0" />
                    <span>Schedule Call</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Standard SAATH Footer */}
      <Footer />

      {/* =========================================
          INTERACTIVE MODALS FOR BUTTON RESPONSES
      ========================================= */}

      {/* 1. BROCHURE PREVIEW & DOWNLOAD MODAL */}
      <AnimatePresence>
        {isBrochureModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsBrochureModalOpen(false)}
                className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="bg-saath-green-light text-saath-green border border-saath-green/20 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  Official Publication 2026
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-6 h-6 text-saath-green" />
                  SaathApp Franchise Information Brochure
                </h3>
                <p className="text-xs text-slate-500 font-medium">SAATHAPPNOVA PRIVATE LIMITED — DPIIT & Startup India Approved</p>
              </div>

              {/* Brochure Preview Content */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-saath-green font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Ready for Immediate Download & Review
                </div>
                <p>
                  This official document outlines the complete operational playbook, territory allocation guidelines, technology stack features, legal agreements, and 9 franchise revenue models for Tier-2 & Tier-3 cities in India.
                </p>
                <ul className="space-y-1.5 list-disc list-inside text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li>Detailed Capital & ROI breakdowns for all 9 franchise outlets</li>
                  <li>Exclusive District Rights & Territory Allocation Matrix</li>
                  <li>Billing Software, POS Integration & Rider Network Routing Protocols</li>
                  <li>Supply Chain restock linkages with regional warehouses</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    executeBrochureDownload();
                    setIsBrochureModalOpen(false);
                  }}
                  className="w-full sm:w-auto bg-saath-green hover:bg-saath-green-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-saath-green/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" /> Download Official Brochure File (.txt/.pdf)
                </button>
                
                <button
                  onClick={() => {
                    setIsBrochureModalOpen(false);
                    scrollToSection('apply-form');
                  }}
                  className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  Apply Directly for Franchise
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. SCHEDULE CALL MODAL */}
      <AnimatePresence>
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setIsScheduleModalOpen(false)}
                className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-saath-green font-extrabold text-[10px] uppercase tracking-widest block">Direct Consultation</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <PhoneCall className="w-6 h-6 text-saath-green" />
                  Schedule a Franchise Consultation Call
                </h3>
                <p className="text-xs text-slate-500 font-medium">Select your preferred date & slot to speak with our regional operations lead.</p>
              </div>

              {!scheduledResult ? (
                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Preferred Date</label>
                    <select 
                      value={scheduleData.date}
                      onChange={(e) => setScheduleData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    >
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Day After Tomorrow">Day After Tomorrow</option>
                      <option value="This Saturday">This Saturday</option>
                      <option value="Next Monday">Next Monday</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Time Slot</label>
                    <select 
                      value={scheduleData.timeSlot}
                      onChange={(e) => setScheduleData(prev => ({ ...prev, timeSlot: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    >
                      <option value="Morning (10:00 AM - 12:00 PM)">Morning (10:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (02:00 PM - 04:00 PM)">Afternoon (02:00 PM - 04:00 PM)</option>
                      <option value="Evening (05:00 PM - 07:00 PM)">Evening (05:00 PM - 07:00 PM)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Preferred Call Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['WhatsApp Call', 'Voice Call', 'Google Meet'].map((mode) => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setScheduleData(prev => ({ ...prev, mode }))}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            scheduleData.mode === mode 
                              ? 'bg-saath-green text-white border-saath-green' 
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Mobile Number (WhatsApp) *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={scheduleData.phone}
                      onChange={(e) => setScheduleData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-saath-green"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isScheduling}
                    className="w-full bg-saath-green hover:bg-saath-green-dark text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-saath-green/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    {isScheduling ? 'Scheduling Call...' : 'Confirm Call Appointment'} <Calendar className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Scheduled Success Card */
                <div className="space-y-5 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-saath-green-light text-saath-green flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">Booking ID: {scheduledResult.bookingId}</span>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">Call Confirmed!</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Our Franchise Relationship Coordinator will contact you on <strong className="text-saath-green">{scheduledResult.phone}</strong> via <strong className="text-slate-800 dark:text-white">{scheduledResult.mode}</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xs font-bold space-y-1 text-left border border-slate-100 dark:border-slate-700">
                    <div>📅 Date: <span className="text-slate-900 dark:text-white">{scheduledResult.date}</span></div>
                    <div>⏰ Slot: <span className="text-slate-900 dark:text-white">{scheduledResult.timeSlot}</span></div>
                  </div>

                  <button 
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 rounded-xl cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. APPLICATION SUBMITTED RECEIPT MODAL */}
      <AnimatePresence>
        {isSubmittedModalOpen && submissionReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setIsSubmittedModalOpen(false)}
                className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-saath-green-light text-saath-green flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="bg-saath-green-light text-saath-green border border-saath-green/20 text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block">
                  Ref: {submissionReceipt.refId}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Application Received!</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                  Thank you <strong>{submissionReceipt.fullName}</strong>. Your franchise intake file has been logged into our regional allocation queue.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Territory Request:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{submissionReceipt.city}, {submissionReceipt.district} ({submissionReceipt.state})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Capital Tier:</span>
                  <span className="font-bold text-saath-green">{submissionReceipt.capital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Email:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{submissionReceipt.email}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Next Steps Timeline</span>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">✓ <strong>Within 24 Hours:</strong> Background & address verification</div>
                  <div className="flex items-center gap-2">✓ <strong>Within 48 Hours:</strong> Territory manager margin alignment call</div>
                  <div className="flex items-center gap-2">✓ <strong>Within 3 Days:</strong> Formal legal proposal & license issue</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const text = `SAATHAPP FRANCHISE APPLICATION RECEIPT\nRef: ${submissionReceipt.refId}\nDate: ${submissionReceipt.date}\nApplicant: ${submissionReceipt.fullName}\nLocation: ${submissionReceipt.city}, ${submissionReceipt.district}, ${submissionReceipt.state}\nCapital: ${submissionReceipt.capital}`;
                    triggerFileDownload(`Application_Receipt_${submissionReceipt.refId}.txt`, text);
                    toast.success('Receipt downloaded!');
                  }}
                  className="w-full sm:w-auto bg-saath-green hover:bg-saath-green-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Save Receipt
                </button>
                <button 
                  onClick={() => setIsSubmittedModalOpen(false)}
                  className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MODEL SPECIFICATION DETAILS MODAL */}
      <AnimatePresence>
        {selectedModelDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedModelDetail(null)}
                className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="bg-saath-green-light text-saath-green border border-saath-green/20 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  {selectedModelDetail.tag} • Model {selectedModelDetail.id}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {selectedModelDetail.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{selectedModelDetail.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Investment Needed</span>
                  <span className="text-lg font-black text-saath-green">{selectedModelDetail.investment}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Space Requirement</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">{selectedModelDetail.space}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Services Portfolio</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {selectedModelDetail.services.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-saath-green shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Corporate Backing</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModelDetail.benefits.map((b, i) => (
                    <span key={i} className="bg-saath-green-light text-saath-green border border-saath-green/20 text-xs font-bold px-3 py-1 rounded-xl">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setCalculatorModel(selectedModelDetail.title);
                    setFormData(prev => ({ ...prev, capital: selectedModelDetail.investment }));
                    setSelectedModelDetail(null);
                    scrollToSection('apply-form');
                    toast.success(`Selected ${selectedModelDetail.title} for application!`);
                  }}
                  className="w-full sm:w-auto bg-saath-green hover:bg-saath-green-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-saath-green/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  Select & Apply for this Model <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedModelDetail(null)}
                  className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl cursor-pointer"
                >
                  Close Specification
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. TRUST BADGE CERTIFICATE INFO MODAL */}
      <AnimatePresence>
        {selectedTrustBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setSelectedTrustBadge(null)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-saath-green font-black text-[10px] uppercase tracking-wider">{selectedTrustBadge.org}</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-saath-green" />
                  {selectedTrustBadge.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                {selectedTrustBadge.desc}
              </p>

              <button 
                onClick={() => setSelectedTrustBadge(null)}
                className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-2.5 text-xs rounded-xl cursor-pointer"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
