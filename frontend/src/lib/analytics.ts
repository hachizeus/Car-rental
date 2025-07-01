import { supabase } from './supabase';

export const trackPageView = async (page: string, carId?: string) => {
  try {
    // Only track if this is a new session (no previous page views in this session)
    const hasTrackedThisSession = sessionStorage.getItem('hasTrackedVisit');
    
    if (!hasTrackedThisSession && typeof window !== 'undefined') {
      const response = await supabase.from('page_views').insert({
        page,
        car_id: carId || null,
        timestamp: new Date().toISOString(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
        referrer: typeof document !== 'undefined' ? (document.referrer || null) : null
      });
      
      if (!response.error) {
        // Mark this session as tracked
        sessionStorage.setItem('hasTrackedVisit', 'true');
      }
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

export const trackCarView = async (carId: string, carTitle: string) => {
  try {
    if (typeof window !== 'undefined') {
      await supabase.from('car_views').insert({
        car_id: carId,
        car_title: carTitle,
        timestamp: new Date().toISOString(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
        referrer: typeof document !== 'undefined' ? (document.referrer || null) : null
      });
    }
  } catch (error) {
    console.error('Error tracking car view:', error);
  }
};