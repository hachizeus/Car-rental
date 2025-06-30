import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jvfmjgpqqaumcffmhedw.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Zm1qZ3BxcWF1bWNmZm1oZWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTI1NTAsImV4cCI6MjA2Njg2ODU1MH0.gl1ounnNH5FmvhPY5bmfUrx5yPuJG6XSELmHb_Mzl7Y'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Car = {
  id: string
  title: string
  description: string
  price_per_day: number
  category: string
  location: string
  features: string[]
  is_available: boolean
  created_at: string
  updated_at: string
}