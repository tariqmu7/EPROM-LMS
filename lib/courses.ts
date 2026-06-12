import { Course } from "./types";

// ---------------------------------------------------------------------------
// Mock content. One course is fully authored end-to-end (every block type) so
// the prototype runs the complete experience. The others are catalog stubs to
// show the platform scales across the EPROM training domain.
// ---------------------------------------------------------------------------

export const centrifugalPumpCourse: Course = {
  slug: "centrifugal-pump-ops",
  title: "Centrifugal Pump: Operation & Maintenance",
  subtitle: "From theory to the field — without leaving your desk",
  category: "Rotating Equipment",
  level: "Intermediate",
  durationMin: 35,
  accent: "#00529b",
  summary:
    "Replace the 60-slide PowerPoint, the maintenance PDF, and the half-day plant walk-down with one interactive lesson. Explore the pump in 3D, take a virtual site visit, run a live performance simulation, and prove your understanding with built-in checks.",
  outcomes: [
    "Identify the main components of a centrifugal pump and their function",
    "Interpret a pump performance curve and the effect of speed and valve position",
    "Carry out a correct start-up sequence",
    "Recognise cavitation and the conditions that cause it",
  ],
  replaces: ["60-slide PowerPoint", "Maintenance PDF manual", "Half-day site walk-down"],
  blocks: [
    // 1 — CONTENT (PDF/PPT replacement)
    {
      id: "intro",
      type: "content",
      eyebrow: "Module 1 · Fundamentals",
      title: "What a centrifugal pump does",
      body: [
        "A centrifugal pump converts the rotational energy of a driver (usually an electric motor or turbine) into pressure energy in a liquid. Liquid enters at the centre — the eye of the impeller — and is flung outward by the spinning vanes.",
        "As the liquid moves to the outer edge of the impeller it gains velocity. The volute casing then slows that fast-moving liquid down, converting velocity into the pressure that pushes flow through the rest of the system.",
      ],
      bullets: [
        { icon: "⚙", text: "Driver spins the shaft and impeller at a set speed (RPM)." },
        { icon: "🌀", text: "Impeller adds kinetic energy to the liquid." },
        { icon: "📈", text: "Volute converts velocity into discharge pressure (head)." },
      ],
      image: {
        src: "diagram:pump-flow",
        caption: "Energy path: suction → impeller eye → vanes → volute → discharge.",
      },
    },

    // 2 — VIDEO
    {
      id: "video-working",
      type: "video",
      eyebrow: "Module 1 · Fundamentals",
      title: "See it in motion",
      youtubeId: "BaEHVpKc-1Q",
      description:
        "A 3-minute animation of internal flow through a centrifugal pump. In the live platform this is your own EPROM-produced training footage; here we embed an open reference clip as a placeholder.",
    },

    // 3 — 3D MODEL with hotspots
    {
      id: "model",
      type: "model3d",
      eyebrow: "Module 2 · Components",
      title: "Explore the pump in 3D",
      description:
        "Drag to orbit, scroll to zoom. Click each numbered hotspot to learn the component and why it matters in operation and maintenance.",
      modelSrc: "/models/pump.glb",
      hotspots: [
        {
          id: "h1",
          position: [0.0, 0.55, 0.95],
          label: "Suction nozzle",
          detail:
            "Liquid enters here. Keep suction lines short and flooded to avoid starving the pump and causing cavitation.",
        },
        {
          id: "h2",
          position: [0.0, 0.95, 0.0],
          label: "Discharge nozzle",
          detail:
            "Pressurised liquid leaves here. The discharge valve is throttled during start-up to control flow.",
        },
        {
          id: "h3",
          position: [0.55, 0.1, 0.0],
          label: "Impeller / volute",
          detail:
            "The rotating impeller adds energy; the volute converts it to pressure. Wear rings here set internal clearances.",
        },
        {
          id: "h4",
          position: [-0.7, 0.1, 0.0],
          label: "Mechanical seal & bearings",
          detail:
            "Seals contain the process fluid around the shaft; bearings carry radial and axial loads. The top maintenance focus.",
        },
      ],
    },

    // 4 — 360 PANORAMA site visit
    {
      id: "site-visit",
      type: "panorama",
      eyebrow: "Module 2 · The real plant",
      title: "Virtual site visit: the pump house",
      description:
        "Drag to look around the pump skid. Click a marker to focus on a piece of equipment — no PPE, transport, or permit-to-work required. Real 360° photography of EPROM sites drops straight in here.",
      scenes: [
        {
          id: "scene-1",
          name: "Pump skid",
          image: "/pano/site.jpg",
          hotspots: [
            { yaw: -30, pitch: -5, label: "Pump & motor baseplate" },
            { yaw: 60, pitch: 0, label: "Discharge manifold" },
            { yaw: 160, pitch: -8, label: "Local control panel" },
          ],
        },
      ],
    },

    // 5 — SIMULATION
    {
      id: "sim",
      type: "simulation",
      eyebrow: "Module 3 · Performance",
      title: "Run the pump — live performance simulator",
      description:
        "Change the speed, discharge valve, and suction pressure. Watch flow, head, power and the operating point on the pump curve respond in real time. Push it into the cavitation zone and see the warning trip.",
    },

    // 6 — QUIZ
    {
      id: "quiz",
      type: "quiz",
      eyebrow: "Module 3 · Check your understanding",
      title: "Knowledge check",
      questions: [
        {
          id: "q1",
          prompt: "Which component converts liquid velocity into discharge pressure?",
          options: ["The impeller eye", "The volute casing", "The mechanical seal", "The bearing housing"],
          answer: 1,
          explanation:
            "The volute is the gradually widening casing that slows the fast-moving liquid leaving the impeller, converting velocity into pressure (head).",
        },
        {
          id: "q2",
          prompt:
            "Following pump affinity laws, if you double the impeller speed, the developed head changes by approximately:",
          options: ["× 2", "× 4", "× 8", "No change"],
          answer: 1,
          explanation:
            "Head varies with the square of speed (H ∝ N²). Double the speed → roughly four times the head. Flow scales linearly and power with the cube.",
        },
        {
          id: "q3",
          prompt: "Cavitation is most likely when:",
          options: [
            "Suction pressure is high and flow is low",
            "Suction pressure drops and available NPSH falls below required",
            "The discharge valve is fully open",
            "The bearings are over-greased",
          ],
          answer: 1,
          explanation:
            "Cavitation occurs when the available NPSH falls below the pump's required NPSH — vapour bubbles form at the impeller eye and collapse, damaging the metal.",
        },
      ],
    },

    // 7 — TASK (apply it)
    {
      id: "task",
      type: "task",
      eyebrow: "Module 4 · Apply it",
      title: "Build the start-up sequence",
      scenario:
        "The pump is isolated and cold. Drag the steps into the correct order to safely bring it online. A wrong order can deadhead the pump or trip it on cavitation.",
      steps: [
        "Confirm suction valve is fully OPEN and pump is flooded (primed)",
        "Confirm discharge valve is CLOSED or slightly cracked",
        "Check lubrication, seal flush and cooling are in service",
        "Start the driver and confirm the pump reaches full speed",
        "Slowly open the discharge valve to the operating point",
        "Verify flow, pressure, vibration and bearing temperatures are normal",
      ],
      successMessage:
        "Correct. Starting against a near-closed discharge limits motor inrush and flow, then opening slowly brings the pump smoothly to its duty point.",
    },

    // 8 — SUMMARY
    {
      id: "summary",
      type: "summary",
      eyebrow: "Course complete",
      title: "You replaced three formats with one lesson",
      outcomes: [
        "Explained how a centrifugal pump develops pressure",
        "Identified key components in 3D and on a virtual site visit",
        "Predicted performance with the live simulator and affinity laws",
        "Sequenced a safe start-up and recognised cavitation conditions",
      ],
    },
  ],
};

