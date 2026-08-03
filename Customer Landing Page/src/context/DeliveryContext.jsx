import React, { createContext, useContext, useState, useEffect } from 'react';

const DeliveryContext = createContext();

// Delivery Partner Onboarding Fee Matrix based on PDF Section 5
export const DELIVERY_FEE_MATRIX = {
  'Village': {
    'Bicycle Delivery': { fee: 550, range: '₹550', comm: 'Standard Payout' },
    'Walking Delivery': { fee: 550, range: '₹550', comm: 'Standard Payout' },
    'Motorcycle Delivery': { fee: 750, range: '₹750', comm: 'Standard Payout' },
    'Grocery Delivery': { fee: 750, range: '₹750', comm: 'Standard Payout' },
    'Medicine Delivery': { fee: 750, range: '₹750', comm: 'Standard Payout' },
    'Parcel Delivery': { fee: 850, range: '₹850', comm: 'Standard Payout' },
    'Multi-Service Delivery': { fee: 1000, range: '₹1,000', comm: 'Standard Payout' },
    'Others': { fee: 750, range: '₹750', comm: 'Standard Payout' },
  },
  'Tier 3 Town': {
    'Bicycle Delivery': { fee: 650, range: '₹650', comm: 'Standard Payout' },
    'Walking Delivery': { fee: 650, range: '₹650', comm: 'Standard Payout' },
    'Motorcycle Delivery': { fee: 850, range: '₹850', comm: 'Standard Payout' },
    'Grocery Delivery': { fee: 850, range: '₹850', comm: 'Standard Payout' },
    'Medicine Delivery': { fee: 850, range: '₹850', comm: 'Standard Payout' },
    'Parcel Delivery': { fee: 1000, range: '₹1,000', comm: 'Standard Payout' },
    'Multi-Service Delivery': { fee: 1200, range: '₹1,200', comm: 'Standard Payout' },
    'Others': { fee: 850, range: '₹850', comm: 'Standard Payout' },
  },
  'Tier 2 City': {
    'Bicycle Delivery': { fee: 850, range: '₹850', comm: 'Standard Payout' },
    'Walking Delivery': { fee: 850, range: '₹850', comm: 'Standard Payout' },
    'Motorcycle Delivery': { fee: 1100, range: '₹1,100', comm: 'Standard Payout' },
    'Grocery Delivery': { fee: 1100, range: '₹1,100', comm: 'Standard Payout' },
    'Medicine Delivery': { fee: 1100, range: '₹1,100', comm: 'Standard Payout' },
    'Parcel Delivery': { fee: 1300, range: '₹1,300', comm: 'Standard Payout' },
    'Multi-Service Delivery': { fee: 1500, range: '₹1,500', comm: 'Standard Payout' },
    'Others': { fee: 1100, range: '₹1,100', comm: 'Standard Payout' },
  },
  'Tier 1 Metro': {
    'Bicycle Delivery': { fee: 1000, range: '₹1,000', comm: 'Standard Payout' },
    'Walking Delivery': { fee: 1000, range: '₹1,000', comm: 'Standard Payout' },
    'Motorcycle Delivery': { fee: 1500, range: '₹1,500', comm: 'Standard Payout' },
    'Grocery Delivery': { fee: 1500, range: '₹1,500', comm: 'Standard Payout' },
    'Medicine Delivery': { fee: 1500, range: '₹1,500', comm: 'Standard Payout' },
    'Parcel Delivery': { fee: 1800, range: '₹1,800', comm: 'Standard Payout' },
    'Multi-Service Delivery': { fee: 2000, range: '₹2,000', comm: 'Standard Payout' },
    'Others': { fee: 1500, range: '₹1,500', comm: 'Standard Payout' },
  },
};

export const calculateDeliveryOnboardingFee = (locationTier, deliveryCategory) => {
  const tierData = DELIVERY_FEE_MATRIX[locationTier] || DELIVERY_FEE_MATRIX['Tier 2 City'];
  const catData = tierData[deliveryCategory] || tierData['Motorcycle Delivery'] || { fee: 1100, range: '₹1,100', comm: 'Standard Payout' };
  return catData;
};

