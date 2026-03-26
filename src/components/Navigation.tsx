import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// this make the navigation bar link to scroll smoothly to the top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Rooms & Suites', page: 'rooms' },
    { name: 'Gallery', page: 'gallery' },
    { name: 'Restaurant', page: 'restaurant' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0A1F44] shadow-lg py-4'
          : 'bg-gradient-to-b from-black/60 to-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider">
              <span className="text-[#C9A227] group-hover:text-white transition-colors duration-300">
                AYU
              </span>{' '}
              International Hotel
            </h1>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-white hover:text-[#C9A227] transition-all duration-300 relative group ${
                  currentPage === link.page ? 'text-[#C9A227]' : ''
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A227] transform origin-left transition-transform duration-300 ${
                    currentPage === link.page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
              </button>
            ))}
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 bg-[#C9A227] hover:bg-white text-[#0A1F44] px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A227]/50"
            >
              <Phone size={18} />
              <span>Book Now</span>
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#C9A227] transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-4 space-y-4 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-white hover:text-[#C9A227] transition-colors py-2 ${
                  currentPage === link.page ? 'text-[#C9A227]' : ''
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
