"use client";

import { useMemo, useState } from "react";
import { SimulationBlock as SimulationBlockT } from "@/lib/types";

// --- Simplified but physically-flavoured centrifugal pump model -------------
const RATED_RPM = 2950;
const H0 = 80; // shut-off head at rated speed (m)
const QMAX = 140; // m3/h
const A = H0 / (QMAX * QMAX); // pump curve curvature
const H_STATIC = 15; // system static head (m)
const R_BASE = 0.00242; // system friction coefficient
const RHO_G = 1000 * 9.81;
const EFF = 0.75;

function solve(rpm: number, valve: number, suction: number) {
  const s = rpm / RATED_RPM;
  const v = Math.max(0.08, valve);
  const driving = H0 * s * s - H_STATIC;
  let Q = 0;
  if (driving > 0) {
    Q = Math.sqrt(driving / (A + R_BASE / (v * v)));
  }
  const head = Math.max(0, H0 * s * s - A * Q * Q);
  const powerKW = (RHO_G * (Q / 3600) * head) / EFF / 1000;

  // NPSH / cavitation check
  const npshA = 2 + suction * 10.2; // available (m)
  const npshR = 1.5 + 0.0006 * Q * Q; // required, grows with flow
  const cavitating = npshA < npshR && Q > 5;
  const deadhead = Q < 3;

  return { s, v, Q, head, powerKW, npshA, npshR, cavitating, deadhead };
}

// Geometry for the SVG performance chart
const W = 460,
  Hh = 250,
  X0 = 44,
  X1 = 440,
  Y0 = 215,
  Y1 = 18;
const qx = (q: number) => X0 + (q / 150) * (X1 - X0);
const hy = (h: number) => Y0 + (h / 95) * (Y1 - Y0);

