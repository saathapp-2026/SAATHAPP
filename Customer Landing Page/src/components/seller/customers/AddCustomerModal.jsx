import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { CITIES, STATES } from '../../../config/seller/customerConstants';
import { createCustomer } from '../../../services/seller/sellerCustomersService';
import SellerOverlay from '../SellerOverlay';

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  city: 'Mumbai',
  state: 'Maharashtra',
  address: '',
  notes: '',
};

export default function AddCustomerModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Name and phone are required');
      return;
    }
    setLoading(true);
    try {
      const res = await createCustomer(form);
      if (res.success) {
        toast.success('Customer added');
        setForm(EMPTY);
        onCreated?.(res.data);
        onClose?.();
      }
    } catch {
      toast.error('Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="add-customer-title">
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 id="add-customer-title" className="font-bold text-lg">Add Customer</h2>
            <p className="text-xs text-slate-500 mt-0.5">Create a new customer profile</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="text-xs text-slate-500 sm:col-span-2">
            Full name *
            <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-slate-500">
            Phone *
            <input required value={form.phone} onChange={(e) => set('phone', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-slate-500">
            Email
            <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-slate-500">
            City
            <select value={form.city} onChange={(e) => set('city', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm">
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-500">
            State
            <select value={form.state} onChange={(e) => set('state', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm">
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-500 sm:col-span-2">
            Address
            <textarea value={form.address} onChange={(e) => set('address', e.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm" />
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm border border-slate-200">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50">
            {loading ? 'Saving…' : 'Add Customer'}
          </button>
        </div>
      </form>
    </SellerOverlay>
  );
}
