// Enhanced analytics utility for tracking page views, events, and performance metrics

// Initialize analytics based on environment
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Google Analytics initialization
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        send_page_view: false, // We'll handle page views manually
        anonymize_ip: true,    // Enhanced privacy
        cookie_flags: 'secure;samesite=none' // Enhanced security
      });
      
      // Initialize performance tracking
      initPerformanceTracking();
    }
  } catch (error) {
    console.error('Analytics initialization error:', error);
  }
};

// Initialize performance tracking
const initPerformanceTracking = () => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  try {
    // Track Core Web Vitals using native Performance API
    if ('PerformanceObserver' in window) {
      // Track Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackPerformance('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Track First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          trackPerformance('FID', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      
      // Track layout shifts
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        entryList.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        trackPerformance('CLS', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    }
  } catch (error) {
    console.error('Performance tracking error:', error);
  }
};

// Track performance metrics
const trackPerformance = (metric: string, value: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  try {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric,
      value: Math.round(value * 1000) / 1000, // Round to 3 decimal places
      non_interaction: true
    });
  } catch (error) {
    console.error(`Error tracking performance metric ${metric}:`, error);
  }
};

// Track page views with enhanced error handling
export const trackPageView = (path: string, title: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Google Analytics page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        page_location: window.location.href
      });
      
      // Track page load time
      if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        
        if (loadTime > 0) {
          trackPerformance('page_load_time', loadTime);
        }
      }
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track events with enhanced error handling
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Google Analytics event
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error(`Error tracking event ${category}/${action}:`, error);
  }
};

// Track car view with additional details
export const trackCarView = (carId: string, carTitle: string, category?: string, price?: number) => {
  trackEvent('Car', 'view', carTitle);
  
  // Track as ecommerce item view if price is available
  if (price && window.gtag) {
    try {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        value: price,
        items: [{
          item_id: carId,
          item_name: carTitle,
          item_category: category || 'Car',
          price: price
        }]
      });
    } catch (error) {
      console.error('Error tracking car view as ecommerce:', error);
    }
  }
};

// Track WhatsApp contact with enhanced data
export const trackWhatsAppContact = (carId: string, carTitle: string, category?: string) => {
  trackEvent('Contact', 'whatsapp', carTitle);
  
  // Track as conversion
  if (window.gtag) {
    try {
      window.gtag('event', 'generate_lead', {
        currency: 'USD',
        item_id: carId,
        item_name: carTitle,
        item_category: category || 'Car'
      });
    } catch (error) {
      console.error('Error tracking WhatsApp contact as conversion:', error);
    }
  }
};

// Declare global window interface
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}