export function SimulationBlock({ block }: { block: SimulationBlockT }) {
  const [rpm, setRpm] = useState(2950);
  const [valve, setValve] = useState(0.8);
  const [suction, setSuction] = useState(1.5);

  const r = useMemo(() => solve(rpm, valve, suction), [rpm, valve, suction]);

  // pump curve path at current speed
  const pumpPath = useMemo(() => {
    const pts: string[] = [];
    for (let q = 0; q <= 150; q += 5) {
      const h = Math.max(0, H0 * r.s * r.s - A * q * q);
      pts.push(`${qx(q).toFixed(1)},${hy(h).toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  }, [r.s]);

  const sysPath = useMemo(() => {
    const pts: string[] = [];
    for (let q = 0; q <= 150; q += 5) {
      const h = H_STATIC + (R_BASE / (r.v * r.v)) * q * q;
      pts.push(`${qx(q).toFixed(1)},${hy(Math.min(95, h)).toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  }, [r.v]);

  const spinDur = (60 / Math.max(200, rpm)) * 8; // seconds per rotation, scaled

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(320px,400px)]">
      {/* Left: chart + impeller */}
      <div className="rounded-[8px] border border-[var(--border)] bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-bold text-ink">Pump performance curve</h4>
          <div
            className="h-9 w-9 rounded-full border-2 border-eprom-blue"
            style={{
              background:
                "conic-gradient(from 0deg, #00529b 0 25%, #fff 0 50%, #00529b 0 75%, #fff 0)",
              animation: r.deadhead ? "none" : `spin ${spinDur}s linear infinite`,
            }}
            title="Impeller — spins with RPM"
          />
        </div>

        <svg viewBox={`0 0 ${W} ${Hh}`} className="w-full">
          {/* axes */}
          <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="#d4dde8" />
          <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="#d4dde8" />
          {[0, 25, 50, 75, 100, 125, 150].map((q) => (
            <text key={q} x={qx(q)} y={Y0 + 15} fontSize="9" fill="#5a6f84" textAnchor="middle">
              {q}
            </text>
          ))}
          {[0, 20, 40, 60, 80].map((h) => (
            <text key={h} x={X0 - 8} y={hy(h) + 3} fontSize="9" fill="#5a6f84" textAnchor="end">
              {h}
            </text>
          ))}
          <text x={(X0 + X1) / 2} y={Hh - 2} fontSize="10" fill="#5a6f84" textAnchor="middle">
            Flow Q (m³/h)
          </text>
          <text x={12} y={(Y0 + Y1) / 2} fontSize="10" fill="#5a6f84" textAnchor="middle" transform={`rotate(-90 12 ${(Y0 + Y1) / 2})`}>
            Head (m)
          </text>

          {/* system curve */}
          <path d={sysPath} fill="none" stroke="#8cc63f" strokeWidth="2.5" strokeDasharray="5 4" />
          {/* pump curve */}
          <path d={pumpPath} fill="none" stroke="#00529b" strokeWidth="3" />

          {/* operating point */}
          {!r.deadhead && (
            <>
              <line x1={qx(r.Q)} y1={Y0} x2={qx(r.Q)} y2={hy(r.head)} stroke="#b3c2d4" strokeDasharray="3 3" />
              <line x1={X0} y1={hy(r.head)} x2={qx(r.Q)} y2={hy(r.head)} stroke="#b3c2d4" strokeDasharray="3 3" />
              <circle
                cx={qx(r.Q)}
                cy={hy(r.head)}
                r="7"
                fill={r.cavitating ? "#dc2626" : "#00529b"}
                stroke="#fff"
                strokeWidth="2"
              />
            </>
          )}

          {/* legend */}
          <g fontSize="9" fill="#5a6f84">
            <line x1={X1 - 120} y1={Y1 + 6} x2={X1 - 100} y2={Y1 + 6} stroke="#00529b" strokeWidth="3" />
            <text x={X1 - 96} y={Y1 + 9}>Pump</text>
            <line x1={X1 - 60} y1={Y1 + 6} x2={X1 - 40} y2={Y1 + 6} stroke="#8cc63f" strokeWidth="2.5" strokeDasharray="5 4" />
            <text x={X1 - 36} y={Y1 + 9}>System</text>
          </g>
        </svg>
      </div>

      {/* Right: controls + readouts */}
      <div className="space-y-5">
        {/* readouts */}
        <div className="grid grid-cols-2 gap-3">
          <Readout label="Flow" value={r.deadhead ? "—" : r.Q.toFixed(0)} unit="m³/h" />
          <Readout label="Discharge head" value={r.head.toFixed(0)} unit="m" />
          <Readout label="Shaft power" value={r.deadhead ? "—" : r.powerKW.toFixed(1)} unit="kW" />
          <Readout
            label="NPSH margin"
            value={(r.npshA - r.npshR).toFixed(1)}
            unit="m"
            danger={r.cavitating}
          />
        </div>

        {/* status banner */}
        <div
          className={`rounded-[6px] px-4 py-2.5 text-sm font-semibold ${
            r.cavitating
              ? "bg-[#fdecec] text-red"
              : r.deadhead
              ? "bg-[#fdf0db] text-amber"
              : "bg-[#eef7df] text-green"
          }`}
        >
          {r.cavitating
            ? "⚠ Cavitation — suction pressure too low for this flow. Raise suction or throttle back."
            : r.deadhead
            ? "⚠ No flow — speed too low / valve too closed to overcome static head."
            : "✔ Stable operation within the envelope."}
        </div>

        {/* sliders */}
        <Slider
          label="Driver speed"
          value={rpm}
          min={1500}
          max={3200}
          step={10}
          onChange={setRpm}
          display={`${rpm} rpm`}
        />
        <Slider
          label="Discharge valve"
          value={valve}
          min={0.1}
          max={1}
          step={0.05}
          onChange={setValve}
          display={`${Math.round(valve * 100)}% open`}
        />
        <Slider
          label="Suction pressure"
          value={suction}
          min={-0.4}
          max={3}
          step={0.1}
          onChange={setSuction}
          display={`${suction.toFixed(1)} bar`}
        />
        <p className="text-[12px] text-muted">
          Try: set speed to 2950 rpm, valve ~70% — note the operating point. Now drag
          suction pressure down toward 0 and watch the point turn red as the pump cavitates.
        </p>
      </div>
    </div>
  );
}

function Readout({
  label,
  value,
  unit,
  danger,
}: {
  label: string;
  value: string;
  unit: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-[6px] border border-[var(--border)] bg-white p-3">
      <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
      <p className={`font-mono text-2xl font-extrabold ${danger ? "text-red" : "text-eprom-blue"}`}>
        {value}
        <span className="ml-1 text-xs font-semibold text-muted">{unit}</span>
      </p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-semibold text-ink">{label}</label>
        <span className="font-mono text-sm text-eprom-blue">{display}</span>
      </div>
      <input
        type="range"
        className="eprom-range w-full"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
