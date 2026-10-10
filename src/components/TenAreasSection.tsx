import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface TenAreasSectionProps {
  onOpenBooking: () => void;
}

interface AreaDetail {
  id: number;
  number: string;
  name: string;
  arabicName: string;
  category: 'interior' | 'exterior';
  categoryLabel: string;
  image: string;
  hiddenGrime: string;
  healthRisk: string;
  proSolution: string;
  toolUsed: string;
}

const AREAS_DATA: AreaDetail[] = [
  {
    id: 1,
    number: '1',
    name: 'Steering Wheel',
    arabicName: 'طارة القيادة',
    category: 'interior',
    categoryLabel: 'High Touch Cabin',
    image: 'https://images.unsplash.com/photo-1541348263662-e0c826612108?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Hand sweat, skin oils, makeup, food grease & over 700 bacteria types per square inch.',
    healthRisk: 'Staphylococcus bacteria colonies, slippery grip, shiny grease coating & premature leather cracking.',
    proSolution: 'pH-neutral foaming leather shampoo agitated with ultra-soft horsehair brush, followed by satin matte UV ceramic conditioning.',
    toolUsed: 'Boar & Horsehair Brushes + Steam Extraction'
  },
  {
    id: 2,
    number: '2',
    name: 'Air Vents',
    arabicName: 'فتحات التكييف',
    category: 'interior',
    categoryLabel: 'Climate & Air Quality',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Deep micro-dust, allergen pollen, mold spores, and stagnant moisture inside vent louvers.',
    healthRisk: 'Musty odors upon turning on AC, respiratory irritation, airborne dust blown straight into cabin occupants.',
    proSolution: '220°F pressurized antibacterial dry steam purge through internal louver channels with anti-fungal detailing agent.',
    toolUsed: '220°F Dry Steam Wand + Detail Swabs'
  },
  {
    id: 3,
    number: '3',
    name: 'Cup Holders',
    arabicName: 'حوامل الأكواب',
    category: 'interior',
    categoryLabel: 'Center Console',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Sticky dried soda syrup, spilled coffee drips, coin grime, and crumbs baked into rubber base crevices.',
    healthRisk: 'Sticky touch, foul fermented odor, and attractant for insects and sticky film.',
    proSolution: 'Enzyme-based degreaser soak, hot steam dissolving agitation, extraction, and non-stick ceramic protective wipe.',
    toolUsed: 'Enzyme Cleaner + Boar Bristle Detailer'
  },
  {
    id: 4,
    number: '4',
    name: 'Seat Rails',
    arabicName: 'مجاري ومسارات المقاعد',
    category: 'interior',
    categoryLabel: 'Floor Mechanics',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Petrified french fries, dropped coins, hair, and gravel jammed inside metal slider tracks and springs.',
    healthRisk: 'Seat slider jamming, mechanical wear, rodent attractant, and foul decay odors.',
    proSolution: 'High-velocity 120 PSI pneumatic blowgun purge, micro-crevice vacuum attachments, and dry PTFE lubricant recoat.',
    toolUsed: 'Tornador Air Gun + Micro-Crevice Vacuum'
  },
  {
    id: 5,
    number: '5',
    name: 'Under Seats',
    arabicName: 'أسفل المقاعد',
    category: 'interior',
    categoryLabel: 'Cabin Floor',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Lost trash, spilled liquids soaked into carpet underlay, forgotten food items, and damp mildew.',
    healthRisk: 'Deep mold spores, lingering cabin stink, and rust on seat frame bolts.',
    proSolution: 'Full seat forward/rear electronic adjustment, high-suction vortex vacuuming, and heated carpet shampoo extraction.',
    toolUsed: 'Commercial Heated Carpet Extractor'
  },
  {
    id: 6,
    number: '6',
    name: 'Seat Belt',
    arabicName: 'حزام الأمان',
    category: 'interior',
    categoryLabel: 'Safety Webbing',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Accumulated neck sweat, skin sebum, sunscreen transfer, body lotions, and dark stain lines.',
    healthRisk: 'Foul odor next to passenger face, stiff fabric friction, and stained clothing transfer.',
    proSolution: 'Full-length webbing pull-out, gentle citrus degreaser brush-in, micro-fiber steam wrap, and conditioned air dry.',
    toolUsed: 'Citrus Fiber Cleanser + Microfiber Steam Towels'
  },
  {
    id: 7,
    number: '7',
    name: 'Pedals',
    arabicName: 'دواسات القيادة (البنزين والفرامل)',
    category: 'interior',
    categoryLabel: 'Driver Footwell',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Caked shoe mud, sidewalk grease, winter road salt, and ground-in abrasive stones in rubber grooves.',
    healthRisk: 'Dangerous loss of shoe traction in emergencies, rubber rot, and unsightly dirty footwell.',
    proSolution: 'Stiff nylon scrubbing with heavy-duty alkaline degreaser, high-pressure steam rinse, and zero-slip rubber rejuvenation.',
    toolUsed: 'Stiff Nylon Brush + Anti-Slip Restorer'
  },
  {
    id: 8,
    number: '8',
    name: 'Door Jambs',
    arabicName: 'حواف ومفصلات الأبواب',
    category: 'exterior',
    categoryLabel: 'Body Seams & Hinges',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Black hinge grease mixed with road dust, dried wash soap scum, hard water mineral deposits, and grime drips.',
    healthRisk: 'Dirty clothes when entering/exiting, rust around drainage holes, and etched paint clearcoat.',
    proSolution: 'Touchless low-pressure foam rinse, citrus degreaser detail on hinges, micro-fiber wipe, and quick ceramic sealant wax.',
    toolUsed: 'Citrus APC + Ceramic Spray Wax Sealant'
  },
  {
    id: 9,
    number: '9',
    name: 'Fuel Door',
    arabicName: 'غطاء وخزان الوقود',
    category: 'exterior',
    categoryLabel: 'Exterior Flap',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Diesel/petrol overflow soot, road sand, corrosive chemical residue, and water pooled behind the rubber boot.',
    healthRisk: 'Fuel stains eating away clear coat, gritty cap threads leading to fuel tank contaminants.',
    proSolution: 'Foaming alkaline brush agitation, cotton-swab detail around drainage hole, and hydrophobic protective coating.',
    toolUsed: 'Soft Boar Hair Brush + Precision Swabs'
  },
  {
    id: 10,
    number: '10',
    name: 'Trunk Lip',
    arabicName: 'حافة ومزاريب الشنطة',
    category: 'exterior',
    categoryLabel: 'Rear Drainage Gutters',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
    hiddenGrime: 'Rotting tree leaves, pine needles, drainage sludge, sand, and black mold under the weatherstrip seal.',
    healthRisk: 'Clogged trunk drains causing trunk floor flooding, spare tire rust, and foul damp musty odors.',
    proSolution: 'Sludge extraction, deep pressure flush of runoff channels, and rubber weatherstrip silicone conditioning.',
    toolUsed: 'Gutter Flush Wand + Silicone Seal Conditioner'
  }
];

