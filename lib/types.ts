// ---------------------------------------------------------------------------
// Domain types for EPROM Academy. A Course has Lessons; the lesson player walks
// a flat ordered list of "slides", each of which is a typed Block.
// ---------------------------------------------------------------------------

export type BlockType =
  | "content"
  | "video"
  | "model3d"
  | "panorama"
  | "simulation"
  | "quiz"
  | "task"
  | "summary";

export interface BaseBlock {
  id: string;
  type: BlockType;
  title: string;
  /** short eyebrow label shown above the title */
  eyebrow?: string;
}

export interface ContentBlock extends BaseBlock {
  type: "content";
  /** paragraphs of body copy */
  body: string[];
  /** optional bullet callouts */
  bullets?: { icon?: string; text: string }[];
  image?: { src: string; caption?: string };
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  /** YouTube embed id or full mp4 url */
  youtubeId?: string;
  src?: string;
  poster?: string;
  description?: string;
}

export interface Hotspot {
  id: string;
  /** normalized 3D position to anchor the marker */
  position: [number, number, number];
  label: string;
  detail: string;
}

export interface Model3DBlock extends BaseBlock {
  type: "model3d";
  /** path to a .glb under /public; if missing, a primitive pump is rendered */
  modelSrc?: string;
  hotspots: Hotspot[];
  description?: string;
}

export interface PanoScene {
  id: string;
  name: string;
  /** equirectangular image under /public */
  image: string;
  hotspots: {
    /** yaw/pitch in degrees */
    yaw: number;
    pitch: number;
    label: string;
    /** optional: id of scene to jump to */
    target?: string;
  }[];
}

export interface PanoramaBlock extends BaseBlock {
  type: "panorama";
  scenes: PanoScene[];
  description?: string;
}

export interface SimulationBlock extends BaseBlock {
  type: "simulation";
  description?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number; // index of the correct option
  explanation: string;
}

export interface QuizBlock extends BaseBlock {
  type: "quiz";
  questions: QuizQuestion[];
}

export interface TaskBlock extends BaseBlock {
  type: "task";
  scenario: string;
  /** correctly-ordered startup/shutdown steps the trainee must sequence */
  steps: string[];
  successMessage: string;
}

export interface SummaryBlock extends BaseBlock {
  type: "summary";
  outcomes: string[];
}

export type Block =
  | ContentBlock
  | VideoBlock
  | Model3DBlock
  | PanoramaBlock
  | SimulationBlock
  | QuizBlock
  | TaskBlock
  | SummaryBlock;

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: "Foundational" | "Intermediate" | "Advanced";
  durationMin: number;
  summary: string;
  outcomes: string[];
  /** comma-free list of what replaces the old material */
  replaces: string[];
  accent: string; // hex used for the card stripe
  blocks: Block[];
}
