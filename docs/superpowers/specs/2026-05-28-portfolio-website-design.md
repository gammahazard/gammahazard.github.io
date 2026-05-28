# Portfolio Website — Design Spec

- **Date:** 2026-05-28
- **Owner:** CM Mongo (`gammahazard`)
- **Status:** Approved direction, pending spec review
- **Repo (target):** `gammahazard.github.io` (GitHub user site → served at the root `https://gammahazard.github.io`)

## 1. Overview

A new, single-page portfolio website that becomes CM Mongo's **primary** recruiter-facing landing page, replacing the existing Rust→WASM terminal portfolio (`Vanguard-Portfolio`) as the front door. The terminal portfolio is retained and linked as one "for fun" interactive project, not retired entirely.

The site leads with recent **self-hosted AI/ML systems** work, presents **edge/systems** and **OT/ICS hardware** work as range, and acknowledges an earlier **web3/crypto** era in a single understated line.

## 2. Goals

- Convert recruiters skimming on desktop and mobile: a clear role, a strong hero, and three high-quality featured projects within the first two screens.
- Lead with the newest, best work (AI/ML), backed by **real screenshots/GIFs/video** — visuals are the strongest asset.
- Read as **grounded and credible**, never overhyped. Substance and concrete specifics over buzzwords and superlatives.
- Be **fast, accessible, and low-maintenance** — adding a project later should be a small content edit, not a rebuild.

## 3. Non-Goals (out of scope for v1)

- Per-project deep-dive/case-study pages (the GitHub READMEs are the source of truth; link out). Easy to add later.
- A blog/CMS.
- A downloadable resume/CV or any personally-identifying material (see §10).
- A custom domain (staying on `gammahazard.github.io` for v1; custom domain is a possible later step).
- Server-side functionality (fully static).

## 4. Audience & Tone

- **Audience:** technical recruiters and hiring engineers.
- **Tone:** plain, confident, understated. Let the work and concrete numbers/hardware speak. Avoid "expert," "flagship," "cutting-edge," "revolutionary," emoji-heavy hype.
- **Identity:** pseudonymous — "CM Mongo" only. No legal name, location, or personal contact details anywhere.

## 5. Information Architecture (single-page scroll)

1. **Sticky nav** — `CM Mongo.` wordmark left; `Work · About · Contact · GitHub↗` right. Collapses to a minimal menu on mobile.
2. **Hero** — kicker (`independent systems engineer`), serif headline (plain "what I build" statement), one-sentence sub, two CTAs (`View work →`, `GitHub ↗`), and a screenshot/dashboard panel.
3. **Selected Work** — the 3 featured projects (§6), alternating image/text rows, each with embedded media.
4. **More Projects** — compact grid showing range (§7).
5. **About / Skills** — short grounded bio + honest capability summary (§8). Earlier-work (crypto) line lives here.
6. **Contact** — handle-based links (§9).
7. **Footer** — built-with note, license, year, repo link.

## 6. Featured Work (3)

Each featured project: one-line "what it is," 2–3 concrete specs, a real-hardware mention where true, embedded media, and links out (GitHub + demo/README). No inflated language; honest about licenses/limitations.

1. **Vision Labs** (`vision-labs-v2`)
   - What: self-hosted, multi-camera AI security platform — person/vehicle detection, face recognition, and an LLM chat assistant with 19 tools; all local via Docker Compose, zero cloud.
   - Specs/tags: YOLOv8 · InsightFace · Qwen3-14B (Ollama) · FastAPI · Redis · Docker · CUDA 12.8.
   - Media: `grafana-live.gif` and/or `setup-flow.gif` from the repo.
   - Hardware note: built/tested on a dual-GPU rig (RTX 5070 Ti + RTX 3090), tiers for smaller cards.
   - Links: GitHub repo + README.

