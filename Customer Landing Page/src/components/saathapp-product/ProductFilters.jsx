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

    </div>
  );
}
