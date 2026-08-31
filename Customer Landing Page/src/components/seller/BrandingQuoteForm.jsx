import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { submitBrandingRequest } from '../../services/sellerMembershipService';
import { getStoredSellerAuth } from '../../services/sellerAuthService';

const inputClass = (isLight) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${
    isLight
      ? 'bg-surface border-slate-200 text-slate-900 dark:text-white'
      : 'bg-surface/5 border-white/10 text-white placeholder-slate-500'
  }`;

export default function BrandingQuoteForm({ product, onClose, variant = 'dark', businessName = '', onSuccess }) {
  const isLight = variant === 'light';
  const auth = getStoredSellerAuth();
  const [form, setForm] = useState({
    businessName: businessName || auth?.seller?.fullName || '',
    sellerId: auth?.seller?.id || '',
    brandingRequired: product?.name || '',
    quantity: '1',
    budget: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await submitBrandingRequest(form);
      setSubmitted(true);
      onSuccess?.(result);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl border p-8 text-center ${
          isLight ? 'bg-surface border-slate-200 dark:border-slate-800' : 'bg-surface/5 border-white/10'
        }`}
      >
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
        <p className={`text-sm mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Our branding team will contact you within 2 business days with a custom quote.
        </p>
        <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none text-sm text-violet-500 hover:text-violet-600 font-medium">
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-6 ${
        isLight ? 'bg-surface border-slate-200 dark:border-slate-800' : 'bg-surface/5 border-white/10'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Request Branding Quote</h3>
        <button type="button" onClick={onClose} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
      </div>

      {product && (
        <div className={`mb-4 p-3 rounded-xl flex items-center gap-3 ${isLight ? 'bg-page' : 'bg-surface/5'}`}>
          <span className="text-2xl">{product.icon}</span>
          <span className="font-medium text-sm">{product.name}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-slate-500">Business Name *</label>
          <input name="businessName" value={form.businessName} onChange={handleChange} className={inputClass(isLight)} required />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 text-slate-500">Seller ID</label>
          <input name="sellerId" value={form.sellerId} onChange={handleChange} className={inputClass(isLight)} readOnly />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 text-slate-500">Branding Required *</label>
          <input name="brandingRequired" value={form.brandingRequired} onChange={handleChange} className={inputClass(isLight)} required />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 text-slate-500">Quantity *</label>
          <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} className={inputClass(isLight)} required />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 text-slate-500">Budget (₹)</label>
          <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. 5000" className={inputClass(isLight)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium mb-1.5 text-slate-500">Additional Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className={inputClass(isLight)} placeholder="Size, color, branding requirements, delivery location..." />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
