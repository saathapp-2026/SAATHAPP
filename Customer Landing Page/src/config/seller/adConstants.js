export const AD_STATUSES = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  REVIEW: 'review',
  APPROVED: 'approved',
  RUNNING: 'running',
  PAUSED: 'paused',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
};

export const STATUS_STYLES = {
  draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  submitted: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  review: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  running: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  paused: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  completed: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
};

export const AD_TYPES = [
  { id: 'text', label: 'Text Advertisement', short: 'Text Ad', description: 'Headline + offer copy with CTA', color: 'emerald', icon: 'text', cta: 'Create Text Ad' },
  { id: 'banner', label: 'Banner Advertisement', short: 'Banner', description: 'Desktop, tablet & mobile creatives', color: 'violet', icon: 'banner', cta: 'Create Banner Ad' },
  { id: 'poster', label: 'Click Poster', short: 'Poster', description: 'Clickable poster with optional QR', color: 'blue', icon: 'poster', cta: 'Create Click Poster' },
  { id: 'sponsored', label: 'Sponsored Products', short: 'Sponsored', description: 'Promote products in search & feed', color: 'orange', icon: 'sponsored', cta: 'Sponsor Product' },
  { id: 'featured', label: 'Featured Products', short: 'Featured', description: 'Homepage & deals placements', color: 'pink', icon: 'featured', cta: 'Feature Product' },
  { id: 'offer', label: 'Offer / Deal Ad', short: 'Offer', description: 'Discount & deal promotions', color: 'teal', icon: 'offer', cta: 'Create Offer Ad' },
  { id: 'video', label: 'Video Advertisement', short: 'Video', description: 'MP4 creatives with CTA', color: 'rose', icon: 'video', cta: 'Create Video Ad' },
  { id: 'search', label: 'Search Sponsored', short: 'Search', description: 'Appear in search results', color: 'sky', icon: 'search', cta: 'Create Search Ad' },
  { id: 'store', label: 'Store Promotion', short: 'Store', description: 'Promote your entire store', color: 'indigo', icon: 'store', cta: 'Promote Store' },
  { id: 'category', label: 'Category Promotion', short: 'Category', description: 'Boost a product category', color: 'amber', icon: 'category', cta: 'Promote Category' },
  { id: 'launch', label: 'New Product Launch', short: 'Launch', description: 'Launch campaign for new SKUs', color: 'lime', icon: 'launch', cta: 'Create Launch Ad' },
  { id: 'festival', label: 'Festival & Seasonal', short: 'Festival', description: 'Seasonal & festival campaigns', color: 'fuchsia', icon: 'festival', cta: 'Create Festival Ad' },
];

export const PRIMARY_AD_TYPES = ['text', 'banner', 'poster', 'sponsored', 'featured', 'offer'];

export const OBJECTIVES = [
  { id: 'promote_product', label: 'Promote Product' },
  { id: 'promote_store', label: 'Promote Store' },
  { id: 'promote_brand', label: 'Promote Brand' },
  { id: 'homepage_banner', label: 'Homepage Banner' },
  { id: 'category_banner', label: 'Category Banner' },
  { id: 'featured_listing', label: 'Featured Listing' },
  { id: 'festival_campaign', label: 'Festival Campaign' },
  { id: 'flash_sale', label: 'Flash Sale' },
  { id: 'clearance_sale', label: 'Clearance Sale' },
  { id: 'new_arrival', label: 'New Arrival' },
  { id: 'sponsored_product', label: 'Sponsored Product' },
  { id: 'sponsored_brand', label: 'Sponsored Brand' },
  { id: 'sponsored_store', label: 'Sponsored Store' },
  { id: 'search_top', label: 'Search Top Placement' },
  { id: 'recommended_products', label: 'Recommended Products' },
  { id: 'nearby_stores', label: 'Nearby Stores' },
  { id: 'custom_campaign', label: 'Custom Campaign' },
];

export const CAMPAIGN_TYPES = [
  { id: 'image', label: 'Image' },
  { id: 'video', label: 'Video' },
  { id: 'carousel', label: 'Carousel' },
  { id: 'gif', label: 'GIF' },
  { id: 'store_card', label: 'Store Card' },
  { id: 'product_card', label: 'Product Card' },
  { id: 'brand_banner', label: 'Brand Banner' },
  { id: 'popup', label: 'Popup' },
  { id: 'splash_screen', label: 'Splash Screen' },
  { id: 'notification_banner', label: 'Notification Banner' },
];

