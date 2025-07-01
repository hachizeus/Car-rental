import { supabase } from './supabase';

export const testAnalytics = async () => {
  console.log('Testing analytics connection...');
  
  try {
    // Test page_views table
    const { data: pageViews, error: pageError } = await supabase
      .from('page_views')
      .select('*')
      .limit(5);
    
    console.log('Page views:', pageViews, 'Error:', pageError);
    
    // Test car_views table
    const { data: carViews, error: carError } = await supabase
      .from('car_views')
      .select('*')
      .limit(5);
    
    console.log('Car views:', carViews, 'Error:', carError);
    
    // Test insert
    const { data: testInsert, error: insertError } = await supabase
      .from('page_views')
      .insert({
        page: 'test',
        timestamp: new Date().toISOString(),
        user_agent: 'test',
        referrer: null
      })
      .select();
    
    console.log('Test insert:', testInsert, 'Error:', insertError);
    
  } catch (error) {
    console.error('Analytics test failed:', error);
  }
};

// Call this in browser console to test
(window as any).testAnalytics = testAnalytics;