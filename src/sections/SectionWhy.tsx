import { For, onCleanup, onMount } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { demographics, mallMeta, whyStats } from "~/data/mall";
import { GlassPanel } from "~/ui/GlassPanel";
import { SectionLabel } from "~/ui/SectionLabel";
import { StatCounter } from "~/ui/StatCounter";

export default function SectionWhy() {
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="why"
      data-story-id="why"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-ink py-28 md:py-36"
    >
      <div class="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gold/10 blur-[120px]" />

      <div class="relative mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-16 px-4 sm:px-6 md:px-10">
        <div data-reveal>
          <SectionLabel
            kicker="Why this property"
            title="Gravity you cannot buy elsewhere."
            lead={`${mallMeta.storyPromise} ${mallMeta.name} compresses proof of demand — footfall, mix, and spend depth — into a single scroll so your team spends the call on economics, not exposition.`}
          />
        </div>

        <div class="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <For each={whyStats}>
            {(stat) => (
              <div data-reveal>
                <GlassPanel>
                  <StatCounter
                    value={stat.value}
                    label={stat.label}
                    hint={stat.hint}
                    animate={!/^\$/.test(stat.value) && stat.value !== "4.2 hrs"}
                  />
                </GlassPanel>
              </div>
            )}
          </For>
        </div>

        <div class="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-2">
          <GlassPanel class="space-y-8" data-reveal>
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-gold">Demographic mix</p>
              <p class="mt-3 text-sm text-white/55">
                High-intent luxury discovery + family leisure + Gen-Z social loops — balanced for
                year-round sell-through.
              </p>
            </div>
            <div class="space-y-5">
              <For each={demographics}>
                {(d) => (
                  <div>
                    <div class="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/45">
                      <span>{d.segment}</span>
                      <span>{d.pct}%</span>
                    </div>
                    <div class="h-px w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-gold/20 via-gold to-white/40"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                )}
              </For>
            </div>
          </GlassPanel>

          <GlassPanel class="space-y-6" data-reveal>
            <p class="text-xs uppercase tracking-[0.3em] text-gold">Geographic reach</p>
            <p class="text-3xl font-display text-white md:text-4xl">Global corridor</p>
            <p class="text-sm leading-relaxed text-white/55">
              Direct airport adjacency, high-speed transit integration, and a catchment that spans
              continents — not neighborhoods. {mallMeta.city} positions {mallMeta.name} as a default
              itinerary stop for premium travelers and regional ultra-HNW segments.
            </p>
            <div class="grid grid-cols-2 gap-4 text-sm text-white/45">
              <div>
                <p class="text-2xl text-white">72%</p>
                <p>International spend share</p>
              </div>
              <div>
                <p class="text-2xl text-white">48</p>
                <p>Nonstop city pairs</p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