export const PLACEMENTS = [
  { id: 'homepage_hero', label: 'Homepage Hero' },
  { id: 'homepage_slider', label: 'Homepage Slider' },
  { id: 'homepage_mid_banner', label: 'Homepage Mid Banner' },
  { id: 'category_banner', label: 'Category Banner' },
  { id: 'search_results', label: 'Search Results' },
  { id: 'featured_products', label: 'Featured Products' },
  { id: 'recommended_products', label: 'Recommended Products' },
  { id: 'nearby_stores', label: 'Nearby Stores' },
  { id: 'product_details', label: 'Product Details' },
  { id: 'store_listing', label: 'Store Listing' },
  { id: 'checkout_recommendation', label: 'Checkout Recommendation' },
  { id: 'festival_banner', label: 'Festival Banner' },
  { id: 'flash_sale', label: 'Flash Sale' },
  { id: 'notification', label: 'Notification' },
  { id: 'splash_screen', label: 'Splash Screen' },
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'whatsapp', label: 'WhatsApp' },
];

export const LANDING_PAGES = [
  { id: 'product_page', label: 'Product Page' },
  { id: 'store_page', label: 'Store Page' },
  { id: 'brand_page', label: 'Brand Page' },
  { id: 'category_page', label: 'Category Page' },
  { id: 'custom_url', label: 'Custom URL' },
  { id: 'external_website', label: 'External Website' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'phone_call', label: 'Phone Call' },
];

export const AUDIENCE_BUSINESS = [
  { id: 'b2b', label: 'B2B' },
  { id: 'b2c', label: 'B2C' },
  { id: 'wholesalers', label: 'Wholesalers' },
  { id: 'retailers', label: 'Retailers' },
  { id: 'professionals', label: 'Professionals' },
];

export const COVERAGE_LEVELS = [
  { id: 'village', label: 'Village' },
  { id: 'multiple_villages', label: 'Multiple Villages' },
  { id: 'panchayat', label: 'Panchayat' },
  { id: 'block', label: 'Block' },
  { id: 'district', label: 'District' },
  { id: 'multiple_districts', label: 'Multiple Districts' },
  { id: 'state', label: 'State' },
  { id: 'multiple_states', label: 'Multiple States' },
  { id: 'india', label: 'Entire India' },
];

export const BUDGET_PLANS_DAILY = [100, 250, 500, 1000, 2500, 5000, 10000];
export const BUDGET_PLANS_MONTHLY = [5000, 10000, 25000, 50000, 100000, 250000, 500000];

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI' },
  { id: 'credit_card', label: 'Credit Card' },
  { id: 'debit_card', label: 'Debit Card' },
  { id: 'net_banking', label: 'Net Banking' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'saathpay', label: 'SaathPay' },
  { id: 'razorpay', label: 'Razorpay' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'google_pay', label: 'Google Pay' },
  { id: 'paytm', label: 'Paytm' },
  { id: 'corporate_invoice', label: 'Corporate Invoice' },
];

export const SCHEDULE_DURATIONS = [
  { id: '1_day', label: '1 Day' },
  { id: '3_days', label: '3 Days' },
  { id: '7_days', label: '7 Days' },
  { id: '15_days', label: '15 Days' },
  { id: '30_days', label: '30 Days' },
  { id: '60_days', label: '60 Days' },
  { id: '90_days', label: '90 Days' },
  { id: 'custom', label: 'Custom' },
];

export const WIZARD_STEPS = [
  { id: 1, label: 'Objective' },
  { id: 2, label: 'Campaign Type' },
  { id: 3, label: 'Creative' },
  { id: 4, label: 'Details' },
  { id: 5, label: 'Products' },
  { id: 6, label: 'Landing Page' },
  { id: 7, label: 'Audience' },
  { id: 8, label: 'Placement' },
  { id: 9, label: 'Coverage' },
  { id: 10, label: 'Schedule' },
  { id: 11, label: 'Budget' },
  { id: 12, label: 'Preview' },
  { id: 13, label: 'Payment' },
  { id: 14, label: 'Submit' },
];

export const CATEGORIES = ['Grocery', 'Electronics', 'Fashion', 'Hardware', 'FMCG', 'Beauty', 'Home'];

export function formatINR(n) {
  return `₹${(Number(n) || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export function formatCompact(n) {
  const v = Number(n) || 0;
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return String(v);
}

export function getAdType(id) {
  return AD_TYPES.find((t) => t.id === id) || AD_TYPES[0];
}

export function getPlacementLabel(id) {
  return PLACEMENTS.find((p) => p.id === id)?.label || id || '—';
}

export function calcCtr(impressions, clicks) {
  const i = Number(impressions) || 0;
  const c = Number(clicks) || 0;
  if (!i) return 0;
  return Number(((c / i) * 100).toFixed(1));
}

export function calcRoas(revenue, spent) {
  const s = Number(spent) || 0;
  const r = Number(revenue) || 0;
  if (!s) return 0;
  return Number((r / s).toFixed(2));
}
