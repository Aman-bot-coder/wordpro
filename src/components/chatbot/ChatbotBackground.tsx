// Purely decorative, extremely subtle holographic layer echoing the site's
// 3D authority-network motif — cheap CSS/SVG, no WebGL, sits behind messages.
const DOTS = [
  { x: 12, y: 18, yellow: false, delay: 0 },
  { x: 82, y: 10, yellow: true, delay: 0.6 },
  { x: 70, y: 42, yellow: false, delay: 1.2 },
  { x: 20, y: 58, yellow: false, delay: 0.3 },
  { x: 90, y: 70, yellow: false, delay: 0.9 },
  { x: 45, y: 30, yellow: true, delay: 1.5 },
  { x: 55, y: 85, yellow: false, delay: 0.4 },
];

export function ChatbotBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.35]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <line x1="12" y1="18" x2="45" y2="30" stroke="#2f80ff" strokeWidth="0.15" />
        <line x1="45" y1="30" x2="70" y2="42" stroke="#2f80ff" strokeWidth="0.15" />
        <line x1="20" y1="58" x2="45" y2="30" stroke="#2f80ff" strokeWidth="0.15" />
        <line x1="70" y1="42" x2="90" y2="70" stroke="#2f80ff" strokeWidth="0.15" />
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.yellow ? 0.9 : 0.55}
            fill={d.yellow ? "#ffd43b" : "#2f80ff"}
            style={{
              animation: `wrds-chat-float 7s ease-in-out ${d.delay}s infinite`,
              transformOrigin: `${d.x}px ${d.y}px`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes wrds-chat-float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          circle { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
