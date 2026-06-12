// Lightweight inline SVG diagrams used as placeholder figures inside content
// slides (so the prototype has no external image dependencies).

export function Diagram({ id }: { id: string }) {
  if (id === "diagram:pump-flow") return <PumpFlow />;
  return null;
}

function PumpFlow() {
  return (
    <svg viewBox="0 0 520 240" className="w-full" role="img" aria-label="Pump flow diagram">
      <defs>
        <linearGradient id="grad" x1="0" x2="1">
          <stop offset="0" stopColor="#00529b" />
          <stop offset="0.55" stopColor="#0a6fb8" />
          <stop offset="1" stopColor="#8cc63f" />
        </linearGradient>
        <marker id="arr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00529b" />
        </marker>
      </defs>

      {/* suction pipe */}
      <line x1="20" y1="150" x2="150" y2="150" stroke="#00529b" strokeWidth="10" markerEnd="url(#arr)" />
      <text x="30" y="138" fontSize="12" fill="#5a6f84">Suction</text>

      {/* volute casing */}
      <circle cx="220" cy="150" r="60" fill="url(#grad)" opacity="0.18" stroke="#00529b" strokeWidth="2" />
      {/* impeller vanes */}
      <g stroke="#00529b" strokeWidth="3" fill="none">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path
            key={a}
            d="M220,150 q18,-6 30,-22"
            transform={`rotate(${a} 220 150)`}
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx="220" cy="150" r="8" fill="#00529b" />
      <text x="186" y="226" fontSize="12" fill="#5a6f84">Impeller + volute</text>

      {/* discharge pipe up */}
      <line x1="220" y1="90" x2="220" y2="35" stroke="#8cc63f" strokeWidth="10" markerEnd="url(#arr)" />
      <line x1="220" y1="40" x2="470" y2="40" stroke="#8cc63f" strokeWidth="10" markerEnd="url(#arr)" />
      <text x="360" y="30" fontSize="12" fill="#5a6f84">Discharge (high pressure)</text>

      {/* pressure label */}
      <text x="430" y="150" fontSize="13" fontWeight="700" fill="#00529b">P↑</text>
    </svg>
  );
}
