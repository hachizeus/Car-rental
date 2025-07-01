import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isInitialLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({ isInitialLoading: false });

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isInitialLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};