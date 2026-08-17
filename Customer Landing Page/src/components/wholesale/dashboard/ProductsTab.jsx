import React, { useState } from 'react';
import { Plus, Upload, Search, Tag, CheckCircle2, Edit, Trash2, FileSpreadsheet, Package } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import WholesaleAddProductModal from './WholesaleAddProductModal';
import InventoryTab from './InventoryTab';

export const PRODUCT_SUB_TABS = [
  'All Products',
  'Add Product',
  'Categories',
  'SKU Management',
  'Pricing',
  'Stock',
  'Availability',
  'Warehouses',
];

export const MOCK_PRODUCTS = [];

export default function ProductsTab({ isAddModalOpen, onCloseAddModal, onOpenAddModal }) {
  const { addToast } = useWholesale ? useWholesale() : { addToast: console.log };
  const [activeSubTab, setActiveSubTab] = useState('All Products');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [localAddModalOpen, setLocalAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    if (onOpenAddModal) {
      onOpenAddModal();
    }
    setLocalAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    if (onCloseAddModal) {
      onCloseAddModal();
    }
    setLocalAddModalOpen(false);
  };

  const handleExcelImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      addToast?.(`Imported ${file.name}! Added 15 new wholesale SKUs.`, 'success');
      setIsExcelModalOpen(false);
    }
  };

  const handleSaveNewProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev.filter((p) => p.id !== newProd.id)]);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modalIsOpen = Boolean(isAddModalOpen || localAddModalOpen);

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Products &amp; Catalogue</h2>
          <p className="text-xs text-slate-500">Manage bulk inventory items, set MOQ thresholds, tier prices, variants, and warehouses.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExcelModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-surface px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-page transition"
          >
            <FileSpreadsheet size={15} className="text-emerald-500" /> Excel Bulk Import
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.02] cursor-pointer"
          >
            <Plus size={16} /> Add Product SKU
          </button>
        </div>
      </div>

      {/* Sub-Tabs Bar (PDF 4.3 Spec) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 touch-pan-x">
        {PRODUCT_SUB_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={(e) => {
              setActiveSubTab(tab);
              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              if (tab === 'Add Product') handleOpenAddModal();
            }}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all duration-150 cursor-pointer active:scale-95 touch-manipulation select-none ${
              activeSubTab === tab
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'bg-page text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Sub-Tab Views */}
      {activeSubTab === 'Warehouses' ? (
        <InventoryTab />
      ) : activeSubTab === 'Categories' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Wholesale Product Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'FMCG & Personal Care', skus: 0, value: '₹0', icon: '🧴' },
              { title: 'Grocery & Staples', skus: 0, value: '₹0', icon: '🌾' },
              { title: 'Construction & Materials', skus: 0, value: '₹0', icon: '🧱' },
              { title: 'Electrical & Lighting', skus: 0, value: '₹0', icon: '💡' },
            ].map((c) => (
              <div key={c.title} className="p-5 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-3xl">{c.icon}</span>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{c.title}</h4>
                <div className="flex justify-between text-xs text-slate-500 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>{c.skus} Active SKUs</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{c.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeSubTab === 'SKU Management' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">SKU Barcode &amp; Packaging Specs</h3>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-page dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">SKU ID</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Packaging Unit</th>
                  <th className="p-4">HSN Code</th>
                  <th className="p-4">GST Rate</th>
                  <th className="p-4">Barcode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{p.id}</td>
                    <td className="p-4 font-black">{p.name}</td>
                    <td className="p-4">Case of {p.moq}</td>
                    <td className="p-4 font-mono">HSN-2106</td>
                    <td className="p-4 text-emerald-500 font-bold">18% GST</td>
                    <td className="p-4 font-mono text-slate-500">890103098{p.id.slice(-4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeSubTab === 'Pricing' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Wholesale Quantity Tier Discount Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="p-5 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">{p.id}</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{p.name}</h4>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black px-2.5 py-1 rounded-full">Base: ₹{p.price}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-page">
                    <span className="text-[10px] text-slate-400 block">Tier 1 (1-49)</span>
                    <strong className="text-slate-900 dark:text-white">₹{p.price}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-bold">Tier 2 (50-99)</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">₹{Math.round(p.price * 0.95)}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md">
                    <span className="text-[10px] text-emerald-100 block font-bold">Tier 3 (100+)</span>
                    <strong className="text-white">₹{Math.round(p.price * 0.90)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeSubTab === 'Stock' || activeSubTab === 'Availability' ? (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Inventory Stock Levels &amp; Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{p.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{p.id}</span>
                </div>
                <div className="text-right">
                  <span className="block font-black text-sm text-slate-900 dark:text-white">{p.stock} Units</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${p.stock > 50 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {p.stock > 50 ? 'In Stock' : 'Low Stock Alert'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU Code, Product Name, Category, or Brand..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface pl-10 pr-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Table */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-page dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">SKU ID</th>
                    <th className="p-4">Product Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Wholesale Price</th>
                    <th className="p-4">MOQ</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-page transition">
                      <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{p.id}</td>
                      <td className="p-4 font-extrabold text-slate-900 dark:text-white">{p.name}</td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4 font-black text-slate-900 dark:text-white">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-4 font-extrabold">{p.moq} Units</td>
                      <td className="p-4">{p.stock} Units</td>
                      <td className="p-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                            p.status === 'Active'
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                              : p.status === 'Low Stock'
                              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                              : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenAddModal()}
                          className="p-1.5 text-slate-400 hover:text-emerald-500 transition"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setProducts((prev) => prev.filter((x) => x.id !== p.id));
                            addToast?.(`Deleted SKU ${p.id}`, 'info');
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Complete 10-Step Add Product Modal */}
      <WholesaleAddProductModal
        isOpen={modalIsOpen}
        onClose={handleCloseAddModal}
        onSaveProduct={handleSaveNewProduct}
      />

      {/* Excel Import Modal */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center">
            <FileSpreadsheet size={40} className="mx-auto text-emerald-500" />
            <h3 className="mt-2 text-base font-extrabold text-slate-900 dark:text-white">
              Excel / CSV Wholesale Catalogue Upload
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Upload .xlsx or .csv containing SKU Title, Price, MOQ, Stock, and Category.
            </p>
            <div className="mt-5">
              <label className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs font-extrabold text-white cursor-pointer shadow">
                <Upload size={16} /> Choose Excel File
                <input type="file" accept=".xlsx,.csv" onChange={handleExcelImport} className="hidden" />
              </label>
            </div>
            <button
              type="button"
              onClick={() => setIsExcelModalOpen(false)}
              className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
