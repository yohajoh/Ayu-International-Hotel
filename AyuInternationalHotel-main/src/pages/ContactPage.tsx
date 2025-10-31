import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ContactSubmission } from '../types';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: ContactSubmission = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    const { error } = await supabase.from('contact_submissions').insert([submission]);

    if (!error) {
      alert('Thank you for contacting us! We will get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } else {
      alert('Error submitting form. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/90 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-200">We're here to assist you with any inquiries</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#0A1F44] rounded-full flex items-center justify-center mb-4">
              <Phone size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0A1F44] mb-3">Call Us</h3>
            <p className="text-gray-600 mb-2">Main Reception</p>
            <a
              href="tel:+1234567890"
              className="text-[#C9A227] font-medium hover:underline block mb-2"
            >
              +1 (234) 567-890
            </a>
            <p className="text-gray-600 mb-2">Reservations</p>
            <a
              href="tel:+1234567891"
              className="text-[#C9A227] font-medium hover:underline block"
            >
              +1 (234) 567-891
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#0A1F44] rounded-full flex items-center justify-center mb-4">
              <Mail size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0A1F44] mb-3">Email Us</h3>
            <p className="text-gray-600 mb-2">General Inquiries</p>
            <a
              href="mailto:info@ayuhotel.com"
              className="text-[#C9A227] font-medium hover:underline block mb-2"
            >
              info@ayuhotel.com
            </a>
            <p className="text-gray-600 mb-2">Reservations</p>
            <a
              href="mailto:reservations@ayuhotel.com"
              className="text-[#C9A227] font-medium hover:underline block"
            >
              reservations@ayuhotel.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#0A1F44] rounded-full flex items-center justify-center mb-4">
              <MapPin size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0A1F44] mb-3">Visit Us</h3>
            <p className="text-gray-600 leading-relaxed">
              123 Luxury Avenue
              <br />
              Paradise City, PC 12345
              <br />
              United States
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-[#0A1F44] mb-6">Send Us a Message</h2>
            <div className="w-24 h-1 bg-[#C9A227] mb-8"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                    placeholder="+1 (234) 567-890"
                  />
                </div>
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                    placeholder="Booking Inquiry"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#0A1F44] font-medium mb-2">Message</label>
                <textarea
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C9A227] hover:bg-[#0A1F44] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <Clock size={32} className="text-[#C9A227]" />
                <h3 className="text-2xl font-bold text-[#0A1F44]">Operating Hours</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-[#0A1F44]">Reception</span>
                  <span className="text-gray-600">24/7</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-[#0A1F44]">Restaurant Breakfast</span>
                  <span className="text-gray-600">6:30 AM - 10:30 AM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-[#0A1F44]">Restaurant Lunch</span>
                  <span className="text-gray-600">12:00 PM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-[#0A1F44]">Restaurant Dinner</span>
                  <span className="text-gray-600">6:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-[#0A1F44]">Spa & Wellness</span>
                  <span className="text-gray-600">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-[#0A1F44]">Fitness Center</span>
                  <span className="text-gray-600">24/7</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841401596355!2d-73.98731668459377!3d40.75889297932794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
