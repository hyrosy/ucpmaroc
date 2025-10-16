import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight, Sparkles, Info, Crown, Zap, TrendingUp, ChevronLeft, Users, Clock, Shield, Star, Target, Rocket, Globe, BarChart3, Heart, Award, ArrowRight } from 'lucide-react';

interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  monthlyPrice: number;
  lifetimePrice: number;
  originalMonthlyPrice?: number;
  originalLifetimePrice?: number;
  description: string;
  features: { text: string; tooltip: string }[];
  bonuses: { text: string; tooltip: string }[];
  recommended?: boolean;
  forType: string;
  bestFor: string;
  deliveryTime: string;
  clientsSaved: string;
  guarantee: string;
  testimonial?: string;
  monthlyPurchaseLink?: string;
  oneTimePurchaseLink?: string;
}

const DevPlans: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [paymentType, setPaymentType] = useState<'monthly' | 'lifetime'>('monthly');
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(1);
      } else if (width < 1280) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    window.addEventListener('resize', calculateItemsPerPage);
    calculateItemsPerPage(); // Initial calculation

    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, tooltipText: string) => {
    if (tooltipText.trim()) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltip({
        text: tooltipText,
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= maxSlides ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? maxSlides : prev - 1
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const pricingPlans: PricingPlan[] = [
    
    {
      id: 'landing-page',
      title: 'Landing Page Pro',
      subtitle: 'High-Converting Landing Page',
      monthlyPrice: 34.00, // Example monthly price
      lifetimePrice: 109.00, // Example lifetime price (10x monthly, with discount)
      originalMonthlyPrice: 59.89,
      originalLifetimePrice: 149.99,
      description: 'Get a professionally designed landing page that converts visitors into customers with proven psychology-driven design.',
      forType: 'Single Page Focus',
      bestFor: 'Startups, service providers, and lead generation',
      deliveryTime: '7 business days',
      clientsSaved: 'Average 35% increase in conversions',
      guarantee: 'Conversion rate improvement or money back',
      features: [
        { text: 'Psychology-Driven Design', tooltip: 'Landing page designed using proven conversion psychology principles' },
        { text: 'Mobile-First Responsive Design', tooltip: 'Optimized for all devices with touch-friendly interactions' },
        { text: 'Speed-Optimized (under 3 seconds)', tooltip: 'Lightning-fast loading times for better user experience and SEO' },
        { text: 'Advanced Contact Form + CRM Integration', tooltip: 'Smart forms with spam protection and automatic lead nurturing' },
        { text: '7 High-Converting Sections', tooltip: 'Hero, benefits, social proof, features, testimonials, CTA, and footer' },
        { text: 'Google Analytics + Facebook Pixel', tooltip: 'Complete tracking setup for marketing optimization' },
        { text: 'Legal Pages (Privacy, Terms)', tooltip: 'GDPR-compliant legal pages to build trust and protect your business' },
        { text: 'Google Sheets Lead Collection', tooltip: 'Automatic lead organization with real-time notifications' },
      ],
      bonuses: [
        { text: 'FREE copywriting consultation', tooltip: 'Professional copy review and optimization' },
        { text: 'Social media graphics package', tooltip: '5 branded graphics for your marketing campaigns' },
        { text: '1 month free hosting', tooltip: 'Fast, secure hosting with SSL certificate included' },
      ],
      testimonial: "Our lead generation increased by 300% within the first week!",
      monthlyPurchaseLink: 'https://buy.stripe.com/dRm9AL1KU5vh2ax5Gtebu04',
      oneTimePurchaseLink: 'https://buy.stripe.com/cNi5kv1KU4rddTffh3ebu03',
    },
    {
      id: 'multi-page',
      title: 'Business Website',
      subtitle: 'Complete Business Website',
      monthlyPrice: 58.99, // Example monthly price
      lifetimePrice: 168.99, // Example lifetime price (10x monthly, with discount)
      originalMonthlyPrice: 89,
      originalLifetimePrice: 205.99,
      description: 'Establish your business as the go-to authority in your industry with a comprehensive, professional website.',
      forType: 'Multi-Page Excellence',
      bestFor: 'Established businesses and professional services',
      deliveryTime: '10-20 business days',
      clientsSaved: 'Clients report 60% more credibility',
      guarantee: 'Complete satisfaction or full refund',
      recommended: true,
      features: [
        { text: 'All Landing Page Features Included', tooltip: 'Everything from our conversion catalyst package plus more' },
        { text: 'Up to 5 Professional Pages', tooltip: 'Home, About, Services, Contact, and one custom page' },
        { text: 'SEO-Optimized Content Structure', tooltip: 'Strategic keyword placement and meta optimization for search engines' },
        { text: 'Professional Brand Consistency', tooltip: 'Cohesive design language across all pages' },
        { text: 'Advanced Navigation System', tooltip: 'User-friendly menu structure with breadcrumbs and search' },
        { text: 'Client Testimonials Section', tooltip: 'Dedicated space for social proof and credibility building' },
        { text: 'Service/Product Showcase', tooltip: 'Professional portfolio or service presentation pages' },
        { text: 'Contact Integration Suite', tooltip: 'Multiple contact methods with location maps and business hours' },
      ],
      bonuses: [
        { text: 'FREE brand audit & recommendations', tooltip: 'Professional analysis of your brand positioning' },
        { text: 'Content writing for all pages', tooltip: 'Professional copywriting for maximum impact' },
        { text: 'Social media integration', tooltip: 'Seamless connection with your social media presence' },
        { text: 'Basic SEO setup', tooltip: 'Foundation SEO to help you rank higher in search results' },
      ],
      testimonial: "Clients now see us as the premium choice in our industry!",
      monthlyPurchaseLink: 'https://buy.stripe.com/6oU28jcpy7Dp5mJ8SFebu00',
      oneTimePurchaseLink: 'https://buy.stripe.com/dRm5kv61abTF8yV4Cpebu02'
    },
    {
      id: 'Platforms',
      title: 'Platform Pro',
      subtitle: 'Your Customizable Online Presence',
      monthlyPrice: 99.00, // Example monthly price
      lifetimePrice: 404.00, // Example lifetime price (10x monthly, with discount)
      originalMonthlyPrice: 130,
      originalLifetimePrice: 750,
      description: 'Launch a professional and highly customizable website with our premium platform templates, designed for rapid growth and seamless user experience.',
      forType: 'Platform Template',
      bestFor: 'Businesses seeking a modern, adaptable online presence',
      deliveryTime: '7-15 business days',
      clientsSaved: 'Average 50% faster launch time',
      guarantee: 'Satisfaction guarantee',
      features: [
        { text: 'All Core Platform Features Included', tooltip: 'Access to all essential features of the chosen platform template' },
        { text: 'Up to 10 Customizable Pages', tooltip: 'Build your site with up to 10 pages, fully adaptable to your content' },
        { text: 'Intuitive UX/UI Design', tooltip: 'User-friendly interface design for a smooth customer journey' },
        { text: 'Multilingual Options Available', tooltip: 'Prepare your site for international audiences with language support' },
        { text: 'Integrated Analytics Dashboard', tooltip: 'Track your website performance with built-in analytics tools' },
        { text: 'Team Showcase Section', tooltip: 'Display your team members with professional profiles' },
        { text: 'Integrated Blog/Resources Section', tooltip: 'Easily manage and publish content with an integrated blog' },
        { text: 'Standard Security Features', tooltip: 'Includes essential security measures for a safe online environment' },
        { text: 'Integration with Popular Tools', tooltip: 'Connect seamlessly with marketing, CRM, and other essential tools' },
      ],
      bonuses: [
        { text: 'FREE Setup Assistance', tooltip: 'Get help setting up your chosen template and initial content' },
        { text: 'Template Customization Guide', tooltip: 'A comprehensive guide to personalize your website' },
        { text: 'Basic SEO Setup', tooltip: 'Essential SEO configurations to improve search engine visibility' },
        { text: '1 Month of Premium Support', tooltip: 'Priority support for any questions or issues you encounter' },
      ],
      testimonial: "This template made launching our new site incredibly easy and professional!",
      monthlyPurchaseLink: 'https://buy.stripe.com/14AeV51KU6zl6qN4Cpebu06',
      oneTimePurchaseLink: 'https://buy.stripe.com/6oUeV575ee1N02p8SFebu05'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Store',
      subtitle: 'Complete E-commerce Empire',
      monthlyPrice: 99.00, // Example monthly price
      lifetimePrice: 404.00, // Example lifetime price (10x monthly, with discount)
      originalMonthlyPrice: 150,
      originalLifetimePrice: 850,
      description: 'Build a profitable online store that converts browsers into buyers with advanced e-commerce features and marketing automation.',
      forType: 'E-commerce Powerhouse',
      bestFor: 'Product-based businesses and online retailers',
      deliveryTime: '15-30 business days',
      clientsSaved: 'Average 250% increase in online sales',
      guarantee: 'Sales improvement guarantee or money back',
      features: [
        { text: 'Complete E-commerce Foundation', tooltip: 'Professional store setup with product catalog and inventory management' },
        { text: 'Advanced Shopping Cart System', tooltip: 'Optimized checkout process with multiple payment options' },
        { text: 'Automated Email Marketing Suite', tooltip: 'Abandoned cart recovery and customer lifecycle emails' },
        { text: 'Professional Product Photography Setup', tooltip: 'Guidelines and tools for stunning product presentation' },
        { text: 'Inventory Management System', tooltip: 'Real-time stock tracking with low inventory alerts' },
        { text: 'Customer Account Portal', tooltip: 'Order history, wishlists, and personalized experience' },
        { text: 'Advanced Analytics & Reporting', tooltip: 'Sales tracking, customer behavior analysis, and performance metrics' },
        { text: 'Mobile-Optimized Shopping Experience', tooltip: 'Touch-friendly design optimized for mobile purchases' },
        { text: 'SEO-Optimized Product Pages', tooltip: 'Search engine optimization for better product visibility' },
        { text: 'Social Media Integration', tooltip: 'Instagram shopping, Facebook catalog, and social proof' },
      ],
      bonuses: [
        { text: 'FREE product photography guide', tooltip: 'Professional tips for creating stunning product images' },
        { text: 'Email marketing templates', tooltip: '20+ proven email templates for customer engagement' },
        { text: 'Conversion optimization audit', tooltip: 'Professional analysis and recommendations for better sales' },
        { text: 'Social media marketing strategy', tooltip: 'Complete plan for promoting your products online' },
      ],
      testimonial: "From zero to 5K USD monthly revenue in just 3 months!",
      monthlyPurchaseLink: 'https://buy.stripe.com/14AeV51KU6zl6qN4Cpebu06',
      oneTimePurchaseLink: 'https://buy.stripe.com/6oUeV575ee1N02p8SFebu05'
    },
  ];

  const getPlanIcon = (index: number) => {
    const icons = [Zap, Target, Crown, Rocket, BarChart3, Shield, Heart, Sparkles];
    const Icon = icons[index % icons.length];
    return <Icon size={24} />;
  };

  const getPlanGradient = (index: number, recommended?: boolean) => {
    if (recommended) return 'from-purple-600 via-pink-600 to-blue-600';
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500',
      'from-rose-500 to-pink-500'
    ];
    return gradients[index % gradients.length];
  };


  const handleCustomPackageClick = () => {
    alert('Custom package functionality would navigate to customization page');
  };

  const maxSlides = itemsPerPage > 0 ? Math.max(0, Math.ceil(pricingPlans.length / itemsPerPage) - 1) : 0;

  return (
    <>
      <section 
        ref={sectionRef}
        id="packages" 
        className="relative py-24 bg-gray-900 overflow-hidden"
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(59,130,246,0.10),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(16,185,129,0.08),transparent_50%)]" />
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-1 sm:px-6">
          {/* Enhanced Section Header */}
          <div className={`text-center mb-12 md:mb-20 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-white mb-8">
              <Award size={18} className="text-yellow-400 animate-pulse" />
              <span className="text-sm font-medium">Premium Development Packages</span>
              <Star size={16} className="text-yellow-400" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Transform Your Business
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Join over 500+ successful businesses who've increased their revenue by an average of 180% 
              with our proven development packages. Choose your success story today.
            </p>

            {/* Payment Type Switcher */}
            <div className="flex justify-center items-center mb-8 gap-4">
              <span className={`text-sm font-medium transition-colors ${paymentType === 'monthly' ? 'text-white' : 'text-white/50'}`}>Monthly</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentType === 'lifetime'}
                  onChange={(e) => setPaymentType(e.target.checked ? 'lifetime' : 'monthly')}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-500/50 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition peer-checked:bg-purple-600"></div>
              </label>
              <span className={`text-sm font-medium transition-colors ${paymentType === 'lifetime' ? 'text-white' : 'text-white/50'}`}>Lifetime</span>
            </div>
          </div>

          {/* Enhanced Pricing Cards Carousel */}
          <div className="relative w-full mx-auto">
            {/* Navigation Arrows */}
            <div className="absolute top-8 right-0 z-20 flex items-center space-x-2 pr-5 md:pr-10">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`p-2 md:p-4 backdrop-blur-md border rounded-full transition-all duration-300 shadow-lg flex items-center justify-center ${
                  currentIndex === 0
                    ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-110'
                }`}
                aria-label="Previous plans"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxSlides}
                className={`p-2 md:p-4 backdrop-blur-md border rounded-full transition-all duration-300 shadow-lg flex items-center justify-center ${
                  currentIndex >= maxSlides
                    ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-110'
                }`}
                aria-label="Next plans"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Carousel Container */}
            <div className="overflow-hidden py-10 md:py-20 md:px-5">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-700 ease-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / (itemsPerPage || 1))}%)`,
                }}
              >
                {pricingPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`flex-shrink-0 px-0 md:px-4 transform transition-all duration-700 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}
                    style={{ 
                      width: itemsPerPage > 0 ? `${100 / itemsPerPage}%` : '100%',
                      transitionDelay: `${(index % 3) * 100}ms` 
                    }}
                    onMouseEnter={() => setHoveredCard(plan.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Enhanced Card Container */}
                    <div className={`relative h-full rounded-2xl md:rounded-3xl backdrop-blur-md border transition-all duration-500 ${
                      plan.recommended
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/40 md:scale-105 shadow-2xl'
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
                    } ${hoveredCard === plan.id ? 'md:scale-105 shadow-2xl' : ''}`}>
                      
                      {/* Recommended Badge */}
                      {plan.recommended && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-bold shadow-lg animate-pulse">
                            <div className="flex items-center gap-2">
                              <Crown size={18} />
                              🔥 MOST POPULAR
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Floating Icon */}
                      <div className={`absolute -top-8 -right-18 w-16 h-16 rounded-full bg-gradient-to-br ${getPlanGradient(index, plan.recommended)} flex items-center justify-center text-white shadow-xl transform transition-all duration-500 ${
                        hoveredCard === plan.id ? 'scale-110 rotate-12' : ''
                      }`}>
                        {getPlanIcon(index)}
                      </div>

                      <div className="p-6">
                        {/* Enhanced Header */}
                        <div className="text-center mb-8">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.title}</h3>
                          <p className="text-purple-300 font-medium mb-4">{plan.subtitle}</p>
                          
                          {/* Price Display */}
                          <div className="mb-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              {paymentType === 'monthly' ? (
                                <>
                                  {plan.originalMonthlyPrice && (
                                    <span className="text-2xl text-white/50 line-through">{plan.originalMonthlyPrice}</span>
                                  )}
                                  <span className="text-4xl md:text-5xl font-bold text-white">{plan.monthlyPrice}</span>
                                  <span className="text-white/70 text-lg">USD</span>
                                </>
                              ) : (
                                <>
                                  {plan.originalLifetimePrice && (
                                    <span className="text-2xl text-white/50 line-through">{plan.originalLifetimePrice}</span>
                                  )}
                                  <span className="text-4xl md:text-5xl font-bold text-white">{plan.lifetimePrice}</span>
                                  <span className="text-white/70 text-lg">USD</span>
                                </>
                              )}
                            </div>
                            {paymentType === 'monthly' ? (
                              plan.originalMonthlyPrice && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm">
                                  <TrendingUp size={14} />
                                  Save {(plan.originalMonthlyPrice - plan.monthlyPrice).toFixed(2)} USD
                                </div>
                              )
                            ) : (
                              plan.originalLifetimePrice && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm">
                                  <TrendingUp size={14} />
                                  Save {(plan.originalLifetimePrice - plan.lifetimePrice).toFixed(2)} USD
                                </div>
                              )
                            )}
                          </div>

                          {/* Plan Info */}
                          <div className="space-y-2 mb-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm">
                              <Target size={14} />
                              {plan.forType}
                            </div>
                            <p className="text-white/70 text-sm">{plan.bestFor}</p>
                          </div>

                          <p className="text-white/80 leading-relaxed text-sm mb-4">{plan.description}</p>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                              <div className="text-white/60 text-xs">Delivery</div>
                              <div className="text-white text-sm font-semibold">{plan.deliveryTime}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                              <div className="text-white/60 text-xs">Results</div>
                              <div className="text-white text-sm font-semibold">{plan.clientsSaved}</div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Features */}
                        <div className="space-y-3 mb-6">
                          <div className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                            <Check size={16} className="text-green-400" />
                            What's Included:
                          </div>
                          {plan.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className={`flex items-start gap-3 transform transition-all duration-300 ${
                                hoveredCard === plan.id ? 'translate-x-1' : ''
                              }`}
                              style={{ transitionDelay: `${featureIndex * 50}ms` }}
                              onMouseEnter={(e) => handleMouseEnter(e, feature.tooltip)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${getPlanGradient(index, plan.recommended)} flex items-center justify-center mt-0.5`}>
                                <Check size={12} className="text-white" />
                              </div>
                              <div className="flex items-center gap-2 flex-1">
                                <span className="text-white/90 leading-relaxed text-sm">{feature.text}</span>
                                {feature.tooltip.trim() && (
                                  <Info size={12} className="text-white/40 cursor-help hover:text-white/70 transition-colors" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bonus Features */}
                        {plan.bonuses && plan.bonuses.length > 0 && (
                          <div className="space-y-3 mb-6">
                            <div className="text-yellow-400 font-semibold text-sm mb-3 flex items-center gap-2">
                              <Sparkles size={16} className="animate-pulse" />
                              FREE Bonuses Worth 50+ USD:
                            </div>
                            {plan.bonuses.map((bonus, bonusIndex) => (
                              <div
                                key={bonusIndex}
                                className={`flex items-start gap-3 transform transition-all duration-300 ${
                                  hoveredCard === plan.id ? 'translate-x-1' : ''
                                }`}
                                style={{ transitionDelay: `${(plan.features.length + bonusIndex) * 50}ms` }}
                                onMouseEnter={(e) => handleMouseEnter(e, bonus.tooltip)}
                                onMouseLeave={handleMouseLeave}
                              >
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mt-0.5">
                                  <Sparkles size={10} className="text-white" />
                                </div>
                                <div className="flex items-center gap-2 flex-1">
                                  <span className="text-yellow-100/90 leading-relaxed text-sm">{bonus.text}</span>
                                  {bonus.tooltip.trim() && (
                                    <Info size={12} className="text-yellow-300/40 cursor-help hover:text-yellow-300/70 transition-colors" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Guarantee */}
                        <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-3 mb-6">
                          <div className="flex items-center gap-2 text-green-300 text-sm">
                            <Shield size={14} />
                            <span className="font-semibold">{plan.guarantee}</span>
                          </div>
                        </div>

                        {/* Testimonial */}
                        {plan.testimonial && (
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                            <div className="text-white/80 text-sm italic mb-2">"{plan.testimonial}"</div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className="text-yellow-400 fill-current" />
                              ))}
                              <span className="text-white/60 text-xs ml-2">Verified Client</span>
                            </div>
                          </div>
                        )}

                        {/* Enhanced CTA Button */}
                        <button
                          onClick={() => {
                              if (paymentType === 'monthly' && plan.monthlyPurchaseLink) {
                                  window.open(plan.monthlyPurchaseLink, '_blank');
                              } else if (paymentType === 'lifetime' && plan.oneTimePurchaseLink) {
                                  window.open(plan.oneTimePurchaseLink, '_blank');
                              } else {
                                  alert('Please select a payment type or contact support.');
                              }
                          }}
                          className={`w-full group relative px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden inline-flex items-center justify-center text-base md:text-lg ${
                            plan.recommended
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400'
                          } hover:scale-105 hover:shadow-2xl transform`}
                        >
                          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                          <div className="relative flex items-center justify-center gap-2">
                            <span>Get Started Now</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </button>

                        {/* Urgency Element */}
                        <div className="text-center mt-4">
                          <div className="text-white/60 text-xs">
                            🔥 Limited Time: Save up to 40% 
                          </div>
                          <div className="text-purple-300 text-xs font-semibold">
                            Only 3 spots left this month!
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getPlanGradient(index, plan.recommended)} opacity-0 transition-opacity duration-500 -z-10 blur-xl ${
                        hoveredCard === plan.id ? 'opacity-30' : ''
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Carousel Indicators */}
            <div className="flex justify-center mt-12 gap-3">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-8 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full' 
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50 rounded-full'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-white/60 hover:text-white/80 text-sm flex items-center gap-2 transition-colors"
              >
                {isAutoPlaying ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Auto-playing
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-white/40 rounded-full" />
                    Paused
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Bottom CTA Section */}
          <div className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl p-6 md:p-12 backdrop-blur-md">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Need Something Different?
                </h3>
                <p className="text-white/70 mb-8 text-base md:text-lg leading-relaxed">
                  Every business is unique. Let's create a custom package that perfectly fits your specific needs, 
                  timeline, and budget. Our experts will analyze your requirements and design a solution just for you.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={24} className="text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Free Consultation</h4>
                    <p className="text-white/60 text-sm">30-minute strategy session to understand your goals</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target size={24} className="text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Custom Proposal</h4>
                    <p className="text-white/60 text-sm">Tailored solution with transparent pricing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket size={24} className="text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Rapid Delivery</h4>
                    <p className="text-white/60 text-sm">Fast implementation with premium quality</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                                      href="/contact"
                                      className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center"
                                    >
                                      <div className="flex items-center gap-3">
                                        <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                        <span>Create Custom Package</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                      </div>
                                    </a>
                  
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock size={16} />
                    <span>Response within 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-1200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>500+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={20} />
                <span>Morocco's #1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tooltip Portal */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="px-4 py-3 bg-gray-900/95 text-white text-sm rounded-xl shadow-2xl max-w-xs backdrop-blur-md border border-white/20 animate-in fade-in-0 zoom-in-95 duration-200">
            {tooltip.text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </>
  );
};

export default DevPlans;