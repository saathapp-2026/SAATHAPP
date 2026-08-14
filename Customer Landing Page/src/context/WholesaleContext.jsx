import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateOnboardingFee as calcFeePricing, checkCapitalEligibility, LOCATION_FEE_RATES } from '../utils/wholesaleOnboardingPricing';

const WholesaleContext = createContext();

export const ONBOARDING_FEE_MATRIX = LOCATION_FEE_RATES;

export const calculateOnboardingFee = (cityType = 'Tier 2 City', category = 'FMCG', businessCapital = 2500000) => {
  return calcFeePricing({ cityType, businessCategory: category, businessCapital });
};

export const initialWholesaleForm = {
  // Phase 1 / Step 2: Auth
  mobileNumber: '',
  otp: '',
  isOtpVerified: false,
  emailLogin: '',

  // Phase 2 / Step 3: Owner Details
  fullName: '',
  profilePhoto: null,
  profilePhotoUrl: '',
  ownerMobile: '',
  ownerEmail: '',
  designation: 'Owner',

  // Phase 3 / Step 4: Business Info
  businessName: '',
  businessType: 'Wholesaler',
  businessCategory: 'FMCG',
  cityType: 'Tier 2 City', // Options: 'Village', 'Tier 3 Town', 'Tier 2 City', 'Tier 1 Metro'
  businessCapital: 2500000, // Minimum required: ₹10,00,000
  brandName: '',
  yearsInBusiness: '',
  companyDescription: '',
  numberOfEmployees: '',
  website: '',

  // Phase 4 / Step 5: Address & Warehouse
  gpsLocation: null,
  state: '',
  district: '',
  city: '',
  pincode: '',
  registeredAddress: '',
  warehouseAddress: '',
  sameAsRegistered: false,
  pickupAddress: '',
  loadingPoint: '',
  landmark: '',
  numberOfWarehouses: 1,
  additionalWarehouses: [],

  // Phase 5 / Step 6: Coverage & Logistics
  serviceCoverageArea: 'Local',
  logisticsType: 'Self Logistics',
  fleetDetails: '',
  dailyDeliveryCapacity: '',

  // Phase 6 / Step 7: Products & Inventory Info
  productCategories: [],
  totalProductsCount: 0,
  minOrderQuantity: 1,
  monthlyProductionCapacity: '',
  monthlySupplyCapacity: '',
  stockAvailability: 'In Stock',
  bulkPricingSupport: false,
  pricingTiers: [],
  productCatalogueFile: null,
  productImages: [],

  // Phase 7 / Step 8: Documents
  documents: {
    aadhaar: { status: 'Pending', fileName: null, date: null },
    pan: { status: 'Pending', fileName: null, date: null },
    gst: { status: 'Pending', fileName: null, date: null },
    tradeLicense: { status: 'Optional', fileName: null, date: null },
    msme: { status: 'Optional', fileName: null, date: null },
    iec: { status: 'Optional', fileName: null, date: null },
    fssai: { status: 'Optional', fileName: null, date: null },
    drugLicense: { status: 'Not Applicable', fileName: null, date: null },
    factoryLicense: { status: 'Optional', fileName: null, date: null },
    companyRegistration: { status: 'Optional', fileName: null, date: null },
    warehousePhotos: { status: 'Pending', fileName: null, date: null },
    factoryPhotos: { status: 'Optional', fileName: null, date: null },
    businessLogo: { status: 'Optional', fileName: null, date: null },
    ownerSelfie: { status: 'Pending', fileName: null, date: null },
  },

  // Phase 8 / Step 9: Bank & Settlement
  accountHolderName: '',
  bankName: '',
  accountNumber: '',
  confirmAccountNumber: '',
  ifscCode: '',
  upiId: '',
  settlementPreference: 'Weekly',

  // Phase 9 / Step 10: Business Operations
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  workingHours: '09:00 AM - 07:00 PM',
  orderProcessingTime: '24 Hours',
  returnPolicy: '',
  replacementPolicy: '',
  cancellationPolicy: '',
  gstBilling: true,
  invoiceSupport: true,

  // Phase 10 / Step 11: Mandatory One-Time Onboarding Fee
  onboardingFeeAmount: 0,
  onboardingPaymentCompleted: false,
  onboardingPaymentMethod: '',
  onboardingPaymentId: '',
  onboardingPaymentDate: '',
  onboardingValidityExpiry: '',
  onboardingPaymentUpi: '',

  // Phase 11 / Step 12: Optional Monthly Membership
  selectedPlan: 'Free', // 'Free' (₹0), 'Starter' (₹799), 'Growth' (₹2499), 'Enterprise' (₹4999)
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
