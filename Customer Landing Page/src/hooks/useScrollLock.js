import { useEffect } from 'react';

/**
 * Locks the body scroll when `locked` is true.
 * Accounts for scrollbar width to prevent page layout jumping.
 */
export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    
    // Check if body already has a lock applied to handle nested modals
    const currentLocks = Number(document.body.dataset.scrollLock || 0);
    
    if (currentLocks === 0) {
      const { overflow, paddingRight } = document.body.style;
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      if (scrollbar > 0) {
        document.body.style.paddingRight = `${scrollbar}px`;
      }
      
      // Store original styles to restore them later
      document.body.dataset.originalOverflow = overflow || '';
      document.body.dataset.originalPaddingRight = paddingRight || '';
    }
    
    document.body.dataset.scrollLock = String(currentLocks + 1);
    
    return () => {
      const nextLocks = Math.max(0, Number(document.body.dataset.scrollLock || 1) - 1);
      document.body.dataset.scrollLock = String(nextLocks);
      
      if (nextLocks === 0) {
        document.body.style.overflow = document.body.dataset.originalOverflow || '';
        document.body.style.paddingRight = document.body.dataset.originalPaddingRight || '';
        delete document.body.dataset.originalOverflow;
        delete document.body.dataset.originalPaddingRight;
      }
    };
  }, [locked]);
}
