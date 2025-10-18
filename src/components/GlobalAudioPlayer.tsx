// In src/components/GlobalAudioPlayer.tsx

import React from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentActor: { ActorName: string; HeadshotURL: string; MainDemoURL: string } | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  duration: number;
  currentTime: number;
}

const GlobalAudioPlayer: React.FC<PlayerProps> = ({ audioRef, currentActor, isPlaying, onPlayPause, duration, currentTime }) => {
  if (!currentActor) return null; // Don't render the player if nothing is selected

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-4 flex items-center gap-4 z-50">
      <img src={currentActor.HeadshotURL} alt={currentActor.ActorName} className="w-14 h-14 rounded-md" />
      <div>
        <p className="font-bold text-white">{currentActor.ActorName}</p>
        <p className="text-sm text-slate-400">Main Demo Reel</p>
      </div>
      <div className="flex-grow flex items-center justify-center gap-4">
        <button onClick={onPlayPause} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full">
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <div className="flex items-center gap-2 text-xs text-slate-400 w-full max-w-md">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-grow h-1 bg-slate-600 rounded-full">
                <div className="h-1 bg-white rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;