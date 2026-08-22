import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Heart, Star, Sparkles, Truck, ShieldCheck, Box, Clock,
  ChevronRight, Home, Filter, RefreshCw, X, CheckCircle2, ChevronDown,
  ShoppingBag, SlidersHorizontal, Image as ImageIcon, Check, Eye
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/common/Pagination';
import { products } from '../data/products';
import { GIFT_SET_CATEGORY } from '../config/categoryConfig';

// Import newly added category images
import allGiftsImg from '../assets/gifts/all-gifts.png';
import flowersImg from '../assets/gifts/flowers.jpg';
import chocolatesImg from '../assets/gifts/chocolates.jpg';
import sweetsImg from '../assets/gifts/sweets.jpg';
import dryFruitsImg from '../assets/gifts/dry-fruits.jpg';
import stationeryImg from '../assets/gifts/stationery.png';
import crockeryImg from '../assets/gifts/crockery.jpg';
import clothesImg from '../assets/gifts/clothes.png';
import perfumesImg from '../assets/gifts/perfumes.jpg';
import glassCupImg from '../assets/gifts/glass-cup.jpg';
import personalizedImg from '../assets/gifts/personalized.jpg';

const ITEMS_PER_PAGE = 12;

const SUBCATEGORY_ICONS = {
  'All Gift Sets': '🎁',
  'Chocolate Gift Sets': '🍫',
  'Stationery Gift Sets': '✏️',
  'Flower Gift Sets': '💐',
  'Sweets & Mithai Boxes': '🍬',
  'Clothes Gift Sets': '👔',
  'Glass & Cup Sets': '☕',
  'Crockery Gift Sets': '🍵',
  'Ceramic Gift Sets': '🏺',
  'Dry Fruit Gift Sets': '🥜',
  'Beauty & Wellness Gift Sets': '🧴',
  'Perfume Gift Sets': '✨',
  'Kids Gift Sets': '🧸',
  'Birthday Gift Sets': '🎂',
  'Wedding Gift Sets': '💍',
  'Anniversary Gift Sets': '💖',
  'Festival Gift Sets': '🪔',
  'Corporate Gift Sets': '💼',
  'Personalized Gift Sets': '🖼️',
  'Custom Gift Hampers': '📦'
};

