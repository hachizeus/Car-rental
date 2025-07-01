import { supabase } from './supabase';

export const trackPageView = async (page: string, carId?: string) => {
  // Skip tracking in development or if already tracked this session
  if (typeof window === 'undefined') return;
  
  const hasTrackedThisSession = sessionStorage.getItem('hasTrackedVisit');
  if (hasTrackedThisSession) return;
  
  try {
    const { error } = await supabase.from('page_views').insert({
      page,
      car_id: carId || null,
      timestamp: new Date().toISOString(),
      user_agent: navigator?.userAgent || 'Unknown',
      referrer: document?.referrer || null
    });
    
    if (!error) {
      sessionStorage.setItem('hasTrackedVisit', 'true');
      console.log('Page view tracked:', page);
    } else {
      console.error('Failed to track page view:', error);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

export const trackCarView = async (carId: string, carTitle: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    const { error } = await supabase.from('car_views').insert({
      car_id: carId,
      car_title: carTitle,
      timestamp: new Date().toISOString(),
      user_agent: navigator?.userAgent || 'Unknown',
      referrer: document?.referrer || null
    });
    
    if (!error) {
      console.log('Car view tracked:', carTitle);
    } else {
      console.error('Failed to track car view:', error);
    }
  } catch (error) {
    console.error('Error tracking car view:', error);
  }
};