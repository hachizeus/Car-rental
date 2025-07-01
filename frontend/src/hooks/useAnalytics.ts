import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useAnalytics = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Get user's IP and basic info
        const userAgent = navigator.userAgent;
        const pageUrl = window.location.href;
        const referrer = document.referrer;
        
        // Detect device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);
        const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
        
        // Detect browser
        let browser = 'Unknown';
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        
        // Generate session ID
        let sessionId = sessionStorage.getItem('analytics_session');
        if (!sessionId) {
          sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
          sessionStorage.setItem('analytics_session', sessionId);
        }
        
        // Track the visit
        await supabase.from('website_visits').insert({
          user_agent: userAgent,
          page_url: pageUrl,
          referrer: referrer || null,
          session_id: sessionId,
          device_type: deviceType,
          browser: browser
        });
        
        // Track page view
        await supabase.from('page_views').insert({
          page_path: window.location.pathname,
          page_title: document.title
        });
        
      } catch (error) {
        console.log('Analytics tracking failed:', error);
      }
    };
    
    trackVisit();
  }, []);
  
  const trackCarView = async (carId: string) => {
    try {
      const sessionId = sessionStorage.getItem('analytics_session');
      if (sessionId) {
        await supabase.from('car_views').insert({
          car_id: carId,
          session_id: sessionId
        });
      }
    } catch (error) {
      console.log('Car view tracking failed:', error);
    }
  };
  
  const trackSearch = async (query: string, resultsCount: number) => {
    try {
      const sessionId = sessionStorage.getItem('analytics_session');
      if (sessionId) {
        await supabase.from('search_queries').insert({
          session_id: sessionId,
          query: query,
          results_count: resultsCount
        });
      }
    } catch (error) {
      console.log('Search tracking failed:', error);
    }
  };
  
  return {
    trackCarView,
    trackSearch
  };
};