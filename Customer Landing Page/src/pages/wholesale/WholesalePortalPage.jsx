import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WholesaleLayout from '../../components/wholesale/layout/WholesaleLayout';
import {
  HeroSection,
  BenefitsSection,
  OnboardingTimeSection,
  HowItWorksSection,
  StatisticsSection,
  WhyChooseSection,
  FAQSection,
  CTASection,
} from '../../components/wholesale/welcome';
import OnboardingFeeTableSection from '../../components/wholesale/welcome/OnboardingFeeTableSection';
import MembershipPlansSection from '../../components/wholesale/welcome/MembershipPlansSection';
import { WholesaleProvider, useWholesale } from '../../context/WholesaleContext';
import StepperHeader, { STEPS_CONFIG } from '../../components/wholesale/onboarding/StepperHeader';
import Step2_AuthOtp from '../../components/wholesale/onboarding/Step2_AuthOtp';
import Step3_OwnerInfo from '../../components/wholesale/onboarding/Step3_OwnerInfo';
import Step4_BusinessInfo from '../../components/wholesale/onboarding/Step4_BusinessInfo';
import Step5_WarehouseAddress from '../../components/wholesale/onboarding/Step5_WarehouseAddress';
import Step6_CoverageLogistics from '../../components/wholesale/onboarding/Step6_CoverageLogistics';
import Step7_ProductsInventoryInfo from '../../components/wholesale/onboarding/Step7_ProductsInventoryInfo';
import Step8_BusinessDocuments from '../../components/wholesale/onboarding/Step8_BusinessDocuments';
import Step9_BankSettlement from '../../components/wholesale/onboarding/Step9_BankSettlement';
import Step10_OperationsPolicies from '../../components/wholesale/onboarding/Step10_OperationsPolicies';
import Step11_OnboardingFee from '../../components/wholesale/onboarding/Step11_OnboardingFee';
import Step12_OptionalMembership from '../../components/wholesale/onboarding/Step12_OptionalMembership';
import Step13_TermsReview from '../../components/wholesale/onboarding/Step13_TermsReview';
import Step14_VerificationStatus from '../../components/wholesale/onboarding/Step14_VerificationStatus';
import DashboardLayout from '../../components/wholesale/dashboard/DashboardLayout';
import WholesaleToast from '../../components/wholesale/WholesaleToast';

function WholesalePortalInner(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    formData,
    currentStep,
    setCurrentStep,
    activeTab,
    setActiveTab,
  } = useWholesale();

  // URL Path Matching
  useEffect(() => {
    document.title = 'Become a Wholesale Partner | SaathApp Enterprise';
    const path = location.pathname.toLowerCase();

    if (path.includes('/dashboard')) {
      setCurrentStep(15); // Dashboard mode
    } else if (path.includes('/status')) {
      setCurrentStep(14);
    } else if (path.includes('/review')) {
      setCurrentStep(13);
    } else if (path.includes('/membership')) {
      setCurrentStep(12);
    } else if (path.includes('/fee')) {
      setCurrentStep(11);
    } else if (path.includes('/operations')) {
      setCurrentStep(10);
    } else if (path.includes('/bank')) {
      setCurrentStep(9);
    } else if (path.includes('/documents')) {
      setCurrentStep(8);
    } else if (path.includes('/products')) {
      setCurrentStep(7);
    } else if (path.includes('/coverage')) {
      setCurrentStep(6);
    } else if (path.includes('/address')) {
      setCurrentStep(5);
    } else if (path.includes('/business')) {
      setCurrentStep(4);
    } else if (path.includes('/register')) {
      setCurrentStep(3);
    } else if (path.includes('/login')) {
      setCurrentStep(2);
    }
  }, [location.pathname]);

  const handleSelectStep = (stepId) => {
    setCurrentStep(stepId);
    const target = STEPS_CONFIG.find((s) => s.id === stepId);
    if (target) {
      navigate(target.path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    const nextId = Math.min(15, currentStep + 1);
    handleSelectStep(nextId);
  };

  const handlePrevStep = () => {
    const prevId = Math.max(1, currentStep - 1);
    handleSelectStep(prevId);
  };

  // If Step 15 or Dashboard mode selected
  if (currentStep >= 15 || location.pathname.includes('/dashboard')) {
    return (
      <DashboardLayout
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onBackToOnboarding={() => handleSelectStep(14)}
        darkMode={props.darkMode}
        toggleDarkMode={props.toggleDarkMode}
      />
    );
  }

  // If Step 1 (Welcome Page)
  if (currentStep === 1) {
    return (
      <WholesaleLayout {...props}>
        <HeroSection onStartRegistration={() => handleSelectStep(2)} />
        <BenefitsSection />
        <OnboardingFeeTableSection onStartRegistration={() => handleSelectStep(2)} />
        <OnboardingTimeSection onStartRegistration={() => handleSelectStep(2)} />
        <HowItWorksSection />
        <StatisticsSection />
        <MembershipPlansSection onStartRegistration={() => handleSelectStep(2)} />
        <WhyChooseSection />
        <FAQSection />
        <CTASection onStartRegistration={() => handleSelectStep(2)} />
        <WholesaleToast />
      </WholesaleLayout>
    );
  }

  // Steps 2 to 14: Stepper Onboarding
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100">
      <StepperHeader currentStep={currentStep} onSelectStep={handleSelectStep} />

      <main className="flex-1 pb-16">
        {currentStep === 2 && <Step2_AuthOtp onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 3 && <Step3_OwnerInfo onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 4 && <Step4_BusinessInfo onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 5 && <Step5_WarehouseAddress onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 6 && <Step6_CoverageLogistics onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 7 && <Step7_ProductsInventoryInfo onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 8 && <Step8_BusinessDocuments onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 9 && <Step9_BankSettlement onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 10 && <Step10_OperationsPolicies onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 11 && <Step11_OnboardingFee onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 12 && <Step12_OptionalMembership onNext={handleNextStep} onPrev={handlePrevStep} />}
        {currentStep === 13 && (
          <Step13_TermsReview
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onSelectStep={handleSelectStep}
          />
        )}
        {currentStep === 14 && (
          <Step14_VerificationStatus
            onGoToDashboard={() => {
              navigate('/wholesale/dashboard');
              setCurrentStep(15);
            }}
          />
        )}
      </main>

      <WholesaleToast />
    </div>
  );
}

export default function WholesalePortalPage(props) {
  return (
    <WholesaleProvider>
      <WholesalePortalInner {...props} />
    </WholesaleProvider>
  );
}
