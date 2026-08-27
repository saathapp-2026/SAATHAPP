/**
 * Master Category Data & Architecture Config for SaathApp
 * Single source of truth for all 16 marketplace categories + Gift Set marketplace vertical.
 * Fully aligned with SaathApp Category System Restructuring Spec PDF (Pages 1–27).
 */

import {
  Leaf, Smartphone, Cross, Shirt, Package, Hammer, Wrench, BookOpen,
  Footprints, Gift, Sparkles, Sprout, HardHat, Car, Flame, ShoppingBag, Box
} from 'lucide-react';

/**
 * Category Schema / Data Model (PDF Page 21)
 * @typedef {Object} CategorySchema
 * @property {string} id - Unique identifier (e.g. 'household-items')
 * @property {string} name - Display Name (e.g. 'Household Items')
 * @property {string} slug - URL slug (e.g. 'household-items')
 * @property {string} url - SEO-friendly route URL
 * @property {string} iconName - Lucide icon component name
 * @property {string} visualDesc - Visual icon description per PDF spec
 * @property {string} [description] - Extended category description
 * @property {string} [parentCategory] - Optional parent category for hierarchy
 * @property {number} [sortOrder] - 1-indexed display order (1 to 16)
 * @property {boolean} [isActive] - Active status flag
 * @property {boolean} [isFeatured] - Featured status flag
 * @property {boolean} [isOfficialOnly] - Restricted to SAATHAPP_OWNED sellers if true
 * @property {string[]} subcategories - Array of subcategory names
 * @property {string} [createdAt] - ISO creation date string
 */

// Category Alias Map for Zero Data Loss Migration (e.g., old "Home & Kitchen" → "Household Items")
export const CATEGORY_ALIASES = {
  'home-kitchen': 'household-items',
  'home': 'household-items',
  'household': 'household-items',
  'gifts': 'gift-set',
  'gift-set': 'gift-set',
  'books': 'books-stationery',
  'stationery': 'books-stationery',
  'shoes': 'footwear',
  'shoes-slippers-sandals': 'footwear',
  'shoes-footwear': 'footwear',
  'medicine': 'medicine-healthcare',
  'healthcare': 'medicine-healthcare',
  'spiritual': 'spiritual-puja',
  'puja': 'spiritual-puja'
};

