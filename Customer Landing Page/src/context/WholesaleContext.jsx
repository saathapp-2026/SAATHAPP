import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateOnboardingFee as calcFeePricing, checkCapitalEligibility, LOCATION_FEE_RATES } from '../utils/wholesaleOnboardingPricing';

const WholesaleContext = createContext();

export const ONBOARDING_FEE_MATRIX = LOCATION_FEE_RATES;

export const calculateOnboardingFee = (cityType = 'Tier 2 City', category = 'FMCG', businessCapital = 2500000) => {
  return calcFeePricing({ cityType, businessCategory: category, businessCapital });
};

export const initialWholesaleForm = {
  // Phase 1 / Step 2: Auth
  mobileNumber: '9128842027',
  otp: '123456',
  isOtpVerified: true,
  emailLogin: 'wholesale@saathapp.in',

  // Phase 2 / Step 3: Owner Details
  fullName: 'Rakesh Kumar',
  profilePhoto: null,
  profilePhotoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
  ownerMobile: '9128842027',
  ownerEmail: 'rakesh.kumar@saathapp.in',
  designation: 'Owner',

  // Phase 3 / Step 4: Business Info
  businessName: 'SaathApp Wholesale & Distribution Pvt Ltd',
  businessType: 'Wholesaler',
  businessCategory: 'FMCG',
  cityType: 'Tier 2 City', // Options: 'Village', 'Tier 3 Town', 'Tier 2 City', 'Tier 1 Metro'
  businessCapital: 2500000, // Minimum required: ₹10,00,000
  brandName: 'SaathApp Prime',
  yearsInBusiness: '8',
  companyDescription: 'Leading B2B distributor of FMCG, grocery, and household goods serving over 2,500+ verified retailers across North India.',
  numberOfEmployees: '51-200',
  website: 'https://wholesale.saathapp.in',

  // Phase 4 / Step 5: Address & Warehouse
  gpsLocation: { lat: 28.5562, lng: 77.2023, address: 'Green Park Main, New Delhi' },
  state: 'Delhi',
  district: 'South Delhi',
  city: 'New Delhi',
  pincode: '110016',
  registeredAddress: 'Plot 42, Okhla Industrial Area Phase-3, New Delhi - 110020',
  warehouseAddress: 'Building B, Central Logistics Hub, NH-8, Gurgaon, Haryana - 122001',
  sameAsRegistered: false,
  pickupAddress: 'Gate 4, Okhla Warehouse Complex, New Delhi - 110020',
  loadingPoint: 'Dock #3 & #4',
  landmark: 'Near Okhla Metro Station',
  numberOfWarehouses: 3,
  additionalWarehouses: [
    { name: 'Delhi NCR Hub', city: 'New Delhi', area: '25,000 sq ft', manager: 'Amit Singh' },
    { name: 'Mumbai Express Depot', city: 'Bhiwandi, Thane', area: '40,000 sq ft', manager: 'Vikram Mehta' },
    { name: 'Kolkata East Logistics', city: 'Dankuni, Hooghly', area: '18,000 sq ft', manager: 'Subhash Roy' },
  ],

  // Phase 5 / Step 6: Coverage & Logistics
  serviceCoverageArea: 'PAN India',
  logisticsType: 'Third-Party Logistics',
  fleetDetails: '12 Container Trucks, 5 Temp-Controlled Vans',
  dailyDeliveryCapacity: '500+ Bulk Orders / Day',

  // Phase 6 / Step 7: Products & Inventory Info
  productCategories: ['Grocery & Staples', 'FMCG & Personal Care', 'Packaged Snacks', 'Beverages & Soft Drinks'],
  totalProductsCount: 2450,
  minOrderQuantity: 50,
  monthlyProductionCapacity: '50,000 Units',
  monthlySupplyCapacity: '1,00,000 Units',
  stockAvailability: 'In Stock (24hr Dispatch)',
  bulkPricingSupport: true,
  pricingTiers: [
    { minQty: 50, maxQty: 200, discount: '10%' },
    { minQty: 201, maxQty: 500, discount: '18%' },
    { minQty: 501, maxQty: 2000, discount: '25%' },
  ],
  productCatalogueFile: { name: 'SaathApp_Catalog_2026.pdf', size: '4.2 MB' },
  productImages: [
    { name: 'rice_bulk_pack.png', size: '1.2 MB' },
    { name: 'oil_cases.png', size: '980 KB' },
  ],

  // Phase 7 / Step 8: Documents
  documents: {
    aadhaar: { status: 'Verified', fileName: 'Aadhaar_Card_Rakesh.pdf', date: '2026-08-01' },
    pan: { status: 'Verified', fileName: 'PAN_AAACS1234F.pdf', date: '2026-08-01' },
    gst: { status: 'Verified', fileName: 'GSTIN_07AAACS1234F1Z5.pdf', date: '2026-08-01' },
    tradeLicense: { status: 'Verified', fileName: 'Trade_License_2026.pdf', date: '2026-08-01' },
    msme: { status: 'Verified', fileName: 'MSME_Udyam_Reg.pdf', date: '2026-08-01' },
    iec: { status: 'Optional', fileName: null, date: null },
    fssai: { status: 'Verified', fileName: 'FSSAI_Lic_11223344556677.pdf', date: '2026-08-01' },
    drugLicense: { status: 'Not Applicable', fileName: null, date: null },
    factoryLicense: { status: 'Optional', fileName: null, date: null },
    companyRegistration: { status: 'Verified', fileName: 'COI_SaathApp_Wholesale.pdf', date: '2026-08-01' },
    warehousePhotos: { status: 'Uploaded', fileName: 'warehouse_front_view.jpg', date: '2026-08-01' },
    factoryPhotos: { status: 'Optional', fileName: null, date: null },
    businessLogo: { status: 'Uploaded', fileName: 'saathapp_logo.jpeg', date: '2026-08-01' },
    ownerSelfie: { status: 'Verified', fileName: 'owner_photo_id.jpg', date: '2026-08-01' },
  },

  // Phase 8 / Step 9: Bank & Settlement
  accountHolderName: 'SaathApp Wholesale & Distribution Pvt Ltd',
  bankName: 'HDFC Bank',
  accountNumber: '50200049182394',
  confirmAccountNumber: '50200049182394',
  ifscCode: 'HDFC0000240',
  upiId: 'saathappwholesale@hdfcbank',
  settlementPreference: 'Daily',

  // Phase 9 / Step 10: Business Operations
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  workingHours: '09:00 AM - 08:00 PM',
  orderProcessingTime: '24 Hours',
  returnPolicy: '7-Day Return for Damaged / Expired Goods',
  replacementPolicy: 'Instant Replacement on Transit Damage',
  cancellationPolicy: 'Cancellation Allowed Before Dispatch',
  gstBilling: true,
  invoiceSupport: true,

  // Phase 10 / Step 11: Mandatory One-Time Onboarding Fee
  onboardingFeeAmount: 120000,
  onboardingPaymentCompleted: true,
  onboardingPaymentMethod: 'UPI / NetBanking',
  onboardingPaymentId: 'PAY-WHL-984201',
  onboardingPaymentDate: '2026-08-03',
  onboardingValidityExpiry: '2028-08-03 (Valid for 2 Years)',
  onboardingPaymentUpi: 'saathapp@upi',

  // Phase 11 / Step 12: Optional Monthly Membership
  selectedPlan: 'Growth', // 'Free' (₹0), 'Starter' (₹799), 'Growth' (₹2499), 'Enterprise' (₹4999)
  isMembershipOptionalSelected: true,
  welcomeKitEligible: true,

  // Phase 12 / Step 13: Terms & Agreement
  acceptedTerms: true,
  digitalAgreementSigned: true,
  signatureName: 'Rakesh Kumar',

  // Phase 13 / Step 14: Status & Review
  applicationStatus: 'Approved', // Options: 'Pending', 'Document Verification', 'GST Verification', 'Business Verification', 'Warehouse Verification', 'Bank Verification', 'Approved', 'Rejected'
  submissionDate: '2026-08-03',
};

