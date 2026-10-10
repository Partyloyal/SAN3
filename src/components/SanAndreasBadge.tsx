import React from 'react';

interface BadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
}

export const SanAndreasBadge: React.FC<BadgeProps> = ({
  className = '',
  size = 'md',
  showSlogan = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-60 h-60',
  };

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 320"
        className={`${sizeMap[size]} drop-shadow-[0_0_20px_rgba(255,230,0,0.4)] transition-transform duration-300 hover:scale-105`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Hex / Shield Glow border */}
        <circle cx="160" cy="160" r="150" fill="#000000" stroke="#FFE600" strokeWidth="6" />
        <circle cx="160" cy="160" r="140" fill="#050505" stroke="#FFE600" strokeWidth="2" strokeDasharray="6 4" />

        {/* Outer Gear Teeth / Rim Spoke Accents */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <rect
              key={i}
              x="156"
              y="12"
              width="8"
              height="10"
              rx="2"
              fill="#FFE600"
              transform={`rotate(${angle} 160 160)`}
            />
          );
        })}

        {/* Inner Dark Rim Wheel Background */}
        <circle cx="160" cy="160" r="126" fill="#0A0A0A" stroke="#FFE600" strokeWidth="3" />

        {/* Circular Curved Text Path */}
        <defs>
          <path
            id="textPathUpper"
            d="M 52,160 A 108,108 0 0,1 268,160"
            fill="none"
          />
          <path
            id="textPathLower"
            d="M 268,160 A 108,108 0 0,1 52,160"
            fill="none"
          />
        </defs>

        {/* GTA Stars Arc */}
        <g fill="#FFE600">
          <polygon points="160,54 163,63 172,63 165,68 167,77 160,72 153,77 155,68 148,63 157,63" />
          <polygon points="135,59 137,67 145,67 139,71 141,79 135,75 129,79 131,71 125,67 133,67" transform="rotate(-10 135 69)" />
          <polygon points="185,59 187,67 195,67 189,71 191,79 185,75 179,79 181,71 175,67 183,67" transform="rotate(10 185 69)" />
          <polygon points="112,68 114,75 121,75 116,79 118,86 112,82 106,86 108,79 103,75 110,75" transform="rotate(-20 112 77)" />
          <polygon points="208,68 210,75 217,75 212,79 214,86 208,82 202,86 204,79 199,75 206,75" transform="rotate(20 208 77)" />
        </g>

        {/* Central Shield Graphic */}
        <path
          d="M 160 84 L 214 104 C 214 170 160 216 160 216 C 160 216 106 170 106 104 Z"
          fill="#111111"
          stroke="#FFE600"
          strokeWidth="4"
        />

        {/* Pressure Washer Wand & Foam Bubble Icons inside Shield */}
        <g stroke="#FFE600" strokeWidth="3" strokeLinecap="round">
          {/* Stylized Foam Cannon Nozzle */}
          <line x1="126" y1="124" x2="160" y2="158" />
          <line x1="160" y1="158" x2="194" y2="124" />
          <line x1="160" y1="158" x2="160" y2="192" />
        </g>
        <circle cx="160" cy="144" r="14" fill="#FFE600" />
        <circle cx="160" cy="144" r="8" fill="#000000" />

        {/* Big Stylized "SA" Lettermark */}
        <text
          x="160"
          y="152"
          textAnchor="middle"
          fill="#000000"
          fontFamily="Impact, sans-serif"
          fontWeight="900"
          fontSize="18"
        >
          SA
        </text>

        {/* SAN ANDREAS Text Banner */}
        <rect x="36" y="148" width="248" height="34" rx="4" fill="#000000" stroke="#FFE600" strokeWidth="3" />
        <text
          x="160"
          y="172"
          textAnchor="middle"
          fill="#FFE600"
          fontFamily="'Pricedown', 'Bebas Neue', Impact, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="2"
        >
          SAN ANDREAS
        </text>

        {/* CAR WASH Text */}
        <rect x="70" y="186" width="180" height="26" rx="3" fill="#FFE600" />
        <text
          x="160"
          y="204"
          textAnchor="middle"
          fill="#000000"
          fontFamily="'Bebas Neue', Impact, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="2.5"
        >
          CAR WASH
        </text>

        {/* Lower Banner: LOS SANTOS EST. 1992 */}
        <path
          d="M 68 226 L 252 226 L 240 248 L 80 248 Z"
          fill="#000000"
          stroke="#FFE600"
          strokeWidth="2"
        />
        <text
          x="160"
          y="242"
          textAnchor="middle"
          fill="#FFE600"
          fontFamily="sans-serif"
          fontWeight="800"
          fontSize="11"
          letterSpacing="2"
        >
          LOS SANTOS • EST. 1992
        </text>

        {/* High Gloss Crown / Star sparkle at top */}
        <circle cx="160" cy="34" r="5" fill="#FFE600" />
        <circle cx="80" cy="80" r="3" fill="#FFE600" />
        <circle cx="240" cy="80" r="3" fill="#FFE600" />
      </svg>

      {/* Slogan pill / text if requested */}
      {showSlogan && (
        <div className="mt-2 text-center">
          <span className="font-bebas text-xs md:text-sm tracking-widest text-black bg-yellow-400 px-3 py-0.5 font-bold uppercase inline-block shadow-[0_0_12px_rgba(255,230,0,0.5)]">
            Quality is the Difference
          </span>
        </div>
      )}
    </div>
  );
};
