import React, { useState } from 'react';
import { ChevronRight, Sliders, Zap, Target, TrendingUp, Users, Sparkles, Star, ArrowRight, CheckCircle, Palette, Wrench } from 'lucide-react';

// Import the existing CustomPackage component
import CustomPackage from './CustomPackage';

const CustomPackageSection: React.FC = () => {
  const [showCustomizer, setShowCustomizer] = useState(false);

  const benefits = [
    {
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      title: "Flexibility",
      description: "Only pay for what you truly need",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Precision",
      description: "Target specific areas for growth",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      title: "Scalability",
      description: "Adjust as your business evolves",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Expert Guidance",
      description: "We'll help build the most effective plan",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const features = [
    "AI-Powered Service Selection",
    "Real-time Price Calculator",
    "Performance Prediction",
    "Custom Timeline Creation",
    "ROI Optimization Suggestions"
  ];

  return (
    <section id="custom-package" className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <Palette className="text-cyan-400 w-5 h-5" />
            <span className="text-white/90 font-medium">Tailored For You</span>
            <Sparkles className="text-pink-400 w-5 h-5" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6 leading-tight">
            Create Your Perfect
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Marketing Package
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Description */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Why Choose a Custom Package?</h3>
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Every business is unique, and so are its marketing needs. Our custom package option allows you to 
                <span className="text-cyan-400 font-semibold"> pick and choose the services</span> that align perfectly with your goals and budget.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-white/70 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  What's Included in Customization:
                </h4>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-white/80 text-lg mt-6">
                Click <span className="text-cyan-400 font-semibold">"Build Your Package"</span> to start customizing your AI-powered marketing strategy today!
              </p>
            </div>
          </div>

          {/* Right Side - Custom Package Card */}
          <div className="flex justify-center">
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full hover:scale-105 transition-all duration-500 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
              </div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                    <Sliders className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    Custom Package
                  </h3>
                  
                  <p className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    Build your perfect marketing package by selecting exactly what you need for your business growth.
                  </p>
                </div>

                {/* Price Display */}
                <div className="text-center mb-8">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
                    <div className="text-4xl font-black text-white mb-2">Starting at</div>
                    <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      $299
                    </div>
                    <div className="text-white/60 text-sm">per month</div>
                  </div>
                  
                  <div className="text-white/70 text-sm">
                    💡 Final price depends on selected services
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => setShowCustomizer(true)}
                  className="group/btn relative w-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6" />
                    Build Your Package
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>

                {/* Additional Info */}
                <div className="text-center mt-6 space-y-2">
                  <p className="text-white/60 text-sm">
                    ⚡ Instant preview • 🎯 AI recommendations • 📊 ROI calculator
                  </p>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Marketing?
            </h3>
            <p className="text-white/80 text-lg mb-6">
              Join hundreds of businesses that have already customized their perfect marketing solution
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                No setup fees
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                30-day money back guarantee
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Package Modal */}
      {showCustomizer && (
        <CustomPackage onClose={() => setShowCustomizer(false)} />
      )}

      <style >{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </section>
  );
};

export default CustomPackageSection;