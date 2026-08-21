import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Truck, Package, ShieldCheck, ChevronLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { saathPackProducts } from '../../data/saathPackProducts';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SaathPackProductDetails({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  
  const product = saathPackProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-8 text-center text-red-500">Product not found</div>;
  }

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-20">
      <Header
        cartCount={cartCount}
        location={location}
        onCartClick={onCartClick}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-slate-100 p-8 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="max-w-full rounded-xl shadow-lg" />
            </div>

            {/* Details Section */}
            <div className="p-8 flex flex-col">
              <div className="mb-6 border-b border-slate-100 pb-6">
                <h1 className="text-3xl font-black text-slate-800 mb-2">{product.name}</h1>
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  ₹{product.price} <span className="text-sm text-slate-500 font-normal">/ Pack of {product.packSize}</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Specifications
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex"><span className="w-32 font-medium">Material:</span> {product.material}</li>
                  <li className="flex"><span className="w-32 font-medium">Size:</span> {product.size}</li>
                  <li className="flex"><span className="w-32 font-medium">Quantity:</span> {product.packSize} pcs</li>
                  <li className="flex"><span className="w-32 font-medium">Suitable for:</span> Retail / Grocery / Gift / Food</li>
                  <li className="flex"><span className="w-32 font-medium">Colour:</span> Standard</li>
                  <li className="flex"><span className="w-32 font-medium">Availability:</span> Made/Procured on Order</li>
                </ul>
              </div>

              {/* Delivery */}
              <div className="mb-8 bg-green-50 rounded-xl p-4 border border-green-100">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Delivery
                </h3>
                <p className="text-green-700 font-medium mb-2">Estimated delivery: {product.delivery}</p>
                <p className="text-sm text-green-600">
                  This product is supplied through SaathPack after order confirmation and bulk procurement/manufacturing.
                </p>
              </div>

              {/* Quantity & CTA */}
              <div className="mt-auto">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Quantity (Packs)</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                      <button onClick={decrement} className="p-3 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-l-lg transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="w-12 text-center font-bold text-slate-800">{quantity}</span>
                      <button onClick={increment} className="p-3 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-r-lg transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="text-sm text-slate-500">
                      Total: <span className="font-bold text-slate-700">{quantity * product.packSize} pcs</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const productForCart = {
                      ...product,
                      name: `${product.name} (Pack of ${product.packSize})`,
                    };
                    handleAddToCart(productForCart, quantity);
                    navigate('/cart');
                  }}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
