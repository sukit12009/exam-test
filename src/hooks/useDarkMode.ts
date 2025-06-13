import { useState, useEffect } from 'react';

const THEME_KEY = 'darkMode';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check for saved user preference in localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // Check for system preference if no saved preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Update localStorage and document class when darkMode changes
  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem(THEME_KEY, JSON.stringify(darkMode));
    
    // Update document class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};
