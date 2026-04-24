import { For, onCleanup, onMount } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { partnershipCopy } from "~/data/mall";
import { Button } from "~/ui/Button";
import { GlassPanel } from "~/ui/GlassPanel";
import { SectionLabel } from "~/ui/SectionLabel";
import { useLenisScroll } from "~/lib/lenis-context";

export default function SectionPartnerships() {
  const scrollTo = useLenisScroll();
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="partnerships"
      data-story-id="partnerships"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-[#060606] py-28 md:py-36"
    >
      <div class="pointer-events-none absolute left-1/2 top-24 h-[320px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />

      <div class="relative mx-auto w-full min-w-0 max-w-6xl space-y-14 px-4 sm:px-6 md:px-10">
        <div class="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal class="max-w-3xl">
            <SectionLabel
              kicker={partnershipCopy.kicker}
              title={partnershipCopy.title}
              lead={partnershipCopy.lead}
            />
          </div>
          <div
            data-reveal
            class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 md:gap-4 lg:max-w-xl lg:shrink-0"
          >
            <For each={partnershipCopy.stats}>
              {(s) => (
                <GlassPanel class="cinematic-card flex h-full min-h-[152px] w-full flex-col items-center justify-center gap-3 border-white/15 bg-black/40 px-4 py-5 text-center sm:min-h-[160px]">
                  <p class="max-w-[11rem] text-balance text-[10px] uppercase leading-snug tracking-[0.22em] text-white/50 sm:max-w-none sm:text-[11px] sm:tracking-[0.25em]">
                    {s.label}
                  </p>
                  <p class="text-center font-display text-2xl tabular-nums text-white sm:text-3xl">
                    {s.value}
                  </p>
                </GlassPanel>
              )}
            </For>
          </div>
        </div>

        <div
          data-reveal
          class="flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p class="max-w-2xl text-sm text-white/55">
            On live calls, anchor here: partners choose Downtown Dubai density when they need proof of
            reach, not promises of footfall. Solo visitors can forward the same section to procurement
            without losing context.
          </p>
          <Button type="button" onClick={() => scrollTo("#action-sponsor", { offset: -96 })}>
            Start a partnership thread
          </Button>
        </div>
      </div>
    </section>
  );
}
