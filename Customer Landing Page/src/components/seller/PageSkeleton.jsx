import React from 'react';

export default function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4">
      <div className="h-8 w-48 bg-slate-200 rounded-lg" />
      <div className="h-4 w-72 bg-slate-200 rounded" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-slate-200 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-slate-200 rounded-2xl" />
    </div>
  );
}
