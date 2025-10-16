import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Award, Users, Eye, ArrowRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  credit: string;
  description: string;
  category: string;
  date: string;
  location: string;
  views: string;
  details: {
    title: string;
    description: string;
    features: string[];
    stats: {
      label: string;
      value: string;
      icon: React.ReactNode;
    }[];
  };
}

const PortfolioGallery: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ITEMS_TO_SHOW = 1; // Define how many items to show

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'LuxuryMorocco E-commerce',
      image: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/portfolio%20website/Screenshot%202025-05-09%20at%2014-50-56%20Steps%20WorkDo.png',
      credit: 'Created by Sarah Johnson',
      description: 'A sophisticated e-commerce platform featuring premium Moroccan crafts and luxury goods.',
      category: 'E-commerce Design',
      date: 'March 2024',
      location: 'Marrakech, Morocco',
      views: '2.4K',
      details: {
        title: 'Premium E-commerce Experience',
        description: 'This project showcases a complete e-commerce solution built for luxury Moroccan goods, featuring advanced filtering, secure payments, and immersive product galleries that increased conversion rates by 340%.',
        features: [
          'Advanced Product Filtering',
          'Secure Payment Integration',
          'Multi-language Support',
          'Mobile-First Design',
          'Real-time Inventory'
        ],
        stats: [
          { label: 'Conversion Rate', value: '+340%', icon: <Award className="w-5 h-5" /> },
          { label: 'Page Views', value: '2.4K', icon: <Eye className="w-5 h-5" /> },
          { label: 'User Rating', value: '4.9/5', icon: <Users className="w-5 h-5" /> }
        ]
      }
    },
    {
      id: '2',
      title: 'SportsFit Pro Campaign',
      image: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/portfolio%20website/Screenshot%202025-05-09%20at%2014-23-50%20Home%20%E2%80%93%20Crypket%20%E2%80%93%20Cryptocurrency%20Blockchain%20%26%20Bitcoin.png',
      credit: 'Created by Mike Chen',
      description: 'Dynamic cryptocurrency trading platform with real-time analytics and portfolio management.',
      category: 'FinTech Platform',
      date: 'April 2024',
      location: 'Dubai, UAE',
      views: '5.1K',
      details: {
        title: 'Cryptocurrency Trading Platform',
        description: 'A comprehensive crypto trading platform featuring real-time market data, advanced charting tools, and secure wallet integration. The platform handles over $10M in daily trading volume.',
        features: [
          'Real-time Market Data',
          'Advanced Charting Tools',
          'Secure Wallet Integration',
          'Multi-Currency Support',
          'AI Trading Insights'
        ],
        stats: [
          { label: 'Daily Volume', value: '$10M+', icon: <Award className="w-5 h-5" /> },
          { label: 'Active Users', value: '5.1K', icon: <Users className="w-5 h-5" /> },
          { label: 'Uptime', value: '99.9%', icon: <Eye className="w-5 h-5" /> }
        ]
      }
    },
    {
      id: '3',
      title: 'TechFlow Solutions',
      image: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/portfolio%20website/Screenshot%202025-05-09%20at%2014-43-18%20Testo%20-%20Password%20is%201.png',
      credit: 'Created by Emma Rodriguez',
      description: 'Minimalist password management tool with advanced security features.',
      category: 'Security App',
      date: 'February 2024',
      location: 'Barcelona, Spain',
      views: '1.8K',
      details: {
        title: 'Advanced Security Solution',
        description: 'A cutting-edge password management application with biometric authentication, secure sharing, and breach monitoring. Trusted by over 50,000 users worldwide.',
        features: [
          'Biometric Authentication',
          'Secure Password Sharing',
          'Breach Monitoring',
          'Cross-platform Sync',
          'Zero-knowledge Architecture'
        ],
        stats: [
          { label: 'Users Protected', value: '50K+', icon: <Users className="w-5 h-5" /> },
          { label: 'Security Score', value: '99/100', icon: <Award className="w-5 h-5" /> },
          { label: 'Breaches Prevented', value: '1,200', icon: <Eye className="w-5 h-5" /> }
        ]
      }
    },
    {
      id: '4',
      title: 'EcoGreen Initiative',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop&crop=entropy&auto=format',
      credit: 'Created by David Park',
      description: 'Environmental awareness platform promoting sustainability and green initiatives.',
      category: 'Environmental Web App',
      date: 'January 2024',
      location: 'Vancouver, Canada',
      views: '3.2K',
      details: {
        title: 'Sustainability Platform',
        description: 'An innovative platform connecting eco-conscious individuals and organizations to promote environmental sustainability through actionable insights and community engagement.',
        features: [
          'Carbon Footprint Tracker',
          'Community Challenges',
          'Green Business Directory',
          'Impact Visualization',
          'Educational Resources'
        ],
        stats: [
          { label: 'CO2 Reduced', value: '12 Tons', icon: <Award className="w-5 h-5" /> },
          { label: 'Active Members', value: '3.2K', icon: <Users className="w-5 h-5" /> },
          { label: 'Green Actions', value: '8,500', icon: <Eye className="w-5 h-5" /> }
        ]
      }
    },
    {
      id: '5',
      title: 'Artisan Bakery Branding',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=800&fit=crop&crop=entropy&auto=format',
      credit: 'Created by Lisa Thompson',
      description: 'Complete brand identity and digital presence for a premium artisan bakery.',
      category: 'Brand Identity',
      date: 'December 2023',
      location: 'Paris, France',
      views: '4.7K',
      details: {
        title: 'Premium Brand Identity',
        description: 'A comprehensive branding project that transformed a local bakery into a premium artisan brand, resulting in 200% increase in sales and recognition as "Best Local Bakery 2024".',
        features: [
          'Logo & Visual Identity',
          'Packaging Design',
          'Website Development',
          'Social Media Strategy',
          'Photography Direction'
        ],
        stats: [
          { label: 'Sales Increase', value: '+200%', icon: <Award className="w-5 h-5" /> },
          { label: 'Brand Recognition', value: '94%', icon: <Eye className="w-5 h-5" /> },
          { label: 'Customer Growth', value: '4.7K', icon: <Users className="w-5 h-5" /> }
        ]
      }
    },
    {
      id: '6',
      title: 'TaskMaster Mobile App',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop&crop=entropy&auto=format',
      credit: 'Created by Alex Kim',
      description: 'Intuitive task management mobile application with team collaboration features.',
      category: 'Mobile App Design',
      date: 'November 2023',
      location: 'Seoul, South Korea',
      views: '6.3K',
      details: {
        title: 'Productivity Mobile App',
        description: 'A feature-rich task management application that helps teams stay organized and productive. Featured in App Store "Best Apps of 2024" with over 100K downloads.',
        features: [
          'Smart Task Prioritization',
          'Team Collaboration Tools',
          'Time Tracking Integration',
          'Offline Synchronization',
          'AI-powered Insights'
        ],
        stats: [
          { label: 'Downloads', value: '100K+', icon: <Users className="w-5 h-5" /> },
          { label: 'App Store Rating', value: '4.8/5', icon: <Award className="w-5 h-5" /> },
          { label: 'Daily Active Users', value: '6.3K', icon: <Eye className="w-5 h-5" /> }
        ]
      }
    }
  ];

  const nextSlide = () => {
    if (portfolioItems.length <= ITEMS_TO_SHOW) {
      // setCurrentSlide(0); // Already handled by currentSlide init and transform logic
      return;
    }
    const maxSlideIndex = portfolioItems.length - ITEMS_TO_SHOW;
    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (portfolioItems.length <= ITEMS_TO_SHOW) {
      // setCurrentSlide(0);
      return;
    }
    const maxSlideIndex = portfolioItems.length - ITEMS_TO_SHOW;
    setCurrentSlide((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  const currentItem = portfolioItems[currentSlide]; // Details panel shows info for the first visible item

  return (
    <section
      className="relative bg-gray-900 py-24 overflow-hidden bg-cover bg-repeat"
      style={{ backgroundImage: "url('https://example.com/path/to/your/image.jpg')" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -translate-y-20 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100 to-cyan-100 rounded-full blur-3xl opacity-30 translate-y-20 -translate-x-20" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-sm tracking-wide uppercase mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-purple-600" />
            Creator Portfolio
            <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-purple-600" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-900 mb-6 leading-tight text-white">
            Featured
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-white">
            Explore our creators' exceptional work and discover the stories behind each masterpiece.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_480px] items-start">
          
          {/* First Column - Carousel */}
          <div className={`space-y-6 transition-all duration-1000 w-full ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Carousel Container */}
            <div className="relative w-full">
              <div className="overflow-hidden rounded-3xl w-full">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Simplified as ITEMS_TO_SHOW is 1
                >
                  {portfolioItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-full"> {/* Explicitly w-full as ITEMS_TO_SHOW is 1 */}
                      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 w-full">
                        {/* Image - 75vh */}
                        <div className="relative w-full h-[50vh] overflow-hidden group">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-6 left-6">
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
                              {item.category}
                            </span>
                          </div>

                          {/* View Count */}
                          <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-3 py-2 text-white text-sm">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </div>

                          {/* Overlay Actions */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex gap-4">
                              
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                          <p className="text-yellow-600 font-medium mb-4 ">{item.credit}</p>
                          <p className="text-slate-600 leading-relaxed mb-6">{item.description}</p>
                          
                          {/* Meta Info */}
                          <div className="flex items-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {item.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            {/* Carousel Indicators */}
            {portfolioItems.length > ITEMS_TO_SHOW && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: portfolioItems.length - ITEMS_TO_SHOW + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-yellow-600 w-8'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Second Column - Dynamic Content */}
          <div className={`sticky top-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-200/50">
              
              {/* Dynamic Title & Description */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {currentItem.details.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {currentItem.details.description}
                </p>
              </div>

              {/* Stats */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Project Impact</h4>
                <div className="grid grid-cols-1 gap-4">
                  {currentItem.details.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-yellow-600 rounded-xl flex items-center justify-center text-white">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a href="/contact" className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl inline-flex">
                View Full Case Study
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;