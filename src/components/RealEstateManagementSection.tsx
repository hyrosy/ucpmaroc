import React from 'react';
import { Globe, Camera, Code, Users, Star, TrendingUp, Zap } from 'lucide-react';

const RealEstateManagementSection: React.FC = () => {
  const services = [
    {
      title: 'Global Platform Listing',
      icon: <Globe className="text-cyan-400 w-8 h-8" />,
      description: 'List across 50+ booking platforms'
    },
    {
      title: 'Social Media Management',
      icon: <Users className="text-pink-400 w-8 h-8" />,
      description: 'Engage audiences on all channels'
    },
    {
      title: 'Professional Website Development',
      icon: <Code className="text-green-400 w-8 h-8" />,
      description: 'Custom responsive websites'
    },
    {
      title: 'Professional Photography',
      icon: <Camera className="text-purple-400 w-8 h-8" />,
      description: 'Stunning visuals that convert'
    }
  ];

  const platforms = [
    { name: 'Booking.com', color: 'bg-blue-600' },
    { name: 'Airbnb', color: 'bg-red-500' },
    { name: 'Expedia', color: 'bg-yellow-500' },
    { name: 'Priceline', color: 'bg-green-600' },
    { name: 'Hotels.com', color: 'bg-purple-600' },
    { name: 'Vrbo', color: 'bg-indigo-600' }
  ];

  return (
    <section className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center min-h-screen">
        <div className="w-full">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <Zap className="text-yellow-400 w-5 h-5" />
              <span className="text-white/90 font-medium">Limited Time Offer</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6 leading-tight">
              Unlock Your<br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Booking Potential
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Transform your Marrakech property into a <span className="text-cyan-400 font-semibold">revenue powerhouse</span> with our comprehensive digital management solution
            </p>
          </div>

          {/* Platform Icons */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <p className="text-white/70 text-sm font-medium mb-4 text-center">Featured on leading platforms</p>
              <div className="flex flex-wrap justify-center gap-3">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className={`${platform.color} text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg hover:scale-105 transition-transform duration-200`}
                  >
                    {platform.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

        
          

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <a href="/contact" className="group relative bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 mb-4 inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Claim Your FREE Management Package
                <TrendingUp className="w-6 h-6" />
              </span>
            </a>
            
            <p className="text-white/60 text-sm">
              ⚡ Setup in 48 hours • 💰 No upfront costs • 🚀 Cancel anytime
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default RealEstateManagementSection;