import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Headphones, PlayCircle, Music } from 'lucide-react';
import { supabase } from '../supabaseClient';
import ActorCard from '../components/ActorCard';
import GlobalAudioPlayer from '../components/GlobalAudioPlayer';

// NEW: Define the shape of a single Actor object
interface Actor {
  id: string;
  slug: string | null;
  ActorName: string;
  Gender: string;
  Language: string;
  Tags: string | null;
  HeadshotURL: string;
  MainDemoURL: string;
  IsActive: boolean;
}

const VoiceOverLandingPage = () => {
// --- State for Data & Filtering ---
    const [actors, setActors] = useState<Actor[]>([]);
    const [filteredActors, setFilteredActors] = useState<Actor[]>([]);
    const [languageFilter, setLanguageFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    const [languages, setLanguages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Global Audio Player State ---
    const [currentActor, setCurrentActor] = useState<Actor | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Effect for handling audio element events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        const updateCurrentTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateCurrentTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentActor]); // Rerun when the track changes

    const handleSelectActorAndPlay = (actor: Actor) => {
        if (currentActor?.id === actor.id) {
            // If the same actor is clicked, just toggle play/pause
            handlePlayPause();
        } else {
            // If a new actor is clicked, switch the track and play
            setCurrentActor(actor);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, currentActor]);


    // --- NEW: Player Control Functions ---
    const handlePlayPause = () => {
        if (!currentActor) return;
        setIsPlaying(!isPlaying);
    };

  // REMOVE the old useEffect that fetches from Google Sheets and replace it with this:
  useEffect(() => {
    const getActors = async () => {
      setIsLoading(true);

      // Fetch all active actors directly from the Supabase 'actors' table
      const { data, error } = await supabase
        .from('actors')
        .select('*') // Select all columns
        .eq('IsActive', true); // Only get actors where IsActive is true

      if (error) {
        console.error('Error fetching actors:', error);
      } else if (data) {
        setActors(data);
        setFilteredActors(data);

        // Dynamically create the language filter list
        const uniqueLanguages = [...new Set(data.map(actor => actor.Language))];
        setLanguages(uniqueLanguages);
      }
      setIsLoading(false);
    };

    getActors();
  }, []); // The empty array ensures this runs only once on page load

  // NEW: useEffect to apply filters whenever a filter state changes
  useEffect(() => {
    let result = actors;

    if (genderFilter !== 'all') {
      result = result.filter(actor => actor.Gender === genderFilter);
    }

    if (languageFilter !== 'all') {
      result = result.filter(actor => actor.Language === languageFilter);
    }

    setFilteredActors(result);
  }, [genderFilter, languageFilter, actors]);


  

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

      

      {/* MP3 Player Section */}
      <section id="voices" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Voice Actors</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Browse our roster of professional talent. Filter by language and gender to find the perfect voice for your project.
            </p>
          </div>

          {/* NEW: Filter controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <select
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3"
            >
              <option value="all">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            <select
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 text-white rounded-lg p-3"
            >
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Corrected Grid for Actor Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {isLoading ? (
                            <p className="text-white text-center col-span-full">Loading voices...</p>
                        ) : (
                            filteredActors.map(actor => (
                                <ActorCard
                                    key={actor.id}
                                    actor={actor}
                                    onPlayClick={handleSelectActorAndPlay}
                                    isCurrentlyPlaying={isPlaying && currentActor?.id === actor.id}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

    {/* Render the Global Player */}
                <GlobalAudioPlayer
                    audioRef={audioRef}
                    currentActor={currentActor}
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    duration={duration}
                    currentTime={currentTime}
                />
                {/* Hidden audio element, controlled by the Global Player */}
                <audio ref={audioRef} src={currentActor?.MainDemoURL || ''} />
      
    </div>
  );
};

export default VoiceOverLandingPage;