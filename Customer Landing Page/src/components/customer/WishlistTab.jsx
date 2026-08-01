import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistTab({ wishlist, setWishlist, cart, setCart }) {
  const handleMoveToCart = (item) => {
    const updatedCart = [...cart];
    const idx = updatedCart.findIndex(c => c.name === item.name);
    if (idx !== -1) {
      updatedCart[idx].count += 1;
    } else {
      updatedCart.push({
        id: `c-${Date.now()}`,
        name: item.name,
        price: item.price,
        count: 1,
        image: item.image || '📦'
      });
    }
    localStorage.setItem('saath_cart', JSON.stringify(updatedCart));
    setCart(updatedCart);

    const updatedWish = wishlist.filter(w => w.id !== item.id);
    localStorage.setItem('saath_wishlist', JSON.stringify(updatedWish));
    setWishlist(updatedWish);
    alert(`${item.name} moved to cart!`);
  };

  const handleRemove = (itemId) => {
    const updatedWish = wishlist.filter(w => w.id !== itemId);
    localStorage.setItem('saath_wishlist', JSON.stringify(updatedWish));
    setWishlist(updatedWish);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">My Wishlist</h2>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Your pinned products and materials for future purchases.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="p-8 text-center bg-slate-55 dark:bg-slate-955/20 border border-slate-200/50 dark:border-slate-800 rounded-2xl space-y-2">
          <span className="text-3xl block">❤️</span>
          <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Your wishlist is empty</p>
          <p className="text-xs text-slate-400 font-semibold">Explore local stores on the homepage to pin products here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="p-4 bg-slate-50/50 dark:bg-slate-955/10 rounded-2xl border border-slate-205 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl w-12 h-12 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
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
