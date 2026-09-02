import React, { useState } from 'react';
import {
  ArrowLeftRight, Warehouse, AlertTriangle, CheckCircle2, ShieldAlert, Truck,
  FileText, Clock, User, ShieldCheck, Upload, FileUp, Info, ChevronRight, Check,
  X, AlertCircle, RefreshCw, Send, Lock, ArrowRight, Bell, Shield, Eye, CheckSquare,
  AlertOctagon, CheckSquare2
} from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export const MOCK_TRANSFER_PRODUCTS = [
  {
    id: 'PROD-1001',
    sku: 'SKU-1001',
    name: 'Fortune Sunflower Oil 15L Tin',
    barcode: '8901234567890',
    category: 'Edible Oils & FMCG',
    brand: 'Fortune',
    variant: '15L Tin Container',
    unit: 'Tin',
    totalStock: 623,
    batchNumber: 'BATCH-2026-08A',
    mfgDate: '2026-01-10',
    expiryDate: '2027-01-10',
    image: '',
    isExpired: false,
  },
  {
    id: 'PROD-1002',
    sku: 'SKU-1002',
    name: 'Tata Salt 1kg Pack (Case of 24)',
    barcode: '8901234998877',
    category: 'Grocery & Staples',
    brand: 'Tata',
    variant: '1kg Vacuum Pack',
    unit: 'Box',
    totalStock: 840,
    batchNumber: 'BATCH-2026-07F',
    mfgDate: '2026-02-01',
    expiryDate: '2028-02-01',
    image: '',
    isExpired: false,
  },
  {
    id: 'PROD-1003',
    sku: 'SKU-1003',
    name: 'Cement 50kg PPC Bag (50 Bags/Pallet)',
    barcode: '8901234112233',
    category: 'Construction & Paint',
    brand: 'UltraTech',
    variant: '50kg Bag',
    unit: 'Bag',
    totalStock: 350,
    batchNumber: 'BATCH-2026-05K',
    mfgDate: '2025-05-15',
    expiryDate: '2026-05-15',
    image: '',
    isExpired: true,
  },
];

export const MOCK_WAREHOUSES = [
  {
    code: 'WH-DEL-01',
    name: 'Delhi NCR Hub',
    city: 'Gurugram, Haryana - 122001',
    manager: 'Rajesh Sharma',
    available: 450,
    reserved: 30,
    damaged: 5,
    inTransit: 50,
  },
  {
    code: 'WH-MUM-02',
    name: 'Mumbai Express Depot',
    city: 'Andheri East, Mumbai - 400069',
    manager: 'Vikram Mehta',
    available: 120,
    reserved: 10,
    damaged: 0,
    inTransit: 20,
  },
  {
    code: 'WH-BLR-03',
    name: 'Bengaluru Tech Park Hub',
    city: 'Whitefield, Bengaluru - 560066',
    manager: 'Anish Kumar',
    available: 300,
    reserved: 40,
    damaged: 2,
    inTransit: 0,
  },
  {
    code: 'WH-HYD-04',
    name: 'Hyderabad Distribution Center',
    city: 'HITEC City, Hyderabad - 500081',
    manager: 'Srinivas Rao',
    available: 210,
    reserved: 15,
    damaged: 1,
    inTransit: 10,
  },
];

export const ALL_STATUS_NODES = [
  'Draft',
  'Pending Approval',
  'Approved',
  'Ready for Pickup',
  'Picked',
  'In Transit',
  'Reached Warehouse',
  'Received',
  'Completed',
];

export const INITIAL_TRANSFER_STATE = {
  transferId: 'TRN-PENDING',
  createdBy: '',
  createdDate: '',
  selectedProductId: '',
  fromWhCode: '',
  toWhCode: '',
  quantity: 0,
  transferType: 'Stock Transfer',
  transferDate: '',
  expectedPickupDate: '',
  expectedDeliveryDate: '',
  actualDeliveryDate: '',
  transportType: 'Partner Logistics',
  vehicleNumber: '',
  driverName: '',
  driverMobile: '',
  trackingNumber: '',
  courierName: 'SaathApp Cold Chain Express',
  lrNumber: '',
  shippingCost: 0,
  insurance: '',
  reason: '',
  attachments: [],
  statusStepIndex: 0,
  approvedBy: 'Pending',
  receivedStatus: 'Pending',

  managerApproved: false,
  supervisorApproved: false,
  warehouseApproved: false,
  hqApproved: false,

  notifySeller: true,
  notifyManager: true,
  notifyDriver: true,
  notifyAdmin: true,
  notifyRegionalMgr: true,
};

