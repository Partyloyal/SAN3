import React from 'react';
import { MapPin, Phone, Mail, Clock, Radio, Instagram, Youtube, Twitter, Disc3, ShieldAlert } from 'lucide-react';
import { SanAndreasBadge } from './SanAndreasBadge';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-yellow-400 border-t-4 border-yellow-400 pt-16 pb-12 selection:bg-yellow-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Brand & Badge */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <SanAndreasBadge size="sm" showSlogan={false} />
              <div>
                <span className="font-pricedown text-2xl tracking-wide text-yellow-400 block">
                  SAN ANDREAS
                </span>
                <span className="font-bebas text-xs tracking-widest text-yellow-400/80 uppercase block">
                  CAR WASH & DETAILING
                </span>
              </div>
            </div>
            <p className="text-xs text-yellow-400/80 leading-relaxed font-sans mb-4">
              The premier West Coast automotive wash and preservation lab. Aggressive snow foam, surgical wheel care, and interior restorations since 1992.
            </p>
            <div className="bg-yellow-400 text-black px-3 py-1 font-bebas text-sm font-black tracking-wider uppercase">
              "Quality is the Difference"
            </div>
          </div>

          {/* Column 2: Los Santos Location & Address */}
          <div>
            <h4 className="font-pricedown text-xl text-yellow-400 mb-4 tracking-wider flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>LOS SANTOS HEADQUARTERS</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-sans text-yellow-400/90">
              <p className="leading-snug">
                <strong className="text-yellow-400 block font-mono">MAIN DETAIL BAY:</strong>
                1024 Grove Street, Ganton<br />
                Los Santos, San Andreas 90210
              </p>
              <p className="leading-snug">
                <strong className="text-yellow-400 block font-mono">VINEWOOD APPOINTMENTS:</strong>
                452 Vinewood Blvd, Los Santos, SA
              </p>
              <p className="text-[11px] font-mono text-yellow-400/70 pt-1">
                TERRITORY: GANTON • VINEWOOD • RODEO • IDLEWOOD
              </p>
            </div>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h4 className="font-pricedown text-xl text-yellow-400 mb-4 tracking-wider flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>DISPATCH & HOURS</span>
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm font-sans text-yellow-400/90">
              <a
                href="tel:5557262637"
                onClick={() => soundEngine.playClick()}
                className="flex items-center gap-2 hover:underline text-yellow-400 font-mono font-bold"
              >
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>(555) 726-2637 [SAN-ANDREAS]</span>
              </a>
              <div className="flex items-center gap-2 text-yellow-400/90 font-mono">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>dispatch@sanandreaswash.ls</span>
              </div>
              <div className="pt-2 border-t border-yellow-400/30 text-xs font-mono">
                <div className="flex justify-between py-0.5">
                  <span>MON - SAT:</span>
                  <span className="font-bold text-yellow-400">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>SUNDAY:</span>
                  <span className="font-bold text-yellow-400">10:00 - 18:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Radio Los Santos & Social Icons */}
          <div>
            <h4 className="font-pricedown text-xl text-yellow-400 mb-4 tracking-wider flex items-center gap-2">
              <Radio className="w-5 h-5 text-yellow-400" />
              <span>RADIO LOS SANTOS</span>
            </h4>
            <div className="bg-black border border-yellow-400 p-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-yellow-400">
                <Disc3 className="w-4 h-4 animate-spin text-yellow-400" />
                <span className="font-bold">ON AIR: 106.1 FM</span>
              </div>
              <p className="text-[11px] text-yellow-400/80 mt-1 font-mono">
                West Coast Classics & 90s G-Funk while your whip gets foamed.
              </p>
            </div>

            <div className="text-xs font-bebas tracking-wider text-yellow-400 uppercase mb-2">
              FOLLOW THE CREW:
            </div>
            {/* Social Media Icons in Bright Yellow */}
            <div className="flex items-center gap-3">
              <a
                href="#hero"
                aria-label="Instagram"
                onClick={() => soundEngine.playClick()}
                className="w-9 h-9 border border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition-all shadow-[0_0_8px_rgba(255,230,0,0.2)]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#hero"
                aria-label="YouTube"
                onClick={() => soundEngine.playClick()}
                className="w-9 h-9 border border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition-all shadow-[0_0_8px_rgba(255,230,0,0.2)]"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#hero"
                aria-label="X / Twitter"
                onClick={() => soundEngine.playClick()}
                className="w-9 h-9 border border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition-all shadow-[0_0_8px_rgba(255,230,0,0.2)]"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-yellow-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-yellow-400/80">
          <div>
            © 2026 SAN ANDREAS CAR WASH & DETAILING CO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-yellow-400">
            <span>LOS SANTOS, SAN ANDREAS</span>
            <span>•</span>
            <span className="font-bebas text-sm text-yellow-400">RESPECT +</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
