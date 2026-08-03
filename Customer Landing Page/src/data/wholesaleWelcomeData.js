import {
  Users,
  TrendingUp,
  ShieldCheck,
  Zap,
  Package,
  BarChart3,
  Megaphone,
  BadgeCheck,
  Globe2,
  Headphones,
  LineChart,
  Lock,
  Truck,
  FileCheck,
  ClipboardList,
  SearchCheck,
  CircleCheckBig,
  Store,
  Clock3,
  FileText,
  BadgeCheck as VerifiedIcon,
} from 'lucide-react';

export const WHOLESALE_PRIMARY = '#0A8F3D';

export const partnerTypes = [
  'Manufacturers',
  'Wholesalers',
  'Distributors',
  'Suppliers',
  'Stockists',
  'Importers',
  'Exporters',
  'Brand Owners',
];

export const wholesaleBenefits = [
  {
    icon: Users,
    title: 'Reach More Buyers',
    description: 'Connect with verified retailers, dealers, and businesses sourcing bulk inventory across India.',
    color: 'text-[#0A8F3D]',
    bg: 'bg-[#0A8F3D]/10',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Expand beyond your local market with pan-India visibility and B2B growth tools.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Encrypted settlements, transparent payout cycles, and full transaction history.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Zap,
    title: 'Fast Verification',
    description: 'Streamlined document review with partner activation within 24–48 business hours.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Package,
    title: 'Bulk Orders',
    description: 'Manage MOQ tiers, high-volume requests, and repeat B2B orders from one dashboard.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Track sales, buyer trends, inventory movement, and revenue with real-time insights.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: Megaphone,
    title: 'Marketing Support',
    description: 'Featured listings, promotional campaigns, and co-marketing to accelerate discovery.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Business Profile',
    description: 'GST-verified, SaathApp-certified partner badge that builds instant buyer trust.',
    color: 'text-[#0A8F3D]',
    bg: 'bg-[#0A8F3D]/10',
  },
];

export const onboardingTimeline = [
  {
    icon: FileText,
    title: 'Complete Registration',
    duration: '15–20 minutes',
    description: 'Fill business owner details, warehouse info, products, documents, and bank details in a guided multi-step flow.',
  },
  {
    icon: SearchCheck,
    title: 'Document & Business Review',
    duration: '24–48 hours',
    description: 'Our team verifies GST, PAN, trade license, warehouse details, and business credentials.',
  },
  {
    icon: VerifiedIcon,
    title: 'Partner Activation',
    duration: 'Same day',
    description: 'Once approved, access your wholesale dashboard, list products, and start receiving bulk orders.',
  },
];

export const wholesaleSteps = [
  {
    step: 1,
    title: 'Register',
    description: 'Submit business details, GST/PAN information, and product categories to begin onboarding.',
    icon: ClipboardList,
  },
  {
    step: 2,
    title: 'Verify',
    description: 'Our team reviews documents and validates credentials for platform compliance.',
    icon: SearchCheck,
  },
  {
    step: 3,
    title: 'Get Approved',
    description: 'Your verified wholesale profile goes live with catalog access and partner badge.',
    icon: CircleCheckBig,
  },
  {
    step: 4,
    title: 'Start Selling',
    description: 'List products, receive bulk orders, manage fulfillment, and grow with partner support.',
    icon: Store,
  },
];

export const wholesaleStats = [
  { label: 'Active Buyers', value: 50000, suffix: '+' },
  { label: 'Wholesale Partners', value: 2500, suffix: '+' },
  { label: 'Orders Processed', value: 100000, suffix: '+' },
  { label: 'Cities Covered', value: 120, suffix: '+' },
];

export const whyChooseSaathApp = [
  {
    icon: Globe2,
    title: 'Hyperlocal + Pan-India Reach',
    description: 'Serve neighbourhood retailers while expanding into new cities through SaathApp\'s B2B network.',
    color: 'text-[#0A8F3D]',
    bg: 'bg-[#0A8F3D]/10',
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description: 'Bank-level encryption, secure escrow, and compliant payment rails for wholesale trade.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Headphones,
    title: 'Dedicated Partner Support',
    description: 'Priority onboarding, account managers, and 24/7 partner helpline for operational queries.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: LineChart,
    title: 'Growth Intelligence',
    description: 'Demand patterns, pricing benchmarks, and category performance to drive margins.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Truck,
    title: 'Integrated Logistics',
    description: 'Bulk delivery coordination with tracking, dispatch alerts, and fulfillment partnerships.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: FileCheck,
    title: 'GST-Compliant Operations',
    description: 'Automated invoicing, tax documentation, and compliant billing for B2B transactions.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export const wholesaleFaqs = [
  {
    question: 'Who can register as a wholesale partner on SaathApp?',
    answer:
      'Manufacturers, wholesalers, distributors, importers, exporters, suppliers, stockists, and brand owners with valid GST registration, PAN, and business proof can apply across grocery, hardware, agriculture, electronics, and more.',
  },
  {
    question: 'How long does the onboarding process take?',
    answer:
      'The online registration form takes approximately 15–20 minutes. Document and business verification is typically completed within 24–48 business hours after submission.',
  },
  {
    question: 'What documents are required?',
    answer:
      'GST certificate, PAN card, Aadhaar, trade license, company registration, bank details, warehouse photos, and category-specific licenses (FSSAI, drug license, etc.) where applicable.',
  },
  {
    question: 'Are there registration or listing fees?',
    answer:
      'Yes. A one-time wholesale onboarding fee (₹500 – ₹2,00,000) applies based on city type (Village to Metro), business type, delivery radius, and category. This includes 2-year partner validity. Application review begins only after successful payment.',
  },
  {
    question: 'How do bulk orders and payments work?',
    answer:
      'Buyers place bulk orders on the platform. Payments flow through secure UPI, net banking, NEFT/RTGS, and verified B2B credit options with full settlement tracking in your dashboard.',
  },
  {
    question: 'What happens after approval?',
    answer:
      'Approved partners receive access to the wholesale dashboard for product management, bulk orders, inventory, buyers, finance, analytics, and marketing tools.',
  },
];
