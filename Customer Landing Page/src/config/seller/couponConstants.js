export const PROMO_STATUSES = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  EXPIRED: 'expired',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

export const STATUS_STYLES = {
  draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  scheduled: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  paused: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  expired: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  completed: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  archived: 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300',
};

export const COUPON_TYPES = [
  { id: 'percentage', label: 'Percentage Discount', group: 'coupon' },
  { id: 'flat', label: 'Flat Discount', group: 'coupon' },
  { id: 'cashback', label: 'Cashback Coupon', group: 'coupon' },
  { id: 'bogo', label: 'BOGO', group: 'coupon' },
  { id: 'free_shipping', label: 'Free Shipping', group: 'coupon' },
  { id: 'referral', label: 'Referral Coupon', group: 'coupon' },
  { id: 'first_order', label: 'First Order Coupon', group: 'coupon' },
  { id: 'membership', label: 'Membership Coupon', group: 'coupon' },
  { id: 'festival', label: 'Festival Coupon', group: 'coupon' },
  { id: 'limited', label: 'Limited Time Offer', group: 'coupon' },
];

export const AD_TYPES = [
  { id: 'ad_text', label: 'Text Advertisement', group: 'ad' },
  { id: 'ad_image', label: 'Image Advertisement', group: 'ad' },
  { id: 'ad_carousel', label: 'Carousel Advertisement', group: 'ad' },
  { id: 'ad_video', label: 'Video Advertisement', group: 'ad' },
  { id: 'ad_sponsored', label: 'Sponsored Advertisement', group: 'ad' },
  { id: 'ad_homepage', label: 'Homepage Advertisement', group: 'ad' },
  { id: 'ad_category', label: 'Category Advertisement', group: 'ad' },
  { id: 'ad_search', label: 'Search Advertisement', group: 'ad' },
  { id: 'ad_popup', label: 'Popup Advertisement', group: 'ad' },
  { id: 'ad_strip', label: 'Offer Strip', group: 'ad' },
  { id: 'ad_floating', label: 'Floating Banner Ad', group: 'ad' },
];

export const BANNER_TYPES = [
  { id: 'banner_home', label: 'Homepage Banner', group: 'banner' },
  { id: 'banner_category', label: 'Category Banner', group: 'banner' },
  { id: 'banner_festival', label: 'Festival Banner', group: 'banner' },
  { id: 'banner_flash', label: 'Flash Sale Banner', group: 'banner' },
  { id: 'banner_mega', label: 'Mega Sale Banner', group: 'banner' },
  { id: 'banner_offer', label: 'Offer Banner', group: 'banner' },
  { id: 'banner_brand', label: 'Brand Banner', group: 'banner' },
  { id: 'banner_seasonal', label: 'Seasonal Banner', group: 'banner' },
  { id: 'banner_arrival', label: 'New Arrival Banner', group: 'banner' },
  { id: 'banner_clearance', label: 'Clearance Banner', group: 'banner' },
];

export const POSTER_TYPES = [
  { id: 'poster_static', label: 'Static Poster', group: 'poster' },
  { id: 'poster_animated', label: 'Animated Poster', group: 'poster' },
  { id: 'poster_festival', label: 'Festival Poster', group: 'poster' },
  { id: 'poster_offer', label: 'Offer Poster', group: 'poster' },
  { id: 'poster_launch', label: 'Launch Poster', group: 'poster' },
  { id: 'poster_clickable', label: 'Clickable Poster', group: 'poster' },
  { id: 'poster_qr', label: 'QR Poster', group: 'poster' },
  { id: 'poster_product', label: 'Product Poster', group: 'poster' },
  { id: 'poster_opening', label: 'Grand Opening', group: 'poster' },
  { id: 'poster_referral', label: 'Referral Poster', group: 'poster' },
];

export const SPONSORED_TYPES = [
  { id: 'sponsor_product', label: 'Sponsor Product', group: 'sponsored' },
  { id: 'sponsor_category', label: 'Sponsor Category', group: 'sponsored' },
  { id: 'sponsor_featured', label: 'Featured Product', group: 'sponsored' },
  { id: 'sponsor_trending', label: 'Trending Product', group: 'sponsored' },
  { id: 'sponsor_recommended', label: 'Recommended Product', group: 'sponsored' },
  { id: 'sponsor_premium', label: 'Premium Listing', group: 'sponsored' },
];

