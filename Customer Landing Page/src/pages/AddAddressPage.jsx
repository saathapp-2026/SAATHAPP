import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Navigation } from 'lucide-react';

const initialForm = {
  locationName: '',
  addressLine1: '',
  houseNo: '',
  building: '',
  street: '',
  landmark: '',
  area: '',
  city: '',
  state: '',
  pincode: '',
  receiverName: '',
  mobileNumber: '',
  alternateMobile: '',
  addressType: 'Home',
  imagePreview: '',
};

import { useLocationContext } from '../context/LocationContext';

export default function AddAddressPage({ onBack }) {
  const { handleSaveAddress: onSaveAddress, handleUseCurrentLocation: onUseCurrentLocation } = useLocationContext();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [imageFileName, setImageFileName] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imagePreview: reader.result }));
      setImageFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    const requiredFields = ['locationName', 'addressLine1', 'city', 'state', 'pincode', 'receiverName', 'mobileNumber'];
    requiredFields.forEach((field) => {
      if (!String(form[field]).trim()) {
        nextErrors[field] = 'This field is required';
      }
    });

    if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) {
      nextErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    if (form.mobileNumber && !/^\d{10}$/.test(form.mobileNumber.replace(/\D/g, ''))) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const address = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: form.locationName.trim(),
      label: `${form.addressLine1.trim()}, ${form.area ? `${form.area.trim()}, ` : ''}${form.city.trim()}, ${form.state.trim()} - ${form.pincode.trim()}`,
      fullAddress: [form.addressLine1, form.houseNo, form.building, form.street, form.landmark, form.area, form.city, form.state, form.pincode].filter(Boolean).join(', '),
      addressType: form.addressType,
      phoneNumber: form.mobileNumber.trim(),
      receiverName: form.receiverName.trim(),
      alternateMobile: form.alternateMobile.trim(),
      imagePreview: form.imagePreview,
      source: 'manual',
      createdAt: new Date().toISOString(),
    };

    onSaveAddress(address);
  };

  const typeOptions = ['Home', 'Work', 'Other'];

  return (
    <div className="min-h-screen bg-page text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
          <button type="button" onClick={onBack} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex items-center gap-2 rounded-full border border-slate-200 bg-page px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-page">
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">New address</p>
            <h1 className="text-lg font-black">Add Address</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[0.95fr_0.65fr]">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="rounded-2xl border border-slate-200 bg-page p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-slate-900">Use Current Location</p>
                  <p className="text-sm text-slate-600">Quickly fill your live GPS address.</p>
                </div>
                <button type="button" onClick={onUseCurrentLocation} className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                  <span className="flex items-center gap-2"><Navigation size={16} />Detect</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Location Name</label>
              <input name="locationName" value={form.locationName} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Sirnoor" />
              {errors.locationName && <p className="mt-1 text-xs text-danger">{errors.locationName}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Address Line 1 *</label>
                <input name="addressLine1" value={form.addressLine1} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="House No / Flat / Building" />
                {errors.addressLine1 && <p className="mt-1 text-xs text-danger">{errors.addressLine1}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">House No</label>
                <input name="houseNo" value={form.houseNo} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="12" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Building</label>
                <input name="building" value={form.building} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Apex Apartments" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Street</label>
                <input name="street" value={form.street} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Main Street" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Landmark</label>
                <input name="landmark" value={form.landmark} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Near school" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Area</label>
                <input name="area" value={form.area} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Kotnoor" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">City *</label>
                <input name="city" value={form.city} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Kalaburagi" />
                {errors.city && <p className="mt-1 text-xs text-danger">{errors.city}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">State *</label>
                <input name="state" value={form.state} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Karnataka" />
                {errors.state && <p className="mt-1 text-xs text-danger">{errors.state}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="585102" />
                {errors.pincode && <p className="mt-1 text-xs text-danger">{errors.pincode}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Receiver Name *</label>
                <input name="receiverName" value={form.receiverName} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Shivam" />
                {errors.receiverName && <p className="mt-1 text-xs text-danger">{errors.receiverName}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Mobile Number *</label>
                <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="9876543210" />
                {errors.mobileNumber && <p className="mt-1 text-xs text-danger">{errors.mobileNumber}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Alternate Mobile</label>
                <input name="alternateMobile" value={form.alternateMobile} onChange={handleChange} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full rounded-2xl border border-slate-200 bg-page px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Optional" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Save address as</label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => (
                  <button key={option} type="button" onClick={() => setForm((prev) => ({ ...prev, addressType: option }))} className={`rounded-full px-3 py-2 text-sm font-semibold transition ${form.addressType === option ? 'bg-primary text-white' : 'bg-page text-slate-700'}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900">Upload Door / Building Image</h2>
                <label className="flex cursor-pointer items-center gap-2 rounded-full bg-page px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                  <Camera size={16} />
                  Upload
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden" />
                </label>
              </div>

              <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-page p-4 text-center">
                {form.imagePreview ? (
                  <img src={form.imagePreview} alt="Address preview" className="mx-auto h-40 w-full rounded-2xl object-cover" />
                ) : (
                  <div className="flex min-h-[140px] flex-col items-center justify-center text-sm text-slate-500">
                    <MapPin size={24} className="mb-2 text-primary" />
                    <p>No image uploaded yet.</p>
                  </div>
                )}
                {imageFileName && <p className="mt-2 text-xs text-slate-500">{imageFileName}</p>}
              </div>
            </div>

            <button type="submit" className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-full rounded-3xl bg-gradient-primary px-4 py-4 text-lg font-black text-white shadow-glow-primary transition hover:opacity-95">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
