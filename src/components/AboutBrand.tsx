import React from 'react';
import { ShieldCheck, Flame, Wrench, Award, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { SanAndreasBadge } from './SanAndreasBadge';

export const AboutBrand: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-black relative border-b-2 border-yellow-400 overflow-hidden">
      {/* Background Street Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Emblem Badge, Slogan, and Heritage */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-6 relative">
              <SanAndreasBadge size="xl" showSlogan={false} />
            </div>

            {/* Slogan exactly as requested: "Quality is the Difference" */}
            <div className="bg-yellow-400 text-black px-6 py-2.5 font-bebas text-2xl sm:text-3xl font-black uppercase tracking-widest shadow-[0_0_25px_rgba(255,230,0,0.5)] border-2 border-black inline-block mb-4">
              "Quality is the Difference"
            </div>

            <p className="text-zinc-400 text-sm font-mono uppercase tracking-wider mb-6">
              LOS SANTOS • ESTABLISHED 1992 • WEST COAST MASTER DETAILING
            </p>

            <div className="bg-zinc-950 border border-yellow-400/40 p-5 w-full">
              <div className="flex items-center justify-between text-xs font-mono text-yellow-400 border-b border-zinc-800 pb-2 mb-3">
                <span>STREET CREDIBILITY METER</span>
                <span className="font-bold">RESPECT +100%</span>
              </div>
              <div className="w-full bg-zinc-900 h-3 border border-yellow-400/40">
                <div className="bg-yellow-400 h-full w-[96%] shadow-[0_0_10px_#FFE600]" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mt-2">
                <span>SWIRL MARKS: 0%</span>
                <span>MIRROR REFLECTION: 99.8%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Vibe, Premium Protection, & Street-Culture Edge */}
          <div className="lg:col-span-7">
            <div className="inline-block bg-yellow-400 text-black px-3.5 py-1 font-bebas text-xs tracking-widest uppercase font-bold mb-3">
              PREMIUM AUTOMOTIVE PROTECTION
            </div>

            <h2 className="gta-headline-yellow text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
              STREET-BRED ROOTS. SURGICAL DETAILING.
            </h2>

            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-6 font-medium">
              We started out on the streets of Los Santos in the early 90s, where a clean ride wasn't just transportation—it was your reputation. If your rims were caked in brake dust or your black clearcoat was covered in spider-web swirls, you didn't roll.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
              Today, <strong className="text-yellow-400">San Andreas Car Wash</strong> pairs that uncompromising West Coast passion with modern chemistry: thick pH-neutral foam encapsulation cannons, de-ironizing chemical wheel treatments, and hydrophobic graphene sealants that keep your machine gleaming under the scorching San Andreas sun.
            </p>

            {/* Three Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-950 border border-yellow-400/40 hover:border-yellow-400 p-4 transition-all">
                <div className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bebas text-xl text-yellow-400 tracking-wider">
                  PAINT PRESERVATION
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-snug">
                  Encapsulation wash prevents clear coat micro-scratching on sensitive black paint.
                </p>
              </div>

              <div className="bg-zinc-950 border border-yellow-400/40 hover:border-yellow-400 p-4 transition-all">
                <div className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center font-bold mb-3">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-bebas text-xl text-yellow-400 tracking-wider">
                  WHEEL LAB CARE
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-snug">
                  Safe chemical dissolution for powder-coated, forged, and diamond-cut black rims.
                </p>
              </div>

              <div className="bg-zinc-950 border border-yellow-400/40 hover:border-yellow-400 p-4 transition-all">
                <div className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center font-bold mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bebas text-xl text-yellow-400 tracking-wider">
                  SPEED & PRECISION
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-snug">
                  Pit-stop precision delivery with zero shortcuts. In and out showroom ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fictional Los Santos Detail Bay Highlights */}
        <div id="location" className="mt-20 pt-16 border-t border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 border-2 border-yellow-400/50 p-6 flex flex-col justify-between">
              <div>
                <span className="text-yellow-400 font-mono text-xs font-bold">BAY #01 • MAIN GARAGE</span>
                <h4 className="font-pricedown text-2xl text-white mt-1">GANTON MOTORS BAY</h4>
                <p className="text-zinc-400 text-xs mt-2">
                  1024 Grove Street, Ganton, Los Santos. High-pressure wash tunnels & interior detailing suites.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-xs font-mono text-yellow-400">
                ACTIVE • 4 BAYS OPEN
              </div>
            </div>

            <div className="bg-zinc-950 border-2 border-yellow-400/50 p-6 flex flex-col justify-between">
              <div>
                <span className="text-yellow-400 font-mono text-xs font-bold">BAY #02 • LUXURY & EXOTICS</span>
                <h4 className="font-pricedown text-2xl text-white mt-1">VINEWOOD HILLS RETREAT</h4>
                <p className="text-zinc-400 text-xs mt-2">
                  452 Vinewood Blvd, Los Santos. Dedicated ceramic coating lab & multi-stage paint correction.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-xs font-mono text-yellow-400">
                BY APPOINTMENT ONLY
              </div>
            </div>

            <div className="bg-zinc-950 border-2 border-yellow-400/50 p-6 flex flex-col justify-between">
              <div>
                <span className="text-yellow-400 font-mono text-xs font-bold">MOBILE UNIT • STREET CREW</span>
                <h4 className="font-pricedown text-2xl text-white mt-1">RODEO MOBILE SQUAD</h4>
                <p className="text-zinc-400 text-xs mt-2">
                  We come directly to your driveway across Los Santos, Santa Maria Beach & Red County.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-xs font-mono text-yellow-400">
                DISPATCH ON CALL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
