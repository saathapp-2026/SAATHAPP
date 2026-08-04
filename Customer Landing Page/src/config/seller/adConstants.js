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
  { id: 'sales', label: 'Increase Sales' },
  { id: 'views', label: 'Product Views' },
  { id: 'awareness', label: 'Brand Awareness' },
  { id: 'store', label: 'Store Promotion' },
  { id: 'launch', label: 'New Product Launch' },
];

export const PLACEMENTS = [
  { id: 'homepage_banner', label: 'Homepage Banner' },
  { id: 'homepage_slider', label: 'Homepage Slider' },
  { id: 'homepage_popup', label: 'Homepage Popup' },
  { id: 'category', label: 'Category Page' },
  { id: 'search', label: 'Search Results' },
  { id: 'pdp', label: 'Product Details Page' },
  { id: 'recommended', label: 'Recommended Products' },
  { id: 'offer_zone', label: 'Offer Zone' },
  { id: 'festival', label: 'Festival Banner' },
  { id: 'checkout', label: 'Checkout Page' },
  { id: 'wallet', label: 'Wallet Page' },
  { id: 'membership', label: 'Membership Page' },
  { id: 'order_success', label: 'Order Success Page' },
];

export const WIZARD_STEPS = [
  { id: 1, label: 'Campaign' },
  { id: 2, label: 'Products' },
  { id: 3, label: 'Content' },
  { id: 4, label: 'Audience' },
  { id: 5, label: 'Placement' },
  { id: 6, label: 'Budget' },
  { id: 7, label: 'Duration' },
  { id: 8, label: 'Preview' },
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
