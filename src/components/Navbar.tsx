import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X, Facebook, Twitter, Instagram, ChevronRight, Home, Users, Briefcase, Package, Phone, Youtube, GalleryHorizontalEnd, BracesIcon, AudioLinesIcon, MegaphoneIcon} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  const menuItems = [
    { icon: Home, label: 'Home', to: '/', type: 'hash' },
    { icon: Youtube, label: 'Cinematograohy', to: '/cinema-portfolio', type: 'link' },
    { icon: BracesIcon, label: 'Software Development', to: '/software-development', type: 'link' },
    { icon: AudioLinesIcon, label: 'Voice Over', to: '/voiceover', type: 'link' },
    { icon: MegaphoneIcon, label: 'Digital Marketing', to: '/digital-marketing', type: 'link' },
    { icon: GalleryHorizontalEnd, label: 'Gallery Room', to: '/portfolio', type: 'link' },
    { icon: Package, label: 'Packages', to: '/#packages', type: 'hash' },
    { icon: Users, label: 'Team', to: '/members', type: 'link' },
    { icon: Phone, label: 'Contact Us', to: '/contact', type: 'link' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Desktop & Mobile Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-white/10 py-3' 
          : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="https://ucpmarocgo.s3.us-east-1.amazonaws.com/logo-ucp-maroc.png" 
                alt="UCP Maroc Logo" 
                className="w-48 lg:w-64 transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Menu has been removed */}

            {/* Hamburger Menu Button - Now Always Visible */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="transform transition-transform duration-300" />
              ) : (
                <Menu size={24} className="transform transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Desktop Slide-out Menu with Glassmorphism */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/90 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out z-50 border-l border-white/10 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Menu Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <img 
              src="https://ucpmarocgo.s3.us-east-1.amazonaws.com/logo-ucp-maroc.png" 
              alt="UCP Maroc Logo" 
              className="w-40" 
            />
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-6 pb-40 overflow-y-auto max-h-[calc(100vh-170px)]"> {/* Added overflow-y-auto and max-h */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  {item.type === 'hash' ? (
                    <HashLink
                      to={item.to}
                      onClick={closeMenu}
                      className="flex items-center space-x-4 text-white p-3 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/20"
                    >
                      <IconComponent size={20} className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                    </HashLink>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      className="flex items-center space-x-4 text-white p-3 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/20"
                    >
                      <IconComponent size={20} className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              to="/customized-package"
              onClick={closeMenu}
              className="w-full bg-white text-black font-semibold px-6 py-4 rounded-xl text-center block transition-all duration-300 hover:shadow-lg hover:scale-105 hover:shadow-purple-500/25 border border-white/20 backdrop-blur-sm"
            >
              Customized Package
            </Link>
            <div className='py-4'>
              <Link
              to="/contact"
              onClick={closeMenu}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white font-semibold px-6 py-4 rounded-xl text-center block transition-all duration-300 hover:shadow-lg hover:scale-105 hover:shadow-purple-500/25 border border-white/20 backdrop-blur-sm"
              >
              Get Started
            </Link>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <p className="text-sm text-gray-300 text-center mb-4">Follow us on social media</p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="p-3 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white hover:shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-gradient-to-r from-blue-400/80 to-blue-500/80 text-white hover:shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-gradient-to-r from-pink-500/80 to-purple-600/80 text-white hover:shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Overlay with Glassmorphism */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Navbar;