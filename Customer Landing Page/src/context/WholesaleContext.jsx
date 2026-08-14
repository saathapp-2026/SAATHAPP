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
  acceptedTerms: false,
  digitalAgreementSigned: false,
  signatureName: '',

  // Phase 13 / Step 14: Status & Review
  applicationStatus: 'Pending', // Options: 'Pending', 'Document Verification', 'GST Verification', 'Business Verification', 'Warehouse Verification', 'Bank Verification', 'Approved', 'Rejected'
  submissionDate: '',
};

export const initialWholesaleDashboardData = {
  kpis: {
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    monthlyRevenue: 0,
    walletBalance: 0,
    activeBuyers: 0,
    productsListed: 0,
    storeRating: 0,
    warehouseCount: 0,
  },
  recentOrders: [],
  topSellingCategories: [],
  inventorySummary: [],
  buyersList: [],
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
