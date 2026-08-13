/**
 * SAATHAPP Advertising & Promotion Pricing Engine
 * Official Pricing Matrices & Duration Multiplier Rules based on PDF Specification.
 */

// 1. ADVERTISER CATEGORIES
export const ADVERTISER_CATEGORIES = [
  { id: 'mini_shop', label: 'Mini Shop / Micro Seller' },
  { id: 'small_shop', label: 'Small Shop / Vendor' },
  { id: 'medium_shop', label: 'Medium Shop' },
  { id: 'large_shop', label: 'Large Shop / Showroom' },
  { id: 'wholesale', label: 'Wholesale / Supplier / Dealer' },
  { id: 'msme', label: 'Manufacturer / MSME' },
  { id: 'mall', label: 'Mall / Large Commercial Business' },
  { id: 'school_coaching', label: 'School / College / Coaching' },
  { id: 'hospital_clinic', label: 'Hospital / Clinic' },
  { id: 'gym_fitness', label: 'Gym / Fitness Center' },
  { id: 'hotel_restaurant', label: 'Hotel / Restaurant' },
  { id: 'cinema_entertainment', label: 'Cinema Hall / Entertainment' },
  { id: 'park_recreation', label: 'Park / Recreation' },
  { id: 'local_brand', label: 'Local / Regional Brand' },
  { id: 'national_brand', label: 'National Brand / MNC' },
];

// 2. LOCATION TIERS
export const LOCATION_TIERS = ['Village', 'Tier 3', 'Tier 2', 'Tier 1', 'Metro'];

export function normalizeLocationTier(tier) {
  if (!tier) return 'Tier 2';
  const str = String(tier).toLowerCase();
  if (str.includes('village') || str.includes('rural')) return 'Village';
  if (str.includes('tier 3') || str.includes('tier3') || str.includes('town')) return 'Tier 3';
  if (str.includes('metro')) return 'Metro';
  if (str.includes('tier 1') || str.includes('tier1')) return 'Tier 1';
  if (str.includes('tier 2') || str.includes('tier2')) return 'Tier 2';
  return 'Tier 2';
}

const TIER_HIERARCHY = {
  Metro: 5,
  'Tier 1': 4,
  'Tier 2': 3,
  'Tier 3': 2,
  Village: 1,
};

const CITY_TIER_MAPPING = {
  // Metro
  delhi: 'Metro', mumbai: 'Metro', bengaluru: 'Metro', bangalore: 'Metro', hyderabad: 'Metro', chennai: 'Metro', kolkata: 'Metro', ahmedabad: 'Metro', pune: 'Metro',
  // Tier 1
  surat: 'Tier 1', jaipur: 'Tier 1', lucknow: 'Tier 1', kanpur: 'Tier 1', nagpur: 'Tier 1', indore: 'Tier 1', bhopal: 'Tier 1', vizag: 'Tier 1', visakhapatnam: 'Tier 1', vadodara: 'Tier 1', ludhiana: 'Tier 1', agra: 'Tier 1', nashik: 'Tier 1',
  // Tier 2
  patna: 'Tier 2', ranchi: 'Tier 2', bhubaneswar: 'Tier 2', guwahati: 'Tier 2', varanasi: 'Tier 2', dehradun: 'Tier 2', coimbatore: 'Tier 2', kochi: 'Tier 2', rajkot: 'Tier 2', madurai: 'Tier 2', vijayawada: 'Tier 2', meerut: 'Tier 2', amritsar: 'Tier 2', allahabad: 'Tier 2', prayagraj: 'Tier 2',
  // Tier 3
  nalanda: 'Tier 3', biharsharif: 'Tier 3', gaya: 'Tier 3', muzaffarpur: 'Tier 3', bhagalpur: 'Tier 3', purnea: 'Tier 3', darbhanga: 'Tier 3', arrah: 'Tier 3', begusarai: 'Tier 3', katihar: 'Tier 3', munger: 'Tier 3', chhapra: 'Tier 3', saharsa: 'Tier 3', bettiah: 'Tier 3', hajipur: 'Tier 3', sasaram: 'Tier 3', dehri: 'Tier 3', siwan: 'Tier 3', motihari: 'Tier 3', nawada: 'Tier 3', buxar: 'Tier 3', kishanganj: 'Tier 3', sitamarhi: 'Tier 3',
};

