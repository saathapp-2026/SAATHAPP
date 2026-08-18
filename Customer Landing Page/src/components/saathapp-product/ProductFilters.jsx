import React from 'react';
import { categories } from '../../data/products';

export default function ProductFilters({ filters, setFilters, activeCategory, onCategoryChange }) {
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 space-y-8">
      
      {/* Category Filter */}
      <div>
        <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Category</h3>
        <ul className="space-y-3">
          <li>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                checked={activeCategory === 'all' || !activeCategory} 
                onChange={() => onCategoryChange('all')}
                className="accent-primary" 
              />
              <span className={`text-sm ${activeCategory === 'all' || !activeCategory ? 'font-bold text-primary' : 'text-slate-600 dark:text-slate-300'}`}>All Products</span>
            </label>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  checked={activeCategory === cat.id} 
                  onChange={() => onCategoryChange(cat.id)}
                  className="accent-primary" 
                />
                <span className={`text-sm ${activeCategory === cat.id ? 'font-bold text-primary' : 'text-slate-600 dark:text-slate-300'}`}>{cat.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Price Filter */}
      <div>
        <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Price</h3>
        <ul className="space-y-3">
          {['Under ₹199', '₹199 - ₹499', '₹500 - ₹999', '₹1,000+'].map(price => (
            <li key={price}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.priceRange === price}
                  onChange={() => handleFilterChange('priceRange', price)}
                  className="rounded text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{price}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Availability */}
      <div>
        <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Availability</h3>
        <ul className="space-y-3">
          {['In Stock', 'Fast Delivery'].map(avail => (
            <li key={avail}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.availability === avail}
                  onChange={() => handleFilterChange('availability', avail)}
                  className="rounded text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{avail}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Rating */}
      <div>
        <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Rating</h3>
        <ul className="space-y-3">
          {['4★ & above', '3★ & above'].map(rating => (
            <li key={rating}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                  className="rounded text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{rating}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Product Type */}
      <div>
        <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Product Type</h3>
        <ul className="space-y-3">
          {['Official Merchandise', 'SaathApp Essentials', 'Private Label', 'Corporate'].map(type => (
            <li key={type}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.type === type}
                  onChange={() => handleFilterChange('type', type)}
                  className="rounded text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{type}</span>
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
