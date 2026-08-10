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
};

// 6. BANNER ADVERTISING PRICING TABLE
export const BANNER_AD_PRICING = {
  mini_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2000 },
  small_shop: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
  medium_shop: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  large_shop: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 25000 },
  wholesale: { Village: 5000, 'Tier 3': 7500, 'Tier 2': 10000, 'Tier 1': 15000, Metro: 20000 },
  msme: { Village: 10000, 'Tier 3': 15000, 'Tier 2': 20000, 'Tier 1': 30000, Metro: 50000 },
};

// 7. FEATURED BUSINESS / FEATURED SELLER TABLE
export const FEATURED_BUSINESS_PRICING = {
  mini_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2500 },
  small_shop: { Village: 500, 'Tier 3': 750, 'Tier 2': 1000, 'Tier 1': 1500, Metro: 2500 },
  medium_shop: { Village: 1000, 'Tier 3': 1500, 'Tier 2': 2000, 'Tier 1': 3000, Metro: 5000 },
  large_shop: { Village: 2500, 'Tier 3': 3500, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
  wholesale: { Village: 2000, 'Tier 3': 3000, 'Tier 2': 5000, 'Tier 1': 7500, Metro: 10000 },
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
};

// 16. NATIONAL BRAND / MNC SPONSORSHIP TARGET RANGES
export const NATIONAL_BRAND_CONTRACTS = [
  { id: 'local_brand_partner', title: 'Local Brand Partnership', range: '₹5L – ₹25L' },
  { id: 'regional_brand_partner', title: 'Regional Brand Partnership', range: '₹25L – ₹75L' },
  { id: 'national_brand_campaign', title: 'National Brand Campaign', range: '₹50L – ₹2Cr' },
  { id: 'major_brand_partner', title: 'Major Brand Partnership', range: '₹1Cr – ₹3Cr' },
  { id: 'strategic_mnc_partner', title: 'Strategic MNC Partnership', range: '₹2Cr – ₹5Cr' },
];

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
  } = params;

  const combinedCities = Array.isArray(targetCities) && targetCities.length > 0
    ? targetCities
    : (Array.isArray(locations) ? locations : []);

  const normTier = resolveLocationTierFromCities(combinedCities, locationTier);
  const mult = getDurationMultiplier(durationDays);

  const typeStr = String(adType).toLowerCase();

  // 11. National Brand / MNC
  if (category === 'national_brand') {
    return {
      normTier,
      basePrice: 0,
      durationMultiplier: 1,
      finalPrice: 0,
      isContract: true,
      contractRanges: NATIONAL_BRAND_CONTRACTS,
    };
  }

  // 1. Sponsored Search Pricing
  if (
    typeStr === 'search' ||
    typeStr === 'sponsored' ||
    typeStr.includes('search') ||
    typeStr.includes('sponsored') ||
    typeStr === 'text'
  ) {
    const table = SPONSORED_SEARCH_PRICING[category] || SPONSORED_SEARCH_PRICING.medium_shop;
    const base = getTablePrice(table, normTier);
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
    if (BANNER_AD_PRICING[category]) {
      const table = BANNER_AD_PRICING[category];
      const base = getTablePrice(table, normTier);
      return {
        normTier,
        basePrice: base,
        durationMultiplier: mult,
        finalPrice: Math.round(base * mult),
        isContract: false,
      };
    }
    if (DISTANCE_PRICING_TABLES[category]) {
      const catTable = DISTANCE_PRICING_TABLES[category];
      const radTable = catTable[radius] || catTable['10km'] || Object.values(catTable)[0];
      const base = getTablePrice(radTable, normTier);
      return {
        normTier,
        basePrice: base,
        durationMultiplier: mult,
        finalPrice: Math.round(base * mult),
        isContract: false,
      };
    }
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
    const table = FEATURED_BUSINESS_PRICING[category] || FEATURED_BUSINESS_PRICING.medium_shop;
    const base = getTablePrice(table, normTier);
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

  // 6. Coupon & Offer / Discount Campaign
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
    typeStr.includes('arrival')
  ) {
    const table = COUPON_OFFER_PRICING[category] || COUPON_OFFER_PRICING.medium_shop;
    const base = getTablePrice(table, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  // 7. Special Institutions (School/College/Coaching)
  if (category === 'school_coaching') {
    const table = SCHOOL_COACHING_PRICING.school_college;
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
  if (category === 'hospital_clinic') {
    const base = getTablePrice(HOSPITAL_GYM_PRICING.hospital_clinic, normTier);
    return {
      normTier,
      basePrice: base,
      durationMultiplier: mult,
      finalPrice: Math.round(base * mult),
      isContract: false,
    };
  }

  if (category === 'gym_fitness') {
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
  if (HOTEL_RESTAURANT_MALL_PRICING[category]) {
    const table = HOTEL_RESTAURANT_MALL_PRICING[category];
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
  if (LOCAL_MANUFACTURER_PRICING[category]) {
    const table = LOCAL_MANUFACTURER_PRICING[category];
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
  if (DISTANCE_PRICING_TABLES[category]) {
    const catTable = DISTANCE_PRICING_TABLES[category];
    const radTable = catTable[radius] || catTable['10km'] || Object.values(catTable)[0];
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
