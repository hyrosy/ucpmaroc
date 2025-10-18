// In src/components/ActorCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';

interface Actor {
  id: string;
  slug: string;
  ActorName: string;
  HeadshotURL: string;
  Language: string;
  Gender: string;
}

interface ActorCardProps {
  actor: Actor;
  onPlayClick: (actor: Actor) => void;
  isCurrentlyPlaying: boolean;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, onPlayClick, isCurrentlyPlaying }) => {
  // --- ADD THIS SAFETY CHECK ---
  // If the actor doesn't have a slug, don't render the card at all.
  if (!actor.slug) {
    return null; 
  }
  // --- END OF SAFETY CHECK ---
  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the Link from navigating
    e.preventDefault();  // Prevents any default browser action
    onPlayClick(actor);
  };

  return (
    // The entire card is a link to the profile page
    <Link to={`/actor/${actor.slug}`} className="group relative bg-slate-800/50 p-4 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 block">
      <div className="relative">
        <img 
          src={actor.HeadshotURL} 
          alt={actor.ActorName} 
          className="w-full rounded-md aspect-square object-cover"
        />
        {/* Play button appears on hover */}
        <button
          onClick={handlePlayButtonClick}
          className={`absolute bottom-2 right-2 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center
                      shadow-lg opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300
                      ${isCurrentlyPlaying ? 'opacity-100 bottom-4' : ''}`} // Keep visible if playing
        >
          {isCurrentlyPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-white truncate">{actor.ActorName}</h3>
        <p className="text-sm text-slate-400">{actor.Language} | {actor.Gender}</p>
      </div>
    </Link>
  );
};

export default ActorCard;