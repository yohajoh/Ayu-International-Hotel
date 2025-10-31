import { useState, useEffect } from 'react';
import { X, Users, Maximize, Bed, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Room, Booking } from '../types';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filter, setFilter] = useState('all');
  const [imageIndex, setImageIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: '',
    guests: 2,
    special_requests: '',
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const { data } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_available', true)
      .order('price_per_night', { ascending: true });
    if (data) setRooms(data);
  };

  const filteredRooms = rooms.filter(
    (room) => filter === 'all' || room.category === filter
  );

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const checkIn = new Date(bookingData.check_in);
    const checkOut = new Date(bookingData.check_out);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * selectedRoom.price_per_night;

    const booking: Booking = {
      room_id: selectedRoom.id,
      guest_name: bookingData.guest_name,
      guest_email: bookingData.guest_email,
      guest_phone: bookingData.guest_phone,
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      guests: bookingData.guests,
      total_price: totalPrice,
      special_requests: bookingData.special_requests,
    };

    const { error } = await supabase.from('bookings').insert([booking]);

    if (!error) {
      alert('Booking submitted successfully! We will contact you shortly.');
      setShowBooking(false);
      setBookingData({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        check_in: '',
        check_out: '',
        guests: 2,
        special_requests: '',
      });
    } else {
      alert('Error submitting booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/90 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Rooms & Suites</h1>
          <p className="text-xl text-gray-200">Your sanctuary of comfort and elegance</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {[
            { label: 'All Rooms', value: 'all' },
            { label: 'Deluxe', value: 'deluxe' },
            { label: 'Suites', value: 'suite' },
            { label: 'Presidential', value: 'presidential' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === cat.value
                  ? 'bg-[#C9A227] text-white shadow-lg scale-105'
                  : 'bg-white text-[#0A1F44] hover:bg-gray-100 shadow'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => {
                setSelectedRoom(room);
                setImageIndex(0);
              }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#C9A227] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  ${room.price_per_night}/night
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-3 group-hover:text-[#C9A227] transition-colors">
                  {room.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Maximize size={16} className="text-[#C9A227]" />
                    <span>{room.size_sqm} sqm</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} className="text-[#C9A227]" />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Bed size={16} className="text-[#C9A227]" />
                    <span>{room.bed_type}</span>
                  </div>
                </div>
                <button className="w-full bg-[#0A1F44] hover:bg-[#C9A227] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
              <h2 className="text-3xl font-bold text-[#0A1F44]">{selectedRoom.name}</h2>
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-gray-500 hover:text-[#C9A227] transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="relative h-96">
              <img
                src={selectedRoom.images[imageIndex]}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
              {selectedRoom.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setImageIndex((prev) =>
                        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0A1F44] p-3 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() =>
                      setImageIndex((prev) =>
                        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0A1F44] p-3 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-4xl font-bold text-[#C9A227]">
                  ${selectedRoom.price_per_night}
                  <span className="text-lg text-gray-600 font-normal">/night</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Maximize size={20} className="text-[#C9A227]" />
                    <span>{selectedRoom.size_sqm} sqm</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={20} className="text-[#C9A227]" />
                    <span>{selectedRoom.capacity} Guests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bed size={20} className="text-[#C9A227]" />
                    <span>{selectedRoom.bed_type}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{selectedRoom.description}</p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#0A1F44] mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <Star size={16} className="text-[#C9A227]" fill="#C9A227" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-[#C9A227] hover:bg-[#0A1F44] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book This Room
              </button>
            </div>
          </div>
        </div>
      )}

      {showBooking && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-[#0A1F44]">Book {selectedRoom.name}</h2>
              <button
                onClick={() => setShowBooking(false)}
                className="text-gray-500 hover:text-[#C9A227] transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleBooking} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.guest_name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, guest_name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={bookingData.guest_email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, guest_email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={bookingData.guest_phone}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, guest_phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Number of Guests</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, guests: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  >
                    {[...Array(selectedRoom.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Check In</label>
                  <input
                    type="date"
                    required
                    value={bookingData.check_in}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, check_in: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Check Out</label>
                  <input
                    type="date"
                    required
                    value={bookingData.check_out}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, check_out: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[#0A1F44] font-medium mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={4}
                  value={bookingData.special_requests}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, special_requests: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors resize-none"
                  placeholder="Any special requirements or preferences..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#C9A227] hover:bg-[#0A1F44] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
