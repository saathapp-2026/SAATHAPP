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
      {products.map((product) => (
        <div key={product.id} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
          
          {/* Badges */}
          <div className="flex gap-2 mb-2 relative z-10">
            {product.isNew && (
              <span className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                Bestseller
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
            
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400">({product.reviews})</span>
            </div>
            
            <div className="text-lg font-black text-slate-800 dark:text-white mb-4">
              ₹{product.price}
            </div>
          </div>

          {/* Add to Cart */}
          <button 
            onClick={() => onAddToCart && onAddToCart(product, 1)}
            className="w-full py-2 rounded-xl flex items-center justify-center gap-2 text-primary font-bold text-sm border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
