import React, { useEffect } from 'react';
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

export default function WholesaleWelcomePage(props) {
  useEffect(() => {
    document.title = 'Become a Wholesale Partner | SaathApp';
    const metaDescription = document.querySelector('meta[name="description"]');
    const description =
      'Join SaathApp as a wholesale partner. Reach verified buyers, manage bulk orders, secure payments, and scale your B2B business across India. Estimated onboarding: 15–20 minutes.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <WholesaleLayout {...props}>
      <HeroSection />
      <BenefitsSection />
      <OnboardingTimeSection />
      <HowItWorksSection />
      <StatisticsSection />
      <WhyChooseSection />
      <FAQSection />
      <CTASection />
    </WholesaleLayout>
  );
}
