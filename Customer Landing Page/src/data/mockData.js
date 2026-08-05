import { ShieldCheck, Users, Truck, Brain } from 'lucide-react';

export const categories = [
  {
    id: 'electricals',
    name: 'Electricals',
    tagline: 'Electricians & Parts',
    iconName: 'Zap',
    gradient: 'bg-gradient-card-green',
    textColor: 'text-green-700',
    popular: true,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'hardware',
    name: 'Hardware',
    tagline: 'Tools & Fittings',
    iconName: 'Hammer',
    gradient: 'bg-gradient-card-yellow',
    textColor: 'text-amber-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1581241863380-c116c968f9a9?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'construction',
    name: 'Construction',
    tagline: 'Cement, Sand & Brick',
    iconName: 'HardHat',
    gradient: 'bg-gradient-card-blue',
    textColor: 'text-blue-700',
    popular: true,
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'repairs',
    name: 'Repairs & AC',
    tagline: 'Appliance Experts',
    iconName: 'Wrench',
    gradient: 'bg-gradient-card-red',
    textColor: 'text-red-700',
    popular: true,
    image: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'grocery',
    name: 'Grocery & Fresh',
    tagline: 'Daily Essentials',
    iconName: 'ShoppingCart',
    gradient: 'bg-gradient-card-purple',
    textColor: 'text-purple-700',
    popular: true,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    tagline: 'Seeds & Fertilizer',
    iconName: 'Tractor',
    gradient: 'bg-gradient-card-orange',
    textColor: 'text-orange-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'vehicle',
    name: 'Vehicle Care',
    tagline: 'Wash & Mechanics',
    iconName: 'Car',
    gradient: 'bg-gradient-card-cyan',
    textColor: 'text-cyan-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'home_services',
    name: 'Home Services',
    tagline: 'Cleaning & Painting',
    iconName: 'Home',
    gradient: 'bg-gradient-card-teal',
    textColor: 'text-teal-700',
    popular: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'furniture',
    name: 'Furniture',
    tagline: 'Sofa & Carpentry',
    iconName: 'Sofa',
    gradient: 'bg-gradient-card-green',
    textColor: 'text-green-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'mobiles',
    name: 'Accessories',
    tagline: 'Cables & Covers',
    iconName: 'Smartphone',
    gradient: 'bg-gradient-card-yellow',
    textColor: 'text-amber-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'gas_booking',
    name: 'Gas Booking',
    tagline: 'LPG Refill',
    iconName: 'Flame',
    gradient: 'bg-gradient-card-red',
    textColor: 'text-red-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1626264290769-614044737ca8?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'water_booking',
    name: 'Water Delivery',
    tagline: '20L Pure Water cans',
    iconName: 'Droplet',
    gradient: 'bg-gradient-card-blue',
    textColor: 'text-blue-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    tagline: 'Daily Subscriptions',
    iconName: 'Newspaper',
    gradient: 'bg-gradient-card-teal',
    textColor: 'text-teal-700',
    popular: false,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=150&h=150&q=80',
  }
];

export const flashDeals = [
  {
    id: 'fd1',
    name: 'Fresh Alphonso Mangoes (1 Box - 6 pcs)',
    price: 499,
    oldPrice: 899,
    discount: 44,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&h=300&q=80',
    deliveryTime: '10 mins',
    stockLeft: 4,
    totalStock: 12,
    badge: 'Limited',
    rating: 4.8
  },
  {
    id: 'fd2',
    name: 'Havells Heavy Duty Copper Wire 1.5 Sq mm',
    price: 1149,
    oldPrice: 1699,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=300&h=300&q=80',
    deliveryTime: '15 mins',
    stockLeft: 8,
    totalStock: 25,
    badge: 'Best Seller',
    rating: 4.9
  },
  {
    id: 'fd3',
    name: 'Fortune Soya Health Oil (5 Litre Can)',
    price: 615,
    oldPrice: 799,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&h=300&q=80',
    deliveryTime: '12 mins',
    stockLeft: 3,
    totalStock: 15,
    badge: 'Trending',
    rating: 4.7
  },
  {
    id: 'fd4',
    name: 'Ultratech Weather Plus Cement (50 kg)',
    price: 430,
    oldPrice: 520,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&h=300&q=80',
    deliveryTime: '45 mins',
    stockLeft: 12,
    totalStock: 30,
    badge: 'Hot Deal',
    rating: 4.6
  },
  {
    id: 'fd5',
    name: 'Amul Pure Cow Ghee (1 Litre)',
    price: 670,
    oldPrice: 720,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&h=300&q=80',
    deliveryTime: '10 mins',
    stockLeft: 6,
    totalStock: 20,
    badge: 'Organic',
    rating: 4.9
  }
];

