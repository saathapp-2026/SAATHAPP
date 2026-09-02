import React from 'react';

export default function ProductCategoryCard({ category, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none flex flex-col items-center min-w-[100px] gap-3 p-4 rounded-2xl bg-surface border border-theme-border hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer group shrink-0"
    >
      <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-primary/5 transition-colors overflow-hidden">
        {category.icon ? (
          <img src={category.icon} alt={category.name} className="w-full h-full object-contain p-1.5 rounded-full" />
        ) : (
          <span className="text-2xl">{category.emoji || '🛍️'}</span>
        )}
      </div>
      <span className="text-xs font-bold text-center text-slate-700 dark:text-slate-200">
        {category.name}
      </span>
    </button>
  );
}
