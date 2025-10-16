import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Sparkles,
  Rocket,
  Shield,
  BarChart,
  Cpu,
  ExternalLink,
  Github,
  Eye,
  X
} from 'lucide-react';
import DevPlans from '../components/DevPlans'

// Particle Component
interface ParticleProps {
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const Particle = ({ delay, duration, size, opacity }: ParticleProps) => (
  <div
    className="absolute rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: opacity,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

// Floating Particle System
const ParticleSystem = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 4,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={particle.delay}
          duration={particle.duration}
          size={particle.size}
          opacity={particle.opacity}
        />
      ))}
    </div>
  );
};

const SoftwareServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    tech: string[];
    description: string;
    height: 'tall' | 'medium' | 'short';
  }
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies",
      features: ["React & Next.js", "TypeScript", "Tailwind CSS", "Performance Optimized"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Cross-platform mobile apps that deliver exceptional user experiences",
      features: ["React Native", "Flutter", "iOS & Android", "Native Performance"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend & API",
      description: "Scalable backend solutions and robust API architectures",
      features: ["Node.js", "Python", "PostgreSQL", "RESTful APIs"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Solutions",
      description: "Cloud-native applications and DevOps automation",
      features: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "150+", label: "Projects Delivered", icon: <Rocket className="w-6 h-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "5+", label: "Years Experience", icon: <BarChart className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Shield className="w-6 h-6" /> }
  ];

const portfolioProjects: Project[] = [
    {
      id: 1,
      title: "Crypto Coin Launcher LP",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/1.png",
      tech: ["React", "Node.js", "PostgreSQL", "n8n"],
      description: "Engaging landing page designed to promote and drive participation in cryptocurrency launch events, featuring a creative and modern aesthetic.",
      height: "tall"
    },
    {
      id: 2,
      title: "Marrakesh Lawyer",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/2.png",
      tech: ["WordPress", "Woocommerce","Elementor Pro", "Custom Pay" ],
      description: "Professional website for a Marrakesh-based lawyer, offering a seamless online booking system for pre-paid legal consultations.",
      height: "medium"
    },
    {
      id: 3,
      title: "Sports Bidding Platform",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/3.png",
      tech: ["React", "Python", "TensorFlow", "Supabase"],
      description: "TheRing is an innovative sports bidding platform, tailored for the Asian market, that facilitates transactions using cryptocurrency.",
      height: "short"
    },
    {
      id: 4,
      title: "The Black Bread",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/4.png",
      tech: ["WordPress", "Woocommerce", "Astra", "VitePOS", "YaostSEO"],
      description: "A contemporary WordPress restaurant website, integrated via API with VitePOS for streamlined operations and online ordering.",
      height: "tall"
    },
    {
      id: 5,
      title: "Health & Beauty App",
      category: "Mobile Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/5.png",
      tech: ["Flutter", "Firebase", "GraphQL"],
      description: "Lé is a dedicated mobile application focused on women's beauty and health products, specifically targeting the UK market.",
      height: "short"
    },
    {
      id: 6,
      title: "Luzurio Rent LLC",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/6.png",
      tech: ["Next.js", "Stripe", "MongoDB"],
      description: "Luzurio Rent LLC offers a premium car rental service in South Africa, providing luxurious vehicles on a daily rate basis.",
      height: "medium"
    },
    {
      id: 7,
      title: "IBIZA Hotel",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/7.png",
      tech: ["React", "ViteJS", "Google Maps API", "Paypal API", "Stripe API"],
      description: "An interactive hotel web application featuring a real-time booking system and integrated online payment gateways for seamless reservations.",
      height: "short"
    },
    {
      id: 8,
      title: "Luxury Hotel: The CAPPA",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/8.png",
      tech: ["WordPress", "Redis", "WebSockets"],
      description: "A sophisticated hotel website showcasing a luxurious UI/UX design, enabling users to easily make appointments and reservations.",
      height: "medium"
    },
    {
      id: 9,
      title: "Agafay Excursion",
      category: "Web Development",
      image: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/portdevolio/Modern+Digital+Product+Mockup+Pinterest+Pin.png",
      tech: ["WordPress", "Woocommerce", "Elementor Pro"],
      description: "An immersive tour website built for an Agafay Desert activity agency, featuring dynamic booking options for quad and camel rides, buggy experiences, pool day passes, and dinner shows. Designed with Elementor Pro to ensure a mobile-friendly, conversion-focused layout with seamless user experience.",
      height: "medium"
    }
  ];

// Helper function to determine project card height class
const getProjectHeight = (height: 'tall' | 'medium' | 'short'): string => {
  switch (height) {
    case 'tall':
      return 'h-196'; // Example height for tall cards
    case 'medium':
      return 'h-196'; // Example height for medium cards
    case 'short':
      return 'h-196'; // Example height for short cards
    default:
      return 'h-196'; // Default to medium
  }
};

// Sample technologies data
const technologies = [
  "React", "Next.js", "Node.js", "Express.js", "TypeScript", "JavaScript",
  "Python", "Django", "Flask", "SQL", "PostgreSQL", "MongoDB",
  "AWS", "Docker", "Kubernetes", "CI/CD", "Git", "REST APIs", "GraphQL",
  "Stripe", "Google Analytics", "Facebook Pixel", "CRM", "SEO"
];

  const categories = ["All", "Web Development", "Mobile Development", "Backend", "DevOps"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Particle System */}
        <ParticleSystem />
        
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full border border-purple-500/30 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm font-medium">Premium Development Services</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Crafting Digital
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into powerful digital solutions with our cutting-edge development services. 
              We build scalable, performant applications that drive business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
<a href="/contact">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Your Project
                <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
             
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      

      {/* Services Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive development solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeService === index ? 'bg-gradient-to-br from-purple-600/20 to-cyan-600/20' : 'bg-white/5'
                }`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/5 group-hover:to-cyan-600/5 rounded-2xl transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

   

      {/* Technologies Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Technologies We Master
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cutting-edge tools and frameworks for modern development
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group px-6 py-3 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
              >
                <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Portfolio Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcasing our successful projects and the impact we've made
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`break-inside-avoid rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${getProjectHeight(project.height)}`}
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="p-4 bg-gradient-to-br from-slate-800/80 to-purple-900/80 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{project.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-gradient-to-br from-slate-800 to-purple-900/80 p-8 rounded-2xl max-w-3xl w-full relative shadow-2xl border border-purple-500/30 transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 flex flex-col">
                <h2 className="text-3xl font-bold mb-2 text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{selectedProject.title}</h2>
                <p className="text-lg text-purple-300 mb-4">{selectedProject.category}</p>
                <p className="text-gray-300 mb-6 flex-grow">{selectedProject.description}</p>
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  
                  <Link to="/contact">
                    <button className="flex items-center px-4 py-2 bg-green-700/50 rounded-full hover:bg-green-700 transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Request a similar design
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <DevPlans/>

    </div>
  );
};

// Add CSS for the fadeInUp animation
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default SoftwareServicesPage;