// Exact 16 Master Categories in 4x4 Grid Order per PDF Spec (Pages 12, 13, 23, 24)
export const MASTER_CATEGORIES = [
  // ROW 1
  {
    id: 'grocery',
    name: 'Grocery',
    slug: 'grocery',
    url: '/products/grocery',
    iconName: 'Leaf',
    image: '/images/categories/grocery.png',
    visualDesc: 'Leaf / grocery basket',
    sortOrder: 1,
    isActive: true,
    isFeatured: true,
    subcategories: [
      'Oils & Ghee', 'Rice & Grains', 'Spices & Masalas', 'Flour & Atta',
      'Pulses & Dals', 'Dry Fruits & Nuts', 'Beverages', 'Snacks & Packaged Food',
      'Fruits & Vegetables', 'Dairy & Bakery', 'Sweets', 'Regional / Local Foods',
      'Premium Grocery'
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    url: '/products/electronics',
    iconName: 'Smartphone',
    image: '/images/categories/electronics.png',
    visualDesc: 'Smartphone / device',
    sortOrder: 2,
    isActive: true,
    isFeatured: true,
    subcategories: [
      '💡 Lights & Bulbs', '🔘 Switches & Sockets', '🌀 Fans',
      '❄️ Air Conditioners', '🌬️ Air Coolers', '🔥 Heaters',
      '🚿 Geysers', '⚡ Wires & Cables', '🔌 Extension Boards & Plugs',
      '🔋 Inverters & Batteries', '📺 Televisions', '📡 DTH & Set-Top Boxes',
      '📹 CCTV & Security', '🔔 Doorbells', '🏠 Smart Home Electronics',
      '🍳 Kitchen Appliances', '🧹 Cleaning Appliances', '☕ Small Home Appliances',
      '🧊 Refrigerators & Freezers', '🧺 Washing Machines'
    ]
  },
  {
    id: 'mobiles',
    name: 'Mobiles',
    slug: 'mobiles',
    url: '/products/mobiles',
    iconName: 'Smartphone',
    image: '/images/categories/mobiles.png',
    visualDesc: 'Smartphone',
    sortOrder: 3,
    isActive: true,
    isFeatured: true,
    subcategories: [
      '5G Smartphones', 'Budget Smartphones', 'Refurbished Phones',
      'Mobile Covers & Cases', 'Chargers & Cables', 'Power Banks'
    ]
  },
  {
    id: 'medicine-healthcare',
    name: 'Medicine & Healthcare',
    slug: 'medicine-healthcare',
    url: '/products/medicine-healthcare',
    iconName: 'Cross',
    image: '/images/categories/medicine.png',
    visualDesc: 'Medical cross',
    sortOrder: 4,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'OTC Medicines', 'Vitamins & Supplements', 'First Aid & Surgical',
      'Personal Hygiene', 'Health Monitors', 'Ayurveda & Wellness'
    ]
  },

  // ROW 2
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    url: '/products/fashion',
    iconName: 'Shirt',
    image: '/images/categories/fashion.png',
    visualDesc: 'T-shirt',
    sortOrder: 5,
    isActive: true,
    isFeatured: true,
    subcategories: [
      "Men's Wear", "Women's Wear", "Kids' Wear", 'Innerwear & Sleepwear',
      'Watches & Accessories', 'Bags & Luggage'
    ]
  },
  {
    id: 'household-items',
    name: 'Household Items',
    slug: 'household-items',
    url: '/products/household-items',
    iconName: 'Package',
    image: '/images/categories/household.png',
    visualDesc: 'Cleaning basket',
    sortOrder: 6,
    isActive: true,
    isFeatured: true,
    description: 'Everyday household essentials, cleaning supplies, and kitchen utilities.',
    subcategories: [
      'Cleaning Supplies', 'Laundry', 'Kitchen Utilities', 'Storage & Organization',
      'Bathroom Essentials', 'Home Care', 'Disposables', 'Household Tools',
      'Cleaning Equipment', 'Daily-use Essentials'
    ]
  },
  {
    id: 'hardware',
    name: 'Hardware',
    slug: 'hardware',
    url: '/products/hardware',
    iconName: 'Tools',
    image: '/images/categories/hardware.png',
    visualDesc: 'Tools',
    sortOrder: 7,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'Power Tools', 'Hand Tools', 'Fasteners & Screws', 'Plumbing Supplies',
      'Electrical Fittings', 'Paints & Adhesives', 'Safety Gear'
    ]
  },
  {
    id: 'services',
    name: 'Services',
    slug: 'services',
    url: '/products/services/service',
    iconName: 'Wrench',
    image: '/images/categories/services.png',
    visualDesc: 'Service / tools icon',
    sortOrder: 8,
    isActive: true,
    isFeatured: true,
    subcategories: [
      'Electrical Repairs', 'Plumbing Services', 'Appliance Repair',
      'Home Cleaning', 'Painting & Renovation', 'Pest Control'
    ]
  },

  // ROW 3
  {
    id: 'books-stationery',
    name: 'Book & Stationery',
    slug: 'books-stationery',
    url: '/products/books-stationery',
    iconName: 'BookOpen',
    image: '/images/categories/books-stationery.png',
    visualDesc: 'Books + pen',
    sortOrder: 9,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'School Supplies', 'Office Supplies', 'Notebooks', 'Registers',
      'Pens & Pencils', 'Art & Craft', 'Exam Supplies', 'Files & Folders',
      'Books', 'Educational Materials'
    ]
  },
  {
    id: 'footwear',
    name: 'Shoes, Slippers & Sandals',
    slug: 'footwear',
    url: '/products/footwear',
    iconName: 'Footprints',
    image: '/images/categories/footwear.png',
    visualDesc: 'Shoe',
    sortOrder: 10,
    isActive: true,
    isFeatured: false,
    subcategories: [
      "Men's Footwear", "Women's Footwear", "Kids' Footwear", 'Sports Shoes',
      'Casual Shoes', 'Formal Shoes', 'Slippers', 'Sandals', 'School Shoes'
    ]
  },
  {
    id: 'gift-set',
    name: 'Gift Set',
    slug: 'gift-set',
    url: '/products/gift-set',
    iconName: 'Gift',
    image: '/images/categories/gifts.png',
    visualDesc: 'Gift box',
    sortOrder: 11,
    isActive: true,
    isFeatured: true,
    subcategories: [
      'Chocolate Gift Sets', 'Stationery Gift Sets', 'Flower Gift Sets',
      'Sweets & Mithai Boxes', 'Clothes Gift Sets', 'Glass & Cup Sets',
      'Crockery Gift Sets', 'Ceramic Gift Sets', 'Dry Fruit Gift Sets',
      'Beauty & Wellness Gift Sets', 'Perfume Gift Sets', 'Kids Gift Sets',
      'Birthday Gift Sets', 'Wedding Gift Sets', 'Anniversary Gift Sets',
      'Festival Gift Sets', 'Corporate Gift Sets', 'Personalized Gift Sets',
      'Custom Gift Hampers'
    ]
  },
  {
    id: 'saathapp',
    name: 'SaathApp Product',
    slug: 'saathapp',
    url: '/products/saathapp',
    iconName: 'Sparkles',
    image: '/images/categories/saathapp.png',
    visualDesc: 'SaathApp brand mark',
    sortOrder: 12,
    isActive: true,
    isFeatured: true,
    isOfficialOnly: true, // Only SAATHAPP_OWNED sellers can list under this category
    subcategories: [
      'Official Apparel', 'SaathApp Accessories', 'SaathApp Essentials',
      'Exclusive Merch', 'SaathApp Special Editions'
    ]
  },

  // ROW 4
  {
    id: 'agriculture',
    name: 'Agriculture',
    slug: 'agriculture',
    url: '/products/agriculture',
    iconName: 'Sprout',
    image: '/images/categories/agriculture.png',
    visualDesc: 'Green leaves',
    sortOrder: 13,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'Seeds & Plant Spores', 'Fertilizers & Bio-Inputs', 'Pesticides & Insecticides',
      'Farming Tools & Equipment', 'Irrigation Systems', 'Animal Feed'
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    slug: 'construction',
    url: '/products/construction',
    iconName: 'HardHat',
    image: '/images/categories/construction.png',
    visualDesc: 'Helmet',
    sortOrder: 14,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'Cement & Concrete', 'Steel & Rebars', 'Bricks & Blocks',
      'Building Chemicals', 'Roofing & Cladding', 'Scaffolding & Safety'
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    slug: 'vehicles',
    url: '/products/vehicles',
    iconName: 'Car',
    image: '/images/categories/vehicles.png',
    visualDesc: 'Car',
    sortOrder: 15,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'E-Rickshaws & Auto Parts', 'Two Wheeler Spare Parts', 'Car Accessories',
      'Helmets & Riding Gear', 'Batteries & Lubricants', 'Tyres & Tubes'
    ]
  },
  {
    id: 'spiritual-puja',
    name: 'Spiritual / Puja',
    slug: 'spiritual-puja',
    url: '/products/spiritual-puja',
    iconName: 'Flame',
    image: '/images/categories/spiritual-puja.png',
    visualDesc: 'Diya',
    sortOrder: 16,
    isActive: true,
    isFeatured: true,
    subcategories: [
      'Puja Samagri', 'Diyas & Lamps', 'Agarbatti & Dhoop', 'Puja Essentials',
      'Idols & Murtis', 'Rudraksha & Mala', 'Religious Books',
      'Festival Essentials', 'Puja Kits & Combos', 'Spiritual Gifts'
    ]
  },
  {
    id: 'furniture',
    name: 'Furniture',
    slug: 'furniture',
    url: '/products/furniture',
    iconName: 'Box',
    image: '/images/categories/furniture.png',
    visualDesc: 'Furniture items',
    sortOrder: 17,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'Living Room', 'Bedroom', 'Office Furniture', 'Outdoor Furniture', 'Home Decor'
    ]
  },
  {
    id: 'beauty-products',
    name: 'Beauty Products',
    slug: 'beauty-products',
    url: '/products/beauty-products',
    iconName: 'Sparkles',
    image: '/images/categories/beauty-products.png',
    visualDesc: 'Beauty products',
    sortOrder: 18,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'Skincare', 'Haircare', 'Makeup', 'Fragrances', 'Men\'s Grooming'
    ]
  },
  {
    id: 'saathpack',
    name: 'SAATHPACK',
    slug: 'saathpack',
    url: '/products/saathpack/landing',
    iconName: 'Package',
    image: '/images/saathpack/saathapp_corrugated_box.jpg',
    visualDesc: 'Package',
    sortOrder: 19,
    isActive: true,
    isFeatured: true,
    subcategories: [
      'Packaging Supplies', 'Delivery Bags', 'Boxes', 'Tapes'
    ]
  },
  {
    id: 'pottery',
    name: 'Pottery',
    slug: 'pottery',
    url: '/products/pottery',
    iconName: 'Box',
    image: '/images/categories/pottery.jpg',
    visualDesc: 'Pottery items',
    sortOrder: 20,
    isActive: true,
    isFeatured: false,
    subcategories: [
      'Raw Materials', 'Pottery Making Supplies', 'Finished Pottery Products',
      'Mugs', 'Jugs', 'Glasses', 'Kulhad', 'Bowls', 'Plates', 'Matka', 'Handi', 'Diya', 'Decorative Pottery'
    ]
  }
];

