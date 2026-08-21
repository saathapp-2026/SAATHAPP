import React from 'react';
import { MASTER_CATEGORIES, GIFT_SET_CATEGORY } from '../../config/categoryConfig';

export default function ProductFilters({ filters, setFilters, activeCategory, onCategoryChange }) {
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  // Combine Master 16 Categories + Gift Set for sidebar category filter list
  const sidebarCategoryList = [
    { id: 'all', name: 'All Products' },
    ...MASTER_CATEGORIES.map(c => ({ id: c.id, name: c.name })),
    { id: 'gift-set', name: GIFT_SET_CATEGORY.name }
  ];

  const isFootwear = activeCategory === 'footwear' || activeCategory === 'shoes-slippers-sandals' || activeCategory === 'shoes';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-2xs">
      
      {/* Category Filter */}
      <div>
        <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Category</h3>
        <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {sidebarCategoryList.map(cat => {
            const isSelected = activeCategory === cat.id || (!activeCategory && cat.id === 'all');
            return (
              <li key={cat.id}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={isSelected} 
                    onChange={() => onCategoryChange(cat.id)}
                    className="accent-emerald-500" 
                  />
                  <span className={`text-xs transition-colors ${
                    isSelected ? 'font-black text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300 group-hover:text-emerald-500'
                  }`}>
                    {cat.name}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Gender / Age Filter for Footwear */}
      {isFootwear && (
        <>
          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Gender / Age</h3>
            <ul className="space-y-2.5 text-xs">
              {['Men', 'Women', 'Boys', 'Girls', 'Kids', 'Babies'].map(gender => (
                <li key={gender}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.gender === gender}
                      onChange={() => handleFilterChange('gender', gender)}
                      className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                    />
                    <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{gender}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Price Filter */}
      <div>
        <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Price</h3>
        <ul className="space-y-2.5 text-xs">
          {['Under ₹199', '₹199 - ₹499', '₹500 - ₹999', '₹1,000+'].map(price => (
            <li key={price}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.priceRange === price}
                  onChange={() => handleFilterChange('priceRange', price)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                />
                <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{price}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Footwear Filters (Size, Colour, Brand, Usage) below Price */}
      {isFootwear && (
        <>
          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Size</h3>
            <ul className="space-y-2.5 text-xs">
              {['UK6', 'UK7', 'UK8', 'UK9', 'UK10'].map(size => (
                <li key={size}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.shoeSize === size}
                      onChange={() => handleFilterChange('shoeSize', size)}
                      className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                    />
                    <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{size}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Colour</h3>
            <ul className="space-y-2.5 text-xs">
              {['Black', 'White', 'Brown', 'Blue', 'Red'].map(color => (
                <li key={color}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.shoeColor === color}
                      onChange={() => handleFilterChange('shoeColor', color)}
                      className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                    />
                    <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{color}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Brand</h3>
            <ul className="space-y-2.5 text-xs">
              {['Nike', 'Adidas', 'Puma', 'Bata'].map(brand => (
                <li key={brand}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.shoeBrand === brand}
                      onChange={() => handleFilterChange('shoeBrand', brand)}
                      className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                    />
                    <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{brand}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Usage</h3>
            <ul className="space-y-2.5 text-xs">
              {['Running', 'Casual', 'Formal', 'Sports'].map(usage => (
                <li key={usage}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.shoeUsage === usage}
                      onChange={() => handleFilterChange('shoeUsage', usage)}
                      className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                    />
                    <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{usage}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Availability */}
      <div>
        <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Availability</h3>
        <ul className="space-y-2.5 text-xs">
          {['In Stock', 'Fast Delivery'].map(avail => (
            <li key={avail}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.availability === avail}
                  onChange={() => handleFilterChange('availability', avail)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                />
                <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{avail}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Rating */}
      <div>
        <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Rating</h3>
        <ul className="space-y-2.5 text-xs">
          {['4★ & above', '3★ & above'].map(rating => (
            <li key={rating}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                />
                <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{rating}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Product Type */}
      <div>
        <h3 className="font-extrabold mb-3 uppercase text-xs tracking-wider text-slate-400">Product Type</h3>
        <ul className="space-y-2.5 text-xs">
          {['Official Merchandise', 'SaathApp Essentials'].map(type => (
            <li key={type}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.type === type}
                  onChange={() => handleFilterChange('type', type)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500" 
                />
                <span className="text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{type}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {activeCategory === 'grocery' && (
        <>
          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Grocery Tier</h3>
            <ul className="space-y-3">
              {['All Grocery', 'Normal Grocery', 'Premium Grocery'].map(tier => (
                <li key={tier}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="groceryTier"
                      checked={filters.groceryTier === tier || (!filters.groceryTier && tier === 'All Grocery')}
                      onChange={() => handleFilterChange('groceryTier', tier === 'All Grocery' ? '' : tier)}
                      className="accent-primary" 
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{tier}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {activeCategory === 'electronics' && (
        <>
          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Electronics Type</h3>
            <ul className="space-y-3 mb-6">
              {['All Electronics', 'Mobile', 'Laptop', 'TV', 'Accessories', 'Other'].map(type => (
                <li key={type}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="electronicsType"
                      checked={filters.electronicsType === type || (!filters.electronicsType && type === 'All Electronics')}
                      onChange={() => handleFilterChange('electronicsType', type === 'All Electronics' ? '' : type)}
                      className="accent-primary" 
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{type}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {activeCategory === 'spiritual-puja' && (
        <>
          <div className="h-px bg-slate-100 dark:bg-slate-800" />
          
          {/* Spiritual Filters */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Spiritual Type</h3>
            <ul className="space-y-3 mb-6">
              {['All Spiritual', 'Puja Samagri', 'Idols', 'Books', 'Prasad', 'Other'].map(type => (
                <li key={type}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="spiritualType"
                      checked={filters.spiritualType === type || (!filters.spiritualType && type === 'All Spiritual')}
                      onChange={() => handleFilterChange('spiritualType', type === 'All Spiritual' ? '' : type)}
                      className="accent-primary" 
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{type}</span>
                  </label>
                </li>
              ))}
            </ul>

            <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Deity</h3>
            <ul className="space-y-3 mb-6">
              {['Ganesh', 'Lakshmi', 'Shiva', 'Hanuman', 'Krishna', 'Durga'].map(deity => (
                <li key={deity}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.deity === deity}
                      onChange={() => handleFilterChange('deity', deity)}
                      className="rounded text-primary focus:ring-primary accent-primary" 
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{deity}</span>
                  </label>
                </li>
              ))}
            </ul>
            
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Material</h3>
            <ul className="space-y-3 mb-6">
              {['Brass', 'Marble', 'Resin', 'Clay', 'Metal'].map(mat => (
                <li key={mat}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.material === mat}
                      onChange={() => handleFilterChange('material', mat)}
                      className="rounded text-primary focus:ring-primary accent-primary" 
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{mat}</span>
                  </label>
                </li>
              ))}
            </ul>

            <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Occasion</h3>
            <ul className="space-y-3">
              {['Daily Puja', 'Diwali', 'Navratri', 'Janmashtami', 'Gifting'].map(occ => (
                <li key={occ}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.occasion === occ}
                      onChange={() => handleFilterChange('occasion', occ)}
                      className="rounded text-primary focus:ring-primary accent-primary" 
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{occ}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
