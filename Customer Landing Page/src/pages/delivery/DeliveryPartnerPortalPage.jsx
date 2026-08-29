import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DeliveryFeeTableSection from '../../components/delivery/welcome/DeliveryFeeTableSection';
import DeliveryCategoriesSection from '../../components/delivery/welcome/DeliveryCategoriesSection';
import DeliveryEquipmentStoreSection from '../../components/delivery/welcome/DeliveryEquipmentStoreSection';
import { DeliveryProvider, useDelivery } from '../../context/DeliveryContext';
import DeliveryStepperHeader, { DELIVERY_STEPS_CONFIG } from '../../components/delivery/onboarding/DeliveryStepperHeader';
import Step2_RiderAuthOtp from '../../components/delivery/onboarding/Step2_RiderAuthOtp';
import Step3_RiderProfile from '../../components/delivery/onboarding/Step3_RiderProfile';
import Step4_RiderLocationVehicle from '../../components/delivery/onboarding/Step4_RiderLocationVehicle';
import Step5_RiderCategoriesRadius from '../../components/delivery/onboarding/Step5_RiderCategoriesRadius';
import Step6_RiderDocumentVault from '../../components/delivery/onboarding/Step6_RiderDocumentVault';
import Step7_RiderBankPayout from '../../components/delivery/onboarding/Step7_RiderBankPayout';
import Step8_DeliveryFeePayment from '../../components/delivery/onboarding/Step8_DeliveryFeePayment';
import Step9_RiderEquipmentOnboarding from '../../components/delivery/onboarding/Step9_RiderEquipmentOnboarding';
import Step10_DeliveryTerms from '../../components/delivery/onboarding/Step10_DeliveryTerms';
import Step11_RiderVerificationStatus from '../../components/delivery/onboarding/Step11_RiderVerificationStatus';
import DeliveryRiderDashboardLayout from '../../components/delivery/dashboard/DeliveryRiderDashboardLayout';
import WholesaleToast from '../../components/wholesale/WholesaleToast';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Truck, ShieldCheck, Star, Navigation, Wallet, Zap, Clock3, Mail, Phone, MessageCircle, CheckCircle2, MapPin } from 'lucide-react';
import { WholesaleProvider } from '../../context/WholesaleContext';

