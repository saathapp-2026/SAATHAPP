import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';
import { BUSINESS_CATEGORIES, BUSINESS_SERVICES } from '../../config/sellerOnboardingConfig';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500';

export default function BusinessInformation() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();
  const info = data.businessInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const services = BUSINESS_SERVICES.filter((s) => form.get(`service_${s.id}`)).map((s) => s.id);

    updateSection('businessInfo', {
      storeName: form.get('storeName'),
      businessName: form.get('businessName'),
      description: form.get('description'),
      category: form.get('category'),
      brandName: form.get('brandName'),
      experience: form.get('experience'),
      productCount: form.get('productCount'),
      storeSize: form.get('storeSize'),
      warehouseSize: form.get('warehouseSize'),
      annualTurnover: form.get('annualTurnover'),
      services,
    });
    navigate('/seller/address');
  };

  return (
    <OnboardingLayout title="Business Information" subtitle="Set up your store profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Store Name *</label>
            <input name="storeName" defaultValue={info.storeName} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Business Name *</label>
            <input name="businessName" defaultValue={info.businessName} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Description *</label>
          <textarea
            name="description"
            defaultValue={info.description}
            rows={3}
            minLength={20}
            className={inputClass}
            placeholder="Describe your business (min 20 characters)"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Category *</label>
            <select name="category" defaultValue={info.category} className={inputClass} required>
              {BUSINESS_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Experience</label>
            <select name="experience" defaultValue={info.experience} className={inputClass}>
              {['Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'].map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Number of Products</label>
            <select name="productCount" defaultValue={info.productCount} className={inputClass}>
              <option value="1-25">1–25</option>
              <option value="26-100">26–100</option>
              <option value="101-500">101–500</option>
              <option value="501-1000">501–1,000</option>
              <option value="1000+">1,000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Store Size</label>
            <select name="storeSize" defaultValue={info.storeSize} className={inputClass}>
              <option value="small">Small (&lt; 500 sq ft)</option>
              <option value="medium">Medium (500–2000 sq ft)</option>
              <option value="large">Large (2000–5000 sq ft)</option>
              <option value="xlarge">Extra Large (5000+ sq ft)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Warehouse Size</label>
            <select name="warehouseSize" defaultValue={info.warehouseSize} className={inputClass}>
              <option value="none">No Warehouse</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Annual Turnover</label>
            <select name="annualTurnover" defaultValue={info.annualTurnover} className={inputClass}>
              <option value="under_5L">Under ₹5 Lakh</option>
              <option value="5L_25L">₹5L – ₹25L</option>
              <option value="25L_1Cr">₹25L – ₹1 Cr</option>
              <option value="1Cr_5Cr">₹1 Cr – ₹5 Cr</option>
              <option value="above_5Cr">Above ₹5 Cr</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Business Services</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {BUSINESS_SERVICES.map((s) => (
              <label key={s.id} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name={`service_${s.id}`}
                  defaultChecked={info.services?.includes(s.id)}
                  className="rounded border-white/20 bg-white/5 text-emerald-500"
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Address
        </button>
      </form>
    </OnboardingLayout>
  );
}
