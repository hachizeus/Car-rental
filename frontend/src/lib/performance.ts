/**
 * Performance monitoring utilities
 */

// Track page load performance
export const trackPageLoadPerformance = () => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  try {
    // Wait for page to fully load
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domLoadTime = perfData.domComplete - perfData.domLoading;
        
        console.info(`Page load performance:
          - Total load time: ${pageLoadTime}ms
          - DOM load time: ${domLoadTime}ms
        `);
        
        // Send to analytics if available
        if (window.gtag) {
          window.gtag('event', 'performance', {
            event_category: 'Performance',
            event_label: 'Page Load',
            value: Math.round(pageLoadTime),
            non_interaction: true,
            page_load_time: pageLoadTime,
            dom_load_time: domLoadTime
          });
        }
      }, 0);
    });
  } catch (error) {
    console.error('Error tracking performance:', error);
  }
};

// Track component render time
export const trackComponentPerformance = (
  componentName: string, 
  startTime: number
) => {
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  console.info(`Component render time - ${componentName}: ${renderTime.toFixed(2)}ms`);
  
  return renderTime;
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  trackPageLoadPerformance();
  
  // Report largest contentful paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.info(`Largest Contentful Paint: ${lastEntry.startTime}ms`);
        
        if (window.gtag) {
          window.gtag('event', 'performance', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
            non_interaction: true
          });
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (error) {
      console.error('LCP monitoring error:', error);
    }
  }
};

// Declare global window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}