import type { ImageMetadata } from "astro";
import visionDashboard from "../assets/projects/vision-labs-dashboard.png";
import locateDetection from "../assets/projects/locate-detection.png";

export type Media =
  | { kind: "image"; src: ImageMetadata; alt: string }
  | { kind: "gif"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: ImageMetadata; alt: string }
  | { kind: "decor"; variant: "waveform"; alt: string };

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  blurb: string;
  tags: string[];
  hardware?: string;
  note?: string; // honest caveat, e.g. license
  repo: string;
  demo?: string;
  media: Media;
  order: number;
}

export const featured: Project[] = [
  {
    slug: "vision-labs",
    title: "Vision Labs",
    oneLiner: "Self-hosted, multi-camera AI security platform.",
    blurb:
      "Person & vehicle detection, face recognition, and an LLM chat assistant with 19 tools — processing live RTSP feeds, all local via Docker Compose with zero cloud.",
    tags: ["YOLOv8", "InsightFace", "Qwen3-14B", "FastAPI", "Redis", "Docker", "CUDA 12.8"],
    hardware:
      "Built and tested on a dual-GPU rig (RTX 5070 Ti + RTX 3090); tiers for smaller cards.",
    repo: "https://github.com/gammahazard/vision-labs-v2",
    media: {
      kind: "image",
      src: visionDashboard,
      alt: "Vision Labs multi-camera dashboard: live feeds, recent vehicle detections, and conditions panel.",
    },
    order: 1,
  },
  {
    slug: "locate-anything",
    title: "Locate Anything",
    oneLiner: "A web UI for NVIDIA LocateAnything-3B.",
    blurb:
      "Open-vocabulary object detection & grounding on your own GPU — describe what to find in plain English and get it back with boxes drawn. One `docker compose up`, with a no-GPU mock mode for development.",
    tags: ["FastAPI", "React / Vite", "Tailwind", "SQLite", "Docker GPU"],
    note: "UI code is Apache-2.0; the NVIDIA LocateAnything-3B model is under a non-commercial research license.",
    repo: "https://github.com/gammahazard/locate-anything",
    media: {
      kind: "image",
      src: locateDetection,
      alt: "Locate Anything detecting a box and a circle in a test scene, with bounding boxes drawn.",
    },
    order: 2,
  },
  {
    slug: "sound-sensor",
    title: "Guardian Sound Sensor",
    oneLiner: "Privacy-first nursery sound monitor.",
    blurb:
      "Listens for sustained noise at the nursery door and ducks the living-room TV in seconds, detects crying via spectral analysis, and notifies your phone. Entirely on the home LAN — no cloud, no audio recording.",
    tags: ["ESP32 (Rust)", "Goertzel DSP", "harmonic tracking", "PWA", "WebSocket"],
    hardware: "ESP32 microphone node controlling the TV over the LAN.",
    repo: "https://github.com/gammahazard/sound-sensor",
    media: {
      kind: "decor",
      variant: "waveform",
      alt: "Stylised audio waveform representing real-time sound analysis.",
    },
    order: 3,
  },
];

export const more: Omit<Project, "media">[] = [
  {
    slug: "harvester",
    title: "Harvester OT/ICS Testbed",
    oneLiner: "Hands-on industrial control-systems security rig.",
    blurb:
      "A hub-and-spoke testbed on real industrial gear — Siemens S7-1200 PLC, Kunbus RevPi, Raspberry Pi, Arduino — with IEC 62443 zoning and a live sensor→PLC→dashboard pipeline.",
    tags: ["Siemens S7-1200", "RevPi", "IEC 62443", "RS-485"],
    repo: "https://github.com/gammahazard/harvester-os-portfolio",
    order: 1,
  },
  {
    slug: "edge-wasi-runtime",
    title: "Edge WASI Runtime",
    oneLiner: "Hot-swappable sandboxed plugins on a Pi.",
    blurb:
      "A secure IoT runtime that runs untrusted Python plugins on Raspberry Pi via the WASI Component Model — hot-swap a running driver in under 10ms.",
    tags: ["Rust", "WASI 0.2", "Wasmtime", "Tokio"],
    repo: "https://github.com/gammahazard/edge-wasi-runtime",
    order: 2,
  },
  {
    slug: "raft-consensus",
    title: "Raft Consensus",
    oneLiner: "Distributed consensus in the browser and on a Pi cluster.",
    blurb:
      "The same Rust binary runs in the browser and on a Raspberry Pi cluster — leader election, log replication, and partitions visualised live. 120+ tests, chaos controls.",
    tags: ["Rust", "WASI 0.2", "Leptos"],
    repo: "https://github.com/gammahazard/Raft-Consensus",
    order: 3,
  },
  {
    slug: "edge-protocol-demo",
    title: "Edge Protocol Demo",
    oneLiner: "Production-style Cloudflare Workers + Leptos.",
    blurb:
      "URL shortener (Workers KV), an edge rate limiter, and a capability sandbox — the same capability-security ideas as WASI, at the cloud edge.",
    tags: ["Rust → WASM", "Cloudflare Workers", "Leptos"],
    repo: "https://github.com/gammahazard/edge-protocol-demo",
    order: 4,
  },
  {
    slug: "convertlocal",
    title: "ConvertLocal",
    oneLiner: "Image / audio / video conversion, 100% in-browser.",
    blurb:
      "Batch-convert media with FFmpeg.wasm — nothing is uploaded, files never leave the device.",
    tags: ["FFmpeg.wasm", "TypeScript", "PWA"],
    repo: "https://github.com/gammahazard/secure-file-converter",
    order: 5,
  },
  {
    slug: "terminal-portfolio",
    title: "Terminal Portfolio",
    oneLiner: "An interactive Rust → WASM terminal (for fun).",
    blurb:
      "My previous portfolio: a fully interactive terminal compiled from Rust to WebAssembly, with working commands and zero JavaScript.",
    tags: ["Rust", "Leptos", "WASM"],
    repo: "https://github.com/gammahazard/Vanguard-Portfolio",
    demo: "https://gammahazard.github.io/Vanguard-Portfolio/",
    order: 6,
  },
];