export default function GiftSetPage({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode,
  handleAddToCart
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const gridTopRef = useRef(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Pagination page parameter sync with URL
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  // URL Query Sync State
  const subCategoryFromUrl = searchParams.get('subCategory') || 'All';
  const occasionFromUrl = searchParams.getAll('occasion');
  const recipientFromUrl = searchParams.getAll('recipient');
  const priceRangeFromUrl = searchParams.get('priceRange') || '';
  const minPriceFromUrl = searchParams.get('minPrice') || '';
  const maxPriceFromUrl = searchParams.get('maxPrice') || '';
  const deliveryFromUrl = searchParams.getAll('deliveryType');
  const ratingFromUrl = parseFloat(searchParams.get('rating') || '0');
  const sortFromUrl = searchParams.get('sort') || 'popular';

  // Filters State
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryFromUrl);
  const [selectedOccasion, setSelectedOccasion] = useState(occasionFromUrl);
  const [selectedRecipient, setSelectedRecipient] = useState(recipientFromUrl);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRangeFromUrl);
  const [customMinPrice, setCustomMinPrice] = useState(minPriceFromUrl);
  const [customMaxPrice, setCustomMaxPrice] = useState(maxPriceFromUrl);
  const [appliedMinPrice, setAppliedMinPrice] = useState(minPriceFromUrl);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(maxPriceFromUrl);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(deliveryFromUrl);
  const [selectedRating, setSelectedRating] = useState(ratingFromUrl);
  const [sortBy, setSortBy] = useState(sortFromUrl);

  // Expand / Collapse View More State for Filters
  const [showMoreOccasions, setShowMoreOccasions] = useState(false);
  const [showMoreRecipients, setShowMoreRecipients] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  // Customization Modal State
  const [customizingProduct, setCustomizingProduct] = useState(null);
  const [customizationForm, setCustomizationForm] = useState({
    greetingCard: true,
    recipientName: '',
    message: 'Wishing you joy, love, and happiness!',
    photo: null,
    giftWrapping: true,
    ribbonColor: 'Red',
    packaging: 'Standard Gift Box'
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  // Sync state back to URL query parameters
  const updateUrlParams = (newParams) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          params.delete(key);
          value.forEach(val => params.append(key, val));
        } else if (value !== undefined && value !== null && value !== '') {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });
      params.set('page', '1'); // Reset to page 1 on filter/sort change
      return params;
    });
  };

  // Filter Products (Real-time computed)
  const giftProducts = useMemo(() => {
    return products.filter(p => p.category === 'gift-set' || p.vertical === 'GIFT_SET');
  }, []);

  // Dynamic Subcategory Product Counts
  const subCategoryCounts = useMemo(() => {
    const counts = { 'All Gift Sets': giftProducts.length };
    GIFT_SET_CATEGORY.subcategories.forEach(sub => {
      const target = sub.replace(' Sets', '').replace(' Gift', '').toLowerCase();
      const count = giftProducts.filter(p =>
        p.subCategory?.toLowerCase().includes(target) ||
        p.name?.toLowerCase().includes(target)
      ).length;
      counts[sub] = count;
    });
    return counts;
  }, [giftProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...giftProducts];

    // Subcategory / Quick Icon Filter
    if (selectedSubCategory !== 'All') {
      const target = selectedSubCategory.toLowerCase();
      result = result.filter(p =>
        p.subCategory?.toLowerCase().includes(target) ||
        p.name?.toLowerCase().includes(target)
      );
    }

    // Occasion Filter (OR logic within Occasion group)
    if (selectedOccasion.length > 0) {
      result = result.filter(p => {
        if (!p.occasion) return false;
        if (Array.isArray(p.occasion)) {
          return p.occasion.some(o => selectedOccasion.some(so => so.toLowerCase().trim() === o.toLowerCase().trim()));
        }
        return selectedOccasion.some(so => so.toLowerCase().trim() === p.occasion.toLowerCase().trim());
      });
    }

    // Recipient Filter (OR logic within Recipient group)
    if (selectedRecipient.length > 0) {
      result = result.filter(p => {
        if (!p.recipient) return false;
        if (Array.isArray(p.recipient)) {
          return p.recipient.some(r => selectedRecipient.some(sr => sr.toLowerCase().trim() === r.toLowerCase().trim()));
        }
        return selectedRecipient.some(sr => sr.toLowerCase().trim() === p.recipient.toLowerCase().trim());
      });
    }

    // Preset Price Range Filter
    if (selectedPriceRange) {
      if (selectedPriceRange === 'Under ₹299') result = result.filter(p => p.price < 299);
      else if (selectedPriceRange === '₹299–₹499' || selectedPriceRange === '₹299-₹499') result = result.filter(p => p.price >= 299 && p.price <= 499);
      else if (selectedPriceRange === '₹500–₹999' || selectedPriceRange === '₹500-₹999') result = result.filter(p => p.price >= 500 && p.price <= 999);
      else if (selectedPriceRange === '₹1,000–₹2,499' || selectedPriceRange === '₹1,000-₹2,499') result = result.filter(p => p.price >= 1000 && p.price <= 2499);
      else if (selectedPriceRange === '₹2,500+') result = result.filter(p => p.price >= 2500);
    }

    // Custom Price Min / Max Range Filter
    if (appliedMinPrice !== '') {
      const minVal = parseFloat(appliedMinPrice);
      if (!isNaN(minVal)) result = result.filter(p => p.price >= minVal);
    }
    if (appliedMaxPrice !== '') {
      const maxVal = parseFloat(appliedMaxPrice);
      if (!isNaN(maxVal)) result = result.filter(p => p.price <= maxVal);
    }

    // Delivery Type Filter (OR logic within Delivery Type group)
    if (selectedDeliveryType.length > 0) {
      result = result.filter(p => {
        if (!p.deliveryType) return false;
        return selectedDeliveryType.some(sd => sd.toLowerCase().trim() === p.deliveryType.toLowerCase().trim());
      });
    }

    // Rating Filter
    if (selectedRating > 0) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    // Sorting
    if (sortBy === 'price_low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') result.sort((a, b) => (b.badge === 'New' ? 1 : -1));

    return result;
  }, [giftProducts, selectedSubCategory, selectedOccasion, selectedRecipient, selectedPriceRange, appliedMinPrice, appliedMaxPrice, selectedDeliveryType, selectedRating, sortBy]);

  // Total pages calculation
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  }, [filteredProducts.length]);

  // Paginated visible slice of products
  const paginatedProducts = useMemo(() => {
    const validPage = Math.min(currentPage, totalPages);
    const startIdx = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage, totalPages]);

  // Filter Toggle Handlers
  const handleSubCategorySelect = (sub) => {
    setSelectedSubCategory(sub);
    updateUrlParams({ subCategory: sub === 'All' ? '' : sub });
  };

  const toggleOccasion = (occ) => {
    const updated = selectedOccasion.includes(occ)
      ? selectedOccasion.filter(o => o !== occ)
      : [...selectedOccasion, occ];
    setSelectedOccasion(updated);
    updateUrlParams({ occasion: updated });
  };

  const toggleRecipient = (rec) => {
    const updated = selectedRecipient.includes(rec)
      ? selectedRecipient.filter(r => r !== rec)
      : [...selectedRecipient, rec];
    setSelectedRecipient(updated);
    updateUrlParams({ recipient: updated });
  };

  const handlePriceRangeSelect = (label) => {
    const nextVal = selectedPriceRange === label ? '' : label;
    setSelectedPriceRange(nextVal);
    updateUrlParams({ priceRange: nextVal });
  };

  const handleApplyCustomPrice = (e) => {
    e.preventDefault();
    setAppliedMinPrice(customMinPrice);
    setAppliedMaxPrice(customMaxPrice);
    updateUrlParams({ minPrice: customMinPrice, maxPrice: customMaxPrice });
    showToast(`Applied Price Filter: ₹${customMinPrice || 0} - ₹${customMaxPrice || '∞'}`);
  };

  const toggleDelivery = (del) => {
    const updated = selectedDeliveryType.includes(del)
      ? selectedDeliveryType.filter(d => d !== del)
      : [...selectedDeliveryType, del];
    setSelectedDeliveryType(updated);
    updateUrlParams({ deliveryType: updated });
  };

  const handleRatingSelect = (r) => {
    const nextVal = selectedRating === r ? 0 : r;
    setSelectedRating(nextVal);
    updateUrlParams({ rating: nextVal || '' });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    updateUrlParams({ sort: newSort });
  };

  const clearAllFilters = () => {
    setSelectedSubCategory('All');
    setSelectedOccasion([]);
    setSelectedRecipient([]);
    setSelectedPriceRange('');
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setAppliedMinPrice('');
    setAppliedMaxPrice('');
    setSelectedDeliveryType([]);
    setSelectedRating(0);
    setSortBy('popular');
    setSearchParams({}, { replace: true });
    showToast('All filters reset');
  };

  // Handle Page Change with Smooth Scroll and URL sync
  const handlePageChange = (newPage) => {
    setSearchParams(params => {
      params.set('page', newPage.toString());
      return params;
    });

    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add to Cart handler with Toast feedback
  const onAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    if (handleAddToCart) {
      handleAddToCart(product);
    }
    showToast(`Added "${product.name}" to cart! 🎁`);
  };

  // Open Gift Customization Modal
  const openCustomizationModal = (product, e) => {
    if (e) e.stopPropagation();
    setCustomizingProduct(product);
    setPhotoPreview(null);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setCustomizationForm(prev => ({ ...prev, photo: file.name }));
    }
  };

  const handleConfirmCustomization = (e) => {
    e.preventDefault();
    const customizedProduct = {
      ...customizingProduct,
      customizationOptions: customizationForm
    };
    if (handleAddToCart) {
      handleAddToCart(customizedProduct);
    }
    showToast(`Added Customized "${customizingProduct.name}" to cart! 🎁✨`);
    setCustomizingProduct(null);
  };

  // Recipient Options array per spec
  const recipientOptions = [
    'For Her', 'For Him', 'For Kids', 'For Parents', 'For Friends', 'For Couples', 'For Employees', 'For Clients'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 relative">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-rose-500/40"
          >
            <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
              <Check size={14} />
            </div>
            <span className="text-xs font-black">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-5">
          <button onClick={() => navigate('/')} className="hover:text-primary flex items-center gap-1">
            <Home size={12} /> Home
          </button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/products')} className="hover:text-primary">Categories</button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-200 font-bold">Gift Set</span>
        </div>

        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-purple-500/10 border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider mb-3">
                <Gift size={14} /> MARKETPLACE GIFT STORE
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                Gift Set 🎁
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mb-6">
                Find the perfect gift for every occasion. Thoughtful gifts for your loved ones, friends, family & corporate.
              </p>

              {/* 4 Trust Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                    <Gift size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Wide Variety</div>
                    <div className="text-[9.5px] text-slate-500 font-medium">For Every Occasion</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Premium Quality</div>
                    <div className="text-[9.5px] text-slate-500 font-medium">Carefully Selected</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center shrink-0">
                    <Box size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Secure Packaging</div>
                    <div className="text-[9.5px] text-slate-500 font-medium">Safe & Beautiful</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
                    <Truck size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">On-time Delivery</div>
                    <div className="text-[9.5px] text-slate-500 font-medium">Fast & Reliable</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Graphic */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 relative flex items-center justify-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-400 p-1 shadow-xl rotate-3 transform hover:rotate-0 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80"
                  alt="Gift Set Box"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* QUICK CATEGORY ICON ROW (Fully Functional) */}
        <div className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'All', label: 'All', icon: '🎁', image: allGiftsImg },
              { id: 'Chocolate', label: 'Chocolate', icon: '🍫', image: chocolatesImg },
              { id: 'Flower', label: 'Flowers', icon: '💐', image: flowersImg },
              { id: 'Sweets', label: 'Sweets', icon: '🍬', image: sweetsImg },
              { id: 'Dry Fruit', label: 'Dry Fruits', icon: '🥜', image: dryFruitsImg },
              { id: 'Stationery', label: 'Stationery', icon: '✏️', image: stationeryImg },
              { id: 'Crockery', label: 'Crockery', icon: '🍵', image: crockeryImg },
              { id: 'Clothes', label: 'Clothes', icon: '👔', image: clothesImg },
              { id: 'Perfume', label: 'Perfume', icon: '✨', image: perfumesImg },
              { id: 'Glass & Cup', label: 'Glass & Cup', icon: '☕', image: glassCupImg },
              { id: 'Personalized', label: 'Personalized', icon: '🖼️', image: personalizedImg },
            ].map(cat => {
              const active = selectedSubCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSubCategorySelect(cat.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl min-w-[76px] transition-all cursor-pointer ${
                    active
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105 font-black'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-400 hover:shadow-xs font-semibold'
                  }`}
                >
                  {cat.image ? (
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                      <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <span className="text-2xl h-8 flex items-center justify-center">{cat.icon}</span>
                  )}
                  <span className="text-[11px] tracking-tight whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN LAYOUT: LEFT FILTERS SIDEBAR + PRODUCT GRID */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT FILTERS SIDEBAR */}
          <aside className="w-full lg:w-64 shrink-0 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                <Filter size={16} className="text-rose-500" /> Filters
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* OCCASION FILTER */}
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">Occasion</h4>
              <div className="space-y-2">
                {(showMoreOccasions ? GIFT_SET_CATEGORY.occasions : GIFT_SET_CATEGORY.occasions.slice(0, 5)).map(occ => (
                  <label key={occ} className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-rose-500">
                    <input
                      type="checkbox"
                      checked={selectedOccasion.includes(occ)}
                      onChange={() => toggleOccasion(occ)}
                      className="rounded accent-rose-500"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() => setShowMoreOccasions(!showMoreOccasions)}
                  className="text-[11px] font-bold text-rose-500 hover:underline pt-1 cursor-pointer flex items-center gap-1"
                >
                  {showMoreOccasions ? 'Show Less' : `+ View More (${GIFT_SET_CATEGORY.occasions.length - 5})`}
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            {/* RECIPIENT FILTER */}
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">Recipient</h4>
              <div className="space-y-2">
                {(showMoreRecipients ? recipientOptions : recipientOptions.slice(0, 4)).map(rec => (
                  <label key={rec} className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-rose-500">
                    <input
                      type="checkbox"
                      checked={selectedRecipient.includes(rec)}
                      onChange={() => toggleRecipient(rec)}
                      className="rounded accent-rose-500"
                    />
                    <span>{rec}</span>
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() => setShowMoreRecipients(!showMoreRecipients)}
                  className="text-[11px] font-bold text-rose-500 hover:underline pt-1 cursor-pointer"
                >
                  {showMoreRecipients ? 'Show Less' : `+ View More (${recipientOptions.length - 4})`}
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            {/* CATEGORY / SUBCATEGORY FILTER */}
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">Subcategory</h4>
              <div className="space-y-1 text-xs">
                {['All Gift Sets', ...(showMoreCategories ? GIFT_SET_CATEGORY.subcategories : GIFT_SET_CATEGORY.subcategories.slice(0, 6))].map(sub => {
                  const key = sub === 'All Gift Sets' ? 'All' : sub.replace(' Sets', '').replace(' Gift', '');
                  const active = selectedSubCategory.toLowerCase() === key.toLowerCase();
                  const count = subCategoryCounts[sub] || 0;
                  const icon = SUBCATEGORY_ICONS[sub] || '🎁';

                  return (
                    <button
                      key={sub}
                      onClick={() => handleSubCategorySelect(key)}
                      className={`w-full flex items-center justify-between text-left py-2 px-2.5 rounded-xl transition-all duration-150 cursor-pointer text-xs group ${
                        active
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold border-l-3 border-rose-500 shadow-2xs'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium hover:translate-x-0.5'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-1">
                        <span className="text-sm shrink-0 group-hover:scale-110 transition-transform">{icon}</span>
                        <span className="truncate">{sub}</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 transition-colors ${
                          active
                            ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 font-extrabold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setShowMoreCategories(!showMoreCategories)}
                  className="text-[11px] font-bold text-rose-500 hover:underline pt-1 cursor-pointer"
                >
                  {showMoreCategories ? 'Show Less' : `+ View More (${GIFT_SET_CATEGORY.subcategories.length - 6})`}
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            {/* PRICE RANGE FILTER + CUSTOM MIN/MAX INPUTS */}
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">Price Range</h4>
              <div className="space-y-2 text-xs mb-3">
                {GIFT_SET_CATEGORY.priceRanges.map(p => (
                  <label key={p.label} className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === p.label}
                      onChange={() => handlePriceRangeSelect(p.label)}
                      className="accent-rose-500"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>

              {/* Custom Min / Max Price Inputs */}
              <form onSubmit={handleApplyCustomPrice} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500">Custom Price (₹)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={customMinPrice}
                    onChange={(e) => setCustomMinPrice(e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <span className="text-slate-400 font-bold">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={customMaxPrice}
                    onChange={(e) => setCustomMaxPrice(e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-rose-500 text-white font-bold text-xs cursor-pointer hover:bg-rose-600 transition-colors shadow-2xs"
                >
                  Apply Price Range
                </button>
              </form>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            {/* DELIVERY TYPE FILTER */}
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">Delivery Type</h4>
              <div className="space-y-2 text-xs">
                {GIFT_SET_CATEGORY.deliveryTypes.map(d => (
                  <label key={d.id} className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={selectedDeliveryType.includes(d.label)}
                      onChange={() => toggleDelivery(d.label)}
                      className="rounded accent-rose-500"
                    />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            {/* RATING FILTER */}
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">Rating</h4>
              <div className="space-y-2 text-xs">
                {[4.0, 3.0, 2.0].map(r => (
                  <label key={r} className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === r}
                      onChange={() => handleRatingSelect(r)}
                      className="accent-rose-500"
                    />
                    <span>{r} ★ & above</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID + HEADER TOOLBAR */}
          <div className="flex-1 w-full" ref={gridTopRef}>
            {/* Toolbar: Results Count & Sort Dropdown */}
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
                Showing <span className="text-rose-500 font-extrabold">{filteredProducts.length}</span> results (Page {currentPage} of {totalPages})
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs font-bold py-2 px-3 outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                >
                  <option value="popular">Popularity</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* PRODUCT CARDS GRID */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="text-4xl">🎁</div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">No Gift Sets Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your filter options or selecting another subcategory.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer hover:bg-rose-600"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedProducts.map(p => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/product/${p.slug || p.id}`)}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between group relative cursor-pointer"
                  >
                    {/* Badge Pill */}
                    {p.badge && (
                      <span className={`absolute top-3 left-3 z-10 text-[9.5px] font-black uppercase px-2.5 py-1 rounded-full shadow-md ${
                        p.badge === 'Bestseller' ? 'bg-amber-500 text-white' :
                        p.badge === 'New' ? 'bg-emerald-500 text-white' : 'bg-purple-600 text-white'
                      }`}>
                        {p.badge}
                      </span>
                    )}

                    <div>
                      {/* Product Image */}
                      <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : null}
                      </div>

                      {/* Details */}
                      <div className="p-4 space-y-2">
                        <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wide flex items-center justify-between">
                          <span>{p.brand || 'SaathApp Marketplace'}</span>
                          {p.customization && (
                            <span className="text-purple-600 dark:text-purple-400 font-extrabold flex items-center gap-0.5 text-[9.5px]">
                              <Sparkles size={10} /> Custom Gift
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-rose-500 transition-colors">
                          {p.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-[10px]">
                            <Star size={10} className="fill-current" />
                            <span>{p.rating}</span>
                          </div>
                          <span className="text-[10.5px] text-slate-400 font-medium">({p.reviews})</span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-base font-black text-slate-900 dark:text-slate-100">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">₹{p.originalPrice}</span>
                          )}
                          {p.discount && (
                            <span className="text-[10px] font-black text-emerald-500 uppercase">{p.discount} OFF</span>
                          )}
                        </div>

                        {/* Delivery Badge */}
                        <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Truck size={12} /> {p.deliveryType || 'Same Day Delivery'}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Customize & Add to Cart */}
                    <div className="p-4 pt-0 space-y-2">
                      <button
                        onClick={(e) => openCustomizationModal(p, e)}
                        className="w-full py-1.5 rounded-xl border border-purple-500/40 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Sparkles size={12} /> Customize Gift
                      </button>

                      <button
                        onClick={(e) => onAddToCart(p, e)}
                        className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <ShoppingBag size={14} /> Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* REUSABLE PAGINATION BAR */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              activeColorClass="bg-rose-500 text-white shadow-xs"
              hoverBorderClass="hover:border-rose-400"
            />
          </div>
        </div>
      </main>

      {/* GIFT CUSTOMIZATION MODAL */}
      <AnimatePresence>
        {customizingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-rose-500 font-black text-sm uppercase tracking-wider">
                  <Gift size={18} /> Customize Gift Box
                </div>
                <button
                  onClick={() => setCustomizingProduct(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center gap-4 bg-rose-500/10 p-3 rounded-2xl border border-rose-200/50">
                <img src={customizingProduct.image} alt="" className="w-14 h-14 object-cover rounded-xl shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{customizingProduct.name}</h4>
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400">₹{customizingProduct.price}</span>
                </div>
              </div>

              <form onSubmit={handleConfirmCustomization} className="space-y-4 text-xs font-medium">
                {/* Recipient Name */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={customizationForm.recipientName}
                    onChange={(e) => setCustomizationForm({ ...customizationForm, recipientName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-rose-500 font-bold"
                  />
                </div>

                {/* Personal Message */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Gift Card Message</label>
                  <textarea
                    rows={2}
                    value={customizationForm.message}
                    onChange={(e) => setCustomizationForm({ ...customizationForm, message: e.target.value })}
                    placeholder="Enter custom message to print on greeting card..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Custom Photo Upload (Optional)</label>
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 rounded-xl border border-dashed border-rose-400 text-rose-600 dark:text-rose-400 font-bold cursor-pointer hover:bg-rose-500/10 flex items-center gap-1.5">
                      <ImageIcon size={14} /> Choose Image
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    {customizationForm.photo && (
                      <span className="text-slate-500 font-bold truncate max-w-[200px]">{customizationForm.photo}</span>
                    )}
                  </div>
                  {photoPreview && (
                    <div className="mt-2 w-16 h-16 rounded-xl border overflow-hidden">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Ribbon Choice */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">Choose Ribbon Color</label>
                  <div className="flex gap-2">
                    {['Red', 'Gold', 'Pink', 'Royal Blue', 'Emerald'].map(color => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setCustomizationForm({ ...customizationForm, ribbonColor: color })}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                          customizationForm.ribbonColor === color
                            ? 'border-rose-500 bg-rose-500 text-white shadow-xs'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Packaging Choice */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">Packaging Choice</label>
                  <select
                    value={customizationForm.packaging}
                    onChange={(e) => setCustomizationForm({ ...customizationForm, packaging: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                  >
                    <option value="Standard Gift Box">Standard Gift Box (Included)</option>
                    <option value="Premium Velvet Box">Premium Velvet Box (+₹150)</option>
                    <option value="Eco Wooden Box">Eco Wooden Box (+₹200)</option>
                    <option value="Royal Gold Box">Royal Gold Box (+₹250)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setCustomizingProduct(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    Confirm & Add to Cart
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
