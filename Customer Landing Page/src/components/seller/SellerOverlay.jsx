import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SELLER_Z } from '../../config/seller/sellerZIndex';

import useScrollLock from '../../hooks/useScrollLock';

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