export const initialDeliveryForm = {
  // Step 2: Auth
  mobileNumber: '9128842027',
  otp: '123456',
  isOtpVerified: true,

  // Step 3: Rider Profile
  fullName: 'Vikram Singh',
  profilePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  gender: 'Male',
  dob: '1998-05-14',
  email: 'vikram.delivery@saathapp.in',
  emergencyContact: '9876543210',

  // Step 4: Location Tier & Vehicle Selection
  locationTier: 'Tier 2 City', // 'Village', 'Tier 3 Town', 'Tier 2 City', 'Tier 1 Metro'
  city: 'Patna',
  state: 'Bihar',
  pincode: '800001',
  vehicleType: 'Motorcycle / Scooter', // 'Walking', 'Bicycle', 'Electric Bicycle', 'Motorcycle / Scooter', 'Electric Scooter', 'Three-Wheeler', 'Small Commercial Vehicle'
  vehicleNumber: 'BR-01-AB-9842',

  // Step 5: Delivery Categories Covered & Service Radius
  deliveryCategories: ['Grocery Delivery', 'Food Delivery', 'Medicine Delivery', 'Parcel Delivery'],
  deliveryTypeMode: 'Multi-Service Delivery',
  preferredWorkingMode: 'Full-Time', // 'Full-Time', 'Part-Time', 'Weekend Rider'
  serviceRadiusKm: '10 km',

  // Step 6: Document Vault Uploads
  documents: {
    aadhaar: { status: 'Verified', fileName: 'Aadhaar_Vikram.pdf', date: '2026-08-01' },
    pan: { status: 'Verified', fileName: 'PAN_VIKPS9842.pdf', date: '2026-08-01' },
    drivingLicence: { status: 'Verified', fileName: 'DL_BR01201984210.pdf', date: '2026-08-01' },
    rcBook: { status: 'Verified', fileName: 'RC_BR01AB9842.pdf', date: '2026-08-01' },
    vehicleInsurance: { status: 'Verified', fileName: 'Insurance_Motor_2026.pdf', date: '2026-08-01' },
    pucCertificate: { status: 'Verified', fileName: 'PUC_Valid_2026.pdf', date: '2026-08-01' },
    riderSelfie: { status: 'Verified', fileName: 'rider_selfie.jpg', date: '2026-08-01' },
    bankPassbook: { status: 'Verified', fileName: 'Passbook_SBI.pdf', date: '2026-08-01' },
  },

  // Step 7: Bank & Payout
  accountHolderName: 'Vikram Singh',
  bankName: 'State Bank of India',
  accountNumber: '38920194820',
  ifscCode: 'SBIN0001234',
  upiId: 'vikram.rider@sbi',
  payoutFrequency: 'Daily Payout',

  // Step 8: Mandatory One-Time Onboarding Fee
  onboardingFeeAmount: 1100,
  onboardingPaymentCompleted: true,
  onboardingPaymentMethod: 'UPI / QR',
  onboardingPaymentId: 'PAY-RIDER-984201',
  onboardingPaymentDate: '2026-08-03',
  onboardingValidityExpiry: '2028-08-03 (Valid for 2 Years)',

  // Step 9: Equipment & Merchandise Store (Optional)
  orderedEquipment: ['Branded Delivery T-Shirt', 'Reflective Safety Vest', 'ISI Certified Helmet'],

  // Step 10: Legal Terms
  acceptedTerms: true,
  digitalSignature: 'Vikram Singh',

  // Step 11: Verification Status
  applicationStatus: 'Approved', // 'Pending', 'Document Verification', 'DL Check', 'RC Check', 'Bank Verification', 'Approved'
  submissionDate: '2026-08-03',
};

export const initialDeliveryDashboardData = {
  kpis: {
    todayEarnings: 1450,
    weeklyEarnings: 8900,
    totalDeliveries: 342,
    todayCompleted: 14,
    walletBalance: 2450,
    riderRating: 4.9,
    acceptanceRate: '98%',
    onTimeRate: '99%',
  },
  activeOrder: {
    id: 'DEL-98420',
    type: 'Grocery & Medicine Delivery',
    storeName: 'SaathApp Express Hub',
    pickupAddress: 'Shop #12, Central Plaza, Patna - 800001',
    customerName: 'Anil Kumar',
    dropAddress: 'Flat 402, Royal Residency, Boring Road, Patna',
    distanceKm: '3.2 km',
    payout: 120,
    otp: '4820',
    status: 'In Transit',
  },
  recentDeliveries: [
    { id: 'DEL-98419', store: 'Freshmart Grocery', amount: 85, status: 'Delivered', time: '10:45 AM', customer: 'Sujata Devi' },
    { id: 'DEL-98418', store: 'MedPlus Pharmacy', amount: 110, status: 'Delivered', time: '09:30 AM', customer: 'Rajesh Verma' },
    { id: 'DEL-98417', store: 'Bakehouse Cafe', amount: 95, status: 'Delivered', time: 'Yesterday, 08:15 PM', customer: 'Pooja Sharma' },
  ],
  completedHistory: [
    { id: 'DEL-98419', type: 'Grocery Delivery', customer: 'Sujata Devi', distance: '2.4 km', payout: '₹85' },
    { id: 'DEL-98418', type: 'Medicine Delivery', customer: 'Rajesh Verma', distance: '4.1 km', payout: '₹110' },
    { id: 'DEL-98417', type: 'Bakery & Food', customer: 'Pooja Sharma', distance: '1.8 km', payout: '₹95' },
    { id: 'DEL-98416', type: 'Parcel Delivery', customer: 'Amitabh Kumar', distance: '5.2 km', payout: '₹140' },
    { id: 'DEL-98415', type: 'Milk & Dairy', customer: 'Sunita Roy', distance: '1.2 km', payout: '₹60' },
  ],
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
