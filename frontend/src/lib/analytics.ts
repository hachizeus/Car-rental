// Analytics utility for tracking page views and events

// Initialize analytics based on environment
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
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
    gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);
  }
};

// Track page views
export const trackPageView = (path: string, title: string) => {
  if (typeof window === 'undefined') return;
  
  // Google Analytics page view
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href
    });
  }
};

// Track events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (typeof window === 'undefined') return;
  
  // Google Analytics event
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Track car view
export const trackCarView = (carId: string, carTitle: string) => {
  trackEvent('Car', 'view', carTitle);
};

// Track WhatsApp contact
export const trackWhatsAppContact = (carId: string, carTitle: string) => {
  trackEvent('Contact', 'whatsapp', carTitle);
};

// Declare global window interface
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}