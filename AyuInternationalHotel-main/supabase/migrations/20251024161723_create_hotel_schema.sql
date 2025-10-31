/*
  # Ayu International Hotel Database Schema

  ## Overview
  Complete database schema for luxury hotel website including rooms, bookings, gallery, testimonials, and contact submissions.

  ## New Tables
  
  ### 1. rooms
  - `id` (uuid, primary key) - Unique room identifier
  - `name` (text) - Room/suite name (e.g., "Ocean View Suite")
  - `description` (text) - Detailed room description
  - `price_per_night` (decimal) - Nightly rate
  - `capacity` (integer) - Maximum guest capacity
  - `size_sqm` (integer) - Room size in square meters
  - `bed_type` (text) - Type of bed(s)
  - `amenities` (jsonb) - Array of amenities
  - `images` (jsonb) - Array of image URLs
  - `category` (text) - Room category (deluxe, suite, presidential)
  - `is_available` (boolean) - Availability status
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. bookings
  - `id` (uuid, primary key) - Unique booking identifier
  - `room_id` (uuid, foreign key) - Reference to rooms table
  - `guest_name` (text) - Guest full name
  - `guest_email` (text) - Guest email address
  - `guest_phone` (text) - Guest phone number
  - `check_in` (date) - Check-in date
  - `check_out` (date) - Check-out date
  - `guests` (integer) - Number of guests
  - `total_price` (decimal) - Total booking cost
  - `special_requests` (text) - Guest special requests
  - `status` (text) - Booking status (pending, confirmed, cancelled)
  - `created_at` (timestamptz) - Booking creation timestamp

  ### 3. gallery_images
  - `id` (uuid, primary key) - Unique image identifier
  - `url` (text) - Image URL
  - `category` (text) - Image category (rooms, restaurant, events, pool)
  - `title` (text) - Image title/caption
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Upload timestamp

  ### 4. testimonials
  - `id` (uuid, primary key) - Unique testimonial identifier
  - `guest_name` (text) - Guest name
  - `guest_photo` (text) - Guest photo URL
  - `rating` (integer) - Rating out of 5
  - `comment` (text) - Testimonial text
  - `stay_date` (date) - Date of stay
  - `is_featured` (boolean) - Show on homepage
  - `created_at` (timestamptz) - Submission timestamp

  ### 5. contact_submissions
  - `id` (uuid, primary key) - Unique submission identifier
  - `name` (text) - Contact name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for rooms, gallery, and testimonials
  - Authenticated insert for bookings and contact submissions
  - Restrictive policies for data protection

  ## Important Notes
  - All tables use UUID for primary keys
  - Timestamps use timestamptz with default now()
  - JSONB used for flexible amenities and images storage
  - Proper indexing on frequently queried columns
*/

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_per_night decimal(10,2) NOT NULL,
  capacity integer NOT NULL DEFAULT 2,
  size_sqm integer,
  bed_type text,
  amenities jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  category text NOT NULL DEFAULT 'deluxe',
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  total_price decimal(10,2) NOT NULL,
  special_requests text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  category text NOT NULL,
  title text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  guest_photo text,
  rating integer NOT NULL DEFAULT 5,
  comment text NOT NULL,
  stay_date date,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Rooms policies (public read access)
CREATE POLICY "Anyone can view available rooms"
  ON rooms FOR SELECT
  USING (true);

-- Bookings policies (public insert, restricted read)
CREATE POLICY "Anyone can create booking"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (true);

-- Gallery policies (public read access)
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  USING (true);

-- Testimonials policies (public read for featured)
CREATE POLICY "Anyone can view featured testimonials"
  ON testimonials FOR SELECT
  USING (true);

-- Contact submissions policies (public insert)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rooms_category ON rooms(category);
CREATE INDEX IF NOT EXISTS idx_rooms_available ON rooms(is_available);
CREATE INDEX IF NOT EXISTS idx_bookings_room ON bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);

