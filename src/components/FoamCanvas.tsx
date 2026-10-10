import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/audio';

interface FoamDrop {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  dripLength: number;
  dripProgress: number;
  color: string;
}

interface SprayParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  opacity: number;
}

export const FoamCanvas: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMouseDownRef = useRef(false);
  const foamDropsRef = useRef<FoamDrop[]>([]);
  const sprayParticlesRef = useRef<SprayParticle[]>([]);
  const animFrameIdRef = useRef<number>(0);
  const [foamLevel, setFoamLevel] = useState<number>(35);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initial ambient foam clusters (simulating snow foam covering the black car)
    const initialFoams: FoamDrop[] = [];
    for (let i = 0; i < 65; i++) {
      initialFoams.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.85),
        radius: Math.random() * 26 + 12,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.55,
        dripLength: Math.random() * 90 + 30,
        dripProgress: Math.random() * 30,
        color: '#FFFFFF',
      });
    }
    foamDropsRef.current = initialFoams;

    const spawnSpray = (x: number, y: number, count = 12) => {
      soundEngine.playSpraySound(200);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 3;
        sprayParticlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 1.5,
          size: Math.random() * 7 + 3,
          life: 0,
          maxLife: Math.random() * 35 + 20,
          opacity: 0.9,
        });
      }

      // Add foam clump at impact
      foamDropsRef.current.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        radius: Math.random() * 30 + 15,
        speedY: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: 0.85,
        dripLength: Math.random() * 120 + 40,
        dripProgress: 0,
        color: '#FFFFFF',
      });
    };

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update foam drops (creamy snow foam clinging & dripping down)
      const drops = foamDropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Dripping trail
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${drop.alpha * 0.85})`;
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.fill();

        // Drip tail
        if (drop.dripProgress > 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${drop.alpha * 0.7})`;
          ctx.lineWidth = Math.max(3, drop.radius * 0.6);
          ctx.lineCap = 'round';
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + drop.speedX * drop.dripProgress, drop.y + drop.dripProgress);
          ctx.stroke();

          // Drip droplet at the bottom
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${drop.alpha})`;
          ctx.arc(
            drop.x + drop.speedX * drop.dripProgress,
            drop.y + drop.dripProgress,
            drop.radius * 0.45,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Inner bubble highlight
        ctx.beginPath();
        ctx.fillStyle = `rgba(240, 245, 255, ${drop.alpha * 0.4})`;
        ctx.arc(drop.x - drop.radius * 0.25, drop.y - drop.radius * 0.25, drop.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Motion update
        drop.dripProgress += drop.speedY * 1.2;
        drop.y += drop.speedY * 0.4;
        drop.x += drop.speedX;

        // Reset if drifted past bottom
        if (drop.y > height + 60) {
          drop.y = -drop.radius;
          drop.x = Math.random() * width;
          drop.dripProgress = 0;
          drop.alpha = Math.random() * 0.4 + 0.5;
        }
      }

      // 2. Draw and update high-pressure spray water / mist particles
      const particles = sprayParticlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.vx *= 0.96; // air drag
        p.opacity = 1 - p.life / p.maxLife;

        ctx.beginPath();
        // High contrast yellow spray droplets mixed with bright foam mist
        const isAccent = i % 5 === 0;
        ctx.fillStyle = isAccent
          ? `rgba(255, 230, 0, ${p.opacity * 0.8})`
          : `rgba(255, 255, 255, ${p.opacity * 0.9})`;
        ctx.arc(p.x, p.y, p.size * (1 - (p.life / p.maxLife) * 0.3), 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse & Touch interaction for manual spraying
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isMouseDownRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      spawnSpray(clientX - rect.left, clientY - rect.top, 20);
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDownRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      spawnSpray(clientX - rect.left, clientY - rect.top, 8);
    };

    const onPointerUp = () => {
      isMouseDownRef.current = false;
    };

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameIdRef.current);
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [isActive]);

  const blastSnowFoamCannon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    soundEngine.playSpraySound(600);

    const w = canvas.width;
    const h = canvas.height;

    // Burst 100 drops of thick foam
    for (let i = 0; i < 40; i++) {
      sprayParticlesRef.current.push({
        x: w * 0.2 + (Math.random() - 0.5) * 100,
        y: h * 0.45 + (Math.random() - 0.5) * 80,
        vx: (Math.random() * 14 + 6) * (Math.random() > 0.5 ? 1 : -1),
        vy: (Math.random() - 0.5) * 12,
        size: Math.random() * 8 + 4,
        life: 0,
        maxLife: 40,
        opacity: 1,
      });
    }

    // Add extra dripping foam clusters
    for (let i = 0; i < 20; i++) {
      foamDropsRef.current.push({
        x: Math.random() * w,
        y: Math.random() * (h * 0.6),
        radius: Math.random() * 32 + 15,
        speedY: Math.random() * 1.2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: 0.9,
        dripLength: Math.random() * 150 + 60,
        dripProgress: 0,
        color: '#FFFFFF',
      });
    }

    setFoamLevel((prev) => Math.min(100, prev + 15));
  };

  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair touch-none select-none"
        title="Click & Drag to blast high pressure snow foam"
      />
      {/* Interactive Trigger Button at bottom-right of hero banner */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={blastSnowFoamCannon}
          className="group relative inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bebas text-lg px-4 py-2 border-2 border-black shadow-[0_0_20px_rgba(255,230,0,0.4)] active:scale-95 transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-black group-hover:scale-125 transition-transform" />
          <span>BLAST SNOW FOAM</span>
          <span className="text-xs font-mono bg-black text-yellow-400 px-1.5 py-0.5 ml-1">PRESS</span>
        </button>
      </div>
    </div>
  );
};
