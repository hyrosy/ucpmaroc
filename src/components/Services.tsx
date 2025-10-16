import React from 'react';
import { Code, Search, Users, Camera, TrendingUp, BarChart3, Sparkles, Zap, ArrowRight, Star } from 'lucide-react';

interface ServiceProps {
  imageUrl: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  platforms?: string[];
}

const ServiceCard: React.FC<ServiceProps> = ({ imageUrl, title, description, icon, color, platforms }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
      
      {/* Floating Icons Background */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Sparkles className="w-6 h-6 text-white animate-pulse" />
      </div>
      
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className={`w-20 h-20 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {icon}
        </div>
        
        {/* Platform Badges */}
        {platforms && (
          <div className="flex flex-wrap gap-2 mb-4">
            {platforms.map((platform, index) => (
              <span
                key={index}
                className="text-xs bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1 rounded-full border border-white/20 font-medium"
              >
                {platform}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        
        
      </div>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      imageUrl: "https://ucpagencybucket.s3.us-east-1.amazonaws.com/developing_2973841.png",
      title: "Web Development",
      description: "We create stunning, high-converting landing pages and websites optimized for lead generation and sales, with proven ROI.",
      icon: <Code className="w-8 h-8 text-white" />,
      color: "from-blue-500 to-cyan-500",
      platforms: ["React", "Next.js", "WordPress"]
    },
    {
      imageUrl: "https://ucpagencybucket.s3.us-east-1.amazonaws.com/icons8-google-240.png",
      title: "Google Ads",
      description: "Targeted Google Ads campaigns that drive qualified traffic to your website, with AI-optimized bidding and conversion tracking.",
      icon: <Search className="w-8 h-8 text-white" />,
      color: "from-red-500 to-orange-500",
      platforms: ["Search Ads", "Display", "Shopping"]
    },
    {
      imageUrl: "https://ucpagencybucket.s3.us-east-1.amazonaws.com/icons8-meta-240.png",
      title: "Facebook Ads",
      description: "Strategic Facebook ad campaigns that reach your ideal customers with compelling creatives and precise audience targeting.",
      icon: <Users className="w-8 h-8 text-white" />,
      color: "from-blue-600 to-indigo-600",
      platforms: ["Feed Ads", "Stories", "Reels"]
    },
    {
      imageUrl: "https://ucpagencybucket.s3.us-east-1.amazonaws.com/%E2%80%94Pngtree%E2%80%94instagram+icon+3d+stereo_8704804.png",
      title: "Instagram Ads",
      description: "Visually stunning Instagram campaigns that boost engagement, followers, and conversions for your brand.",
      icon: <Camera className="w-8 h-8 text-white" />,
      color: "from-pink-500 to-rose-500",
      platforms: ["Posts", "Stories", "Reels", "IGTV"]
    },
    {
      imageUrl: "https://ucpagencybucket.s3.us-east-1.amazonaws.com/tik-tok_3046121.png",
      title: "TikTok Ads",
      description: "Trending TikTok ads that capture attention and drive engagement with the fastest-growing social media platform.",
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      color: "from-purple-500 to-pink-500",
      platforms: ["In-Feed", "Spark Ads", "Brand Takeover"]
    },
    {
      imageUrl: "https://ucpagencybucket.s3.us-east-1.amazonaws.com/report_9563619.png",
      title: "Analytics & Optimization",
      description: "Comprehensive analytics and continuous optimization to ensure maximum ROI on all your digital marketing investments.",
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      color: "from-green-500 to-emerald-500",
      platforms: ["GA4", "Facebook Pixel", "Custom Dashboards"]
    }
  ];

  return (
    <section id="services" className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6 leading-tight">
            AI-Powered Digital<br />
            <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Marketing Solutions
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            We leverage <span className="text-cyan-400 font-semibold">cutting-edge artificial intelligence</span> to create automated marketing solutions that deliver exceptional results for businesses of all sizes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              imageUrl={service.imageUrl}
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              platforms={service.platforms}
            />
          ))}
        </div>


       

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-3">
              <Star className="w-6 h-6" />
              Start Your AI-Powered Campaign
              <Zap className="w-6 h-6" />
            </span>
          </button>
          
          <p className="text-white/60 text-sm mt-4">
            🚀 Free consultation • 📊 Custom strategy • 💰 Guaranteed results
          </p>
        </div>
      </div>

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

export default Services;