export const initialWholesaleDashboardData = {
  kpis: {
    totalOrders: 1245,
    pendingOrders: 128,
    completedOrders: 1117,
    monthlyRevenue: 1245250,
    walletBalance: 875000,
    activeBuyers: 850,
    productsListed: 2450,
    storeRating: 4.6,
    warehouseCount: 3,
  },
  recentOrders: [
    { id: 'ORD-9842', buyer: 'Ramesh Supermarket', category: 'FMCG', items: 45, amount: 125000, status: 'Delivered', date: 'Today, 10:20 AM' },
    { id: 'ORD-9841', buyer: 'Shree Traders', category: 'Grocery', items: 120, amount: 95000, status: 'Processing', date: 'Today, 09:15 AM' },
    { id: 'ORD-9840', buyer: 'GreenMart Store', category: 'FMCG', items: 30, amount: 78500, status: 'Confirmed', date: 'Today, 08:30 AM' },
    { id: 'ORD-9839', buyer: 'Apna General Hub', category: 'Packaged Food', items: 85, amount: 45000, status: 'Cancelled', date: 'Yesterday, 06:40 PM' },
    { id: 'ORD-9838', buyer: 'Kumar Enterprises', category: 'Electrical', items: 210, amount: 110000, status: 'Returned', date: 'Yesterday, 04:10 PM' },
  ],
  topSellingCategories: [
    { name: 'FMCG & Essentials', amount: 425000, share: '34%' },
    { name: 'Grocery & Staples', amount: 315000, share: '25%' },
    { name: 'Confectionery', amount: 210000, share: '17%' },
    { name: 'Electrical Goods', amount: 185000, share: '15%' },
    { name: 'Construction Supplies', amount: 110250, share: '9%' },
  ],
  inventorySummary: [
    { name: 'Cement 50kg Bag', stock: 1250, unit: 'Bags', status: 'In Stock', warehouse: 'Delhi NCR Hub' },
    { name: 'Tata Salt 1kg Pack', stock: 18, unit: 'Cases', status: 'Low Stock', warehouse: 'Delhi NCR Hub' },
    { name: 'Fortune Sunflower Oil 15L', stock: 0, unit: 'Tins', status: 'Out of Stock', warehouse: 'Mumbai Express' },
    { name: 'Basmati Rice 25kg', stock: 820, unit: 'Bags', status: 'In Stock', warehouse: 'Kolkata East' },
  ],
  buyersList: [
    { id: 'B-101', name: 'Ramesh Supermarket', type: 'Retail Seller', city: 'Delhi', ordersCount: 42, totalSpent: 485000, rating: 4.9 },
    { id: 'B-102', name: 'Shree Traders', type: 'Dealer', city: 'Gurgaon', ordersCount: 28, totalSpent: 390000, rating: 4.8 },
    { id: 'B-103', name: 'GreenMart Store', type: 'Distributor', city: 'Noida', ordersCount: 65, totalSpent: 920000, rating: 5.0 },
    { id: 'B-104', name: 'Apna Retail Chain', type: 'Business', city: 'Faridabad', ordersCount: 19, totalSpent: 210000, rating: 4.5 },
  ],
};