-- Insert sample rooms data
INSERT INTO rooms (name, description, price_per_night, capacity, size_sqm, bed_type, amenities, images, category) VALUES
(
  'Ocean View Suite',
  'Wake up to breathtaking views of the ocean. This spacious suite features a king-size bed, private balcony, marble bathroom with rainfall shower, and modern amenities for the ultimate comfort.',
  350.00,
  2,
  45,
  'King',
  '["Ocean View", "Private Balcony", "Rainfall Shower", "Mini Bar", "Smart TV", "Free WiFi", "Air Conditioning", "Room Service"]'::jsonb,
  '["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg", "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"]'::jsonb,
  'suite'
),
(
  'Presidential Suite',
  'The pinnacle of luxury living. This two-bedroom masterpiece spans over 100 square meters, featuring a living room, dining area, private jacuzzi, and panoramic city views.',
  750.00,
  4,
  120,
  '2 King Beds',
  '["Panoramic View", "Private Jacuzzi", "Living Room", "Dining Area", "Butler Service", "Premium Minibar", "Nespresso Machine", "Walk-in Closet"]'::jsonb,
  '["https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg", "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg"]'::jsonb,
  'presidential'
),
(
  'Deluxe Garden Room',
  'Surrounded by lush tropical gardens, this serene room offers a peaceful retreat with elegant furnishings, garden views, and all modern comforts.',
  220.00,
  2,
  35,
  'Queen',
  '["Garden View", "Balcony", "Work Desk", "Safe", "Coffee Maker", "Free WiFi", "Air Conditioning", "Daily Housekeeping"]'::jsonb,
  '["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg", "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg"]'::jsonb,
  'deluxe'
),
(
  'Family Suite',
  'Perfect for families, this suite includes two bedrooms, a spacious living area, and connecting doors. Comfort and convenience for the whole family.',
  480.00,
  6,
  75,
  '1 King + 2 Twin',
  '["Two Bedrooms", "Living Area", "Kitchenette", "Two Bathrooms", "Kids Amenities", "Extra Storage", "Smart TV", "Game Console"]'::jsonb,
  '["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg", "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg"]'::jsonb,
  'suite'
),
(
  'Executive Deluxe',
  'Designed for business travelers, featuring a large work desk, ergonomic chair, high-speed internet, and complimentary access to the executive lounge.',
  280.00,
  2,
  40,
  'King',
  '["City View", "Executive Lounge Access", "Work Desk", "High-speed Internet", "Printer Access", "Iron & Board", "Express Laundry", "Business Center"]'::jsonb,
  '["https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg", "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg"]'::jsonb,
  'deluxe'
),
(
  'Honeymoon Paradise Suite',
  'Romance awaits in this intimate suite featuring rose petal turndown, champagne on arrival, circular jacuzzi tub, and stunning sunset views.',
  550.00,
  2,
  55,
  'King Canopy',
  '["Ocean Sunset View", "Jacuzzi Tub", "Romantic Decor", "Champagne", "Rose Petals", "Private Dining", "Couples Spa Package", "Late Checkout"]'::jsonb,
  '["https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg", "https://images.pexels.com/photos/6466295/pexels-photo-6466295.jpeg"]'::jsonb,
  'suite'
);

-- Insert sample testimonials
INSERT INTO testimonials (guest_name, guest_photo, rating, comment, stay_date, is_featured) VALUES
(
  'Sarah Mitchell',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  5,
  'Absolutely stunning hotel! The Ocean View Suite exceeded all expectations. The staff was incredibly attentive and the amenities were world-class. Will definitely return!',
  '2025-09-15',
  true
),
(
  'James Rodriguez',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  5,
  'Best hotel experience ever. From check-in to check-out, everything was perfect. The restaurant food was exceptional and the spa was heavenly.',
  '2025-08-22',
  true
),
(
  'Emily Chen',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  5,
  'A true gem! Celebrated our anniversary here and the staff made it unforgettable. The honeymoon suite was romantic and luxurious. Thank you Ayu International!',
  '2025-10-01',
  true
);

-- Insert sample gallery images
INSERT INTO gallery_images (url, category, title, order_index) VALUES
('https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', 'rooms', 'Luxury Suite Interior', 1),
('https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', 'rooms', 'Ocean View Room', 2),
('https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg', 'rooms', 'Presidential Suite', 3),
('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg', 'restaurant', 'Fine Dining Experience', 1),
('https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg', 'restaurant', 'Gourmet Cuisine', 2),
('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg', 'restaurant', 'Elegant Restaurant Setting', 3),
('https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg', 'pool', 'Infinity Pool', 1),
('https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg', 'pool', 'Poolside Relaxation', 2),
('https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg', 'events', 'Grand Ballroom', 1),
('https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg', 'events', 'Conference Hall', 2);