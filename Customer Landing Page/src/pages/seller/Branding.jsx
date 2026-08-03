import React from 'react';
import { Link } from 'react-router-dom';
import BrandingStore from '../../components/seller/BrandingStore';
import { SELLER_PUBLIC_ROUTES } from '../../config/seller/sellerRoutes';

export default function PublicBrandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <Link to={SELLER_PUBLIC_ROUTES.welcome} className="text-sm text-slate-400 hover:text-white mb-8 inline-block">
          ← Back to Seller Welcome
        </Link>
        <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 md:p-8">
          <BrandingStore variant="dark" />
        </div>
      </div>
    </div>
  );
}
