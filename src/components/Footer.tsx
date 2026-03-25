import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    // footer
    <footer className="bg-[#0A1F44] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#C9A227]">AYU</span> International
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Where comfort meets class, and every stay feels like home.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#C9A227]/20 hover:bg-[#C9A227] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#C9A227]/20 hover:bg-[#C9A227] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#C9A227]/20 hover:bg-[#C9A227] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#C9A227]">Quick Links</h4>
            <ul className="space-y-2">
              {['Rooms & Suites', 'Gallery', 'Restaurant', 'Spa & Wellness', 'Events'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-[#C9A227] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#C9A227]">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#C9A227] mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Luxury Avenue, Paradise City, PC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-[#C9A227] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-[#C9A227]">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-[#C9A227] flex-shrink-0" />
                <a
                  href="mailto:info@ayuhotel.com"
                  className="text-gray-300 hover:text-[#C9A227]"
                >
                  info@ayuhotel.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#C9A227]">Opening Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="font-medium">Reception:</span> 24/7
              </li>
              <li>
                <span className="font-medium">Restaurant:</span>
              </li>
              <li className="pl-4">Breakfast: 6:30 AM - 10:30 AM</li>
              <li className="pl-4">Lunch: 12:00 PM - 3:00 PM</li>
              <li className="pl-4">Dinner: 6:00 PM - 11:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Ayu International Hotel. All rights reserved. Crafted with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
