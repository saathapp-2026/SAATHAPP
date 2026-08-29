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
  'w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-500 [&>option]:bg-slate-900 [&>option]:text-white';

export default function Documents() {
  const navigate = useNavigate();
  const { data, updateSection } = useOnboarding();

  const handleFile = (key, file) => {
    if (!file) return;
    updateSection('documents', { [key]: file.name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateSection('documents', { verificationLevel: form.get('verificationLevel') });
    navigate('/seller/bank');
  };

  return (
    <OnboardingLayout title="Document Upload" subtitle="Verify your business credentials">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Required Documents</h3>
          <div className="space-y-3">
            {REQUIRED_DOCS.map((doc) => (
              <div key={doc.key} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm text-slate-300">{doc.label} *</span>
                <label className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white hover:bg-white/20 cursor-pointer transition-colors">
                  {data.documents?.[doc.key] ? '✓ Uploaded' : 'Upload'}
                  <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleFile(doc.key, e.target.files?.[0])} />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Optional Business Documents</h3>
          <div className="space-y-3">
            {OPTIONAL_DOCS.map((doc) => (
              <div key={doc.key} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm text-slate-300">{doc.label}</span>
                <label className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white hover:bg-white/20 cursor-pointer transition-colors">
                  {data.documents?.[doc.key] ? '✓ Uploaded' : 'Upload'}
                  <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleFile(doc.key, e.target.files?.[0])} />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Verification Level</label>
          <select name="verificationLevel" defaultValue={data.documents?.verificationLevel || 'basic'} className={inputClass}>
            <option value="basic" className="bg-slate-900 text-white">Basic (Required docs only)</option>
            <option value="standard" className="bg-slate-900 text-white">Standard (+ GST)</option>
            <option value="enhanced" className="bg-slate-900 text-white">Enhanced (+ FSSAI/Trade License)</option>
            <option value="premium" className="bg-slate-900 text-white">Premium (All documents)</option>
          </select>
        </div>

        <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
          Continue to Bank Details
        </button>
      </form>
    </OnboardingLayout>
  );
}