// 3. DURATION MULTIPLIERS
export const DURATION_MULTIPLIERS = [
  { days: 5, label: '5 Days', mult: 1 },
  { days: 7, label: '1 Week', mult: 1.25 },
  { days: 14, label: '2 Weeks', mult: 2 },
  { days: 15, label: '15 Days', mult: 2 },
  { days: 30, label: '1 Month', mult: 3.5 },
  { days: 90, label: '3 Months', mult: 9 },
  { days: 180, label: '6 Months', mult: 16 },
  { days: 365, label: '1 Year', mult: 30 },
];

export function getDurationMultiplier(days = 5) {
  const d = Number(days) || 5;
  if (d <= 5) return 1;
  if (d <= 7) return 1.25;
  if (d <= 15) return 2;
  if (d <= 30) return 3.5;
  if (d <= 90) return 9;
  if (d <= 180) return 16;
  return 30;
}

export function resolveLocationTierFromCities(cities = [], explicitTier = null) {
  if (Array.isArray(cities) && cities.length > 0) {
    let highestRank = 0;
    let highestTier = 'Tier 2';

    cities.forEach((c) => {
      const key = String(c).trim().toLowerCase();
      const mapped = CITY_TIER_MAPPING[key] || normalizeLocationTier(key);
      const rank = TIER_HIERARCHY[mapped] || 3;
      if (rank > highestRank) {
        highestRank = rank;
        highestTier = mapped;
      }
    });
    return highestTier;
  }

  if (explicitTier) {
    return normalizeLocationTier(explicitTier);
  }

  return 'Tier 2';
}

function getTablePrice(table, tier) {
  if (!table) return 1500;
  if (table[tier] !== undefined) return table[tier];
  if (table['Tier 2'] !== undefined) return table['Tier 2'];
  if (table.Metro !== undefined) return table.Metro;
  return Object.values(table)[0] || 1500;
}

// 4. DISTANCE-BASED BASE PRICING TABLES
export const DISTANCE_PRICING_TABLES = {
  mini_shop: {
    '3km': { Village: 300, 'Tier 3': 500, 'Tier 2': 750, 'Tier 1': 1000, Metro: 1500 },
    '5km': { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2000 },
    '10km': { Village: 750, 'Tier 3': 1000, 'Tier 2': 1500, 'Tier 1': 2000, Metro: 3000 },
    '50km': { Village: 2000, 'Tier 3': 3000, 'Tier 2': 4000, 'Tier 1': 5000, Metro: 7500 },
  },
  small_shop: {
    '3km': { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2500 },
    '5km': { Village: 750, 'Tier 3': 1000, 'Tier 2': 1500, 'Tier 1': 2000, Metro: 3500 },
    '10km': { Village: 1500, 'Tier 3': 2000, 'Tier 2': 2500, 'Tier 1': 3500, Metro: 5000 },
    '50km': { Village: 4000, 'Tier 3': 5000, 'Tier 2': 7500, 'Tier 1': 10000, Metro: 15000 },
  },
  medium_shop: {
    '3km': { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
    '5km': { Village: 1500, 'Tier 3': 2000, 'Tier 2': 3000, 'Tier 1': 4000, Metro: 7500 },
    '10km': { Village: 3000, 'Tier 3': 4000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 12000 },
    '50km': { Village: 7500, 'Tier 3': 10000, 'Tier 2': 15000, 'Tier 1': 20000, Metro: 30000 },
  },
  large_shop: {
    '3km': { Village: 2500, 'Tier 3': 3500, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
    '5km': { Village: 4000, 'Tier 3': 5000, 'Tier 2': 7500, 'Tier 1': 10000, Metro: 15000 },
    '10km': { Village: 7500, 'Tier 3': 10000, 'Tier 2': 15000, 'Tier 1': 20000, Metro: 30000 },
    '50km': { Village: 20000, 'Tier 3': 30000, 'Tier 2': 40000, 'Tier 1': 50000, Metro: 75000 },
  },
  wholesale: {
    '5km': { Village: 2000, 'Tier 3': 3000, 'Tier 2': 4000, 'Tier 1': 5000, Metro: 7500 },
    '10km': { Village: 4000, 'Tier 3': 5000, 'Tier 2': 7500, 'Tier 1': 10000, Metro: 15000 },
    '50km': { Village: 10000, 'Tier 3': 15000, 'Tier 2': 20000, 'Tier 1': 30000, Metro: 40000 },
  },
  msme: {
    '10km': { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 20000 },
    '50km': { Village: 15000, 'Tier 3': 25000, 'Tier 2': 35000, 'Tier 1': 50000, Metro: 75000 },
  },
  mall: {
    '10km': { Village: 15000, 'Tier 3': 20000, 'Tier 2': 30000, 'Tier 1': 40000, Metro: 50000 },
    '50km': { Village: 40000, 'Tier 3': 60000, 'Tier 2': 100000, 'Tier 1': 150000, Metro: 200000 },
  },
};

// 5. SPONSORED SEARCH PRICING TABLE
export const SPONSORED_SEARCH_PRICING = {
  mini_shop: { Village: 300, 'Tier 3': 500, 'Tier 2': 750, 'Tier 1': 1000, Metro: 1500 },
  small_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2500 },
  medium_shop: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
  large_shop: { Village: 2500, 'Tier 3': 3500, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  wholesale: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 4000, 'Tier 1': 5000, Metro: 7500 },
  msme: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 20000 },
  national_brand: { Village: 10000, 'Tier 3': 15000, 'Tier 2': 20000, 'Tier 1': 30000, Metro: 40000 },
};