function DeliveryPortalInner(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    formData,
    currentStep,
    setCurrentStep,
    activeTab,
    setActiveTab,
  } = useDelivery();

  // URL Path Matching
  useEffect(() => {
    document.title = 'Become a Delivery Partner | SaathApp Rider Network';
    const path = location.pathname.toLowerCase();

    if (path.includes('/dashboard')) {
      setCurrentStep(12); // Rider Dashboard
    } else if (path.includes('/status')) {
      setCurrentStep(11);
    } else if (path.includes('/terms')) {
      setCurrentStep(10);
    } else if (path.includes('/equipment')) {
      setCurrentStep(9);
    } else if (path.includes('/fee')) {
      setCurrentStep(8);
    } else if (path.includes('/bank')) {
      setCurrentStep(7);
    } else if (path.includes('/documents')) {
      setCurrentStep(6);
    } else if (path.includes('/categories')) {
      setCurrentStep(5);
    } else if (path.includes('/vehicle')) {
      setCurrentStep(4);
    } else if (path.includes('/profile')) {
      setCurrentStep(3);
    } else if (path.includes('/login')) {
      setCurrentStep(2);
    }
  }, [location.pathname]);

  const handleSelectStep = (stepId) => {
    setCurrentStep(stepId);
    const target = DELIVERY_STEPS_CONFIG.find((s) => s.id === stepId);
    if (target) {
      navigate(target.path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    const nextId = Math.min(12, currentStep + 1);
    handleSelectStep(nextId);
  };

  const handlePrevStep = () => {
    const prevId = Math.max(1, currentStep - 1);
    handleSelectStep(prevId);
  };

  // If Rider Dashboard mode selected
  if (currentStep >= 12 || location.pathname.includes('/dashboard')) {
    return (
      <DeliveryRiderDashboardLayout
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onBackToOnboarding={() => handleSelectStep(11)}
        darkMode={props.darkMode}
        toggleDarkMode={props.toggleDarkMode}
      />
    );
  }

  // Welcome Page (Step 1)
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-page dark:bg-slate-950 text-slate-800 dark:text-slate-100">
        <Header
          cartCount={props.cartCount || 0}
          onCartClick={props.onCartClick || (() => {})}
          location={props.location || 'Green Park, New Delhi'}
          onLocationClick={props.onLocationClick || (() => {})}
          onSearch={() => {}}
          onLogin={props.onLogin || (() => {})}
          onSignup={props.onSignup || (() => {})}
          onProfile={props.onProfile || (() => {})}
          user={props.user || null}
          isAuthenticated={props.isAuthenticated || false}
          onCartPage={props.onCartPage || (() => {})}
          onOrdersPage={() => {}}
          onWishlistPage={() => {}}
          onSettingsPage={() => {}}
          onLogout={() => {}}
          darkMode={props.darkMode || false}
          toggleDarkMode={props.toggleDarkMode || (() => {})}
          onVoiceSearchClick={() => {}}
          onImageSearchClick={() => {}}
        />

        {/* Rider Hero Card */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-surface px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-page transition"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 sm:p-10 shadow-xl"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
                  <Truck size={26} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    SAATHAPP Delivery Network
                  </p>
                  <h1 className="mt-1 text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                    Become Delivery Agent
                  </h1>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                    Earn a steady income with flexible delivery schedules. Deliver local groceries, medicine, fresh food, and parcels across your city.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectStep(2)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-105"
                  >
                    Apply as Rider Now
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href="#delivery-fee-structure"
                    className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-page transition"
                  >
                    View Onboarding Fee Matrix
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-white dark:via-slate-900 to-orange-50 dark:to-slate-950 p-6 text-center lg:max-w-sm lg:flex-1 shadow-inner">
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Flexible Rider Earnings
                </span>
                <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Daily & Weekly Payouts</p>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  One-Time Onboarding Fee valid for 2 Years. Zero compulsory monthly subscriptions!
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Section 2: Delivery Fee Matrix Table */}
        <DeliveryFeeTableSection onStartRegistration={() => handleSelectStep(2)} />

        {/* Section 3: Delivery Categories & Vehicles */}
        <DeliveryCategoriesSection onStartRegistration={() => handleSelectStep(2)} />

        {/* Section 4: Equipment & Uniform Store Showcase */}
        <DeliveryEquipmentStoreSection onStartRegistration={() => handleSelectStep(2)} />

        <Footer />
        <WholesaleToast />
      </div>
    );
  }

  // Steps 2 to 11: Rider Onboarding Stepper
  return (
    <div className="min-h-screen bg-page dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100">
      <DeliveryStepperHeader currentStep={currentStep} onSelectStep={handleSelectStep} />

      <main className="flex-1 pb-16">
        {currentStep === 2 && <Step2_RiderAuthOtp onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 3 && <Step3_RiderProfile onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 4 && <Step4_RiderLocationVehicle onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 5 && <Step5_RiderCategoriesRadius onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 6 && <Step6_RiderDocumentVault onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 7 && <Step7_RiderBankPayout onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 8 && <Step8_DeliveryFeePayment onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 9 && <Step9_RiderEquipmentOnboarding onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 10 && (
          <Step10_DeliveryTerms
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onSelectStep={handleSelectStep}
          />
        )}
        {currentStep === 11 && (
          <Step11_RiderVerificationStatus
            onGoToDashboard={() => {
              navigate('/become-delivery-partner/dashboard');
              setCurrentStep(12);
            }}
          />
        )}
      </main>

      <WholesaleToast />
    </div>
  );
}

export default function DeliveryPartnerPortalPage(props) {
  return (
    <WholesaleProvider>
      <DeliveryProvider>
        <DeliveryPortalInner {...props} />
      </DeliveryProvider>
    </WholesaleProvider>
  );
}
