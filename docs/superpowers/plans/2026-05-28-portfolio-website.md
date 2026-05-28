# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build CM Mongo's single-page "Dark Editorial" portfolio site (Astro + Tailwind) and deploy it as the `gammahazard.github.io` user site, leading with self-hosted AI/ML work.

**Architecture:** Static Astro site, near-zero JS. Page sections render from typed data modules (`src/data/`). One small client island handles the screenshot lightbox + scroll-reveal (both respect `prefers-reduced-motion`). Styling via Tailwind v4 (`@tailwindcss/vite`) with design tokens in a `@theme` block; fonts self-hosted via `@fontsource`.

**Tech Stack:** Astro 5, Tailwind CSS v4, TypeScript, `@fontsource(-variable)` (Newsreader / Inter / JetBrains Mono), GitHub Pages via `withastro/action`.

**Verification philosophy:** This is a presentational static site. Each task is gated by `npx astro check` (types) + `npx astro build` (build) and, for visual tasks, a real-browser check at `npm run dev`. No contrived unit tests. Final task does an accessibility + responsive pass.

**Spec deviation (flag for user):** Spec §12 proposed a Markdown content collection; this plan uses a typed `src/data/projects.ts` module with imported image assets instead — simpler, type-safe, same "edit data to add a project" benefit. Veto if you'd rather have Markdown.

**Working dir:** `/home/mongo/projects/portfolio-site` (becomes the `gammahazard.github.io` repo). Git already initialized; the design spec is committed.

---

### Task 1: Scaffold Astro + Tailwind + fonts

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro`
- Create: `public/.nojekyll`

- [ ] **Step 1: Initialize package.json and install deps**

Run from the project root (the dir already has `.git`, `.gitignore`, `docs/`):

```bash
cd /home/mongo/projects/portfolio-site
npm init -y
npm install astro
npm install -D @tailwindcss/vite tailwindcss
npm install @fontsource-variable/newsreader @fontsource-variable/inter @fontsource/jetbrains-mono
```

- [ ] **Step 2: Write `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gammahazard.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Write `src/styles/global.css`** (Tailwind v4 + design tokens + fonts)

```css
@import "tailwindcss";

@import "@fontsource-variable/newsreader";
@import "@fontsource-variable/inter";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";

@theme {
  --color-bg: #0e0e11;
  --color-panel: #14141a;
  --color-ink: #efece5;
  --color-muted: #a7a39b;
  --color-faint: #6f6c65;
  --color-accent: #d98a4f;
  --color-accent-soft: #f3c79a;
  --color-line: rgba(255, 255, 255, 0.08);

  --font-serif: "Newsreader Variable", Georgia, serif;
  --font-sans: "Inter Variable", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body { margin: 0; }

/* scroll-reveal initial state; .is-visible added by the island */
.reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 5: Write a placeholder `src/pages/index.astro`**

```astro
---
import '../styles/global.css';
---
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>CM Mongo</title></head>
  <body>
    <h1 class="font-serif text-4xl text-accent">Scaffold OK</h1>
  </body>
</html>
```

- [ ] **Step 6: Create `public/.nojekyll`** (empty file — prevents Pages from running Jekyll)

```bash
touch public/.nojekyll
```

- [ ] **Step 7: Verify dev server renders**

Run: `npm run dev` then open the printed localhost URL.
Expected: "Scaffold OK" in copper serif on a dark background. Stop the server (Ctrl-C).

- [ ] **Step 8: Verify type-check and build**

Run: `npx astro check && npx astro build`
Expected: 0 errors, `dist/` produced.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/ public/
git commit -m "feat: scaffold Astro + Tailwind v4 + fonts with dark-editorial tokens"
```

---

### Task 2: Site data module (nav, bio, skills, contact)

**Files:**
- Create: `src/data/site.ts`

- [ ] **Step 1: Write `src/data/site.ts`**

```ts
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
```

