import type { ImageMetadata } from "astro";
import visionDashboard from "../assets/projects/vision-labs-dashboard.png";
import locateDetection from "../assets/projects/locate-detection.png";
import harvesterRig from "../assets/projects/harvester-rig.jpg";

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
      "Person, face, and vehicle detection plus a 19-tool LLM chat assistant over live RTSP feeds, with Telegram alerts (AI scene descriptions) and live Grafana/Prometheus metrics. All local via Docker Compose, zero cloud.",
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
      "One prompt, six grounding tasks on your own GPU: detection, phrase grounding, OCR, document layout, GUI grounding, and pointing. Describe what to find in plain English and get boxes back. One `docker compose up`, with a no-GPU mock mode for development.",
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
    slug: "harvester",
    title: "Harvester OT/ICS Testbed",
    oneLiner: "Hands-on industrial control-systems security rig.",
    blurb:
      "A hub-and-spoke testbed on real industrial gear: a Siemens S7-1200 PLC, Kunbus RevPi, Raspberry Pi, and Arduino, wired into IEC 62443 security zones with a live sensor→PLC→dashboard pipeline you can watch react in real time.",
    tags: ["Siemens S7-1200", "Kunbus RevPi", "IEC 62443", "Raspberry Pi", "RS-485"],
    hardware:
      "Real PLCs, relay banks, and buck-converter power stages, documented end to end, down to a hand-drawn star-ground schematic.",
    repo: "https://github.com/gammahazard/harvester-os-portfolio",
    media: {
      kind: "image",
      src: harvesterRig,
      alt: "The Harvester testbed on a workbench: Siemens S7-1200 PLC, orange Kunbus RevPi, relay banks, fans, and a green industrial stack light.",
    },
    order: 3,
  },
  {
    slug: "sound-sensor",
    title: "Guardian Sound Sensor",
    oneLiner: "Privacy-first nursery sound monitor.",
    blurb:
      "Listens for sustained noise at the nursery door and ducks the living-room TV in seconds, detects crying via spectral analysis, and pings my phone. Runs entirely on the home LAN, with no cloud and no audio recording.",
    tags: ["Rust (Pico 2 W)", "Goertzel DSP", "harmonic tracking", "PWA", "WebSocket"],
    hardware: "Raspberry Pi Pico 2 W with an I²S mic, controlling the TV over the LAN.",
    repo: "https://github.com/gammahazard/sound-sensor",
    media: {
      kind: "decor",
      variant: "waveform",
      alt: "Stylised audio waveform representing real-time sound analysis.",
    },
    order: 4,
  },
];

export const more: Omit<Project, "media">[] = [
  {
    slug: "edge-wasi-runtime",
    title: "Edge WASI Runtime",
    oneLiner: "Hot-swappable sandboxed plugins on a Pi.",
    blurb:
      "A secure IoT runtime that runs untrusted Python plugins on Raspberry Pi via the WASI Component Model. Hot-swap a running driver in under 10ms.",
    tags: ["Rust", "WASI 0.2", "Wasmtime", "Tokio"],
    repo: "https://github.com/gammahazard/edge-wasi-runtime",
    order: 1,
  },
  {
    slug: "raft-consensus",
    title: "Raft Consensus",
    oneLiner: "Distributed consensus in the browser and on a Pi cluster.",
    blurb:
      "The same Rust binary runs in the browser and on a Raspberry Pi cluster: leader election, log replication, and partitions visualised live. 120+ tests, chaos controls.",
    tags: ["Rust", "WASI 0.2", "Leptos"],
    repo: "https://github.com/gammahazard/Raft-Consensus",
    order: 2,
  },
  {
    slug: "edge-protocol-demo",
    title: "Edge Protocol Demo",
    oneLiner: "Production-style Cloudflare Workers + Leptos.",
    blurb:
      "URL shortener (Workers KV), an edge rate limiter, and a capability sandbox. The same capability-security ideas as WASI, at the cloud edge.",
    tags: ["Rust → WASM", "Cloudflare Workers", "Leptos"],
    repo: "https://github.com/gammahazard/edge-protocol-demo",
    order: 3,
  },
  {
    slug: "convertlocal",
    title: "ConvertLocal",
    oneLiner: "Image / audio / video conversion, 100% in-browser.",
    blurb:
      "Batch-convert media with FFmpeg.wasm. Nothing is uploaded, and files never leave the device.",
    tags: ["FFmpeg.wasm", "TypeScript", "PWA"],
    repo: "https://github.com/gammahazard/secure-file-converter",
    order: 4,
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
    order: 5,
  },
];
