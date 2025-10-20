import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Users,
  BarChart3,
  Target,
  Eye,
  Heart,
  Share2,
  Globe,
  Smartphone,
  Monitor,
  LucideIcon,
  Award,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  TrendingDown,
  Volume2,
  VolumeX,
  MessageSquare,
  ShoppingCart,
  Play
} from 'lucide-react';

// --- Data (Kept in the same file) ---

type ServiceTab = 'social' | 'seo';

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
  { name: 'Google Ads', icon: Search, color: 'from-blue-600 to-blue-800', desc: 'Search & Display' },
  { name: 'Facebook Ads', icon: Users, color: 'from-blue-500 to-indigo-600', desc: 'Social Advertising' },
  { name: 'TikTok Ads', icon: Smartphone, color: 'from-pink-500 to-red-500', desc: 'Short-Form Video' },
  { name: 'Microsoft Ads', icon: Monitor, color: 'from-cyan-500 to-blue-500', desc: 'Bing Network' },
  { name: 'Taboola', icon: Target, color: 'from-orange-500 to-red-500', desc: 'Native Advertising' },
  { name: 'Outbrain', icon: Globe, color: 'from-purple-500 to-indigo-500', desc: 'Content Discovery' },
  { name: 'LinkedIn Ads', icon: Users, color: 'from-sky-500 to-blue-600', desc: 'B2B Professional Network'},
  { name: 'Twitter Ads', icon: MessageSquare, color: 'from-cyan-400 to-blue-500', desc: 'Real-time Engagement'},
  { name: 'Pinterest Ads', icon: Heart, color: 'from-red-500 to-pink-600', desc: 'Visual Discovery'},
  { name: 'Google Shopping', icon: ShoppingCart, color: 'from-green-500 to-teal-600', desc: 'E-commerce Sales'},
  { name: 'YouTube Ads', icon: Play, color: 'from-red-600 to-red-800', desc: 'Video Advertising'}
];

const caseStudies = [
    {
      id: 1,
      title: "E-commerce Fashion Brand",
      industry: "Retail",
      challenge: "Low online visibility and poor conversion rates, struggling to stand out in a saturated market.",
      solution: "A comprehensive SEO audit and overhaul, combined with targeted Google and Facebook ad campaigns to drive qualified traffic.",
      results: {
        traffic: "+450%",
        revenue: "+320%",
        roas: "8.5x",
        timeline: "6 months"
      },
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "SaaS Startup",
      industry: "Technology",
      challenge: "High customer acquisition costs (CAC) and low brand awareness in a competitive B2B landscape.",
      solution: "A multi-platform paid strategy focusing on LinkedIn for lead generation, supplemented with high-value content marketing for SEO.",
      results: {
        traffic: "+280%",
        revenue: "+190%",
        roas: "6.2x",
        timeline: "4 months"
      },
      gradient: "from-blue-600 to-indigo-600"
    },
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
  icon: LucideIcon;
}

type ServicesType = {
  [key in ServiceTab]: ServiceEntry;
};

const services: ServicesType = {
    social: {
      title: 'Social Media Marketing',
      subtitle: 'Amplify Your Brand Across Platforms',
      description: 'Create viral content, build engaged communities, and drive meaningful connections with your audience.',
      longDescription: 'Our social media services go beyond posting. We create comprehensive strategies, develop compelling content, and use advanced analytics to optimize performance across all major platforms.',
      features: [
        'Content Strategy & Creation', 'Community Management', 'Influencer Partnerships',
        'Analytics & Reporting', 'Paid Social Advertising', 'Brand Voice Development',
        'UGC Campaigns', 'Social Commerce Integration'
      ],
      platforms: ['Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'LinkedIn Ads', 'Twitter Ads', 'Pinterest Ads'],
      stats: socialMediaStats,
      gradient: 'from-purple-600 via-pink-600 to-red-600',
      icon: Users
    },
    seo: {
      title: 'SEO & Paid Advertising',
      subtitle: 'Dominate Search & Drive Targeted Traffic',
      description: 'Boost visibility, outrank competitors, and attract high-quality traffic through advanced SEO and strategic paid campaigns.',
      longDescription: 'Our approach combines organic SEO with paid advertising. We optimize your website for search engines while running targeted ad campaigns that deliver immediate results and long-term growth.',
      features: [
        'Keyword Research & Strategy', 'Technical SEO Audits', 'Content Optimization',
        'Link Building Campaigns', 'Local SEO Management', 'Performance Tracking',
        'Conversion Rate Optimization', 'Multi-Platform Ad Management'
      ],
      platforms: ['Google Ads', 'Microsoft Ads', 'Taboola', 'Outbrain', 'Google Shopping', 'YouTube Ads'],
      stats: seoStats,
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      icon: Search
    }
};

// --- Reusable Sub-components ---

const StatCard = ({ icon: Icon, value, label, color }: { icon: LucideIcon, value: string, label: string, color: string }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors duration-300">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
);

const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
        <span className="text-slate-300">{text}</span>
    </div>
);

