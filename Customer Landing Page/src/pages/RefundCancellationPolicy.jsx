import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  BookOpen,
  Calendar,
  CheckCircle,
  CheckCircle2,
  CreditCard,
  DollarSign,
  FileText,
  ListFilter,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Scale,
  ScrollText,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Tag,
  User,
  Wallet,
  XCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const heroIntro =
  'Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED. This Refund & Cancellation Policy explains the conditions under which orders may be cancelled and refunds may be issued for products and services purchased through the SaathApp Platform.';

const sections = [
  {
    id: 'purpose',
    title: '1. Purpose',
    paragraphs: [
      'The purpose of this Refund & Cancellation Policy ("Policy") is to provide customers, sellers, service professionals, and other users with a clear and transparent framework regarding order cancellations, returns, and refunds on the SaathApp Platform.',
      'This Policy is designed to ensure fairness, operational clarity, and compliance with applicable consumer protection laws while supporting the hyperlocal marketplace experience offered by SAATHAPPNOVA PRIVATE LIMITED.',
    ],
  },
  {
    id: 'scope',
    title: '2. Scope',
    intro: 'This Policy applies to:',
    bullets: [
      'Product orders placed through the SaathApp Platform.',
      'Service bookings made through the SaathApp Platform.',
      'Payments made using supported online payment methods.',
      'Cash on Delivery (COD) orders, where available.',
      'Wallet credits, promotional discounts, and applicable refunds issued through the Platform.',
    ],
    outro:
      'This Policy does not apply to transactions conducted outside the Platform or through unauthorized third parties claiming to represent SaathApp.',
  },
  {
    id: 'definitions',
    title: '3. Definitions',
    bullets: [
      'Platform means the SaathApp website, mobile application, and related services.',
      'Customer means a user purchasing products or booking services through the Platform.',
      'Seller means a registered business or individual selling products on the Platform.',
      'Service Professional means an individual or business providing services through the Platform.',
      'Order means a confirmed request for purchase of products or booking of services.',
      'Cancellation means termination of an order or booking before completion.',
      'Refund means return of eligible amounts paid by the Customer.',
      'Company means SAATHAPPNOVA PRIVATE LIMITED.',
    ],
  },
  {
    id: 'general-policy-overview',
    title: '4. General Policy Overview',
    intro: 'SaathApp operates as a technology-enabled marketplace connecting customers with local sellers and service professionals.',
    bullets: [
      'Cancellation and refund eligibility may vary depending on product category, order status, seller policies, and service type.',
      'All cancellation and refund requests are subject to verification.',
      'The Company may facilitate communication between customers, sellers, and service professionals.',
      'Final refund approval may depend on inspection, seller confirmation, or Platform review where applicable.',
    ],
    outro:
      'Nothing in this Policy limits rights available to customers under applicable consumer protection laws.',
  },
  {
    id: 'cancellation-before-confirmation',
    title: '5. Cancellation Before Order Confirmation',
    intro: 'Customers may cancel an order before it is confirmed by the seller or accepted by the service professional.',
    bullets: [
      'If payment has already been made, a full refund will generally be initiated for eligible prepaid orders.',
      'No cancellation charges will apply in such cases unless otherwise disclosed at checkout.',
      'Cancellation requests should be made promptly through the Platform or Customer Support.',
    ],
    outro: 'Once an order moves to confirmed status, cancellation terms in the following sections may apply.',
  },
  {
    id: 'cancellation-after-confirmation-before-dispatch',
    title: '6. Cancellation After Confirmation (Before Dispatch)',
    intro: 'If a customer requests cancellation after order confirmation but before dispatch or service commencement:',
    bullets: [
      'Cancellation may be permitted depending on product category and seller readiness.',
      'A cancellation charge may apply in certain categories where preparation, packaging, or procurement has already begun.',
      'Any applicable cancellation fee will be disclosed before confirmation where possible.',
      'The remaining eligible amount, if any, will be refunded through the original payment method or wallet, as applicable.',
    ],
    outro: 'Seller acceptance timelines and operational constraints may affect cancellation availability.',
  },
  {
    id: 'cancellation-after-dispatch',
    title: '7. Cancellation After Dispatch or During Delivery',
    intro: 'Once an order has been dispatched or is out for delivery:',
    bullets: [
      'Cancellation may not be available until delivery is attempted or completed.',
      'If the customer refuses delivery without a valid reason, return and refund rules may apply instead of standard cancellation.',
      'Delivery charges, convenience fees, or platform fees may be non-refundable where permitted by applicable policy and law.',
      'Perishable, customized, or category-restricted products may not be cancellable after dispatch.',
    ],
    outro: 'Customers should review category-specific terms displayed on the product page before placing an order.',
  },
  {
    id: 'seller-cancellation',
    title: '8. Cancellation by Seller',
    intro: 'A seller may cancel an order due to reasons including but not limited to:',
    bullets: [
      'Product unavailability or stock mismatch.',
      'Pricing or listing errors.',
      'Operational or fulfillment constraints.',
      'Inability to deliver to the specified location.',
      'Suspected fraud or policy violation.',
    ],
    outro:
      'If a seller cancels a confirmed prepaid order, the customer will generally receive a full refund of the amount paid for the cancelled items, subject to verification.',
  },
  {
    id: 'platform-cancellation',
    title: '9. Cancellation by the Platform',
    intro: 'SAATHAPPNOVA PRIVATE LIMITED may cancel an order or booking if:',
    bullets: [
      'Required verification cannot be completed.',
      'Fraud, abuse, or policy violation is suspected.',
      'Technical, payment, or operational issues affect order processing.',
      'The order involves prohibited, restricted, or incorrectly listed items.',
      'Delivery or service fulfillment is not feasible.',
    ],
    outro:
      'Where a Platform-initiated cancellation occurs for a prepaid order, eligible refunds will be processed in accordance with this Policy.',
  },
  {
    id: 'service-booking-cancellations',
    title: '10. Service Booking Cancellations',
    intro: 'For services booked through SaathApp:',
    bullets: [
      'Customers may cancel a service booking before assignment or commencement, subject to the cancellation window shown at booking.',
      'Cancellation charges may apply if cancellation occurs after a professional has accepted the booking or is en route.',
      'If the service professional cancels or fails to arrive without valid reason, the customer may be eligible for rescheduling, credit, or refund as determined by the Company.',
      'Services already completed are not eligible for cancellation but may be reviewed under the Service Warranty Policy where applicable.',
    ],
    outro: 'Service-specific cancellation terms displayed during booking shall form part of this Policy.',
  },
  {
    id: 'service-rescheduling',
    title: '11. Service Rescheduling',
    intro: 'Customers may request rescheduling of a service booking where the feature is available.',
    bullets: [
      'Rescheduling requests should be made within the permitted time window.',
      'Repeated rescheduling without valid reason may affect future booking privileges.',
      'If rescheduling is not possible, cancellation terms under Section 10 may apply.',
    ],
    outro: 'The Company may offer rescheduling as an alternative to cancellation where appropriate.',
  },
  {
    id: 'non-cancellable-orders',
    title: '12. Non-Cancellable Orders',
    intro: 'Certain orders or bookings may be marked as non-cancellable, including but not limited to:',
    bullets: [
      'Customized or made-to-order products.',
      'Perishable grocery and fresh food items after preparation or dispatch.',
      'Digital products or instantly delivered services.',
      'Hygiene-sensitive or sealed products once opened or delivered.',
      'Promotional or clearance items marked "Final Sale".',
      'Orders already out for delivery in restricted categories.',
    ],
    outro: 'Non-cancellable status will be displayed, where applicable, before checkout or booking confirmation.',
  },
  {
    id: 'non-refundable-items',
    title: '13. Non-Refundable Items and Charges',
    intro: 'The following may be non-refundable unless required by applicable law:',
    bullets: [
      'Delivery fees, convenience fees, or platform service charges in completed or attempted deliveries.',
      'Promotional discounts already applied and consumed.',
      'Products damaged due to customer misuse after delivery.',
      'Items returned without original packaging, tags, or accessories where required.',
      'Products excluded under seller or category-specific return rules.',
    ],
    outro: 'Any exceptions will be assessed on a case-by-case basis through Customer Support.',
  },
  {
    id: 'return-eligibility',
    title: '14. Return Eligibility',
    intro: 'Returns may be permitted for eligible products within the applicable return window if:',
    bullets: [
      'The product is defective, damaged, expired, or incorrect.',
      'The product is unused and in original condition with tags, packaging, and invoice where applicable.',
      'The return request is raised within the category-specific return period.',
      'The product category is eligible for return under Platform and seller policies.',
    ],
    outro:
      'Return eligibility may vary for groceries, seeds, hardware, electronics, and other categories. Customers should review product-page return information before purchase.',
  },
  {
    id: 'return-process',
    title: '15. Return Process',
    intro: 'To initiate a return:',
    orderedSteps: [
      'Open the relevant order in your SaathApp account.',
      'Select Return or Report Issue (where available).',
      'Provide the reason for return and upload supporting photos or videos if requested.',
      'Wait for review, pickup scheduling, or seller instructions.',
      'Hand over the product in acceptable condition if return pickup or drop-off is arranged.',
    ],
    outro:
      'The Company or seller may approve, reject, or partially approve a return request after review.',
  },
  {
    id: 'refund-eligibility',
    title: '16. Refund Eligibility',
    intro: 'Refunds may be issued when:',
    bullets: [
      'An eligible order is cancelled before fulfillment and payment was collected.',
      'A seller or the Platform cancels a prepaid order.',
      'A return request is approved after inspection or verification.',
      'A service booking is cancelled by the service professional or Platform without valid completion.',
      'Duplicate payment or technical billing error is confirmed.',
    ],
    outro: 'Refund approval remains subject to verification, category rules, and payment method constraints.',
  },
  {
    id: 'refund-methods-and-timeline',
    title: '17. Refund Methods and Processing Timeline',
    intro: 'Approved refunds may be processed through:',
    bullets: [
      'Original payment method (UPI, debit card, credit card, net banking, or other supported methods).',
      'SaathApp Wallet or store credit, where offered and accepted by the customer.',
      'Bank transfer for eligible COD or exceptional cases, where applicable.',
    ],
    subheading: 'Processing timelines:',
    bullets2: [
      'Wallet refunds may be credited within 24–72 hours.',
      'Online payment refunds may take 5–10 business days depending on the payment provider and bank.',
      'Bank transfer timelines may vary based on verification and banking processes.',
    ],
    outro:
      'The Company will make reasonable efforts to process approved refunds promptly but does not control third-party payment gateway or bank timelines.',
  },
  {
    id: 'cod-refunds',
    title: '18. Cash on Delivery (COD) Refunds',
    intro: 'For eligible COD orders:',
    bullets: [
      'Refunds may be issued to the customer\'s bank account, UPI ID, or SaathApp Wallet after verification.',
      'Customers may be required to provide valid bank or UPI details for refund processing.',
      'COD refunds are subject to successful validation of the return or cancellation claim.',
    ],
    outro: 'Cash refunds at the doorstep are generally not provided unless expressly approved by the Company.',
  },
  {
    id: 'partial-refunds',
    title: '19. Partial Refunds and Adjustments',
    intro: 'The Company may issue partial refunds where:',
    bullets: [
      'Only part of an order is cancelled, returned, or found eligible for refund.',
      'Missing items, quantity differences, or quality issues affect only a portion of the order.',
      'Applicable fees, discounts, or deductions are permitted under this Policy.',
      'A service was partially completed or rescheduled under approved terms.',
    ],
    outro: 'Partial refund amounts will be communicated to the customer after review.',
  },
  {
    id: 'wallet-credits',
    title: '20. Wallet Credits and Store Credits',
    intro: 'In certain cases, the Company may offer wallet or store credit instead of a direct refund.',
    bullets: [
      'Wallet credits may be used for future purchases on the Platform, subject to wallet terms.',
      'Promotional or goodwill credits may have expiry dates or usage restrictions.',
      'Customers may choose an eligible refund method where options are available.',
    ],
    outro: 'Wallet credit terms will be displayed at the time of credit issuance.',
  },
  {
    id: 'promotional-offers',
    title: '21. Promotional Offers, Coupons, and Cashback',
    intro: 'If an order using a coupon, discount, referral reward, or cashback offer is cancelled or refunded:',
    bullets: [
      'The promotional benefit may be reversed or reinstated according to the promotion terms.',
      'Cashback or rewards already credited may be adjusted in future transactions.',
      'Coupons used in cancelled orders may not be reissued unless expressly stated.',
    ],
    outro: 'Each promotion may have separate terms that apply in addition to this Policy.',
  },
  {
    id: 'disputes-and-complaints',
    title: '22. Disputes, Complaints, and Escalation',
    intro: 'If you disagree with a cancellation, return, or refund decision:',
    orderedSteps: [
      'Contact Customer Support with your order or booking details.',
      'Provide supporting evidence such as photos, videos, invoices, or communication records.',
      'Allow reasonable time for review and coordination with sellers or service professionals.',
      'Escalate unresolved issues through official Company channels if necessary.',
    ],
    outro:
      'The Company will review complaints fairly and in accordance with Platform policies and applicable law.',
  },
  {
    id: 'changes-and-governing-law',
    title: '23. Changes to This Policy and Governing Law',
    paragraphs: [
      'SAATHAPPNOVA PRIVATE LIMITED may update this Refund & Cancellation Policy from time to time.',
      'Updated versions will be published on the Platform with the revised "Last Updated" date.',
      'Continued use of the Platform after such updates constitutes acceptance of the revised Policy.',
      'This Policy shall be governed by the laws of India.',
      'Any disputes arising under this Policy shall be subject to the exclusive jurisdiction of the competent courts in Nalanda, Bihar, unless otherwise required by applicable law.',
    ],
  },
];

