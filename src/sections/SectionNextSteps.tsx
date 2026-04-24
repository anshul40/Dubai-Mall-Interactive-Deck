import { For, onCleanup, onMount } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { nextStepActions } from "~/data/contact";
import { CTALink } from "~/ui/CTALink";
import { GlassPanel } from "~/ui/GlassPanel";

export default function SectionNextSteps() {
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="next-steps"
      data-story-id="next-steps"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-[#040404] py-28 md:py-36"
    >
      <div class="relative mx-auto max-w-6xl space-y-12 px-6 md:px-10">
        <div data-reveal class="max-w-3xl space-y-4">
          <p class="text-xs uppercase tracking-[0.35em] text-gold">Next steps</p>
          <h2 class="font-display text-display-lg text-balance text-white">
            Three doors. One property. Pick where you want to win.
          </h2>
          <p class="text-sm leading-relaxed text-white/55">
            These actions mirror how deals actually start — leasing diligence, partnership packaging,
            and event holds. Behind each button is a routed thread (mailto today; swap for your CRM,
            calendar, or form endpoints without changing the story).
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <For each={nextStepActions}>
            {(a) => (
              <div data-reveal>
                <GlassPanel
                  id={a.id}
                  class="cinematic-card flex h-full flex-col justify-between gap-8 border-white/15 bg-black/45 p-7"
                >
                  <div class="space-y-4">
                    <p class="text-[11px] uppercase tracking-[0.3em] text-gold">{a.pillar}</p>
                    <h3 class="font-display text-2xl text-white">{a.headline}</h3>
                    <p class="text-sm leading-relaxed text-white/55">{a.body}</p>
                  </div>
                  <CTALink href={a.href} variant="primary" class="w-full justify-center sm:w-auto">
                    {a.ctaLabel}
                  </CTALink>
                </GlassPanel>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