const PlatformItem = ({ name, icon: Icon, color, desc }: { name: string, icon: LucideIcon, color: string, desc: string }) => (
    <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
            <div className="text-white font-semibold">{name}</div>
            <div className="text-slate-400 text-sm">{desc}</div>
        </div>
    </div>
);

// --- Main Page Component ---

const MarketingServices = () => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('social');
  const [currentCase, setCurrentCase] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const currentService = services[activeTab];

  const nextCase = () => setCurrentCase(prev => (prev + 1) % caseStudies.length);
  const prevCase = () => setCurrentCase(prev => (prev - 1 + caseStudies.length) % caseStudies.length);

  return (
    <div className="bg-slate-900 text-white">
        {/* --- Hero Section --- */}
        <header className="relative h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <iframe
                    className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    src={`https://www.youtube.com/embed/aSk-D86aOtc?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=aSk-D86aOtc&controls=0&showinfo=0&rel=0`}
                    allow="autoplay; encrypted-media"
                ></iframe>
            </div>
            <div className="absolute inset-0 bg-black/70"></div>
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-8 right-8 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition"
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                <div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">
                        <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Transform Your</span><br/>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Digital Presence</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
                        Elevate your brand with cutting-edge marketing strategies that deliver measurable results and sustainable growth.
                    </p>
                    <a href="/contact" className="inline-block">
                        <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                            Start Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </a>
                </div>
            </div>
        </header>

        {/* --- Main Content Body --- */}
        <div className="py-20 px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Service Toggle Section */}
            <section className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Core Services</h2>
                <div className="inline-block bg-slate-800 p-2 rounded-full border border-slate-700">
                    <div className="flex gap-2">
                        {(Object.keys(services) as ServiceTab[]).map(key => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${activeTab === key ? 'bg-white text-slate-900 shadow-md' : 'text-slate-300 hover:bg-slate-700'}`}
                            >
                                {services[key].title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Details Section */}
            <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${currentService.gradient} flex items-center justify-center mb-6`}>
                        <currentService.icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{currentService.title}</h2>
                    <p className="text-lg text-purple-300 font-semibold mb-6">{currentService.subtitle}</p>
                    <p className="text-slate-400 leading-relaxed mb-8">{currentService.longDescription}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentService.features.map((feature) => <FeatureItem key={feature} text={feature} />)}
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        {currentService.stats.map((stat, i) => <StatCard key={i} {...stat} />)}
                    </div>
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-6">Platforms We Use</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentService.platforms.map((platformName) => {
                                const pData = adPlatforms.find(p => p.name === platformName) || adPlatforms[0];
                                return <PlatformItem key={pData.name} {...pData} />
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Success Stories</h2>
                    <p className="text-lg text-slate-400">Real results from real businesses</p>
                </div>
                <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${caseStudies[currentCase].gradient} flex items-center justify-center flex-shrink-0`}>
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{caseStudies[currentCase].title}</h3>
                                    <p className="text-purple-300 font-semibold">{caseStudies[currentCase].industry}</p>
                                </div>
                            </div>
                            <p className="text-slate-400 mb-4">{caseStudies[currentCase].challenge}</p>
                            <p className="text-slate-300">{caseStudies[currentCase].solution}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(caseStudies[currentCase].results).map(([key, value]) => (
                                <div key={key} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                                    <p className="text-2xl font-bold text-white">{value}</p>
                                    <p className="text-sm text-slate-400 capitalize">{key.replace(/_/g, ' ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <button onClick={prevCase} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition"><ChevronLeft className="w-5 h-5" /></button>
                        <div className="flex gap-2">
                            {caseStudies.map((_, index) => (
                                <button key={index} onClick={() => setCurrentCase(index)} className={`w-2 h-2 rounded-full transition ${currentCase === index ? 'bg-purple-400' : 'bg-slate-600'}`} />
                            ))}
                        </div>
                        <button onClick={nextCase} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
};

export default MarketingServices;