// GIFT SET MARKETPLACE CATEGORY (Open to all verified sellers)
export const GIFT_SET_CATEGORY = {
  id: 'gift-set',
  name: 'Gift Set',
  slug: 'gift-set',
  url: '/products/gift-set',
  iconName: 'Gift',
  isMarketplaceOpen: true, // Any verified seller can list here
  subcategories: [
    'Chocolate Gift Sets', 'Stationery Gift Sets', 'Flower Gift Sets',
    'Sweets & Mithai Boxes', 'Clothes Gift Sets', 'Glass & Cup Sets',
    'Crockery Gift Sets', 'Ceramic Gift Sets', 'Dry Fruit Gift Sets',
    'Beauty & Wellness Gift Sets', 'Perfume Gift Sets', 'Kids Gift Sets',
    'Birthday Gift Sets', 'Wedding Gift Sets', 'Anniversary Gift Sets',
    'Festival Gift Sets', 'Corporate Gift Sets', 'Personalized Gift Sets',
    'Custom Gift Hampers'
  ],
  occasions: [
    'Birthday', 'Anniversary', 'Wedding', 'Engagement', 'Baby Shower',
    'Festival', 'Corporate', 'Farewell', 'Thank You', 'Housewarming'
  ],
  recipients: [
    'For Her', 'For Him', 'For Kids', 'For Parents', 'For Friends',
    'For Couples', 'For Employees', 'For Clients'
  ],
  priceRanges: [
    { label: 'Under ₹299', min: 0, max: 299 },
    { label: '₹299–₹499', min: 299, max: 499 },
    { label: '₹500–₹999', min: 500, max: 999 },
    { label: '₹1,000–₹2,499', min: 1000, max: 2499 },
    { label: '₹2,500+', min: 2500, max: Infinity }
  ],
  deliveryTypes: [
    { id: 'same_day', label: 'Same Day Delivery' },
    { id: 'express', label: 'Express Delivery' },
    { id: 'scheduled', label: 'Scheduled Delivery' }
  ],
  customizationOptions: [
    'Add Greeting Card', 'Add Name', 'Add Message', 'Add Photo',
    'Gift Wrapping', 'Choose Ribbon', 'Choose Packaging'
  ]
};

