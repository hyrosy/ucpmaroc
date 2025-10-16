import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight, Sparkles, Info, Crown, Zap, TrendingUp } from 'lucide-react';

interface PricingPlan {
  id: string;
  title: string;
  price: number;
  description: string;
  features: { text: string; tooltip: string }[];
  recommended?: boolean;
  forType: string;
}

const PricingSection: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, tooltipText: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      text: tooltipText,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
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

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter-growth',
      title: 'Starter Growth',
      price: 199,
      description: 'Ignite your online presence with foundational AI marketing.',
      forType: 'Small Businesses & Startups',
      features: [
        { text: 'AI Social Media Management', tooltip: 'Automated content scheduling, ad optimization, and community engagement across platforms.' },
        { text: 'Web Page Development', tooltip: 'Creation of a professional, mobile-responsive web page.' },
        { text: 'Domain & 1 Year Hosting', tooltip: 'Includes a complimentary domain name and one year of hosting.' },
        { text: 'Weekly 1-on-1 Support', tooltip: 'Dedicated weekly live support sessions via Zoom.' },
        { text: 'Marketing Funnel & Email Automation', tooltip: 'Setup of a high-converting marketing funnel with automated email sequences.' },
        { text: 'Essential On-Page SEO', tooltip: 'Basic search engine optimization including Google Search Console and Google My Business setup.' },
        { text: 'AI Chat Integration', tooltip: 'Integration of an intelligent AI chat for instant customer support.' },
      ],
    },
    {
      id: 'pro-accelerator',
      title: 'Pro Accelerator',
      price: 399,
      description: 'Accelerate growth with advanced AI strategies.',
      forType: 'Growing Businesses',
      recommended: true,
      features: [
        { text: 'Advanced AI Social Media', tooltip: 'Targeted campaigns, performance analytics, and viral growth tactics powered by AI.' },
        { text: 'Enhanced Web Development & Optimization', tooltip: 'Development of an optimized website with a focus on performance and user experience.' },
        { text: 'Domain & 1 Year Hosting', tooltip: 'Includes a complimentary domain name and one year of hosting.' },
        { text: 'Weekly 1-on-1 Support', tooltip: 'Dedicated weekly live support sessions via Zoom.' },
        { text: 'Multiple Funnels & Advanced Automation', tooltip: 'Creation of multiple high-converting marketing funnels with advanced automation.' },
        { text: 'Comprehensive SEO', tooltip: 'In-depth SEO including site audits, speed optimization, and schema markup.' },
        { text: 'AI Chat with Lead Qualification', tooltip: 'Intelligent AI chat integrated with lead qualification capabilities.' },
        { text: 'Monthly Performance Analytics', tooltip: 'Detailed monthly reports on marketing performance and key metrics.' },
      ],
    },
    {
      id: 'elite-dominator',
      title: 'Elite Dominator',
      price: 599,
      description: 'Dominate your market with elite AI performance.',
      forType: 'Established Businesses',
      features: [
        { text: 'Elite AI Social Media Domination', tooltip: 'Cutting-edge AI strategies for social media, including influencer collaborations and brand reputation management.' },
        { text: 'Premium Website & CRO', tooltip: 'Development of a premium website with a focus on conversion rate optimization.' },
        { text: 'Domain & 1 Year Hosting', tooltip: 'Includes a complimentary domain name and one year of hosting.' },
        { text: 'Priority Weekly 1-on-1 Support', tooltip: 'Prioritized weekly live support sessions via Zoom.' },
        { text: 'Unlimited Funnels & Bespoke Automation', tooltip: 'Creation of unlimited marketing funnels with bespoke automation tailored to your business.' },
        { text: 'Full-Spectrum SEO Mastery', tooltip: 'Comprehensive SEO covering local, technical, on-page, off-page, and continuous monitoring.' },
        { text: 'Advanced AI Chat with CRM Integration', tooltip: 'Advanced AI chat integrated with your CRM for seamless lead and customer management.' },
        { text: 'Weekly Analytics & Consulting', tooltip: 'In-depth weekly performance analytics and strategic consulting.' },
        { text: 'Dedicated Account Manager', tooltip: 'A dedicated account manager for personalized support and strategy.' },
        { text: 'Custom AI Model Training', tooltip: 'Training of a custom AI model specifically for your niche marketing needs.' },
      ],
    },
  ];

  const getPlanIcon = (index: number) => {
    const icons = [Zap, TrendingUp, Crown];
    const Icon = icons[index];
    return <Icon size={24} />;
  };

  const getPlanGradient = (index: number, recommended?: boolean) => {
    if (recommended) return 'from-purple-600 via-pink-600 to-blue-600';
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500'
    ];
    return gradients[index];
  };

  return (
    <>
      <section 
        ref={sectionRef}
        id="packages" 
        className="relative py-24 bg-gray-900 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(59,130,246,0.08),transparent_50%)]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          {/* Section Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/90 mb-6">
              <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              <span className="text-sm font-medium">Pricing Plans</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Choose Your 
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI-Powered Marketing
              </span>
              Package
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Select the perfect package for your business needs or customize your own solution with our interactive package builder.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative group transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <div className={`relative h-full rounded-3xl backdrop-blur-md border transition-all duration-500 ${
                  plan.recommended 
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30 scale-105' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                } ${hoveredCard === plan.id ? 'scale-105 shadow-2xl' : ''}`}>
                  
                  {/* Recommended Badge */}
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-semibold shadow-lg">
                        <div className="flex items-center gap-2">
                          <Crown size={16} />
                          Most Popular
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Floating Icon */}
                  <div className={`absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br ${getPlanGradient(index, plan.recommended)} flex items-center justify-center text-white shadow-lg transform transition-all duration-500 ${
                    hoveredCard === plan.id ? 'scale-110 rotate-12' : ''
                  }`}>
                    {getPlanIcon(index)}
                  </div>

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                      {/*<div className="mb-4">
                        <span className="text-5xl font-bold text-white">${plan.price}</span>
                        <span className="text-white/60 ml-2">/month</span>
                      </div>*/}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-3">
                        For {plan.forType}
                      </div>
                      <p className="text-white/70 leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
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
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${getPlanGradient(index, plan.recommended)} flex items-center justify-center mt-1`}>
                            <Check size={12} className="text-white" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-white/90 leading-relaxed">{feature.text}</span>
                            <Info size={14} className="text-white/50 cursor-help hover:text-white/80 transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a href="/contact" className={`w-full group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden inline-flex items-center justify-center ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400'
                    } hover:scale-105 hover:shadow-xl`}>
                      <div className="relative flex items-center justify-center gap-2">
                        <span>Get Started</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getPlanGradient(index, plan.recommended)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`} />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-white/70 mb-6 text-lg">
              Need a custom solution?
            </p>
            <a href="/customized-package" className="group px-8 py-4 backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-105 inline-flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Customized A Package</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Tooltip Portal */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg max-w-xs backdrop-blur-md border border-white/20">
            {tooltip.text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </>
  );
};

export default PricingSection;