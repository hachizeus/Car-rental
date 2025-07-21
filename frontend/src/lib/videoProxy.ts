/**
 * Video proxy service to handle CORS issues with external video sources
 * and optimize video loading performance
 */

// Cache for processed URLs to avoid redundant processing
const urlCache = new Map<string, string>();

/**
 * Transforms a video URL to use a CORS-friendly proxy or add parameters
 * @param url Original video URL
 * @param quality Optional quality parameter (high, medium, low)
 * @returns Transformed URL that should work with CORS
 */
export const getProxiedVideoUrl = (url: string, quality: 'high' | 'medium' | 'low' = 'high'): string => {
  if (!url) return '';
  
  // Check cache first
  const cacheKey = `${url}-${quality}`;
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey)!;
  }
  
  let result = url;
  
  // For ImageKit URLs, add optimization parameters
  if (url.includes('imagekit.io')) {
    // Check if URL already has parameters
    const hasParams = url.includes('?');
    const separator = hasParams ? '&' : '?';
    
    // Add quality parameter based on requested quality
    const qualityParam = quality === 'low' ? 'q=60' : 
                        quality === 'medium' ? 'q=80' : 
                        'q=95';
    
    result = `${url}${separator}tr=f-mp4,${qualityParam}`;
  }
  
  // Store in cache
  urlCache.set(cacheKey, result);
  
  return result;
};

/**
 * Preload a video URL to improve playback performance
 * @param url Video URL to preload
 */
export const preloadVideo = (url: string): void => {
  if (!url || typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = getProxiedVideoUrl(url);
  link.as = 'video';
  link.type = 'video/mp4';
  
  document.head.appendChild(link);
};