const acknowledgementBullets = [
  'You have read and understood this Refund & Cancellation Policy.',
  'You understand that cancellation, return, and refund eligibility may vary by product category, order status, and service type.',
  'You agree that refund processing timelines may depend on payment providers, banks, and verification requirements.',
  'You acknowledge that promotional offers, wallet credits, and category-specific terms may apply in addition to this Policy.',
  'You agree to provide accurate information and supporting evidence when requesting cancellations, returns, or refunds.',
];

const sectionIconMap = {
  purpose: Shield,
  scope: FileText,
  definitions: BookOpen,
  'general-policy-overview': ShoppingCart,
  'cancellation-before-confirmation': RefreshCw,
  'cancellation-after-confirmation-before-dispatch': Package,
  'cancellation-after-dispatch': Store,
  'seller-cancellation': XCircle,
  'platform-cancellation': AlertTriangle,
  'service-booking-cancellations': User,
  'service-rescheduling': Calendar,
  'non-cancellable-orders': XCircle,
  'non-refundable-items': Package,
  'return-eligibility': CheckCircle,
  'return-process': RefreshCw,
  'refund-eligibility': Wallet,
  'refund-methods-and-timeline': CreditCard,
  'cod-refunds': DollarSign,
  'partial-refunds': Wallet,
  'wallet-credits': Wallet,
  'promotional-offers': Tag,
  'disputes-and-complaints': ShieldCheck,
  'changes-and-governing-law': Scale,
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

function OrderedList({ items }) {
  if (!items?.length) return null;
  return (
    <ol className="mt-4 space-y-3">
      {items.map((step, index) => (
        <li key={index} className="flex items-start gap-3 text-sm sm:text-[15px] leading-[1.7] text-slate-700 font-normal">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 mt-0.5">
            {index + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

function SectionBody({ section }) {
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
        <p className="text-sm sm:text-[15px] font-bold tracking-tight text-slate-900 pt-2 flex items-center gap-2">
          {section.subheading2}
        </p>
      )}
      <BulletList items={section.bullets2} />
      <OrderedList items={section.orderedSteps} />
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

export default function RefundCancellationPolicyPage() {
  const [activeSection, setActiveSection] = useState('purpose');
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    document.title = 'Refund & Cancellation Policy | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Official Refund & Cancellation Policy of SaathApp operated by SAATHAPPNOVA PRIVATE LIMITED.';
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
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - viewportHeight;
      const nextProgress = fullHeight > 0 ? (scrollTop / fullHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
      setShowScrollTop(scrollTop > 500);

      const current = sectionRefs.current.find((node) => {
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom > 160;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sectionRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -96;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const tocItems = useMemo(() => sections.map((section) => ({ id: section.id, title: section.title })), []);

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

      <div className="sticky top-0 z-40 h-1 w-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

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
                Legal Framework
              </div>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Refund & Cancellation Policy
              </h1>
              <p className="mt-3.5 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                {heroIntro}
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
                Consumer Protection Compliant
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
          {tocItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleSectionClick(e, item.id)}
                className={`shrink-0 text-xs px-3.5 py-2 rounded-full font-medium transition-all cursor-pointer relative z-10 ${isActive
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-page text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {item.title.split('.')[0]}. {item.title.split('. ')[1] || item.title}
              </a>
            );
          })}
        </div>

        {/* 2-Column Grid Layout for Desktop Sidebar & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Sticky Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] max-h-[calc(100vh-7rem)] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100/90 mb-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <ListFilter size={15} className="text-emerald-700" />
                  <span>Table of Contents</span>
                </div>
                <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/50 shadow-2xs">
                  23 Sections
                </span>
              </div>
              <nav className="overflow-y-auto space-y-1.5 pr-1.5 pb-6 custom-scrollbar flex-1 text-xs">
                {tocItems.map((item) => {
                  const IconComponent = sectionIconMap[item.id] || FileText;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleSectionClick(e, item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left font-medium transition-all duration-200 cursor-pointer relative z-10 select-none text-xs sm:text-[13px] ${isActive
                        ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/60 text-emerald-900 font-bold border-l-4 border-emerald-700 shadow-2xs shadow-emerald-900/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:translate-x-0.5'
                        }`}
                    >
                      <IconComponent
                        size={16}
                        className={isActive ? 'text-emerald-700 shrink-0' : 'text-slate-400 shrink-0'}
                      />
                      <span className="truncate">{item.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* 23 Detailed Policy Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const IconComponent = sectionIconMap[section.id] || (index % 2 === 0 ? Shield : FileText);
                const isActive = activeSection === section.id;
                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    ref={(node) => {
                      sectionRefs.current[index] = node;
                    }}
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

              {/* Company Contact Information Card */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-3xl border border-emerald-200/90 bg-emerald-50/60 p-7 md:p-9 shadow-xs"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Contact</p>
                <h2 className="mt-1.5 text-2xl font-extrabold text-slate-900 tracking-tight">SAATHAPPNOVA PRIVATE LIMITED</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Office</p>
                    <p className="mt-1.5 flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                      <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-700" />
                      <span>
                        Bhatahar, Tharthari, Nalanda, Bihar – 801307, India
                      </span>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</p>
                    <p className="mt-1.5">
                      <a href="mailto:support@saathapp.in" className="inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-900 hover:underline">
                        <Mail size={16} />
                        <span>support@saathapp.in</span>
                      </a>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-2xs sm:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone</p>
                    <p className="mt-1.5 flex items-center gap-2.5 font-semibold text-slate-800">
                      <Phone size={18} className="shrink-0 text-emerald-700" />
                      <a href="tel:+919128842027" className="hover:text-emerald-900 hover:underline">
                        +91 9128842027
                      </a>
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Customer Acknowledgement Card */}
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
                  <h2 className="text-xl font-extrabold text-white tracking-tight">Customer Acknowledgement</h2>
                </div>
                <p className="mt-3 text-sm sm:text-[15px] leading-[1.8] text-slate-300 font-normal">
                  By placing orders or booking services through the SaathApp Platform, you acknowledge that:
                </p>
                <ul className="mt-4 space-y-3">
                  {acknowledgementBullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm sm:text-[15px] leading-[1.7] text-slate-200 font-normal">
                      <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm sm:text-[15px] leading-[1.8] text-slate-300 font-normal">
                  By using the SaathApp Platform, you agree to this Refund & Cancellation Policy.
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
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-800"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}
