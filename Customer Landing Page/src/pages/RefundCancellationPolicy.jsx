import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  ChevronRight,
  CreditCard,
  FileText,
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
  User,
  Wallet,
  XCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const heroIntro =
  'Welcome to SaathApp, operated by SAATHAPPNOVA PRIVATE LIMITED. This Refund & Cancellation Policy explains the conditions under which orders may be cancelled and refunds may be issued for products and services purchased through the SaathApp Platform.';

const sectionIcons = [
  Shield,
  FileText,
  Scale,
  ShoppingCart,
  RefreshCw,
  Package,
  Store,
  XCircle,
  AlertTriangle,
  User,
  RefreshCw,
  XCircle,
  Package,
  ShoppingCart,
  RefreshCw,
  Wallet,
  CreditCard,
  Wallet,
  Wallet,
  Wallet,
  AlertTriangle,
  ShieldCheck,
  ScrollText,
];

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

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 space-y-2">
      {items.map((bullet, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
          <ChevronRight size={16} className="mt-0.5 shrink-0 text-primary" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function OrderedList({ items }) {
  if (!items?.length) return null;
  return (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
      {items.map((step, index) => (
        <li key={index} className="leading-7">
          {step}
        </li>
      ))}
    </ol>
  );
}

function SectionBody({ section }) {
  return (
    <>
      {section.intro && <p className="mt-3 text-sm leading-7 text-slate-600">{section.intro}</p>}
      {section.subheading && <p className="mt-4 text-sm font-semibold text-slate-800">{section.subheading}</p>}
      <BulletList items={section.bullets} />
      {section.subheading2 && <p className="mt-4 text-sm font-semibold text-slate-800">{section.subheading2}</p>}
      <BulletList items={section.bullets2} />
      <OrderedList items={section.orderedSteps} />
      {section.paragraphs?.map((paragraph, pIndex) => (
        <p key={pIndex} className="mt-3 text-sm leading-7 text-slate-600">
          {paragraph}
        </p>
      ))}
      {section.outro && <p className="mt-4 text-sm leading-7 text-slate-600">{section.outro}</p>}
    </>
  );
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
        return rect.top <= 140 && rect.bottom > 140;
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

  const tocItems = useMemo(() => sections.map((section) => ({ id: section.id, title: section.title })), []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header
        cartCount={0}
        onCartClick={() => {}}
        location="Bhatahar, Nalanda"
        onLocationClick={() => {}}
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

      <div className="sticky top-0 z-40 h-1 w-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-[900px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-primary/10 via-white to-emerald-50 p-6 text-center shadow-xl sm:p-8 lg:p-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Sparkles size={16} />
            Legal
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">Refund & Cancellation Policy</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700">
              <BadgeCheck size={16} className="text-primary" />
              Effective Date: 25 July 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700">
              <ScrollText size={16} className="text-primary" />
              Last Updated: 25 July 2026
            </span>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-left text-sm leading-7 text-slate-600 sm:text-base">{heroIntro}</p>
        </motion.section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav
              aria-label="Table of contents"
              className="sticky top-20 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                <FileText size={16} className="text-primary" />
                Table of Contents
              </div>
              <div className="max-h-[calc(100vh-8rem)] space-y-1 overflow-y-auto pr-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`block rounded-2xl px-3 py-2 text-xs leading-5 transition ${
                      activeSection === item.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="space-y-4">
            <details className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
              <summary className="cursor-pointer text-sm font-black text-slate-900">Table of Contents</summary>
              <nav aria-label="Mobile table of contents" className="mt-3 space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`block rounded-xl px-3 py-2 text-xs ${
                      activeSection === item.id ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </details>

            {sections.map((section, index) => {
              const Icon = sectionIcons[index] || Shield;
              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  ref={(node) => {
                    sectionRefs.current[index] = node;
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-black text-slate-900">{section.title}</h2>
                      <div className="mt-3 h-px w-full bg-gradient-to-r from-primary/30 via-slate-200 to-transparent" />
                      <SectionBody section={section} />
                    </div>
                  </div>
                </motion.section>
              );
            })}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-emerald-50 p-6 shadow-lg sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">Contact</p>
                  <h2 className="text-xl font-black text-slate-900">SAATHAPPNOVA PRIVATE LIMITED</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-black text-slate-900">Registered Office</p>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-7 text-slate-600">
                    <MapPin size={16} className="mt-1 shrink-0 text-primary" />
                    <span>
                      Bhatahar,
                      <br />
                      Tharthari,
                      <br />
                      Nalanda,
                      <br />
                      Bihar – 801307,
                      <br />
                      India
                    </span>
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-black text-slate-900">Email</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <Mail size={16} className="shrink-0 text-primary" />
                    <a href="mailto:support@saathapp.in" className="text-primary hover:underline">
                      support@saathapp.in
                    </a>
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2">
                  <p className="text-sm font-black text-slate-900">Phone</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={16} className="shrink-0 text-primary" />
                    <a href="tel:+919128842027" className="hover:text-primary">
                      +91 9128842027
                    </a>
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl sm:p-8"
            >
              <h2 className="text-xl font-black">Customer Acknowledgement</h2>
              <p className="mt-4 text-sm leading-7 text-slate-200">
                By placing orders or booking services through the SaathApp Platform, you acknowledge that:
              </p>
              <ul className="mt-4 space-y-2">
                {acknowledgementBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-200">
                    <ChevronRight size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-slate-200">
                By using the SaathApp Platform, you agree to this Refund & Cancellation Policy.
              </p>
            </motion.section>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pb-4">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>
      </div>

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:opacity-90"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}
