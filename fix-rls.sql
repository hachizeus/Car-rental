-- Fix RLS policies to allow admin operations
-- Run this in your Supabase SQL editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated users to manage cars" ON cars;
DROP POLICY IF EXISTS "Allow authenticated users to manage car_images" ON car_images;
DROP POLICY IF EXISTS "Allow authenticated users to manage car_videos" ON car_videos;

-- Create permissive policies for admin operations
CREATE POLICY "Allow all operations on cars" ON cars FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on car_images" ON car_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on car_videos" ON car_videos FOR ALL USING (true) WITH CHECK (true);