export interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  size_sqm: number;
  bed_type: string;
  amenities: string[];
  images: string[];
  category: string;
  is_available: boolean;
}

export interface Booking {
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  special_requests?: string;
}

export interface Testimonial {
  id: string;
  guest_name: string;
  guest_photo?: string;
  rating: number;
  comment: string;
  stay_date: string;
  is_featured: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title?: string;
  order_index: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
