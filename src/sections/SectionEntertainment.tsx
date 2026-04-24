import { For, onCleanup, onMount, createSignal } from "solid-js";
import { revealSection } from "~/animations/revealSection";
import { attractions, mallMeta } from "~/data/mall";
import { SectionLabel } from "~/ui/SectionLabel";

export default function SectionEntertainment() {
  let root!: HTMLDivElement;
  const [active, setActive] = createSignal<string | null>(null);

  onMount(() => {
    const tween = revealSection(root);
    onCleanup(() => tween?.kill());
  });

  return (
    <section
      ref={root}
      id="entertainment"
      data-story-id="entertainment"
      data-section-wash
      class="story-overlap relative overflow-x-clip border-t border-white/5 bg-ink py-28 md:py-36"
    >
      <div class="pointer-events-none absolute right-10 top-24 h-64 w-64 rounded-full bg-gold/10 blur-[90px]" />

      <div class="relative mx-auto max-w-6xl space-y-14 px-6 md:px-10">
        <div data-reveal>
          <SectionLabel
            kicker="Entertainment & attractions"
            title="Spectacle at scale — engineered for repeat visitation."
            lead={`From the aquarium tunnel to fountain nights and ice-rink spectacles, ${mallMeta.name} behaves like a destination operator — not a landlord.`}
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <For each={attractions}>
            {(item) => {
              const open = () => setActive(item.id);
              const close = () => setActive((v) => (v === item.id ? null : v));

              return (
                <article
                  data-reveal
                  class="cinematic-card group relative overflow-hidden rounded-2xl border border-white/10"
                  onMouseEnter={open}
                  onMouseLeave={close}
                  onFocusIn={open}
                  onFocusOut={close}
                >
                  <div class="relative aspect-[16/11] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      class={`h-full w-full object-cover transition duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active() === item.id
                          ? "scale-105 blur-[1px]"
                          : "scale-100 group-hover:scale-[1.05]"
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      class="absolute inset-0 bg-ink/55 transition duration-500"
                      classList={{
                        "opacity-100": active() === item.id,
                        "opacity-35": active() !== item.id,
                      }}
                    />
                    <div class="absolute inset-0 flex flex-col justify-end p-8">
                      <p class="text-xs uppercase tracking-[0.3em] text-gold">Signature asset</p>
                      <h3 class="mt-3 font-display text-3xl text-white md:text-4xl">{item.title}</h3>
                      <p
                        class="mt-3 max-w-md text-sm text-white/70 transition duration-500"
                        classList={{
                          "translate-y-0 opacity-100": active() === item.id,
                          "translate-y-3 opacity-0": active() !== item.id,
                        }}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </article>
              );
            }}
          </For>
        </div>
      </div>
    </section>
  );
}
