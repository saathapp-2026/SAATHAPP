import React, { useState } from 'react';
import { Plus, Upload, Search, Tag, CheckCircle2, Edit, Trash2, FileSpreadsheet, Package } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';
import WholesaleAddProductModal from './WholesaleAddProductModal';

export const MOCK_PRODUCTS = [
  { id: 'SKU-FORT-15L-1006', name: 'Fortune Sunflower Oil 15L Tin', category: 'FMCG & Personal Care', price: 1850, moq: 10, stock: 450, brand: 'Fortune', status: 'Active' },
  { id: 'SKU-TATA-1KG-1002', name: 'Tata Salt 1kg Pack (Case of 24)', category: 'Grocery & Staples', price: 620, moq: 20, stock: 18, brand: 'Tata', status: 'Low Stock' },
  { id: 'SKU-ULTRA-50KG-1003', name: 'Cement 50kg PPC Bag (50 Bags/Pallet)', category: 'Construction & Paint', price: 340, moq: 50, stock: 1250, brand: 'UltraTech', status: 'Active' },
  { id: 'SKU-GATE-25KG-1004', name: 'Basmati Rice 25kg Bulk Bag', category: 'Grocery & Staples', price: 2100, moq: 15, stock: 820, brand: 'India Gate', status: 'Active' },
  { id: 'SKU-HAVE-6A-1005', name: 'Havells Modular Switch 6A (Box 20)', category: 'Electrical & Appliances', price: 890, moq: 5, stock: 0, brand: 'Havells', status: 'Out of Stock' },
];

export default function ProductsTab({ isAddModalOpen, onCloseAddModal, onOpenAddModal }) {
  const { addToast } = useWholesale ? useWholesale() : { addToast: console.log };
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
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Wholesale Product Catalogue</h2>
          <p className="text-xs text-slate-500">Manage bulk inventory items, set MOQ thresholds, tier prices, and variants.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExcelModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
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

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by SKU Code, Product Name, Category, or Brand..."
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
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
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
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

      {/* Complete 10-Step Add Product Modal */}
      <WholesaleAddProductModal
        isOpen={modalIsOpen}
        onClose={handleCloseAddModal}
        onSaveProduct={handleSaveNewProduct}
      />

      {/* Excel Import Modal */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center">
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
