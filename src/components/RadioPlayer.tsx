import React, { useState } from 'react';
import { Radio, Volume2, VolumeX, SkipForward, Disc3 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const STATIONS = [
  { name: 'Radio Los Santos', freq: '106.1 FM', track: 'Dr. Dre & Snoop - Nuthin But A G Thang' },
  { name: 'West Coast Classics', freq: '98.5 FM', track: 'Ice Cube - It Was A Good Day' },
  { name: 'Bounce FM', freq: '102.3 FM', track: 'The Ohio Players - Love Rollercoaster' },
  { name: 'K-DST The Dust', freq: '91.7 FM', track: 'Tom Petty - Runnin Down A Dream' },
];

export const RadioPlayer: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStation = STATIONS[currentIdx];

  const toggleRadio = () => {
    soundEngine.playClick();
    setIsPlaying(!isPlaying);
  };

  const nextStation = () => {
    soundEngine.playClick();
    setCurrentIdx((prev) => (prev + 1) % STATIONS.length);
  };

  return (
    <div className="bg-black border-2 border-yellow-400 p-3 sm:p-4 text-yellow-400 shadow-[0_0_20px_rgba(255,230,0,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 border border-yellow-400 bg-zinc-950 flex items-center justify-center ${isPlaying ? 'text-yellow-400' : 'text-zinc-500'}`}>
          <Disc3 className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bebas text-lg tracking-wider text-white">
              {currentStation.name}
            </span>
            <span className="font-mono text-xs bg-yellow-400 text-black px-1.5 py-0.2 font-bold">
              {currentStation.freq}
            </span>
          </div>
          <div className="font-mono text-[11px] text-zinc-400 truncate max-w-[280px] sm:max-w-[340px]">
            {isPlaying ? `NOW PLAYING: ${currentStation.track}` : 'STATION TUNED • CLICK PLAY FOR BEATS'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={nextStation}
          className="bg-zinc-900 border border-yellow-400/60 hover:border-yellow-400 text-yellow-400 px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1 hover:bg-yellow-400/10 transition-colors"
          title="Switch Station"
        >
          <SkipForward className="w-3.5 h-3.5" />
          <span>SWITCH STATION</span>
        </button>

        <button
          onClick={toggleRadio}
          className={`px-4 py-1.5 font-bebas text-sm font-black border transition-all ${
            isPlaying
              ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_10px_rgba(255,230,0,0.5)]'
              : 'bg-black text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black'
          }`}
        >
          {isPlaying ? 'PAUSE RADIO' : 'TUNE IN'}
        </button>
      </div>
    </div>
  );
};
