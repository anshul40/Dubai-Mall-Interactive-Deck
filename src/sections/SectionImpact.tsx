import { For, onCleanup, onMount } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { impactCopy, impactStats } from "~/data/mall";
import { GlassPanel } from "~/ui/GlassPanel";
import { StatCounter } from "~/ui/StatCounter";

export default function SectionImpact() {
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="impact"
      data-story-id="impact"
      class="story-overlap relative z-[11] overflow-x-clip border-t border-white/5 bg-[#050505] py-24 md:py-32"
    >
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div class="pointer-events-none absolute right-0 top-1/4 hidden h-[min(60vw,480px)] w-[min(60vw,480px)] translate-x-1/4 rounded-full bg-gold/[0.07] blur-[100px] md:block" />

      <div class="relative mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 md:px-10">
        <div class="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <p
            data-reveal
            class="text-xs uppercase tracking-[0.4em] text-gold"
          >
            {impactCopy.kicker}
          </p>
          <h2
            data-reveal
            class="mt-5 font-display text-display-lg text-balance text-white"
          >
            {impactCopy.title}
          </h2>
          <p
            data-reveal
            class="mt-5 text-base font-light leading-relaxed text-white/55 md:text-lg"
          >
            {impactCopy.lead}
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:gap-6">
          <For each={impactStats}>
            {(stat) => (
              <div data-reveal>
                <GlassPanel class="cinematic-card relative overflow-hidden border-white/12 bg-white/[0.035] p-8 max-md:!backdrop-blur-none md:p-10 md:backdrop-blur-xl">
                  <div class="pointer-events-none absolute -right-8 -top-8 hidden h-32 w-32 rounded-full bg-gold/10 blur-2xl md:block" />
                  <StatCounter
                    value={stat.value}
                    label={stat.label}
                    hint={stat.hint}
                    animate={!/^\$/.test(stat.value)}
                    variant="impact"
                  />
                </GlassPanel>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