export const featuredProducts = [
  {
    id: 'fp1',
    name: 'Organic Farm Fresh Tomatoes (1kg)',
    category: 'grocery',
    price: 38,
    oldPrice: 60,
    discount: 36,
    rating: 4.5,
    reviewsCount: 180,
    deliveryTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'Organic',
    organic: true
  },
  {
    id: 'fp2',
    name: 'Luminous LED Bulb 9W (Pack of 4)',
    category: 'electricals',
    price: 299,
    oldPrice: 599,
    discount: 50,
    rating: 4.7,
    reviewsCount: 342,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'Best Seller'
  },
  {
    id: 'fp3',
    name: 'High Quality Steel Screwdriver Set (8 Pcs)',
    category: 'hardware',
    price: 349,
    oldPrice: 599,
    discount: 41,
    rating: 4.4,
    reviewsCount: 95,
    deliveryTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1530124560672-9999d37f726a?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'Trending'
  },
  {
    id: 'fp4',
    name: 'Pure Organic NPK Fertilizer for Crops (5kg)',
    category: 'agriculture',
    price: 499,
    oldPrice: 799,
    discount: 37,
    rating: 4.8,
    reviewsCount: 215,
    deliveryTime: '30 mins',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'Organic'
  },
  {
    id: 'fp5',
    name: 'Asian Paints White Acrylic Distemper (10L)',
    category: 'construction',
    price: 1240,
    oldPrice: 1550,
    discount: 20,
    rating: 4.6,
    reviewsCount: 88,
    deliveryTime: '60 mins',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'New'
  },
  {
    id: 'fp6',
    name: 'SanDisk Ultra Dual 64GB OTG Flash Drive',
    category: 'mobiles',
    price: 699,
    oldPrice: 1200,
    discount: 41,
    rating: 4.6,
    reviewsCount: 1400,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'Best Seller'
  },
  {
    id: 'fp7',
    name: 'Gold Drop Sunflower Oil (1 Litre)',
    category: 'grocery',
    price: 145,
    oldPrice: 185,
    discount: 21,
    rating: 4.5,
    reviewsCount: 650,
    deliveryTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'Trending'
  },
  {
    id: 'fp8',
    name: 'Double Leaf Water Bottle 1000ml (Set of 3)',
    category: 'household',
    price: 249,
    oldPrice: 399,
    discount: 37,
    rating: 4.3,
    reviewsCount: 110,
    deliveryTime: '18 mins',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300&h=300&q=80',
    badge: 'Limited'
  }
];

export const nearbyShops = [
  {
    id: 's1',
    name: 'Saath Super Kirana Store',
    category: 'Grocery & Staples',
    distance: '0.8 km',
    deliveryTime: '15 mins',
    rating: 4.7,
    minOrder: 99,
    status: 'Open',
    logo: 'KS',
    color: 'bg-emerald-500',
    banner: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 's2',
    name: 'Verma Electricals & Hardware',
    category: 'Electrical & Plumbing Parts',
    distance: '1.2 km',
    deliveryTime: '20 mins',
    rating: 4.5,
    minOrder: 150,
    status: 'Open',
    logo: 'VE',
    color: 'bg-blue-500',
    banner: 'https://images.unsplash.com/photo-1530124560672-9999d37f726a?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 's3',
    name: 'Krishna Seeds & Crop Protection',
    category: 'Farming & Agriculture',
    distance: '3.5 km',
    deliveryTime: '45 mins',
    rating: 4.9,
    minOrder: 499,
    status: 'Open',
    logo: 'KS',
    color: 'bg-orange-500',
    banner: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 's4',
    name: 'Madan Construction Supply',
    category: 'Cement, Sand & Iron Rods',
    distance: '2.8 km',
    deliveryTime: '60 mins',
    rating: 4.3,
    minOrder: 1999,
    status: 'Open',
    logo: 'MC',
    color: 'bg-slate-700',
    banner: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 's5',
    name: 'New Fancy Furniture & Decor',
    category: 'Home & Office Furniture',
    distance: '2.1 km',
    deliveryTime: '90 mins',
    rating: 4.6,
    minOrder: 999,
    status: 'Closed',
    logo: 'FF',
    color: 'bg-yellow-600',
    banner: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=300&h=200&q=80'
  }
];