export const CAMPAIGN_TYPES = [
  { id: 'campaign_festival', label: 'Festival Campaign', group: 'campaign' },
  { id: 'campaign_flash', label: 'Flash Sale', group: 'campaign' },
  { id: 'campaign_weekend', label: 'Weekend Sale', group: 'campaign' },
  { id: 'campaign_clearance', label: 'Clearance', group: 'campaign' },
  { id: 'campaign_brand', label: 'Brand Campaign', group: 'campaign' },
  { id: 'campaign_category', label: 'Category Campaign', group: 'campaign' },
  { id: 'campaign_referral', label: 'Referral Campaign', group: 'campaign' },
  { id: 'campaign_loyalty', label: 'Loyalty Campaign', group: 'campaign' },
];

export const OFFER_CAMPAIGN_TYPES = [
  { id: 'flash_sale', label: 'Flash Sale', group: 'offer' },
  { id: 'festival_offer', label: 'Festival Offer', group: 'offer' },
  { id: 'bogo', label: 'Buy 1 Get 1 (BOGO)', group: 'offer' },
  { id: 'percentage_discount', label: 'Percentage Discount', group: 'offer' },
  { id: 'flat_discount', label: 'Flat Discount', group: 'offer' },
  { id: 'clearance_sale', label: 'Clearance Sale', group: 'offer' },
  { id: 'seasonal_sale', label: 'Seasonal Sale', group: 'offer' },
  { id: 'new_product_launch', label: 'New Product Launch', group: 'offer' },
  { id: 'special_local_offer', label: 'Special Local Offer', group: 'offer' },
];

export const ALL_PROMO_TYPES = [
  ...COUPON_TYPES,
  ...AD_TYPES,
  ...BANNER_TYPES,
  ...POSTER_TYPES,
  ...SPONSORED_TYPES,
  ...CAMPAIGN_TYPES,
  ...OFFER_CAMPAIGN_TYPES,
];

export const CREATE_MENU = [
  {
    id: 'coupon',
    label: 'Discount Coupon',
    items: COUPON_TYPES,
  },
  {
    id: 'ad',
    label: 'Advertisement',
    items: AD_TYPES,
  },
  {
    id: 'banner',
    label: 'Promotional Banner',
    items: BANNER_TYPES,
  },
  {
    id: 'poster',
    label: 'Promotional Poster',
    items: POSTER_TYPES,
  },
  {
    id: 'sponsored',
    label: 'Sponsored Products',
    items: SPONSORED_TYPES,
  },
  {
    id: 'campaign',
    label: 'Campaign',
    items: CAMPAIGN_TYPES,
  },
];

export const APPLICABILITY = [
  { id: 'store', label: 'Entire Store' },
  { id: 'categories', label: 'Selected Categories' },
  { id: 'products', label: 'Selected Products' },
  { id: 'brands', label: 'Selected Brands' },
  { id: 'membership', label: 'Membership Only' },
  { id: 'new', label: 'New Customers' },
  { id: 'vip', label: 'VIP Customers' },
];

export const CATEGORIES = ['Grocery', 'Electronics', 'Fashion', 'Hardware', 'FMCG'];

export const COUPON_WIZARD_STEPS = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Discount' },
  { id: 3, label: 'Products' },
  { id: 4, label: 'Validity' },
  { id: 5, label: 'Conditions' },
  { id: 6, label: 'Preview' },
];

export function formatINR(n) {
  return `₹${(Number(n) || 0).toLocaleString('en-IN')}`;
}

export function getPromoType(id) {
  return ALL_PROMO_TYPES.find((t) => t.id === id) || ALL_PROMO_TYPES[0];
}

export function discountLabel(item) {
  if (!item) return '—';
  if (item.typeId === 'percentage' || item.discountType === 'percentage') {
    return `${item.discountValue || 0}% off`;
  }
  if (item.typeId === 'flat' || item.discountType === 'flat') {
    return `${formatINR(item.discountValue)} off`;
  }
  if (item.typeId === 'bogo') return 'BOGO';
  if (item.typeId === 'free_shipping') return 'Free Shipping';
  if (item.typeId === 'cashback') return `${formatINR(item.discountValue)} cashback`;
  return getPromoType(item.typeId)?.label || item.typeId;
}
