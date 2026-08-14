import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, Circle, ChevronRight, ChevronLeft, Plus, Trash2, Upload, RefreshCw,
  Edit, Copy, FileDown, FileUp, Archive, Eye, Sparkles, Check, Package, DollarSign,
  Layers, Truck, Search, Image, Video, ShieldCheck, AlertCircle, Calendar, X,
  FileSpreadsheet, Star, Award, Info, RotateCw, Crop, Zap, Tag, Sliders, Globe,
  Percent, HelpCircle, Wrench, Clock, CheckSquare, Layers2, ShieldAlert
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const STEPS = [
  { id: 1, name: 'Basic Information', icon: Info, desc: 'Name, SKU, Category & Brand' },
  { id: 2, name: 'Images & Media', icon: Image, desc: 'Main image, gallery & video' },
  { id: 3, name: 'Product Description', icon: FileSpreadsheet, desc: 'Short, Rich Text & Highlights' },
  { id: 4, name: 'Pricing & Bulk', icon: DollarSign, desc: 'Wholesale, MRP & Tier discounts' },
  { id: 5, name: 'Inventory', icon: Package, desc: 'Stock levels, warehouse & alerts' },
  { id: 6, name: 'Specifications', icon: Sliders, desc: 'Category specs & custom keys' },
  { id: 7, name: 'Shipping Details', icon: Truck, desc: 'Dimensions, weight & courier rules' },
  { id: 8, name: 'SEO', icon: Globe, desc: 'Meta tags, URL slug & search terms' },
  { id: 9, name: 'Visibility', icon: Eye, desc: 'B2B/B2C targeting & status badges' },
  { id: 10, name: 'Publish', icon: CheckSquare, desc: 'Preview & final schedule' },
];

export const CATEGORIES = {
  'FMCG & Personal Care': ['Edible Oils', 'Spices & Condiments', 'Soaps & Detergents', 'Personal Hygiene', 'Beverages'],
  'Grocery & Staples': ['Pulses & Grains', 'Rice & Flour', 'Sugar & Salt', 'Dry Fruits', 'Packaged Food'],
  'Electrical & Appliances': ['Modular Switches', 'Wiring & Cables', 'Lighting & LED', 'Fans & Motors', 'Circuit Breakers'],
  'Construction & Paint': ['Cement & Concrete', 'Wall Paints', 'Pipes & Fittings', 'Sanitaryware', 'Hardware Tools'],
  'Textiles & Apparel': ['Cotton Fabrics', 'Uniforms & Workwear', 'Yarn & Thread', 'Bedding & Towels'],
  'Automotive & Tools': ['Engine Oils', 'Power Tools', 'Hand Tools', 'Batteries & Spares'],
  'Agriculture & Chemical': ['Fertilizers', 'Pesticides', 'Seeds & Feeds', 'Industrial Solvents'],
};

export const INITIAL_FORM_STATE = {
  // Step 1: Basic Information
  productName: 'Fortune Sunflower Oil 15L Tin',
  shortName: 'Fortune Oil 15L',
  sku: 'SKU-FORT-15L-1006',
  barcode: '8901234567890',
  hsnCode: '15121990',
  brandName: 'Fortune',
  manufacturer: 'Adani Wilmar Ltd.',
  modelNumber: '15L Tin',
  category: 'FMCG & Personal Care',
  subCategory: 'Edible Oils',
  childCategory: 'Sunflower Refined Oil',
  tags: ['Edible Oil', 'Sunflower', 'Cooking Oil', '15L Bulk'],
  newTagInput: '',

  // Step 2: Images & Media
  mainImage: '',
  galleryImages: [
    null,
    null,
    null,
    null,
    null,
  ],
  galleryRotations: [0, 0, 0, 0, 0],
  videoType: 'youtube',
  videoUrl: 'https://www.youtube.com/watch?v=demo_saathapp_product',

  // Step 3: Product Description
  shortDescription: 'High quality refined sunflower oil suitable for commercial cooking, restaurants & catering. Rich in Vitamin E and low in saturated fat.',
  fullDescription: 'Fortune Sunflower Oil is a light, healthy and nutritious edible oil. Formulated through multi-stage refining to deliver zero odor and high smoke point for deep frying.',
  highlights: [
    '100% Pure Refined Sunflower Oil',
    'Rich in Vitamin E & Omega-6 Fatty Acids',
    'High Smoke Point - Ideal for Deep Frying',
    'Light & Easy to Digest',
    'Agmark & FSSAI Certified Grade A',
  ],
  whatsInTheBox: [
    '1 x 15 Litre Sealed Tin Container',
    'Quality Assurance Seal',
    'Product Specification Leaflet',
  ],

  // Step 4: Pricing & Bulk
  wholesalePrice: 1850,
  mrp: 2100,
  discountPercent: 11.9,
  offerPrice: 1800,
  gstPercent: 5,
  taxIncluded: true,
  moq: 10,
  maxOrderQty: 500,
  unit: 'Tin',
  tierPricing: [
    { id: 1, minUnits: 10, price: 1850, discountPercent: 11.9 },
    { id: 2, minUnits: 50, price: 1780, discountPercent: 15.2 },
    { id: 3, minUnits: 100, price: 1720, discountPercent: 18.1 },
  ],

  // Step 5: Inventory
  openingStock: 450,
  warehouse: 'Main Hub - Mumbai',
  warehouseLocation: 'Aisle 14, Shelf C-02',
  stockAlert: 50,
  reorderQty: 100,
  availableQty: 450,
  reservedQty: 30,
  expectedStock: 200,

  // Step 6: Specifications
  voltage: '220V - 240V',
  power: '1500W',
  current: '6A',
  frequency: '50 Hz',
  material: 'Food Grade Tin Container',
  weight: '13.8 kg',
  dimensions: '24 x 24 x 36 cm',
  color: 'Golden Yellow',
  warranty: '12 Months Shelf Life',
  countryOfOrigin: 'India',
  manufacturingDate: '2026-07-15',
  expiryDate: '2027-07-15',
  shelfLife: '12 Months',
  storageCondition: 'Store in cool dry place away from direct sunlight',
  fssaiLicense: '10019022009876',
  certifications: {
    ISI: true,
    BIS: true,
    ISO: true,
    FSSAI: true,
    CE: false,
    RoHS: false,
  },
  customSpecs: [
    { key: 'Refining Process', value: 'Multi-stage Deodorized' },
    { key: 'Free Fatty Acid', value: '< 0.15%' },
  ],

  // Step 7: Shipping Details
  packageWeight: 14.5,
  length: 25,
  width: 25,
  height: 38,
  isFragile: false,
  isDangerous: false,
  isReturnable: true,
  returnWindowDays: 7,
  isReplaceable: true,
  isCodAvailable: true,
  isInstallationRequired: false,
  shippingClass: 'Standard B2B Freight',
  deliveryTime: '2-4 Business Days',

  // Step 8: SEO
  urlSlug: 'fortune-sunflower-oil-15l-tin',
  metaTitle: 'Buy Fortune Sunflower Oil 15L Tin Wholesale Price | SaathApp',
  metaDescription: 'Get bulk rates on Fortune Sunflower Oil 15L Tin. Direct manufacturer supply, fast delivery, MOQ 10 Tins. GST invoice included.',
  searchKeywords: ['Fortune oil', '15L tin', 'wholesale edible oil', 'sunflower oil bulk'],
  ogImage: '',

  // Step 9: Visibility
  status: 'Active',
  productVisibility: 'Both',
  isFeatured: true,
  isSponsored: false,
  badges: {
    isNewArrival: true,
    isBestSeller: true,
    isTrending: false,
    isRecommended: true,
  },

  // Step 10: Publish
  isScheduled: false,
  scheduledDateTime: '2026-08-10T10:00',
};

