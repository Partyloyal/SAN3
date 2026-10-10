import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
    soundEngine.playClick();
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
    soundEngine.playClick();
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingRef.current && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="comparison" className="py-20 bg-black relative border-b-2 border-yellow-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-yellow-400 text-black px-3 py-0.5 font-bebas text-xs font-bold tracking-widest uppercase mb-3">
            EVIDENCE IN THE PAINT
          </div>
          <h2 className="gta-headline-yellow text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight select-none">
            SEE THE DIFFERENCE
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Drag the yellow slider below to see how our foam wash and wheel detailing transforms road-beaten black paint into a mirror-gloss finish.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handlePointerUp}
          className="relative h-[360px] sm:h-[480px] md:h-[540px] w-full overflow-hidden border-4 border-yellow-400 select-none shadow-[0_0_35px_rgba(255,230,0,0.3)] bg-zinc-950 cursor-ew-resize"
        >
          {/* AFTER IMAGE (Clean, Glossy Mirror Black Wash & Detailing) */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
              alt="After Car Detailing - Showroom Deep Gloss Black"
              className="w-full h-full object-cover filter brightness-105 contrast-125"
            />
            {/* After Tag */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bebas text-base sm:text-lg px-4 py-1 font-black tracking-wider shadow-lg">
              AFTER: SAN ANDREAS FOAM DETAIL
            </div>
            <div className="absolute bottom-4 right-4 bg-black/85 text-yellow-400 font-mono text-xs px-3 py-1 border border-yellow-400 hidden sm:block">
              CERAMIC HYDROPHOBIC COATING • ZERO SCRATCHES
            </div>
          </div>

          {/* BEFORE IMAGE (Grime, Mud, Brake Dust - Clipped by slider) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full min-w-[320px] max-w-none">
              <img
                src="https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1600&q=85"
                alt="Before Car Wash - Road Grime and Brake Dust"
                className="w-full h-full object-cover filter contrast-90 brightness-75 sepia-[0.35]"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%',
                  maxWidth: 'none',
                }}
              />
              {/* Dusty grime overlay layer */}
              <div className="absolute inset-0 bg-yellow-950/20 mix-blend-multiply" />
            </div>

            {/* Before Tag */}
            <div className="absolute top-4 left-4 bg-black/90 text-zinc-300 border-2 border-zinc-600 font-bebas text-base sm:text-lg px-4 py-1 font-bold tracking-wider">
              BEFORE: STREET GRIME & BRAKE DUST
            </div>
            <div className="absolute bottom-4 left-4 bg-black/85 text-zinc-400 font-mono text-xs px-3 py-1 border border-zinc-700 hidden sm:block">
              ROAD SALT • OXIDATION • CONTAMINANTS
            </div>
          </div>

          {/* Draggable Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 z-30 w-1 bg-yellow-400 shadow-[0_0_15px_#FFE600] flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="pointer-events-auto w-10 h-10 -ml-5 bg-yellow-400 text-black border-2 border-black flex items-center justify-center cursor-ew-resize shadow-[0_0_20px_rgba(255,230,0,0.8)] active:scale-110 transition-transform"
            >
              <MoveHorizontal className="w-5 h-5 font-black" />
            </div>
          </div>
        </div>

        {/* Quick presets buttons */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setSliderPosition(20)}
            className="text-xs font-mono bg-zinc-900 border border-zinc-700 hover:border-yellow-400 text-zinc-300 hover:text-yellow-400 px-3 py-1"
          >
            VIEW MOSTLY CLEAN (80%)
          </button>
          <button
            onClick={() => setSliderPosition(50)}
            className="text-xs font-mono bg-zinc-900 border border-zinc-700 hover:border-yellow-400 text-zinc-300 hover:text-yellow-400 px-3 py-1"
          >
            50 / 50 SPLIT
          </button>
          <button
            onClick={() => setSliderPosition(80)}
            className="text-xs font-mono bg-zinc-900 border border-zinc-700 hover:border-yellow-400 text-zinc-300 hover:text-yellow-400 px-3 py-1"
          >
            VIEW MOSTLY DIRTY (20%)
          </button>
        </div>
      </div>
    </section>
  );
};
