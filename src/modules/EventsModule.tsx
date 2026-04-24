import { A } from "@solidjs/router";
import { For } from "solid-js";
import { eventMetrics, eventsShowcase, mallMeta } from "~/data/mall";
import { nextStepActions } from "~/data/contact";
import { GlassPanel } from "~/ui/GlassPanel";

const eventsAction = nextStepActions.find((a) => a.id === "action-events")!;

const capabilities = [
  {
    title: "Concerts & residencies",
    body: "Arena-adjacent Downtown Dubai audience — broadcast overlays, sponsor districts, and load-in corridors sized for touring productions.",
  },
  {
    title: "Product launches & brand worlds",
    body: "Atrium, Fashion Avenue, and aquarium-adjacent spaces for reveal choreography, press, and controlled guest journeys.",
  },
  {
    title: "Corporate & MICE",
    body: "Partner venues across Downtown Dubai for conferences, awards, and multi-day programs with hospitality tied to the mall ecosystem.",
  },
  {
    title: "Sponsor integration",
    body: "Naming, digital screens, experiential builds, and retail tie-ins — one partnerships desk for agencies and global brands.",
  },
] as const;

export default function EventsModule() {
  return (
    <div class="min-h-[100dvh] bg-ink text-white">
      <header class="sticky top-0 z-20 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10">
          <A
            href="/"
            class="text-[11px] uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
            noScroll={false}
          >
            ← Back to deck
          </A>
          <p class="hidden text-[10px] uppercase tracking-[0.28em] text-gold sm:block">Live module</p>
        </div>
      </header>

      <main class="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 md:space-y-20 md:px-10 md:py-20">
        <div class="space-y-6">
          <p class="text-xs uppercase tracking-[0.35em] text-gold">Events hub</p>
          <h1 class="max-w-3xl font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-white">
            {mallMeta.name} — hosting, broadcast, and brand scale in one address.
          </h1>
          <p class="max-w-2xl text-sm leading-relaxed text-white/55">
            This route is the expandable “events module” from the brief: deeper narrative, production
            framing, and a direct booking handoff — without replacing the scroll deck on the home
            experience.
          </p>
          <div class="flex flex-wrap gap-3">
            <a
              href={eventsAction.href}
              class="inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-full bg-mist px-7 py-3 text-center text-sm font-medium tracking-wide text-ink transition duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {eventsAction.ctaLabel}
            </a>
            <A
              href="/#events"
              class="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium tracking-wide text-mist transition hover:border-white/40 hover:bg-white/10"
            >
              Jump to deck chapter
            </A>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <For each={eventMetrics}>
            {(m) => (
              <GlassPanel class="cinematic-card flex flex-col items-center justify-center gap-2 border-white/12 bg-black/35 px-4 py-8 text-center">
                <p class="text-[10px] uppercase tracking-[0.22em] text-white/50">{m.label}</p>
                <p class="font-display text-3xl tabular-nums text-white">{m.value}</p>
              </GlassPanel>
            )}
          </For>
        </div>

        <section class="space-y-8">
          <h2 class="font-display text-2xl text-white md:text-3xl">Hosting capabilities</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <For each={[...capabilities]}>
              {(c) => (
                <GlassPanel class="space-y-3 border-white/10 bg-black/30 p-6">
                  <h3 class="font-display text-lg text-white">{c.title}</h3>
                  <p class="text-sm leading-relaxed text-white/55">{c.body}</p>
                </GlassPanel>
              )}
            </For>
          </div>
        </section>

        <section class="space-y-8">
          <h2 class="font-display text-2xl text-white md:text-3xl">Format examples</h2>
          <div class="grid gap-6 md:grid-cols-3">
            <For each={eventsShowcase}>
              {(e) => (
                <article class="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <div class="relative aspect-[4/3]">
                    <img src={e.image} alt="" class="h-full w-full object-cover" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                    <div class="absolute bottom-0 space-y-1 p-5">
                      <p class="text-[10px] uppercase tracking-[0.2em] text-gold">{e.type}</p>
                      <p class="font-display text-xl text-white">{e.title}</p>
                      <p class="text-xs text-white/50">{e.capacity}</p>
                    </div>
                  </div>
                </article>
              )}
            </For>
          </div>
        </section>

        <footer class="border-t border-white/10 pt-10 text-xs text-white/40">
          <p>
            Public imagery and figures are illustrative; confirm final numbers and rights with{" "}
            {mallMeta.operator ?? "the property operator"} before external distribution.
          </p>
        </footer>
      </main>
    </div>
  );
}
