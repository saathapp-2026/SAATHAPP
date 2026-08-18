import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCardSkeleton from './ProductCardSkeleton';

export default function ProductGrid({ products, onAddToCart, isLoading = false }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <ProductCardSkeleton key={n} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => {
        if (!product) return null;
        const isPremium = product.productTier === 'PREMIUM';
        const isLimited = product.availabilityMode === 'LIMITED';
        const isSoldOut = isLimited ? (product.availableQuantity <= 0) : (product.stock !== undefined && product.stock <= 0);

        return (
        <div key={product.id} className={`flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-4 border transition-all group ${isPremium ? 'border-amber-200 dark:border-amber-900/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'border-slate-100 dark:border-slate-800 hover:shadow-lg'}`}>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-2 relative z-10">
            {product.brand === 'SaathApp Official' ? (
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm flex items-center gap-1">
                ✓ SaathApp Official
              </span>
            ) : (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                Verified Seller
              </span>
            )}
            {isPremium ? (
              <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm flex items-center gap-1">
                <Star size={10} className="fill-white text-white" /> Premium
              </span>
            ) : product.groceryTier === 'Premium' ? (
              <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm flex items-center gap-1">
                <Star size={10} className="fill-amber-500 text-amber-500" /> Premium Grocery
              </span>
            ) : product.groceryTier === 'Normal' ? (
              <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium px-2 py-0.5 uppercase tracking-wide flex items-center gap-1">
                Normal Grocery
              </span>
            ) : product.productTier === 'NORMAL' ? (
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm flex items-center gap-1">
                Normal
              </span>
            ) : null}
            {product.isNew && (
              <span className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                New
              </span>
            )}
            {product.promotion?.active && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm flex items-center gap-1">
                {product.promotion.type.replace(/_/g, ' ')} • {product.promotion.discount} OFF
              </span>
            )}
          </div>

          {/* Image */}
          <div 
            className="w-full aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl mb-4 cursor-pointer relative overflow-hidden flex items-center justify-center"
            onClick={() => navigate(`/product/${product.slug || product.id}`)}
          >
            {product.image ? (
              <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" />
            ) : (
              <span className="text-4xl">🛍️</span>
            )}
          </div>

          {/* Info */}
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => navigate(`/product/${product.slug || product.id}`)}
          >
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1 mb-1">{product.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-1">{product.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviews})</span>
              </div>
              
              {isLimited && (
                <div className="text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  {isSoldOut ? 'Sold Out' : `Limited Stock: ${product.availableQuantity} left`}
                </div>
              )}
              {!isLimited && (
                <div className={`text-[10px] font-bold uppercase tracking-wide ${isSoldOut ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                  {isSoldOut ? 'Out of Stock' : 'In Stock'}
                </div>
              )}
            </div>
            
            <div className="text-lg font-black text-slate-800 dark:text-white mb-4">
              ₹{product.price}
            </div>
          </div>

          {/* Add to Cart */}
          <button 
            disabled={isSoldOut}
            onClick={() => onAddToCart && onAddToCart(product, 1)}
            className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border-2 transition-colors ${
              isSoldOut 
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500' 
                : isPremium
                  ? 'text-amber-600 border-amber-600/20 hover:border-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-400/20 dark:hover:bg-amber-900/20'
                  : 'text-primary border-primary/20 hover:border-primary hover:bg-primary/5'
            }`}
          >
            <ShoppingCart size={16} />
            {isSoldOut ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
        );
      })}
    </div>
  );
}
