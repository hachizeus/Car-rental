import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  width?: number;
  height?: number;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderSrc = '/placeholder.svg',
  width,
  height
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    observer.observe(imgRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholderSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};