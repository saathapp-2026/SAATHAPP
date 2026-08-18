/**
 * Master Category Data & Architecture Config for SaathApp
 * Single source of truth for all 16 marketplace categories + Gift Set marketplace vertical.
 */

import {
  Leaf, Smartphone, Cross, Shirt, Package, Hammer, Wrench, BookOpen,
  Footprints, Gift, Sparkles, Sprout, HardHat, Car, Flame, ShoppingBag, Box
} from 'lucide-react';

export const MASTER_CATEGORIES = [
  // ROW 1
  {
    id: 'grocery',
    name: 'Grocery',
    slug: 'grocery',
    url: '/products/grocery',
    iconName: 'Leaf',
    visualDesc: 'Leaf / grocery basket',
    subcategories: [
      'Oils & Ghee', 'Rice & Grains', 'Spices & Masalas', 'Flour & Atta',
      'Pulses & Dals', 'Dry Fruits & Nuts', 'Beverages', 'Snacks & Packaged Food'
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    url: '/products/electronics',
    iconName: 'Smartphone',
    visualDesc: 'Smartphone / device',
    subcategories: [
      'Laptops & Computers', 'Audio & Headphones', 'Smart Wearables',
      'Cameras & Accessories', 'Computer Accessories', 'Home Appliances'
    ]
  },
  {
    id: 'mobiles',
    name: 'Mobiles',
    slug: 'mobiles',
    url: '/products/mobiles',
    iconName: 'Smartphone',
    visualDesc: 'Smartphone',
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
    visualDesc: 'Medical cross',
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
    visualDesc: 'T-shirt',
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
    visualDesc: 'Cleaning basket',
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
    visualDesc: 'Tools',
    subcategories: [
      'Power Tools', 'Hand Tools', 'Fasteners & Screws', 'Plumbing Supplies',
      'Electrical Fittings', 'Paints & Adhesives', 'Safety Gear'
    ]
  },
  {
    id: 'services',
    name: 'Services',
    slug: 'services',
    url: '/services',
    iconName: 'Wrench',
    visualDesc: 'Service / tools icon',
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
    visualDesc: 'Books + pen',
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
    visualDesc: 'Shoe',
    subcategories: [
      "Men's Footwear", "Women's Footwear", "Kids' Footwear", 'Sports Shoes',
      'Casual Shoes', 'Formal Shoes', 'Slippers', 'Sandals', 'School Shoes'
    ]
  },
  {
    id: 'gifts',
    name: 'Gifts Items',
    slug: 'gifts',
    url: '/products/gifts',
    iconName: 'Gift',
    visualDesc: 'Gift box',
    subcategories: [
      'Birthday Gifts', 'Anniversary Gifts', 'Wedding Gifts', 'Festival Gifts',
      'Corporate Gifts', 'Personalized Gifts', 'Gift Hampers',
      'Flowers & Gift Combos', 'Premium Gifts'
    ]
  },
  {
    id: 'saathapp',
    name: 'SaathApp Product',
    slug: 'saathapp',
    url: '/products/saathapp',
    iconName: 'Sparkles',
    visualDesc: 'SaathApp brand mark',
    isOfficialOnly: true,
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
    visualDesc: 'Green leaves',
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
    visualDesc: 'Helmet',
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
    visualDesc: 'Car',
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
    visualDesc: 'Diya',
    subcategories: [
      'Puja Samagri', 'Diyas & Lamps', 'Agarbatti & Dhoop', 'Puja Essentials',
      'Idols & Murtis', 'Rudraksha & Mala', 'Religious Books',
      'Festival Essentials', 'Puja Kits & Combos', 'Spiritual Gifts'
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
  isMarketplaceOpen: true, // Any seller can list here
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

// Header navigation bar list (Exact PDF specified order & contents)
export const HEADER_NAV_ITEMS = [
  { name: 'All Categories', path: '/products' },
  { name: 'Grocery', path: '/products/grocery' },
  { name: 'Electronics', path: '/products/electronics' },
  { name: 'Mobiles', path: '/products/mobiles' },
  { name: 'Fashion', path: '/products/fashion' },
  { name: 'Home & Kitchen', path: '/products/home-kitchen' },
  { name: 'Household Items', path: '/products/household-items' },
  { name: 'Hardware', path: '/products/hardware' },
  { name: 'Services', path: '/services' },
  { name: 'Spiritual / Puja', path: '/products/spiritual-puja', isNew: true },
  { name: 'Gift Set', path: '/products/gift-set', isNew: true },
  { name: 'SaathApp Product', path: '/products/saathapp', isNew: true },
  { name: 'Offers', path: '/offers', icon: 'Offers' },
  { name: 'SAATHAPP PLUS', path: '/plus', isNew: true, isPlus: true }
];

// Helper to get category details by slug or id
export function getCategoryByIdOrSlug(idOrSlug) {
  if (idOrSlug === 'gift-set') return GIFT_SET_CATEGORY;
  return MASTER_CATEGORIES.find(c => c.id === idOrSlug || c.slug === idOrSlug);
}

// Compute dynamic live product counts from product list
export function getDynamicProductCount(productsList, categoryIdOrSlug) {
  if (!productsList || !Array.isArray(productsList)) return 0;
  if (categoryIdOrSlug === 'gift-set') {
    return productsList.filter(p => p.category === 'gift-set' || p.vertical === 'GIFT_SET').length;
  }
  return productsList.filter(p => p.category === categoryIdOrSlug).length;
}
