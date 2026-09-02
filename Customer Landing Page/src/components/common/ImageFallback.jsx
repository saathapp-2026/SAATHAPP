import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Skeleton } from './StateComponents';

export default function ImageFallback({ 
  src, 
  alt, 
  className = "", 
  fallbackIcon: FallbackIcon = ImageIcon,
  containerClassName = "",
  ...props 
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 ${className} ${containerClassName}`}>
        <FallbackIcon size={24} />
      </div>
    );
  }

  return (
    <div className={`relative ${containerClassName} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <Skeleton className="w-full h-full" variant="rect" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
