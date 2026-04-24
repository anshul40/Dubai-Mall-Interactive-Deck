# The Dubai Mall — Interactive Sales Deck

SolidJS + Vite single-page experience for **retail leasing**, **sponsorship**, and **event bookings** at **The Dubai Mall** (Downtown Dubai). The main experience is a **scroll-driven cinematic deck**; a **live `/events` sub-module** demonstrates expandable architecture from the screening brief.

## Stack

- **SolidJS 1.9** + **TypeScript**
- **Vite 5**
- **Tailwind CSS 3**
- **@solidjs/router** — SPA routing (`/` deck, `/events` module)
- **GSAP** (ScrollTrigger, timelines, counters, hero + section motion)
- **Lenis** (smooth scrolling + deck progress)
- **Lazy-loaded** section chunks (`import()` + `<Suspense>`) for faster first paint
- **LazyVideo** — intersection-based load; optional scroll play/pause

> Motion uses **GSAP** on Solid for parity with briefs that mention Framer Motion on React.

## Getting started

```bash
npm install
npm run dev
```

- Main deck: [http://localhost:5173/](http://localhost:5173/)
- **Events module (Phase 2 demo):** [http://localhost:5173/events](http://localhost:5173/events)

Production build:

```bash
npm run build
npm run preview
```

## Deploy (live URL)

- **Vercel / Netlify:** SPA fallback is configured in **`vercel.json`** (rewrite to `index.html`) so `/events` works on refresh.
- **GitHub Pages:** set `base` in `vite.config.ts` to your repo path (e.g. `base: '/your-repo/'`) **or** use Hash routing; plain static hosting without rewrites will 404 on direct `/events` loads.

## Design decisions

- **Scroll-native deck (not slide export)** — One vertical story with chapter IDs matches the brief’s non-linear navigation: the rep and the prospect control pacing via scroll, dock, and top nav instead of “next slide.”
- **SolidJS + Vite** — Fine-grained reactivity with a small runtime and fast builds; good fit for a mostly static marketing surface with a few interactive islands (nav spy, video, `/events` route).
- **GSAP + ScrollTrigger** — Timeline control, scrubbed beats (e.g. interlude), and section reveals without pulling in a React-only motion stack; `ScrollTrigger` stays synced with Lenis via the shared ticker path in `LenisProvider`.
- **Lenis** — Smooth wheel/touch for a “premium deck” feel on sales calls; progress readout for the glass header without building a custom scroll physics layer.
- **Intro gate (video + Enter)** — Full-bleed footage with an explicit **Enter** action so autoplay policy and first paint stay predictable; the main deck mounts only after intent (good for screen-share handoff).
- **Floating nav + Action dock** — Minimal chrome: chapter labels double as jump targets; bottom dock mirrors the three commercial motions (lease / sponsor / book) so CTAs stay thumb-reachable on tablet.
- **Nav active state** — Scroll-marker spy + Lenis `scroll` subscription so highlights track smooth scroll on Windows/Chromium; **optimistic override** on chapter click so the gold state updates immediately while Lenis catches up.
- **Lazy sections + LazyVideo** — Code-split chapters below the fold and defer non-hero video IO to keep first interaction lighter (swap to self-hosted, short H.264 for Lighthouse).
- **`/events` sub-route** — Demonstrates expandable architecture (Phase 2) without a full microsite build: same brand shell, deeper copy + CTAs, SPA rewrite in `vercel.json` for refresh-safe URLs.
- **Visual language** — Dark canvas, gold accent, serif display + Inter body, light grain (`global.css`) — reads “luxury retail / venue deck” and stays legible on shared screens.

## AI tools used

- **Cursor** — Primary AI-assisted development in the IDE: multi-file refactors (router split, `Deck` vs `EventsModule`), nav/scroll-spy behavior, `LazyVideo`/loading gate tweaks, README and `mall.ts` structure, and TypeScript fixes guided by Composer/Agent-style prompts.
- **ChatGPT** — Drafting and tightening marketing copy, rubric-to-checklist alignment, alternative phrasing for section leads, and README structure; **factual claims about The Dubai Mall were cross-checked against public sources** (Wikimedia, widely cited stats) before staying in-repo — **replace operator figures with audited data** before production.
- **Sora** — AI video generation for exploring intro / ambient motion treatments; iterations exported and consolidated into the self-hosted clip **`public/nexora_starting.mp4`** (loading gate + hero). Confirm **usage rights** with your org and the property before external distribution.
- **Still imagery** — No separate AI image pipeline; photography is **Wikimedia Commons** + **Unsplash** (document any new AI stills + licenses here if you add them).

## Assignment alignment (summary)

| Brief expectation | How this repo addresses it |
|-------------------|----------------------------|
| Real mega-mall subject | **The Dubai Mall** — copy, stats, and venue names are **sourced from public reporting**; **confirm audited figures** with the operator before external use. |
| Public media + AI | **Wikimedia Commons** + Unsplash + **`/nexora_starting.mp4`**. AI workflow: **Cursor**, **ChatGPT**, **Sora** — see **[AI tools used](#ai-tools-used)**. |
| Non-linear navigation | Floating nav + dock jump to chapters; user-controlled scroll. |
| Video-first | Full-screen intro gate + hero `LazyVideo`; dining card clip. |
| Expandable architecture | **`/events`** route + `src/modules/registry.ts` roadmap (`events-hub` = **live**). |
| Performance | Lazy sections + lazy video; run **Lighthouse** after final media swap; target **90+** with compressed H.264 and posters. |

## Business goals & CTAs

- **Retail leasing** — `mailto` handoff in `src/data/contact.ts` (replace with HubSpot / Salesforce / Calendly).
- **Sponsorship** — partnerships chapter + CTA.
- **Events** — deck chapter + dedicated **`/events`** hub + mailto.

## Swapping media

- **Copy & data:** `src/data/mall.ts` — headlines, stats, tenants, events, video paths.
- **Intro + hero video:** `public/nexora_starting.mp4` (or change `sampleVideos.hero` + LoadingScreen `src`).
- **Legal:** Replace placeholder operator lines and mailto domains before production.

## Architecture

| Path | Role |
|------|------|
| `src/app/App.tsx` | Router: `/` → `Deck`, `/events` → `EventsModule` |
| `src/app/Deck.tsx` | Lenis, loading gate, nav, dock, lazy-loaded sections |
| `src/modules/EventsModule.tsx` | **Live** expandable events sub-surface |
| `src/modules/registry.ts` | Module roadmap + `live` / `planned` statuses |
| `src/sections/*` | Story chapters |
| `src/video/LazyVideo.tsx` | Intersection-based video + fallbacks |
| `vercel.json` | SPA rewrite for static hosts |

## License
# Dubai-Mall-Interactive-Deck
