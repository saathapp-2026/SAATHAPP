import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import ProductGrid from '../components/saathapp-product/ProductGrid';
import { products as groceryProducts } from '../data/products';
import { mockSaathAppProducts as serviceProducts } from '../data/saathAppProducts';
import { useCart } from '../hooks/useCart';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const { handleAddToCart } = useCart();
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // simulate network latency
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    
    // Search in both arrays
    const allProducts = [...groceryProducts, ...serviceProducts];
    
    return allProducts.filter(product => {
      if (!product) return false;
      const nameMatch = product.name?.toLowerCase().includes(lowerQuery);
      const categoryMatch = product.category?.toLowerCase().includes(lowerQuery);
      const brandMatch = product.brand?.toLowerCase().includes(lowerQuery);
      return nameMatch || categoryMatch || brandMatch;
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-page pb-20">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft size={24} className="text-slate-700 dark:text-slate-300" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {query ? `Search results for "${query}"` : 'Search'}
            </h1>
            {query && !isLoading && (
              <p className="text-sm text-slate-500">Found {results.length} items</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {!query.trim() ? (
          <div className="text-center py-20">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">Start Searching</h2>
            <p className="text-slate-500 mt-2">Find groceries, electronics, repairs, and more.</p>
          </div>
        ) : isLoading ? (
          <ProductGrid products={[]} isLoading={true} />
        ) : results.length > 0 ? (
          <ProductGrid products={results} onAddToCart={handleAddToCart} />
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No results found</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find anything matching "{query}". Try checking your spelling or using more general terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