export function WholesaleProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    if (typeof window === 'undefined') return initialWholesaleForm;
    try {
      const saved = localStorage.getItem('saathapp_wholesale_form');
      return saved ? JSON.parse(saved) : initialWholesaleForm;
    } catch {
      return initialWholesaleForm;
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(initialWholesaleDashboardData);
  const [toasts, setToasts] = useState([]);
  const [lastSaved, setLastSaved] = useState(new Date().toLocaleTimeString());

  // Auto save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('saathapp_wholesale_form', JSON.stringify(formData));
        setLastSaved(new Date().toLocaleTimeString());
      } catch (e) {
        console.error('Failed to save wholesale form to storage', e);
      }
    }
  }, [formData]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const saveDraft = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('saathapp_wholesale_form', JSON.stringify(formData));
      addToast('Application draft saved successfully!', 'success');
    }
  };

  const resetForm = () => {
    setFormData(initialWholesaleForm);
    localStorage.removeItem('saathapp_wholesale_form');
    addToast('Form reset to default sample values.', 'info');
  };

  return (
    <WholesaleContext.Provider
      value={{
        formData,
        setFormData,
        updateFormData,
        currentStep,
        setCurrentStep,
        activeTab,
        setActiveTab,
        dashboardData,
        setDashboardData,
        saveDraft,
        resetForm,
        toasts,
        addToast,
        removeToast,
        lastSaved,
      }}
    >
      {children}
    </WholesaleContext.Provider>
  );
}

export function useWholesale() {
  const ctx = useContext(WholesaleContext);
  if (!ctx) {
    throw new Error('useWholesale must be used within a WholesaleProvider');
  }
  return ctx;
}
