import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UI_STORAGE_KEY = 'saathapp-seller-ui';

const SellerUIContext = createContext(null);

function loadUIState() {
  try {
    const stored = localStorage.getItem(UI_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { sidebarCollapsed: false };
  } catch {
    return { sidebarCollapsed: false };
  }
}

export function SellerUIProvider({ children }) {
  const [uiState, setUiState] = useState(loadUIState);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(uiState));
  }, [uiState]);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const setSidebarCollapsed = useCallback((collapsed) => {
    setUiState((prev) => ({ ...prev, sidebarCollapsed: collapsed }));
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setUiState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  return (
    <SellerUIContext.Provider
      value={{
        sidebarCollapsed: uiState.sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebarCollapsed,
        isOnline,
      }}
    >
      {children}
    </SellerUIContext.Provider>
  );
}

export function useSellerUI() {
  const ctx = useContext(SellerUIContext);
  if (!ctx) {
    return {
      sidebarCollapsed: false,
      setSidebarCollapsed: () => {},
      toggleSidebarCollapsed: () => {},
      isOnline: true,
    };
  }
  return ctx;
}