export const services = [
  {
    id: 'ser1',
    name: 'Complete AC Servicing',
    category: 'Repairs',
    price: 399,
    rating: 4.8,
    reviewsCount: 1240,
    image: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=300&h=200&q=80',
    duration: '45 mins',
    saathisAvailable: 14
  },
  {
    id: 'ser2',
    name: 'Expert Home Electrician',
    category: 'Electricals',
    price: 99,
    rating: 4.9,
    reviewsCount: 3820,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&h=200&q=80',
    duration: '30 mins',
    saathisAvailable: 28
  },
  {
    id: 'ser3',
    name: 'Professional Deep Cleaning',
    category: 'Home Services',
    price: 699,
    rating: 4.7,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&h=200&q=80',
    duration: '120 mins',
    saathisAvailable: 8
  },
  {
    id: 'ser4',
    name: 'Farming Expert Consultation',
    category: 'Agriculture',
    price: 199,
    rating: 4.9,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=300&h=200&q=80',
    duration: '30 mins (Call/Visit)',
    saathisAvailable: 5
  },
  {
    id: 'ser5',
    name: 'Plumbing Leakage Repair',
    category: 'Repairs',
    price: 149,
    rating: 4.6,
    reviewsCount: 1550,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&h=200&q=80',
    duration: '45 mins',
    saathisAvailable: 19
  },
  {
    id: 'ser6',
    name: 'Premium Wall Painting',
    category: 'Home Services',
    price: 1499,
    rating: 4.8,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=300&h=200&q=80',
    duration: '1-3 Days',
    saathisAvailable: 12
  }
];

export const advertisements = [
  {
    id: 'ad1',
    title: 'Upgrade to Smart Farming',
    subtitle: 'Get 25% Subsidy on Seeds & Drip Irrigation Kits',
    cta: 'Apply Now',
    banner: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&h=300&q=80',
    color: 'from-emerald-800 to-green-700',
    tag: 'Govt Scheme'
  },
  {
    id: 'ad2',
    title: 'Book a Verified AC Tech',
    subtitle: 'Beat the Summer Heat. Servicing starts at just ₹399',
    cta: 'Book Tech',
    banner: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&h=300&q=80',
    color: 'from-sky-800 to-indigo-900',
    tag: 'Trending Service'
  },
  {
    id: 'ad3',
    title: 'Super Charge Your Store',
    subtitle: 'Register as SaathApp Partner and Increase Sales by 3x',
    cta: 'Register Store',
    banner: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&h=300&q=80',
    color: 'from-amber-700 to-red-800',
    tag: 'Partner Program'
  }
];

export const testimonials = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    role: 'Farmer, Hisar',
    rating: 5,
    text: 'SaathApp has completely changed my farming experience. I ordered seeds and fertilizer, and they were at my farm within 2 hours. Also, the Agri Expert helped me solve a crop disease question instantly!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    verified: true
  },
  {
    id: 't2',
    name: 'Anjali Sharma',
    role: 'Homeowner, Noida',
    rating: 5,
    text: 'I booked an electrician to fix a burnt switchboard and also ordered bread and eggs. The electrician arrived in 25 minutes, and my groceries arrived in 10 minutes. Incredible super app!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    verified: true
  },
  {
    id: 't3',
    name: 'Vijay Verma',
    role: 'Contractor, Gurugram',
    rating: 4.8,
    text: 'Getting cement and hardware delivered directly to construction sites used to be a hassle. With SaathApp, I just order from nearby hardware dealers and get it loaded and delivered in an hour.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    verified: true
  }
];

export const whySaathAppFeatures = [
  {
    title: 'Verified Sellers',
    description: '100% genuine local stores, farmers, and certified contractors audited by our teams.',
    icon: Users,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    title: 'Instant Delivery',
    description: 'Groceries in 10 mins, hardware and cement in 60 mins, services booked within minutes.',
    icon: Truck,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    title: 'Secure Payments',
    description: 'UPI, Cards, NetBanking, and Cash on Delivery (COD) with secure online and COD payments for services.',
    icon: ShieldCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'AI Recommendations',
    description: 'Smart recommendations for products and services based on weather, seasons, and local demand.',
    icon: Brain,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Choose Products or Services',
    description: 'Search for groceries, hardware, farm supplies, or professional local home services.'
  },
  {
    step: '02',
    title: 'Instant Booking & Checkout',
    description: 'Add items from local stores or select service schedules with flat, upfront pricing.'
  },
  {
    step: '03',
    title: 'Saathi Professional Assigned',
    description: 'A verified local Saathi or delivery partner is matched to fulfill your order immediately.'
  },
  {
    step: '04',
    title: 'Delivered or Serviced',
    description: 'Receive your goods or service with live tracking, and pay securely once fully satisfied.'
  }
];

