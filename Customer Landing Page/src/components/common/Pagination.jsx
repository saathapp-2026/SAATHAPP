import React from 'react';

/**
 * Reusable Pagination Component matching the exact UI design spec.
 * 
 * Props:
 * - currentPage: number (1-based index)
 * - totalPages: number
 * - onPageChange: function(page: number)
 * - activeColorClass: string (Tailwind bg/text class for active page, default: 'bg-rose-500 text-white')
 * - hoverBorderClass: string (Tailwind hover class, default: 'hover:border-rose-400')
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  activeColorClass = 'bg-rose-500 text-white shadow-xs',
  hoverBorderClass = 'hover:border-rose-400'
}) {
  if (totalPages <= 1) return null;

  // Generate pagination items array with smart ellipsis (...)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10 select-none">
      {/* Previous Button (←) - visible if currentPage > 1 */}
      {currentPage > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Page"
          className={`transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${hoverBorderClass}`}
        >
          ←
        </button>
      )}

      {/* Page Numbers */}
      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 text-xs text-slate-400 font-medium flex items-center justify-center select-none"
            >
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;

        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
              isCurrent
                ? `${activeColorClass}`
                : `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 ${hoverBorderClass}`
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button (→) - visible if currentPage < totalPages */}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Page"
          className={`transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${hoverBorderClass}`}
        >
          →
        </button>
      )}
    </div>
  );
}
