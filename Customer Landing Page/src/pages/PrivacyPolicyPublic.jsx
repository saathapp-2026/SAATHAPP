import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  Cookie,
  Cpu,
  Database,
  FileText,
  HeartHandshake,
  Layers,
  ListFilter,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  RefreshCw,
  Scale,
  ScrollText,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  UserCheck,
  UserX,
  Wrench,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const introParagraphs = [
  'Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED ("Company", "we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information when you use the SaathApp website, mobile application, and related services (collectively, the "Platform").',
  'By accessing or using our Platform, you agree to this Privacy Policy.',
];

const sections = [
  {
    id: 'company-information',
    title: '1. Company Information',
    isCompanyInfo: true,
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    intro:
      'We collect information that you voluntarily provide and information generated through your use of our Platform.',
    groups: [
      {
        label: 'A. Personal Information',
        bullets: [
          'Full Name',
          'Mobile Number',
          'Email Address',
          'Profile Photograph (Optional)',
          'Date of Birth (Optional)',
          'Gender (Optional)',
        ],
      },
      {
        label: 'B. Address Information',
        bullets: [
          'House Number',
          'Street',
          'Area',
          'Landmark',
          'Village / Town / City',
          'District',
          'State',
          'PIN Code',
        ],
      },
      {
        label: 'C. Account Information',
        bullets: ['Login Details', 'User ID', 'Account Preferences', 'Saved Addresses', 'Wishlist', 'Order History'],
      },
      {
        label: 'D. Payment Information',
        paragraphs: [
          'We do not store your complete debit card, credit card, UPI PIN, or internet banking passwords.',
          'Payment processing is handled through trusted third-party payment gateways.',
        ],
        subheading: 'We may store:',
        bullets: ['Transaction ID', 'Payment Status', 'Payment Method', 'Refund Status'],
      },
    ],
  },
  {
    id: 'location-information',
    title: '3. Location Information',
    intro: 'To provide accurate hyperlocal services, we may collect:',
    bullets: ['GPS Location', 'Approximate Location', 'Delivery Location', 'Pickup Location'],
    paragraphs: [
      'Location access is requested only with your permission.',
      'You can disable location access from your device settings at any time.',
    ],
  },
  {
    id: 'device-information',
    title: '4. Device Information',
    intro: 'We may automatically collect:',
    bullets: [
      'Device Model',
      'Operating System',
      'Browser Type',
      'IP Address',
      'Device Identifier',
      'Language Settings',
      'App Version',
      'Crash Logs',
    ],
    outro: 'This information helps improve security and app performance.',
  },
  {
    id: 'order-information',
    title: '5. Order Information',
    intro: 'When you place an order, we collect:',
    bullets: [
      'Ordered Products',
      'Seller Details',
      'Delivery Address',
      'Order Amount',
      'Payment Status',
      'Delivery Status',
      'Order History',
    ],
  },
  {
    id: 'service-booking-information',
    title: '6. Service Booking Information',
    intro: 'If you book professional services, we may collect:',
    bullets: [
      'Service Type',
      'Appointment Date',
      'Service Address',
      'Technician Details',
      'Service Notes',
      'Customer Feedback',
    ],
  },
  {
    id: 'seller-information',
    title: '7. Seller Information',
    intro: 'For sellers and business partners, we may collect:',
    bullets: [
      'Business Name',
      'Owner Name',
      'GST Details (if applicable)',
      'Business Address',
      'PAN (where required)',
      'Bank Account Details',
      'Business Registration Documents',
      'Identity Verification Documents',
    ],
  },
  {
    id: 'delivery-partner-information',
    title: '8. Delivery Partner Information',
    intro: 'For delivery partners, we may collect:',
    bullets: [
      'Name',
      'Mobile Number',
      'Aadhaar (where required)',
      'Driving License (if applicable)',
      'Vehicle Details',
      'Bank Account Details',
      'Live Delivery Location during active deliveries',
    ],
  },
  {
    id: 'how-we-use',
    title: '9. How We Use Your Information',
    intro: 'We use your information to:',
    bullets: [
      'Create and manage your account',
      'Process orders',
      'Deliver products and services',
      'Verify users and businesses',
      'Improve customer support',
      'Process payments',
      'Prevent fraud',
      'Improve platform security',
      'Send important notifications',
      'Provide order updates',
      'Improve our services and user experience',
      'Comply with legal obligations',
    ],
  },
  {
    id: 'marketing',
    title: '10. Marketing Communications',
    intro: 'With your consent, we may send:',
    bullets: [
      'Promotional Offers',
      'Discounts',
      'Festival Campaigns',
      'Product Recommendations',
      'Service Updates',
      'New Feature Announcements',
    ],
    outro: 'You may opt out of marketing communications at any time.',
  },
  {
    id: 'cookies',
    title: '11. Cookies and Similar Technologies',
    intro: 'Our website may use cookies to:',
    bullets: [
      'Keep you logged in',
      'Remember your preferences',
      'Improve website performance',
      'Analyze traffic',
      'Enhance user experience',
    ],
    outro: 'You can manage cookie preferences through your browser settings.',
  },
  {
    id: 'sharing',
    title: '12. Sharing of Information',
    intro: 'We do not sell your personal information.',
    subheading: 'We may share limited information with:',
    bullets: [
      'Verified Sellers',
      'Delivery Partners',
      'Service Professionals',
      'Payment Gateway Providers',
      'Logistics Partners',
      'Government Authorities (when legally required)',
      'Law Enforcement Agencies (when required by law)',
    ],
    outro:
      'Only the minimum information necessary to provide services or comply with legal obligations will be shared.',
  },
  {
    id: 'data-security',
    title: '13. Data Security',
    intro: 'We use commercially reasonable security measures to protect your information, including:',
    bullets: [
      'Secure Servers',
      'Encrypted Communication (HTTPS/SSL)',
      'Access Controls',
      'Authentication Mechanisms',
      'Regular Security Monitoring',
      'Data Backup Procedures',
    ],
    outro:
      'While we strive to protect your information, no internet-based system can guarantee absolute security.',
  },
  {
    id: 'data-retention',
    title: '14. Data Retention',
    intro: 'We retain your information only for as long as necessary to:',
    bullets: [
      'Provide services',
      'Maintain transaction records',
      'Resolve disputes',
      'Meet legal and regulatory requirements',
    ],
    outro: 'When no longer required, data will be securely deleted or anonymized.',
  },
  {
    id: 'childrens-privacy',
    title: "15. Children's Privacy",
    paragraphs: [
      'Our Platform is not intended for children under the age of 18 without the supervision or consent of a parent or legal guardian.',
      'If we become aware that personal information has been collected from a child without appropriate authorization where required, we will take reasonable steps to delete such information.',
    ],
  },
  {
    id: 'your-rights',
    title: '16. Your Rights',
    intro: 'You may have the right to:',
    bullets: [
      'Access your personal information',
      'Correct inaccurate information',
      'Update your profile',
      'Delete your account',
      'Request deletion of personal data (subject to legal obligations)',
      'Withdraw consent where applicable',
      'Contact us regarding privacy concerns',
    ],
  },
  {
    id: 'account-deletion',
    title: '17. Account Deletion',
    intro: 'You may request deletion of your account by:',
    bullets: [
      'Using the account deletion option (when available), or',
      'Contacting us at support@saathapp.in.',
    ],
    outro:
      'Certain records may be retained where required for legal, tax, fraud prevention, or regulatory purposes.',
  },
  {
    id: 'third-party-services',
    title: '18. Third-Party Services',
    intro: 'Our Platform may integrate with trusted third-party services such as:',
    bullets: [
      'Payment Gateways',
      'Maps and Location Services',
      'SMS and OTP Providers',
      'Email Service Providers',
      'Analytics Services',
    ],
    outro: 'These third parties operate under their own privacy policies.',
  },
  {
    id: 'changes',
    title: '19. Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time.',
      'Any material changes will be posted on this page with an updated "Last Updated" date. Continued use of the Platform after such changes constitutes acceptance of the revised policy.',
    ],
  },
  {
    id: 'governing-law',
    title: '20. Governing Law',
    paragraphs: [
      'This Privacy Policy shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in Nalanda, Bihar, unless otherwise required by applicable law.',
    ],
  },
  {
    id: 'contact-us',
    title: '21. Contact Us',
    isContact: true,
  },
];

