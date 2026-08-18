export const products = [
  // Grocery
  {
    id: 'g1',
    name: 'Basmati Rice',
    category: 'grocery',
    groceryTier: 'Premium',
    subCategory: 'rice-atta-grains',
    description: 'Premium long grain basmati rice.',
    price: 350,
    originalPrice: 400,
    discount: '12%',
    image: '',
    rating: 4.5,
    reviews: 120,
    stock: 50,
    brand: 'Daawat',
    isOffer: true,
    promotion: {
      type: 'PREMIUM_GROCERY_DEAL',
      discount: '15%',
      active: true
    }
  },
  {
    id: 'g2',
    name: 'Aashirvaad Atta',
    category: 'grocery',
    groceryTier: 'Normal',
    subCategory: 'rice-atta-grains',
    description: 'Whole wheat atta 5kg.',
    price: 250,
    originalPrice: 280,
    discount: '10%',
    image: '',
    rating: 4.8,
    reviews: 300,
    stock: 100,
    brand: 'Aashirvaad',
    isOffer: true,
    promotion: {
      type: 'NORMAL_GROCERY_DEAL',
      discount: '20%',
      active: true
    }
  },
  {
    id: 'g3',
    name: 'Sunflower Cooking Oil',
    category: 'grocery',
    groceryTier: 'Normal',
    subCategory: 'edible-oils-ghee',
    description: '1L pouch.',
    price: 150,
    originalPrice: 180,
    discount: '16%',
    image: '',
    rating: 4.6,
    reviews: 80,
    stock: 30,
    brand: 'Fortune',
    isOffer: true,
  },
  {
    id: 'g4',
    name: 'Toor Dal',
    category: 'grocery',
    groceryTier: 'Normal',
    subCategory: 'dal-pulses',
    description: 'Unpolished 1kg.',
    price: 160,
    originalPrice: 160,
    discount: '',
    image: '',
    rating: 4.4,
    reviews: 150,
    stock: 200,
    brand: 'Tata Sampann',
    isOffer: false,
  },
  {
    id: 'g5',
    name: 'Sugar',
    category: 'grocery',
    groceryTier: 'Normal',
    subCategory: 'spices-masala',
    description: 'Refined sugar 1kg.',
    price: 50,
    originalPrice: 55,
    discount: '9%',
    image: '',
    rating: 4.7,
    reviews: 90,
    stock: 150,
    brand: 'ABC Store',
    isOffer: true,
    promotion: {
      type: 'SELLER',
      discount: '10%',
      active: true
    }
  },
  {
    id: 'g6',
    name: 'Tea',
    category: 'grocery',
    groceryTier: 'Premium',
    subCategory: 'beverages',
    description: 'Premium tea leaves 500g.',
    price: 200,
    originalPrice: 220,
    discount: '9%',
    image: '',
    rating: 4.8,
    reviews: 400,
    stock: 80,
    brand: 'Tata Tea',
    isOffer: true,
  },
  {
    id: 'sg1',
    name: 'SaathApp Premium Atta',
    category: 'grocery',
    groceryTier: 'Premium',
    subCategory: 'rice-atta-grains',
    description: '100% MP Sharbati wheat atta 5kg.',
    price: 350,
    originalPrice: 400,
    discount: '12%',
    image: '',
    rating: 4.9,
    reviews: 150,
    stock: 200,
    brand: 'SaathApp Official',
    isOffer: true,
  },
  {
    id: 'sg2',
    name: 'SaathApp Classic Spices Combo',
    category: 'grocery',
    groceryTier: 'Normal',
    subCategory: 'spices-masala',
    description: 'Turmeric, Chilli, Coriander powder 200g each.',
    price: 180,
    originalPrice: 220,
    discount: '18%',
    image: '',
    rating: 4.6,
    reviews: 85,
    stock: 120,
    brand: 'SaathApp Official',
    isOffer: true,
    promotion: {
      type: 'MEMBER',
      discount: '30%',
      active: true
    }
  },

  // Electronics
  {
    id: 'e1',
    name: 'Bluetooth Speaker',
    category: 'electronics',
    description: 'Portable wireless speaker with deep bass.',
    price: 1200,
    originalPrice: 1500,
    discount: '20%',
    image: '',
    rating: 4.6,
    reviews: 500,
    stock: 20,
    brand: 'JBL',
    isOffer: true,
    electronicsType: 'Accessories',
  },
  {
    id: 'e2',
    name: 'Wireless Earbuds',
    category: 'electronics',
    description: 'Noise cancelling TWS earbuds.',
    price: 1999,
    originalPrice: 2999,
    discount: '33%',
    image: '',
    rating: 4.3,
    reviews: 200,
    stock: 45,
    brand: 'ABC Store',
    isOffer: true,
    promotion: {
      type: 'SELLER',
      discount: '10%',
      active: true
    },
    electronicsType: 'Accessories',
  },
  {
    id: 'e3',
    name: 'Smart LED Bulb',
    category: 'electronics',
    description: 'Wi-Fi enabled color changing bulb.',
    price: 499,
    originalPrice: 999,
    discount: '50%',
    image: '',
    rating: 4.5,
    reviews: 150,
    stock: 100,
    brand: 'Philips',
    isOffer: false,
    electronicsType: 'Other',
  },
  {
    id: 'e4',
    name: 'Power Bank',
    category: 'electronics',
    description: '10000mAh fast charging power bank.',
    price: 899,
    originalPrice: 1199,
    discount: '25%',
    image: '',
    rating: 4.7,
    reviews: 800,
    stock: 60,
    brand: 'Mi',
    isOffer: false,
    electronicsType: 'Accessories',
  },

  // Mobiles
  {
    id: 'm1',
    name: 'Budget Android Smartphone',
    category: 'mobiles',
    description: '4GB RAM, 64GB Storage, 5000mAh Battery.',
    price: 7999,
    originalPrice: 9999,
    discount: '20%',
    image: '',
    rating: 4.2,
    reviews: 1200,
    stock: 15,
    brand: 'Redmi',
    isOffer: true,
  },
  {
    id: 'm2',
    name: '5G Smartphone',
    category: 'mobiles',
    description: '8GB RAM, 128GB Storage, 120Hz Display.',
    price: 19999,
    originalPrice: 24999,
    discount: '20%',
    image: '',
    rating: 4.5,
    reviews: 900,
    stock: 25,
    brand: 'Samsung',
    isOffer: true,
  },

  // Fashion
  {
    id: 'f1',
    name: "Men's Casual Shirt",
    category: 'fashion',
    description: '100% Cotton, Slim Fit.',
    price: 699,
    originalPrice: 1299,
    discount: '46%',
    image: '',
    rating: 4.1,
    reviews: 300,
    stock: 40,
    brand: 'Highlander',
    isOffer: false,
  },
  {
    id: 'f2',
    name: "Women's Kurti",
    category: 'fashion',
    description: 'Printed A-line Kurta.',
    price: 599,
    originalPrice: 999,
    discount: '40%',
    image: '',
    rating: 4.4,
    reviews: 450,
    stock: 50,
    brand: 'Biba',
    isOffer: true,
  },

  // Home & Kitchen
  {
    id: 'hk1',
    name: 'Mixer Grinder',
    category: 'home-kitchen',
    description: '750W Mixer Grinder with 3 Jars.',
    price: 2999,
    originalPrice: 4500,
    discount: '33%',
    image: '',
    rating: 4.6,
    reviews: 700,
    stock: 10,
    brand: 'Prestige',
    isOffer: true,
  },
  {
    id: 'hk2',
    name: 'Non-stick Pan',
    category: 'home-kitchen',
    description: '24cm Induction Base Non-stick Fry Pan.',
    price: 899,
    originalPrice: 1250,
    discount: '28%',
    image: '',
    rating: 4.5,
    reviews: 200,
    stock: 30,
    brand: 'Pigeon',
    isOffer: false,
  },

  // Hardware
  {
    id: 'hw1',
    name: 'Drill Machine',
    category: 'hardware',
    description: '500W Impact Drill Machine.',
    price: 1599,
    originalPrice: 2199,
    discount: '27%',
    image: '',
    rating: 4.3,
    reviews: 150,
    stock: 25,
    brand: 'Bosch',
    isOffer: true,
  },
  {
    id: 'hw2',
    name: 'Screwdriver Set',
    category: 'hardware',
    description: '31 in 1 Magnetic Screwdriver Set.',
    price: 299,
    originalPrice: 499,
    discount: '40%',
    image: '',
    rating: 4.4,
    reviews: 350,
    stock: 100,
    brand: 'Stanley',
    isOffer: false,
  },

  // Saathapp Product
  {
    id: 's1',
    name: 'Saathapp Classic T-Shirt',
    category: 'saathapp',
    description: 'Official SaathApp Merchandise. 100% Cotton.',
    price: 499,
    originalPrice: 699,
    discount: '28%',
    image: '',
    rating: 4.8,
    reviews: 256,
    stock: 200,
    brand: 'SaathApp Official',
    isOffer: false,
  },
  {
    id: 's2',
    name: 'Saathapp Premium Cap',
    category: 'saathapp',
    description: 'Adjustable, Unisex Cap.',
    price: 299,
    originalPrice: 499,
    discount: '40%',
    image: '',
    rating: 4.7,
    reviews: 153,
    stock: 150,
    brand: 'SaathApp Official',
    isOffer: false,
  },
  // Spiritual / Puja Items
  {
    id: 'sp1',
    name: 'Brass Ganesh Murti',
    category: 'spiritual-puja',
    subCategory: 'idols-murtis',
    spiritualType: 'Idols',
    description: 'Beautifully crafted brass Ganesh idol for your home.',
    price: 899,
    originalPrice: 1299,
    discount: '30%',
    image: '',
    rating: 4.8,
    reviews: 120,
    stock: 25,
    brand: 'ABC Puja Store',
    isOffer: true,
    sellers: [
      { id: 's1', name: 'Delhi Spirituals', location: { lat: 28.6320, lng: 77.2150 }, stock: 0 }, // CP (~0.2 km) - Out of stock
      { id: 's2', name: 'ABC Puja Store', location: { lat: 28.5562, lng: 77.2056 }, stock: 25 },  // Green Park (~8.5 km) - 30-45 mins
      { id: 's3', name: 'Karma Hub', location: { lat: 28.6100, lng: 77.2300 }, stock: 5 }         // India Gate (~3 km) - 30-45 mins
    ]
  },
  {
    id: 'sp2',
    name: 'Premium Agarbatti',
    category: 'spiritual-puja',
    subCategory: 'agarbatti-dhoop',
    spiritualType: 'Puja Samagri',
    description: 'Natural sandalwood incense sticks.',
    price: 99,
    originalPrice: 150,
    discount: '34%',
    image: '',
    rating: 4.6,
    reviews: 450,
    stock: 200,
    brand: 'Cycle',
    isOffer: false,
    sellers: [
      { id: 's4', name: 'Cycle Store', location: { lat: 28.5200, lng: 77.2000 }, stock: 200 }     // Saket (~13 km) - 1-2 days
    ]
  },
  {
    id: 'sp3',
    name: 'Brass Diya',
    category: 'spiritual-puja',
    subCategory: 'diyas-lamps',
    spiritualType: 'Puja Samagri',
    description: 'Traditional brass diya for daily puja.',
    price: 499,
    originalPrice: 699,
    discount: '28%',
    image: '',
    rating: 4.7,
    reviews: 85,
    stock: 50,
    brand: 'ABC Puja Store',
    isOffer: true,
    sellers: [
      { id: 's2', name: 'ABC Puja Store', location: { lat: 28.5562, lng: 77.2056 }, stock: 50 },  // Green Park (~8.5 km)
      { id: 's1', name: 'Delhi Spirituals', location: { lat: 28.6320, lng: 77.2150 }, stock: 10 } // CP (~0.2 km) - Best!
    ]
  },
  {
    id: 'sp4',
    name: 'Diwali Puja Kit',
    category: 'spiritual-puja',
    subCategory: 'puja-kits',
    spiritualType: 'Other',
    festival: 'diwali',
    description: 'Complete kit for Diwali puja essentials.',
    price: 299,
    originalPrice: 400,
    discount: '25%',
    image: '',
    rating: 4.9,
    reviews: 320,
    stock: 150,
    brand: 'SaathApp Official',
    isOffer: true,
    promotion: {
      type: 'FESTIVAL',
      discount: '25%',
      active: true
    },
    sellers: [
      { id: 's5', name: 'SaathApp Warehouse', location: { lat: 28.3949, lng: 77.3110 }, stock: 150 } // Faridabad (~28 km) - 1-2 days
    ]
  },
  {
    id: 'sp5',
    name: 'Pure Camphor (Kapoor)',
    category: 'spiritual-puja',
    subCategory: 'puja-samagri',
    spiritualType: 'Puja Samagri',
    festival: 'navratri',
    description: '100% pure camphor for daily aarti and puja.',
    price: 150,
    originalPrice: 200,
    discount: '25%',
    image: '',
    rating: 4.8,
    reviews: 210,
    stock: 300,
    brand: 'Patanjali',
    isOffer: false,
    sellers: [
      { id: 's6', name: 'Patanjali CP', location: { lat: 28.6330, lng: 77.2180 }, stock: 300 }      // CP (~0.3 km) - 30-45 mins
    ]
  }
];

