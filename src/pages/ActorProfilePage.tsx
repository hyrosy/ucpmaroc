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


    // --- NEW: Robust Share Function ---
    const handleShare = async () => {
        const shareData = {
            title: `Voice Actor: ${actor?.ActorName}`,
            text: `Check out the voice actor profile for ${actor?.ActorName}!`,
            url: window.location.href,
        };

        // Use the modern Web Share API if available
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Share failed:", err);
            }
        } else {
            // Fallback for desktop browsers: copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Profile link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
                alert('Failed to copy link.');
            }
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
            
            <header className="h-auto md:h-96 relative flex items-end bg-gradient-to-t from-slate-900 via-purple-900/50 to-purple-800">
                {/* --- NEW: Added a max-width container with padding --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
                    <div className="flex flex-row items-center gap-4 md:gap-8 z-10 w-full">
                        <img 
                            src={actor.HeadshotURL} 
                            alt={actor.ActorName} 
                            className="w-28 h-28 md:w-52 md:h-52 rounded-full object-cover flex-shrink-0 shadow-2xl shadow-black/50"
                        />
                        <div className="text-left flex-grow">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-blue-400" />
                                <p className="font-semibold text-sm">Verified Voice Actor</p>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white break-words">{actor.ActorName}</h1>
                            <p className="text-slate-300 text-sm md:text-base mt-1 md:mt-2">{actor.Language} | {actor.Gender}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- NEW: Added a max-width container with padding --- */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-6 mb-12">
                    <button onClick={() => handlePlayPause()} className="w-16 h-16 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                        {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>
                    <button onClick={() => setIsQuoteModalOpen(true)} className="px-6 py-3 border-2 border-slate-600 hover:border-white rounded-full text-white font-bold text-sm transition">
                        Get a Quote
                    </button>
                    <button onClick={handleShare} className="p-3 border-2 border-slate-600 hover:border-white rounded-full text-slate-300 hover:text-white transition">
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Demo Tracklist */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Popular Demos</h2>
                    <div className="flex flex-col">
                        {demos.map((demo, index) => (
                            <div
                                key={index}
                                onClick={() => handlePlayPause(index)}
                                className="group grid grid-cols-[40px_1fr_auto] items-center gap-4 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer"
                            >
                                {/* 1. Track Number / Play/Pause Icon */}
                                <div className="flex items-center justify-center text-slate-400">
                                    {currentTrackIndex === index && isPlaying ? (
                                        <Pause size={16} className="text-purple-400" />
                                    ) : (
                                        <>
                                            <span className="group-hover:hidden">{index + 1}</span>
                                            <Play size={16} className="text-white hidden group-hover:block" />
                                        </>
                                    )}
                                </div>
                                
                                {/* 2. Track Title */}
                                <div>
                                    <p className={`font-semibold truncate ${currentTrackIndex === index ? 'text-purple-400' : 'text-white'}`}>
                                        {demo.title}
                                    </p>
                                </div>
                                
                                {/* 3. (Optional) Duration - can be added later */}
                                <div className="text-slate-400 text-sm">
                                    {/* Example: 2:34 */}
                                </div>
                            </div>
                        ))}
                    </div>
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