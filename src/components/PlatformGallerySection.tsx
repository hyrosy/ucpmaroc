import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ExternalLink, Maximize2, X } from 'lucide-react';

const PlatformGallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [videoStates, setVideoStates] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  type MediaItem = {
    type: 'image' | 'video';
    src: string;
    title: string;
    description?: string;
    category?: string;
  };

  const media: MediaItem[] = [
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp/ABYYA/ABYYA+Pictures/IMG_6627.jpg', 
      title: 'ABAAYA Branding',
      description: 'ABYYA Products showroom',
      category: 'Fashion'
    },
    { 
      type: 'video', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp/ABYYA/Teaser+ABYYA.mp4', 
      title: 'ABBAYA Branding',
      description: 'ABBAYA Clothes Branding by Nassoh',
      category: 'Cinematograph'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/design/keshida/keshida_work/DHXdhyp1UpKlk4SpPVLbYWhCghA.webp', 
      title: 'Survival Mode',
      description: 'Dynamic visual storytelling',
      category: 'Art'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp/ABYYA/ABYYA+Pictures/A1.jpg', 
      title: 'Ice Cream Fantasy',
      description: 'Whimsical food illustration',
      category: 'Illustration'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/design/keshida/Radiant/MMZKN5jFBdmt5zG3T9oyFmV7z8.avif', 
      title: 'Radiant by Keshida',
      description: 'SolarPanel Branding',
      category: 'Branding'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/design/keshida/keshida_work/EfxUBf0BEqlwFG3nI5pEiO2UyQ.gif', 
      title: 'Micro Construction',
      description: 'Hyperrealistic macro photography',
      category: 'Photography'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp/ABYYA/ABYYA+Pictures/0.jpg', 
      title: 'Alchemy Magic',
      description: 'Mystical digital art',
      category: 'Digital Art'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp/HYROSY/ALBANE/IMG_6909.PNG', 
      title: 'Moroccan Lion',
      description: 'Cultural fusion artwork',
      category: 'Art'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp/HYROSY/ALBANE/IMG_6908.PNG', 
      title: 'Hyrosy Bracelet',
      description: 'Hyrosy Products By ALBAN',
      category: 'Fashion'
    },
    { 
      type: 'image', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp/HYROSY/ALBANE/IMG_6894.PNG', 
      title: 'Hyrosy by ALBAN',
      description: 'Demonstration of Hyrosy products',
      category: 'Showroom'
    },
    { 
      type: 'video', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mariam/Animation/SnapInsta.to_AQOq4rGJFMrezm7qvu0vKdP9GiDPSmrikhpUJbiPyw7zmfCztqgHsHmX7CHXYTIJDcyIttaFkDXnkCkEv2HjvIHDS3lwnCmuJNCbDoY.mp4', 
      title: 'Bunny Adventure',
      description: 'Character animation study',
      category: 'Animation'
    },
    { 
      type: 'video', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mariam/Ai+Playground/video/SnapInsta.to_AQP8dcngX2_eV4GzhYov2ZKxilNRH2p26_lSTGcsGYUSRHeepsXguiT9ahN-MImCd8ENxRvX9rXGYeNF9IowckxWRJB6orETuJtkGYc.mp4', 
      title: 'Forest Journey',
      description: 'Environmental storytelling',
      category: 'Animation'
    },
    { 
      type: 'video', 
      src: 'https://ucpmarocgo.s3.us-east-1.amazonaws.com/mariam/Ai+Playground/video/SnapInsta.to_AQO5nvyMfY9ItF8xe-4nHjqqD7VkD1XPC5Qcl1-H_yMxsls7gwyOKoYOI3WvHh9vWC2fIR-2x83dmd51-sHbNWMOkJ-cx8fG365YMKs.mp4', 
      title: 'Video By Meriam M',
      description: 'Environmental storytelling',
      category: 'Digital ART'
    },
  ];

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setVideoStates(prev => ({ ...prev, [index]: true }));
      } else {
        video.pause();
        setVideoStates(prev => ({ ...prev, [index]: false }));
      }
    }
  };

  const handleImageLoad = (index: number) => {
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  useEffect(() => {
    // Initialize loading states
    const initialLoading: { [key: number]: boolean } = {};
    media.forEach((_, index) => {
      initialLoading[index] = true;
    });
    setIsLoading(initialLoading);
  }, []);

  return (
    <>
      <section className="py-16 min-h-screen relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(147,51,234,0.1)_0deg,transparent_60deg,rgba(59,130,246,0.1)_120deg,transparent_180deg,rgba(147,51,234,0.1)_240deg,transparent_300deg,rgba(236,72,153,0.1)_360deg)] animate-spin" style={{ animationDuration: '60s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Enhanced header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
                Portfolio Gallery
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-500 via-gray-700 to-orange-600 bg-clip-text text-transparent">
                Build Strong
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Social Base
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore a curated collection of creative works spanning digital art, animation, and innovative design concepts.
            </p>
          </div>

          {/* Enhanced masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {media.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-2xl break-inside-avoid group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl border border-white/5 backdrop-blur-sm bg-white/5"
                onClick={() => setSelectedItem(item)}
              >
                {/* Loading skeleton */}
                {isLoading[index] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-2xl"></div>
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Media content */}
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="relative">
                    <video
                      ref={el => videoRefs.current[index] = el}
                      src={item.src}
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                      onLoadedData={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                    {/* Video play/pause button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideo(index);
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-3 rounded-full hover:bg-black/80 transition-all duration-300 hover:scale-110"
                    >
                      {videoStates[index] ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                  </div>
                )}

                {/* Enhanced hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
                  <div className="p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white text-xl font-bold">
                        {item.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors duration-300">
                          <ExternalLink className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors duration-300">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for detailed view */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              ) : (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 text-sm font-medium text-purple-300 bg-purple-500/20 rounded-full">
                    {selectedItem.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlatformGallerySection;