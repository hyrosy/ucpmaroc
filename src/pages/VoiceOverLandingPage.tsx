import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Mic, Star, Award, Users, Headphones, Download, PlayCircle, Music, Quote } from 'lucide-react';

const VoiceOverLandingPage = () => {
  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sample playlist - replace with your actual MP3 files
  const playlist = [
    {
      id: 1,
      title: "Nike Generation Event",
      artist: "Abderrazzak Trajja",
      duration: "1:25",
      src: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp3/Copie+de+nexgen+inspairx+.mp3", // Replace with your MP3 path
      genre: "Commercial"
    },
    {
      id: 2,
      title: "Lumens Solar Panel",
      artist: "Abderrazzak Trajja",
      duration: "0:46",
      src: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp3/lumens+final+1.mp3", // Replace with your MP3 path
      genre: "Advertisement"
    },
    {
      id: 3,
      title: "Commercial Narrator",
      artist: "Abderrazzak Trajja",
      duration: "2:01",
      src: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp3/VID_20250317_121615_830.mp3", // Replace with your MP3 path
      genre: "Narrator"
    },
    {
      id: 4,
      title: "YT Short Breaking News",
      artist: "Abderrazzak Trajja",
      duration: "4:10",
      src: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp3/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1%D9%8A+(1).mp3", // Replace with your MP3 path
      genre: "News"
    },
    {
      id: 5,
      title: "Iraq Aswat",
      artist: "Abderrazzak Trajja",
      duration: "0:13",
      src: "https://ucpmarocgo.s3.us-east-1.amazonaws.com/mp3/%D8%B9%D9%8A%D9%86%D8%A9+%D8%B5%D9%88%D8%AA%D9%8A%D8%A9+%D8%A7%D8%B5%D9%88%D8%A7%D8%AA+%D8%A7%D9%84%D8%B9%D8%B1%D8%A7%D9%82+%D8%B9%D8%A8%D8%AF%D9%88+(1).mp3", // Replace with your MP3 path
      genre: "Commercial"
    }
  ];

  const services = [
    {
      icon: Mic,
      title: "Commercial Voice Over",
      description: "Professional voice overs for TV, radio, and online advertisements that capture attention and drive results.",
      features: ["TV Commercials", "Radio Ads", "Online Marketing", "Brand Campaigns"]
    },
    {
      icon: Headphones,
      title: "Narration & Documentary",
      description: "Engaging storytelling voices for documentaries, audiobooks, and educational content.",
      features: ["Documentary Films", "Audiobooks", "Corporate Videos", "Educational Content"]
    },
    {
      icon: PlayCircle,
      title: "Character & Animation",
      description: "Dynamic character voices for animations, video games, and entertainment projects.",
      features: ["Animation Characters", "Video Game Voices", "Cartoon Characters", "Interactive Media"]
    },
    {
      icon: Music,
      title: "IVR & Phone Systems",
      description: "Clear, professional voices for phone systems, automated messages, and customer service.",
      features: ["Phone Systems", "Auto Attendants", "Hold Messages", "Customer Service"]
    }
  ];

  // Audio Player Functions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) { // Add null check
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (audio) { // Add null check
      const clickX = e.nativeEvent.offsetX;
      const width = e.currentTarget.offsetWidth;
      const newTime = (clickX / width) * duration;
      audio.currentTime = newTime;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
              Voice Over
              <br />
              <span className="text-5xl md:text-7xl">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your content with professional voice overs that captivate, engage, and deliver results. 
              From commercials to documentaries, we bring your words to life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
<a href="#simples" className="px-8 py-4 border-2 border-slate-400 text-slate-300 rounded-full font-semibold text-lg hover:border-white hover:text-white transition-all duration-300 hover:scale-105">
              View Simples
            </a>
          </div>

          
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Professional voice over services tailored to your specific needs and industry requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600/50">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MP3 Player Section */}
      <section id="simples" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Listen to Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Samples</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the quality and versatility of our voice over work through our curated sample collection
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* Audio Element */}
            <audio
              ref={audioRef}
              src={playlist[currentTrack]?.src}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Player Header */}
            <div className="p-8 border-b border-slate-700/50">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Music className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {playlist[currentTrack]?.title}
                  </h3>
                  <p className="text-slate-400 text-lg">
                    {playlist[currentTrack]?.artist}
                  </p>
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm mt-2">
                    {playlist[currentTrack]?.genre}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-sm">Duration</div>
                  <div className="text-white font-mono text-lg">
                    {playlist[currentTrack]?.duration}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-8 py-4 border-b border-slate-700/50">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-slate-400 text-sm font-mono">
                  {formatTime(currentTime)}
                </span>
                <div 
                  className="flex-1 h-2 bg-slate-700 rounded-full cursor-pointer overflow-hidden"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-slate-400 text-sm font-mono">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={prevTrack}
                  className="w-12 h-12 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <SkipBack className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="w-12 h-12 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <SkipForward className="w-6 h-6 text-white" />
                </button>

                <div className="flex items-center gap-2 ml-8">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Music className="w-5 h-5" />
                Playlist
              </h4>
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => selectTrack(index)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-700/50 ${
                      index === currentTrack ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === currentTrack ? 'bg-blue-500' : 'bg-slate-700'
                    }`}>
                      <span className="text-white font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        index === currentTrack ? 'text-blue-400' : 'text-white'
                      }`}>
                        {track.title}
                      </div>
                      <div className="text-slate-400 text-sm">{track.artist}</div>
                    </div>
                    <div className="text-slate-400 text-sm font-mono">
                      {track.duration}
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      

      {/* Footer */}
      

      <style >{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1e293b;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1e293b;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default VoiceOverLandingPage;