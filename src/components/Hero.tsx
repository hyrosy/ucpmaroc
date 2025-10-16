import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, Award, TrendingUp, PlayCircle, Sparkles, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedROI, setAnimatedROI] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const targetROI = 9999;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced ROI animation with easing
  useEffect(() => {
    if (isVisible) {
      const duration = 2000000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(targetROI * easeOutCubic);
        
        setAnimatedROI(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`floating-element floating-element-${i + 1}`}
      style={{
        animationDelay: `${i * 0.5}s`,
        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`
      }}
    />
  ));

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(59,130,246,0.2),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Content Section */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/90 transform transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
            }`}>
              <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Digital Marketing</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className={`text-5xl lg:text-7xl font-bold text-white leading-tight transform transition-all duration-700 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                You're Watching
                <br />
                <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  Success
                </span>
                <br />
                in Move
              </h1>
              
              {/* ROI Counter */}
              <div className={`inline-flex items-center gap-3 p-4 rounded-2xl backdrop-blur-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 transform transition-all duration-700 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'
              }`}>
                <TrendingUp className="text-green-400 animate-bounce" size={24} />
                <span className="text-3xl lg:text-4xl font-bold text-green-400">
                  {animatedROI.toLocaleString()}%
                </span>
                <span className="text-green-300 font-medium">ROI</span>
              </div>
            </div>

            {/* Description */}
            <p className={`text-xl text-white/80 leading-relaxed max-w-xl transform transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              UCPMAROC leverages cutting-edge AI technology to create automated marketing campaigns and stunning websites that generate revenue 24/7. Our proven strategies deliver exceptional results for businesses of all sizes.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-900 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <a 
                href="#packages" 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2">
                  <span>View Packages</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>
              
              <a href="/contact" className="group px-8 py-4 backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-105 inline-flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <Award size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>Learn More</span>
                </div>
              </a>
            </div>

          
          </div>

          {/* Video Section */}
          <div className={`relative transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-10 opacity-0 scale-95'
          }`}>
            <div className="relative group">
              {/* Video Container with Glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 p-2 shadow-2xl">
                <video
                  ref={videoRef}
                  src="https://ucpmarocgo.s3.us-east-1.amazonaws.com/Demo.mp4"
                  poster="https://ucpmarocgo.s3.us-east-1.amazonaws.com/ucpmaroc-talents-message-video.png"
                  className="w-full aspect-video rounded-2xl object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  controls={isPlaying}
                />
                
                {/* Play Button Overlay */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                    onClick={handlePlay}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                    <div className="relative p-6 rounded-full backdrop-blur-md bg-white/20 border border-white/30 group-hover/play:bg-white/30 group-hover/play:scale-110 transition-all duration-300">
                      <PlayCircle size={60} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Elements around Video */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .floating-element {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #60a5fa, #a855f7);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-element-1 { top: 20%; left: 10%; animation-duration: 4s; }
        .floating-element-2 { top: 60%; left: 20%; animation-duration: 5s; }
        .floating-element-3 { top: 30%; right: 15%; animation-duration: 6s; }
        .floating-element-4 { bottom: 40%; right: 10%; animation-duration: 4.5s; }
        .floating-element-5 { bottom: 20%; left: 15%; animation-duration: 5.5s; }
        .floating-element-6 { top: 70%; right: 25%; animation-duration: 3.5s; }
      `}</style>
    </section>
  );
};

export default Hero;