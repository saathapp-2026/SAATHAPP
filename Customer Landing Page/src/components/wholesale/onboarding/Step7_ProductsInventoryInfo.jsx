import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, UploadCloud, FileText, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const CATEGORY_OPTIONS = [
  'Grocery & Staples',
  'FMCG & Personal Care',
  'Packaged Snacks',
  'Beverages & Soft Drinks',
  'Electrical & Appliances',
  'Hardware & Tools',
  'Construction & Paint',
  'Furniture & Decor',
  'Agriculture & Fertilizers',
];

export default function Step7_ProductsInventoryInfo({ onNext, onPrev }) {
  const { formData, updateFormData, addToast } = useWholesale();
  const catalogInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const toggleCategory = (cat) => {
    const exists = formData.productCategories.includes(cat);
    const updated = exists
      ? formData.productCategories.filter((c) => c !== cat)
      : [...formData.productCategories, cat];
    updateFormData({ productCategories: updated });
  };

  const handleCatalogUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({
        productCatalogueFile: { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB` },
      });
      addToast(`Catalogue ${file.name} uploaded!`, 'success');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` }));
      updateFormData({ productImages: [...formData.productImages, ...newImages] });
      addToast(`${files.length} sample images uploaded!`, 'success');
    }
  };

  const handleAddTier = () => {
    const newTier = { minQty: 1000, maxQty: 5000, discount: '30%' };
    updateFormData({ pricingTiers: [...formData.pricingTiers, newTier] });
    addToast('Bulk pricing tier added', 'info');
  };

  const handleRemoveTier = (idx) => {
    updateFormData({ pricingTiers: formData.pricingTiers.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productCategories.length) {
      addToast('Select at least one product category', 'error');
      return;
    }
    addToast('Product & inventory details saved!', 'success');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Phase 6 — Product & Inventory Information
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Catalog, MOQ & Bulk Pricing Tiers
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Configure your product line, minimum order quantities (MOQ), and volume discounts for B2B buyers.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Category Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Select Product Categories (Multi-select) *
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = formData.productCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={13} />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Minimum Order Quantity (MOQ) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.minOrderQuantity}
                onChange={(e) => updateFormData({ minOrderQuantity: Number(e.target.value) })}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Monthly Supply Capacity
              </label>
              <input
                type="text"
                value={formData.monthlySupplyCapacity}
                onChange={(e) => updateFormData({ monthlySupplyCapacity: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="1,00,000 Units"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Stock Availability
              </label>
              <input
                type="text"
                value={formData.stockAvailability}
                onChange={(e) => updateFormData({ stockAvailability: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="In Stock (24hr Dispatch)"
              />
            </div>
          </div>

          {/* Bulk Pricing Tier Builder */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Bulk Pricing & Volume Discounts
                </h3>
                <p className="text-xs text-slate-500">Offer wholesale tier pricing based on order quantity.</p>
              </div>
              <button
                type="button"
                onClick={handleAddTier}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition shadow"
              >
                <Plus size={14} /> Add Tier
              </button>
            </div>

            <div className="space-y-3">
              {formData.pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Qty {tier.minQty} to {tier.maxQty} units:</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs px-2.5 py-1">
                      {tier.discount} OFF
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTier(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Uploaders: Catalogue & Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Catalog Upload */}
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-5 text-center">
              <UploadCloud size={32} className="mx-auto text-emerald-500" />
              <h4 className="mt-2 text-xs font-extrabold text-slate-900 dark:text-white">
                Upload Product Catalogue (PDF/Excel)
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">Upload complete price list or SKU catalogue.</p>
              {formData.productCatalogueFile && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 border border-emerald-500/20">
                  <FileText size={14} />
                  {formData.productCatalogueFile.name} ({formData.productCatalogueFile.size})
                </div>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => catalogInputRef.current?.click()}
                  className="rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  Choose PDF / Excel File
                </button>
                <input
                  ref={catalogInputRef}
                  type="file"
                  accept=".pdf,.xlsx,.csv"
                  onChange={handleCatalogUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Images Upload */}
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-5 text-center">
              <Package size={32} className="mx-auto text-emerald-500" />
              <h4 className="mt-2 text-xs font-extrabold text-slate-900 dark:text-white">
                Upload Sample Product Images
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">PNG, JPG or WebP images of product packaging.</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {formData.productImages.map((img, i) => (
                  <span
                    key={i}
                    className="rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold px-2.5 py-1"
                  >
                    {img.name}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  Choose Images
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Save & Next Phase
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
