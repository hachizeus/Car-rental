/**
 * Video proxy service to handle CORS issues with external video sources
 */

/**
 * Transforms a video URL to use a CORS-friendly proxy or add parameters
 * @param url Original video URL
 * @returns Transformed URL that should work with CORS
 */
export const getProxiedVideoUrl = (url: string): string => {
  if (!url) return '';
  
  // For ImageKit URLs, add tr=f-mp4 parameter
  if (url.includes('imagekit.io')) {
    // Check if URL already has parameters
    const hasParams = url.includes('?');
    return `${url}${hasParams ? '&' : '?'}tr=f-mp4`;
  }
  
  return url;
};