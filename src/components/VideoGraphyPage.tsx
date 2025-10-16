import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, ExternalLink, Maximize2, X, Award, Calendar, User, Eye, Heart } from 'lucide-react';

interface CaseItem {
  id: number;
  title: string;
  client: string;
  year: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  likes: string;
  category: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  cases: CaseItem[];
}

const MergedPortfolioCaseStudies: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<CaseItem | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pageRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
        {
      id: 'AZADI',
      title: 'AZADI',
      description: 'In the winding alleys of Marrakech’s medina and the quiet elegance of a traditional riad, we captured the spirit of Azadi Adornments—a brand where jewellery becomes language, and every detail tells a story of freedom, heritage, and bold expression.',
      position: 'right',
      cases: [
        {
          id: 5,
          title: 'Soulful rhythm of Marrakech',
          client: 'AZADI',
          year: '2024',
          thumbnail: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Screenshot+from+2025-06-23+04-26-38.png',
          videoUrl: 'https://d2ah09ed4k10ng.cloudfront.net/mp/NAHAL+AND+INDIA+OUTFIT/AZADII-.mp4',
          views: '7.8M',
          likes: '102.9K',
          category: 'Animation'
        }
      ],
    },
    {
      id: 'ABYYA',
      title: 'ABYYA – Ramadan in Marrakech',
      description: 'Featuring three models walking side by side through the lively souk, the majestic Koutoubia, and the iconic Jemaa El-Fna, the campaign captures the spirit of sisterhood during the holy month. Their journey weaves through scenes of discovery, spiritual pause, and joy—culminating in a beautifully intimate iftar shared together at sunset.',
      position: 'left',
      cases: [
        {
          id: 1,
          title: 'ABBAYA Teaser',
          client: 'Brand Films',
          year: '2024',
          thumbnail: 'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/ABYYA+Pictures/0.jpg',
          videoUrl: 'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/Teaser+ABYYA.mp4',
          views: '15M',
          likes: '93.2K',
          category: 'Commercial'
        }
      ],
    },
    {
      id: 'IZZY',
      title: 'IZZY – Teaser',
      description: 'Renowned for her work with Caftan Week, Femmes du Maroc, L’Oréal Maroc, and more, Izelle brings a magnetic presence shaped by both international experience and a deep connection to Moroccan culture. Our lens captured her in a new dimension—one where modeling meets performance, stillness meets story, and elegance meets edge.',
      position: 'right',
      cases: [
        {
          id: 1,
          title: 'ABBAYA Teaser',
          client: 'ABBAYA',
          year: '2024',
          thumbnail: 'https://d2ah09ed4k10ng.cloudfront.net/mp/NAHAL+AND+INDIA+OUTFIT/izzypic/i1.jpg',
          videoUrl: 'https://d2ah09ed4k10ng.cloudfront.net/mp/NAHAL+AND+INDIA+OUTFIT/IZZY.mp4',
          views: '622K',
          likes: '13.90K',
          category: 'Commercial'
        }
      ],
    },
    {
      id: 'NAJLAE',
      title: 'MAISON NAJLAE – Ramadan Campaign',
      description: 'Set in the soul of Morocco’s old medina, the campaign follows an elderly woman as she turns the pages of a cherished photo album, each image a doorway into her youth. Alongside a dear friend, she walks once more through the timeless alleyways, both adorned in Maison Najlae’s signature kaftans—elegant, flowing, and rich with Moroccan identity.',
      position: 'left',
      cases: [
        {
          id: 1,
          title: 'ABBAYA Teaser',
          client: 'MAISON NAJLAE',
          year: '2024',
          thumbnail: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Screenshot+from+2025-06-23+04-33-04.png',
          videoUrl: 'https://d2ah09ed4k10ng.cloudfront.net/mp/NAJLA/ZAMAN+JAMILL+CINEMATIC.mp4',
          views: '11M',
          likes: '134.2K',
          category: 'Commercial'
        }
      ],
    },
    {
      id: 'HYROSY',
      title: 'HYROSY – Albane Experience ',
      description: 'Beginning in the quiet beauty of a traditional riad, the narrative unfolds as Albane sets off on a camel ride through the sunlit Palmeraie, embodying both freedom and refined adventure. Along the way, two standout collections take center stage: the 2024 leather bags, crafted with minimalist sophistication, and the brand’s signature camel bracelets, rooted in artisanal detail and heritage.',
      position: 'right',
      cases: [
        {
          id: 1,
          title: 'HYROSY – Albane Experience',
          client: 'HYROSY',
          year: '2025',
          thumbnail: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/Screenshot+from+2025-06-23+04-38-33.png',
          videoUrl: 'https://d2ah09ed4k10ng.cloudfront.net/mp/HYROSY/Albane+Experience.MP4',
          views: '112K',
          likes: '13.2K',
          category: 'Commercial'
        }
      ],
    }
  ];


  const openLightbox = (caseItem: CaseItem) => {
    setCurrentVideo(caseItem);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentVideo(null);
    document.body.style.overflow = 'unset';
  };


  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (lightboxOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxOpen]);


  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        const rect = pageRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const pageElement = pageRef.current;
    if (pageElement) {
      pageElement.addEventListener('mousemove', handleMouseMove);
      return () => pageElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);


  const CaseCard: React.FC<{ caseItem: CaseItem; index: number; categoryId: string }> = ({ caseItem, index, categoryId }) => (
    <div
      className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl cursor-pointer"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
      onClick={() => openLightbox(caseItem)}
    >
      <div className="relative w-full pb-[100%] flex items-center justify-center overflow-hidden">
        <img
          src={caseItem.thumbnail}
          alt={caseItem.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Play className="w-16 h-16 text-white transform transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
    </div>
  );


  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`floating-element floating-element-${i + 1}`}
      style={{
        animationDelay: `${i * 0.5}s`,
        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`
      }}
    />
  ));

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(59,130,246,0.2),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Header */}
        

        {/* Categories with Portfolio Grids */}
        <div className="space-y-32">
          {categories.map((category, categoryIndex) => (
            <div key={category.id} className="mb-32">
              {/* Case Study Section */}
              <div className={`flex items-center ${category.position === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex-col gap-8 lg:gap-16 mb-16`}>
                {/* Content Section */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                      {category.title}
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Award className="w-5 h-5" />
                      <span>{category.cases.length} Featured Project{category.cases.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="text-gray-400">Award Winning</div>
                  </div>
                </div>

                {/* Featured Case */}
                <div className="flex-1 w-full">
                  {category.cases.length > 0 && (
                    <div className="grid gap-6 p-2 grid-cols-1">
                      <CaseCard caseItem={category.cases[0]} index={0} categoryId={category.id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Case Study Video Lightbox */}
      {lightboxOpen && currentVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-60 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:text-gray-300" />
            </button>

            <div
              className="relative w-full h-full max-w-4xl max-h-[80vh] bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={currentVideo.id}
                src={currentVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={currentVideo.thumbnail}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{currentVideo.client}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{currentVideo.year}</span>
                      </div>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                        {currentVideo.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{currentVideo.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{currentVideo.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .floating-element {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #60a5fa, #a855f7);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-element-1 { top: 20%; left: 10%; animation-duration: 4s; }
        .floating-element-2 { top: 60%; left: 20%; animation-duration: 5s; }
        .floating-element-3 { top: 30%; right: 15%; animation-duration: 6s; }
        .floating-element-4 { bottom: 40%; right: 10%; animation-duration: 4.5s; }
        .floating-element-5 { bottom: 20%; left: 15%; animation-duration: 5.5s; }
        .floating-element-6 { top: 70%; right: 25%; animation-duration: 3.5s; }
      `}</style>
    </div>
  );
};

export default MergedPortfolioCaseStudies;