2. **Locate Anything** (`locate-anything`)
   - What: a sleek web UI for NVIDIA LocateAnything-3B — open-vocabulary object detection & grounding on your own GPU via one `docker compose up`.
   - Specs/tags: FastAPI · React/Vite · Tailwind · SQLite · Docker GPU passthrough · `LA_MOCK` no-GPU mode.
   - Media: the demo video (embedded via the GitHub asset URL already used in the repo README) or a poster image linking to it.
   - Honesty note: state plainly that the **model** is under NVIDIA's **non-commercial** research license (the UI code is Apache-2.0).
   - Links: GitHub repo + demo.

3. **Guardian Sound Sensor** (`sound-sensor`)
   - What: privacy-first nursery sound monitor — ducks the living-room TV when the baby is loud, detects crying, notifies your phone. Runs entirely on the home LAN, no cloud, no audio recording.
   - Specs/tags: ESP32 firmware (Rust) · custom DSP (Goertzel + harmonic tracking) · PWA · WebSocket.
   - Why featured: shows hardware/firmware + signal-processing range beyond the GPU/AI work.
   - Links: GitHub repo + README.

## 7. More Projects (range grid)

Compact cards (title, one line, tags, GitHub link). Target ~6 tiles, ordered to show breadth:

- **Harvester OT/ICS testbed** (`harvester-os-portfolio`) — highlighted first; real Siemens S7-1200 PLC + RevPi hub-and-spoke, IEC 62443 zoning, live sensor→PLC→dashboard proof. (Repo to be cleaned up — see the separate follow-on task.)
- **Edge WASI Runtime** (`edge-wasi-runtime`) — hot-swappable sandboxed Python plugins on Raspberry Pi via the WASI Component Model.
- **Raft Consensus** (`Raft-Consensus`) — same Rust binary runs in the browser and on a Pi cluster; 120+ tests, chaos controls.
- **Edge Protocol Demo** (`edge-protocol-demo`) — Cloudflare Workers + Leptos; URL shortener, edge rate limiter, capability sandbox. *(Substitute `guardian-one-web-demo` if preferred.)*
- **ConvertLocal** (`secure-file-converter`) — image/audio/video conversion 100% in-browser via FFmpeg.wasm, no uploads.
- **Terminal Portfolio** (`Vanguard-Portfolio`) — the interactive Rust→WASM terminal, linked as a "for fun" piece.

**Earlier work (crypto/web3):** a single understated line in the About section — e.g. *"Earlier: several years shipping web3/crypto products, including co-founding CyberVerse (Ergo, Solana, Cardano tooling)."* No individual crypto repos featured.

## 8. About / Skills

