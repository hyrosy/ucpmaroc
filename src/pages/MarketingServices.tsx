import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Search,
  Users,
  BarChart3,
  Target,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Globe,
  Zap,
  Award,
  ArrowRight,
  Play,
  ChevronRight,
  ChevronLeft,
  Star,
  Calendar,
  DollarSign,
  MousePointer,
  Smartphone,
  Monitor,
  ShoppingCart,
  TrendingDown,
  CheckCircle,
  ExternalLink,
  Volume2,
  VolumeX,
  LucideIcon
} from 'lucide-react';

// Define a type for the keys of the services object
type ServiceTab = 'social' | 'seo';

const MarketingServices = () => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('social');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [currentCase, setCurrentCase] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const socialMediaStats = [
    { icon: Eye, value: '2.5M+', label: 'Impressions', color: 'from-purple-500 to-pink-500' },
    { icon: Users, value: '150K+', label: 'Followers', color: 'from-blue-500 to-cyan-500' },
    { icon: Heart, value: '95%', label: 'Engagement', color: 'from-red-500 to-rose-500' },
    { icon: Share2, value: '45K+', label: 'Shares', color: 'from-green-500 to-emerald-500' }
  ];

  const seoStats = [
    { icon: TrendingUp, value: '340%', label: 'Traffic Growth', color: 'from-indigo-500 to-purple-500' },
    { icon: Search, value: 'Top 3', label: 'Rankings', color: 'from-orange-500 to-red-500' },
    { icon: Globe, value: '85+', label: 'Keywords', color: 'from-teal-500 to-blue-500' },
    { icon: BarChart3, value: '25%', label: 'Conversion', color: 'from-violet-500 to-purple-500' }
  ];

  const adPlatforms = [
    { name: 'Google Ads', icon: Search, color: 'from-blue-600 to-blue-800', desc: 'Search & Display Network' },
    { name: 'Facebook Ads', icon: Users, color: 'from-blue-500 to-indigo-600', desc: 'Social Media Advertising' },
    { name: 'TikTok Ads', icon: Smartphone, color: 'from-pink-500 to-red-500', desc: 'Short-Form Video Content' },
    { name: 'Microsoft Ads', icon: Monitor, color: 'from-cyan-500 to-blue-500', desc: 'Bing Search Network' },
    { name: 'Taboola', icon: Target, color: 'from-orange-500 to-red-500', desc: 'Native Advertising' },
    { name: 'Outbrain', icon: Globe, color: 'from-purple-500 to-indigo-500', desc: 'Content Discovery' }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Fashion Brand",
      industry: "Retail",
      challenge: "Low online visibility and poor conversion rates",
      solution: "Comprehensive SEO + Google Ads + Facebook Ads strategy",
      results: {
        traffic: "+450%",
        revenue: "+320%",
        roas: "8.5x",
        timeline: "6 months"
      },
      metrics: [
        { label: "Organic Traffic", value: "45K → 247K", trend: "up" },
        { label: "Monthly Revenue", value: "$28K → $118K", trend: "up" },
        { label: "Conversion Rate", value: "1.2% → 4.8%", trend: "up" }
      ],
      platforms: ["Google Ads", "Facebook Ads", "SEO"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "SaaS Startup",
      industry: "Technology",
      challenge: "High customer acquisition costs and low brand awareness",
      solution: "Multi-platform paid strategy with content marketing",
      results: {
        traffic: "+280%",
        revenue: "+190%",
        roas: "6.2x",
        timeline: "4 months"
      },
      metrics: [
        { label: "Lead Generation", value: "120 → 680/month", trend: "up" },
        { label: "CAC Reduction", value: "$180 → $65", trend: "down" },
        { label: "Trial Signups", value: "45 → 280/week", trend: "up" }
      ],
      platforms: ["Google Ads", "LinkedIn Ads", "Content SEO"],
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: 3,
      title: "Local Restaurant Chain",
      industry: "Food & Beverage",
      challenge: "Limited local visibility and declining foot traffic",
      solution: "Local SEO + Social Media + TikTok marketing",
      results: {
        traffic: "+220%",
        revenue: "+180%",
        roas: "5.8x",
        timeline: "3 months"
      },
      metrics: [
        { label: "Local Rankings", value: "#15 → #1", trend: "up" },
        { label: "Online Orders", value: "12 → 89/day", trend: "up" },
        { label: "Social Followers", value: "2K → 45K", trend: "up" }
      ],
      platforms: ["Local SEO", "TikTok Ads", "Google My Business"],
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: 4,
      title: "Healthcare Practice",
      industry: "Healthcare",
      challenge: "Low patient acquisition and poor online reputation",
      solution: "Medical SEO + Reputation Management + Native Ads",
      results: {
        traffic: "+380%",
        revenue: "+250%",
        roas: "7.1x",
        timeline: "5 months"
      },
      metrics: [
        { label: "New Patients", value: "8 → 52/month", trend: "up" },
        { label: "Online Reviews", value: "3.2 → 4.8 stars", trend: "up" },
        { label: "Appointment Bookings", value: "+340%", trend: "up" }
      ],
      platforms: ["Medical SEO", "Taboola", "Review Management"],
      gradient: "from-teal-600 to-cyan-600"
    }
  ];

  interface ServiceEntry {
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    features: string[];
    platforms: string[];
    stats: { icon: LucideIcon; value: string; label: string; color: string; }[];
    gradient: string;
  }

  type ServicesType = {
    [key in ServiceTab]: ServiceEntry;
  };

  const services: ServicesType = {
    social: {
      title: 'Social Media Marketing',
      subtitle: 'Amplify Your Brand Across All Platforms',
      description: 'Create viral content, build engaged communities, and drive meaningful connections with your audience through strategic social media campaigns that convert followers into customers.',
      longDescription: 'Our social media marketing services go beyond just posting content. We create comprehensive strategies that align with your business goals, develop compelling content that resonates with your target audience, and use advanced analytics to optimize performance across all major platforms.',
      features: [
        'Content Strategy & Creation',
        'Community Management',
        'Influencer Partnerships',
        'Analytics & Reporting',
        'Paid Social Advertising',
        'Brand Voice Development',
        'User-Generated Content Campaigns',
        'Social Commerce Integration'
      ],
      platforms: ['Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'LinkedIn Ads', 'Twitter Ads', 'Pinterest Ads'],
      stats: socialMediaStats,
      gradient: 'from-purple-600 via-pink-600 to-red-600'
    },
    seo: {
      title: 'SEO & Paid Advertising',
      subtitle: 'Dominate Search Results & Drive Targeted Traffic',
      description: 'Boost your visibility, outrank competitors, and attract high-quality traffic through advanced SEO strategies, technical optimization, and strategic paid advertising campaigns.',
      longDescription: 'Our comprehensive digital marketing approach combines organic SEO with strategic paid advertising across multiple platforms. We optimize your website for search engines while running targeted ad campaigns that deliver immediate results and long-term growth.',
      features: [
        'Keyword Research & Strategy',
        'Technical SEO Audit',
        'Content Optimization',
        'Link Building Campaigns',
        'Local SEO Management',
        'Performance Tracking',
        'Conversion Rate Optimization',
        'Multi-Platform Ad Management'
      ],
      platforms: ['Google Ads', 'Microsoft Ads', 'Taboola', 'Outbrain', 'Google Shopping', 'YouTube Ads'],
      stats: seoStats,
      gradient: 'from-blue-600 via-indigo-600 to-purple-600'
    }
  };

  const currentService = services[activeTab];

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube.com/embed/aSk-D86aOtc?autoplay=1&mute=${isMuted ? 1 : 0}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

        {/* Video Controls */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-8 right-8 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-8">
          <div className="max-w-5xl mx-auto text-center">
            
            
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>
            
            <p className="text-2xl sm:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
              Elevate your brand with cutting-edge marketing strategies that deliver measurable results and sustainable growth across all digital channels.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a href="/contact">
                            <button className="group px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg sm:text-xl rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                              Start Your Journey
                              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </a>
             
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white/60">Successful Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">$50M+</div>
                <div className="text-white/60">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">300%</div>
                <div className="text-white/60">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-white/60">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
          </div>
        </div>
      </div>

      {/* Service Toggle */}
      <div className="px-8 py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto flex justify-center mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex gap-2">
              {Object.entries(services as ServicesType).map(([key, service]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as ServiceTab)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-500 ${
                    activeTab === key
                      ? 'bg-white text-slate-900 shadow-2xl scale-105'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column - Service Info */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentService.gradient} flex items-center justify-center mb-6`}>
                {activeTab === 'social' ? (
                  <Users className="w-8 h-8 text-white" />
                ) : (
                  <Search className="w-8 h-8 text-white" />
                )}
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4">
                {currentService.title}
              </h2>
              
              <p className="text-xl text-purple-300 mb-6">
                {currentService.subtitle}
              </p>
              
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {currentService.description}
              </p>

              <p className="text-white/60 leading-relaxed mb-8">
                {currentService.longDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {currentService.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/90 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              
            </div>
          </div>

          {/* Right Column - Stats & Platforms */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {currentService.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 ${
                    animationPhase === index ? 'ring-2 ring-purple-400/50' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Platforms */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Advertising Platforms</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentService.platforms.map((platform, index) => {
                  const platformData = adPlatforms.find(p => p.name === platform) || 
                    { name: platform, icon: Target, color: 'from-gray-600 to-gray-800', desc: 'Digital Advertising Platform' };
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platformData.color} flex items-center justify-center`}>
                        <platformData.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{platformData.name}</div>
                        <div className="text-white/60 text-sm">{platformData.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies Carousel */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-white/70">Real results from real businesses across industries</p>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Case Study Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${caseStudies[currentCase].gradient} flex items-center justify-center`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{caseStudies[currentCase].title}</h3>
                      <p className="text-purple-300">{caseStudies[currentCase].industry}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Challenge</h4>
                      <p className="text-white/70">{caseStudies[currentCase].challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Solution</h4>
                      <p className="text-white/70">{caseStudies[currentCase].solution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {caseStudies[currentCase].platforms.map((platform, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-green-400">{caseStudies[currentCase].results.traffic}</div>
                      <div className="text-white/60 text-sm">Traffic Growth</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-blue-400">{caseStudies[currentCase].results.revenue}</div>
                      <div className="text-white/60 text-sm">Revenue Increase</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-purple-400">{caseStudies[currentCase].results.roas}</div>
                      <div className="text-white/60 text-sm">Return on Ad Spend</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-2xl font-bold text-orange-400">{caseStudies[currentCase].results.timeline}</div>
                      <div className="text-white/60 text-sm">Timeline</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {caseStudies[currentCase].metrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white/80">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{metric.value}</span>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={prevCase}
                  className="p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex gap-2">
                  {caseStudies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCase(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentCase ? 'bg-purple-400' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextCase}
                  className="p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Advertising Platforms Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Advertising Platforms We Master</h2>
            <p className="text-xl text-white/70">Maximize your reach across all major advertising networks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adPlatforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center mb-4`}>
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-white/60 mb-4">{platform.desc}</p>
                
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-6">
                Ready to Accelerate Your Growth?
              </h3>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses that have transformed their digital presence with our proven strategies across all major platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <a href="/contact">
                                <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                  Start Your Journey
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </a>
                             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingServices;