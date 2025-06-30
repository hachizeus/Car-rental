-- Complete fix for admin operations
-- Run this in your Supabase SQL editor

-- Disable RLS temporarily for admin operations
ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE car_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE car_videos DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS enabled, use these permissive policies instead:
-- DROP POLICY IF EXISTS "Allow authenticated users to manage cars" ON cars;
-- DROP POLICY IF EXISTS "Allow authenticated users to manage car_images" ON car_images;
-- DROP POLICY IF EXISTS "Allow authenticated users to manage car_videos" ON car_videos;
-- DROP POLICY IF EXISTS "Allow public read access to cars" ON cars;
-- DROP POLICY IF EXISTS "Allow public read access to car_images" ON car_images;
-- DROP POLICY IF EXISTS "Allow public read access to car_videos" ON car_videos;

-- CREATE POLICY "Allow all operations on cars" ON cars FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations on car_images" ON car_images FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations on car_videos" ON car_videos FOR ALL USING (true) WITH CHECK (true);