export const liveStats = [
  { value: 10000, label: 'Products Available', prefix: '', suffix: '+' },
  { value: 500, label: 'Verified Local Stores', prefix: '', suffix: '+' },
  { value: 5000, label: 'Successful Orders Today', prefix: '', suffix: '+' },
  { value: 300, label: 'Active Saathi Partners', prefix: '', suffix: '+' }
];

// ─── Worker Dashboard Mock Data ───────────────────────────────────────────

export const workerProfile = {
  name: 'Ramesh Kumar',
  id: 'WRK-4829',
  type: 'Electrician',
  email: 'ramesh.kumar@saathapp.com',
  phone: '+91 9876543211',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  verified: true,
  city: 'New Delhi',
  experience: '4 Years',
  skills: ['Wiring', 'Switchboards', 'Fan Installation', 'DB Box Repair'],
  bankAccount: 'HDFC •••• 4821',
  emergencyContact: 'Sunita Kumar (+91 9876543299)',
};

export const workerJobs = [
  {
    id: 'JOB-3042',
    customerName: 'Sunita Roy',
    customerPhone: '9876543202',
    serviceName: 'Kitchen Switch Replacement',
    address: 'Malviya Nagar, Sector 4, New Delhi',
    date: 'July 28, 2026',
    time: '11:00 AM',
    incentive: 350,
    priority: 'high',
    status: 'assigned',
    assignedBy: 'Rahul Kumar (SaathApp Partner)',
    otp: '1050',
    scopeDescription: 'Replace 2 burnt modular light switches. Install safe earth lines.',
    estimatedTime: '45 mins',
    materials: ['Modular switches x2', 'Earth wire', 'Screws'],
    photos: [],
  },
  {
    id: 'JOB-3091',
    customerName: 'Vijay Khanna',
    customerPhone: '9876543204',
    serviceName: 'Living Room Fan Install',
    address: 'Green Park Ext, H-12, New Delhi',
    date: 'July 28, 2026',
    time: '04:00 PM',
    incentive: 450,
    priority: 'medium',
    status: 'assigned',
    assignedBy: 'Rahul Kumar (SaathApp Partner)',
    otp: '3200',
    scopeDescription: 'Unbox and assemble Orient ceiling fan. Secure ceiling hook, adjust regulator switch.',
    estimatedTime: '60 mins',
    materials: ['Ceiling hook', 'Regulator'],
    photos: [],
  },
  {
    id: 'JOB-3110',
    customerName: 'Anita Mehta',
    customerPhone: '9876543215',
    serviceName: 'Bathroom Geyser Wiring',
    address: 'Saket, Pocket A, New Delhi',
    date: 'July 28, 2026',
    time: '09:30 AM',
    incentive: 520,
    priority: 'high',
    status: 'accepted',
    assignedBy: 'SaathApp Dispatch',
    otp: '7841',
    scopeDescription: 'Install dedicated 16A line for geyser. Test MCB and earthing.',
    estimatedTime: '90 mins',
    materials: ['16A MCB', 'Copper wire'],
    photos: [],
  },
  {
    id: 'JOB-2900',
    customerName: 'Preeti Sharma',
    customerPhone: '9876543203',
    serviceName: 'Aadhaar Verified Light Install',
    address: 'Hauz Khas Village, Block B, New Delhi',
    date: 'July 27, 2026',
    time: '02:00 PM',
    incentive: 750,
    priority: 'low',
    status: 'completed',
    assignedBy: 'Rahul Kumar (SaathApp Partner)',
    otp: '4820',
    rating: 5,
    scopeDescription: 'Install LED panel lights in living room.',
    estimatedTime: '45 mins',
    materials: ['LED panels x3'],
    photos: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80'],
  },
  {
    id: 'JOB-2855',
    customerName: 'Karan Singh',
    customerPhone: '9876543218',
    serviceName: 'Outdoor Wiring Check',
    address: 'Defence Colony, New Delhi',
    date: 'July 26, 2026',
    time: '03:00 PM',
    incentive: 400,
    priority: 'medium',
    status: 'cancelled',
    assignedBy: 'Rahul Kumar (SaathApp Partner)',
    otp: '9012',
    scopeDescription: 'Inspect patio wiring and waterproofing.',
    estimatedTime: '30 mins',
    materials: [],
    photos: [],
  },
  {
    id: 'JOB-2820',
    customerName: 'Meera Joshi',
    customerPhone: '9876543220',
    serviceName: 'DB Box Leakage Fix',
    address: 'Lajpat Nagar, New Delhi',
    date: 'July 28, 2026',
    time: '01:00 PM',
    incentive: 600,
    priority: 'high',
    status: 'pending',
    assignedBy: 'SaathApp Dispatch',
    otp: '5510',
    scopeDescription: 'Fix ELCB tripping issue in main distribution box.',
    estimatedTime: '75 mins',
    materials: ['ELCB', 'Insulation tape'],
    photos: [],
  },
];