// Compact Header Navigation Bar List (Exact PDF Specified Order & Contents - Page 13)
export const HEADER_NAV_ITEMS = [
  { name: 'All Categories', path: '/products' },
  { name: 'Grocery', path: '/products/grocery' },
  { name: 'Electronics', path: '/products/electronics' },
  { name: 'Mobiles', path: '/products/mobiles' },
  { name: 'Medicine & Healthcare', path: '/products/medicine-healthcare' },
  { name: 'Fashion', path: '/products/fashion' },
  { name: 'Household Items', path: '/products/household-items' },
  { name: 'Hardware', path: '/products/hardware' },
  { name: 'Services', path: '/products/services/service' },
  { name: 'Book & Stationery', path: '/products/book-stationery' },
  { name: 'Shoes, Slippers & Sandals', path: '/products/footwear' },
  { name: 'Agriculture', path: '/products/agriculture' },
  { name: 'Construction', path: '/products/construction' },
  { name: 'Vehicles', path: '/products/vehicles' },
  { name: 'Spiritual / Puja', path: '/products/spiritual-puja' },
  { name: 'Furniture', path: '/products/furniture' },
  { name: 'Beauty Products', path: '/products/beauty-products' },
  { name: 'Gift Set', path: '/products/gift-set', isNew: true },
  { name: 'SaathApp Product', path: '/products/saathapp', isNew: true },
  { name: 'SAATHPACK', path: '/products/saathpack/landing', isNew: true },
  { name: 'SAATHAPP PLUS', path: '/plus', isNew: true, isPlus: true }
];

// Helper to get category details by slug, id, or legacy alias
export function getCategoryByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  const canonicalId = CATEGORY_ALIASES[idOrSlug] || idOrSlug;
  if (canonicalId === 'gift-set') return GIFT_SET_CATEGORY;
  return MASTER_CATEGORIES.find(c => c.id === canonicalId || c.slug === canonicalId);
}

// Compute dynamic live product counts from product list (Data-Driven per PDF Page 20)
export function getDynamicProductCount(productsList, categoryIdOrSlug) {
  if (!productsList || !Array.isArray(productsList)) return 0;
  const canonicalId = CATEGORY_ALIASES[categoryIdOrSlug] || categoryIdOrSlug;

  if (canonicalId === 'gift-set' || canonicalId === 'gifts') {
    return productsList.filter(p => 
      p.category === 'gift-set' || p.category === 'gifts' || p.vertical === 'GIFT_SET'
    ).length;
  }

  if (canonicalId === 'household-items') {
    return productsList.filter(p => 
      p.category === 'household-items' || p.category === 'home-kitchen' || p.category === 'home'
    ).length;
  }

  return productsList.filter(p => {
    const pCat = CATEGORY_ALIASES[p.category] || p.category;
    return pCat === canonicalId;
  }).length;
}
