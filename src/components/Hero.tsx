import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [videoSrc, setVideoSrc] = useState<string>('/gemini_generated_video_94a8f82c.mp4');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Restore any previously user-uploaded video from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sa_hero_custom_video');
      if (saved) {
        setVideoSrc(saved);
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  // Ensure continuous looping and auto-recovery if playback pauses or stalls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial play assurance
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoSrc]);

  const processVideoFile = (file: File) => {
    soundEngine.playClick();
    const objectUrl = URL.createObjectURL(file);
    setVideoSrc(objectUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      processVideoFile(file);
    }
  };

  return (
    <section
      id="hero"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-transparent border-b-2 border-yellow-400"
    >
      {/* Locked Fixed Background Video: Stays fixed in the viewport and loops continuously */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=2000&q=85"
          src={"gemini_generated_video_94a8f82c.mp4"}
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => {});
          }}
          className="w-full h-full object-cover object-center scale-100"
        />
      </div>



      {/* Centered Compact Glowing Neon "EXPLORE SERVICES" Badge */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center select-none pointer-events-auto">
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playClick();
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          title="Explore Services"
        >
          {/* Neon-lit rounded frame matching user's reference image */}
          <div className="flex flex-col items-center justify-center bg-black/90 hover:bg-black border-[2.5px] border-yellow-400 rounded-xl sm:rounded-2xl px-6 py-2.5 sm:px-8 sm:py-3.5 shadow-[0_0_22px_rgba(255,230,0,0.75),0_0_45px_rgba(255,230,0,0.4),inset_0_0_12px_rgba(255,230,0,0.25)] transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(255,230,0,0.95),0_0_60px_rgba(255,230,0,0.6),inset_0_0_16px_rgba(255,230,0,0.35)] group-hover:border-yellow-300">
            <span className="font-pricedown text-lg sm:text-2xl md:text-[28px] tracking-widest text-yellow-300 uppercase drop-shadow-[0_0_12px_rgba(255,230,0,0.85)] leading-tight">
              EXPLORE SERVICES
            </span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 stroke-[3.5] drop-shadow-[0_0_10px_rgba(255,230,0,1)] animate-bounce mt-1" />
          </div>
        </a>
      </div>
    </section>
  );
};