export const workerStats = {
  todayJobs: 4,
  assignedJobs: 2,
  completedJobs: 12,
  pendingJobs: 1,
  cancelledJobs: 1,
  todayEarnings: 1450,
  monthlyEarnings: 20450,
  performanceScore: 94,
  workingHours: 7.5,
  attendancePercent: 94.2,
  monthlySalary: 18500,
  incentives: 1450,
  averageRating: 4.9,
};

export const workerEarnings = {
  today: 1450,
  weekly: 4200,
  monthly: 20450,
  salary: 18500,
  bonus: 500,
  incentives: 1450,
  statements: [
    { month: 'July 2026', amount: 20450, status: 'paid' },
    { month: 'June 2026', amount: 19800, status: 'paid' },
    { month: 'May 2026', amount: 19200, status: 'paid' },
  ],
};

export const workerAttendance = {
  isClockedIn: false,
  totalHours: 176,
  lateMarks: 2,
  leavesTaken: 3,
  todayHours: 0,
  calendar: [
    { date: '2026-07-28', status: 'present', hours: 0 },
    { date: '2026-07-27', status: 'present', hours: 8 },
    { date: '2026-07-26', status: 'late', hours: 7.5 },
    { date: '2026-07-25', status: 'present', hours: 8 },
    { date: '2026-07-24', status: 'leave', hours: 0 },
  ],
};

export const workerPerformance = {
  completionRate: 96,
  acceptanceRate: 92,
  customerRating: 4.9,
  averageJobTime: '52 mins',
  rank: 12,
  totalWorkers: 340,
  badges: [
    { name: 'Top Performer', icon: 'Award', color: 'amber' },
    { name: 'Punctuality Star', icon: 'Clock', color: 'blue' },
    { name: '5-Star Streak', icon: 'Star', color: 'emerald' },
  ],
};

export const workerReviews = [
  { id: 1, customer: 'Preeti Sharma', rating: 5, text: 'Very quick switchboard check. Professional and polite.', date: 'Jul 27, 2026', replied: false },
  { id: 2, customer: 'Aman Varma', rating: 5, text: 'Excellent wiring work. Would recommend.', date: 'Jul 20, 2026', replied: true },
  { id: 3, customer: 'Neha Gupta', rating: 4, text: 'Good job but arrived 10 mins late.', date: 'Jul 15, 2026', replied: false },
];

export const workerWallet = {
  balance: 8450,
  salaryStatus: 'paid',
  pendingSalary: 0,
  bonus: 500,
  withdrawHistory: [
    { id: 'WD-901', amount: 5000, date: 'Jul 15, 2026', status: 'completed' },
    { id: 'WD-882', amount: 3500, date: 'Jul 01, 2026', status: 'completed' },
  ],
};

export const workerDocuments = [
  { name: 'Aadhaar Card', file: 'aadhaar_scanned_verified.pdf', status: 'verified' },
  { name: 'PAN Card', file: 'pan_card_ramesh.jpg', status: 'verified' },
  { name: 'Driving License', file: 'dl_scanned.jpg', status: 'verified' },
  { name: 'Experience Certificate', file: 'electrician_license_proof.pdf', status: 'verified' },
];

