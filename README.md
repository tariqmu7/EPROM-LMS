# EPROM Academy — Interactive Training Platform (Prototype)

A working prototype of a Udacity-style interactive training platform for EPROM, built to demonstrate
that **PDFs, PowerPoint and physical site visits** can be replaced by **one interactive lesson** —
3D equipment, 360° virtual site visits, live simulations, and built-in assessment.

Styled with the official EPROM brand from `EPROM-THEME.md`.

## Run it

```bash
npm install      # first time only
npm run dev
```

Open **http://localhost:3000**.

> Requires a modern browser with WebGL (Chrome/Edge/Firefox) for the 3D model and 360° viewer.

## The 5-minute demo path (for the boss)

1. **Home** — the vision: "training you interact with, not just read", plus the
   *old format → new experience* strip.
2. **Browse the catalog** → open **Centrifugal Pump: Operation & Maintenance**.
3. Click **Start lesson** to enter the interactive player, then step through with **Next →**:
   - 📖 **Content slide** — replaces the PowerPoint/PDF page (with a diagram).
   - 🎬 **Video** — embedded process animation.
   - 🧊 **3D equipment** — drag to orbit, click the numbered hotspots (suction, discharge, impeller, seal).
   - 🌐 **360° site visit** — drag to look around the pump house; click the markers.
   - 🎛 **Live simulation** — move the **speed / valve / suction pressure** sliders and watch flow, head,
     power and the operating point on the pump curve react. Drag suction pressure down to **trigger cavitation**.
   - ✅ **Quiz** — answer, submit, see instant feedback and a score.
   - 🛠 **Hands-on task** — re-order the pump start-up sequence and check it.
   - 🏁 **Summary** — outcomes + your quiz score (progress persists across refresh via `localStorage`).

## How it's built

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind v4, EPROM tokens wired in `app/globals.css` |
| 3D / 360° | three.js via `@react-three/fiber` + `@react-three/drei` |
| Animation | `framer-motion` (slide transitions) |
| Data | Mock content in `lib/courses.ts` — **no backend** |
| Progress | `localStorage` (`lib/progress.ts`) |

### Where things live
- `lib/courses.ts` — the demo course content (edit this to change every slide).
- `lib/types.ts` — the block/lesson model.
- `components/blocks/*` — one component per interaction type.
- `components/player/LessonPlayer.tsx` — the lesson player shell (rail, progress, nav).
- `app/` — landing, catalog, course detail, and the `/learn` player route.

## Prototype scope / what is *not* real yet
By design, the prototype has **no authentication, database, or admin** — these are Phase 1 of the
production roadmap. The 3D pump is built from primitives and the 360° scene is generated procedurally,
so the demo runs fully offline; real CAD/`.glb` models and 360° site photography drop straight into
`Model3DBlock` / `PanoramaBlock`. See the accompanying requirements document for the full plan.
