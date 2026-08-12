import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('theme') || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState('light');

  const setTheme = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    const applyTheme = (themeMode) => {
      if (themeMode === 'dark') {
        root.classList.add('dark');
        if (body) body.classList.add('dark');
        setResolvedTheme('dark');
      } else {
        root.classList.remove('dark');
        if (body) body.classList.remove('dark');
        setResolvedTheme('light');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      const listener = (e) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