export const workerNotifications = [
  { id: 1, title: 'New Job Assigned', description: 'Kitchen Switch Replacement assigned by Rahul Kumar', time: '15 mins ago', type: 'new_job', read: false },
  { id: 2, title: 'Salary Settled', description: '₹18,500 base salary credited to your bank account', time: 'Jul 01, 2026', type: 'salary_credited', read: false },
  { id: 3, title: 'Outstanding Review', description: 'Preeti Sharma rated you 5 stars', time: 'Yesterday', type: 'review_received', read: true },
  { id: 4, title: 'Company Announcement', description: 'New safety training module available in Help section', time: '2 days ago', type: 'announcement', read: true },
];

export const workerSupportFaqs = [
  { q: 'How are incentives calculated?', a: 'Incentives are based on job complexity, priority, and customer rating bonus.' },
  { q: 'When is salary credited?', a: 'Base salary is credited on the 1st of every month. Incentives settle weekly on Tuesdays.' },
  { q: 'How to dispute a late mark?', a: 'Raise a support ticket under Attendance with your shift log details.' },
];

export const workerTrainingVideos = [
  { title: 'Safety Protocols for Electrical Work', duration: '8 min' },
  { title: 'Customer Communication Best Practices', duration: '5 min' },
  { title: 'Photo Documentation Guidelines', duration: '4 min' },
];

// ─── Professional Dashboard Mock Data ───────────────────────────────────────

export const professionalProfile = {
  name: 'Rahul Kumar',
  id: 'PRO-7821',
  type: 'Electrician',
  email: 'rahul.kumar@saathapp.com',
  phone: '+91 9876543210',
  photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&h=200&q=80',
  verified: true,
  city: 'New Delhi, NCR',
  serviceRadius: 15,
  rating: 4.8,
  totalCustomers: 248,
  repeatCustomers: 89,
};

export const professionalBookings = [
  {
    id: 'BKG-9842',
    customerName: 'Preeti Sharma',
    customerPhone: '9876543203',
    serviceName: 'Full House Wiring Check',
    address: 'Hauz Khas Village, Block B, New Delhi',
    date: 'July 28, 2026',
    time: '02:00 PM',
    amount: 2200,
    status: 'upcoming',
    paymentStatus: 'secured',
    distance: 3.5,
    otp: '4820',
    scopeDescription: 'Inspect all power sockets, test DB box leakage switch, repair burnt lines in guest room.',
  },
  {
    id: 'BKG-9750',
    customerName: 'Vijay Khanna',
    customerPhone: '9876543204',
    serviceName: 'Electric Meter Switch Install',
    address: 'Green Park Extension, H-12, New Delhi',
    date: 'July 28, 2026',
    time: '04:00 PM',
    amount: 450,
    status: 'pending',
    paymentStatus: 'pending',
    distance: 1.8,
    otp: '9150',
    scopeDescription: 'Install HPL single-phase changeover switch next to the main supply line.',
  },
  {
    id: 'BKG-9700',
    customerName: 'Sunita Roy',
    customerPhone: '9876543202',
    serviceName: 'AC Installation Support',
    address: 'Malviya Nagar, Sector 4, New Delhi',
    date: 'July 28, 2026',
    time: '11:00 AM',
    amount: 1800,
    status: 'in_progress',
    paymentStatus: 'secured',
    distance: 2.1,
    otp: '3310',
    scopeDescription: 'Support AC unit mounting and electrical connection.',
  },
  {
    id: 'BKG-9610',
    customerName: 'Aman Varma',
    customerPhone: '9876543212',
    serviceName: 'Generator Transfer Switch Repair',
    address: 'Saket Metro Road, Pocket 4, New Delhi',
    date: 'July 27, 2026',
    time: '11:00 AM',
    amount: 1560,
    status: 'completed',
    paymentStatus: 'released',
    distance: 6.2,
    otp: '7822',
    rating: 5,
    scopeDescription: 'Repair contactor coil inside the automatic transfer switch box.',
  },
  {
    id: 'BKG-9580',
    customerName: 'Karan Singh',
    customerPhone: '9876543218',
    serviceName: 'Outdoor Lighting Setup',
    address: 'Defence Colony, New Delhi',
    date: 'July 26, 2026',
    time: '03:00 PM',
    amount: 3200,
    status: 'cancelled',
    paymentStatus: 'refunded',
    distance: 4.5,
    otp: '9012',
    scopeDescription: 'Install garden LED lighting with timer switch.',
  },
];

