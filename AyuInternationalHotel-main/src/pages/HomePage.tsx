import { useState, useEffect } from 'react';
import { Calendar, Users, Wifi, Coffee, Dumbbell, Waves, Star, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Room, Testimonial } from '../types';

interface HomePageProps {
  onNavigate: (page: string, roomId?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    loadFeaturedRooms();
    loadTestimonials();
  }, []);

  const loadFeaturedRooms = async () => {
    const { data } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_available', true)
      .limit(3);
    if (data) setRooms(data);
  };

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });
    if (data) setTestimonials(data);
  };

  const handleSearch = () => {
    if (checkIn && checkOut) {
      onNavigate('rooms');
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeIn">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Where comfort meets class,
              <br />
              <span className="text-[#C9A227] relative inline-block">
                and every stay feels like home
                <span className="absolute inset-0 blur-xl bg-[#C9A227] opacity-30 animate-pulse"></span>
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 italic">
              Arrive as a guest. Leave as family.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-[#0A1F44] font-medium mb-2">Check In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#0A1F44] font-medium mb-2">Check Out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#0A1F44] font-medium mb-2">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full bg-[#C9A227] hover:bg-[#0A1F44] text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Calendar size={20} />
              <span>Book Your Stay</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
              Experience Luxury Living
            </h2>
            <div className="w-24 h-1 bg-[#C9A227] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Wifi, title: 'High-Speed WiFi', desc: 'Stay connected everywhere' },
              { icon: Waves, title: 'Infinity Pool', desc: 'Breathtaking ocean views' },
              { icon: Coffee, title: 'Premium Breakfast', desc: 'Complimentary gourmet meals' },
              { icon: Dumbbell, title: 'Fitness Center', desc: '24/7 state-of-the-art gym' },
              { icon: Users, title: 'Concierge Service', desc: 'Personalized assistance' },
              { icon: Star, title: 'Luxury Spa', desc: 'Rejuvenate your senses' },
            ].map((amenity, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#0A1F44] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <amenity.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A1F44] mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
              Featured Rooms & Suites
            </h2>
            <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Discover your perfect sanctuary</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => onNavigate('rooms', room.id)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-[#C9A227] text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${room.price_per_night}/night
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-2 group-hover:text-[#C9A227] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{room.size_sqm} sqm</span>
                    <span>{room.capacity} Guests</span>
                    <span>{room.bed_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('rooms')}
              className="inline-flex items-center space-x-2 bg-[#C9A227] hover:bg-[#0A1F44] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>View All Rooms</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
              What Our Guests Say
            </h2>
            <div className="w-24 h-1 bg-[#C9A227] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.guest_photo || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'}
                    alt={testimonial.guest_name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-[#0A1F44]">{testimonial.guest_name}</h4>
                    <div className="flex text-[#C9A227]">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-fixed bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg)'}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl lg:text-2xl mb-8 text-gray-200">
            Book your luxury escape today and create memories that last forever
          </p>
          <button
            onClick={() => onNavigate('rooms')}
            className="bg-[#C9A227] hover:bg-white hover:text-[#0A1F44] text-white px-12 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Book Your Stay Now
          </button>
        </div>
      </section>
    </div>
  );
}