// 6. BANNER ADVERTISING PRICING TABLE
export const BANNER_AD_PRICING = {
  mini_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2000 },
  small_shop: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
  medium_shop: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  large_shop: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 25000 },
  wholesale: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 20000 },
  msme: { Village: 10000, 'Tier 3': 15000, 'Tier 2': 20000, 'Tier 1': 30000, Metro: 50000 },
  national_brand: { Village: 20000, 'Tier 3': 30000, 'Tier 2': 40000, 'Tier 1': 60000, Metro: 100000 },
};

// 7. FEATURED BUSINESS / FEATURED SELLER TABLE
export const FEATURED_BUSINESS_PRICING = {
  mini_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2500 },
  small_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2500 },
  medium_shop: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
  large_shop: { Village: 2500, 'Tier 3': 3500, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  wholesale: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  national_brand: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 25000 },
};

// 8. POSTER ADVERTISING TABLE
export const POSTER_AD_PRICING = {
  Village: 500,
  'Tier 3': 750,
  'Tier 2': 1000,
  'Tier 1': 1500,
  Metro: 2500,
};

// 9. PAMPHLET / LEAFLET CAMPAIGN TABLE
export const PAMPHLET_AD_PRICING = {
  Village: 1500,
  'Tier 3': 2500,
  'Tier 2': 4000,
  'Tier 1': 7500,
  Metro: 10000,
};

// 10 & 11. COUPON PROMOTION & OFFER / DISCOUNT CAMPAIGN TABLE
export const COUPON_OFFER_PRICING = {
  mini_shop: { Village: 300, 'Tier 3': 500, 'Tier 2': 750, 'Tier 1': 1000, Metro: 1500 },
  small_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2500 },
  medium_shop: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
  large_shop: { Village: 2500, 'Tier 3': 3500, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  wholesale: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  msme: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 20000 },
  national_brand: { Village: 10000, 'Tier 3': 15000, 'Tier 2': 20000, 'Tier 1': 30000, Metro: 40000 },
};

// 12. SCHOOL / COLLEGE / COACHING PRICING TABLE
export const SCHOOL_COACHING_PRICING = {
  school_college: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  coaching: { Village: 1500, 'Tier 3': 2500, 'Tier 2': 4000, 'Tier 1': 6000, Metro: 10000 },
};

// 13. HOSPITAL / CLINIC / GYM PRICING TABLE
export const HOSPITAL_GYM_PRICING = {
  hospital_clinic: { Village: 3000, 'Tier 3': 5000, 'Tier 2': 7500, 'Tier 1': 10000, Metro: 20000 },
  gym_fitness: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2500, 'Tier 1': 4000, Metro: 7500 },
};

// 14. HOTEL / RESTAURANT / ENTERTAINMENT / PARK / MALL TABLE
export const HOTEL_RESTAURANT_MALL_PRICING = {
  hotel: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 12000 },
  restaurant: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2500, 'Tier 1': 4000, Metro: 7500 },
  park: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
  cinema: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 20000, Metro: 30000 },
  mall: { Village: 10000, 'Tier 3': 15000, 'Tier 2': 25000, 'Tier 1': 40000, Metro: 75000 },
};

// 15. LOCAL MANUFACTURER / MSME PRICING TABLE
export const LOCAL_MANUFACTURER_PRICING = {
  micro_manufacturer: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  small_manufacturer: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 25000 },
  medium_manufacturer: { Village: 10000, 'Tier 3': 15000, 'Tier 2': 25000, 'Tier 1': 40000, Metro: 60000 },
  regional_brand: { Village: 25000, 'Tier 3': 40000, 'Tier 2': 60000, 'Tier 1': 100000, Metro: 150000 },
  national_brand: { Village: 50000, 'Tier 3': 75000, 'Tier 2': 120000, 'Tier 1': 200000, Metro: 300000 },
};

