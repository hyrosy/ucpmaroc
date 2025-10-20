import React from 'react';
import { Code, Search, Users, Camera, TrendingUp, BarChart3, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Data (Moved outside component for clarity) ---

const services = [
  {
    title: "Web Development",
    description: "Stunning, high-converting websites optimized for lead generation and sales.",
    icon: Code,
    link: "/software-development"
  },
  {
    title: "Google Ads",
    description: "Targeted campaigns that drive qualified traffic with AI-optimized bidding.",
    icon: Search,
    link: "/digital-marketing"
  },
  {
    title: "Facebook Ads",
    description: "Strategic campaigns that reach your ideal customers with compelling creatives.",
    icon: Users,
    link: "/digital-marketing"
  },
  {
    title: "Instagram Ads",
    description: "Visually stunning campaigns that boost engagement, followers, and conversions.",
    icon: Camera,
    link: "/digital-marketing"
  },
  {
    title: "TikTok Ads",
    description: "Trending ads that capture attention and drive engagement on the fastest-growing platform.",
    icon: TrendingUp,
    link: "/digital-marketing"
  },
  {
    title: "Analytics & Optimization",
    description: "Comprehensive analytics and continuous optimization to ensure maximum ROI.",
    icon: BarChart3,
    link: "/digital-marketing"
  }
];

// --- Reusable Sub-component for Service Cards ---

const ServiceCard = ({ title, description, icon: Icon, link }: { title: string, description: string, icon: React.ElementType, link: string }) => (
    <Link to={link} className="block group h-full">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 h-full hover:border-purple-500/50 hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    </Link>
);


// --- Main Section Component ---

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-4">
                    AI-Powered Digital<br />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Marketing Solutions
                    </span>
                </h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    We leverage cutting-edge artificial intelligence to create automated solutions that deliver exceptional results for businesses of all sizes.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                        icon={service.icon}
                        link={service.link}
                    />
                ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
                <Link to="/contact" className="inline-block">
                    <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                        <Star className="w-5 h-5" />
                        Start Your Campaign
                    </button>
                </Link>
                <p className="text-slate-500 text-sm mt-4">
                    Free consultation • Custom strategy • Guaranteed results
                </p>
            </div>
        </div>
    </section>
  );
};

export default Services;
