import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ChevronUp, ExternalLink } from 'lucide-react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "from-blue-600 to-blue-400" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "from-pink-600 via-purple-600 to-indigo-600" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "from-sky-500 to-blue-600" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "from-blue-700 to-blue-500" }
  ];

  const services = [
    "Social Media Marketing",
    "Google Ads",
    "Facebook Ads",
    "TikTok Ads",
    "Instagram Ads",
    "Web Development"
  ];

  const legalLinks = [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Service", href: "/terms-of-service" },
    { text: "Terms of Conditions", href: "/terms-of-conditions" },
    { text: "Contact", href: "/contact" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info Column */}
          <div className="space-y-6">
            <div className="group">
              <img 
                src="https://ucpmarocgo.s3.us-east-1.amazonaws.com/logo-ucp-maroc.png" 
                alt="UCPMAROC Logo" 
                className="h-12 w-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl"
              />
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm hover:text-white transition-colors duration-300">
              Your partner in digital growth. We leverage AI-powered marketing strategies to deliver exceptional ROI for businesses of all sizes.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative"
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${social.color} p-0.5 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12 ${hoveredSocial === index ? 'shadow-2xl shadow-purple-500/50' : ''}`}>
                    <div className="w-full h-full bg-slate-800/80 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:bg-transparent">
                      <social.icon size={18} className="transition-all duration-300 group-hover:text-white" />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredSocial === index && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg animate-in fade-in-0 zoom-in-95 duration-200">
                      {social.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div 
            className="space-y-6"
            onMouseEnter={() => setActiveColumn('services')}
            onMouseLeave={() => setActiveColumn(null)}
          >
            <h3 className={`text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 ${activeColumn === 'services' ? 'scale-105' : ''}`}>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={service}>
                  <a 
                    href="/services" 
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 text-sm py-1"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3 transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-cyan-400/50"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                    <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div 
            className="space-y-6"
            onMouseEnter={() => setActiveColumn('legal')}
            onMouseLeave={() => setActiveColumn(null)}
          >
            <h3 className={`text-xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent transition-all duration-300 ${activeColumn === 'legal' ? 'scale-105' : ''}`}>
              Legal Information
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={link.text}>
                  <a 
                    href={link.href} 
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 text-sm py-1"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mr-3 transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-pink-400/50"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.text}</span>
                    <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div 
            className="space-y-6"
            onMouseEnter={() => setActiveColumn('contact')}
            onMouseLeave={() => setActiveColumn(null)}
          >
            <h3 className={`text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent transition-all duration-300 ${activeColumn === 'contact' ? 'scale-105' : ''}`}>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="group flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Phone size={14} />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">+1 (209) 442-6729</span>
              </div>
              
              <div className="group flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Mail size={14} />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">Support@ucpmaroc.com</span>
              </div>
              
              <div className="group flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <MapPin size={14} />
                </div>
                <div className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                  <div className="mb-2">US: HYROSY LLC, 30 N Gould St Ste R Sheridan, WY 82801</div>
                  <div>MA: C M UNITE 4 N 899, MARRAKECH 40000, Morocco</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} UCPMAROC. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-gray-400">Made with ❤️ for digital growth</span>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl shadow-2xl shadow-purple-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-50 backdrop-blur-sm"
          aria-label="Back to top"
        >
          <ChevronUp size={24} className="text-white" />
        </button>
      )}

      {/* CSS for custom animations */}
      <style >{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-in {
          animation: fadeInZoom 0.2s ease-out;
        }
        .fade-in-0 {
          animation: fadeIn 0.2s ease-out;
        }
        .zoom-in-95 {
          animation: zoomIn 0.2s ease-out;
        }
        @keyframes fadeInZoom {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(4px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;