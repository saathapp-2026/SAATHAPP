import React, { createContext, useContext, useState, useEffect } from 'react';

const DeliveryContext = createContext();

// Fixed Delivery Partner Onboarding Fees by Location Category
export const FIXED_DELIVERY_LOCATION_FEES = {
  'Village / Rural': 500,
  'Village': 500,
  'Rural': 500,

  'Tier 3 City': 1000,
  'Tier 3 Town': 1000,
  'Tier 3': 1000,

  'Tier 2 City': 1500,
  'Tier 2': 1500,

  'Tier 1 City': 2000,
  'Tier 1': 2000,

  'Metro City': 2500,
  'Tier 1 Metro': 2500,
  'Metro': 2500,
};

export const normalizeDeliveryLocationTier = (tier) => {
  if (!tier) return 'Tier 2 City';
  const str = String(tier).toLowerCase();
  if (str.includes('village') || str.includes('rural')) return 'Village / Rural';
  if (str.includes('tier 3') || str.includes('tier3') || str.includes('town')) return 'Tier 3 City';
  if (str.includes('metro')) return 'Metro City';
  if (str.includes('tier 1') || str.includes('tier1')) return 'Tier 1 City';
  if (str.includes('tier 2') || str.includes('tier2')) return 'Tier 2 City';
  return 'Tier 2 City';
};

export const DELIVERY_FEE_MATRIX = FIXED_DELIVERY_LOCATION_FEES;

export const calculateDeliveryOnboardingFee = (locationTier, _deliveryCategory) => {
  const normTier = normalizeDeliveryLocationTier(locationTier);
  const fee = FIXED_DELIVERY_LOCATION_FEES[normTier] || 1500;
  return {
    fee,
    amount: fee,
    range: `₹${fee.toLocaleString('en-IN')}`,
    comm: 'Standard Payout',
    locationTier: normTier,
  };
};

export const initialDeliveryForm = {
  // Step 2: Auth
  mobileNumber: '',
  otp: '',
  isOtpVerified: false,

  // Step 3: Rider Profile
  fullName: '',
  profilePhotoUrl: '',
  gender: 'Male',
  dob: '',
  email: '',
  emergencyContact: '',

  // Step 4: Location Tier & Vehicle Selection
  locationTier: 'Tier 2 City', // 'Village', 'Tier 3 Town', 'Tier 2 City', 'Tier 1 Metro'
  city: '',
  state: '',
  pincode: '',
  vehicleType: 'Motorcycle / Scooter', // 'Walking', 'Bicycle', 'Electric Bicycle', 'Motorcycle / Scooter', 'Electric Scooter', 'Three-Wheeler', 'Small Commercial Vehicle'
  vehicleNumber: '',

  // Step 5: Delivery Categories Covered & Service Radius
  deliveryCategories: ['Grocery Delivery', 'Food Delivery', 'Medicine Delivery', 'Parcel Delivery'],
  deliveryTypeMode: 'Multi-Service Delivery',
  preferredWorkingMode: 'Full-Time', // 'Full-Time', 'Part-Time', 'Weekend Rider'
  serviceRadiusKm: '5 km',

  // Step 6: Document Vault Uploads
  documents: {
    aadhaar: { status: 'Pending', fileName: null, date: null },
    pan: { status: 'Pending', fileName: null, date: null },
    drivingLicence: { status: 'Pending', fileName: null, date: null },
    rcBook: { status: 'Pending', fileName: null, date: null },
    vehicleInsurance: { status: 'Pending', fileName: null, date: null },
    pucCertificate: { status: 'Optional', fileName: null, date: null },
    riderSelfie: { status: 'Pending', fileName: null, date: null },
    bankPassbook: { status: 'Pending', fileName: null, date: null },
  },

  // Step 7: Bank & Payout
  accountHolderName: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  upiId: '',
  payoutFrequency: 'Daily Payout',

  // Step 8: Mandatory One-Time Onboarding Fee
  onboardingFeeAmount: 0,
  onboardingPaymentCompleted: false,
  onboardingPaymentMethod: '',
  onboardingPaymentId: '',
  onboardingPaymentDate: '',
  onboardingValidityExpiry: '',

  // Step 9: Equipment & Merchandise Store (Optional)
  orderedEquipment: [],

  // Step 10: Legal Terms
  acceptedTerms: false,
  digitalSignature: '',

  // Step 11: Verification Status
  applicationStatus: 'Pending', // 'Pending', 'Document Verification', 'DL Check', 'RC Check', 'Bank Verification', 'Approved'
  submissionDate: '',
};

export const initialDeliveryDashboardData = {
  kpis: {
    todayEarnings: 0,
    weeklyEarnings: 0,
    totalDeliveries: 0,
    todayCompleted: 0,
    walletBalance: 0,
    riderRating: 0,
    acceptanceRate: '0%',
    onTimeRate: '0%',
  },
  activeOrder: null,
  recentDeliveries: [],
  completedHistory: [],
};

export function DeliveryProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    if (typeof window === 'undefined') return initialDeliveryForm;
    try {
      const saved = localStorage.getItem('saathapp_delivery_form');
      return saved ? JSON.parse(saved) : initialDeliveryForm;
    } catch {
      return initialDeliveryForm;
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(initialDeliveryDashboardData);
  const [toasts, setToasts] = useState([]);
  const [lastSaved, setLastSaved] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('saathapp_delivery_form', JSON.stringify(formData));
        setLastSaved(new Date().toLocaleTimeString());
      } catch (e) {
        console.error('Failed to save delivery form to storage', e);
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
      localStorage.setItem('saathapp_delivery_form', JSON.stringify(formData));
      addToast('Rider application draft saved!', 'success');
    }
  };

  const resetForm = () => {
    setFormData(initialDeliveryForm);
    localStorage.removeItem('saathapp_delivery_form');
    addToast('Form reset to default sample values.', 'info');
  };

  return (
    <DeliveryContext.Provider
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
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const ctx = useContext(DeliveryContext);
  if (!ctx) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return ctx;
}
