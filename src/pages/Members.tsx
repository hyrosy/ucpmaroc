import React, { useState } from 'react';
import TalentsSection from '../components/TalentsSection.tsx'
import { 
  Users, 
  MapPin, 
  Star, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Github, 
  ExternalLink,
  Award,
  Briefcase
} from 'lucide-react';

// Type definitions
type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'github';

interface Member {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  experience: string;
  projects: string;
  social: Partial<Record<SocialPlatform, string>>;
}

const MembersPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Sample member data - replace with your actual team data
  const members: Member[] = [
    {
      id: 1,
      name: 'Hamza EA',
      role: 'CEO & Co-Founder',
      specialty: 'Leadership, Strategy, Innovation',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/DSCF5573.JPG',
      bio: 'A dedicated CEO & Co-Founder with expertise in Leadership and Strategy. Key achievements include: Founded 3 successful startups.',
      experience: 'Varies',
      projects: '+32 ',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 2,
      name: 'Ahmedtaha Abarrahou',
      role: 'Fullstack developer',
      specialty: 'Full-Stack Dev, Networking, System Administration',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/496768521_18073677304893125_968731744148343907_n.jpg',
      bio: 'A dedicated Fullstack developer with expertise in Full-Stack Dev and Networking. Key achievements include: Managed secure server infrastructures.',
      experience: 'Varies',
      projects: '21',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 3,
      name: 'Nabil El Bachiri',
      role: 'Property Manager',
      specialty: 'Tenant Relations, Property Maintenance, Booking Management',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/503314148_18274044961282089_7110481306095049342_n.jpg',
      bio: 'A dedicated Property Manager with expertise in Tenant Relations and Property Maintenance. Key achievements include: Managed multi-site properties.',
      experience: 'Varies',
      projects: '14',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 4,
      name: 'Mariam Mouzoul',
      role: 'Visual ART Director',
      specialty: 'ART Direction, AI Graphics & VFX, Motion & Video',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/471996946_625250583496182_117283758802591691_n.jpg',
      bio: 'A dedicated Visual ART Director with expertise in ART Direction and AI Graphics & VFX. Key achievements include: Directed brand visuals for major campaigns.',
      experience: 'Varies',
      projects: '12',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 5,
      name: 'Jebri strawhat',
      role: 'Cinematographer',
      specialty: 'Video Editing, Post-Production, Motion Graphics',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/457507784_500820326017618_7102724725175186626_n.jpg',
      bio: 'A dedicated Cinematographer with expertise in Video Editing and Post-Production. Key achievements include: Edited 100+ videos for brands and creators.',
      experience: 'Varies',
      projects: '18',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 6,
      name: 'Abderrazak Trajja',
      role: 'Voice Over',
      specialty: 'Voice Acting, Audio Editing, Script Interpretation',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/488085357_1017235940348722_2197642891228150759_n.jpg',
      bio: 'A dedicated Voice Over with expertise in Voice Acting and Audio Editing. Key achievements include: Recorded 200+ voiceovers for ads and videos.',
      experience: 'Varies',
      projects: '+40',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 7,
      name: 'Patrick Simbaya',
      role: 'Front-End Developer',
      specialty: 'WordPress, UI/UX, Social Media',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/495801964_17949411053964094_6402716471549929582_n.jpg',
      bio: 'A dedicated Front-End Developer with expertise in WordPress and UI/UX. Key achievements include: Managed ad budgets exceeding $10K.',
      experience: 'Varies',
      projects: '41',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 8,
      name: 'Ayoub Sbaihi',
      role: 'Voice Over',
      specialty: 'Narration, Dubbing, Studio Recording',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/501451766_18016166447717339_1194100904261373844_n.jpg',
      bio: 'A dedicated Voice Over with expertise in Narration and Dubbing. Key achievements include: Voiced content for 50+ brands and media outlets.',
      experience: 'Varies',
      projects: '52',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 9,
      name: 'Nustapha Nassoh',
      role: 'Operations Manager',
      specialty: 'Photography, Photo Editing, Lighting Techniques',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/502749732_18462993526073959_2326641292068939243_n.jpg',
      bio: 'A dedicated Operations Manager with expertise in Photography and Photo Editing. Key achievements include: Captured 10K+ professional photos.',
      experience: 'Varies',
      projects: '14',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
        github: '#',
      },
    },
    {
      id: 11,
      name: 'Hasnae Chaibi',
      role: 'SEO Expert',
      specialty: 'SEO (Search Engine Optimization), Web writing',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'A talented professional specializing in SEO and web writing with extensive experience.',
      experience: '5 Years +',
      projects: 'Varies',
      social: {
        linkedin: 'https://linkedin.com/in/hasnaechaibi',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 12,
      name: 'Youness ait laasri',
      role: 'Web Designer',
      specialty: 'Web Designer, UI-UX, Graphic Design, Video Editor',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'A creative talent skilled in Web Design, UI-UX, Graphic Design, and Video Editing.',
      experience: 'Between 1 to 2 Years',
      projects: 'Varies',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: 'https://www.instagram.com/ait_laasri_youness',
      },
    },
    {
      id: 13,
      name: 'Larbi baazza',
      role: 'MEDIA BUYER',
      specialty: 'Media Buying, Email Marketing, Sales',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'A skilled talent in Media Buying, Email Marketing, and Sales, driving innovative projects.',
      experience: 'Between 1 to 2 Years',
      projects: 'Varies',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: 'https://www.instagram.com/Larbi_baazza',
      },
    },
    {
      id: 14,
      name: 'TALGOUZ YASSINE',
      role: 'SEO Expert',
      specialty: 'SEO (Search Engine Optimization)',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'An expert in SEO and e-visibility, working as a freelancer to enhance online presence.',
      experience: '5 Years +',
      projects: 'Varies',
      social: {
        linkedin: 'https://www.linkedin.com/in/yassine-talgouz',
        twitter: '#',
        instagram: 'https://www.instagram.com/Yassine.talgouz',
      },
    },
    {
      id: 15,
      name: 'El Houcine Amhar',
      role: 'Web Designer',
      specialty: 'Web Development (WordPress, Shopify, Framer, Webflow), Web & UI/UX Design, Graphic Design, Video Editor',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'An agency member proficient in various web development platforms, UI/UX design, and video editing.',
      experience: '5 Years +',
      projects: 'Varies',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: 'https://www.instagram.com/keshida__/',
      },
    },
    {
      id: 16,
      name: 'Errachidy othmane',
      role: 'Email Marketing',
      specialty: 'Email Marketing, Video Editor, Voice Over',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'A versatile talent with skills in Email Marketing, Video Editing, and Voice Over.',
      experience: 'Between 2 to 3 Years',
      projects: 'Varies',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: 'https://www.instagram.com/@otman_errachidii',
      },
    },
    {
      id: 17,
      name: 'Youness C',
      role: 'Web Developer',
      specialty: 'Web Development, Media Buying, SEO, SMS Marketing, Email Marketing, Project Management, Sales',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'An agency member with a broad range of skills in web development, digital marketing, and project management.',
      experience: 'Between 1 to 2 Years',
      projects: 'Varies',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#',
      },
    },
    {
      id: 18,
      name: 'El Hassan SEMLALI',
      role: 'Web Developer',
      specialty: 'Full-Stack Development, 2D & 3D Modeling',
      image: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png',
      bio: 'A talented professional in Full-Stack Development and 2D & 3D Modeling.',
      experience: 'Between 1 to 2 Years',
      projects: 'Varies',
      social: {
        linkedin: 'https://linkedin.com/in/el-hassan-semlali/',
        twitter: '#',
        instagram: 'https://www.instagram.com/Hass_sml',
      },
    },
  ];

  const getSocialIcon = (platform: SocialPlatform) => {
    const iconProps = { size: 20, className: "text-white group-hover:text-blue-200 transition-colors" };
    switch(platform) {
      case 'linkedin': return <Linkedin {...iconProps} />;
      case 'twitter': return <Twitter {...iconProps} />;
      case 'instagram': return <Instagram {...iconProps} />;
      case 'github': return <Github {...iconProps} />;
      default: return <ExternalLink {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-red-900 to-gray-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
                  <Users size={48} className="text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Meet Our
              <span className="block">
                Creative Team
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              The passionate professionals behind UCP Morocco's innovative solutions. 
              Together, we transform ideas into digital excellence.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span className="text-lg">Morocco</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span className="text-lg">Talents Agency</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={20} />
                <span className="text-lg">200+ Projects Delivered</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Team Members
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each member brings unique expertise and passion to deliver exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 flex flex-col"
              onMouseEnter={() => setHoveredCard(member.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Member Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                    e.currentTarget.src = 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Frame+1051.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Member Info */}
              <div className="p-6 flex flex-col justify-between flex-grow min-h-[280px]">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.specialty}</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-6 py-3 px-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{member.experience}</div>
                    <div className="text-xs text-gray-500">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{member.projects}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-gray-900 ml-1">5.0</span>
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Social Media & Portfolio */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="group/social bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
                      >
                        {getSocialIcon(platform as SocialPlatform)}
                      </a>
                    ))}
                  </div>
                  
                  <button
                    disabled
                    className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg cursor-not-allowed"
                  >
                    <ExternalLink size={16} />
                    Portfolio
                  </button>
                </div>
              </div>

              {/* Hover decoration */}
              <div className={`absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-300 ${
                hoveredCard === member.id ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-300'
              }`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action 
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Work with Our Team?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can bring your vision to life with our expertise and creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start a Project
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>*/}
      <TalentsSection />
    </div>
  );
};

export default MembersPage;