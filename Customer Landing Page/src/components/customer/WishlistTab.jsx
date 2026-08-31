import React from 'react';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { EmptyState } from '../common/StateComponents';
import toast from 'react-hot-toast';

export default function WishlistTab({ wishlist, setWishlist, handleAddToCart }) {
  const handleMoveToCart = (item) => {
    handleAddToCart({
      id: item.id || `w-${Date.now()}`,
      name: item.name,
      price: item.price,
      image: item.image || '📦'
    }, 1);

    const updatedWish = wishlist.filter(w => w.id !== item.id);
    localStorage.setItem('saath_wishlist', JSON.stringify(updatedWish));
    setWishlist(updatedWish);
    toast.success(`${item.name} moved to cart!`);
  };

  const handleRemove = (itemId) => {
    const updatedWish = wishlist.filter(w => w.id !== itemId);
    localStorage.setItem('saath_wishlist', JSON.stringify(updatedWish));
    setWishlist(updatedWish);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">My Wishlist</h2>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Your pinned products and materials for future purchases.</p>
      </div>

      {wishlist.length === 0 ? (
        <EmptyState 
          icon={Heart} 
          title="Your wishlist is empty" 
          description="Save products you like to find them here later."
          actionLabel="Start Shopping"
          onAction={() => window.location.href = '/'}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="p-4 bg-slate-50/50 dark:bg-slate-950/10 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl w-12 h-12 bg-surface dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                  {item.image || '💡'}
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight">{item.name}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5 line-clamp-1">{item.desc}</p>
                  <p className="text-sm font-black text-[#6C3BFF] mt-1">₹{item.price}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl cursor-pointer transition-colors flex items-center justify-center"
                  title="Move to Cart"
                >
                  <ShoppingCart size={14} />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl cursor-pointer transition-colors flex items-center justify-center"
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
