import { A } from "@solidjs/router";
import { For, onCleanup, onMount } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { eventMetrics, eventsShowcase } from "~/data/mall";
import { useLenisScroll } from "~/lib/lenis-context";
import { Button } from "~/ui/Button";
import { GlassPanel } from "~/ui/GlassPanel";
import { SectionLabel } from "~/ui/SectionLabel";

export default function SectionEvents() {
  const scrollTo = useLenisScroll();
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="events"
      data-story-id="events"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-[#050505] py-28 md:py-36"
    >
      <div class="relative mx-auto w-full min-w-0 max-w-6xl space-y-14 px-4 sm:px-6 md:px-10">
        <div class="flex w-full min-w-0 flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal class="min-w-0 max-w-3xl">
            <SectionLabel
              kicker="Events & platform"
              title="A broadcast-ready canvas for brands that need the world watching."
              lead="Concerts, corporate seasons, launches, and sponsor-led worlds — modular venues, arena acoustics, and production infrastructure built-in. If you book here, you are not retrofitting a mall; you are dropping into a calendar that already performs."
            />
          </div>
          <div
            data-reveal
            class="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 md:gap-4 lg:max-w-xl lg:shrink-0"
          >
            <For each={eventMetrics}>
              {(m) => (
                <GlassPanel class="cinematic-card flex h-full min-h-[152px] w-full min-w-0 flex-col items-center justify-center gap-3 border-white/15 bg-black/35 px-4 py-5 text-center sm:min-h-[160px]">
                  <p class="max-w-full text-balance text-[10px] uppercase leading-snug tracking-[0.22em] text-white/50 sm:text-[11px] sm:tracking-[0.25em]">
                    {m.label}
                  </p>
                  <p class="font-display text-2xl tabular-nums text-white sm:text-3xl">{m.value}</p>
                </GlassPanel>
              )}
            </For>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <For each={eventsShowcase}>
            {(e) => (
              <article
                data-reveal
                class="cinematic-card group overflow-hidden rounded-2xl border border-white/10 bg-black/30"
              >
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={e.image}
                    alt=""
                    class="h-full w-full object-cover transition duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                  <div class="absolute bottom-0 space-y-2 p-6">
                    <p class="text-[11px] uppercase tracking-[0.25em] text-gold">{e.type}</p>
                    <h3 class="font-display text-2xl text-white">{e.title}</h3>
                    <p class="text-sm text-white/55">{e.capacity}</p>
                  </div>
                </div>
              </article>
            )}
          </For>
        </div>

        <div
          data-reveal
          class="flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
        >
          <p class="max-w-xl text-sm text-white/55">
            Hold dates, sponsor overlays, and broadcast integration are managed through a single
            partnerships desk — built for agencies and global brands.
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <A
              href="/events"
              class="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium tracking-wide text-mist transition hover:border-white/40 hover:bg-white/10"
            >
              Open events hub
            </A>
            <Button type="button" onClick={() => scrollTo("#action-events", { offset: -96 })}>
              Book a venue walkthrough
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
