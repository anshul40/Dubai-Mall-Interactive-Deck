import { For, onCleanup, onMount } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { tenants } from "~/data/mall";
import { useLenisScroll } from "~/lib/lenis-context";
import { Button } from "~/ui/Button";
import { SectionLabel } from "~/ui/SectionLabel";

const tierLabel: Record<string, string> = {
  flagship: "Flagship",
  luxury: "Luxury",
  premium: "Premium",
};

export default function SectionRetail() {
  const scrollTo = useLenisScroll();
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="retail"
      data-story-id="retail"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-[#070707] py-28 md:py-36"
    >
      <div class="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-white/5 blur-[110px]" />

      <div class="relative mx-auto w-full min-w-0 max-w-6xl space-y-14 px-4 sm:px-6 md:px-10">
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-reveal class="max-w-3xl">
            <SectionLabel
              kicker="Retail ecosystem"
              title="Tenants that behave like anchors — without the compromise."
              lead="Luxury, mid-tier, flagship, and pop-up each get a lane with intentional adjacencies — so prospects see where they win in the field, not on a spreadsheet."
            />
          </div>
          <div data-reveal>
            <Button
              type="button"
              class="md:self-end"
              onClick={() => scrollTo("#action-leasing", { offset: -96 })}
            >
              Request leasing matrix
            </Button>
          </div>
        </div>

        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <For each={tenants}>
            {(t) => (
              <article
                data-reveal
                class="cinematic-card group relative isolate min-w-0 overflow-hidden rounded-2xl border border-white/12 bg-[#121212] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-500 hover:border-white/22 hover:bg-[#161616] sm:p-6"
              >
                <div class="relative z-[1] flex items-center justify-between">
                  <span class="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/75">
                    {tierLabel[t.tier]}
                  </span>
                  <span class="font-display text-3xl text-white/20 transition duration-500 group-hover:text-gold/75">
                    {t.logoLetter}
                  </span>
                </div>
                <h3 class="relative z-[1] mt-8 max-w-full break-words font-display text-2xl text-white">
                  {t.name}
                </h3>
                <p class="relative z-[1] mt-2 text-xs uppercase tracking-[0.25em] text-white/55">
                  {t.category}
                </p>
                {/* No mix-blend — avoids cumulative dimming across sibling cards in some GPUs */}
                <div class="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div class="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                </div>
              </article>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