export default function InterWarehouseTransferModal({ isOpen, onClose }) {
  const _wc = useWholesale();
  const { addToast } = _wc || { addToast: console.log };

  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState(INITIAL_TRANSFER_STATE);

  const [historyList, setHistoryList] = useState([]);
  const [auditLog, setAuditLog] = useState([]);

  if (!isOpen) return null;

  const product = MOCK_TRANSFER_PRODUCTS.find((p) => p.id === formData.selectedProductId) || MOCK_TRANSFER_PRODUCTS[0];
  const fromWh = MOCK_WAREHOUSES.find((w) => w.code === formData.fromWhCode) || MOCK_WAREHOUSES[0];
  const toWh = MOCK_WAREHOUSES.find((w) => w.code === formData.toWhCode) || MOCK_WAREHOUSES[1];

  const transferableFromStock = Math.max(0, fromWh.available - fromWh.reserved);
  const remainingFromStock = Math.max(0, fromWh.available - Number(formData.quantity || 0));
  const destinationStockAfterReceive = toWh.available + Number(formData.quantity || 0);
  const totalSystemStock = fromWh.available + toWh.available;

  // Validation Rules Compliance Check
  const rule1SameWH = formData.fromWhCode !== formData.toWhCode;
  const rule2StockExceeded = Number(formData.quantity) <= fromWh.available;
  const rule3QtyPositive = Number(formData.quantity) > 0;
  const rule4NotExpired = !product.isExpired;
  const rule5DamagedConfirm = fromWh.damaged === 0 || true;
  const rule6ReservedCheck = fromWh.reserved === 0 || Number(formData.quantity) <= transferableFromStock;

  const allRulesPassed = rule1SameWH && rule2StockExceeded && rule3QtyPositive && rule4NotExpired && rule5DamagedConfirm && rule6ReservedCheck;

  const currentStatusName = ALL_STATUS_NODES[formData.statusStepIndex] || 'In Transit';
  const isApprovalRequired = Number(formData.quantity) > 1000;

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAdvanceStatus = () => {
    if (formData.statusStepIndex < ALL_STATUS_NODES.length - 1) {
      const nextIdx = formData.statusStepIndex + 1;
      const nextName = ALL_STATUS_NODES[nextIdx];
      setFormData((prev) => ({ ...prev, statusStepIndex: nextIdx }));
      addToast?.(`Advanced transfer status to "${nextName}"!`, 'info');

      setAuditLog((prev) => [
        {
          action: `Status updated to ${nextName}`,
          user: 'Rakesh Kumar',
          role: 'Seller Admin',
          time: new Date().toLocaleString(),
          ip: '157.34.192.11',
        },
        ...prev,
      ]);
    }
  };

  const handleFileUpload = (e, type = 'Document') => {
    const file = e.target.files?.[0];
    if (file) {
      const newAtt = { name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`, type };
      setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, newAtt] }));
      addToast?.(`Uploaded ${type}: "${file.name}"`, 'success');
    }
  };

  const handleConfirmTransfer = () => {
    if (!allRulesPassed) {
      addToast?.('Please resolve all validation errors before confirming transfer!', 'error');
      return;
    }

    setFormData((prev) => ({ ...prev, statusStepIndex: 8 }));
    addToast?.(`🎉 Inter-Warehouse Transfer ${formData.transferId} confirmed & active!`, 'success');
    onClose();
  };

  const handleReceiveAction = (actionType) => {
    handleFieldChange('receivedStatus', actionType);
    setFormData((prev) => ({ ...prev, statusStepIndex: 8 }));
    addToast?.(`Destination warehouse recorded: "${actionType}" for TRN ${formData.transferId}`, 'success');
  };

  const presets = [
    'Regular stock transfer for increased demand in Mumbai.',
    'Low stock alert replenishment.',
    'Seasonal demand surge.',
    'Festival stock preparation.',
    'B2B Customer bulk order fulfillment.',
    'Inventory warehouse rebalancing.',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto sa-fade">
      <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* MODAL HEADER */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
              <ArrowLeftRight size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 dark:text-white">Inter-Warehouse Inventory Transfer</h2>
                <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  ID: {formData.transferId}
                </span>
                <span className="bg-amber-500/20 text-amber-600 dark:text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Status: {currentStatusName}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Created By: <strong className="text-slate-700 dark:text-slate-300">{formData.createdBy}</strong> | Date:{' '}
                <span className="font-mono text-slate-600 dark:text-slate-400">{formData.createdDate}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold"
          >
            <X size={18} />
          </button>
        </div>

        {/* 4 SECTION TABS WITH CLEAN HEADINGS ONLY */}
        <div className="bg-page dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 pt-2 flex flex-wrap gap-2 text-xs font-bold">
          {[
            { id: 1, label: '1. Product & Warehouses' },
            { id: 2, label: '2. Logistics & Schedule' },
            { id: 3, label: '3. Documents & Summary' },
            { id: 4, label: '4. Approval, Status & Audit' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`py-3 px-4 border-b-2 font-extrabold transition flex items-center gap-1.5 ${activeSection === tab.id
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-surface rounded-t-2xl shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* MAIN BODY CONTENT AREA */}
        <div className="flex-1 p-6 overflow-y-auto sa-scrollbar text-xs space-y-6 bg-surface">

          {/* TAB 1: Product, Warehouses, Quantity & Validation Checklist */}
          {activeSection === 1 && (
            <div className="space-y-6 sa-rise">
              {/* VALIDATION COMPLIANCE AUDIT CHECKLIST - SHOWN ON TAB 1 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="text-emerald-500" size={18} /> Transfer Validation Compliance Check
                  </h4>
                  {allRulesPassed ? (
                    <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                      All Validation Checks Passed ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold bg-rose-500/20 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full border border-rose-500/30">
                      Validation Error Detected ❌
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px] font-semibold pt-1">
                  <div className={`p-2 rounded-xl flex items-center gap-2 border ${rule1SameWH ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                    {rule1SameWH ? <CheckCircle2 size={14} /> : <AlertOctagon size={14} />}
                    <span>Origin & Destination WH Different</span>
                  </div>

                  <div className={`p-2 rounded-xl flex items-center gap-2 border ${rule2StockExceeded ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                    {rule2StockExceeded ? <CheckCircle2 size={14} /> : <AlertOctagon size={14} />}
                    <span>Qty &le; Available Stock</span>
                  </div>

                  <div className={`p-2 rounded-xl flex items-center gap-2 border ${rule3QtyPositive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                    {rule3QtyPositive ? <CheckCircle2 size={14} /> : <AlertOctagon size={14} />}
                    <span>Transfer Qty &gt; 0</span>
                  </div>

                  <div className={`p-2 rounded-xl flex items-center gap-2 border ${rule4NotExpired ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                    {rule4NotExpired ? <CheckCircle2 size={14} /> : <AlertOctagon size={14} />}
                    <span>Non-Expired Product</span>
                  </div>

                  <div className={`p-2 rounded-xl flex items-center gap-2 border ${rule5DamagedConfirm ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                    {rule5DamagedConfirm ? <CheckCircle2 size={14} /> : <AlertOctagon size={14} />}
                    <span>Damaged Stock Confirmed</span>
                  </div>

                  <div className={`p-2 rounded-xl flex items-center gap-2 border ${rule6ReservedCheck ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                    {rule6ReservedCheck ? <CheckCircle2 size={14} /> : <AlertOctagon size={14} />}
                    <span>Reserved Stock Clear</span>
                  </div>
                </div>
              </div>

              {/* Product Selection Dropdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Product Selection
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">
                      PRODUCT ITEM <span className="text-emerald-500">*</span>
                    </label>
                    <select
                      value={formData.selectedProductId}
                      onChange={(e) => handleFieldChange('selectedProductId', e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-3 font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {MOCK_TRANSFER_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku}) - Batch: {p.batchNumber} {p.isExpired ? '[EXPIRED]' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-center flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">CURRENT TOTAL STOCK (ALL WAREHOUSES)</span>
                    <strong className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      {product.totalStock} Units
                    </strong>
                  </div>
                </div>

                {/* Extended Product Info Card */}
                <div className="bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-800 shrink-0"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] flex-1">
                    <div>
                      <span className="text-slate-500 block text-[10px]">SKU ID:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{product.sku}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Barcode:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-mono">{product.barcode}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Category & Brand:</span>
                      <strong className="text-slate-900 dark:text-white font-extrabold">{product.brand} • {product.category}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Variant & Unit:</span>
                      <strong className="text-slate-900 dark:text-white">{product.variant} ({product.unit})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Batch Number:</span>
                      <strong className="text-amber-500 font-mono">{product.batchNumber}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Mfg Date:</span>
                      <strong className="text-slate-700 dark:text-slate-300">{product.mfgDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Expiry Date:</span>
                      <strong className={product.isExpired ? 'text-rose-500 font-bold' : 'text-slate-700 dark:text-slate-300'}>
                        {product.expiryDate} {product.isExpired ? '(EXPIRED)' : ''}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Information */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Stock Information & Warehouse Cards
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-center">
                  {/* FROM WAREHOUSE */}
                  <div className="sm:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-page dark:bg-slate-950 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block font-bold uppercase text-slate-500 text-[10px]">
                        FROM WAREHOUSE <span className="text-emerald-500">*</span>
                      </label>
                      <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded-md">
                        Origin Hub
                      </span>
                    </div>

                    <select
                      value={formData.fromWhCode}
                      onChange={(e) => handleFieldChange('fromWhCode', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface p-2.5 font-bold text-slate-900 dark:text-white"
                    >
                      {MOCK_WAREHOUSES.map((w) => (
                        <option key={w.code} value={w.code}>
                          {w.name} ({w.code})
                        </option>
                      ))}
                    </select>

                    <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 bg-surface p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <p><strong className="text-slate-500">Address:</strong> {fromWh.city}</p>
                      <p><strong className="text-slate-500">Manager:</strong> {fromWh.manager}</p>
                      <div className="grid grid-cols-2 gap-1 pt-1 font-mono text-[10px]">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Available: {fromWh.available}</span>
                        <span className="text-amber-500 font-bold">Reserved: {fromWh.reserved}</span>
                        <span className="text-rose-500 font-bold">Damaged: {fromWh.damaged}</span>
                        <span className="text-blue-500 font-bold">Transferable: {transferableFromStock}</span>
                      </div>
                    </div>
                  </div>

                  {/* CENTER ARROW */}
                  <div className="sm:col-span-1 flex items-center justify-center py-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-sm">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  {/* TO WAREHOUSE */}
                  <div className="sm:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-page dark:bg-slate-950 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block font-bold uppercase text-slate-500 text-[10px]">
                        TO WAREHOUSE <span className="text-emerald-500">*</span>
                      </label>
                      <span className="text-[10px] font-extrabold bg-blue-500/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-md">
                        Destination
                      </span>
                    </div>

                    <select
                      value={formData.toWhCode}
                      onChange={(e) => handleFieldChange('toWhCode', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface p-2.5 font-bold text-slate-900 dark:text-white"
                    >
                      {MOCK_WAREHOUSES.map((w) => (
                        <option key={w.code} value={w.code}>
                          {w.name} ({w.code})
                        </option>
                      ))}
                    </select>

                    <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 bg-surface p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <p><strong className="text-slate-500">Address:</strong> {toWh.city}</p>
                      <p><strong className="text-slate-500">Manager:</strong> {toWh.manager}</p>
                      <div className="grid grid-cols-2 gap-1 pt-1 font-mono text-[10px]">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Current Stock: {toWh.available}</span>
                        <span className="text-blue-500 font-bold">In Transit: {toWh.inTransit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transfer Quantity & Stock Math */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Transfer Quantity & Live Stock Math
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">
                      QUANTITY TO TRANSFER (UNITS) <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.quantity}
                      onChange={(e) => handleFieldChange('quantity', e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-3 font-mono font-bold text-slate-900 dark:text-white"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Maximum transferable: {fromWh.available} Units</span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-3 space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Available Stock:</span>
                      <strong className="text-slate-900 dark:text-white">{fromWh.available}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Transfer Quantity:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">-{formData.quantity || 0}</strong>
                    </div>
                    <div className="flex justify-between text-slate-900 dark:text-white font-bold pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span>Remaining Stock (Live):</span>
                      <strong className="text-blue-500">{remainingFromStock} Units</strong>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-3 flex flex-col justify-center text-xs">
                    {remainingFromStock < 50 ? (
                      <span className="text-rose-500 font-extrabold flex items-center gap-1">
                        <AlertTriangle size={14} /> Low / Out of Stock Warning!
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                        <CheckCircle2 size={14} /> Healthy Stock Level After Transfer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Transfer Type, Dates, Logistics & Reason */}
          {activeSection === 2 && (
            <div className="space-y-6 sa-rise">
              {/* Transfer Classification & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Transfer Type</label>
                  <select
                    value={formData.transferType}
                    onChange={(e) => handleFieldChange('transferType', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                  >
                    <option value="Stock Transfer">Stock Transfer</option>
                    <option value="Emergency Transfer">Emergency Transfer</option>
                    <option value="Return Transfer">Return Transfer</option>
                    <option value="Damage Transfer">Damage Transfer</option>
                    <option value="Internal Transfer">Internal Transfer</option>
                    <option value="Branch Transfer">Branch Transfer</option>
                    <option value="Franchise Transfer">Franchise Transfer</option>
                    <option value="Warehouse Rebalancing">Warehouse Rebalancing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Transfer Date *</label>
                  <input
                    type="date"
                    value={formData.transferDate}
                    onChange={(e) => handleFieldChange('transferDate', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Expected Pickup Date</label>
                  <input
                    type="date"
                    value={formData.expectedPickupDate}
                    onChange={(e) => handleFieldChange('expectedPickupDate', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={formData.expectedDeliveryDate}
                    onChange={(e) => handleFieldChange('expectedDeliveryDate', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Logistics Details */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Logistics & Carrier Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Transport Type</label>
                    <select
                      value={formData.transportType}
                      onChange={(e) => handleFieldChange('transportType', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                    >
                      <option value="Own Vehicle">Own Vehicle</option>
                      <option value="Partner Logistics">Partner Logistics</option>
                      <option value="Third Party">Third Party</option>
                      <option value="Pickup by Warehouse">Pickup by Warehouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Vehicle Number</label>
                    <input
                      type="text"
                      value={formData.vehicleNumber}
                      onChange={(e) => handleFieldChange('vehicleNumber', e.target.value)}
                      placeholder="MH-02-EQ-8891"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Driver Name</label>
                    <input
                      type="text"
                      value={formData.driverName}
                      onChange={(e) => handleFieldChange('driverName', e.target.value)}
                      placeholder="Suresh Kumar"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Driver Mobile</label>
                    <input
                      type="text"
                      value={formData.driverMobile}
                      onChange={(e) => handleFieldChange('driverMobile', e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Tracking Number</label>
                    <input
                      type="text"
                      value={formData.trackingNumber}
                      onChange={(e) => handleFieldChange('trackingNumber', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">LR Number</label>
                    <input
                      type="text"
                      value={formData.lrNumber}
                      onChange={(e) => handleFieldChange('lrNumber', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Shipping Cost (₹)</label>
                    <input
                      type="number"
                      value={formData.shippingCost}
                      onChange={(e) => handleFieldChange('shippingCost', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 text-[10px] mb-1">Cargo Insurance</label>
                    <input
                      type="text"
                      value={formData.insurance}
                      onChange={(e) => handleFieldChange('insurance', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-2.5 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Transfer Reason */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Transfer Reason & Notes
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">{(formData.reason || '').length}/250</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-1">
                  {presets.map((pr) => (
                    <button
                      key={pr}
                      type="button"
                      onClick={() => handleFieldChange('reason', pr)}
                      className="px-2.5 py-1 rounded-lg bg-page hover:bg-slate-200 text-[10px] font-bold text-slate-700 dark:text-slate-300 transition"
                    >
                      + {pr}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  maxLength={250}
                  value={formData.reason}
                  onChange={(e) => handleFieldChange('reason', e.target.value)}
                  placeholder="Explain why stock is being transferred between warehouses..."
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-800 bg-surface dark:bg-slate-950 p-3 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Documents & Stock Calculation Summary */}
          {activeSection === 3 && (
            <div className="space-y-6 sa-rise">
              {/* Attachments & Proofs */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Attachments & Transfer Proofs
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {['Invoice', 'Challan', 'E-way Bill', 'Transfer Slip', 'Photos', 'Documents'].map((docType) => (
                    <label
                      key={docType}
                      className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-4 text-center hover:bg-page transition flex flex-col items-center justify-center space-y-1"
                    >
                      <Upload size={20} className="text-emerald-500" />
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white block">+ {docType}</span>
                      <span className="text-[9px] text-slate-400 font-mono">PDF, JPG, PNG</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, docType)}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>

                {/* Uploaded Files List */}
                <div className="bg-page dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase">Uploaded Proof Files</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {formData.attachments.map((att, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-surface border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                        <div className="flex items-center gap-2 truncate">
                          <FileText size={14} className="text-emerald-500 shrink-0" />
                          <span className="truncate text-slate-800 dark:text-slate-200">{att.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{att.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stock Calculation Summary Card */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-950 p-5 space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">Stock Calculation Summary</h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="bg-surface p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 font-sans font-bold uppercase block">Current Stock ({fromWh.name})</span>
                    <strong className="text-base font-black text-slate-900 dark:text-white">{fromWh.available} Units</strong>
                  </div>

                  <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/30">
                    <span className="text-[10px] text-slate-500 font-sans font-bold uppercase block">Transfer Quantity</span>
                    <strong className="text-base font-black text-emerald-600 dark:text-emerald-400">-{formData.quantity || 0} Units</strong>
                  </div>

                  <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/30">
                    <span className="text-[10px] text-slate-500 font-sans font-bold uppercase block">Remaining Stock ({fromWh.name})</span>
                    <strong className="text-base font-black text-blue-600 dark:text-blue-400">{remainingFromStock} Units</strong>
                  </div>

                  <div className="bg-purple-500/10 p-3 rounded-2xl border border-purple-500/30">
                    <span className="text-[10px] text-slate-500 font-sans font-bold uppercase block">Stock After Receive ({toWh.name})</span>
                    <strong className="text-base font-black text-purple-600 dark:text-purple-400">{destinationStockAfterReceive} Units</strong>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono bg-surface p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <span>Total Warehouse System Stock: <strong>{totalSystemStock} Units</strong></span>
                  <span>Logistics Cost: <strong>₹{formData.shippingCost}</strong></span>
                  <span>Estimated Arrival: <strong>2 Days</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Approval, Receive, Status, Notifications, History & Audit */}
          {activeSection === 4 && (
            <div className="space-y-6 sa-rise">

              {/* Multi-Level Approval Hierarchy */}
              <div className="bg-page dark:bg-slate-950 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck size={18} className="text-amber-500" /> Multi-Level Approval Hierarchy
                  </h4>
                  {isApprovalRequired ? (
                    <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-0.5 rounded-full border border-amber-500/30">
                      High Volume (&gt;1000 Units) Approval Mode Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-0.5 rounded-full border border-emerald-500/30">
                      Standard Payout Auto-Approved
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                  <div className="p-3 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase">1. Manager Approval</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold block">✓ Approved</span>
                    <span className="text-[10px] text-slate-400 font-normal">Rajesh Sharma (Manager)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase">2. Supervisor Approval</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold block">✓ Approved</span>
                    <span className="text-[10px] text-slate-400 font-normal">Vikram Mehta (Supervisor)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase">3. Warehouse Lead</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold block">✓ Approved</span>
                    <span className="text-[10px] text-slate-400 font-normal">Anish Kumar (Warehouse)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase">4. HQ Final Approval</span>
                    <span className="text-amber-500 font-extrabold block">⏳ Pending HQ Review</span>
                    <span className="text-[10px] text-slate-400 font-normal">HQ Operations Queue</span>
                  </div>
                </div>
              </div>

              {/* Destination Receive Actions */}
              <div className="bg-surface p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase">
                  Destination Receive Confirmation Actions ({toWh.name})
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleReceiveAction('Receive Goods')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold shadow hover:bg-emerald-500 cursor-pointer"
                  >
                    ✓ Receive Goods
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReceiveAction('Partial Receive')}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-extrabold shadow hover:bg-blue-500 cursor-pointer"
                  >
                    📦 Partial Receive
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReceiveAction('Damaged Receive')}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white font-extrabold shadow hover:bg-amber-500 cursor-pointer"
                  >
                    ⚠️ Damaged Receive
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReceiveAction('Reject Goods')}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white font-extrabold shadow hover:bg-rose-500 cursor-pointer"
                  >
                    ✕ Reject Goods
                  </button>
                </div>
              </div>

              {/* Lifecycle Status Workflow (9 Stages) */}
              <div className="bg-page dark:bg-slate-950 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock size={16} className="text-emerald-500" /> Lifecycle Status Workflow (9 Stages)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAdvanceStatus}
                    className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-[11px] shadow hover:bg-emerald-500 flex items-center gap-1 cursor-pointer"
                  >
                    Advance Status Stage ➔
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1 text-center font-mono text-[10px]">
                  {ALL_STATUS_NODES.map((nodeName, idx) => {
                    const isDone = idx <= formData.statusStepIndex;
                    const isCurrent = idx === formData.statusStepIndex;
                    return (
                      <div
                        key={nodeName}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition ${isCurrent
                            ? 'bg-emerald-600 text-white border-emerald-500 font-extrabold shadow-md scale-105'
                            : isDone
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : 'bg-surface text-slate-400 border-slate-200 dark:border-slate-800'
                          }`}
                      >
                        <div className="w-4 h-4 rounded-full flex items-center justify-center font-black text-[9px] bg-slate-950/20">
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className="truncate w-full leading-tight font-sans font-bold">{nodeName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stakeholder Notifications Summary */}
              <div className="p-4 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-2">
                  <Bell size={16} className="text-emerald-500" /> Stakeholder Notifications & Dispatch Alerts
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-bold">
                  <span className="p-2 bg-emerald-500/20 text-emerald-600 rounded-xl">📱 Seller SMS Sent</span>
                  <span className="p-2 bg-emerald-500/20 text-emerald-600 rounded-xl">🏭 Manager Email Sent</span>
                  <span className="p-2 bg-emerald-500/20 text-emerald-600 rounded-xl">🚚 Driver App Alert</span>
                  <span className="p-2 bg-emerald-500/20 text-emerald-600 rounded-xl">🛡️ Admin Audit Logged</span>
                  <span className="p-2 bg-emerald-500/20 text-emerald-600 rounded-xl">📊 Regional Digest Sent</span>
                </div>
              </div>

              {/* History & Security Audit Log */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-page dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase">Transfer History Ledger</h4>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    {historyList.map((h) => (
                      <div key={h.id} className="p-2.5 rounded-xl bg-surface border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{h.id} ({h.qty} Units)</span>
                          <span className="text-slate-500">{h.from} ➔ {h.to}</span>
                        </div>
                        <span className="text-emerald-500 font-bold">{h.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-page dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase">Security Audit Log</h4>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    {auditLog.map((log, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-surface border border-slate-200 dark:border-slate-800 space-y-0.5">
                        <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                          <span>{log.action}</span>
                          <span className="text-slate-400">{log.time}</span>
                        </div>
                        <p className="text-slate-500">By: {log.user} ({log.role}) | IP: {log.ip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 bg-surface flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-5 py-2.5 rounded-2xl border border-slate-300 text-xs font-extrabold text-slate-700 dark:text-slate-300 hover:bg-page transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmTransfer}
            className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-xs font-black text-white shadow-lg transition hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
          >
            Confirm Transfer 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
