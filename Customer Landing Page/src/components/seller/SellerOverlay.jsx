import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SELLER_Z } from '../../config/seller/sellerZIndex';

/** Lock body scroll while any overlay is mounted. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.dataset.sellerOverlay = String(Number(document.body.dataset.sellerOverlay || 0) + 1);
    return () => {
      const next = Math.max(0, Number(document.body.dataset.sellerOverlay || 1) - 1);
      document.body.dataset.sellerOverlay = String(next);
      if (next === 0) {
        document.body.style.overflow = overflow;
        document.body.style.paddingRight = paddingRight;
      }
    };
  }, [locked]);
}

/**
 * Renders overlay into document.body so sticky headers / toolbars
 * inside transformed layout parents cannot paint above it.
 */
export default function SellerOverlay({
  open,
  onClose,
  children,
  zIndex = SELLER_Z.modal,
  labelledBy,
  label,
  className = 'flex items-center justify-center p-4',
  contentClassName = '',
}) {
  useScrollLock(!!open);

  if (!open) return null;

  return createPortal(
    <div
      className={`fixed inset-0 ${className}`}
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-label={label}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        style={{ zIndex: 0 }}
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className={`relative ${contentClassName}`} style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>,
    document.body
  );
}