export const SPONSORSHIP_AREAS = [
  'Category Sponsorship',
  'Product Sponsorship',
  'Festival Campaign',
  'Product Launch',
  'Sponsored Search',
  'Banner Inventory',
  'Featured Products',
  'Featured Brand',
  'Coupon Campaign',
  'Offer Campaign',
  'Seller Network Promotion',
  'B2B Network Promotion',
  'Local-to-National Campaign',
  'App-wide Promotional Campaign',
];

function normalizeCategoryKey(cat) {
  if (!cat) return 'medium_shop';
  const c = String(cat).toLowerCase().trim();
  if (c === 'showroom' || c.includes('showroom')) return 'large_shop';
  if (c === 'school_college' || c.includes('school') || c.includes('coaching')) return 'school_coaching';
  if (c.includes('hospital') || c.includes('clinic')) return 'hospital_clinic';
  if (c.includes('gym') || c.includes('fitness')) return 'gym_fitness';
  if (c.includes('hotel')) return 'hotel';
  if (c.includes('restaurant')) return 'restaurant';
  if (c.includes('cinema') || c.includes('entertainment')) return 'cinema';
  if (c.includes('park') || c.includes('recreation')) return 'park';
  if (c.includes('micro') && c.includes('manufactur')) return 'micro_manufacturer';
  if (c.includes('small') && c.includes('manufactur')) return 'small_manufacturer';
  if (c.includes('medium') && c.includes('manufactur')) return 'medium_manufacturer';
  if (c.includes('regional') && c.includes('brand')) return 'regional_brand';
  if (c.includes('national') && c.includes('brand')) return 'national_brand';
  return c;
}

function normalizeRadiusKey(rad) {
  if (!rad) return '10km';
  const str = String(rad).toLowerCase().replace(/\s*/g, '');
  if (str === '3' || str === '3km') return '3km';
  if (str === '5' || str === '5km') return '5km';
  if (str === '10' || str === '10km') return '10km';
  if (str === '50' || str === '50km') return '50km';
  return '10km';
}

function resolveCategoryRateCard(catKey, normTier, radKey, primaryTable = null) {
  // 1. Direct match in primary ad-type table
  if (primaryTable && primaryTable[catKey]) {
    return getTablePrice(primaryTable[catKey], normTier);
  }

  // 2. Distance-based rate card (Section 3) if defined for category (e.g. Mall)
  if (DISTANCE_PRICING_TABLES[catKey]) {
    const catTable = DISTANCE_PRICING_TABLES[catKey];
    const radTable = catTable[radKey] || catTable['10km'] || Object.values(catTable)[0];
    return getTablePrice(radTable, normTier);
  }

  // 3. Dedicated section rate cards (Sections 12, 13, 14, 15)
  if (SCHOOL_COACHING_PRICING[catKey]) {
    return getTablePrice(SCHOOL_COACHING_PRICING[catKey], normTier);
  }
  if (catKey === 'school_coaching' && SCHOOL_COACHING_PRICING.school_college) {
    return getTablePrice(SCHOOL_COACHING_PRICING.school_college, normTier);
  }

  if (HOSPITAL_GYM_PRICING[catKey]) {
    return getTablePrice(HOSPITAL_GYM_PRICING[catKey], normTier);
  }

  if (HOTEL_RESTAURANT_MALL_PRICING[catKey]) {
    return getTablePrice(HOTEL_RESTAURANT_MALL_PRICING[catKey], normTier);
  }

  if (LOCAL_MANUFACTURER_PRICING[catKey]) {
    return getTablePrice(LOCAL_MANUFACTURER_PRICING[catKey], normTier);
  }

  // 4. Default fallback to medium_shop in primary table or 1500
  if (primaryTable && primaryTable.medium_shop) {
    return getTablePrice(primaryTable.medium_shop, normTier);
  }

  return 1500;
}

/**
 * Main Calculation Sequence Engine (Step 7)
 */
