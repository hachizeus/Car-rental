import { useState, useEffect, useRef } from 'react';

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
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  blur?: boolean;
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
  onLoad,
  objectFit = 'cover',
  quality = 80,
  blur = true
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Optimize image URL based on provider
  const optimizedSrc = getOptimizedImageUrl(src, { width, height, quality });
  
  // Placeholder image while loading
  const placeholderSrc = '/placeholder.svg';
  
  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  // Intersection observer for lazy loading
  useEffect(() => {
    if (!imgRef.current || priority) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    
    observer.observe(imgRef.current);
    
    return () => observer.disconnect();
  }, [priority]);
  
  // Preload image if priority is true
  useEffect(() => {
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
    console.error(`Failed to load image: ${src}`);
    setError(true);
  };

  // Determine which source to use
  const finalSrc = error ? placeholderSrc : 
                   (priority || isInView) ? optimizedSrc : 
                   placeholderSrc;

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        aspectRatio: width && height ? `${width} / ${height}` : 'auto',
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto'
      }}
      aria-label={error ? `Image could not be loaded: ${alt}` : undefined}
    >
      {/* Placeholder/Loading state */}
      {(!isLoaded || error) && blur && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" 
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes={sizes}
        style={{ objectFit }}
      />
    </div>
  );
};

// Helper function to get optimized image URL based on provider
function getOptimizedImageUrl(
  url: string, 
  options: { width?: number; height?: number; quality?: number }
): string {
  if (!url) return '/placeholder.svg';
  
  // Handle Cloudinary URLs
  if (url.includes('cloudinary.com')) {
    return transformCloudinaryUrl(url, options);
  }
  
  // Handle ImageKit URLs
  if (url.includes('imagekit.io')) {
    return transformImageKitUrl(url, options);
  }
  
  // Return original URL for other providers
  return url;
}

// Helper function to transform Cloudinary URLs
function transformCloudinaryUrl(
  url: string, 
  options: { width?: number; height?: number; quality?: number }
): string {
  // Extract base URL and transformation string
  const [baseUrl, transformations] = url.split('/upload/');
  
  // Build new transformation string
  let newTransformations = `f_auto,q_${options.quality || 'auto'}`;
  
  if (options.width) newTransformations += `,w_${options.width}`;
  if (options.height) newTransformations += `,h_${options.height}`;
  
  // Return transformed URL
  return `${baseUrl}/upload/${newTransformations}/${transformations || ''}`;
}

// Helper function to transform ImageKit URLs
function transformImageKitUrl(
  url: string, 
  options: { width?: number; height?: number; quality?: number }
): string {
  const hasParams = url.includes('?');
  const separator = hasParams ? '&' : '?';
  
  let params = `tr=q-${options.quality || 80}`;
  
  if (options.width) params += `,w-${options.width}`;
  if (options.height) params += `,h-${options.height}`;
  
  return `${url}${separator}${params}`;
}