export default function WholesaleAddProductModal({ isOpen, onClose, onSaveProduct }) {
  const { addToast } = useWholesale ? useWholesale() : { addToast: (msg) => alert(msg) };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isPreviewStoreModalOpen, setIsPreviewStoreModalOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Auto calculate discount percentage when MRP or Wholesale Price changes
  useEffect(() => {
    if (formData.mrp && formData.wholesalePrice) {
      const calcDiscount = (((formData.mrp - formData.wholesalePrice) / formData.mrp) * 100).toFixed(1);
      setFormData((prev) => ({ ...prev, discountPercent: Number(calcDiscount) }));
    }
  }, [formData.mrp, formData.wholesalePrice]);

  // Auto generate URL slug when Product Name changes
  useEffect(() => {
    if (formData.productName) {
      const slug = formData.productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, urlSlug: slug }));
    }
  }, [formData.productName]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parentField, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [key]: value,
      },
    }));
  };

  // Step 1 Helpers
  const generateNewSKU = () => {
    const brandPrefix = formData.brandName ? formData.brandName.slice(0, 4).toUpperCase() : 'PROD';
    const rand = Math.floor(1000 + Math.random() * 9000);
    const newSku = `SKU-${brandPrefix}-${rand}`;
    handleChange('sku', newSku);
    addToast?.(`Auto-generated SKU: ${newSku}`, 'info');
  };

  const handleAddTag = () => {
    if (!formData.newTagInput.trim()) return;
    if (!formData.tags.includes(formData.newTagInput.trim())) {
      handleChange('tags', [...formData.tags, formData.newTagInput.trim()]);
    }
    handleChange('newTagInput', '');
  };

  const handleRemoveTag = (tagToRemove) => {
    handleChange(
      'tags',
      formData.tags.filter((t) => t !== tagToRemove)
    );
  };

  // Step 2 Helpers
  const handleMainImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      handleChange('mainImage', mockUrl);
      addToast?.('Main Product Image updated!', 'success');
    }
  };

  const handleGalleryUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      const updated = [...formData.galleryImages];
      updated[index] = mockUrl;
      handleChange('galleryImages', updated);
      addToast?.(`Gallery image ${index + 1} uploaded!`, 'success');
    }
  };

  const handleRemoveGalleryImage = (index) => {
    const updated = [...formData.galleryImages];
    updated[index] = null;
    handleChange('galleryImages', updated);
  };

  const handleRotateGalleryImage = (index) => {
    const rotations = [...formData.galleryRotations];
    rotations[index] = (rotations[index] + 90) % 360;
    handleChange('galleryRotations', rotations);
  };

  // Step 3 Helpers
  const handleAddHighlight = (text) => {
    if (!text || formData.highlights.includes(text)) return;
    handleChange('highlights', [...formData.highlights, text]);
  };

  const handleRemoveHighlight = (idx) => {
    handleChange(
      'highlights',
      formData.highlights.filter((_, i) => i !== idx)
    );
  };

  const handleAddBoxItem = () => {
    const item = prompt('Enter box content (e.g., 1 x Manual, 1 x Power Cord):');
    if (item && item.trim()) {
      handleChange('whatsInTheBox', [...formData.whatsInTheBox, item.trim()]);
    }
  };

  const handleRemoveBoxItem = (idx) => {
    handleChange(
      'whatsInTheBox',
      formData.whatsInTheBox.filter((_, i) => i !== idx)
    );
  };

  // Step 4 Helpers
  const handleAddTierRow = () => {
    const nextId = formData.tierPricing.length + 1;
    const lastTier = formData.tierPricing[formData.tierPricing.length - 1];
    const newUnits = lastTier ? lastTier.minUnits + 50 : 10;
    const newPrice = lastTier ? Math.max(100, lastTier.price - 50) : formData.wholesalePrice;
    const calcDisc = (((formData.mrp - newPrice) / formData.mrp) * 100).toFixed(1);
    const newRow = { id: nextId, minUnits: newUnits, price: newPrice, discountPercent: Number(calcDisc) };
    handleChange('tierPricing', [...formData.tierPricing, newRow]);
  };

  const handleUpdateTierRow = (index, key, value) => {
    const updated = [...formData.tierPricing];
    updated[index][key] = Number(value);
    if (key === 'price') {
      const calcDisc = (((formData.mrp - value) / formData.mrp) * 100).toFixed(1);
      updated[index].discountPercent = Number(calcDisc);
    }
    handleChange('tierPricing', updated);
  };

  const handleRemoveTierRow = (index) => {
    handleChange(
      'tierPricing',
      formData.tierPricing.filter((_, i) => i !== index)
    );
  };

  // Step 6 Helpers
  const handleAddCustomSpec = () => {
    handleChange('customSpecs', [...formData.customSpecs, { key: '', value: '' }]);
  };

  const handleUpdateCustomSpec = (idx, keyOrVal, text) => {
    const updated = [...formData.customSpecs];
    updated[idx][keyOrVal] = text;
    handleChange('customSpecs', updated);
  };

  const handleRemoveCustomSpec = (idx) => {
    handleChange(
      'customSpecs',
      formData.customSpecs.filter((_, i) => i !== idx)
    );
  };

  // Utility Actions (PDF Extra Buttons)
  const handleDuplicateProduct = () => {
    setFormData((prev) => ({
      ...prev,
      productName: `${prev.productName} (Copy)`,
      sku: `${prev.sku}-COPY`,
    }));
    addToast?.('Product duplicated into current form draft!', 'info');
  };

  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        addToast?.(`Imported product data from "${file.name}"!`, 'success');
      }
    };
    input.click();
  };

  const handleExportCSV = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${formData.sku}_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast?.('Product JSON / CSV data exported!', 'success');
  };

  const handleArchiveProduct = () => {
    handleChange('status', 'Inactive');
    addToast?.('Product archived and marked Inactive.', 'warning');
  };

  const handleDeleteDraft = () => {
    if (window.confirm('Are you sure you want to reset and clear this product form?')) {
      setFormData(INITIAL_FORM_STATE);
      setCurrentStep(1);
      addToast?.('Form cleared and reset to initial template.', 'info');
    }
  };

  const handleSaveDraft = () => {
    addToast?.(`Draft saved for SKU ${formData.sku}`, 'success');
    onClose();
  };

  const handlePublishNow = () => {
    if (!formData.productName || !formData.wholesalePrice) {
      addToast?.('Please complete required fields (Product Name, Price)', 'error');
      setCurrentStep(1);
      return;
    }
    const publishedProd = {
      id: formData.sku,
      name: formData.productName,
      category: formData.category,
      price: formData.wholesalePrice,
      moq: formData.moq,
      stock: formData.openingStock,
      brand: formData.brandName,
      status: formData.status === 'Active' ? 'Active' : formData.status,
    };
    if (onSaveProduct) {
      onSaveProduct(publishedProd);
    }
    addToast?.(`🎉 Product "${formData.productName}" successfully published to Wholesale Catalogue!`, 'success');
    onClose();
  };

  const goToNextStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep((prev) => Math.min(10, prev + 1));
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto sa-fade">
      {/* Main Modal Outer Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-[#0B1220] border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Package size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-wide">
                  Add Wholesale Product SKU
                </h2>
                <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Step {currentStep} of 10
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure 10-step wholesale inventory, tier pricing, specifications & media.
              </p>
            </div>
          </div>

          {/* Extra Buttons Utility Bar (As requested in PDF Page 8) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDuplicateProduct}
              title="Duplicate Product"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-[11px] font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition"
            >
              <Copy size={13} className="text-emerald-400" /> Duplicate
            </button>
            <button
              type="button"
              onClick={handleImportCSV}
              title="Import CSV Data"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-[11px] font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition"
            >
              <FileUp size={13} className="text-blue-400" /> Import CSV
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              title="Export Product JSON/CSV"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-[11px] font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition"
            >
              <FileDown size={13} className="text-amber-400" /> Export CSV
            </button>
            <button
              type="button"
              onClick={handleArchiveProduct}
              title="Archive Product"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-[11px] font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition"
            >
              <Archive size={13} className="text-purple-400" /> Archive
            </button>
            <button
              type="button"
              onClick={handleDeleteDraft}
              title="Clear/Reset Form"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-rose-900/50 bg-rose-950/40 text-[11px] font-bold text-rose-300 hover:bg-rose-900/60 transition"
            >
              <Trash2 size={13} /> Reset
            </button>

            <button
              type="button"
              onClick={onClose}
              className="ml-2 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Body - Split Pane */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* LEFT SIDEBAR STEPPER (Dark Slate #0B1220) */}
          <div className="w-full md:w-72 bg-[#0B1220] border-r border-slate-800 p-4 flex flex-col justify-between overflow-y-auto sa-scrollbar shrink-0">
            <div>
              {/* Stepper Progress Bar */}
              <div className="mb-4 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
                <div className="flex justify-between items-center text-[11px] font-extrabold text-slate-300 mb-1.5">
                  <span>Wizard Progress</span>
                  <span className="text-emerald-400 font-mono">
                    {Math.round((currentStep / 10) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Steps Nav Items */}
              <nav className="space-y-1.5">
                {STEPS.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = completedSteps.includes(step.id);
                  const IconComp = step.icon;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full text-left p-2.5 rounded-2xl flex items-center gap-3 transition-all duration-200 group ${
                        isActive
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-white shadow-lg'
                          : isCompleted
                          ? 'bg-slate-900/60 border border-slate-800/60 text-slate-300 hover:bg-slate-800/60'
                          : 'text-slate-500 hover:bg-slate-900/40 hover:text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isCompleted && !isActive ? (
                          <CheckCircle2 size={14} className="text-emerald-400" />
                        ) : (
                          step.id
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs font-extrabold truncate ${
                            isActive ? 'text-emerald-400' : 'text-slate-200'
                          }`}
                        >
                          {step.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate leading-tight">
                          {step.desc}
                        </p>
                      </div>

                      {isActive && <ChevronRight size={14} className="text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Product Summary Badge at bottom of sidebar */}
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 bg-slate-950/40 p-3 rounded-2xl">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-slate-500">SKU:</span>
                <span className="text-emerald-400 font-bold">{formData.sku}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Price:</span>
                <span className="text-white font-bold">₹{formData.wholesalePrice} / {formData.unit}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Stock:</span>
                <span className="text-slate-300 font-bold">{formData.openingStock} Units</span>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN FORM PANE */}
          <div className="flex-1 bg-slate-950 p-4 sm:p-6 overflow-y-auto sa-scrollbar flex flex-col justify-between">
            <div className="space-y-6">
              {/* STEP 1: BASIC INFORMATION */}
              {currentStep === 1 && (
                <div className="space-y-5 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Info className="text-emerald-400" size={18} /> Step 1. Basic Information
                    </h3>
                    <p className="text-xs text-slate-400">
                      Specify standard product identities, category taxonomies, and barcode mappings.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Product Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.productName}
                        onChange={(e) => handleChange('productName', e.target.value)}
                        placeholder="e.g. Fortune Sunflower Oil 15L Tin"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-bold text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Short Name</label>
                      <input
                        type="text"
                        value={formData.shortName}
                        onChange={(e) => handleChange('shortName', e.target.value)}
                        placeholder="e.g. Fortune Oil 15L"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        SKU ID (Auto Generate + Custom)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.sku}
                          onChange={(e) => handleChange('sku', e.target.value)}
                          className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={generateNewSKU}
                          title="Generate New SKU"
                          className="px-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 transition flex items-center gap-1 font-bold"
                        >
                          <RefreshCw size={14} /> Auto
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Barcode (EAN / UPC Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.barcode}
                        onChange={(e) => handleChange('barcode', e.target.value)}
                        placeholder="8901234567890"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-mono text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        HSN / SAC Code
                      </label>
                      <input
                        type="text"
                        value={formData.hsnCode}
                        onChange={(e) => handleChange('hsnCode', e.target.value)}
                        placeholder="e.g. 15121990"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-mono text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={formData.brandName}
                        onChange={(e) => handleChange('brandName', e.target.value)}
                        placeholder="e.g. Fortune / Havells / Tata"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Manufacturer</label>
                      <input
                        type="text"
                        value={formData.manufacturer}
                        onChange={(e) => handleChange('manufacturer', e.target.value)}
                        placeholder="e.g. Adani Wilmar Ltd."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Model / Variant Number</label>
                      <input
                        type="text"
                        value={formData.modelNumber}
                        onChange={(e) => handleChange('modelNumber', e.target.value)}
                        placeholder="e.g. 15L Tin / 220V Gold"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Product Category <span className="text-emerald-400">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          const newCat = e.target.value;
                          handleChange('category', newCat);
                          const subCats = CATEGORIES[newCat] || [];
                          if (subCats.length > 0) handleChange('subCategory', subCats[0]);
                        }}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                      >
                        {Object.keys(CATEGORIES).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Sub Category <span className="text-emerald-400">*</span>
                      </label>
                      <select
                        value={formData.subCategory}
                        onChange={(e) => handleChange('subCategory', e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      >
                        {(CATEGORIES[formData.category] || []).map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Child Category</label>
                      <input
                        type="text"
                        value={formData.childCategory}
                        onChange={(e) => handleChange('childCategory', e.target.value)}
                        placeholder="e.g. Sunflower Refined Oil"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold uppercase text-slate-300 mb-1">Tags / Keywords</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={formData.newTagInput}
                          onChange={(e) => handleChange('newTagInput', e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                          placeholder="Add keyword tag & press enter"
                          className="flex-1 rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
                        >
                          + Add Tag
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold"
                          >
                            <Tag size={10} /> {t}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(t)}
                              className="hover:text-rose-400 ml-1 font-black"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: IMAGES & MEDIA */}
              {currentStep === 2 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Image className="text-emerald-400" size={18} /> Step 2. Images & Media
                    </h3>
                    <p className="text-xs text-slate-400">
                      Upload compulsory high-res main product image, gallery grid, and video preview.
                    </p>
                  </div>

                  {/* Main Image Section */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                          Main Image <span className="text-rose-400 font-bold">* (Compulsory)</span>
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Recommended format: JPG, PNG, WEBP (2000×2000 px, max 5MB).
                        </p>
                      </div>
                      {formData.mainImage && (
                        <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          Main Image Active ✓
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div className="sm:col-span-1">
                        <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-emerald-500/50 bg-slate-950 p-2 text-center h-48 flex flex-col items-center justify-center">
                          {formData.mainImage ? (
                            <div className="relative w-full h-full flex flex-col items-center justify-between">
                              <img
                                src={formData.mainImage}
                                alt="Main Product"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%230f172a'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2310b981' font-size='14' font-family='sans-serif'>Main Product Image</text></svg>";
                                }}
                                className="w-full h-32 object-cover rounded-xl border border-slate-800"
                              />
                              <div className="flex gap-2 w-full pt-1">
                                <label className="cursor-pointer flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold py-1.5 rounded-xl shadow text-center flex items-center justify-center gap-1">
                                  <Upload size={12} /> Replace
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMainImageUpload}
                                    className="hidden"
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleChange('mainImage', '')}
                                  className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full p-3 hover:bg-slate-900/50 transition rounded-xl">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                                <Upload size={24} />
                              </div>
                              <span className="text-xs font-black text-white">+ Upload Main Image</span>
                              <span className="text-[10px] text-slate-400 mt-0.5">Click or Drag & Drop JPG, PNG, WEBP</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleMainImageUpload}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 text-xs space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-2 text-slate-300 font-semibold">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" /> Professional white background preferred for wholesale catalogues.
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-semibold">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" /> High crisp resolution (2000×2000 px) enables B2B buyer zoom.
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                          <Info size={14} className="text-blue-400 shrink-0" /> Automatic cloud image compression optimizes page speed under 1.2s.
                        </div>
                        <div className="pt-2">
                          <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-extrabold text-white shadow-md transition">
                            <Upload size={14} /> Browse Computer for Main Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleMainImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Images (5 Card Grid) */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                          Gallery Images (Maximum 5 Cards)
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Sellers can Drag & Drop, Rearrange, Rotate, Crop, and Compress gallery photos.
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-extrabold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        {formData.galleryImages.filter(Boolean).length} / 5 Uploaded
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {formData.galleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-2xl border border-slate-800 bg-slate-950 p-2 text-center min-h-[170px] flex flex-col justify-between overflow-hidden shadow-sm"
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold mb-1">
                            <span>Slot {idx + 1}</span>
                            {img ? <span className="text-emerald-400">Active</span> : <span>Empty</span>}
                          </div>

                          {img ? (
                            <div className="flex-1 flex flex-col justify-between space-y-1">
                              <div className="h-24 w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                                <img
                                  src={img}
                                  alt={`Gallery ${idx + 1}`}
                                  style={{ transform: `rotate(${formData.galleryRotations[idx]}deg)` }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='100' viewBox='0 0 150 100'><rect width='100%' height='100%' fill='%230f172a'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2310b981' font-size='12' font-family='sans-serif'>Image ${idx + 1}</text></svg>`;
                                  }}
                                  className="w-full h-full object-cover transition-transform duration-300"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-1 pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleRotateGalleryImage(idx)}
                                  title="Rotate 90°"
                                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-bold flex items-center justify-center gap-1"
                                >
                                  <RotateCw size={11} /> Rotate
                                </button>
                                <button
                                  type="button"
                                  onClick={() => addToast?.(`Cropped & compressed Gallery Image ${idx + 1}`, 'info')}
                                  title="Crop & Compress"
                                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 text-[10px] font-bold flex items-center justify-center gap-1"
                                >
                                  <Crop size={11} /> Crop
                                </button>
                              </div>

                              <div className="flex gap-1 pt-1">
                                <label className="cursor-pointer flex-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold py-1 rounded-lg text-center flex items-center justify-center gap-1">
                                  <Upload size={10} /> Change
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleGalleryUpload(idx, e)}
                                    className="hidden"
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGalleryImage(idx)}
                                  className="px-2 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/60 text-rose-300 border border-rose-500/40 font-bold text-[10px]"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full py-4 text-slate-400 hover:text-emerald-400 hover:bg-slate-900/40 transition rounded-xl">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-1 border border-slate-800">
                                <Plus size={20} />
                              </div>
                              <span className="text-xs font-black text-white">+ Upload Image {idx + 1}</span>
                              <span className="text-[10px] text-slate-500 mt-0.5">JPG / PNG / WEBP</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleGalleryUpload(idx, e)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Section */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                        <Video className="text-emerald-400" size={18} /> Product Video & 360° View
                      </h4>
                      <span className="text-[11px] text-slate-400">Add MP4 product demo or YouTube video link</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase text-slate-300 mb-1">
                          Product Video Source
                        </label>
                        <select
                          value={formData.videoType}
                          onChange={(e) => handleChange('videoType', e.target.value)}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="none">No Video</option>
                          <option value="upload">Upload Video File (.mp4 / .webm)</option>
                          <option value="youtube">YouTube / Vimeo Link</option>
                          <option value="360">360° Interactive View (Future)</option>
                        </select>
                      </div>

                      {formData.videoType === 'youtube' && (
                        <div>
                          <label className="block font-bold uppercase text-slate-400 mb-1">
                            YouTube URL
                          </label>
                          <input
                            type="url"
                            value={formData.videoUrl}
                            onChange={(e) => handleChange('videoUrl', e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      )}

                      {formData.videoType === 'upload' && (
                        <div>
                          <label className="block font-bold uppercase text-slate-400 mb-1">
                            Upload Video File
                          </label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={() => addToast?.('Video uploaded successfully!', 'success')}
                            className="w-full text-slate-400 text-xs"
                          />
                        </div>
                      )}

                      {formData.videoType === '360' && (
                        <div className="sm:col-span-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-semibold text-[11px]">
                          ✨ 360° 3D Interactive product view option enabled. Virtual spin camera ready.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PRODUCT DESCRIPTION */}
              {currentStep === 3 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <FileSpreadsheet className="text-emerald-400" size={18} /> Step 3. Product Description
                    </h3>
                    <p className="text-xs text-slate-400">
                      Provide a concise short description, rich text formatted full description, and bulleted highlights.
                    </p>
                  </div>

                  {/* Short Description */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-bold uppercase text-slate-300">
                        Short Description <span className="text-slate-500">(150–300 Characters Recommended)</span>
                      </label>
                      <span
                        className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          formData.shortDescription.length >= 150 && formData.shortDescription.length <= 300
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {formData.shortDescription.length} / 300 chars
                      </span>
                    </div>

                    <textarea
                      rows={3}
                      value={formData.shortDescription}
                      onChange={(e) => handleChange('shortDescription', e.target.value)}
                      placeholder="Brief overview highlighting key USP for wholesale buyers..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Full Description - Rich Text Editor Mock */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <label className="font-bold uppercase text-slate-300 block">
                      Full Description (Rich Text Editor)
                    </label>

                    {/* Rich Text Toolbar Mock */}
                    <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-300">
                      <button
                        type="button"
                        onClick={() => addToast?.('Bold formatting applied', 'info')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 font-black text-xs"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => addToast?.('Italic formatting applied', 'info')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 italic text-xs"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => addToast?.('Bullet list added', 'info')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold"
                      >
                        • List
                      </button>
                      <button
                        type="button"
                        onClick={() => addToast?.('Table inserted', 'info')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold"
                      >
                        📊 Table
                      </button>
                      <button
                        type="button"
                        onClick={() => addToast?.('Hyperlink modal', 'info')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-blue-400"
                      >
                        🔗 Link
                      </button>
                      <button
                        type="button"
                        onClick={() => addToast?.('Image embedded', 'info')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400"
                      >
                        🖼️ Image
                      </button>
                    </div>

                    <textarea
                      rows={5}
                      value={formData.fullDescription}
                      onChange={(e) => handleChange('fullDescription', e.target.value)}
                      placeholder="Detailed product descriptions, manufacturing standards, quality guarantees..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Highlights (Dynamic Bullet List) */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-extrabold text-white">Highlights & Features</h4>
                      <div className="flex gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleAddHighlight('Premium Quality Guaranteed')}
                          className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 hover:bg-emerald-500/30"
                        >
                          + Premium Quality
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddHighlight('2 Years Warranty')}
                          className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 hover:bg-emerald-500/30"
                        >
                          + 2 Yrs Warranty
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddHighlight('BIS Certified')}
                          className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 hover:bg-emerald-500/30"
                        >
                          + BIS Certified
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {formData.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800"
                        >
                          <div className="flex items-center gap-2 text-slate-200 font-bold">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlight(idx)}
                            className="text-slate-500 hover:text-rose-400 font-black p-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const val = prompt('Enter new highlight bullet:');
                        if (val) handleAddHighlight(val);
                      }}
                      className="inline-flex items-center gap-1 text-emerald-400 font-extrabold text-xs hover:underline mt-1"
                    >
                      <Plus size={14} /> Add Custom Highlight Bullet
                    </button>
                  </div>

                  {/* What's in the Box? */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-extrabold text-white">What's in the Box?</h4>
                      <button
                        type="button"
                        onClick={handleAddBoxItem}
                        className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Package Component
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.whatsInTheBox.map((boxItem, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                        >
                          <span>📦 {boxItem}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBoxItem(idx)}
                            className="text-slate-500 hover:text-rose-400 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: PRICING & BULK */}
              {currentStep === 4 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <DollarSign className="text-emerald-400" size={18} /> Step 4. Pricing & Bulk
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure base Wholesale Price, Retail MRP, automated discount calculation, and Tier Pricing.
                    </p>
                  </div>

                  {/* Standard Pricing Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Retail Price (MRP ₹) <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.mrp}
                        onChange={(e) => handleChange('mrp', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Wholesale Price (₹) <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.wholesalePrice}
                        onChange={(e) => handleChange('wholesalePrice', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-black text-emerald-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Automated Discount %
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.discountPercent}
                          onChange={(e) => handleChange('discountPercent', Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                          % OFF
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Offer Price / Special Promo (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.offerPrice}
                        onChange={(e) => handleChange('offerPrice', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-amber-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">GST Tax Slab %</label>
                      <select
                        value={formData.gstPercent}
                        onChange={(e) => handleChange('gstPercent', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value={0}>0% (Exempt)</option>
                        <option value={5}>5% (Essential Food / Staples)</option>
                        <option value={12}>12% (Processed Goods)</option>
                        <option value={18}>18% (Standard Industrial)</option>
                        <option value={28}>28% (Luxury / Electronics)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Unit of Measurement
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => handleChange('unit', e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Tin">Tin</option>
                        <option value="Pack">Pack</option>
                        <option value="Case">Case</option>
                        <option value="Box">Box</option>
                        <option value="Kg">Kg</option>
                        <option value="Bag">Bag</option>
                        <option value="Piece">Piece</option>
                        <option value="Litre">Litre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Minimum Order Qty (MOQ) <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.moq}
                        onChange={(e) => handleChange('moq', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Maximum Order Limit
                      </label>
                      <input
                        type="number"
                        value={formData.maxOrderQty}
                        onChange={(e) => handleChange('maxOrderQty', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="taxIncl"
                        checked={formData.taxIncluded}
                        onChange={(e) => handleChange('taxIncluded', e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                      />
                      <label htmlFor="taxIncl" className="font-bold text-slate-300 cursor-pointer">
                        Wholesale price includes GST tax
                      </label>
                    </div>
                  </div>

                  {/* Dynamic Tier / Bulk Discount Pricing Table */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-extrabold text-white flex items-center gap-2">
                          <Layers className="text-emerald-400" size={16} /> Dynamic Tier / Bulk Pricing
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Encourage larger orders by offering volume tier discounts (e.g. 10+ Units = ₹450, 50+ = ₹420).
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddTierRow}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Tier Rule
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                          <tr>
                            <th className="p-3">Order Quantity Threshold</th>
                            <th className="p-3">Tier Unit Price (₹)</th>
                            <th className="p-3">Calculated Discount</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 font-semibold text-slate-200">
                          {formData.tierPricing.map((tier, idx) => (
                            <tr key={tier.id} className="hover:bg-slate-950/60">
                              <td className="p-3">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    value={tier.minUnits}
                                    onChange={(e) => handleUpdateTierRow(idx, 'minUnits', e.target.value)}
                                    className="w-20 rounded-lg border border-slate-800 bg-slate-950 p-1.5 font-mono font-bold text-emerald-400"
                                  />
                                  <span className="text-slate-400 font-sans font-bold">+ Units</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={tier.price}
                                  onChange={(e) => handleUpdateTierRow(idx, 'price', e.target.value)}
                                  className="w-28 rounded-lg border border-slate-800 bg-slate-950 p-1.5 font-mono font-bold text-white"
                                />
                              </td>
                              <td className="p-3">
                                <span className="inline-block px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[11px]">
                                  {tier.discountPercent}% OFF MRP
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTierRow(idx)}
                                  className="text-slate-500 hover:text-rose-400 p-1"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: INVENTORY */}
              {currentStep === 5 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Package className="text-emerald-400" size={18} /> Step 5. Inventory Management
                    </h3>
                    <p className="text-xs text-slate-400">
                      Track warehouse locations, initial stock levels, reserved stock & low inventory alerts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Opening / Initial Stock
                      </label>
                      <input
                        type="number"
                        value={formData.openingStock}
                        onChange={(e) => handleChange('openingStock', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-extrabold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Assigned Warehouse</label>
                      <select
                        value={formData.warehouse}
                        onChange={(e) => handleChange('warehouse', e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Main Hub - Mumbai">Main Hub - Mumbai</option>
                        <option value="Regional Depot - Delhi NCR">Regional Depot - Delhi NCR</option>
                        <option value="Warehouse #3 - Bengaluru">Warehouse #3 - Bengaluru</option>
                        <option value="Central Yard - Hyderabad">Central Yard - Hyderabad</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Warehouse Location / Aisle-Bin</label>
                      <input
                        type="text"
                        value={formData.warehouseLocation}
                        onChange={(e) => handleChange('warehouseLocation', e.target.value)}
                        placeholder="e.g. Aisle 14, Shelf C-02"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-slate-200 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Low Stock Alert Threshold</label>
                      <input
                        type="number"
                        value={formData.stockAlert}
                        onChange={(e) => handleChange('stockAlert', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-amber-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Reorder Quantity</label>
                      <input
                        type="number"
                        value={formData.reorderQty}
                        onChange={(e) => handleChange('reorderQty', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Available Quantity</label>
                      <input
                        type="number"
                        value={formData.availableQty}
                        onChange={(e) => handleChange('availableQty', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Reserved Quantity (Allocated)</label>
                      <input
                        type="number"
                        value={formData.reservedQty}
                        onChange={(e) => handleChange('reservedQty', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-slate-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Expected Stock (In Transit)</label>
                      <input
                        type="number"
                        value={formData.expectedStock}
                        onChange={(e) => handleChange('expectedStock', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-blue-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: SPECIFICATIONS (DYNAMIC BASED ON CATEGORY) */}
              {currentStep === 6 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                          <Sliders className="text-emerald-400" size={18} /> Step 6. Technical Specifications
                        </h3>
                        <p className="text-xs text-slate-400">
                          Dynamic specification fields configured for{' '}
                          <span className="text-emerald-400 font-bold">{formData.category}</span>.
                        </p>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                        Category Matched
                      </span>
                    </div>
                  </div>

                  {/* Electrical Category Dynamic Specs */}
                  {formData.category === 'Electrical & Appliances' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-4">
                      <h4 className="font-extrabold text-emerald-400">⚡ Electrical & Appliance Parameters</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">Voltage (V)</label>
                          <input
                            type="text"
                            value={formData.voltage}
                            onChange={(e) => handleChange('voltage', e.target.value)}
                            placeholder="220V - 240V"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">Power (W)</label>
                          <input
                            type="text"
                            value={formData.power}
                            onChange={(e) => handleChange('power', e.target.value)}
                            placeholder="1500W"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">Current (A)</label>
                          <input
                            type="text"
                            value={formData.current}
                            onChange={(e) => handleChange('current', e.target.value)}
                            placeholder="6A"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">Frequency (Hz)</label>
                          <input
                            type="text"
                            value={formData.frequency}
                            onChange={(e) => handleChange('frequency', e.target.value)}
                            placeholder="50 Hz"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FMCG / Food Perishable Category Dynamic Specs */}
                  {(formData.category === 'FMCG & Personal Care' || formData.category === 'Grocery & Staples') && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-4">
                      <h4 className="font-extrabold text-emerald-400">🌾 Food & Perishable Details</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">Manufacturing Date</label>
                          <input
                            type="date"
                            value={formData.manufacturingDate}
                            onChange={(e) => handleChange('manufacturingDate', e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">Expiry Date (Food)</label>
                          <input
                            type="date"
                            value={formData.expiryDate}
                            onChange={(e) => handleChange('expiryDate', e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">Shelf Life</label>
                          <input
                            type="text"
                            value={formData.shelfLife}
                            onChange={(e) => handleChange('shelfLife', e.target.value)}
                            placeholder="e.g. 12 Months"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-300 mb-1">Storage Condition</label>
                          <input
                            type="text"
                            value={formData.storageCondition}
                            onChange={(e) => handleChange('storageCondition', e.target.value)}
                            placeholder="e.g. Cool & dry place away from sunlight"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-300 mb-1">FSSAI License No.</label>
                          <input
                            type="text"
                            value={formData.fssaiLicense}
                            onChange={(e) => handleChange('fssaiLicense', e.target.value)}
                            placeholder="10019022009876"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* General Material & Dimension Specs */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-4">
                    <h4 className="font-extrabold text-white">📦 Physical & Manufacturing Attributes</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">Material</label>
                        <input
                          type="text"
                          value={formData.material}
                          onChange={(e) => handleChange('material', e.target.value)}
                          placeholder="e.g. Food Grade Tin / Brass"
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">Net Weight</label>
                        <input
                          type="text"
                          value={formData.weight}
                          onChange={(e) => handleChange('weight', e.target.value)}
                          placeholder="e.g. 13.8 kg"
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">Dimensions (L x W x H)</label>
                        <input
                          type="text"
                          value={formData.dimensions}
                          onChange={(e) => handleChange('dimensions', e.target.value)}
                          placeholder="24 x 24 x 36 cm"
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">Color / Finish</label>
                        <input
                          type="text"
                          value={formData.color}
                          onChange={(e) => handleChange('color', e.target.value)}
                          placeholder="e.g. Golden Yellow"
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">Warranty Period</label>
                        <input
                          type="text"
                          value={formData.warranty}
                          onChange={(e) => handleChange('warranty', e.target.value)}
                          placeholder="e.g. 2 Years Manufacturer Warranty"
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">Country of Origin</label>
                        <select
                          value={formData.countryOfOrigin}
                          onChange={(e) => handleChange('countryOfOrigin', e.target.value)}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white"
                        >
                          <option value="India">India</option>
                          <option value="Germany">Germany</option>
                          <option value="USA">USA</option>
                          <option value="Japan">Japan</option>
                          <option value="Italy">Italy</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Certifications Checkboxes */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <h4 className="font-extrabold text-white">🛡️ Compliance & Quality Certifications</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                      {['ISI', 'BIS', 'ISO', 'FSSAI', 'CE', 'RoHS'].map((cert) => (
                        <label
                          key={cert}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer font-bold transition ${
                            formData.certifications[cert]
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.certifications[cert] || false}
                            onChange={(e) => handleNestedChange('certifications', cert, e.target.checked)}
                            className="w-4 h-4 accent-emerald-500"
                          />
                          {cert}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Custom Key-Value Specs Builder */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-extrabold text-white">Custom Specification Key-Value Pairs</h4>
                      <button
                        type="button"
                        onClick={handleAddCustomSpec}
                        className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Custom Pair
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.customSpecs.map((spec, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={spec.key}
                            onChange={(e) => handleUpdateCustomSpec(idx, 'key', e.target.value)}
                            placeholder="Key (e.g. Viscosity)"
                            className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => handleUpdateCustomSpec(idx, 'value', e.target.value)}
                            placeholder="Value (e.g. High Grade)"
                            className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomSpec(idx)}
                            className="text-slate-500 hover:text-rose-400 p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: SHIPPING DETAILS */}
              {currentStep === 7 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Truck className="text-emerald-400" size={18} /> Step 7. Shipping & Logistics
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure package dimensions, volumetric weight calculation, and B2B freight rules.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        Package Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={formData.packageWeight}
                        onChange={(e) => handleChange('packageWeight', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono font-bold text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Length (cm)</label>
                      <input
                        type="number"
                        value={formData.length}
                        onChange={(e) => handleChange('length', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Width (cm)</label>
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => handleChange('width', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleChange('height', Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-white"
                      />
                    </div>

                    <div className="sm:col-span-4 p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">Auto Volumetric Weight:</span>
                      <span className="font-mono font-extrabold text-emerald-400">
                        {((formData.length * formData.width * formData.height) / 5000).toFixed(2)} kg
                      </span>
                    </div>
                  </div>

                  {/* Logistics & Policy Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                      <span className="font-bold text-slate-300">Fragile Product?</span>
                      <input
                        type="checkbox"
                        checked={formData.isFragile}
                        onChange={(e) => handleChange('isFragile', e.target.checked)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                      <span className="font-bold text-slate-300">Dangerous Goods / Hazmat?</span>
                      <input
                        type="checkbox"
                        checked={formData.isDangerous}
                        onChange={(e) => handleChange('isDangerous', e.target.checked)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                      <span className="font-bold text-slate-300">Return Eligible?</span>
                      <input
                        type="checkbox"
                        checked={formData.isReturnable}
                        onChange={(e) => handleChange('isReturnable', e.target.checked)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                      <span className="font-bold text-slate-300">Replacement Eligible?</span>
                      <input
                        type="checkbox"
                        checked={formData.isReplaceable}
                        onChange={(e) => handleChange('isReplaceable', e.target.checked)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                      <span className="font-bold text-slate-300">COD Available?</span>
                      <input
                        type="checkbox"
                        checked={formData.isCodAvailable}
                        onChange={(e) => handleChange('isCodAvailable', e.target.checked)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900 cursor-pointer">
                      <span className="font-bold text-slate-300">Installation Required?</span>
                      <input
                        type="checkbox"
                        checked={formData.isInstallationRequired}
                        onChange={(e) => handleChange('isInstallationRequired', e.target.checked)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 8: SEO */}
              {currentStep === 8 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Globe className="text-emerald-400" size={18} /> Step 8. SEO & Search Engine Optimization
                    </h3>
                    <p className="text-xs text-slate-400">
                      Optimize URL slug, meta tags, and open graph preview images for Google B2B indexing.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-4">
                    <div>
                      <label className="block font-bold uppercase text-slate-300 mb-1">
                        URL Slug (Auto Generated)
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-mono text-[11px]">saathapp.com/wholesale/p/</span>
                        <input
                          type="text"
                          value={formData.urlSlug}
                          onChange={(e) => handleChange('urlSlug', e.target.value)}
                          className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-mono text-emerald-400 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold uppercase text-slate-300">Meta Title</label>
                        <span className="font-mono text-[10px] text-slate-400">
                          {formData.metaTitle.length} / 60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => handleChange('metaTitle', e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white font-bold"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold uppercase text-slate-300">Meta Description</label>
                        <span className="font-mono text-[10px] text-slate-400">
                          {formData.metaDescription.length} / 160 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={formData.metaDescription}
                        onChange={(e) => handleChange('metaDescription', e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 9: VISIBILITY & BADGES */}
              {currentStep === 9 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Eye className="text-emerald-400" size={18} /> Step 9. Visibility & Catalog Badges
                    </h3>
                    <p className="text-xs text-slate-400">
                      Set publication status, target audience (B2B / B2C), and promotional flags.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <h4 className="font-extrabold text-white">Publication Status</h4>
                      {['Active', 'Draft', 'Published', 'Hidden', 'Inactive'].map((st) => (
                        <label
                          key={st}
                          className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer font-bold ${
                            formData.status === st
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="statusGroup"
                            value={st}
                            checked={formData.status === st}
                            onChange={(e) => handleChange('status', e.target.value)}
                            className="w-4 h-4 accent-emerald-500"
                          />
                          {st}
                        </label>
                      ))}
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <h4 className="font-extrabold text-white">Target Audience Visibility</h4>
                      {[
                        { key: 'Business', label: 'Business Wholesalers Only (B2B)' },
                        { key: 'Customer', label: 'Retail Customers Only (B2C)' },
                        { key: 'Both', label: 'Both B2B Wholesalers & B2C Customers' },
                      ].map((vis) => (
                        <label
                          key={vis.key}
                          className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer font-bold ${
                            formData.productVisibility === vis.key
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="visGroup"
                            value={vis.key}
                            checked={formData.productVisibility === vis.key}
                            onChange={(e) => handleChange('productVisibility', e.target.value)}
                            className="w-4 h-4 accent-emerald-500"
                          />
                          {vis.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Promotional Badges Grid */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <h4 className="font-extrabold text-white">Store Badges & Promotional Flags</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { key: 'isNewArrival', label: 'New Arrival 🌟' },
                        { key: 'isBestSeller', label: 'Best Seller 🔥' },
                        { key: 'isTrending', label: 'Trending ⚡' },
                        { key: 'isRecommended', label: 'Recommended Choice 👍' },
                      ].map((b) => (
                        <label
                          key={b.key}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer font-bold ${
                            formData.badges[b.key]
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span>{b.label}</span>
                          <input
                            type="checkbox"
                            checked={formData.badges[b.key]}
                            onChange={(e) => handleNestedChange('badges', b.key, e.target.checked)}
                            className="w-4 h-4 accent-emerald-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 10: PUBLISH & PREVIEW */}
              {currentStep === 10 && (
                <div className="space-y-6 sa-rise">
                  <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                        <CheckSquare className="text-emerald-400" size={18} /> Step 10. Review & Publish SKU
                      </h3>
                      <p className="text-xs text-slate-400">
                        Review product summary card, set scheduled publish timer, and commit to live catalogue.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPreviewStoreModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow flex items-center gap-1.5"
                    >
                      <Eye size={15} /> Preview Store View
                    </button>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <img
                        src={formData.mainImage || 'https://via.placeholder.com/150'}
                        alt={formData.productName}
                        className="w-28 h-28 object-cover rounded-2xl border border-slate-800 shrink-0"
                      />
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                            {formData.sku}
                          </span>
                          <span className="text-slate-400 font-semibold">{formData.category}</span>
                        </div>
                        <h4 className="text-base font-black text-white">{formData.productName}</h4>
                        <p className="text-slate-300 text-[11px] line-clamp-2">{formData.shortDescription}</p>

                        <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
                          <div>
                            <span className="text-slate-500 text-[10px] block">Wholesale Price</span>
                            <span className="text-emerald-400 font-extrabold text-sm">
                              ₹{formData.wholesalePrice.toLocaleString('en-IN')} / {formData.unit}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block">Retail MRP</span>
                            <span className="text-slate-400 line-through">₹{formData.mrp}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block">Discount</span>
                            <span className="text-emerald-400 font-bold">{formData.discountPercent}% OFF</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block">MOQ</span>
                            <span className="text-white font-bold">{formData.moq} Units</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block">Stock</span>
                            <span className="text-white font-bold">{formData.openingStock} Units</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Publish Controls */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white flex items-center gap-2">
                        <Calendar size={16} className="text-emerald-400" /> Schedule Publication Date
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.isScheduled}
                        onChange={(e) => handleChange('isScheduled', e.target.checked)}
                        className="w-4 h-4 accent-emerald-500"
                      />
                    </div>

                    {formData.isScheduled && (
                      <div className="pt-2">
                        <label className="block font-bold text-slate-300 mb-1">Select Date & Time</label>
                        <input
                          type="datetime-local"
                          value={formData.scheduledDateTime}
                          onChange={(e) => handleChange('scheduledDateTime', e.target.value)}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER ACTION CONTROLS */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 transition"
                >
                  Save Draft
                </button>

                {currentStep < 10 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg transition"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePublishNow}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-xl transition"
                  >
                    <CheckCircle2 size={18} /> Publish Wholesale SKU
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STORE PAGE PREVIEW OVERLAY MODAL */}
      {isPreviewStoreModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Eye className="text-emerald-400" size={18} /> Live Store Page Mockup Preview
              </h3>
              <button
                type="button"
                onClick={() => setIsPreviewStoreModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <img
                src={formData.mainImage || 'https://via.placeholder.com/300'}
                alt="Product Preview"
                className="w-full h-52 object-cover rounded-2xl border border-slate-800"
              />
              <div className="space-y-2">
                <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                  {formData.sku}
                </span>
                <h4 className="text-base font-black text-white">{formData.productName}</h4>
                <p className="text-slate-400 text-[11px]">{formData.shortDescription}</p>

                <div className="pt-2 font-mono">
                  <div className="text-emerald-400 text-lg font-black">
                    ₹{formData.wholesalePrice} <span className="text-xs font-normal text-slate-400">/ {formData.unit}</span>
                  </div>
                  <div className="text-slate-500 line-through text-xs">MRP: ₹{formData.mrp} ({formData.discountPercent}% OFF)</div>
                  <div className="text-white font-bold text-xs mt-1">MOQ: {formData.moq} {formData.unit}s</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPreviewStoreModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
