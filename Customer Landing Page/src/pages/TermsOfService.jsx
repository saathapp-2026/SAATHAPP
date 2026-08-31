import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUp,
  Award,
  BadgeCheck,
  Bike,
  BookOpen,
  Briefcase,
  CheckCircle,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  FileEdit,
  FileText,
  Layers,
  ListFilter,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  RefreshCw,
  Scale,
  Scissors,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Tag,
  Truck,
  User,
  UserX,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const introParagraphs = [
  'Welcome to SaathApp, a digital hyperlocal marketplace owned and operated by SAATHAPPNOVA PRIVATE LIMITED ("Company", "we", "our", or "us").',
  'These Terms of Service ("Terms") govern your access to and use of the SaathApp website, mobile application, and all related products and services (collectively, the "Platform").',
  'By accessing or using the Platform, you agree to comply with these Terms. If you do not agree with any part of these Terms, please do not use the Platform.',
];

const sections = [
  {
    id: 'definitions',
    title: '1. Definitions',
    bullets: [
      'Platform means the SaathApp website, mobile application, and related services.',
      'User means any person accessing or using the Platform.',
      'Customer means a user purchasing products or booking services.',
      'Seller means a registered business or individual selling products.',
      'Service Professional means an individual or business providing services through the Platform.',
      'Delivery Partner means a registered delivery person fulfilling deliveries.',
      'Company means SAATHAPPNOVA PRIVATE LIMITED.',
    ],
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    intro: 'To use the Platform, you must:',
    bullets: [
      'Be at least 18 years of age, or use the Platform under the supervision of a parent or legal guardian where permitted.',
      'Provide accurate and complete registration information.',
      'Comply with all applicable laws and these Terms.',
    ],
    outro: 'The Company reserves the right to suspend or terminate accounts that do not meet these requirements.',
  },
  {
    id: 'user-account',
    title: '3. User Account',
    intro: 'To access certain features, you may be required to create an account.',
    subheading: 'You agree to:',
    bullets: [
      'Provide accurate information.',
      'Keep your login credentials secure.',
      'Update your account information when necessary.',
      'Be responsible for all activities under your account.',
    ],
    outro: 'The Company is not responsible for losses resulting from unauthorized access due to your failure to protect your account credentials.',
  },
  {
    id: 'platform-services',
    title: '4. Platform Services',
    intro: 'SaathApp provides a digital platform that enables users to:',
    bullets: [
      'Purchase products from local sellers.',
      'Book professional services.',
      'Discover nearby businesses.',
      'Connect with delivery partners.',
      'Access other marketplace features introduced by the Company.',
    ],
    outro: 'The Company facilitates these transactions but may not be the direct seller or service provider unless expressly stated.',
  },
  {
    id: 'orders',
    title: '5. Orders',
    intro: 'Customers may place orders subject to product availability.',
    subheading: 'The Company reserves the right to:',
    bullets: [
      'Accept or reject any order.',
      'Cancel orders affected by pricing errors, fraud, technical issues, or inventory limitations.',
      'Verify customer information before processing orders.',
    ],
    outro: 'An order confirmation does not guarantee final acceptance until processed.',
  },
  {
    id: 'pricing',
    title: '6. Pricing',
    paragraphs: [
      'Prices displayed on the Platform are generally determined by sellers and may change without prior notice.',
      'Applicable taxes, delivery charges, convenience fees, or other charges, where applicable, will be shown before checkout.',
    ],
  },
  {
    id: 'payments',
    title: '7. Payments',
    paragraphs: [
      'Customers may pay using supported payment methods available on the Platform.',
      'The Company does not store complete debit card, credit card, or UPI PIN information.',
      'Payments are processed through authorized third-party payment service providers.',
    ],
  },
  {
    id: 'delivery',
    title: '8. Delivery',
    intro: 'Estimated delivery times are provided for convenience only.',
    subheading: 'Actual delivery may vary due to:',
    bullets: [
      'Weather conditions',
      'Traffic',
      'Seller preparation time',
      'Customer availability',
      'Operational issues',
      'Events beyond reasonable control',
    ],
    outro: 'Delivery timelines are estimates and are not guaranteed.',
  },
  {
    id: 'service-bookings',
    title: '9. Service Bookings',
    paragraphs: [
      'Professional services are provided by independent service professionals.',
      'Customers are responsible for providing accurate service details and ensuring access to the service location.',
      'Service quality may vary depending on the provider.',
    ],
  },
  {
    id: 'user-responsibilities',
    title: '10. User Responsibilities',
    subheading: 'Users agree to:',
    bullets: [
      'Use the Platform lawfully.',
      'Provide truthful information.',
      'Respect sellers, service professionals, delivery partners, and other users.',
      'Pay for confirmed orders.',
      'Follow applicable laws.',
    ],
    subheading2: 'Users must not:',
    bullets2: [
      'Create fake accounts.',
      'Misuse promotional offers.',
      'Attempt unauthorized access.',
      'Upload harmful software or malicious code.',
      'Engage in fraudulent or illegal activities.',
      "Interfere with the Platform's operation.",
    ],
  },
  {
    id: 'seller-responsibilities',
    title: '11. Seller Responsibilities',
    subheading: 'Registered sellers agree to:',
    bullets: [
      'Provide accurate product information.',
      'Maintain lawful business operations.',
      'Deliver quality products.',
      'Honor confirmed orders.',
      'Comply with applicable tax and regulatory requirements.',
      'Follow Seller Policies published by the Company.',
    ],
  },
  {
    id: 'service-professional-responsibilities',
    title: '12. Service Professional Responsibilities',
    subheading: 'Service professionals agree to:',
    bullets: [
      'Provide services professionally.',
      'Maintain required qualifications where applicable.',
      'Complete accepted bookings responsibly.',
      'Follow safety standards.',
      'Comply with Company policies.',
    ],
  },
  {
    id: 'delivery-partner-responsibilities',
    title: '13. Delivery Partner Responsibilities',
    subheading: 'Delivery partners agree to:',
    bullets: [
      'Deliver orders safely and responsibly.',
      'Follow traffic and applicable laws.',
      'Maintain professional conduct.',
      'Protect customer privacy.',
      'Comply with the Delivery Partner Agreement.',
    ],
  },
  {
    id: 'cancellations',
    title: '14. Cancellations',
    paragraphs: [
      'Orders or service bookings may be cancelled in accordance with the applicable Cancellation and Refund Policy.',
      'Cancellation charges may apply in certain situations.',
    ],
  },
  {
    id: 'refunds',
    title: '15. Refunds',
    intro: 'Refunds, where applicable, will be processed according to the Refund & Cancellation Policy.',
    subheading: 'Refund eligibility depends on factors including:',
    bullets: [
      'Product category',
      'Order status',
      'Seller approval (where applicable)',
      'Platform policies',
    ],
  },
  {
    id: 'promotions',
    title: '16. Promotions and Offers',
    subheading: 'Discounts, coupons, referral rewards, cashback, and promotional offers:',
    bullets: [
      'May have separate terms.',
      'May be modified or withdrawn without prior notice.',
      'Cannot be exchanged for cash unless explicitly stated.',
    ],
    outro: 'Fraudulent use of promotions may result in account suspension.',
  },
  {
    id: 'intellectual-property',
    title: '17. Intellectual Property',
    intro: 'All content available on the Platform, including but not limited to:',
    bullets: [
      'Logos',
      'Trademarks',
      'Brand names',
      'Software',
      'Designs',
      'Images',
      'Icons',
      'Text',
      'Graphics',
    ],
    outro: 'is owned by or licensed to SAATHAPPNOVA PRIVATE LIMITED and is protected under applicable intellectual property laws. Users may not copy, modify, distribute, or reproduce any content without prior written permission.',
  },
  {
    id: 'third-party',
    title: '18. Third-Party Services',
    intro: 'The Platform may include integrations with third-party services such as:',
    bullets: [
      'Payment gateways',
      'Maps',
      'SMS services',
      'Email providers',
      'Analytics tools',
    ],
    outro: 'The Company is not responsible for the independent policies or practices of third-party providers.',
  },
  {
    id: 'suspension',
    title: '19. Suspension and Termination',
    intro: 'The Company may suspend or terminate any account without prior notice if a user:',
    bullets: [
      'Violates these Terms.',
      'Engages in fraud.',
      'Misuses the Platform.',
      'Provides false information.',
      'Violates applicable laws.',
      'Threatens the security or integrity of the Platform.',
    ],
    outro: 'Termination does not affect obligations that arose before termination.',
  },
  {
    id: 'disclaimer',
    title: '20. Disclaimer',
    intro: 'The Platform is provided on an "as available" and "as is" basis.',
    subheading: 'While we strive to maintain accurate information and reliable services, we do not guarantee:',
    bullets: [
      'Continuous availability.',
      'Error-free operation.',
      'Uninterrupted access.',
      'Absolute accuracy of all content.',
    ],
  },
  {
    id: 'limitation-of-liability',
    title: '21. Limitation of Liability',
    intro: 'To the maximum extent permitted by law, SAATHAPPNOVA PRIVATE LIMITED shall not be liable for:',
    bullets: [
      'Indirect or consequential damages.',
      'Loss of profits or business opportunities.',
      'Data loss.',
      'Delays caused by third parties.',
      'Events beyond reasonable control.',
      "Seller or service provider actions outside the Company's control.",
    ],
    outro: 'Nothing in these Terms excludes liability where such exclusion is prohibited by applicable law.',
  },
  {
    id: 'indemnity',
    title: '22. Indemnity',
    intro: 'You agree to indemnify and hold harmless SAATHAPPNOVA PRIVATE LIMITED, its directors, officers, employees, and affiliates from claims, damages, losses, liabilities, and expenses arising out of:',
    bullets: [
      'Your misuse of the Platform.',
      'Violation of these Terms.',
      'Violation of applicable laws.',
      'Infringement of third-party rights.',
    ],
  },
  {
    id: 'force-majeure',
    title: '23. Force Majeure',
    paragraphs: [
      'The Company shall not be responsible for delays or failures caused by events beyond its reasonable control, including natural disasters, pandemics, government actions, strikes, internet failures, cyberattacks, or power outages.',
    ],
  },
  {
    id: 'changes',
    title: '24. Changes to These Terms',
    paragraphs: [
      'The Company may revise these Terms from time to time.',
      'Updated Terms will be published on the Platform with the revised "Last Updated" date.',
      'Continued use of the Platform after changes become effective constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: 'governing-law',
    title: '25. Governing Law and Jurisdiction',
    paragraphs: [
      'These Terms shall be governed by and interpreted in accordance with the laws of India.',
      'Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Nalanda, Bihar, unless otherwise required by applicable law.',
    ],
  },
  {
    id: 'severability',
    title: '26. Severability',
    paragraphs: [
      'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.',
    ],
  },
  {
    id: 'entire-agreement',
    title: '27. Entire Agreement',
    paragraphs: [
      'These Terms, together with the Privacy Policy and other policies published on the Platform, constitute the entire agreement between you and SAATHAPPNOVA PRIVATE LIMITED regarding the use of the Platform.',
    ],
  },
  {
    id: 'contact',
    title: '28. Contact Information',
    isContact: true,
  },
];

const sectionIconMap = {
  definitions: BookOpen,
  eligibility: CheckCircle,
  'user-account': User,
  'platform-services': Layers,
  orders: ShoppingBag,
  pricing: Tag,
  payments: CreditCard,
  delivery: Truck,
  'service-bookings': Wrench,
  'user-responsibilities': ShieldAlert,
  'seller-responsibilities': Store,
  'service-professional-responsibilities': Briefcase,
  'delivery-partner-responsibilities': Bike,
  cancellations: XCircle,
  refunds: RefreshCw,
  promotions: Megaphone,
  'intellectual-property': Award,
  'third-party': ExternalLink,
  suspension: UserX,
  disclaimer: AlertTriangle,
  'limitation-of-liability': ShieldCheck,
  indemnity: Lock,
  'force-majeure': Zap,
  changes: FileEdit,
  'governing-law': Scale,
  severability: Scissors,
  'entire-agreement': FileText,
  contact: Mail,
};

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 space-y-3">
      {items.map((bullet, index) => (
        <li key={index} className="flex items-start gap-3 text-sm sm:text-[15px] leading-[1.7] text-slate-700 font-normal">
          <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-700" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionBody({ section }) {
  if (section.isContact) {
    return (
      <div className="mt-5 space-y-5">
        <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/60 p-5 sm:p-7 shadow-xs">
          <p className="text-base font-bold text-slate-900 mb-4">SAATHAPPNOVA PRIVATE LIMITED</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 rounded-xl bg-white p-4.5 border border-slate-200/80 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Office</p>
              <p className="mt-1.5 flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-700" />
                <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
              </p>
            </div>
            <div className="rounded-xl bg-white p-4.5 border border-slate-200/80 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer Support</p>
              <p className="mt-1.5">
                <a href="mailto:support@saathapp.in" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-900 hover:underline">
                  <Mail size={16} />
                  <span>support@saathapp.in</span>
                </a>
              </p>
            </div>
            <div className="rounded-xl bg-white p-4.5 border border-slate-200/80 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Inquiry</p>
              <p className="mt-1.5">
                <a href="mailto:company@saathapp.in" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-900 hover:underline">
                  <Mail size={16} />
                  <span>company@saathapp.in</span>
                </a>
              </p>
            </div>
            <div className="sm:col-span-2 rounded-xl bg-white p-4.5 border border-slate-200/80 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone / WhatsApp</p>
              <p className="mt-1.5 flex items-center gap-2.5 font-semibold text-slate-800">
                <Phone size={18} className="shrink-0 text-emerald-700" />
                <span>+91 9128842027</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3.5 space-y-4">
      {section.intro && (
        <p className="text-sm sm:text-[15px] leading-[1.75] text-slate-600 font-normal">{section.intro}</p>
      )}
      {section.subheading && (
        <p className="text-sm sm:text-[15px] font-bold tracking-tight text-slate-900 pt-2 flex items-center gap-2">
          {section.subheading}
        </p>
      )}
      <BulletList items={section.bullets} />
      {section.subheading2 && (
        <p className="text-sm sm:text-[15px] font-bold tracking-tight text-slate-900 pt-3 flex items-center gap-2">
          {section.subheading2}
        </p>
      )}
      <BulletList items={section.bullets2} />
      {section.paragraphs?.map((paragraph, pIndex) => (
        <p key={pIndex} className="text-sm sm:text-[15px] leading-[1.75] text-slate-600 font-normal">
          {paragraph}
        </p>
      ))}
      {section.outro && (
        <p className="text-sm sm:text-[15px] leading-[1.75] text-slate-600 pt-1 font-medium">{section.outro}</p>
      )}
    </div>
  );
}

export default function TermsOfServicePage({ location, onLocationClick }) {
  const [activeSection, setActiveSection] = useState('definitions');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isClickScrolling = useRef(false);

  const handleSectionClick = (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveSection(id);
    isClickScrolling.current = true;

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -96;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    }
  };

  useEffect(() => {
    document.title = 'Terms of Service | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Read the SaathApp Terms of Service governing use of the hyperlocal marketplace platform, orders, payments, and user responsibilities.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      if (isClickScrolling.current) return;

      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const elTop = el.getBoundingClientRect().top + window.pageYOffset;
          if (elTop <= scrollPosition) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800">
      <Header location={location} onLocationClick={onLocationClick}
        cartCount={0}
        onCartClick={() => { }}


        onSearch={() => { }}
        onLogin={() => { }}
        onSignup={() => { }}
        onProfile={() => { }}
        user={null}
        isAuthenticated={false}
        onCartPage={() => { }}
        onOrdersPage={() => { }}
        onWishlistPage={() => { }}
        onSettingsPage={() => { }}
        onLogout={() => { }}
        darkMode={false}
        toggleDarkMode={() => { }}
        onVoiceSearchClick={() => { }}
        onImageSearchClick={() => { }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-100/90 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-7 md:p-10 text-white shadow-xl"
        >
          {/* Decorative Background Accents */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex justify-between items-center">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4.5 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/30"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <Sparkles size={14} />
                Legal Document
              </div>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-3.5 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                Read the official SaathApp Terms of Service governing platform usage, marketplace policies, user responsibilities, and customer rights.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs md:text-sm font-medium text-slate-200 backdrop-blur-md">
                <BadgeCheck size={16} className="text-emerald-400" />
                Effective Date: 25 July 2026
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs md:text-sm font-medium text-slate-200 backdrop-blur-md">
                <ScrollText size={16} className="text-emerald-400" />
                Last Updated: 25 July 2026
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs md:text-sm font-medium text-emerald-300 backdrop-blur-md">
                <ShieldCheck size={16} className="text-emerald-400" />
                Verified Legal Framework
              </span>
            </div>
          </div>
        </motion.section>

        {/* Mobile Horizontal Quick-Jump Bar */}
        <div className="lg:hidden sticky top-0 z-20 -mx-4 px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs mb-6 overflow-x-auto scrollbar-none flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase shrink-0 flex items-center gap-1">
            <ListFilter size={13} className="text-emerald-700" />
            Nav:
          </span>
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={(e) => handleSectionClick(e, sec.id)}
                className={`shrink-0 text-xs px-3.5 py-2 rounded-full font-medium transition-all cursor-pointer relative z-10 ${isActive
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-page text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {sec.title.split('.')[0]}. {sec.title.split('. ')[1] || sec.title}
              </button>
            );
          })}
        </div>

        {/* 2-Column Grid Layout for Desktop Sidebar & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Sticky Sidebar (Desktop) */}
          <aside className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded hidden lg:block lg:col-span-4">
            <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] max-h-[calc(100vh-7rem)] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100/90 mb-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <ListFilter size={15} className="text-emerald-700" />
                  <span>Table of Contents</span>
                </div>
                <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/50 shadow-2xs">
                  28 Sections
                </span>
              </div>
              <nav className="overflow-y-auto space-y-1.5 pr-1.5 pb-6 custom-scrollbar flex-1 text-xs">
                {sections.map((sec) => {
                  const IconComponent = sectionIconMap[sec.id] || FileText;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={(e) => handleSectionClick(e, sec.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left font-medium transition-all duration-200 cursor-pointer relative z-10 select-none text-xs sm:text-[13px] ${isActive
                        ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/60 text-emerald-900 font-bold border-l-4 border-emerald-700 shadow-2xs shadow-emerald-900/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:translate-x-0.5'
                        }`}
                    >
                      <IconComponent
                        size={16}
                        className={isActive ? 'text-emerald-700 shrink-0' : 'text-slate-400 shrink-0'}
                      />
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Intro Section Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-slate-50 p-7 md:p-9 shadow-sm"
            >
              <div className="flex items-start gap-4.5">
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                  <ShieldCheck size={24} />
                </div>
                <div className="space-y-4 text-sm sm:text-[15px] leading-[1.8] text-slate-700">
                  {introParagraphs.map((paragraph, index) => (
                    <p key={index} className="font-normal">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* 28 Detailed Policy Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const IconComponent = sectionIconMap[section.id] || (index % 2 === 0 ? FileText : ShieldCheck);
                const isActive = activeSection === section.id;
                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    className={`scroll-mt-24 rounded-3xl border ${isActive
                      ? 'border-emerald-400/80 shadow-[0_8px_30px_-6px_rgba(46,125,50,0.12)] border-l-4 border-l-emerald-600'
                      : 'border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
                      } bg-white p-7 md:p-9 transition-all duration-300 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.08)] hover:border-emerald-200/80`}
                  >
                    <div className="flex items-start gap-4.5">
                      <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 text-emerald-800 border border-emerald-200/60 shadow-2xs">
                        <IconComponent size={21} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 pb-3.5 border-b border-slate-100/90 mb-3">
                          {section.title}
                        </h2>
                        <SectionBody section={section} />
                      </div>
                    </div>
                  </motion.section>
                );
              })}

              {/* Acceptance of Terms Card */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-7 md:p-9 text-white shadow-2xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400" />
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <BadgeCheck size={22} />
                  </div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight">Acceptance of Terms</h2>
                </div>
                <p className="mt-3 text-sm sm:text-base leading-[1.8] text-slate-300 font-normal">
                  By creating an account, accessing, or using the SaathApp Platform, you confirm that you have read,
                  understood, and agreed to these Terms of Service. If you do not agree with these Terms, you should
                  discontinue use of the Platform immediately.
                </p>
              </motion.section>
            </div>

            {/* Bottom Actions Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6 pb-4">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-page hover:border-slate-300"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4.5 py-3 text-sm font-semibold text-emerald-800 shadow-2xs transition hover:bg-emerald-100/90"
              >
                <ArrowUp size={16} />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-800"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}
