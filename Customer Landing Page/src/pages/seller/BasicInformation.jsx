import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import { toast } from 'react-hot-toast';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 [&>option]:bg-slate-900 [&>option]:text-white';

export default function BasicInformation() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const info = data.basicInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const fullName = (form.get('fullName') || '').trim();
    const email = (form.get('email') || '').trim();
    const mobile = (form.get('mobile') || '').replace(/\D/g, '');

    if (!fullName) {
      toast.error('Please enter your full name');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    updateSection('basicInfo', {
      fullName,
      email,
      mobile,
      dob: form.get('dob'),
      businessType: form.get('businessType'),
    });
    navigate('/seller/business-information');
  };

  return (
    <OnboardingLayout title="Basic Information" subtitle="Tell us about yourself">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Full Name *</label>
            <input name="fullName" defaultValue={info.fullName} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
            <input name="email" type="email" defaultValue={info.email} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Mobile *</label>
            <input name="mobile" type="tel" defaultValue={info.mobile} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Date of Birth</label>
            <input name="dob" type="date" defaultValue={info.dob} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Business Type *</label>
          <select name="businessType" defaultValue={info.businessType} className={inputClass}>
            <option value="individual" className="bg-slate-900 text-white">Individual / Proprietor</option>
            <option value="partnership" className="bg-slate-900 text-white">Partnership</option>
            <option value="private_limited" className="bg-slate-900 text-white">Private Limited</option>
            <option value="llp" className="bg-slate-900 text-white">LLP</option>
          </select>
        </div>

        <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Business Info
        </button>
      </form>
    </OnboardingLayout>
  );
}
