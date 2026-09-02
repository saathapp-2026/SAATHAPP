import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUp,
  Award,
  BadgeCheck,
  BarChart3,
  Briefcase,
  CheckCircle,
  CheckCircle2,
  CreditCard,
  DollarSign,
  FileText,
  Headphones,
  Key,
  ListFilter,
  Lock,
  Mail,
  MapPin,
  Package,
  Percent,
  Phone,
  Receipt,
  RefreshCw,
  Scale,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  UserCheck,
  UserX,
  XCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const introParagraphs = [
  'Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED ("Company", "we", "our", or "us").',
  'This Seller Policy governs the registration, onboarding, listing, selling, fulfillment, payments, and conduct of all businesses and individuals who sell products through the SaathApp Platform.',
  'By registering as a Seller, you agree to comply with this Seller Policy, the Terms of Service, Privacy Policy, and all applicable laws.',
];

const sections = [
  {
    id: 'eligibility',
    title: '1. Eligibility',
    intro: 'To become a Seller on SaathApp, you must:',
    bullets: [
      'Be at least 18 years of age.',
      'Own or operate a legally recognized business, shop, or retail establishment.',
      'Provide accurate business information.',
      'Complete the verification process required by the Company.',
      'Comply with all applicable laws and regulations.',
    ],
    outro: 'The Company reserves the right to approve or reject any seller application.',
  },
  {
    id: 'seller-registration',
    title: '2. Seller Registration',
    intro: 'To register, sellers may be required to provide:',
    bullets: [
      'Business Name',
      'Owner Name',
      'Mobile Number',
      'Email Address',
      'Business Address',
      'Shop Photograph',
      'Business Category',
      'GST Number (if applicable)',
      'PAN Card (where required)',
      'Aadhaar Card (where required)',
      'Bank Account Details',
      'Cancelled Cheque or Bank Proof (if required)',
    ],
    outro: 'Additional documents may be requested depending on the category.',
  },
  {
    id: 'verification-process',
    title: '3. Verification Process',
    intro: 'All sellers are subject to verification.',
    subheading: 'Verification may include:',
    bullets: [
      'Identity Verification',
      'Business Verification',
      'Address Verification',
      'Phone Verification',
      'Document Verification',
      'Physical Verification (where applicable)',
    ],
    outro: 'Approval is at the sole discretion of SAATHAPPNOVA PRIVATE LIMITED.',
  },
  {
    id: 'seller-responsibilities',
    title: '4. Seller Responsibilities',
    intro: 'Every seller agrees to:',
    bullets: [
      'Provide genuine products.',
      'Maintain accurate product information.',
      'Display correct pricing.',
      'Update stock regularly.',
      'Pack products safely.',
      'Fulfill confirmed orders on time.',
      'Maintain professional behavior.',
      'Follow all Platform policies.',
    ],
  },
  {
    id: 'product-listing-guidelines',
    title: '5. Product Listing Guidelines',
    intro: 'Sellers must ensure that every listing contains:',
    bullets: [
      'Correct Product Name',
      'Clear Images',
      'Accurate Description',
      'Actual Selling Price',
      'Available Stock',
      'Product Specifications',
      'Warranty Details (if applicable)',
      'Brand Information (if applicable)',
    ],
    outro: 'Misleading or false listings are prohibited.',
  },
  {
    id: 'prohibited-products',
    title: '6. Prohibited Products',
    intro: 'The following items are not permitted unless specifically approved by applicable law and the Company:',
    bullets: [
      'Illegal Products',
      'Counterfeit Goods',
      'Stolen Property',
      'Narcotics and Illegal Drugs',
      'Tobacco Products',
      'Alcoholic Beverages (unless authorized)',
      'Firearms and Ammunition',
      'Explosives',
      'Hazardous Chemicals',
      'Adult or Obscene Material',
      'Wildlife Products prohibited by law',
      'Expired Medicines',
      'Expired Food Products',
      'Unsafe Products',
      'Recalled Products',
    ],
    outro: 'The Company may remove any prohibited listing without prior notice.',
  },
  {
    id: 'pricing',
    title: '7. Pricing',
    intro: 'Sellers are responsible for setting product prices.',
    subheading: 'Prices must:',
    bullets: [
      'Be transparent.',
      'Include applicable taxes where required.',
      'Not intentionally mislead customers.',
      'Match the final checkout price.',
    ],
    outro: 'Artificial price inflation or deceptive pricing practices are prohibited.',
  },
  {
    id: 'inventory-management',
    title: '8. Inventory Management',
    intro: 'Sellers must:',
    bullets: [
      'Maintain accurate inventory.',
      'Remove unavailable products promptly.',
      'Avoid accepting orders for out-of-stock items.',
      'Update stock whenever inventory changes.',
    ],
    outro: 'Repeated stock-related cancellations may affect seller performance.',
  },
  {
    id: 'order-fulfillment',
    title: '9. Order Fulfillment',
    intro: 'After receiving an order, sellers must:',
    bullets: [
      'Accept or reject the order promptly.',
      'Pack products securely.',
      'Prepare the order within the expected timeline.',
      'Hand over the order to the assigned delivery partner where applicable.',
      'Cooperate in resolving order issues.',
    ],
  },
  {
    id: 'product-quality',
    title: '10. Product Quality',
    intro: 'Sellers must ensure that products are:',
    bullets: [
      'Genuine.',
      'Safe for intended use.',
      'Free from defects.',
      'Properly packaged.',
      'Within expiry dates (where applicable).',
    ],
    outro: 'Selling fake, damaged, or expired products may result in suspension or termination.',
  },
  {
    id: 'returns-and-refunds',
    title: '11. Returns and Refunds',
    intro: 'Sellers must cooperate with the Company\'s Return and Refund Policy.',
    subheading: 'Where applicable, sellers are responsible for:',
    bullets: [
      'Inspecting returned products.',
      'Processing eligible returns.',
      'Accepting valid refund requests.',
      'Resolving customer complaints fairly.',
    ],
  },
  {
    id: 'seller-performance-standards',
    title: '12. Seller Performance Standards',
    intro: 'Seller performance may be evaluated based on:',
    bullets: [
      'Order Acceptance Rate',
      'Order Cancellation Rate',
      'Delivery Preparation Time',
      'Customer Ratings',
      'Product Quality',
      'Return Rate',
      'Complaint Resolution',
      'Policy Compliance',
    ],
    outro: 'Poor performance may result in warnings, reduced visibility, suspension, or account termination.',
  },
  {
    id: 'payments-and-payouts',
    title: '13. Payments and Payouts',
    intro: 'Payments to sellers are subject to:',
    bullets: [
      'Successful order completion.',
      'Applicable deductions such as platform fees, taxes, refunds, or penalties where permitted.',
      'Verification of seller details.',
    ],
    outro: 'Payout schedules will be communicated separately through the Seller Dashboard or applicable agreements.',
  },
  {
    id: 'commission-and-fees',
    title: '14. Commission and Fees',
    intro: 'SaathApp may charge:',
    bullets: [
      'Marketplace Commission',
      'Subscription Fees',
      'Listing Fees (for selected categories)',
      'Advertising Charges',
      'Promotional Service Fees',
    ],
    outro: 'Applicable charges will be communicated before they become effective.',
  },
  {
    id: 'taxes',
    title: '15. Taxes',
    intro: 'Sellers are solely responsible for:',
    bullets: [
      'GST compliance (where applicable).',
      'Filing tax returns.',
      'Maintaining invoices.',
      'Paying taxes required under applicable laws.',
    ],
    outro: 'The Company does not provide tax advice.',
  },
  {
    id: 'customer-service',
    title: '16. Customer Service',
    intro: 'Sellers must:',
    bullets: [
      'Respond to customer queries promptly.',
      'Resolve complaints professionally.',
      'Cooperate with customer support investigations.',
      'Maintain respectful communication.',
    ],
    outro: 'Abusive or inappropriate conduct toward customers or Company representatives is prohibited.',
  },
  {
    id: 'seller-ratings-and-reviews',
    title: '17. Seller Ratings and Reviews',
    intro: 'Customers may submit ratings and reviews based on their experience.',
    subheading: 'Sellers must not:',
    bullets: [
      'Post fake reviews.',
      'Offer incentives for positive reviews unless expressly permitted.',
      'Harass customers regarding reviews.',
      'Manipulate ratings.',
    ],
    outro: 'The Company reserves the right to moderate reviews that violate Platform policies.',
  },
  {
    id: 'intellectual-property',
    title: '18. Intellectual Property',
    paragraphs: [
      'Sellers must only upload content that they own or are authorized to use.',
      'Sellers are responsible for ensuring that product images, logos, descriptions, and trademarks do not infringe the rights of others.',
      'The Company may remove infringing content without notice.',
    ],
  },
  {
    id: 'policy-violations',
    title: '19. Policy Violations',
    intro: 'Violations may include:',
    bullets: [
      'Selling counterfeit products.',
      'Misrepresentation.',
      'Fraudulent activity.',
      'Fake orders.',
      'Price manipulation.',
      'Repeated cancellations.',
      'Poor customer service.',
      'Document fraud.',
      'Illegal products.',
      'Abuse of Platform features.',
    ],
  },
  {
    id: 'penalties',
    title: '20. Penalties',
    intro: 'Depending on the severity of the violation, the Company may:',
    bullets: [
      'Issue warnings.',
      'Remove product listings.',
      'Temporarily suspend listings.',
      'Temporarily suspend the seller account.',
      'Permanently terminate the seller account.',
      'Withhold payouts where legally permitted.',
      'Report unlawful activities to appropriate authorities.',
    ],
  },
  {
    id: 'account-suspension',
    title: '21. Account Suspension or Termination',
    intro: 'The Company may suspend or terminate a seller account if the seller:',
    bullets: [
      'Violates this Policy.',
      'Provides false information.',
      'Engages in fraud.',
      'Sells prohibited products.',
      'Damages the reputation of the Platform.',
      'Violates applicable laws.',
    ],
    outro: 'Termination does not relieve the seller of obligations arising before termination.',
  },
  {
    id: 'confidentiality',
    title: '22. Confidentiality',
    paragraphs: [
      'Sellers must keep confidential any non-public information received through the Platform, including customer information, business information, and proprietary Platform data.',
      'Customer data may only be used for fulfilling orders and must not be used for unauthorized marketing or other unrelated purposes.',
    ],
  },
  {
    id: 'changes',
    title: '23. Changes to Seller Policy',
    paragraphs: [
      'SAATHAPPNOVA PRIVATE LIMITED may update this Seller Policy from time to time.',
      'Updated versions will be published on the Platform with the revised "Last Updated" date.',
      'Continued use of the Platform after changes become effective constitutes acceptance of the updated Policy.',
    ],
  },
  {
    id: 'governing-law',
    title: '24. Governing Law',
    paragraphs: [
      'This Seller Policy shall be governed by the laws of India.',
      'Any disputes shall be subject to the exclusive jurisdiction of the competent courts in Nalanda, Bihar, unless otherwise required by applicable law.',
    ],
  },
  {
    id: 'contact-us',
    title: '25. Contact Us',
    isContact: true,
  },
];

