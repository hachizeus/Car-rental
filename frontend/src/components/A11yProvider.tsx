import React, { createContext, useContext, useState, useEffect } from 'react';

type A11yContextType = {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
};

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export const useA11y = () => {
  const context = useContext(A11yContext);
  if (context === undefined) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
};

export const A11yProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial values from localStorage or use defaults
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('a11y-high-contrast');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('a11y-font-size');
    return saved ? JSON.parse(saved) : 16;
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem('a11y-reduced-motion');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return saved ? JSON.parse(saved) : prefersReducedMotion;
  });

  // Update localStorage when values change
  useEffect(() => {
    localStorage.setItem('a11y-high-contrast', JSON.stringify(highContrast));
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('a11y-font-size', JSON.stringify(fontSize));
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('a11y-reduced-motion', JSON.stringify(reducedMotion));
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, 12));
  const resetFontSize = () => setFontSize(16);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  const value = {
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    reducedMotion,
    toggleReducedMotion
  };

  return (
    <A11yContext.Provider value={value}>
      {children}
    </A11yContext.Provider>
  );
};