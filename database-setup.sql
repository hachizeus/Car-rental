-- Car Rental Database Setup
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_day DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'economy',
    location VARCHAR(100) NOT NULL DEFAULT 'Nairobi',
    features TEXT[],
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car images table
CREATE TABLE IF NOT EXISTS car_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car videos table
CREATE TABLE IF NOT EXISTS car_videos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    pickup_location VARCHAR(100) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets (run these in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('car-images', 'car-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('car-videos', 'car-videos', true);

-- RLS Policies (Row Level Security)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to cars and related data
CREATE POLICY "Allow public read access to cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Allow public read access to car_images" ON car_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access to car_videos" ON car_videos FOR SELECT USING (true);

-- Allow authenticated users to manage cars (for admin)
CREATE POLICY "Allow authenticated users to manage cars" ON cars FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage car_images" ON car_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage car_videos" ON car_videos FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to create bookings, authenticated users to manage them
CREATE POLICY "Allow public to create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to read bookings" ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update bookings" ON bookings FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(category);
CREATE INDEX IF NOT EXISTS idx_cars_is_available ON cars(is_available);
CREATE INDEX IF NOT EXISTS idx_car_images_car_id ON car_images(car_id);
CREATE INDEX IF NOT EXISTS idx_car_images_is_primary ON car_images(is_primary);
CREATE INDEX IF NOT EXISTS idx_bookings_car_id ON bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings(pickup_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO cars (title, description, price_per_day, category, location, features, is_available) VALUES
('Toyota Camry 2023', 'Comfortable and reliable sedan perfect for city driving and long trips.', 3500, 'economy', 'Nairobi', ARRAY['GPS', 'AC', 'Bluetooth', 'Backup Camera'], true),
('BMW X5 2023', 'Luxury SUV with premium features and exceptional performance.', 8500, 'luxury', 'Nairobi', ARRAY['GPS', 'AC', 'Leather Seats', 'Sunroof', 'Premium Sound'], true),
('Honda CR-V 2023', 'Spacious SUV ideal for family trips and outdoor adventures.', 5500, 'suv', 'Mombasa', ARRAY['GPS', 'AC', 'All-Wheel Drive', 'Cargo Space'], true),
('Mercedes C-Class 2023', 'Elegant luxury sedan with cutting-edge technology.', 9500, 'luxury', 'Nairobi', ARRAY['GPS', 'AC', 'Leather Seats', 'Premium Sound', 'Heated Seats'], true),
('Nissan Sentra 2023', 'Fuel-efficient compact car perfect for daily commuting.', 2800, 'economy', 'Kisumu', ARRAY['GPS', 'AC', 'Bluetooth', 'USB Ports'], true),
('Ford Explorer 2023', 'Powerful SUV with ample space for passengers and cargo.', 6500, 'suv', 'Nakuru', ARRAY['GPS', 'AC', 'Third Row Seating', 'Towing Capacity'], true);