export const professionalStats = {
  todayJobs: 3,
  upcomingJobs: 2,
  completedJobs: 45,
  cancelledJobs: 3,
  pendingJobs: 1,
  inProgressJobs: 1,
  monthlyEarnings: 68000,
  pendingPayments: 450,
  customerRating: 4.8,
  acceptanceRate: 94,
  responseTime: '8 mins',
  totalEarnings: 318000,
  averageRating: 4.8,
  totalCustomers: 248,
  repeatCustomers: 89,
};

export const professionalSchedule = [
  { time: '09:00 AM', service: 'Electrical Repair', customer: 'Anita Mehta', status: 'completed' },
  { time: '11:00 AM', service: 'AC Installation', customer: 'Sunita Roy', status: 'in_progress' },
  { time: '02:00 PM', service: 'Wiring Check', customer: 'Preeti Sharma', status: 'upcoming' },
  { time: '04:00 PM', service: 'Meter Switch Install', customer: 'Vijay Khanna', status: 'pending' },
];

export const professionalCustomers = [
  { id: 1, name: 'Preeti Sharma', phone: '9876543203', location: 'Hauz Khas', jobs: 5, rating: 5, repeat: true },
  { id: 2, name: 'Vijay Khanna', phone: '9876543204', location: 'Green Park', jobs: 3, rating: 4.8, repeat: true },
  { id: 3, name: 'Aman Varma', phone: '9876543212', location: 'Saket', jobs: 2, rating: 5, repeat: false },
  { id: 4, name: 'Sunita Roy', phone: '9876543202', location: 'Malviya Nagar', jobs: 4, rating: 4.9, repeat: true },
];

export const professionalNotifications = [
  { id: 1, title: 'New Booking Request', description: 'Electric Meter Install requested by Vijay Khanna', time: '10 mins ago', type: 'new_booking', read: false },
  { id: 2, title: 'Payment Released', description: '₹1,560 credited to wallet for Generator ATS Repair', time: '1 hour ago', type: 'payment_received', read: false },
  { id: 3, title: 'New Review Added', description: 'Aman Varma left a 5-star review', time: 'Yesterday', type: 'review_received', read: true },
  { id: 4, title: 'System Update', description: 'New calendar sync feature available', time: '2 days ago', type: 'system', read: true },
];

export const professionalWallet = {
  currentBalance: 12450,
  pendingBalance: 450,
  withdrawHistory: [
    { id: 'WD-701', amount: 10000, date: 'Jul 20, 2026', status: 'completed' },
    { id: 'WD-688', amount: 8000, date: 'Jul 06, 2026', status: 'completed' },
  ],
  transactions: [
    { id: 'TX-901', type: 'credit', amount: 1560, desc: 'BKG-9610 payout', date: 'Jul 27, 2026' },
    { id: 'TX-902', type: 'debit', amount: 10000, desc: 'Bank withdrawal', date: 'Jul 20, 2026' },
  ],
};

export const professionalDocuments = [
  { name: 'Aadhaar Card', file: 'aadhaar_verified.pdf', status: 'verified' },
  { name: 'PAN Card', file: 'pan_rahul.jpg', status: 'verified' },
  { name: 'Driving License', file: 'dl_rahul.jpg', status: 'verified' },
  { name: 'Profile Photo', file: 'profile_photo.jpg', status: 'verified' },
  { name: 'Electrician Certificate', file: 'iti_certificate.pdf', status: 'verified' },
  { name: 'Experience Proof', file: 'experience_letter.pdf', status: 'pending' },
];

export const professionalReviews = [
  { id: 1, customer: 'Aman Varma', rating: 5, text: 'Arrived right on time. Fixed ATS switch perfectly.', date: 'Jul 27, 2026', replied: false },
  { id: 2, customer: 'Preeti Sharma', rating: 5, text: 'Thorough wiring inspection. Very professional.', date: 'Jul 22, 2026', replied: true },
  { id: 3, customer: 'Vijay Khanna', rating: 4, text: 'Good work on meter switch. Slightly delayed.', date: 'Jul 18, 2026', replied: false },
];

export const professionalSupportFaqs = [
  { q: 'How long to clear payouts?', a: 'Completed payouts settle in available balance instantly. Bank transfers happen weekly on Tuesdays.' },
  { q: 'What is client escrow?', a: 'Payments are secured in escrow upon booking to guarantee you get paid for completed work.' },
  { q: 'How to boost my profile?', a: 'Complete verification, maintain high ratings, and stay online during peak hours.' },
];
