import React from 'react';
import { RefreshCw, AlertCircle, Inbox, Search } from 'lucide-react';

export function EmptyState({ 
  icon: Icon = Inbox, 
  title = "No results found", 
  description = "We couldn't find anything matching your criteria.", 
  actionLabel, 
  onAction,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center w-full min-h-[300px] bg-surface rounded-xl border border-theme-border ${className}`}>
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Icon size={32} className="text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-6 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function ErrorState({ 
  title = "Unable to load this section", 
  description = "Please try again.", 
  onRetry,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center w-full min-h-[250px] bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/30 ${className}`}>
      <AlertCircle size={40} className="text-red-500 dark:text-red-400 mb-4" />
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">{description}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none mt-6 px-4 py-2 flex items-center gap-2 bg-white dark:bg-surface border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      )}
    </div>
  );
}

export function LoadingSpinner({ text = "Loading...", fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <RefreshCw size={32} className="text-primary animate-spin mb-4" />
      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="w-full flex justify-center">{content}</div>;
}

export function Skeleton({ className = "", variant = "rect" }) {
  const baseClass = "bg-slate-200 dark:bg-slate-800 animate-pulse";
  
  if (variant === "text") {
    return <div className={`h-4 rounded w-3/4 ${baseClass} ${className}`} />;
  }
  
  if (variant === "circle") {
    return <div className={`rounded-full ${baseClass} ${className}`} />;
  }
  
  return <div className={`rounded-xl ${baseClass} ${className}`} />;
}

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="w-full overflow-hidden border border-theme-border rounded-xl bg-surface">
      <div className="flex border-b border-theme-border bg-slate-50 dark:bg-slate-800/50 p-4">
        {[...Array(columns)].map((_, i) => (
          <div key={i} className="flex-1">
            <Skeleton variant="text" className="w-24 h-3" />
          </div>
        ))}
      </div>
      {[...Array(rows)].map((_, rIndex) => (
        <div key={rIndex} className="flex items-center p-4 border-b border-theme-border last:border-0">
          {[...Array(columns)].map((_, cIndex) => (
            <div key={cIndex} className="flex-1">
              <Skeleton variant="text" className={`h-4 ${cIndex === 0 ? 'w-3/4' : 'w-1/2'}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = 300 }) {
  return (
    <div className="w-full bg-surface border border-theme-border rounded-xl p-4 flex flex-col justify-end" style={{ height }}>
      <div className="flex justify-between items-end h-full gap-2 pt-8">
        {[...Array(12)].map((_, i) => {
          const barHeight = 20 + Math.random() * 80;
          return (
            <div key={i} className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-t-sm animate-pulse" style={{ height: `${barHeight}%` }} />
          );
        })}
      </div>
    </div>
  );
}