- [ ] **Step 2: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts
git commit -m "feat: add site data module (hero copy, bio, skills, contact)"
```

---

### Task 3: Acquire and place media assets

**Files:**
- Create: `src/assets/projects/*.png` (static screenshots — Astro-optimized)
- Create: `public/media/*.gif`, `public/media/*.mp4` (animated/video — served as-is)

> Source repos: `vision-labs-v2`, `sound-sensor`, `locate-anything` (current working repo is `locate-anything` at `/home/mongo/projects/locate-anything`; `vision-labs` is at `/home/mongo/projects/vision-labs`). Static screenshots go through Astro's image pipeline; animated GIFs/video are placed in `public/` so animation is preserved.

- [ ] **Step 1: Create asset dirs**

```bash
mkdir -p src/assets/projects public/media
```

- [ ] **Step 2: Download featured + range screenshots via gh (raw contents)**

Run (each writes one optimized-source PNG; re-encode later if large):

```bash
gh api repos/gammahazard/vision-labs-v2/contents/docs/images/dashboard-home.png --jq '.content' | base64 -d > src/assets/projects/vision-labs-dashboard.png
gh api repos/gammahazard/vision-labs-v2/contents/docs/images/detailed-view-cam1.png --jq '.content' | base64 -d > src/assets/projects/vision-labs-detail.png
gh api repos/gammahazard/locate-anything/contents/docs/images/locate-result.png --jq '.content' | base64 -d > src/assets/projects/locate-result.png 2>/dev/null || echo "locate-result.png not at that path — list with: gh api repos/gammahazard/locate-anything/contents/docs/images --jq '.[].name'"
```

If a path 404s, list the dir and pick the closest match:
`gh api repos/gammahazard/<repo>/contents/<dir> --jq '.[].name'`

- [ ] **Step 3: Download animated GIFs into public/media**

```bash
gh api repos/gammahazard/vision-labs-v2/contents/docs/images/grafana-live.gif --jq '.content' | base64 -d > public/media/vision-labs-grafana.gif
gh api repos/gammahazard/vision-labs-v2/contents/docs/images/setup-flow.gif --jq '.content' | base64 -d > public/media/vision-labs-setup.gif
```

- [ ] **Step 4: Source the locate-anything demo video**

The locate-anything README embeds a demo video via a GitHub asset URL. Find it and either (a) record the URL for an external `<video>`/poster link, or (b) download it to `public/media/locate-demo.mp4`:

```bash
grep -rEi 'githubusercontent|\.mp4|user-attachments' /home/mongo/projects/locate-anything/README.md
```

Record the resolved URL in `src/data/projects.ts` (Task 4) as `videoUrl`. Prefer a poster image + link over a heavy autoplay embed.

- [ ] **Step 5: Sanity-check assets for incidental PII**

Open each downloaded screenshot/GIF and confirm no real faces, license plates, home IPs/hostnames, or EXIF location. Prefer the curated/synthetic demo captures. Replace any that leak PII.

Run: `ls -la src/assets/projects public/media`
Expected: the files above exist and are non-empty.

- [ ] **Step 6: Commit**

```bash
git add src/assets/projects public/media
git commit -m "chore: add curated project screenshots, gifs, and demo media"
```

---

### Task 4: Projects data module (typed, with imported assets)

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Write `src/data/projects.ts`**

Imports use the actual filenames placed in Task 3. `image` fields are imported `ImageMetadata` (for `<Image>`); `gif`/`video` fields are public paths (strings).

```ts
import type { ImageMetadata } from "astro";
import visionDashboard from "../assets/projects/vision-labs-dashboard.png";
import visionDetail from "../assets/projects/vision-labs-detail.png";
import locateResult from "../assets/projects/locate-result.png";

export type Media =
  | { kind: "image"; src: ImageMetadata; alt: string }
  | { kind: "gif"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: ImageMetadata; alt: string };

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
    hardware: "Built and tested on a dual-GPU rig (RTX 5070 Ti + RTX 3090); tiers for smaller cards.",
    repo: "https://github.com/gammahazard/vision-labs-v2",
    media: { kind: "gif", src: `${import.meta.env.BASE_URL}media/vision-labs-grafana.gif`, alt: "Live Grafana metrics: GPU, inference latency, and stream lengths." },
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
    media: { kind: "image", src: locateResult, alt: "Detection result with bounding boxes drawn over an image." },
    order: 2,
  },
  {
    slug: "sound-sensor",
    title: "Guardian Sound Sensor",
    oneLiner: "Privacy-first nursery sound monitor.",
    blurb:
      "Listens for sustained noise at the nursery door and ducks the living-room TV in seconds, detects crying via spectral analysis, and notifies your phone. Entirely on the home LAN — no cloud, no audio recording.",
    tags: ["ESP32 (Rust)", "Goertzel DSP", "harmonic tracking", "PWA", "WebSocket"],
    hardware: "ESP32 microphone node + TV control over the LAN.",
    repo: "https://github.com/gammahazard/sound-sensor",
    media: { kind: "image", src: visionDetail, alt: "Project interface preview." }, // replace with a sound-sensor screenshot if one is downloaded in Task 3
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
    blurb: "A secure IoT runtime that runs untrusted Python plugins on Raspberry Pi via the WASI Component Model — hot-swap a running driver in <10ms.",
    tags: ["Rust", "WASI 0.2", "Wasmtime", "Tokio"],
    repo: "https://github.com/gammahazard/edge-wasi-runtime",
    order: 2,
  },
  {
    slug: "raft-consensus",
    title: "Raft Consensus",
    oneLiner: "Distributed consensus in the browser and on a Pi cluster.",
    blurb: "The same Rust binary runs in the browser and on a Raspberry Pi cluster — leader election, log replication, and partitions visualized live. 120+ tests, chaos controls.",
    tags: ["Rust", "WASI 0.2", "Leptos"],
    repo: "https://github.com/gammahazard/Raft-Consensus",
    order: 3,
  },
  {
    slug: "edge-protocol-demo",
    title: "Edge Protocol Demo",
    oneLiner: "Production-style Cloudflare Workers + Leptos.",
    blurb: "URL shortener (Workers KV), an edge rate limiter, and a capability sandbox — the same capability-security ideas as WASI, at the cloud edge.",
    tags: ["Rust → WASM", "Cloudflare Workers", "Leptos"],
    repo: "https://github.com/gammahazard/edge-protocol-demo",
    order: 4,
  },
  {
    slug: "convertlocal",
    title: "ConvertLocal",
    oneLiner: "Image / audio / video conversion, 100% in-browser.",
    blurb: "Batch-convert media with FFmpeg.wasm — nothing is uploaded, files never leave the device.",
    tags: ["FFmpeg.wasm", "TypeScript", "PWA"],
    repo: "https://github.com/gammahazard/secure-file-converter",
    order: 5,
  },
  {
    slug: "terminal-portfolio",
    title: "Terminal Portfolio",
    oneLiner: "An interactive Rust → WASM terminal (for fun).",
    blurb: "My previous portfolio: a fully interactive terminal compiled from Rust to WebAssembly, with working commands and zero JavaScript.",
    tags: ["Rust", "Leptos", "WASM"],
    repo: "https://github.com/gammahazard/Vanguard-Portfolio",
    demo: "https://gammahazard.github.io/Vanguard-Portfolio/",
    order: 6,
  },
];
```

> NOTE: if Task 3 downloaded a real `sound-sensor` screenshot, swap the `sound-sensor` `media` import accordingly. The placeholder reuse is intentional and flagged so it isn't shipped unnoticed.

- [ ] **Step 2: Verify build resolves all asset imports**

Run: `npx astro check && npx astro build`
Expected: 0 errors. If an image import path is wrong, the build fails with the exact missing path — fix the filename to match Task 3.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add typed projects data (featured + range grid)"
```

---

### Task 5: Base layout + Nav + Footer (page shell)

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/layouts/Base.astro`**

```astro
---
import "../styles/global.css";
import { site } from "../data/site";
interface Props { title?: string; description?: string; }
const {
  title = `${site.name} — ${site.kicker}`,
  description = site.sub,
} = Astro.props;
const ogUrl = new URL("og.png", Astro.site).href;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={ogUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.svg`} type="image/svg+xml" />
    <link rel="canonical" href={Astro.site?.href} />
  </head>
  <body class="bg-bg text-ink antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Write `src/components/Nav.astro`**

```astro
---
import { site } from "../data/site";
---
<header class="sticky top-0 z-40 backdrop-blur-md bg-bg/80 border-b border-line">
  <nav class="mx-auto flex max-w-[1040px] items-center justify-between px-6 py-4">
    <a href="#top" class="font-serif text-lg tracking-tight">
      {site.name}<span class="text-accent">.</span>
    </a>
    <div class="flex items-center gap-7 text-sm text-muted">
      {site.nav.map((n) => (
        <a href={n.href} class="hidden sm:inline transition-colors hover:text-ink">{n.label}</a>
      ))}
      <a href={site.github} target="_blank" rel="noopener" class="font-mono text-xs text-accent hover:text-accent-soft">GitHub ↗</a>
    </div>
  </nav>
</header>
```

- [ ] **Step 3: Write `src/components/Footer.astro`**

```astro
---
import { site } from "../data/site";
const year = new Date().getFullYear();
---
<footer class="border-t border-line">
  <div class="mx-auto flex max-w-[1040px] flex-col gap-2 px-6 py-10 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
    <p class="font-mono text-xs">© {year} {site.name}</p>
    <p class="font-mono text-xs">Built with Astro + Tailwind · <a href="https://github.com/gammahazard/gammahazard.github.io" class="hover:text-ink">source</a></p>
  </div>
</footer>
```

- [ ] **Step 4: Replace `src/pages/index.astro` with the shell**

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/Nav.astro";
import Footer from "../components/Footer.astro";
---
<Base>
  <span id="top"></span>
  <Nav />
  <main class="mx-auto max-w-[1040px] px-6">
    <p class="py-40 font-serif text-3xl">Sections go here.</p>
  </main>
  <Footer />
</Base>
```

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`, open the URL.
Expected: sticky nav (wordmark + copper dot, Work/About/Contact links, GitHub↗), dark page, footer with build note. Resize to mobile width — section links hide below `sm`, wordmark + GitHub remain. Stop server.

- [ ] **Step 6: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors. (`og.png`/`favicon.svg` are added in Task 10; missing files won't fail the build.)

- [ ] **Step 7: Commit**

```bash
git add src/layouts/Base.astro src/components/Nav.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add base layout, sticky nav, and footer shell"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
---
import { site } from "../data/site";
---
<section class="grid items-center gap-10 py-20 md:grid-cols-[1.15fr_.85fr] md:py-28">
  <div class="reveal">
    <p class="font-mono text-xs uppercase tracking-[0.16em] text-accent">{site.kicker}</p>
    <h1 class="mt-5 font-serif text-4xl font-normal leading-[1.07] tracking-tight md:text-5xl">
      {site.headline}
    </h1>
    <p class="mt-6 max-w-md text-[15px] leading-relaxed text-muted">{site.sub}</p>
    <div class="mt-8 flex items-center gap-4">
      <a href="#work" class="rounded-lg bg-accent px-5 py-2.5 font-mono text-[13px] text-[#1a120a] transition-opacity hover:opacity-90">View work →</a>
      <a href={site.github} target="_blank" rel="noopener" class="font-mono text-[13px] text-muted hover:text-ink">GitHub ↗</a>
    </div>
  </div>
  <div class="reveal rounded-xl border border-line bg-panel p-3 shadow-2xl">
    <div class="mb-2.5 flex gap-1.5">
      <span class="h-2.5 w-2.5 rounded-full bg-accent"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-white/10"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-white/10"></span>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div class="h-10 rounded-md bg-accent/20"></div>
      <div class="col-span-2 h-10 rounded-md bg-sky-400/15"></div>
      <div class="h-10 rounded-md bg-lime-400/15"></div>
      <div class="h-10 rounded-md bg-white/[0.04]"></div>
      <div class="h-10 rounded-md bg-white/[0.04]"></div>
    </div>
  </div>
</section>
```

> The hero panel is a lightweight CSS mock (no PII, instant load). It can be swapped for a real screenshot later; keeping it abstract avoids shipping a dashboard image at the very top.

- [ ] **Step 2: Add Hero to `index.astro`** — replace the placeholder `<main>` body:

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/Nav.astro";
import Hero from "../components/Hero.astro";
import Footer from "../components/Footer.astro";
---
<Base>
  <span id="top"></span>
  <Nav />
  <main class="mx-auto max-w-[1040px] px-6">
    <Hero />
  </main>
  <Footer />
</Base>
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`. Expected: copper kicker, large serif headline, sub, copper "View work" button + ghost GitHub link, and the mock panel on the right (stacks below on mobile). Stop server.

- [ ] **Step 4: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section"
```

---

### Task 7: MediaEmbed component (image / gif / video, lightbox-ready)

**Files:**
- Create: `src/components/MediaEmbed.astro`

- [ ] **Step 1: Write `src/components/MediaEmbed.astro`**

```astro
---
import { Image } from "astro:assets";
import type { Media } from "../data/projects";
interface Props { media: Media; class?: string; }
const { media, class: className = "" } = Astro.props;
---
{media.kind === "image" && (
  <button class={`media-trigger block w-full overflow-hidden rounded-lg border border-line ${className}`} data-full={media.src.src} data-alt={media.alt} type="button">
    <Image src={media.src} alt={media.alt} widths={[480, 800, 1200]} sizes="(max-width: 768px) 90vw, 600px" class="h-full w-full object-cover" loading="lazy" />
  </button>
)}
{media.kind === "gif" && (
  <button class={`media-trigger block w-full overflow-hidden rounded-lg border border-line ${className}`} data-full={media.src} data-alt={media.alt} type="button">
    <img src={media.src} alt={media.alt} loading="lazy" class="h-full w-full object-cover" />
  </button>
)}
{media.kind === "video" && (
  <video src={media.src} poster={media.poster?.src} controls preload="none" class={`w-full rounded-lg border border-line ${className}`} aria-label={media.alt}></video>
)}
```

- [ ] **Step 2: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors. (Component is unused until Task 8 — this just confirms it compiles.)

- [ ] **Step 3: Commit**

```bash
git add src/components/MediaEmbed.astro
git commit -m "feat: add MediaEmbed component for image/gif/video"
```

---

### Task 8: Featured work section

**Files:**
- Create: `src/components/FeaturedProject.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/FeaturedProject.astro`**

```astro
---
import MediaEmbed from "./MediaEmbed.astro";
import type { Project } from "../data/projects";
interface Props { project: Project; index: number; }
const { project, index } = Astro.props;
const flip = index % 2 === 1;
---
<article class={`reveal grid items-center gap-8 border-t border-line py-14 md:grid-cols-2 md:gap-12`}>
  <div class={flip ? "md:order-2" : ""}>
    <p class="font-mono text-xs text-accent">{String(project.order).padStart(2, "0")}</p>
    <h3 class="mt-1.5 font-serif text-2xl md:text-[28px]">{project.title}</h3>
    <p class="mt-1 text-sm text-muted">{project.oneLiner}</p>
    <p class="mt-4 max-w-md text-[13.5px] leading-relaxed text-muted">{project.blurb}</p>
    {project.hardware && <p class="mt-3 max-w-md text-xs leading-relaxed text-faint">{project.hardware}</p>}
    {project.note && <p class="mt-3 max-w-md border-l-2 border-accent/40 pl-3 text-xs leading-relaxed text-faint">{project.note}</p>}
    <div class="mt-4 flex flex-wrap gap-1.5">
      {project.tags.map((t) => (
        <span class="rounded-full border border-accent/25 px-2.5 py-1 font-mono text-[10.5px] text-accent-soft">{t}</span>
      ))}
    </div>
    <div class="mt-5 flex gap-4 font-mono text-[13px]">
      <a href={project.repo} target="_blank" rel="noopener" class="text-ink hover:text-accent">GitHub ↗</a>
      {project.demo && <a href={project.demo} target="_blank" rel="noopener" class="text-ink hover:text-accent">Live demo ↗</a>}
    </div>
  </div>
  <div class={flip ? "md:order-1" : ""}>
    <MediaEmbed media={project.media} class="aspect-[4/3]" />
  </div>
</article>
```

- [ ] **Step 2: Render the Selected Work section in `index.astro`** — add imports and the section inside `<main>` after `<Hero />`:

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/Nav.astro";
import Hero from "../components/Hero.astro";
import FeaturedProject from "../components/FeaturedProject.astro";
import Footer from "../components/Footer.astro";
import { featured } from "../data/projects";
---
<Base>
  <span id="top"></span>
  <Nav />
  <main class="mx-auto max-w-[1040px] px-6">
    <Hero />
    <section id="work" class="py-10">
      <p class="font-mono text-xs uppercase tracking-[0.16em] text-faint">Selected work</p>
      {featured.map((p, i) => <FeaturedProject project={p} index={i} />)}
    </section>
  </main>
  <Footer />
</Base>
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`. Expected: three featured projects, alternating media/text sides, with tags, hardware/license notes, and links. The locate-anything card shows the non-commercial license note. Stop server.

- [ ] **Step 4: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeaturedProject.astro src/pages/index.astro
git commit -m "feat: add featured work section"
```

---

### Task 9: More Projects grid

**Files:**
- Create: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/ProjectCard.astro`**

```astro
---
import type { Project } from "../data/projects";
interface Props { project: Omit<Project, "media">; }
const { project } = Astro.props;
const href = project.demo ?? project.repo;
---
<a href={href} target="_blank" rel="noopener"
   class="reveal group flex flex-col rounded-xl border border-line bg-panel/40 p-5 transition-colors hover:border-accent/40">
  <h4 class="font-serif text-lg">{project.title}</h4>
  <p class="mt-1 text-xs text-muted">{project.oneLiner}</p>
  <p class="mt-3 flex-1 text-[12.5px] leading-relaxed text-faint">{project.blurb}</p>
  <div class="mt-4 flex flex-wrap gap-1.5">
    {project.tags.map((t) => (
      <span class="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">{t}</span>
    ))}
  </div>
  <span class="mt-4 font-mono text-[11px] text-accent opacity-0 transition-opacity group-hover:opacity-100">View ↗</span>
</a>
```

- [ ] **Step 2: Add the More Projects section in `index.astro`** — import `more` and add after the Selected Work `</section>`:

```astro
import ProjectCard from "../components/ProjectCard.astro";
import { featured, more } from "../data/projects";
```

```astro
<section id="more" class="py-14">
  <p class="font-mono text-xs uppercase tracking-[0.16em] text-faint">More projects</p>
  <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {more.map((p) => <ProjectCard project={p} />)}
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`. Expected: responsive grid (1 / 2 / 3 columns), harvester card first, hover shows copper border + "View ↗". Stop server.

- [ ] **Step 4: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.astro src/pages/index.astro
git commit -m "feat: add more-projects range grid"
```

---

### Task 10: About / Skills + Contact sections

**Files:**
- Create: `src/components/About.astro`, `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/About.astro`**

```astro
---
import { site } from "../data/site";
---
<section id="about" class="reveal grid gap-10 border-t border-line py-16 md:grid-cols-[1fr_1fr]">
  <div>
    <p class="font-mono text-xs uppercase tracking-[0.16em] text-faint">About</p>
    <div class="mt-6 space-y-4 text-[14px] leading-relaxed text-muted">
      {site.bio.map((p) => <p>{p}</p>)}
      <p class="text-faint">{site.earlierWork}</p>
    </div>
  </div>
  <div class="md:pt-12">
    <div class="grid gap-6 sm:grid-cols-2">
      {site.skills.map((s) => (
        <div>
          <h3 class="font-mono text-[11px] uppercase tracking-wider text-accent">{s.group}</h3>
          <ul class="mt-2 space-y-1 text-[13px] text-muted">
            {s.items.map((i) => <li>{i}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write `src/components/Contact.astro`**

```astro
---
import { site } from "../data/site";
---
<section id="contact" class="reveal border-t border-line py-16">
  <p class="font-mono text-xs uppercase tracking-[0.16em] text-faint">Contact</p>
  <h2 class="mt-5 max-w-xl font-serif text-3xl">Building something self-hosted, on-device, or close to the metal? Let's talk.</h2>
  <div class="mt-7 flex flex-wrap gap-5 font-mono text-[13px]">
    <a href={`mailto:${site.email}`} class="text-accent hover:text-accent-soft">{site.email}</a>
    <a href={site.github} target="_blank" rel="noopener" class="text-ink hover:text-accent">GitHub ↗</a>
  </div>
</section>
```

- [ ] **Step 3: Add both sections to `index.astro`** — import and place after the More Projects `</section>`, before `</main>`:

```astro
import About from "../components/About.astro";
import Contact from "../components/Contact.astro";
```

```astro
    <About />
    <Contact />
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`. Expected: About bio + the understated earlier-work line, a 4-group skills list, and a Contact block with the email (mailto) + GitHub. Stop server.

- [ ] **Step 5: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/About.astro src/components/Contact.astro src/pages/index.astro
git commit -m "feat: add about/skills and contact sections"
```

---

### Task 11: Scroll-reveal + lightbox island

**Files:**
- Create: `src/components/Enhance.astro`
- Modify: `src/layouts/Base.astro` (include the island before `</body>`)

- [ ] **Step 1: Write `src/components/Enhance.astro`** (inline script island — runs once, respects reduced motion)

```astro
<div id="lightbox" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/85 p-6" role="dialog" aria-modal="true" aria-label="Enlarged media">
  <img id="lightbox-img" src="" alt="" class="max-h-[88vh] max-w-[92vw] rounded-lg" />
  <button id="lightbox-close" aria-label="Close" class="absolute right-5 top-5 font-mono text-sm text-white/80 hover:text-white">Close ✕</button>
</div>
<script>
  // Scroll reveal
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll<HTMLElement>(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    items.forEach((el) => io.observe(el));
  }

  // Lightbox
  const box = document.getElementById("lightbox")!;
  const img = document.getElementById("lightbox-img") as HTMLImageElement;
  const open = (src: string, alt: string) => { img.src = src; img.alt = alt; box.classList.remove("hidden"); box.classList.add("flex"); };
  const close = () => { box.classList.add("hidden"); box.classList.remove("flex"); img.src = ""; };
  document.querySelectorAll<HTMLElement>(".media-trigger").forEach((btn) => {
    btn.addEventListener("click", () => open(btn.dataset.full || "", btn.dataset.alt || ""));
  });
  document.getElementById("lightbox-close")!.addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
</script>
```

- [ ] **Step 2: Include the island in `Base.astro`** — add before `</body>` (after `<slot />`):

```astro
    <slot />
    <Enhance />
  </body>
```

And add the import in the Base frontmatter:

```astro
import Enhance from "../components/Enhance.astro";
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`. Expected: sections fade/slide in on scroll; clicking a featured image or GIF opens a centered lightbox; Esc / Close / backdrop click dismisses it. Toggle OS "reduce motion" → sections appear immediately with no transition. Stop server.

- [ ] **Step 4: Verify build**

Run: `npx astro check && npx astro build`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Enhance.astro src/layouts/Base.astro
git commit -m "feat: add scroll-reveal and screenshot lightbox island"
```

---

### Task 12: Favicon, OG image, robots, sitemap

**Files:**
- Create: `public/favicon.svg`, `public/og.png`, `public/robots.txt`
- Install + configure: `@astrojs/sitemap`

- [ ] **Step 1: Write `public/favicon.svg`** (copper "m" monogram on dark)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#0e0e11"/>
  <text x="16" y="22" font-family="Georgia, serif" font-size="18" fill="#d98a4f" text-anchor="middle">m</text>
</svg>
```

- [ ] **Step 2: Create an OG image** at `public/og.png` (1200×630).

Generate by screenshotting the rendered hero at 1200×630 with Playwright, or export a simple dark card with the headline. Minimum acceptable: a 1200×630 PNG with dark bg, "CM Mongo" in serif, and the kicker. Confirm dimensions:

```bash
file public/og.png   # expect: PNG image data, 1200 x 630
```

- [ ] **Step 3: Write `public/robots.txt`**

```text
User-agent: *
Allow: /
Sitemap: https://gammahazard.github.io/sitemap-index.xml
```

- [ ] **Step 4: Add sitemap integration**

```bash
npx astro add sitemap --yes
```

Confirm `astro.config.mjs` now imports and registers `sitemap()` in `integrations`. If `astro add` didn't edit it, add manually:

```js
import sitemap from '@astrojs/sitemap';
// ...
integrations: [sitemap()],
```

- [ ] **Step 5: Verify build emits sitemap**

Run: `npx astro build`
Expected: 0 errors; `dist/sitemap-index.xml` exists.

- [ ] **Step 6: Commit**

```bash
git add public/favicon.svg public/og.png public/robots.txt astro.config.mjs package.json package-lock.json
git commit -m "feat: add favicon, OG image, robots, and sitemap"
```

---

### Task 13: Accessibility, responsive, and performance pass

**Files:** (fixes as needed across components)

- [ ] **Step 1: Contrast audit**

Check copper `#d98a4f` on `#0e0e11`. For small body text on the accent, ensure ≥4.5:1; if a specific instance fails, use `--color-accent-soft` (#f3c79a) or increase size/weight. Verify `text-faint` (#6f6c65) is only used for large or non-essential text. Adjust tokens/usages as needed.

- [ ] **Step 2: Keyboard + semantics**

Run `npm run dev`, then tab through: nav links → hero CTAs → project links → lightbox triggers → contact. Expected: visible focus ring on every interactive element; lightbox opens via Enter and closes via Esc. Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent` to interactive classes if focus is not visible.

- [ ] **Step 3: Responsive check (real browser)**

In dev, check at 375px (mobile), 768px (tablet), 1280px (desktop): hero stacks, featured rows stack media-over-text, grid reflows 1→2→3 columns, no horizontal scroll, tap targets ≥40px. Fix any overflow.

- [ ] **Step 4: Lighthouse**

Build and preview, then run Lighthouse (Chrome DevTools or CLI):

```bash
npx astro build && npx astro preview
# in another shell:
npx --yes lighthouse http://localhost:4321 --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless" || true
```

Expected: Performance, Accessibility, Best-Practices, SEO each ≥95. Address any flagged a11y issue (alt text, contrast, labels). Stop servers.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: accessibility, responsive, and performance polish"
```

---

### Task 14: GitHub Pages deploy workflow (no push yet)

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the production build one more time**

Run: `npx astro build`
Expected: 0 errors; `dist/` complete.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

- [ ] **Step 4: STOP — confirm with the user before publishing**

Do NOT create the remote or push. Surface this checklist to the user and wait for explicit go-ahead:
- Create the `gammahazard.github.io` repo (`gh repo create gammahazard/gammahazard.github.io --public --source=. --remote=origin --push` — only on confirmation).
- After first push, set Pages source to "GitHub Actions": `gh api -X POST repos/gammahazard/gammahazard.github.io/pages -f build_type=workflow` (or via repo settings).
- Watch the Action run (`gh run watch`) and confirm the site is live at https://gammahazard.github.io.

---

### Task 15: Publish (only after user confirmation)

**Files:** none (remote operations)

- [ ] **Step 1: Create repo + push** (run only when user confirms)

```bash
cd /home/mongo/projects/portfolio-site
gh repo create gammahazard/gammahazard.github.io --public --source=. --remote=origin --push
```

- [ ] **Step 2: Enable Pages via Actions**

```bash
gh api -X POST repos/gammahazard/gammahazard.github.io/pages -f build_type=workflow 2>/dev/null \
  || gh api -X PUT repos/gammahazard/gammahazard.github.io/pages -f build_type=workflow
```

- [ ] **Step 3: Watch deploy and verify live**

```bash
gh run watch --exit-status
```

Then open https://gammahazard.github.io and confirm the site renders, links work, and media loads. Capture desktop + mobile screenshots for the user.

---

## Self-Review

**Spec coverage:** §5 IA → Tasks 5–10; §6 featured → Tasks 4,8; §7 range grid + crypto line → Tasks 4,9,10; §8 about/skills → Tasks 2,10; §9 contact → Tasks 2,10; §10 privacy → Task 3 step 5; §11 design system → Tasks 1,5–10; §12 tech → Tasks 1,4 (data-module deviation flagged); §13 deploy → Tasks 14–15; §14 a11y/perf → Task 13. All sections covered.

**Placeholder note:** the `sound-sensor` featured `media` deliberately reuses an image pending a real screenshot (Task 3/4) — explicitly flagged in both tasks so it is not shipped unnoticed. The hero panel is an intentional CSS mock, not a placeholder. No "TBD/TODO" left.

**Type consistency:** `Project`/`Media` types defined in Task 4 are used consistently in `MediaEmbed` (Task 7), `FeaturedProject` (Task 8), `ProjectCard` (Task 9, `Omit<Project,"media">` matching `more`). `site` shape (Task 2) matches usage in Nav/Footer/Hero/About/Contact. `.reveal` / `.media-trigger` classes defined in Task 1 CSS and Task 11 island match component usage.
