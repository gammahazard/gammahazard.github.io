export const site = {
  name: "CM Mongo",
  kicker: "independent systems engineer",
  headline: "I build self-hosted AI systems — and the hardware underneath them.",
  sub: "Multi-camera vision, on-device language models, sandboxed edge runtimes. Running on my own GPUs and PLCs, one command up, with the receipts to prove it works.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  github: "https://github.com/gammahazard",
  email: "mongocmdev@gmail.com",
  bio: [
    "I'm an independent engineer who builds complete systems end-to-end — hardware, backend, frontend, and the CI that keeps them honest.",
    "My bias is self-hosted, zero-cloud, and privacy-first: things that run on your own machines and don't phone home. I'd rather show a live demo and real numbers than make a claim.",
    "Lately that means self-hosted AI — multi-camera vision, on-device LLMs, and open-vocabulary detection — on top of years of edge, embedded, and distributed-systems work.",
  ],
  earlierWork:
    "Earlier: several years shipping web3/crypto products, including co-founding CyberVerse — tooling across Ergo, Solana, and Cardano.",
  skills: [
    { group: "AI / ML", items: ["YOLOv8", "InsightFace", "on-device LLMs (Qwen3, Ollama)", "NVIDIA grounding models"] },
    { group: "Systems & Edge", items: ["Rust", "WASI 0.2 / Wasmtime", "Leptos", "Cloudflare Workers", "capability-based security"] },
    { group: "Hardware / Embedded", items: ["ESP32", "Raspberry Pi", "Siemens S7-1200 PLC", "RS-485", "custom DSP"] },
    { group: "Web", items: ["React / TypeScript", "Vite", "Astro", "Tailwind", "FastAPI", "Docker Compose"] },
  ],
} as const;
