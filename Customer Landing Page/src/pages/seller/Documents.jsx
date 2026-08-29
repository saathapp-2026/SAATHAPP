import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/seller/OnboardingLayout';
import { useOnboarding } from '../../context/SellerOnboardingContext';

const REQUIRED_DOCS = [
  { key: 'aadhaar', label: 'Aadhaar Card' },
  { key: 'pan', label: 'PAN Card' },
  { key: 'cancelledCheque', label: 'Cancelled Cheque' },
  { key: 'shopPhoto', label: 'Shop Photograph' },
];

const OPTIONAL_DOCS = [
  { key: 'gstCertificate', label: 'GST Certificate' },
  { key: 'fssai', label: 'FSSAI License' },
  { key: 'tradeLicense', label: 'Trade License' },
];

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500';

export default function Documents() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();

  const handleFile = (key, file) => {
    updateSection('documents', { [key]: file?.name || null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateSection('documents', {
      verificationLevel: form.get('verificationLevel'),
    });
    navigate('/seller/bank');
  };

  const uploadedCount = REQUIRED_DOCS.filter((d) => data.documents?.[d.key]).length;

  return (
    <OnboardingLayout title="Business Verification" subtitle="Upload required documents for verification">
      <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm">
        {uploadedCount}/{REQUIRED_DOCS.length} required documents uploaded
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Required Documents</h3>
          <div className="space-y-3">
            {REQUIRED_DOCS.map((doc) => (
              <div key={doc.key} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm">{doc.label}</span>
                <label className="cursor-pointer text-sm text-emerald-400 hover:text-emerald-300">
                  {data.documents?.[doc.key] ? '✓ Uploaded' : 'Upload'}
                  <input
                    type="file"
                    className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFile(doc.key, e.target.files?.[0])}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Optional Documents</h3>
          <div className="space-y-3">
            {OPTIONAL_DOCS.map((doc) => (
              <div key={doc.key} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm text-slate-400">{doc.label}</span>
                <label className="cursor-pointer text-sm text-emerald-400 hover:text-emerald-300">
                  {data.documents?.[doc.key] ? '✓ Uploaded' : 'Upload'}
                  <input type="file" className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden" accept="image/*,.pdf" onChange={(e) => handleFile(doc.key, e.target.files?.[0])} />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Verification Level</label>
          <select name="verificationLevel" defaultValue={data.documents?.verificationLevel || 'basic'} className={inputClass}>
            <option value="basic">Basic (Required docs only)</option>
            <option value="standard">Standard (+ GST)</option>
            <option value="enhanced">Enhanced (+ FSSAI/Trade License)</option>
            <option value="premium">Premium (All documents)</option>
          </select>
        </div>

        <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Bank Details
        </button>
      </form>
    </OnboardingLayout>
  );
}
