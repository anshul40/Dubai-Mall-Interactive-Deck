import { A } from "@solidjs/router";
import { For, onCleanup, onMount, Show } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { futureModules, venueModules } from "~/data/mall";
import { moduleRoadmap } from "~/modules/registry";
import { GlassPanel } from "~/ui/GlassPanel";

export default function SectionPlatform() {
  let root!: HTMLDivElement;

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="platform"
      data-story-id="platform"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-ink py-28 md:pb-32 md:pt-28"
    >
      <div class="relative mx-auto max-w-6xl space-y-10 px-6 md:px-10">
        <div data-reveal class="max-w-3xl space-y-4">
          <p class="text-xs uppercase tracking-[0.35em] text-gold">Modular platform</p>
          <h2 class="font-display text-display-lg text-balance text-white">
            Built to expand — without rebuilding the story.
          </h2>
          <p class="text-sm leading-relaxed text-white/55">
            This deck ships as a core narrative shell. Future modules plug into shared motion, data,
            and navigation primitives — sponsorship intelligence, venue microsites, booking flows, and
            analytics layers arrive as discrete surfaces.
          </p>
        </div>

        <div data-reveal class="space-y-5">
          <p class="text-xs uppercase tracking-[0.3em] text-gold">Dedicated venue modules</p>
          <p class="max-w-2xl text-sm text-white/55">
            Performing arts, exposition, and convention products are promoted as first-class bookable
            venues — each with its own future microsite, hold rules, and production package.
          </p>
          <div class="grid gap-4 md:grid-cols-2">
            <For each={[...venueModules]}>
              {(v) => (
                <GlassPanel class="cinematic-card space-y-3 border-white/12 bg-black/35">
                  <div class="flex items-start justify-between gap-4">
                    <h3 class="font-display text-xl text-white">{v.name}</h3>
                    <span class="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                      {v.capacity}
                    </span>
                  </div>
                  <p class="text-sm text-white/50">{v.useCases}</p>
                </GlassPanel>
              )}
            </For>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <For each={[...futureModules]}>
            {(label) => (
              <div data-reveal>
                <GlassPanel class="cinematic-card flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm text-white">{label}</p>
                    <p class="mt-1 text-xs text-white/40">Composable route · typed contracts</p>
                  </div>
                  <span class="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/45">
                    Planned
                  </span>
                </GlassPanel>
              </div>
            )}
          </For>
        </div>

        <div data-reveal class="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/50">
          <p class="text-xs uppercase tracking-[0.3em] text-gold">Registry</p>
          <div class="mt-4 grid gap-3 md:grid-cols-3">
            <For each={moduleRoadmap}>
              {(m) => (
                <div class="space-y-1">
                  <p class="text-white">{m.title}</p>
                  <Show
                    when={m.status === "live"}
                    fallback={<p class="text-xs text-white/40">{m.route}</p>}
                  >
                    <A
                      href={m.route}
                      class="text-xs text-gold underline-offset-4 hover:underline"
                    >
                      {m.route} →
                    </A>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </div>

        <footer class="flex flex-col gap-3 border-t border-white/10 pt-10 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Dubai Mall — demo sales experience (replace with legal).</p>
          <p class="uppercase tracking-[0.25em]">Crafted for leasing · sponsorship · events</p>
        </footer>
      </div>
    </section>
  );
}
