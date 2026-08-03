import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { getBrandingStoreConfig } from '../../services/sellerMembershipService';
import BrandingQuoteForm from './BrandingQuoteForm';

export default function BrandingStore({ variant = 'dark', onRequestSubmitted }) {
  const config = getBrandingStoreConfig();
  const [quoteProduct, setQuoteProduct] = useState(null);
  const isLight = variant === 'light';

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag size={20} className="text-violet-500" />
          <h3 className="text-lg font-bold">{config.title}</h3>
        </div>
        <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{config.subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {config.products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`rounded-2xl border p-5 flex flex-col ${
              isLight
                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            } transition-colors`}
          >
            <div className="text-4xl mb-3">{product.icon}</div>
            <h4 className="font-semibold mb-1">{product.name}</h4>
            <p className={`text-xs flex-1 mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {product.description}
            </p>
            <button
              type="button"
              onClick={() => setQuoteProduct(product)}
              className="w-full py-2 rounded-xl text-sm font-medium bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 transition-colors"
            >
              Request Quote
            </button>
          </motion.div>
        ))}
      </div>

      <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{config.note}</p>

      {quoteProduct && (
        <BrandingQuoteForm
          product={quoteProduct}
          onClose={() => setQuoteProduct(null)}
          variant={variant}
          onSuccess={() => {
            onRequestSubmitted?.();
          }}
        />
      )}
    </div>
  );
}