const declarationBullets = [
  'You have read and understood this Seller Policy.',
  'The information you provide is accurate and complete.',
  'You agree to comply with all Platform policies and applicable laws.',
  'You accept responsibility for the products and services offered through your seller account.',
  'You understand that violation of this Policy may result in suspension or termination of your seller account.',
];

const sectionIconMap = {
  eligibility: CheckCircle,
  'seller-registration': UserCheck,
  'verification-process': ShieldCheck,
  'seller-responsibilities': Briefcase,
  'product-listing-guidelines': FileText,
  'prohibited-products': XCircle,
  pricing: DollarSign,
  'inventory-management': Package,
  'order-fulfillment': Truck,
  'product-quality': Award,
  'returns-and-refunds': RefreshCw,
  'seller-performance-standards': BarChart3,
  'payments-and-payouts': CreditCard,
  'commission-and-fees': Percent,
  taxes: Receipt,
  'customer-service': Headphones,
  'seller-ratings-and-reviews': Star,
  'intellectual-property': Lock,
  'policy-violations': AlertTriangle,
  penalties: ShieldAlert,
  'account-suspension': UserX,
  confidentiality: Key,
  changes: RefreshCw,
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
  if (section.isContact) {
    return (
      <div className="mt-5 space-y-5">
        <p className="text-sm sm:text-[15px] leading-[1.75] text-slate-600 font-normal">
          For questions regarding this Seller Policy, please contact:
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
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Enquiries</p>
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

export default function SellerPolicyPage({ location, onLocationClick }) {
  const [activeSection, setActiveSection] = useState('eligibility');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.title = 'Seller Policy | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Read the SaathApp Seller Policy covering registration, product listings, fulfillment, payments, and seller responsibilities.';
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

      const scrollPosition = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'auto' });
    }
  };

  return (
    <div className="min-h-screen bg-page text-slate-800">
      <Header
        location={location}
        onLocationClick={onLocationClick}
        cartCount={0}
        onCartClick={() => {}}
        onSearch={() => {}}
        onLogin={() => {}}
        onSignup={() => {}}
        onProfile={() => {}}
        user={null}
        isAuthenticated={false}
        onCartPage={() => {}}
        onOrdersPage={() => {}}
        onWishlistPage={() => {}}
        onSettingsPage={() => {}}
        onLogout={() => {}}
        darkMode={false}
        toggleDarkMode={() => {}}
        onVoiceSearchClick={() => {}}
        onImageSearchClick={() => {}}
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
                Seller Policy Framework
              </div>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Seller Policy
              </h1>
              <p className="mt-3.5 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                Comprehensive terms governing registration, onboarding, listing, fulfillment, payments, and conduct for SaathApp sellers.
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
                className={`shrink-0 text-xs px-3.5 py-2 rounded-full font-medium transition-all cursor-pointer relative z-10 ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  25 Sections
                </span>
              </div>
              <nav className="overflow-y-auto space-y-1.5 pr-1.5 pb-6 custom-scrollbar flex-1 text-xs">
                {sections.map((sec) => {
                  const IconComponent = sectionIconMap[sec.id] || Store;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={(e) => handleSectionClick(e, sec.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left font-medium transition-all duration-200 cursor-pointer relative z-10 select-none text-xs sm:text-[13px] ${
                        isActive
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

          {/* Main Content Column (All sections fully present vertically mapped) */}
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
                  <Store size={24} />
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

            {/* All Policy Section Cards (Fully Present & Visible) */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const IconComponent = sectionIconMap[section.id] || (index % 2 === 0 ? Store : FileText);
                const isActive = activeSection === section.id;
                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className={`rounded-3xl border p-7 md:p-9 transition-all duration-300 ${
                      isActive
                        ? 'border-emerald-400/80 shadow-[0_8px_30px_-6px_rgba(46,125,50,0.12)] border-l-4 border-l-emerald-600 bg-white'
                        : 'border-slate-200/80 bg-white shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-4.5">
                      <div
                        className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-2xs ${
                          isActive
                            ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/90 text-emerald-800 border-emerald-200/60'
                            : 'bg-slate-100/80 text-slate-600 border-slate-200/60'
                        }`}
                      >
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
            </div>

            {/* Seller Declaration Card */}
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
                <h2 className="text-xl font-extrabold text-white tracking-tight">Seller Declaration</h2>
              </div>
              <p className="mt-3 text-sm sm:text-[15px] leading-[1.8] text-slate-300 font-normal">
                By registering or continuing to operate as a Seller on the SaathApp Platform, you confirm that:
              </p>
              <ul className="mt-4 space-y-3">
                {declarationBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-[15px] leading-[1.7] text-slate-200 font-normal">
                    <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm sm:text-[15px] leading-[1.8] text-slate-300 font-normal">
                By using the SaathApp Platform as a Seller, you acknowledge and agree to this Seller Policy.
              </p>
            </motion.section>

            {/* Bottom Actions Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6 pb-4">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:border-slate-300"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              <button
                type="button"
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
