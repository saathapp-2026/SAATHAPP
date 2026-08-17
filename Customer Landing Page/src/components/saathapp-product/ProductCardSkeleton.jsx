import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl mb-4"></div>
      
      {/* Info Skeleton */}
      <div className="flex-1 w-full">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full mb-3"></div>
        
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-4"></div>
        
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-4"></div>
      </div>
      
      {/* Button Skeleton */}
      <div className="w-full h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
    </div>
  );
}
