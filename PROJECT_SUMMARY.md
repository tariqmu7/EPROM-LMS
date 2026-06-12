# EPROM Academy — Project Summary

## What it is
A working **prototype** of a Udacity-style interactive training platform for **EPROM**. Its single
purpose is to prove that the company's existing training format — **PDFs, PowerPoint decks, and
physical site walk-downs** — can be collapsed into **one interactive lesson** combining 3D equipment,
360° virtual site visits, live simulations, and built-in assessment.

## Status
Prototype / demo (v0). **No backend, auth, database, or admin** — all content is mocked and progress
is stored in `localStorage`. Authentication, persistence, and authoring are Phase 1 of the production
roadmap (see `EPROM-Academy-Proposal.docx`).

## Tech stack
| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript, dev on port **3001** |
| Styling | Tailwind v4, EPROM brand tokens in `app/globals.css` (see `EPROM-THEME.md`) |
| 3D / 360° | three.js via `@react-three/fiber` + `@react-three/drei` |
| Animation | `framer-motion` (slide transitions) |
| Data | Mock content in `lib/courses.ts` — no backend |
| Progress | `localStorage` (`lib/progress.ts`) |

> ⚠️ This is a customized Next.js — APIs and conventions differ from defaults. Per `AGENTS.md`,
> read the relevant guide in `node_modules/next/dist/docs/` before writing code.

## The lesson experience (block types)
One course (Centrifugal Pump: Operation & Maintenance) is authored end-to-end through every block
type; the rest are catalog stubs. Each block is one component in `components/blocks/`:
- **Content** — replaces a PowerPoint/PDF page (`ContentBlock`, `Diagram`)
- **Video** — embedded process animation (`VideoBlock`)
- **3D equipment** — orbit + numbered hotspots (`Model3DBlock`)
- **360° site visit** — procedural panorama with markers (`PanoramaBlock`)
- **Live simulation** — speed/valve/suction-pressure sliders driving a pump curve, can trigger
  cavitation (`SimulationBlock`)
- **Quiz** — instant feedback + score (`QuizBlock`)
- **Hands-on task** — re-order a start-up sequence (`TaskBlock`)
- **Summary** — outcomes + quiz score (`SummaryBlock`)

## Where things live
- `lib/courses.ts` — demo course content (edit to change every slide)
- `lib/types.ts` — block/lesson data model
- `components/blocks/*` — one component per interaction type
- `components/player/LessonPlayer.tsx` — lesson player shell (rail, progress, nav)
- `components/ui/*` — brand UI primitives (Button, Card, Badge, SiteHeader, …)
- `app/` — landing (`page.tsx`), `catalog/`, `course/[slug]/`, and the `learn/[slug]/` player route

## Demo path
Home → Catalog → open *Centrifugal Pump* course → **Start lesson** → step through with **Next →**
through all eight block types. Progress persists across refresh.

## Production drop-in points
Real CAD/`.glb` models and 360° site photography replace the procedural assets directly in
`Model3DBlock` / `PanoramaBlock` with no architectural change.
