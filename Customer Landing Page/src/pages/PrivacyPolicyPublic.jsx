import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Phone,
  ScrollText,
  ShieldCheck,
  Sparkles,
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

function SectionBody({ section }) {
  if (section.isCompanyInfo) {
    return (
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div>
          <p className="font-semibold text-slate-900">Company Name:</p>
          <p className="mt-1">SAATHAPPNOVA PRIVATE LIMITED</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Platform Name:</p>
          <p className="mt-1">SaathApp</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Registered Office:</p>
          <p className="mt-1 flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
            <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Customer Support Email:</p>
          <p className="mt-1">
            <a href="mailto:support@saathapp.in" className="text-primary hover:underline">
              support@saathapp.in
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Legal Email:</p>
          <p className="mt-1">
            <a href="mailto:legal@saathapp.in" className="text-primary hover:underline">
              legal@saathapp.in
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Phone / WhatsApp:</p>
          <p className="mt-1 flex items-center gap-2">
            <Phone size={16} className="shrink-0 text-primary" />
            <span>+91 9128842027</span>
          </p>
        </div>
      </div>
    );
  }

  if (section.isContact) {
    return (
      <div className="mt-4 space-y-4 text-sm text-slate-600">
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your
          personal information, please contact us:
        </p>
        <p className="font-semibold text-slate-900">SAATHAPPNOVA PRIVATE LIMITED</p>
        <div>
          <p className="font-semibold text-slate-900">Registered Office:</p>
          <p className="mt-1 flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
            <span>Bhatahar, Tharthari, Nalanda, Bihar – 801307, India</span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Customer Support:</p>
          <p className="mt-1 flex items-center gap-2">
            <Mail size={16} className="shrink-0 text-primary" />
            <a href="mailto:support@saathapp.in" className="text-primary hover:underline">
              support@saathapp.in
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Business Inquiry:</p>
          <p className="mt-1 flex items-center gap-2">
            <Mail size={16} className="shrink-0 text-primary" />
            <a href="mailto:company@saathapp.in" className="text-primary hover:underline">
              company@saathapp.in
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Phone / WhatsApp:</p>
          <p className="mt-1 flex items-center gap-2">
            <Phone size={16} className="shrink-0 text-primary" />
            <span>+91 9128842027</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {section.intro && <p className="mt-3 text-sm leading-7 text-slate-600">{section.intro}</p>}
      {section.subheading && <p className="mt-4 text-sm font-semibold text-slate-800">{section.subheading}</p>}
      <BulletList items={section.bullets} />
      {section.groups?.map((group) => (
        <div key={group.label}>
          <p className="mt-4 text-sm font-semibold text-slate-800">{group.label}</p>
          {group.paragraphs?.map((paragraph, pIndex) => (
            <p key={pIndex} className="mt-3 text-sm leading-7 text-slate-600">
              {paragraph}
            </p>
          ))}
          {group.subheading && <p className="mt-3 text-sm font-semibold text-slate-800">{group.subheading}</p>}
          <BulletList items={group.bullets} />
        </div>
      ))}
      {section.paragraphs?.map((paragraph, pIndex) => (
        <p key={pIndex} className="mt-3 text-sm leading-7 text-slate-600">
          {paragraph}
        </p>
      ))}
      {section.outro && <p className="mt-4 text-sm leading-7 text-slate-600">{section.outro}</p>}
    </>
  );
}

export default function PrivacyPolicyPublicPage() {
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

      <div className="mx-auto flex max-w-4xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-primary/10 via-white to-emerald-50 p-6 text-center shadow-xl sm:p-8 lg:p-10"
        >
          <div className="mb-6 flex justify-start">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Sparkles size={16} />
            Legal
          </div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">Privacy Policy</h1>
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
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            {introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.section>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {index % 2 === 0 ? <ShieldCheck size={18} /> : <FileText size={18} />}
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-xl font-black text-slate-900">{section.title}</h2>
                  <SectionBody section={section} />
                </div>
              </div>
            </motion.section>
          ))}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl sm:p-8"
          >
            <h2 className="text-xl font-black">Consent</h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              By creating an account, accessing, or using the SaathApp Platform, you acknowledge that you have read,
              understood, and agreed to this Privacy Policy. If you do not agree with this Privacy Policy, please
              discontinue use of the Platform.
            </p>
          </motion.section>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pb-4">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
