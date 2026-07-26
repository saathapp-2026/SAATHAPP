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
  Sparkles,
  Store,
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
  if (section.isContact) {
    return (
      <div className="mt-4 space-y-4 text-sm text-slate-600">
        <p>For questions regarding this Seller Policy, please contact:</p>
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
          <p className="font-semibold text-slate-900">Business Enquiries:</p>
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
      {section.paragraphs?.map((paragraph, pIndex) => (
        <p key={pIndex} className="mt-3 text-sm leading-7 text-slate-600">
          {paragraph}
        </p>
      ))}
      {section.outro && <p className="mt-4 text-sm leading-7 text-slate-600">{section.outro}</p>}
    </>
  );
}

export default function SellerPolicyPage() {
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
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">Seller Policy</h1>
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
                  {index % 2 === 0 ? <Store size={18} /> : <FileText size={18} />}
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
            <h2 className="text-xl font-black">Seller Declaration</h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              By registering or continuing to operate as a Seller on the SaathApp Platform, you confirm that:
            </p>
            <ul className="mt-4 space-y-2">
              {declarationBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-200">
                  <ChevronRight size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              By using the SaathApp Platform as a Seller, you acknowledge and agree to this Seller Policy.
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
