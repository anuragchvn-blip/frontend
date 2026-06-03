// Custom isometric 1U CubeSat — vector, transparent, themed to the site.
export function CubeSat1U({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 -34 400 514"
      className={className}
      fill="none"
      aria-label="1U CubeSat"
      role="img"
    >
      <defs>
        <linearGradient id="cs-top" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#46568f" />
          <stop offset="1" stopColor="#34416f" />
        </linearGradient>
        <linearGradient id="cs-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2d3b64" />
          <stop offset="1" stopColor="#1c2645" />
        </linearGradient>
        <linearGradient id="cs-right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#222b49" />
          <stop offset="1" stopColor="#13192c" />
        </linearGradient>
      </defs>

      {/* whip antenna */}
      <line x1="200" y1="62" x2="222" y2="-26" stroke="#b9bbc2" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="222" cy="-26" r="3" fill="#cdd0d6" />

      {/* faces */}
      <polygon points="200,60 340,140 200,220 60,140" fill="url(#cs-top)" stroke="#c8cad1" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="60,140 200,220 200,400 60,320" fill="url(#cs-left)" stroke="#aeb0b8" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="200,220 340,140 340,320 200,400" fill="url(#cs-right)" stroke="#9a9ca4" strokeWidth="3" strokeLinejoin="round" />

      {/* solar cell grid — top */}
      <g stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1.4">
        <line x1="130" y1="100" x2="270" y2="180" />
        <line x1="270" y1="100" x2="130" y2="180" />
      </g>
      {/* solar cell grid — left face */}
      <g stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1.4">
        <line x1="60" y1="185" x2="200" y2="265" />
        <line x1="60" y1="230" x2="200" y2="310" />
        <line x1="60" y1="275" x2="200" y2="355" />
        <line x1="106" y1="166" x2="106" y2="346" />
        <line x1="152" y1="193" x2="152" y2="373" />
      </g>
      {/* solar cell grid — right face */}
      <g stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1.4">
        <line x1="200" y1="265" x2="340" y2="185" />
        <line x1="200" y1="310" x2="340" y2="230" />
        <line x1="200" y1="355" x2="340" y2="275" />
        <line x1="246" y1="193" x2="246" y2="373" />
        <line x1="292" y1="166" x2="292" y2="346" />
      </g>

      {/* aluminium corner rails */}
      <g stroke="#d2d5db" strokeWidth="4.5" strokeLinecap="round">
        <line x1="60" y1="140" x2="60" y2="320" />
        <line x1="200" y1="220" x2="200" y2="400" />
        <line x1="340" y1="140" x2="340" y2="320" />
      </g>
      <g stroke="#8d8f98" strokeWidth="1.5" strokeLinecap="round">
        <line x1="62" y1="142" x2="62" y2="318" />
        <line x1="202" y1="224" x2="202" y2="398" />
        <line x1="338" y1="142" x2="338" y2="318" />
      </g>

      {/* sensor / lens aperture on the right face */}
      <circle cx="290" cy="268" r="11" fill="#0c1020" stroke="#6f7280" strokeWidth="2" />
      <circle cx="290" cy="268" r="4.5" fill="#3a4a7a" />
      <circle cx="287" cy="265" r="1.6" fill="#cdd6f2" />
    </svg>
  );
}
