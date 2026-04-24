import { For, onCleanup, onMount, Show } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { dining, sampleVideos } from "~/data/mall";
import { SectionLabel } from "~/ui/SectionLabel";
import { LazyVideo } from "~/video/LazyVideo";

export default function SectionDining() {
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="dining"
      data-story-id="dining"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-[#060606] py-28 md:py-36"
    >
      <div class="relative mx-auto max-w-6xl space-y-14 px-6 md:px-10">
        <div data-reveal>
          <SectionLabel kicker="Dining & lifestyle" title={dining.title} lead={dining.lead} />
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <For each={dining.spots}>
            {(spot, index) => (
              <div
                data-reveal
                class="cinematic-card group relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
              >
                <div class="absolute inset-0 transition duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                  <Show
                    when={index() === 0}
                    fallback={
                      <img
                        src={spot.image}
                        alt=""
                        class="h-full w-full object-cover transition duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    }
                  >
                    <LazyVideo
                      scrollPlay
                      overlay="card"
                      class="h-full w-full"
                      src={sampleVideos.diningCard}
                      poster={spot.image}
                      fallbackImage={spot.image}
                    />
                  </Show>
                  <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                </div>

                <div class="absolute inset-x-0 bottom-0 space-y-2 p-7">
                  <p class="text-xs uppercase tracking-[0.3em] text-gold">{spot.vibe}</p>
                  <h3 class="font-display text-2xl text-white">{spot.name}</h3>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
