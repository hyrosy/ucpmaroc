import { useState, useEffect } from 'react';
import { Play, Film, Award, Users, ChevronRight } from 'lucide-react';

const VideographySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "AZADI",
      description: "Capturing the spirit of Azadi Adornments—a brand where jewellery becomes language, telling a story of freedom, heritage, and bold expression.",
      features: ["Brand Storytelling", "Heritage Focus", "Bold Expression"]
    },
    {
      icon: <Film className="w-8 h-8" />,
      title: "ABYYA – Ramadan in Marrakech",
      description: "Capturing the spirit of sisterhood during Ramadan, with scenes of discovery, spiritual pause, and joy.",
      features: ["Ramadan Campaign", "Sisterhood Narrative", "Cultural Immersion"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "IZZY – Teaser",
      description: "Capturing Izelle's magnetic presence where modeling meets performance, stillness meets story, and elegance meets edge.",
      features: ["Model Showcase", "Performance Art", "Elegance & Edge"]
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full bg-gradient-to-br from-red-900/20 via-blue-900/30 to-black/60">
          {/* Placeholder for video - In production, replace with actual video element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/Teaser+ABYYA.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Column - Hero Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Hero Badge */}
            

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Cinematic
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent py-5">
                  Storytelling
                </span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                Transform your vision into captivating visual narratives that resonate with your audience and leave lasting impressions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/cinema-portfolio">
                            <button className="group bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-500/25">
                              <span className="flex items-center justify-center space-x-2">
                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>View Our Work</span>
                              </span>
                            </button>
                          </a>
              
              <a href="/contact">
                            <button className="group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105">
                              <span className="flex items-center justify-center space-x-2">
                                <span>Get Quote</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </button>
                          </a>
            </div>

            {/* Stats 
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>*/}
          </div>

          {/* Right Column - Services */}
          <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Services Header */}
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Our Services</h3>
              <p className="text-white/70">Comprehensive video production solutions</p>
            </div>

            {/* Service Cards */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`group bg-black/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-black/10 hover:border-white/20 hover:scale-105 ${
                    activeService === index ? 'bg-white/10 border-white/20 scale-105' : ''
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-gray-900/20 to-purple-600/20 rounded-xl border border-white/10">
                      <div className="text-white group-hover:text-white transition-colors">
                        {service.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-white/70 mb-4">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full border border-white/10"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Portfolio Preview 
            <div className="mt-8 p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Recent Work</h4>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Play className="w-6 h-6 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>.*/}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default VideographySection;