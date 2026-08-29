import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderTree, Plus, Edit3, Trash2, ArrowUp, ArrowDown, Image as ImageIcon,
  CheckCircle2, AlertCircle, Sparkles, Layers, Eye, ShieldAlert, ChevronRight, Home
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MASTER_CATEGORIES, GIFT_SET_CATEGORY, getDynamicProductCount } from '../../config/categoryConfig';
import { products } from '../../data/products';

export default function AdminCategoryManagement({
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
  toggleDarkMode
}) {
  const navigate = useNavigate();

  // State initialized with master categories & gift set category
  const [categoriesList, setCategoriesList] = useState([
    ...MASTER_CATEGORIES.map(c => ({
      ...c,
      productCount: getDynamicProductCount(products, c.id),
      isActive: true,
      isFeatured: c.id === 'grocery' || c.id === 'electronics' || c.id === 'fashion' || c.id === 'spiritual-puja'
    })),
    {
      ...GIFT_SET_CATEGORY,
      productCount: getDynamicProductCount(products, 'gift-set'),
      isActive: true,
      isFeatured: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subCategoryInput, setSubCategoryInput] = useState('');

  // New Category Form State
  const [newCatForm, setNewCatForm] = useState({
    name: '',
    slug: '',
    description: '',
    url: '',
    isOfficialOnly: false,
    subcategories: []
  });

  // Action Handlers
  const handleToggleActive = (id) => {
    setCategoriesList(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleToggleFeatured = (id) => {
    setCategoriesList(prev => prev.map(c => c.id === id ? { ...c, isFeatured: !c.isFeatured } : c));
  };

  const handleMoveOrder = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categoriesList.length) return;
    const updated = [...categoriesList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setCategoriesList(updated);
  };

  const handleAddSubCategory = (catId, subName) => {
    if (!subName.trim()) return;
    setCategoriesList(prev => prev.map(c => {
      if (c.id === catId) {
        return {
          ...c,
          subcategories: [...(c.subcategories || []), subName.trim()]
        };
      }
      return c;
    }));
    setSubCategoryInput('');
  };

  const handleRemoveSubCategory = (catId, subIndex) => {
    setCategoriesList(prev => prev.map(c => {
      if (c.id === catId) {
        return {
          ...c,
          subcategories: (c.subcategories || []).filter((_, idx) => idx !== subIndex)
        };
      }
      return c;
    }));
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatForm.name.trim()) return;
    const slug = newCatForm.slug.trim() || newCatForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      id: slug,
      name: newCatForm.name,
      slug: slug,
      description: newCatForm.description || `${newCatForm.name} category`,
      url: `/products/${slug}`,
      subcategories: newCatForm.subcategories,
      productCount: 0,
      isActive: true,
      isFeatured: false,
      isOfficialOnly: newCatForm.isOfficialOnly
    };
    setCategoriesList([...categoriesList, newCat]);
    setNewCatForm({ name: '', slug: '', description: '', url: '', isOfficialOnly: false, subcategories: [] });
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
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

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-emerald-500 flex items-center gap-1">
            <Home size={12} /> Home
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-200 font-bold">Admin Portal</span>
          <ChevronRight size={12} />
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Category Management</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
              <FolderTree size={14} /> ADMIN CATEGORY CONTROL PANEL
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Category System & Subcategory Management
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Manage all 16 master verticals + Gift Set marketplace category, subcategories, product counts, and seller governance.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} /> Add New Category
          </button>
        </div>

        {/* Categories Table & List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-black text-base uppercase tracking-wider flex items-center gap-2">
              <Layers size={18} className="text-emerald-500" /> All Configured Categories ({categoriesList.length})
            </h2>
            <span className="text-xs font-bold text-slate-500">Live Dynamic Counts Enabled</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="transition-colors hover:bg-emerald-50/30 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-black text-slate-700 dark:text-slate-300">
                  <th className="p-4">Order</th>
                  <th className="p-4">Category Name</th>
                  <th className="p-4">Slug & URL</th>
                  <th className="p-4 text-center">Live Product Count</th>
                  <th className="p-4 text-center">Seller Access</th>
                  <th className="p-4 text-center">Subcategories</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {categoriesList.map((cat, idx) => (
                  <tr key={cat.id} className="hover:bg-emerald-50/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-400 w-5">{idx + 1}</span>
                        <div className="flex flex-col">
                          <button
                            disabled={idx === 0}
                            onClick={() => handleMoveOrder(idx, 'up')}
                            className="p-1 hover:text-emerald-500 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            disabled={idx === categoriesList.length - 1}
                            onClick={() => handleMoveOrder(idx, 'down')}
                            className="p-1 hover:text-emerald-500 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowDown size={12} />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{cat.name}</span>
                        {cat.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-black text-[9px] uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400 font-mono">
                        {cat.url}
                      </code>
                    </td>

                    <td className="p-4 text-center">
                      <span className="font-black text-sm px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {cat.productCount} Products
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {cat.isOfficialOnly ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-extrabold text-[10px]">
                          <ShieldAlert size={12} /> SaathApp Official Only
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-extrabold text-[10px]">
                          <Sparkles size={12} /> Open Marketplace
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => setEditingCategory(editingCategory === cat.id ? null : cat.id)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                      >
                        {(cat.subcategories || []).length} Subcategories
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(cat.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer ${
                          cat.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {cat.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleFeatured(cat.id)}
                          title="Toggle Featured Status"
                          className={`p-1.5 rounded-lg border cursor-pointer ${
                            cat.isFeatured ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-slate-200 text-slate-400'
                          }`}
                        >
                          <Sparkles size={14} />
                        </button>
                        <button
                          onClick={() => navigate(cat.url)}
                          title="View Category Page"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-500 cursor-pointer"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subcategory Manager Drawer / Section */}
        {editingCategory && (
          <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-2 text-emerald-600">
                <FolderTree size={16} /> Subcategories for: {categoriesList.find(c => c.id === editingCategory)?.name}
              </h3>
              <button onClick={() => setEditingCategory(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer">Close Drawer</button>
            </div>

            {/* Subcategory Chips List */}
            <div className="flex flex-wrap gap-2">
              {(categoriesList.find(c => c.id === editingCategory)?.subcategories || []).map((sub, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span>{sub}</span>
                  <button onClick={() => handleRemoveSubCategory(editingCategory, idx)} className="hover:text-rose-500 cursor-pointer">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Add New Subcategory Input */}
            <div className="flex gap-2 max-w-md pt-2">
              <input
                type="text"
                value={subCategoryInput}
                onChange={(e) => setSubCategoryInput(e.target.value)}
                placeholder="Enter new subcategory name..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleAddSubCategory(editingCategory, subCategoryInput)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs cursor-pointer hover:bg-emerald-600"
              >
                Add Subcategory
              </button>
            </div>
          </div>
        )}
      </main>

      {/* CREATE CATEGORY MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-black text-base uppercase tracking-wider text-slate-900 dark:text-white">Create Category</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Category Name</label>
                  <input
                    type="text"
                    required
                    value={newCatForm.name}
                    onChange={(e) => setNewCatForm({ ...newCatForm, name: e.target.value })}
                    placeholder="e.g. Pet Care & Supplies"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Custom Slug (Optional)</label>
                  <input
                    type="text"
                    value={newCatForm.slug}
                    onChange={(e) => setNewCatForm({ ...newCatForm, slug: e.target.value })}
                    placeholder="e.g. pet-care"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newCatForm.description}
                    onChange={(e) => setNewCatForm({ ...newCatForm, description: e.target.value })}
                    placeholder="Category description..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={newCatForm.isOfficialOnly}
                    onChange={(e) => setNewCatForm({ ...newCatForm, isOfficialOnly: e.target.checked })}
                    className="rounded accent-purple-600"
                  />
                  <span>Restrict to SaathApp Official Seller Only</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-emerald-600"
                  >
                    Save Category
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
