import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Building2, CreditCard, Shield } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactUsPage = () => {
  // Animated particles for background
  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
  }
  
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const animateParticles = () => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      );
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  const companyInfo = [
    {
      icon: Building2,
      title: "Company",
      description: "UCPMAROC is operated by HYROSY LLC"
    },
    {
      icon: MapPin,
      title: "Address",
      description: "30 N Gould St Ste R Sheridan, WY 82801, United States"
    },
    {
      icon: Shield,
      title: "Registration",
      description: "Limited liability company registered in the United States"
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "All payments are securely processed by HYROSY LLC"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transition: 'all 0.1s linear',
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Info */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-light text-white leading-tight">
                  Get in <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Ready to start your journey? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              {/* Company Info Cards */}
              <div className="grid gap-4">
                {companyInfo.map((info, index) => (
                  <div key={index} className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                        <info.icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Copyright */}
              
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;