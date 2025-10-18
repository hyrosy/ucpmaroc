// In src/pages/ActorProfilePage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import QuoteCalculatorModal from '../components/QuoteCalculatorModal';
import { Play, Pause, Mic, Phone, CheckCircle, Share2 } from 'lucide-react';

// Recommended: Move this to a central 'src/types.ts' file and import it
interface Actor {
  id: string;
  ActorName: string;
  bio: string | null;
  Gender: string;
  Language: string;
  Tags: string | null;
  HeadshotURL: string;
  MainDemoURL: string;
  Demo2_Title: string | null;
  Demo2_URL: string | null;
  Demo3_Title: string | null;
  Demo3_URL: string | null;
  BaseRate_per_Word: string;
  WebMultiplier: string;
  BroadcastMultiplier: string;
  ActorEmail: string;
  slug: string;
}

const ActorProfilePage = () => {
    // Correctly get the slug from the URL parameter named 'actorName'
    const { actorName: actorSlug } = useParams<{ actorName: string }>();
    const [actor, setActor] = useState<Actor | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    // --- Player State ---
    const [demos, setDemos] = useState<{ title: string; url: string }[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Data fetching (already optimized)
    useEffect(() => {
        const getActorProfile = async () => {
            if (!actorSlug) return;
            setIsLoading(true);
            const { data, error } = await supabase.from('actors').select('*').eq('slug', actorSlug).eq('IsActive', true).single();
            if (error) {
                setError('Actor not found.');
                console.error(error);
            } else if (data) {
                setActor(data);
                const tracklist = [
                    { title: 'Main Demo Reel', url: data.MainDemoURL },
                    { title: data.Demo2_Title, url: data.Demo2_URL },
                    { title: data.Demo3_Title, url: data.Demo3_URL },
                ].filter(d => d.url && d.title) as { title: string; url: string }[];
                setDemos(tracklist);
            }
            setIsLoading(false);
        };
        getActorProfile();
    }, [actorSlug]);

    // Audio player logic (no changes needed)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) { audio.play().catch(console.error); } 
        else { audio.pause(); }
    }, [isPlaying, currentTrackIndex]);

    const handlePlayPause = (index?: number) => {
        const targetIndex = index ?? 0;
        if (currentTrackIndex === targetIndex) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrackIndex(targetIndex);
            setIsPlaying(true);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    if (error || !actor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <p>{error || 'Actor not found.'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <audio ref={audioRef} src={currentTrackIndex !== null ? demos[currentTrackIndex]?.url : ''} />
            
            {/* --- NEW: Spotify-style Immersive Header --- */}
            <header className="h-80 md:h-96 relative flex items-end p-8 bg-gradient-to-t from-slate-900 via-purple-900/50 to-purple-800">
                <div className="flex flex-col md:flex-row items-center gap-6 z-10">
                    <img 
                        src={actor.HeadshotURL} 
                        alt={actor.ActorName} 
                        className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-2xl shadow-black/50"
                    />
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <CheckCircle size={24} className="text-blue-400" />
                            <p className="font-semibold">Verified Voice Actor</p>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">{actor.ActorName}</h1>
                        <p className="text-slate-300 mt-2">{actor.Language} | {actor.Gender}</p>
                    </div>
                </div>
            </header>

            {/* --- NEW: Main Content Area with Actions and Tracklist --- */}
            <main className="p-8">
                {/* Main Action Buttons */}
                <div className="flex items-center gap-6 mb-12">
                    <button onClick={() => handlePlayPause()} className="w-16 h-16 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                        {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>
                    <button onClick={() => setIsQuoteModalOpen(true)} className="px-6 py-3 border-2 border-slate-600 hover:border-white rounded-full text-white font-bold text-sm transition">
                        Get a Quote
                    </button>
                    {/* Optional Share button */}
                    <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="p-3 border-2 border-slate-600 hover:border-white rounded-full text-slate-300 hover:text-white transition">
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Demo Tracklist */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Popular Demos</h2>
                    {demos.map((demo, index) => (
                        <div key={index} onClick={() => handlePlayPause(index)} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer">
                            <div className="text-slate-400 font-semibold w-8 text-center">
                                {currentTrackIndex === index && isPlaying ? <Pause size={16} className="text-purple-400 mx-auto" /> : <span className="group-hover:hidden">{index + 1}</span>}
                                {currentTrackIndex !== index && <Play size={16} className="text-white hidden group-hover:block mx-auto" />}
                            </div>
                            <p className={`font-semibold truncate ${currentTrackIndex === index ? 'text-purple-400' : 'text-white'}`}>{demo.title}</p>
                        </div>
                    ))}
                </div>

                {/* Bio Section */}
                {actor?.bio && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <p className="text-slate-400 leading-relaxed whitespace-pre-wrap max-w-3xl">
                            {actor?.bio}
                        </p>
                    </div>
                )}
            </main>

            {isQuoteModalOpen && actor && ( <QuoteCalculatorModal actor={actor} onClose={() => setIsQuoteModalOpen(false)} /> )}
        </div>
    );
};

export default ActorProfilePage;