- **Bio:** 3–4 plain sentences. Independent engineer who builds full systems end-to-end — hardware → backend → frontend → docs/CI — with a bias for self-hosted, zero-cloud, privacy-first designs and "evidence over assertions" (real perf numbers, live demos). Pseudonymous.
- **Capabilities** (grouped, honest — what's actually been shipped, not a buzzword wall):
  - *AI/ML:* YOLOv8, InsightFace, on-device LLMs (Qwen3, Ollama), NVIDIA grounding models.
  - *Systems & Edge:* Rust, WASI 0.2/Wasmtime, Leptos, Cloudflare Workers, capability-based security.
  - *Hardware / Embedded:* ESP32, Raspberry Pi, Siemens S7-1200 PLC, RS-485, custom DSP.
  - *Web:* React/TypeScript, Vite, Astro, Tailwind, FastAPI, Docker Compose.

## 9. Contact

Pseudonymous channels only:
- **GitHub:** https://github.com/gammahazard
- **Email:** mongocmdev@gmail.com *(confirm spelling — user typed `.co`, assumed `.com`)*
- (Terminal portfolio is linked from More Projects, not the Contact block.)

No personal email/phone/location, no resume PDF.

## 10. Privacy Constraints (hard)

- Operate strictly as "CM Mongo" / `gammahazard`. Nothing on the site may reveal a legal name, home location, or other deanonymizing detail.
- Source screenshots must be checked for incidental PII (faces in vision-labs demos, EXIF/location in photos, IPs/hostnames in dashboards) before publishing. Prefer the synthetic/demo captures already curated in the repos.

## 11. Design System (Dark Editorial — approved)

- **Canvas:** `#0e0e11`. **Text:** warm off-white `#efece5`; muted `#a7a39b`.
- **Accent:** copper `#d98a4f` (with a lighter `#f3c79a` for emphasis). Used sparingly — kickers, links, small highlights.
- **Type:** `Newsreader` (serif) for display headlines; `Inter` for body/UI; `JetBrains Mono` for kickers/labels/specs. Self-host or `@fontsource` for performance (avoid render-blocking Google Fonts; preload key weights).
- **Layout:** generous editorial spacing, max content width ~1040px, comfortable line-length on body copy.
- **Motion (subtle/tasteful):** fade/slide-in on section enter (respecting `prefers-reduced-motion`), hover states, a screenshot **lightbox** for enlarging media. No parallax/animated backgrounds.
- **Components:** `Nav`, `Hero`, `FeaturedProject` (alternating), `ProjectCard` (grid), `About`, `SkillGroup`, `Contact`, `Footer`, `Lightbox`, `MediaEmbed` (handles image/GIF/video).

## 12. Tech & Architecture

- **Framework:** Astro (static output) + Tailwind CSS. Near-zero JS by default; small islands only where motion/lightbox needs them.
- **Content model:** projects defined in an Astro **content collection** (Markdown + frontmatter: title, slug, blurb, tags, hardware, links, media, featured?, order). Sections render from this data so adding/editing a project is a content edit.
- **Assets:** copy the chosen GIFs/screenshots/video (or poster) from source repos into the portfolio repo under `src/assets/`, optimized via Astro's image pipeline (responsive, lazy-loaded). The locate-anything demo video may be embedded via its existing GitHub asset URL or self-hosted.
- **Fonts:** `@fontsource` packages, preloaded; system-font fallback stack.
- **Structure (approx):**
  ```
  src/
    pages/index.astro
    components/ (Nav, Hero, FeaturedProject, ProjectCard, About, Contact, Footer, Lightbox, MediaEmbed)
    content/projects/*.md
    content/config.ts
    assets/ (images, gifs, video/poster)
    styles/ (tailwind entry, tokens)
  astro.config.mjs   # site: 'https://gammahazard.github.io', base: '/'
  ```

## 13. Deployment

- GitHub **user site**: repo named `gammahazard.github.io`, default branch `main`.
- Build & deploy via the official **GitHub Pages + Astro Action** (`withastro/action` → `actions/deploy-pages`), Pages source = GitHub Actions.
- `astro.config.mjs` `site: 'https://gammahazard.github.io'`, `base: '/'`.
- No push to remote without explicit confirmation from the user (per workflow conventions).

## 14. Accessibility & Performance

- Semantic landmarks, alt text on all media, visible focus states, AA color contrast (verify copper-on-dark for small text; use lighter tint or larger size where needed).
- `prefers-reduced-motion` disables entrance animations.
- Target Lighthouse ≥95 across the board; images responsive + lazy; fonts preloaded; minimal JS.
- Mobile-first; verified at common phone and desktop widths.

## 15. Engineering Hygiene

- Conventional Commits; work on a branch with a PR into `main` for the new repo (no direct pushes); commit the design doc first.
- Optional CI: a build check (`astro build`) and a link/format check. Keep it light.

## 16. Open Decisions / Notes

- Confirm contact email spelling (`mongocmdev@gmail.com`).
- `edge-protocol-demo` vs `guardian-one-web-demo` for the range grid — pick the one with the healthier live demo at build time.
- Exact hero headline wording to be finalized during implementation (candidates captured in mockups); kicker stays `independent systems engineer`.

## 17. Related Follow-on Work (separate from this site build)

- **Profile README revamp** (`gammahazard/gammahazard`): lead with AI/ML, feature the same 3 projects, understated tone, link this new site.
- **Harvester repo cleanup** (`harvester-os-portfolio`): strip the IT-02/process-number/"for reviewers" framing; reframe as an evergreen OT/ICS testbed showcase before linking it here.