export function calculateAdvertisingPrice(params = {}) {
  const {
    adType = 'banner',
    category = 'medium_shop',
    locationTier = null,
    targetCities = [],
    locations = [],
    radius = '10km',
    durationDays = 30,
    customAdminQuote = null,
  } = params;

  const combinedCities = Array.isArray(targetCities) && targetCities.length > 0
    ? targetCities
    : (Array.isArray(locations) ? locations : []);

  const normTier = resolveLocationTierFromCities(combinedCities, locationTier);
  const mult = getDurationMultiplier(durationDays);
  const catKey = normalizeCategoryKey(category);
  const radKey = normalizeRadiusKey(radius);
  const typeStr = String(adType).toLowerCase();



  // 1. Sponsored Search Pricing
  if (
    typeStr === 'search' ||
    typeStr === 'sponsored' ||
    typeStr.includes('search') ||
    typeStr.includes('sponsored') ||
    typeStr === 'text'
  ) {
    const base = resolveCategoryRateCard(catKey, normTier, radKey, SPONSORED_SEARCH_PRICING);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 2. Banner Advertising Pricing
  if (
    typeStr === 'banner' ||
    typeStr.includes('banner') ||
    typeStr.includes('hero') ||
    typeStr.includes('slider') ||
    typeStr === 'image' ||
    typeStr === 'video' ||
    typeStr === 'carousel' ||
    typeStr === 'gif'
  ) {
    const base = resolveCategoryRateCard(catKey, normTier, radKey, BANNER_AD_PRICING);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 3. Featured Business / Featured Seller / Store Promotion Pricing
  if (
    typeStr === 'featured' ||
    typeStr === 'store' ||
    typeStr === 'category' ||
    typeStr.includes('featured') ||
    typeStr.includes('store') ||
    typeStr.includes('recommend') ||
    typeStr.includes('nearby') ||
    typeStr.includes('promote_')
  ) {
    const base = resolveCategoryRateCard(catKey, normTier, radKey, FEATURED_BUSINESS_PRICING);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 4. Poster Advertising
  if (typeStr.includes('poster')) {
    const base = getTablePrice(POSTER_AD_PRICING, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 5. Pamphlet / Leaflet Campaign
  if (typeStr.includes('pamphlet') || typeStr.includes('leaflet')) {
    const base = getTablePrice(PAMPHLET_AD_PRICING, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 6. Coupon & Offer / Discount Campaign (Section 10 & 11)
  if (
    typeStr === 'coupon' ||
    typeStr === 'offer' ||
    typeStr.includes('coupon') ||
    typeStr.includes('offer') ||
    typeStr.includes('deal') ||
    typeStr.includes('discount') ||
    typeStr.includes('sale') ||
    typeStr.includes('launch') ||
    typeStr.includes('festival') ||
    typeStr.includes('arrival') ||
    typeStr.includes('bogo') ||
    typeStr.includes('flash') ||
    typeStr.includes('clearance') ||
    typeStr.includes('seasonal') ||
    typeStr.includes('special')
  ) {
    const base = resolveCategoryRateCard(catKey, normTier, radKey, COUPON_OFFER_PRICING);
    const promoFee = Math.round(base * mult);
    const customerDiscountAmount = Number(params.customerDiscountAmount || params.couponDiscountValue || 0);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      promotionFee: promoFee,
      customerDiscountAmount, // Funded by seller/business; kept separate from SAATHAPP promo fee
      finalPrice: promoFee, // SAATHAPP fee only
      isContract: false,
    };
  }

  // 7. Special Institutions (School/College/Coaching)
  if (catKey === 'school_coaching' || SCHOOL_COACHING_PRICING[catKey]) {
    const table = SCHOOL_COACHING_PRICING[catKey] || SCHOOL_COACHING_PRICING.school_college;
    const base = getTablePrice(table, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 8. Hospital / Gym
  if (catKey === 'hospital_clinic') {
    const base = getTablePrice(HOSPITAL_GYM_PRICING.hospital_clinic, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  if (catKey === 'gym_fitness') {
    const base = getTablePrice(HOSPITAL_GYM_PRICING.gym_fitness, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 9. Hotel / Restaurant / Cinema / Park / Mall
  if (HOTEL_RESTAURANT_MALL_PRICING[catKey]) {
    const table = HOTEL_RESTAURANT_MALL_PRICING[catKey];
    const base = getTablePrice(table, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 10. Local Manufacturer / MSME
  if (LOCAL_MANUFACTURER_PRICING[catKey]) {
    const table = LOCAL_MANUFACTURER_PRICING[catKey];
    const base = getTablePrice(table, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // Default Distance Table Fallback
  if (DISTANCE_PRICING_TABLES[catKey]) {
    const catTable = DISTANCE_PRICING_TABLES[catKey];
    const radTable = catTable[radKey] || catTable['10km'] || Object.values(catTable)[0];
    const base = getTablePrice(radTable, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  const defaultBase = 1500;
  return {
    normTier,
    basePrice: defaultBase,
    durationMultiplier: mult,
    finalPrice: Math.round(defaultBase * mult),
    isContract: false,
  };
}