// Catalog stubs — show breadth (only the pump course is playable in the prototype).
export const catalogStubs: Pick<
  Course,
  "slug" | "title" | "subtitle" | "category" | "level" | "durationMin" | "summary" | "accent" | "replaces"
>[] = [
  {
    slug: "gas-separator-3phase",
    title: "Three-Phase Separator Operations",
    subtitle: "Oil, gas and water separation",
    category: "Process",
    level: "Intermediate",
    durationMin: 40,
    accent: "#8cc63f",
    summary:
      "Interactive walkthrough of a three-phase separator with a live level-control simulation and 3D internals.",
    replaces: ["Process PDF", "Vendor PowerPoint"],
  },
  {
    slug: "ptw-safety",
    title: "Permit-to-Work & Isolation",
    subtitle: "LOTO and safe systems of work",
    category: "HSE",
    level: "Foundational",
    durationMin: 25,
    accent: "#3f82ff",
    summary:
      "Scenario-based safety training with branching decisions and a virtual isolation exercise.",
    replaces: ["Classroom session", "Printed procedure"],
  },
  {
    slug: "gas-turbine-intro",
    title: "Gas Turbine Fundamentals",
    subtitle: "Brayton cycle to the field",
    category: "Rotating Equipment",
    level: "Advanced",
    durationMin: 50,
    accent: "#0a6fb8",
    summary:
      "3D cutaway of a gas turbine, combustion animation and a start-sequence simulation.",
    replaces: ["OEM manual", "Site visit"],
  },
];

export const courses = [centrifugalPumpCourse];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
