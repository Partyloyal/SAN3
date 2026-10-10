import React, { useState } from 'react';
import { Volume2, VolumeX, Phone, Star, ShieldCheck, Menu, X, Calendar } from 'lucide-react';
import { SanAndreasBadge } from './SanAndreasBadge';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [soundActive, setSoundActive] = useState(soundEngine.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    soundEngine.enabled = !soundEngine.enabled;
    setSoundActive(soundEngine.enabled);
    if (soundEngine.enabled) {
      soundEngine.playClick();
    }
  };

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b-2 border-yellow-400">
      {/* Top Street Ticker / Territory Bar */}
      <div className="bg-yellow-400 text-black px-4 py-1 flex items-center justify-between text-xs font-bold uppercase tracking-wider font-bebas">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            LOS SANTOS BAY #1 • GANTON DETAYL SHOP
          </span>
          <span className="hidden md:inline">
            • 1024 GROVE ST, LOS SANTOS
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] font-semibold">
          <span className="hidden sm:inline">MON-SAT 8AM - 10PM</span>
          <a
            href="tel:5557262637"
            className="flex items-center gap-1 hover:underline text-black"
          >
            <Phone className="w-3 h-3" />
            <span>(555) 726-2637</span>
          </a>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <SanAndreasBadge size="sm" showSlogan={false} />
          <div className="flex flex-col">
            <span className="font-pricedown text-2xl sm:text-3xl tracking-wide text-yellow-400 group-hover:text-yellow-300 transition-colors">
              SAN ANDREAS
            </span>
            <div className="flex items-center gap-1.5 -mt-1">
              <span className="font-bebas text-xs sm:text-sm tracking-widest text-white uppercase">
                CAR WASH & DETAILING
              </span>
              <span className="text-yellow-400 font-bold text-xs">★ ★ ★ ★ ★</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-bebas text-lg tracking-wider">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-white hover:text-yellow-400 transition-colors uppercase cursor-pointer"
          >
            HQ
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="text-white hover:text-yellow-400 transition-colors uppercase cursor-pointer"
          >
            SERVICES
          </button>
          <button
            onClick={() => handleNavClick('comparison')}
            className="text-white hover:text-yellow-400 transition-colors uppercase cursor-pointer"
          >
            RESULTS
          </button>
          <button
            onClick={() => handleNavClick('ten-areas')}
            className="text-yellow-400 hover:text-white transition-colors uppercase cursor-pointer flex items-center gap-1 font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            10 AREAS
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="text-white hover:text-yellow-400 transition-colors uppercase cursor-pointer"
          >
            ABOUT US
          </button>
          <button
            onClick={() => handleNavClick('location')}
            className="text-white hover:text-yellow-400 transition-colors uppercase cursor-pointer"
          >
            LOS SANTOS MAP
          </button>
        </nav>

        {/* Action Controls & CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Audio FX Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundActive ? 'Mute sound FX' : 'Enable sound FX'}
            title={soundActive ? 'Sound FX Enabled (Click to mute)' : 'Sound FX Muted (Click to enable)'}
            className={`p-2 border transition-all ${
              soundActive
                ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400 shadow-[0_0_10px_rgba(255,230,0,0.3)]'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white'
            }`}
          >
            {soundActive ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Wanted Level / 5-Star Indicator */}
          <div className="hidden xl:flex items-center gap-1 bg-black border border-yellow-400/50 px-2.5 py-1 text-yellow-400">
            <span className="text-[10px] font-bebas tracking-widest text-zinc-400 mr-1">RATING:</span>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_4px_rgba(255,230,0,0.8)]" />
            ))}
          </div>

          {/* BOOK YOUR RIDE Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenBooking();
            }}
            className="relative group bg-yellow-400 hover:bg-yellow-300 text-black font-bebas text-lg sm:text-xl px-5 sm:px-6 py-2.5 uppercase tracking-wider font-extrabold border-2 border-black shadow-[0_0_20px_rgba(255,230,0,0.4)] active:scale-95 transition-all flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>BOOK YOUR RIDE</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-yellow-400 border border-yellow-400/50 hover:bg-yellow-400/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b-2 border-yellow-400 px-6 py-5 font-bebas text-xl space-y-4">
          <button
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left text-white hover:text-yellow-400 py-1"
          >
            HQ
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="block w-full text-left text-white hover:text-yellow-400 py-1"
          >
            SERVICES & PACKAGES
          </button>
          <button
            onClick={() => handleNavClick('comparison')}
            className="block w-full text-left text-white hover:text-yellow-400 py-1"
          >
            BEFORE & AFTER RESULTS
          </button>
          <button
            onClick={() => handleNavClick('ten-areas')}
            className="block w-full text-left text-yellow-400 font-bold hover:text-white py-1 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            10 AREAS MOST PEOPLE NEVER CLEAN
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left text-white hover:text-yellow-400 py-1"
          >
            ABOUT / BRAND PHILOSOPHY
          </button>
          <button
            onClick={() => handleNavClick('location')}
            className="block w-full text-left text-white hover:text-yellow-400 py-1"
          >
            LOS SANTOS LOCATIONS
          </button>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-sm font-sans text-zinc-400">Sound Effects</span>
            <button
              onClick={toggleSound}
              className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold"
            >
              {soundActive ? 'ENABLED' : 'MUTED'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
