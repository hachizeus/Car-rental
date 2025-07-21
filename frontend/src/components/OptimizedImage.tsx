import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  priority = false,
  onLoad
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Handle Cloudinary URLs for optimization
  const optimizedSrc = src.includes('cloudinary.com') 
    ? transformCloudinaryUrl(src, { width, height }) 
    : src;
  
  // Placeholder image while loading
  const placeholderSrc = '/placeholder.svg';
  
  useEffect(() => {
    // Preload image if priority is true
    if (priority && optimizedSrc) {
      const img = new Image();
      img.src = optimizedSrc;
    }
  }, [optimizedSrc, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: width && height ? width / height : 'auto' }}>
      {(!isLoaded || error) && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      <img
        src={error ? placeholderSrc : optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        sizes={sizes}
      />
    </div>
  );
};

// Helper function to transform Cloudinary URLs
function transformCloudinaryUrl(url: string, options: { width?: number; height?: number }) {
  if (!url.includes('cloudinary.com')) return url;
  
  // Extract base URL and transformation string
  const [baseUrl, transformations] = url.split('/upload/');
  
  // Build new transformation string
  let newTransformations = 'f_auto,q_auto';
  
  if (options.width) newTransformations += `,w_${options.width}`;
  if (options.height) newTransformations += `,h_${options.height}`;
  
  // Return transformed URL
  return `${baseUrl}/upload/${newTransformations}/${transformations || ''}`;
}