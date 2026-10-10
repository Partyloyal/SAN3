import React from 'react';
import { Droplet, Disc, Sparkles, Check, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
  recommended?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'foam-wash',
    title: 'Full Body Foam Wash',
    tagline: 'Aggressive Snow Foam Encapsulation & Scratch-Free Hand Detailing',
    price: '$65',
    duration: '45 MINS',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    features: [
      'High-pressure pre-rinse decontaminating road grit & heavy grime',
      'Dual-action ultra-thick snow foam bath with pH-neutral active suds',
      'Two-bucket method with grit guards & plush microfiber mitts',
      'Spot-free deionized water rinse & filtered warm air touchless dry',
      'Quick ceramic sealant boost for immediate hydrophobic slick gloss',
    ],
    recommended: false,
  },
  {
    id: 'rims-tires',
    title: 'Rims & Tire Detailing',
    tagline: 'Deep Barrel Chemical Decontamination & Satin Deep-Black Dressing',
    price: '$85',
    duration: '35 MINS',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
    features: [
      'Acid-free iron decontamination dissolving stubborn burnt brake dust',
      'Deep wheel barrel scrub with soft microfiber woolies & barrel brushes',
      'Brake caliper & wheel hub detailed face scrub',
      'Wheel arch blowout and fender liner degrease',
      'Anti-sling silicone-free satin tire dressing with UV protection',
    ],
    recommended: true,
  },
  {
    id: 'interior-resto',
    title: 'Interior Restoration',
    tagline: 'Full Cabin Steam Extraction, Leather Reconditioning & Odor Neutralization',
    price: '$110',
    duration: '60 MINS',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    features: [
      'High-power vortex vacuuming of carpets, seats, crevices & trunk',
      '220°F antibacterial steam sanitization for AC vents and consoles',
      'Fine detailing brushes for buttons, air vents, dials & stitching',
      'Premium matte leather conditioning & vinyl UV shield',
      'Anti-glare streak-free glass clarity + Signature West Coast scent',
    ],
    recommended: false,
  },
];

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 bg-black relative border-b-2 border-yellow-400">
      {/* Background street ambiance grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFE600 1px, transparent 1px), linear-gradient(90deg, #FFE600 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Exactly as requested: "PREP DONE RIGHT. RESULTS DONE BETTER." */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block bg-yellow-400 text-black px-4 py-1 font-bebas text-sm tracking-widest font-bold uppercase mb-4 shadow-[0_0_15px_rgba(255,230,0,0.4)]">
            LOS SANTOS DETAIL MENU • ZERO COMPROMISE
          </div>

          <h2 className="gta-headline-yellow text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-tight select-none">
            PREP DONE RIGHT. RESULTS DONE BETTER.
          </h2>

          <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            We don't do gas station scratch tunnels. Every vehicle that rolls into our Los Santos bay
            gets surgical preparation, premium chemical chemistry, and ruthless attention to detail.
          </p>
        </div>

        {/* Services Cards Grid: Dark black cards with glowing yellow borders or accents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`group relative bg-zinc-950 border-2 rounded-none flex flex-col justify-between transition-all duration-300 ${
                service.recommended
                  ? 'border-yellow-400 shadow-[0_0_30px_rgba(255,230,0,0.25)]'
                  : 'border-yellow-400/40 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(255,230,0,0.3)]'
              }`}
            >
              {/* Recommended Ribbon */}
              {service.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 bg-yellow-400 text-black px-4 py-0.5 font-bebas text-sm font-bold tracking-widest shadow-md">
                  MOST POPULAR IN LOS SANTOS
                </div>
              )}

              <div>
                {/* Visual Card Image with Foam/Spray Overlay */}
                <div className="relative h-60 overflow-hidden border-b-2 border-yellow-400/40">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover filter brightness-90 contrast-125 group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Corner Accent Badge */}
                  <div className="absolute top-3 right-3 bg-black/90 border border-yellow-400 px-3 py-1 flex items-center gap-1.5 text-yellow-400 font-mono text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>

                  {/* Title overlay on bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-pricedown text-3xl sm:text-4xl text-yellow-400 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6">
                  <p className="text-sm text-zinc-300 font-medium mb-5 leading-snug">
                    {service.tagline}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-none bg-yellow-400 text-black flex items-center justify-center font-bold text-[10px]">
                          ✓
                        </div>
                        <span className="text-xs sm:text-sm text-zinc-300 font-sans leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Booking Trigger */}
              <div className="p-6 pt-0 border-t border-zinc-900 mt-2">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-bebas text-sm tracking-wider text-zinc-400 uppercase">
                    STARTING AT
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-pricedown text-4xl text-yellow-400">
                      {service.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">/ SESSION</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectService(service.id);
                  }}
                  className={`w-full py-3 px-4 font-bebas text-xl uppercase tracking-wider font-black flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                    service.recommended
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-black shadow-[0_0_15px_rgba(255,230,0,0.35)]'
                      : 'bg-black hover:bg-yellow-400 text-yellow-400 hover:text-black border-yellow-400'
                  }`}
                >
                  <span>BOOK THIS SERVICE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Master Detailing Package Banner */}
        <div className="mt-14 bg-zinc-950 border-2 border-yellow-400 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_35px_rgba(255,230,0,0.2)]">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-block bg-yellow-400 text-black font-bebas text-xs px-2.5 py-0.5 font-bold uppercase tracking-widest mb-2">
                THE GROVE STREET COMPLETE TRANSFORMATION
              </div>
              <h3 className="font-pricedown text-3xl sm:text-4xl text-yellow-400 tracking-wide">
                SAN ANDREAS MASTER CERAMIC BUNDLE
              </h3>
              <p className="text-zinc-300 text-sm mt-2 leading-relaxed">
                Combine Full Body Snow Foam + Deep Rim & Caliper Decon + Full Interior Steam Restoration + 1-Year Graphene Ceramic Spray Shield. Save $40 and elevate your ride to show-floor readiness.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <div className="text-center sm:text-right">
                <div className="text-xs text-zinc-400 font-mono line-through">$260 VALUE</div>
                <div className="font-pricedown text-4xl text-yellow-400">$220 ONLY</div>
              </div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onSelectService('master-bundle');
                }}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bebas text-2xl px-8 py-3.5 uppercase tracking-wider font-extrabold border-2 border-black shadow-[0_0_20px_rgba(255,230,0,0.4)] active:scale-95 transition-all"
              >
                LOCK IN BUNDLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
