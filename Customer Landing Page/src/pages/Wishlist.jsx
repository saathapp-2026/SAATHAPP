import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';

export default function Wishlist({ onBack }) {
  return (
    <div className="min-h-screen bg-page px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-page px-6 py-16 text-center">
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600">
            <Heart size={28} />
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-900">Your wishlist is empty</h2>
          <p className="mt-2 text-sm text-slate-600">Save products and services you love for later.</p>
        </div>
      </div>
    </div>
  );
}
