import re

with open('src/pages/saathapp-products/ProductDetails.jsx', 'r') as f:
    content = f.read()

state_repl = """  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
"""
content = content.replace("  const [quantity, setQuantity] = useState(1);", state_repl)

# Sizes render
sizes_old = """                      {variants.sizes.map(size => (
                        <button key={size} className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold hover:border-primary focus:border-primary focus:bg-primary/5 transition-all">
                          {size}
                        </button>
                      ))}"""
sizes_new = """                      {variants.sizes.map(size => (
                        <button key={size} 
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary'}`}>
                          {size}
                        </button>
                      ))}"""
content = content.replace(sizes_old, sizes_new)

# Colors render
colors_old = """                      {variants.colors.map(color => (
                        <button key={color} className="flex flex-col items-center gap-2 group">
                          <div className={`w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 p-1 group-hover:border-primary transition-colors`}>
                            <div className="w-full h-full rounded-full" style={{ backgroundColor: color.toLowerCase() }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-500">{color}</span>
                        </button>
                      ))}"""
colors_new = """                      {variants.colors.map(color => (
                        <button key={color} 
                          onClick={() => setSelectedColor(color)}
                          className="flex flex-col items-center gap-2 group">
                          <div className={`w-10 h-10 rounded-full border-2 p-1 transition-colors ${selectedColor === color ? 'border-primary' : 'border-slate-200 dark:border-slate-700 group-hover:border-primary'}`}>
                            <div className="w-full h-full rounded-full" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} />
                          </div>
                          <span className={`text-xs font-semibold ${selectedColor === color ? 'text-primary' : 'text-slate-500'}`}>{color}</span>
                        </button>
                      ))}"""
content = content.replace(colors_old, colors_new)

# handleAddToCart and Buy Now logic
cart_buttons_old = """              <button 
                onClick={() => handleAddToCart(product, quantity)}
                disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
                className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-black text-sm sm:text-lg transition-all transform active:scale-[0.98] ${
                  (product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0))
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <ShoppingCart size={20} className="hidden sm:block" />
                Add to Cart
              </button>
              <button 
                onClick={() => {
                  handleAddToCart(product, quantity);
                  navigate('/checkout');
                }}"""

cart_buttons_new = """              <button 
                onClick={() => {
                  if (variants?.sizes && !selectedSize) {
                    toast.error('Please select a size.');
                    return;
                  }
                  if (variants?.colors && !selectedColor) {
                    toast.error('Please select a color.');
                    return;
                  }
                  const productToAdd = { ...product };
                  if (selectedSize) productToAdd.selectedSize = selectedSize;
                  if (selectedColor) productToAdd.selectedColor = selectedColor;
                  // Make unique ID based on variants so they don't merge if different variants
                  if (selectedSize || selectedColor) {
                    productToAdd.id = `${product.id}-${selectedSize || ''}-${selectedColor || ''}`;
                    productToAdd.name = `${product.name} ${selectedSize ? `(${selectedSize})` : ''} ${selectedColor ? `(${selectedColor})` : ''}`;
                  }
                  handleAddToCart(productToAdd, quantity);
                  toast.success('Added to cart');
                }}
                disabled={product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0)}
                className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-black text-sm sm:text-lg transition-all transform active:scale-[0.98] ${
                  (product.availabilityMode === 'LIMITED' ? product.availableQuantity <= 0 : (product.stock !== undefined && product.stock <= 0))
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <ShoppingCart size={20} className="hidden sm:block" />
                Add to Cart
              </button>
              <button 
                onClick={() => {
                  if (variants?.sizes && !selectedSize) {
                    toast.error('Please select a size.');
                    return;
                  }
                  if (variants?.colors && !selectedColor) {
                    toast.error('Please select a color.');
                    return;
                  }
                  const productToAdd = { ...product };
                  if (selectedSize) productToAdd.selectedSize = selectedSize;
                  if (selectedColor) productToAdd.selectedColor = selectedColor;
                  if (selectedSize || selectedColor) {
                    productToAdd.id = `${product.id}-${selectedSize || ''}-${selectedColor || ''}`;
                    productToAdd.name = `${product.name} ${selectedSize ? `(${selectedSize})` : ''} ${selectedColor ? `(${selectedColor})` : ''}`;
                  }
                  handleAddToCart(productToAdd, quantity);
                  navigate('/checkout');
                }}"""

content = content.replace(cart_buttons_old, cart_buttons_new)

with open('src/pages/saathapp-products/ProductDetails.jsx', 'w') as f:
    f.write(content)