const sectionIconMap = {
  'company-information': Building2,
  'information-we-collect': Database,
  'location-information': MapPin,
  'device-information': Smartphone,
  'order-information': ShoppingBag,
  'service-booking-information': Wrench,
  'seller-information': Store,
  'delivery-partner-information': Truck,
  'how-we-use': Cpu,
  'marketing': Megaphone,
  'cookies': Cookie,
  'sharing': Share2,
  'data-security': Lock,
  'data-retention': Clock,
  'childrens-privacy': HeartHandshake,
  'your-rights': UserCheck,
  'account-deletion': UserX,
  'third-party-services': Layers,
  'changes': RefreshCw,
  'governing-law': Scale,
  'contact-us': Mail,
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
  if (section.isCompanyInfo) {
    return (
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4.5 transition-all hover:bg-page">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Company Name</p>
          <p className="mt-1 font-semibold text-slate-900">SAATHAPPNOVA PRIVATE LIMITED</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4.5 transition-all hover:bg-page">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Platform Name</p>
          <p className="mt-1 font-semibold text-slate-900">SaathApp</p>
        </div>
        <div className="sm:col-span-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4.5 transition-all hover:bg-page">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Office</p>
          <p className="mt-1.5 flex items-start gap-2.5 text-sm text-slate-800 font-medium">
            <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-700" />
            <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4.5 transition-all hover:bg-page">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer Support Email</p>
          <p className="mt-1.5">
            <a href="mailto:support@saathapp.in" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-900 hover:underline">
              <Mail size={16} />
              <span>support@saathapp.in</span>
            </a>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4.5 transition-all hover:bg-page">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Legal Email</p>
          <p className="mt-1.5">
            <a href="mailto:legal@saathapp.in" className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-900 hover:underline">
              <Mail size={16} />
              <span>legal@saathapp.in</span>
            </a>
          </p>
        </div>
        <div className="sm:col-span-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4.5 transition-all hover:bg-page">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone / WhatsApp</p>
          <p className="mt-1.5 flex items-center gap-2.5 font-semibold text-slate-800">
            <Phone size={18} className="shrink-0 text-emerald-700" />
            <span>+91 9128842027</span>
          </p>
        </div>
      </div>
    );
  }

  if (section.isContact) {
    return (
      <div className="mt-5 space-y-5">
        <p className="text-sm sm:text-[15px] leading-[1.75] text-slate-600 font-normal">
          If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your
          personal information, please contact us:
        </p>
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

      {section.groups?.map((group) => (
        <div
          key={group.label}
          className="mt-4.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6 transition-all hover:bg-page"
        >
          <p className="text-sm sm:text-[15px] font-bold text-slate-900 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600"></span>
            {group.label}
          </p>
          {group.paragraphs?.map((paragraph, pIndex) => (
            <p key={pIndex} className="mt-3 text-sm sm:text-[15px] leading-[1.75] text-slate-600 font-normal">
              {paragraph}
            </p>
          ))}
          {group.subheading && (
            <p className="mt-3.5 text-sm font-semibold text-slate-800">{group.subheading}</p>
          )}
          <BulletList items={group.bullets} />
        </div>
      ))}

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

export default function PrivacyPolicyPublicPage() {
  const [activeSection, setActiveSection] = useState('company-information');
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
    document.title = 'Privacy Policy | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Read the SaathApp Privacy Policy to learn how SAATHAPPNOVA PRIVATE LIMITED collects, uses, stores, and protects your personal information.';
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
      <Header
        cartCount={0}
        onCartClick={() => { }}
        location="Bhatahar, Nalanda"
        onLocationClick={() => { }}
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
                Privacy Policy
              </h1>
              <p className="mt-3.5 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                Learn how SAATHAPPNOVA PRIVATE LIMITED collects, protects, and handles your personal information across our Platform.
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
                Hyperlocal Data Protection
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
                  21 Sections
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

            {/* 21 Detailed Policy Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const IconComponent = sectionIconMap[section.id] || (index % 2 === 0 ? ShieldCheck : FileText);
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

              {/* Consent Section Card */}
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
                  <h2 className="text-xl font-extrabold text-white tracking-tight">Consent</h2>
                </div>
                <p className="mt-3 text-sm sm:text-base leading-[1.8] text-slate-300 font-normal">
                  By creating an account, accessing, or using the SaathApp Platform, you acknowledge that you have read,
                  understood, and agreed to this Privacy Policy. If you do not agree with this Privacy Policy, please
                  discontinue use of the Platform.
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
