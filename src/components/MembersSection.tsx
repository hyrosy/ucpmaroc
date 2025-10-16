import React, { useState } from 'react';
import { Award, BrainIcon, Cloud, Users, Code2 } from 'lucide-react';

const MembersSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      name: 'Hamza EA',
      position: 'CEO & Co-Founder',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/DSCF5573.JPG',
      skills: ['Leadership', 'Strategy', 'Innovation'],
      projects: '+32 ',
      achievements: [
        'Founded 3 successful startups',
        'Featured in Forbes 40 Under 40',
        'TEDx speaker on innovation'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
      accent: 'from-red-500 to-orange-500'
    },
    {
      name: 'Ahmedtaha Abarrahou',
      position: 'Fullstack developer',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/496768521_18073677304893125_968731744148343907_n.jpg',
      skills: ['Full-Stack Dev', 'Networking', 'System Administration'],
      projects: '21',
      achievements: [
        'Managed secure server infrastructures',
        'Built and deployed full-stack web apps',
        'Integrated CI/CD pipelines across environments'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469',
      accent: 'from-orange-500 to-yellow-400'
    },
    {
      name: 'Nabil El Bachiri',
      position: 'Property Manager',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/503314148_18274044961282089_7110481306095049342_n.jpg',
      skills: ['Tenant Relations', 'Property Maintenance', 'Booking Management'],
      projects: '14',
      education: 'MFA Design RISD, BA Psychology UCLA',
      achievements: [
        'Managed multi-site properties',
        'Cut maintenance costs by 20%',
        'Maintained 95%+ occupancy'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1695742265305-14f0373cd9dc?q=80&w=1470',
      accent: 'from-blue-400 to-green-400'
    },
    {
      name: 'Mariam Mouzoul',
      position: 'Visual ART Director',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/471996946_625250583496182_117283758802591691_n.jpg',
      skills: ['ART Direction', 'AI Graphics & VFX', 'Motion & Video'],
      projects: '12',
      achievements: [
        'Directed brand visuals for major campaigns',
        'Integrated AI tools into creative workflows',
        'Boosted design productivity by 30%'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1674305281997-b6538532f388?q=80&w=1470',
      accent: 'from-green-400 to-emerald-400'
    },
    {
      name: 'Jebri strawhat',
      position: 'Cinematographer',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/457507784_500820326017618_7102724725175186626_n.jpg',
      skills: ['Video Editing', 'Post-Production', 'Motion Graphics'],
      projects: '18',
      achievements: [
        'Edited 100+ videos for brands and creators',
        'Improved viewer retention by 40% with storytelling cuts',
        'Delivered fast-turnaround edits under tight deadlines'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1641583377186-74ae059ca1ea?q=80&w=1631',
      accent: 'from-orange-400 to-amber-400'
    },
    {
      name: 'Abderrazak Trajja',
      position: 'Voice Over',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/488085357_1017235940348722_2197642891228150759_n.jpg',
      skills: ['Voice Acting', 'Audio Editing', 'Script Interpretation'],
      projects: '+40',
      achievements: [
        'Recorded 200+ voiceovers for ads and videos',
        'Delivered multilingual voice projects on deadline',
        'Enhanced brand tone with professional narration'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1516485392461-3961cc21f1e7?w=1500&h=1080&fit=crop',
      accent: 'from-teal-400 to-blue-400'
    },
    {
      name: 'Patrick Simbaya',
      position: 'Front-End Developer',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/495801964_17949411053964094_6402716471549929582_n.jpg',
      skills: ['WordPress', 'UI/UX', 'Social Media'],
      projects: '41',
      achievements: [
  'Managed ad budgets exceeding $10K',
  'Built landing pages that boosted CTR by 25%',
  'Optimized campaigns across Meta & Google Ads'
]
,
      backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop',
      accent: 'from-violet-400 to-purple-400'
    },
    {
      name: 'Ayoub Sbaihi',
      position: 'Voice Over',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/501451766_18016166447717339_1194100904261373844_n.jpg',
      skills: ['Narration', 'Dubbing', 'Studio Recording'],
      projects: '52',
      achievements: [
        'Voiced content for 50+ brands and media outlets',
        'Adapted voice tone for diverse audiences',
        'Produced high-quality audio with minimal revisions'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1514320346120-8331112b2801?q=80&w=1470',
      accent: 'from-red-400 to-pink-400'
    },
    {
      name: 'Nustapha Nassoh',
      position: 'Operations Manager',
      image: 'https://d2ah09ed4k10ng.cloudfront.net/502749732_18462993526073959_2326641292068939243_n.jpg',
      skills: ['Photography', 'Photo Editing', 'Lighting Techniques'],
      projects: '14',
      achievements: [
        'Captured 10K+ professional photos',
        'Covered 100+ events and campaigns',
        'Edited high-end visuals for web and print'
      ],
      backgroundImage: 'https://images.unsplash.com/photo-1613235577937-9ac3eed992fc?w=1500&&h=1080&fit=crop',
      accent: 'from-indigo-400 to-slate-400'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 lg:p-8 transition-all duration-1000 ease-in-out relative"
      style={{
        backgroundImage: `url(${currentMember.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 transition-all duration-1000"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-orange-300 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Our Talents 
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-4xl mx-auto px-4">
            We're a diverse group of passionate professionals dedicated to innovation and excellence. 
            Each member brings unique expertise and perspective to drive our mission forward.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Side - Card Slider */}
        <div className="flex flex-col items-center order-2 lg:order-1">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] h-[500px] sm:h-[600px] lg:h-[680px] perspective-1000">
            <div className="relative w-full h-full">
              {teamMembers.map((member, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;
                
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer ${
                      isActive ? 'z-20 scale-100' : 'z-10 scale-90 sm:scale-95'
                    }`}
                    style={{
                      transform: `
                        translateX(${offset * (window.innerWidth < 640 ? 8 : 15)}px) 
                        translateZ(${isActive ? 0 : -100}px) 
                        rotateY(${offset * (window.innerWidth < 640 ? 1.5 : 3)}deg)
                      `,
                      opacity: isActive ? 1 : Math.abs(offset) > 2 ? 0 : 0.5,
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    onClick={() => !isActive && goToSlide(index)}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Minimal Card Content */}
                    <div className="relative h-full flex flex-col justify-end p-4 sm:p-6">
                      {/* Name & Position - Glassmorphism */}
                      <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                          {member.name}
                        </h3>
                        <p className={`bg-gradient-to-r ${member.accent} bg-clip-text text-transparent font-semibold text-sm sm:text-base lg:text-lg`}>
                          {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons - Responsive positioning */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 lg:left-[-60px] top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-30"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 lg:right-[-60px] top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-30"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots 
          <div className="flex space-x-2 mt-6 sm:mt-8 overflow-x-auto pb-2">
            {teamMembers.map((member, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                  index === currentIndex 
                    ? `bg-gradient-to-r ${member.accent} scale-125` 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>*/}
        </div>

        {/* Right Side - Dynamic Content */}
        <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
          {/* Member Header */}
          <div className="bg-black/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-black/10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${currentMember.accent} flex items-center justify-center text-white font-bold text-lg sm:text-xl transition-all duration-1000`}>
                {currentMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {currentMember.name}
                </h2>
                <p className={`bg-gradient-to-r ${currentMember.accent} bg-clip-text text-transparent text-lg sm:text-xl font-semibold transition-all duration-1000`}>
                  {currentMember.position}
                </p>
              </div>
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Skills */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${currentMember.accent} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <BrainIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMember.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white bg-gradient-to-r ${currentMember.accent}/20 backdrop-blur-sm rounded-full border border-current/30 transition-all duration-1000`}
                    style={{
                      borderColor: `rgb(from ${currentMember.accent.split(' ')[1]} r g b / 0.3)`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${currentMember.accent} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Award className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                Projects
              </h3>
              <p className={`text-xl sm:text-2xl font-bold text-white bg-clip-text text-transparent mb-2 transition-all duration-1000`}>
                {currentMember.projects}
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${currentMember.accent} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Award className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              Key Achievements
            </h3>
            <div className="space-y-2 mb-4">
              {currentMember.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 bg-gradient-to-r ${currentMember.accent} rounded-full flex-shrink-0 mt-2 transition-all duration-1000`}></div>
                  <p className="text-sm sm:text-base text-gray-300">{achievement}</p>
                </div>
              ))}
            </div>
            {/*<button className={`relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${currentMember.accent} text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 text-sm sm:text-base`}>
              See Portfolio
            </button>*/}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default MembersSection;