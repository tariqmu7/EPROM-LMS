"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, ContactShadows } from "@react-three/drei";
import { Model3DBlock as Model3DBlockT, Hotspot } from "@/lib/types";

// A parametric centrifugal-pump-on-baseplate built from primitives. This keeps
// the prototype dependency-free of external CAD; a real .glb can replace <PumpModel/>.
function PumpModel() {
  const blue = "#00529b";
  const steel = "#9fb1c4";
  const lime = "#8cc63f";
  return (
    <group>
      {/* baseplate */}
      <mesh position={[-0.1, -0.32, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.12, 1.1]} />
        <meshStandardMaterial color="#54657a" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* volute casing (front) */}
      <mesh position={[0.45, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.42, 40]} />
        <meshStandardMaterial color={blue} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* volute throat */}
      <mesh position={[0.45, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.5, 24]} />
        <meshStandardMaterial color={blue} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* discharge flange */}
      <mesh position={[0.45, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
        <meshStandardMaterial color={steel} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* suction nozzle (points +Z) */}
      <mesh position={[0.45, 0.1, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 0.5, 28]} />
        <meshStandardMaterial color={blue} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0.45, 0.1, 0.86]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 28]} />
        <meshStandardMaterial color={steel} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* bearing housing / shaft to motor */}
      <mesh position={[-0.25, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.5, 24]} />
        <meshStandardMaterial color={steel} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* mechanical seal ring (lime accent) */}
      <mesh position={[0.05, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.19, 0.19, 0.08, 24]} />
        <meshStandardMaterial color={lime} metalness={0.3} roughness={0.5} />
      </mesh>

      {/* motor */}
      <mesh position={[-0.95, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.95, 36]} />
        <meshStandardMaterial color="#3a4d63" metalness={0.55} roughness={0.45} />
      </mesh>
      {/* motor cooling fins */}
      <mesh position={[-1.45, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.42, 0.3, 0.12, 36]} />
        <meshStandardMaterial color="#2c3c4f" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Marker({
  hotspot,
  index,
  active,
  onClick,
}: {
  hotspot: Hotspot;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Html position={hotspot.position} center distanceFactor={8} zIndexRange={[10, 0]}>
      <button
        onClick={onClick}
        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md transition-transform ${
          active ? "scale-125 bg-eprom-lime" : "bg-eprom-blue hover:scale-110"
        }`}
        style={{ boxShadow: "0 2px 8px rgba(0,41,82,.4)" }}
      >
        {index + 1}
      </button>
    </Html>
  );
}

export function Model3DBlock({ block }: { block: Model3DBlockT }) {
  const [active, setActive] = useState<string>(block.hotspots[0]?.id ?? "");
  const activeSpot = block.hotspots.find((h) => h.id === active);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="relative h-[440px] overflow-hidden rounded-[8px] border border-[var(--border)] bg-gradient-to-b from-[#dde7f1] to-[#eef2f7]">
        <Canvas shadows camera={{ position: [2.4, 1.8, 2.8], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <hemisphereLight args={["#ffffff", "#9fb1c4", 0.6]} />
          <directionalLight position={[4, 6, 3]} intensity={1.2} castShadow />
          <directionalLight position={[-4, 3, -2]} intensity={0.4} />
          <PumpModel />
          {block.hotspots.map((h, i) => (
            <Marker
              key={h.id}
              hotspot={h}
              index={i}
              active={h.id === active}
              onClick={() => setActive(h.id)}
            />
          ))}
          <ContactShadows position={[0, -0.38, 0]} opacity={0.4} scale={6} blur={2.4} />
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={6}
            minPolarAngle={0.3}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
        <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-white/80 px-2 py-1 text-[11px] text-muted">
          Drag to orbit · scroll to zoom · click a numbered marker
        </span>
      </div>

      <div className="rounded-[8px] border border-[var(--border)] bg-white p-5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-eprom-blue">
          Component {block.hotspots.findIndex((h) => h.id === active) + 1} of{" "}
          {block.hotspots.length}
        </p>
        <h4 className="mt-1 text-xl font-extrabold text-ink">{activeSpot?.label}</h4>
        <p className="mt-2 text-sm text-muted">{activeSpot?.detail}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {block.hotspots.map((h, i) => (
            <button
              key={h.id}
              onClick={() => setActive(h.id)}
              className={`rounded-[4px] border px-2.5 py-1 text-xs font-medium transition-colors ${
                h.id === active
                  ? "border-eprom-blue bg-accent-soft text-eprom-blue"
                  : "border-[var(--border)] text-muted hover:border-eprom-blue"
              }`}
            >
              {i + 1}. {h.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
