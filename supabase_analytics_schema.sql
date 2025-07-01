-- Analytics and Tracking Tables for Car Rental Admin Dashboard

-- Website visits tracking table
CREATE TABLE website_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address INET,
    user_agent TEXT,
    page_url TEXT,
    referrer TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT,
    country TEXT,
    city TEXT,
    device_type TEXT, -- 'desktop', 'mobile', 'tablet'
    browser TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings/Inquiries table
CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    pickup_date DATE NOT NULL,
    dropoff_date DATE NOT NULL,
    pickup_location TEXT,
    dropoff_location TEXT,
    total_days INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page views tracking
CREATE TABLE page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT,
    page_path TEXT NOT NULL,
    page_title TEXT,
    time_on_page INTEGER, -- seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car view tracking (when someone views a specific car)
CREATE TABLE car_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    session_id TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search queries tracking
CREATE TABLE search_queries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT,
    query TEXT NOT NULL,
    results_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_website_visits_created_at ON website_visits(created_at);
CREATE INDEX idx_website_visits_ip_address ON website_visits(ip_address);
CREATE INDEX idx_website_visits_user_id ON website_visits(user_id);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_bookings_car_id ON bookings(car_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);
CREATE INDEX idx_car_views_car_id ON car_views(car_id);
CREATE INDEX idx_car_views_created_at ON car_views(viewed_at);
CREATE INDEX idx_car_views_session_id ON car_views(session_id);
CREATE INDEX idx_search_queries_session_id ON search_queries(session_id);

-- RLS (Row Level Security) policies
ALTER TABLE website_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert visit data
CREATE POLICY "Allow anonymous visits" ON website_visits
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to insert booking data
CREATE POLICY "Allow anonymous bookings" ON bookings
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to insert page views
CREATE POLICY "Allow anonymous page views" ON page_views
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to insert car views
CREATE POLICY "Allow anonymous car views" ON car_views
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to insert search queries
CREATE POLICY "Allow anonymous search queries" ON search_queries
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to insert contact submissions
CREATE POLICY "Allow anonymous contact submissions" ON contact_submissions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated users (admin) to read all data
CREATE POLICY "Allow authenticated read" ON website_visits
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read" ON bookings
    FOR ALL TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read" ON page_views
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read" ON car_views
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read" ON search_queries
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read" ON contact_submissions
    FOR ALL TO authenticated
    USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for bookings updated_at
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing (optional)
-- INSERT INTO website_visits (ip_address, page_url, device_type, browser) VALUES
-- ('192.168.1.1', '/', 'desktop', 'Chrome'),
-- ('192.168.1.2', '/fleet', 'mobile', 'Safari'),
-- ('192.168.1.3', '/about', 'desktop', 'Firefox');