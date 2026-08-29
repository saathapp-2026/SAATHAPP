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

  const validateWholesaleStep = (stepId) => {
    switch (stepId) {
      case 1:
        return { valid: true };
      case 2: {
        const cleanMobile = (formData.mobileNumber || '').replace(/\D/g, '');
        if (cleanMobile.length > 0 && cleanMobile.length !== 10) {
          return { valid: false, error: 'Step 2 (Auth & OTP): Valid 10-digit mobile number required' };
        }
        return { valid: true };
      }
      case 3: {
        if (!formData.fullName || !formData.fullName.trim()) {
          return { valid: false, error: 'Step 3 (Owner Details): Please enter full owner name' };
        }
        const cleanMobile = (formData.ownerMobile || '').replace(/\D/g, '');
        if (cleanMobile.length !== 10) {
          return { valid: false, error: 'Step 3 (Owner Details): Valid 10-digit owner mobile number required' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.ownerEmail || !emailRegex.test(formData.ownerEmail.trim())) {
          return { valid: false, error: 'Step 3 (Owner Details): Valid official email address required' };
        }
        return { valid: true };
      }
      case 4: {
        if (!formData.businessName || !formData.businessName.trim()) {
          return { valid: false, error: 'Step 4 (Business Info): Please enter business name' };
        }
        const capVal = formData.businessCapital ?? 2500000;
        if (Number(capVal) < 1000000) {
          return { valid: false, error: 'Step 4 (Business Info): Minimum business capital of ₹10,00,000 required' };
        }
        return { valid: true };
      }
      case 5: {
        if (!formData.registeredAddress || !formData.registeredAddress.trim()) {
          return { valid: false, error: 'Step 5 (Address): Please enter registered business address' };
        }
        const cleanPin = (formData.pincode || '').replace(/\D/g, '');
        if (cleanPin.length !== 6) {
          return { valid: false, error: 'Step 5 (Address): Valid 6-digit PIN code required' };
        }
        return { valid: true };
      }
      case 8: {
        const CORE_REQUIRED_DOCS = ['aadhaar', 'pan', 'gst', 'warehousePhotos', 'ownerSelfie'];
        const missing = CORE_REQUIRED_DOCS.filter((id) => {
          const doc = formData.documents?.[id];
          if (!doc) return true;
          return !(doc.status === 'Uploaded' || doc.status === 'Verified' || Boolean(doc.fileName));
        });
        if (missing.length > 0) {
          return { valid: false, error: 'Step 8 (Documents Vault): Please upload all required documents' };
        }
        return { valid: true };
      }
      case 9: {
        const holderName = (formData.accountHolderName || formData.accountName || '').trim();
        if (!holderName) {
          return { valid: false, error: 'Step 9 (Bank & Settlement): Bank account holder name required' };
        }
        if (!formData.accountNumber || !formData.accountNumber.trim()) {
          return { valid: false, error: 'Step 9 (Bank & Settlement): Bank account number required' };
        }
        if (formData.accountNumber !== formData.confirmAccountNumber) {
          return { valid: false, error: 'Step 9 (Bank & Settlement): Bank account numbers do not match' };
        }
        const cleanIfsc = (formData.ifscCode || '').trim();
        if (cleanIfsc.length !== 11) {
          return { valid: false, error: 'Step 9 (Bank & Settlement): Valid 11-character IFSC code required' };
        }
        return { valid: true };
      }
      case 13: {
        if (!formData.acceptedTerms) {
          return { valid: false, error: 'Step 13 (Terms & Review): Please accept the Wholesaler Legal Terms & Conditions' };
        }
        return { valid: true };
      }
      default:
        return { valid: true };
    }
  };

  // URL Path Matching & Direct Route Access Guard
  useEffect(() => {
    document.title = 'Become a Wholesale Partner | SaathApp Enterprise';
    const path = location.pathname.toLowerCase();
    let targetStep = 1;

    if (path.includes('/dashboard')) {
      targetStep = 15;
    } else if (path.includes('/status')) {
      targetStep = 14;
    } else if (path.includes('/review')) {
      targetStep = 13;
    } else if (path.includes('/membership')) {
      targetStep = 12;
    } else if (path.includes('/fee')) {
      targetStep = 11;
    } else if (path.includes('/operations')) {
      targetStep = 10;
    } else if (path.includes('/bank')) {
      targetStep = 9;
    } else if (path.includes('/documents')) {
      targetStep = 8;
    } else if (path.includes('/products')) {
      targetStep = 7;
    } else if (path.includes('/coverage')) {
      targetStep = 6;
    } else if (path.includes('/address')) {
      targetStep = 5;
    } else if (path.includes('/business')) {
      targetStep = 4;
    } else if (path.includes('/register')) {
      targetStep = 3;
    } else if (path.includes('/login')) {
      targetStep = 2;
    }

    if (targetStep > 1 && targetStep < 15) {
      for (let s = 1; s < targetStep; s++) {
        const check = validateWholesaleStep(s);
        if (!check.valid) {
          const validPath = STEPS_CONFIG.find((item) => item.id === s)?.path || '/wholesale';
          setCurrentStep(s);
          if (location.pathname !== validPath) {
            navigate(validPath, { replace: true });
          }
          addToast(check.error, 'error');
          return;
        }
      }
    }

    setCurrentStep(targetStep);
  }, [location.pathname]);

  const handleSelectStep = (stepId) => {
    // If forward jump, validate all intermediate steps
    if (stepId > currentStep) {
      for (let s = currentStep; s < stepId; s++) {
        const check = validateWholesaleStep(s);
        if (!check.valid) {
          addToast(check.error, 'error');
          return;
        }
      }
    }
    // Backward navigation or valid forward step
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
    <div className="min-h-screen bg-page dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100">
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
