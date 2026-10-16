interface BrandLogoProps {
  className?: string
  showText?: boolean
  size?: number
}

export function BrandLogo({ className = '', showText = true, size = 42 }: BrandLogoProps) {
  return (
    <a className={`brand-logo ${className}`} href="#top" aria-label="Praneet Savant — Home">
      <div className="brand-badge" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="badgeBgGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22231c" />
              <stop offset="100%" stopColor="#11120e" />
            </linearGradient>
            <linearGradient id="badgeAccentGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d5fb76" />
              <stop offset="100%" stopColor="#8eb632" />
            </linearGradient>
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.4)" />
            </filter>
          </defs>

          {/* Squircle Badge Container */}
          <rect width="44" height="44" rx="12" fill="url(#badgeBgGrad)" />
          <rect
            x="0.75"
            y="0.75"
            width="42.5"
            height="42.5"
            rx="11.25"
            stroke="#36382d"
            strokeWidth="1.2"
          />

          {/* Fancy Interlocked Monogram PS */}
          <g filter="url(#softGlow)">
            {/* Letter P: Crisp Warm Ivory */}
            <path
              d="M13.5 12V32"
              stroke="#f5f4ef"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M13.5 13.5H23.5C27.5 13.5 30 15.8 30 19.5C30 23.2 27.5 25.5 23.5 25.5H13.5"
              stroke="#f5f4ef"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Letter S: Electric Lime Intertwined Ribbon */}
            <path
              d="M30.5 16.5C29 13.8 26 12.8 23 13.8C18.5 15.2 18 20 23.5 21.8C29 23.5 30.5 27.2 27.5 29.8C24.5 32.2 19.5 31.8 16 29"
              stroke="url(#badgeAccentGrad)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />

            {/* Accent Gem Terminal */}
            <circle cx="33.8" cy="11.2" r="2.2" fill="url(#badgeAccentGrad)" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="brand-copy">
          <span className="brand-name">
            Praneet<span className="brand-dot">.</span>
          </span>
          <span className="brand-tag">PORTFOLIO</span>
        </div>
      )}
    </a>
  )
}
