export const site = {
  name: "Mongo",
  kicker: "independent systems engineer",
  headline: "I build self-hosted AI systems, and the hardware they run on.",
  sub: "Multi-camera vision, on-device language models, and sandboxed edge runtimes, all running on my own GPUs and hardware. One command up, and I'd rather show you a live demo than tell you it works.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  github: "https://github.com/gammahazard",
  email: "mongocmdev@gmail.com",
  cyberverse: "https://www.cyberversegame.io/",
  bio: [
    "I'm an independent engineer, and I build complete systems end to end: the hardware, the backend, the frontend, and the CI that keeps them honest.",
    "I lean self-hosted, zero-cloud, and privacy-first. I like things that run on your own machines and don't phone home, and I'd rather show real numbers than make a claim.",
    "Lately that's meant self-hosted AI: multi-camera vision, on-device LLMs, and open-vocabulary detection, sitting on top of years of edge, embedded, and distributed-systems work.",
  ],
  earlierWork:
    'Before that, I spent a few years building web3 and crypto products, including co-founding <a href="https://www.cyberversegame.io/" target="_blank" rel="noopener" class="text-accent hover:text-accent-soft">CyberVerse</a>, with tooling across Ergo, Solana, and Cardano.',
  skills: [
    { group: "AI / ML", items: ["YOLOv8", "InsightFace", "on-device LLMs (Qwen3, Ollama)", "NVIDIA grounding models"] },
    { group: "Systems & Edge", items: ["Rust", "WASI 0.2 / Wasmtime", "Leptos", "Cloudflare Workers", "capability-based security"] },
    { group: "Hardware / Embedded", items: ["ESP32", "Raspberry Pi", "Siemens S7-1200 PLC", "RS-485", "custom DSP"] },
    { group: "Web", items: ["React / TypeScript", "Vite", "Astro", "Tailwind", "FastAPI", "Docker Compose"] },
  ],
} as const;
