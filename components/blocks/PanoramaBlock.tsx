"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { PanoramaBlock as PanoramaBlockT } from "@/lib/types";

// Convert yaw/pitch (deg) to a point on a sphere of given radius.
function spherePos(yawDeg: number, pitchDeg: number, r = 9): [number, number, number] {
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = (pitchDeg * Math.PI) / 180;
  return [
    r * Math.cos(pitch) * Math.sin(yaw),
    r * Math.sin(pitch),
    -r * Math.cos(pitch) * Math.cos(yaw),
  ];
}

// Build a stylised equirectangular "pump house" panorama on a canvas. Swap this
// for a real 360° photo by loading it into the texture instead.
function buildPanoTexture(): THREE.CanvasTexture {
  const w = 4096,
    h = 2048;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // sky
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
  sky.addColorStop(0, "#cfe0f0");
  sky.addColorStop(1, "#eef3f8");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.55);

  // ground
  const ground = ctx.createLinearGradient(0, h * 0.55, 0, h);
  ground.addColorStop(0, "#b9c2cc");
  ground.addColorStop(1, "#8d97a2");
  ctx.fillStyle = ground;
  ctx.fillRect(0, h * 0.55, w, h * 0.45);
  const horizon = h * 0.55;

  // floor grid (perspective-ish)
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * w;
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  // helper to draw a tank
  const tank = (cx: number, bw: number, bh: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(cx - bw / 2, horizon - bh, bw, bh);
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(cx - bw / 2, horizon - bh, bw * 0.18, bh); // shading
    // top cap
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(cx, horizon - bh, bw / 2, bw * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  // pipe rack
  const pipeRack = (x0: number, x1: number, y: number) => {
    ctx.strokeStyle = "#7d8a98";
    ctx.lineWidth = 14;
    for (let k = 0; k < 4; k++) {
      ctx.beginPath();
      ctx.moveTo(x0, y + k * 22);
      ctx.lineTo(x1, y + k * 22);
      ctx.stroke();
    }
    ctx.strokeStyle = "#5a6f84";
    ctx.lineWidth = 10;
    for (let x = x0; x < x1; x += 180) {
      ctx.beginPath();
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x, horizon);
      ctx.stroke();
    }
  };

  // scene props around the cylinder
  tank(w * 0.12, 360, 520, "#00529b");
  tank(w * 0.2, 240, 360, "#3f82ff");
  pipeRack(w * 0.3, w * 0.46, horizon - 220);
  // pump skid block (front-ish)
  ctx.fillStyle = "#34465a";
  ctx.fillRect(w * 0.52, horizon - 120, 300, 120);
  ctx.fillStyle = "#8cc63f";
  ctx.fillRect(w * 0.52, horizon - 130, 300, 12);
  tank(w * 0.72, 300, 600, "#56657a");
  // flare stack
  ctx.strokeStyle = "#6a7a8b";
  ctx.lineWidth = 26;
  ctx.beginPath();
  ctx.moveTo(w * 0.86, horizon);
  ctx.lineTo(w * 0.86, horizon - 760);
  ctx.stroke();
  ctx.fillStyle = "#d97706";
  ctx.beginPath();
  ctx.ellipse(w * 0.86, horizon - 770, 30, 60, 0, 0, Math.PI * 2);
  ctx.fill();
  // control panel
  ctx.fillStyle = "#e7edf3";
  ctx.fillRect(w * 0.93, horizon - 160, 150, 160);
  ctx.fillStyle = "#00529b";
  ctx.fillRect(w * 0.93, horizon - 160, 150, 28);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function PanoSphere({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[10, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

export function PanoramaBlock({ block }: { block: PanoramaBlockT }) {
  const scene = block.scenes[0];
  const [active, setActive] = useState<string | null>(null);
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  const built = useRef(false);

  useEffect(() => {
    if (built.current) return;
    built.current = true;
    setTex(buildPanoTexture());
  }, []);

  const markers = useMemo(
    () =>
      scene.hotspots.map((hs, i) => ({
        ...hs,
        pos: spherePos(hs.yaw, hs.pitch),
        i,
      })),
    [scene]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="relative h-[440px] overflow-hidden rounded-[8px] border border-[var(--border)] bg-[#0a1722]">
        {tex && (
          <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
            <PanoSphere texture={tex} />
            {markers.map((m) => (
              <Html key={m.label} position={m.pos} center>
                <button
                  onClick={() => setActive(m.label)}
                  className={`flex items-center gap-1.5 rounded-full border-2 border-white px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
                    active === m.label ? "bg-eprom-lime text-ink" : "bg-eprom-blue/90"
                  }`}
                  style={{ boxShadow: "0 2px 10px rgba(0,0,0,.5)" }}
                >
                  <span>📍</span>
                  {m.label}
                </button>
              </Html>
            ))}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              rotateSpeed={-0.4}
              minDistance={0.1}
              maxDistance={0.1}
            />
          </Canvas>
        )}
        <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-black/50 px-2 py-1 text-[11px] text-white">
          Drag to look around · click a marker
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded bg-black/50 px-2 py-1 text-[11px] text-white">
          {scene.name}
        </span>
      </div>

      <div className="rounded-[8px] border border-[var(--border)] bg-white p-5">
        <h4 className="text-lg font-extrabold text-ink">Virtual walk-down</h4>
        <p className="mt-1 text-sm text-muted">
          {active
            ? `You are looking at: ${active}.`
            : "Drag inside the view to look around the pump house. Click any marker to focus on equipment."}
        </p>
        <div className="mt-4 space-y-2">
          {scene.hotspots.map((hs) => (
            <button
              key={hs.label}
              onClick={() => setActive(hs.label)}
              className={`flex w-full items-center gap-2 rounded-[6px] border px-3 py-2 text-left text-sm transition-colors ${
                active === hs.label
                  ? "border-eprom-blue bg-accent-soft text-eprom-blue"
                  : "border-[var(--border)] text-ink hover:border-eprom-blue"
              }`}
            >
              📍 {hs.label}
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-[6px] bg-panel-2 p-3 text-[12px] text-muted">
          In production, this is real 360° photography of the actual EPROM site —
          captured once, explored by every trainee, with zero permits or travel.
        </p>
      </div>
    </div>
  );
}
