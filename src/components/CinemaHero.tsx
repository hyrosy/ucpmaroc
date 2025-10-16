import React, { useState, useEffect } from 'react';
import { Play, Camera, Film, Award, ArrowDown, ChevronRight } from 'lucide-react';

const CinematographyHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const rotatingTexts = [
    "Cinematic Excellence",
    "Visual Storytelling", 
    "Professional Videography",
    "Creative Vision"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "500+", label: "Projects" },
    { number: "50+", label: "Clients" },
    { number: "5+", label: "Years" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/Teaser+ABYYA.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Cinematic Film Grain Effect */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-900/20 to-transparent animate-pulse"></div>
          </div>
          
          {/* Dynamic Light Rays */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent transform skew-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Content */}
          <div className={`text-center space-y-8 transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            
            {/* Professional Badge */}
            <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl px-8 py-4 shadow-2xl">
              <Film className="w-6 h-6 text-gold-400" />
              <span className="text-white font-medium tracking-wide">PROFESSIONAL CINEMATOGRAPHY</span>
              <div className="w-2 h-2 bg-red-800 rounded-full animate-pulse "></div>
            </div>

            {/* Main Heading with Animation */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                <span className="block">BRINGING</span>
                <span className="block relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                    {rotatingTexts[textIndex]}
                  </span>
                  <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    {rotatingTexts[textIndex]}
                  </span>
                </span>
                <span className="block">TO LIFE</span>
              </h1>
              
              
            </div>

            {/* CTA Section */}
            

            {/* Stats */}
            
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce transition-all duration-1500 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm uppercase tracking-wider font-medium">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>

      {/* Cinematic Corner Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20"></div>

      {/* Floating Cinematic Elements */}
      <div className="absolute top-1/4 right-20 w-40 h-40 bg-gradient-to-br from-red-500/5 to-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Film Strip Effect */}
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-b from-black via-gray-900 to-black opacity-30">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-8 border-b border-white/10 flex items-center justify-center">
            <div className="w-4 h-2 bg-white/5 rounded-sm"></div>
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-b from-black via-gray-900 to-black opacity-30">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-8 border-b border-white/10 flex items-center justify-center">
            <div className="w-4 h-2 bg-white/5 rounded-sm"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CinematographyHero;