export const TenAreasSection: React.FC<TenAreasSectionProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'interior' | 'exterior'>('all');
  const [selectedArea, setSelectedArea] = useState<AreaDetail | null>(null);

  const filteredAreas = AREAS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="ten-areas" className="py-24 bg-zinc-950 relative border-b-2 border-yellow-400 overflow-hidden">
      {/* Background Street Texture Accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFE600 1px, transparent 1px), linear-gradient(90deg, #FFE600 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Matching User Screenshot Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-black border border-yellow-400/80 px-4 py-1.5 mb-5 shadow-[0_0_15px_rgba(255,230,0,0.3)]">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="font-bebas text-sm sm:text-base tracking-widest text-yellow-400 uppercase font-bold">
              SAN ANDREAS DEEP CLEAN PROTOCOL • ZERO COMPROMISE
            </span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none mb-3">
            <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">10 </span>
            <span className="gta-headline-yellow">AREAS</span>
          </h2>

          <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-zinc-100 tracking-wider uppercase mb-6 drop-shadow-md">
            MOST PEOPLE NEVER CLEAN
          </h3>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Standard tunnel washes and basic hand washes skip these 10 hidden hotspots completely.
            At San Andreas Detailing, every single deep detail package methodically inspects, steam-sanitizes,
            and restores every single one.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-8">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveFilter('all');
              }}
              className={`px-5 py-2 font-bebas text-base sm:text-lg tracking-wider uppercase transition-all border-2 ${
                activeFilter === 'all'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-[0_0_15px_rgba(255,230,0,0.5)]'
                  : 'bg-black/80 text-zinc-300 border-zinc-700 hover:border-yellow-400 hover:text-white'
              }`}
            >
              ALL 10 AREAS (1-10)
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveFilter('interior');
              }}
              className={`px-5 py-2 font-bebas text-base sm:text-lg tracking-wider uppercase transition-all border-2 ${
                activeFilter === 'interior'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-[0_0_15px_rgba(255,230,0,0.5)]'
                  : 'bg-black/80 text-zinc-300 border-zinc-700 hover:border-yellow-400 hover:text-white'
              }`}
            >
              CABIN & CONTROLS (1-7)
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveFilter('exterior');
              }}
              className={`px-5 py-2 font-bebas text-base sm:text-lg tracking-wider uppercase transition-all border-2 ${
                activeFilter === 'exterior'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-[0_0_15px_rgba(255,230,0,0.5)]'
                  : 'bg-black/80 text-zinc-300 border-zinc-700 hover:border-yellow-400 hover:text-white'
              }`}
            >
              CHASSIS SEAMS & JUTTERS (8-10)
            </button>
          </div>
        </div>

        {/* 10 Areas Grid: High-Impact Cards Styled with Number Badges from Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedArea(area);
              }}
              className="group bg-black/90 border-2 border-zinc-800 hover:border-yellow-400 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(255,230,0,0.3)] cursor-pointer"
            >
              {/* Card Image Header with Number Badge */}
              <div className="relative h-44 overflow-hidden bg-zinc-900 border-b border-zinc-800">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Exact Circle Number Badge from the Screenshot */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-black font-bebas font-black text-lg flex items-center justify-center shadow-[0_0_10px_rgba(255,230,0,0.7)] border-2 border-black">
                    {area.number}
                  </div>
                  <span className="bg-black/80 text-yellow-400 font-bebas text-xs px-2 py-0.5 border border-yellow-400/50 uppercase tracking-wider">
                    {area.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 bg-black/80 text-zinc-300 font-mono text-[10px] px-1.5 py-0.5 border border-zinc-700 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-yellow-400" />
                  <span>TAP FOR PROTOCOL</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bebas text-xl sm:text-2xl text-yellow-400 tracking-wider group-hover:text-yellow-300 transition-colors uppercase flex items-center justify-between">
                    <span>{area.name}</span>
                  </h4>
                  <div className="text-zinc-400 text-xs font-sans mb-3">{area.arabicName}</div>

                  <div className="bg-zinc-900/80 p-2.5 border border-zinc-800 mb-3 text-xs">
                    <div className="text-yellow-400 font-mono font-bold text-[11px] mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0" />
                      <span>WHAT LURKS:</span>
                    </div>
                    <p className="text-zinc-300 leading-snug line-clamp-3">
                      {area.hiddenGrime}
                    </p>
                  </div>
                </div>

                {/* Solution Summary */}
                <div className="border-t border-zinc-800/80 pt-3">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>SAN ANDREAS RESTORATION</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 line-clamp-2">
                    {area.proSolution}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="bg-zinc-900 px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <span className="font-bold">DEEP CLEANED 100%</span>
                <span className="font-bold uppercase">DETAILS →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Master Detailing Callout Banner */}
        <div className="mt-16 bg-black border-2 border-yellow-400 p-6 sm:p-10 shadow-[0_0_35px_rgba(255,230,0,0.25)] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-yellow-400 font-bebas text-lg tracking-widest uppercase mb-1">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <span>ALL 10 AREAS INCLUDED IN EVERY FULL DETAIL</span>
            </div>
            <h4 className="font-pricedown text-3xl sm:text-4xl text-white uppercase tracking-wider mb-2">
              DON&apos;T LEAVE DIRT BEHIND IN LOS SANTOS
            </h4>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Book our Full Restoration Detail or Diamond Ceramic Bundle today. Our certified technicians
              guarantee zero shortcuts across all 10 hidden areas.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenBooking();
              }}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bebas text-2xl sm:text-3xl px-8 py-3.5 uppercase tracking-wider font-black border-2 border-black shadow-[0_0_25px_rgba(255,230,0,0.6)] active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>BOOK 10-AREA FULL DETAIL</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Deep Dive Inspection Modal for Selected Area */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-zinc-950 border-4 border-yellow-400 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,230,0,0.4)] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-yellow-400 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-bebas font-black text-2xl flex items-center justify-center border-2 border-black">
                  {selectedArea.number}
                </div>
                <div>
                  <h3 className="font-pricedown text-2xl sm:text-3xl text-yellow-400 uppercase tracking-wide">
                    {selectedArea.name}
                  </h3>
                  <div className="text-zinc-400 font-sans text-xs sm:text-sm">
                    {selectedArea.arabicName} • {selectedArea.categoryLabel}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedArea(null);
                }}
                className="text-zinc-400 hover:text-yellow-400 font-mono text-2xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden border-2 border-zinc-800 mb-6">
              <img
                src={selectedArea.image}
                alt={selectedArea.name}
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute bottom-2 left-2 bg-black/90 text-yellow-400 font-mono text-xs px-2.5 py-1 border border-yellow-400">
                PRO TOOL: {selectedArea.toolUsed}
              </div>
            </div>

            {/* Detailed Inspection Info */}
            <div className="space-y-4 mb-8">
              <div className="bg-zinc-900 border-l-4 border-amber-500 p-4">
                <div className="text-amber-400 font-mono font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Hidden Grime & What Hides Inside:</span>
                </div>
                <p className="text-zinc-200 text-sm leading-relaxed">
                  {selectedArea.hiddenGrime}
                </p>
              </div>

              <div className="bg-zinc-900 border-l-4 border-red-500 p-4">
                <div className="text-red-400 font-mono font-bold text-xs uppercase mb-1">
                  Damage & Health Risk If Ignored:
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {selectedArea.healthRisk}
                </p>
              </div>

              <div className="bg-zinc-900 border-l-4 border-yellow-400 p-4">
                <div className="text-yellow-400 font-mono font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Our Master Treatment Protocol:</span>
                </div>
                <p className="text-white text-sm leading-relaxed font-medium">
                  {selectedArea.proSolution}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-end border-t border-zinc-800 pt-5">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedArea(null);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 text-zinc-300 font-bebas text-lg uppercase tracking-wider hover:bg-zinc-800 cursor-pointer"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedArea(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-8 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bebas text-xl font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,230,0,0.5)] cursor-pointer"
              >
                BOOK FULL DETAIL NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
