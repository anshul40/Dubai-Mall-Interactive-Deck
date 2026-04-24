import gsap from "gsap";
import { onCleanup, onMount } from "solid-js";
import { ensureGsapPlugins } from "~/animations/register";
import { luxuryDistrict } from "~/data/mall";
import { isNarrowViewport } from "~/lib/utils";
import { GlassPanel } from "~/ui/GlassPanel";

export default function SectionLuxury() {
  let root!: HTMLElement;
  let image!: HTMLDivElement;

  onMount(() => {
    ensureGsapPlugins();

    const tween = isNarrowViewport()
      ? gsap.fromTo(
          image,
          { scale: 1.03, y: 14, opacity: 0.75 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.85,
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              once: true,
            },
          }
        )
      : gsap.fromTo(
          image,
          { scale: 1.06, y: 28, opacity: 0.4 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "bottom top",
              scrub: true,
            },
          }
        );

    onCleanup(() => tween.kill());
  });

  return (
    <section
      ref={root}
      id="luxury"
      data-story-id="luxury"
      data-section-wash
      class="story-overlap relative overflow-hidden border-t border-white/5 bg-ink py-28 md:py-36"
    >
      <div ref={image} class="absolute inset-0">
        <img
          src={luxuryDistrict.image}
          alt=""
          class="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/15 via-black/35 to-black/70" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      </div>

      <div class="relative mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 md:flex-row md:items-center md:gap-16 md:px-10 md:py-16">
        <div class="min-w-0 max-w-xl space-y-6 md:flex-1">
          <p class="text-xs uppercase tracking-[0.35em] text-gold">Luxury district</p>
          <h2 class="font-display text-display-lg text-balance text-white [text-shadow:0_2px_48px_rgba(0,0,0,0.35)]">
            {luxuryDistrict.title}
          </h2>
          <p class="text-base font-light leading-relaxed text-white/72">{luxuryDistrict.body}</p>
        </div>

        <div class="grid w-full max-w-md flex-1 gap-4 md:justify-self-end">
          {luxuryDistrict.metrics.map((m) => (
            <GlassPanel class="border-white/12 bg-black/35 backdrop-blur-md">
              <p class="text-xs uppercase tracking-[0.25em] text-white/45">{m.label}</p>
              <p class="mt-3 font-display text-3xl text-white">{m.value}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