export const festivals = [
  { id: 'diwali', name: 'Diwali', description: 'Festival of Lights & Laxmi Puja' },
  { id: 'navratri', name: 'Navratri', description: '9 Days of Maa Durga Worship' },
  { id: 'janmashtami', name: 'Janmashtami', description: 'Birth of Lord Krishna' },
  { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', description: 'Welcome Lord Ganesha' },
  { id: 'mahashivratri', name: 'Mahashivratri', description: 'The Great Night of Shiva' },
  { id: 'ram-navami', name: 'Ram Navami', description: 'Birth of Lord Rama' },
  { id: 'chhath-puja', name: 'Chhath Puja', description: 'Worship of the Sun God' },
  { id: 'other', name: 'Other Festivals', description: 'More Festival Collections' }
];

export const categories = [
  { id: 'spiritual-puja', name: 'Spiritual / Puja Items' },
  { id: 'grocery', name: 'Grocery' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'mobiles', name: 'Mobiles' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home-kitchen', name: 'Home & Kitchen' },
  { id: 'hardware', name: 'Hardware' },
  { id: 'saathapp', name: 'Saathapp Product' },
];

export const subcategories = {
  'spiritual-puja': [
    { id: 'puja-samagri', name: 'Puja Samagri', image: '' },
    { id: 'diyas-lamps', name: 'Diyas & Lamps', image: '' },
    { id: 'agarbatti-dhoop', name: 'Agarbatti & Dhoop', image: '' },
    { id: 'puja-essentials', name: 'Puja Essentials', image: '' },
    { id: 'idols-murtis', name: 'Idols & Murtis', image: '' },
    { id: 'rudraksha-mala', name: 'Rudraksha & Mala', image: '' },
    { id: 'religious-books', name: 'Religious Books', image: '' },
    { id: 'festival-essentials', name: 'Festival Essentials', image: '' },
    { id: 'puja-kits', name: 'Puja Kits & Combos', image: '' },
    { id: 'spiritual-gifts', name: 'Spiritual Gifts', image: '' }
  ],
  'grocery': [
    { id: 'fruits-vegetables', name: 'Fruits & Vegetables', image: '' },
    { id: 'dairy-bakery', name: 'Dairy & Bakery', image: '' },
    { id: 'rice-atta-grains', name: 'Rice, Atta & Grains', image: '' },
    { id: 'dal-pulses', name: 'Dal & Pulses', image: '' },
    { id: 'edible-oils-ghee', name: 'Edible Oils & Ghee', image: '' },
    { id: 'spices-masala', name: 'Spices & Masala', image: '' },
    { id: 'snacks-biscuits', name: 'Snacks & Biscuits', image: '' },
    { id: 'beverages', name: 'Beverages', image: '' },
    { id: 'packaged-food', name: 'Packaged Food', image: '' },
    { id: 'dry-fruits-nuts', name: 'Dry Fruits & Nuts', image: '' },
    { id: 'breakfast-cereals', name: 'Breakfast & Cereals', image: '' },
    { id: 'instant-ready-to-eat', name: 'Instant & Ready-to-Eat', image: '' },
    { id: 'sweets', name: 'Sweets', image: '' },
    { id: 'regional-local-foods', name: 'Regional / Local Foods', image: '' },
    { id: 'premium-grocery', name: 'Premium Grocery', image: '' }
  ]
};

// Sync with Admin Dashboard localStorage if available
if (typeof window !== 'undefined') {
  try {
    const adminProducts = window.localStorage.getItem('saathapp_admin_products');
    if (adminProducts) {
      const parsedRows = JSON.parse(adminProducts);
      parsedRows.forEach((row, index) => {
        const data = row[6] || {};
        // Check if it's already in products
        const existingIndex = products.findIndex(p => p.name === data.product);
        
        let gTier = 'Normal';
        if (data.groceryTier) {
          gTier = data.groceryTier.toLowerCase() === 'premium' ? 'Premium' : 'Normal';
        }

        const promoActive = data.promoActive === 'Yes';
        const promoType = data.promoType && data.promoType !== 'None' ? data.promoType : null;
        let validPromo = promoActive && promoType;
        
        // Evaluate condition on client side just in case (e.g. mock override)
        if (validPromo) {
          if (promoType === 'PREMIUM_GROCERY_DEAL' && (data.category?.toLowerCase() !== 'grocery' || gTier !== 'Premium')) validPromo = false;
          if (promoType === 'NORMAL_GROCERY_DEAL' && (data.category?.toLowerCase() !== 'grocery' || gTier === 'Premium')) validPromo = false;
        }

        const mappedProduct = {
          id: existingIndex >= 0 ? products[existingIndex].id : `admin-${Date.now()}-${index}`,
          name: data.product,
          category: data.category?.toLowerCase() || 'grocery',
          groceryTier: gTier,
          subCategory: data.subCategory || '',
          electronicsType: data.electronicsType || '',
          spiritualType: data.spiritualType || '',
          description: data.description || 'Admin updated product',
          price: Number(String(data.price || '').replace(/[^0-9.]/g, '') || 0),
          originalPrice: Number(String(data.price || '').replace(/[^0-9.]/g, '') || 0) * 1.2,
          discount: '',
          image: existingIndex >= 0 ? products[existingIndex].image : '',
          rating: existingIndex >= 0 ? products[existingIndex].rating : 4.5,
          reviews: existingIndex >= 0 ? products[existingIndex].reviews : 0,
          stock: Number(String(data.stock || '').replace(/[^0-9]/g, '') || 10),
          brand: data.seller || (existingIndex >= 0 ? products[existingIndex].brand : 'Admin'),
          isOffer: validPromo,
          promotion: validPromo ? {
            type: promoType,
            discount: data.promoDiscount || '',
            active: true
          } : null
        };
        mappedProduct.discount = mappedProduct.promotion ? mappedProduct.promotion.discount : '';

        const isActive = data.status === 'Active' || data.status === 'Live';

        if (existingIndex >= 0) {
          if (isActive) {
            // Overwrite existing mock product
            products[existingIndex] = { ...products[existingIndex], ...mappedProduct };
          } else {
            // Remove it if it's pending/rejected
            products.splice(existingIndex, 1);
          }
        } else if (isActive && data.product && data.category) {
          // Add new active product
          products.unshift(mappedProduct);
        }
      });
    }
  } catch (e) {
    console.warn('Could not sync admin products', e);
  }
}
