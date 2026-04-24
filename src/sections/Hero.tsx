import gsap from "gsap";
import { For, onCleanup, onMount } from "solid-js";
import { ensureGsapPlugins } from "~/animations/register";
import { HeroParticles } from "~/components/HeroParticles";
import { ScrollCue } from "~/components/ScrollCue";
import { heroCopy, heroOutcomeChips, heroPoster, sampleVideos } from "~/data/mall";
import { isNarrowViewport } from "~/lib/utils";
import { Button } from "~/ui/Button";
import { useLenisScroll } from "~/lib/lenis-context";
import { LazyVideo } from "~/video/LazyVideo";

export default function Hero() {
  const scrollTo = useLenisScroll();
  let section!: HTMLElement;
  let parallax!: HTMLDivElement;
  let intro!: HTMLDivElement;

  onMount(() => {
    ensureGsapPlugins();

    const parallaxTween =
      isNarrowViewport()
        ? null
        : gsap.to(parallax, {
            yPercent: 12,
            scale: 1.07,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

    const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    introTl
      .from(intro.querySelectorAll("[data-hero-line]"), {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
      })
      .from(
        intro.querySelectorAll("[data-hero-chip]"),
        { y: 10, opacity: 0, duration: 0.5, stagger: 0.05 },
        "-=0.45"
      )
      .from(
        intro.querySelectorAll("[data-hero-cta]"),
        { y: 18, opacity: 0, duration: 0.65, stagger: 0.07 },
        "-=0.38"
      );

    onCleanup(() => {
      introTl.kill();
      parallaxTween?.kill();
    });
  });

  return (
    <section
      ref={section}
      id="top"
      data-story-id="top"
      class="relative flex min-h-[100svh] w-full max-w-full min-w-0 items-end overflow-x-clip overflow-y-hidden bg-ink pb-6 md:pb-10"
    >
      <div ref={parallax} class="absolute inset-0 max-md:scale-100 scale-[1.03]">
        <LazyVideo
          eager
          overlay="hero"
          class="h-full w-full"
          src={sampleVideos.hero}
          poster={heroPoster}
          fallbackImage={heroPoster}
        />
      </div>

      <HeroParticles />

      <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.96)_0%,rgba(5,5,5,0.58)_34%,rgba(5,5,5,0.22)_56%,transparent_72%)]" />
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_85%,rgba(201,169,98,0.08),transparent_55%)]" />

      <div
        ref={intro}
        class="relative z-10 mx-auto w-full min-w-0 max-w-6xl px-3 pb-[calc(11.5rem+env(safe-area-inset-bottom,0px))] pt-24 sm:px-6 sm:pb-24 sm:pt-32 md:px-10 md:pb-28 md:pt-40"
      >
        <div class="mx-auto w-full min-w-0 max-w-3xl space-y-5 text-center sm:space-y-8 md:text-left">
          <div class="space-y-3 sm:space-y-5">
            <p
              data-hero-line
              class="mx-auto inline-flex min-w-0 max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-lg bg-black/75 px-3 py-2 text-[10px] font-medium uppercase leading-snug tracking-[0.22em] text-[#f4ead0] ring-1 ring-white/15 backdrop-blur-md sm:px-4 sm:py-2.5 sm:text-[11px] sm:tracking-[0.38em] md:mx-0 md:justify-start md:text-xs md:tracking-[0.42em]"
              style={{ "text-shadow": "0 1px 2px rgba(0,0,0,0.9)" }}
            >
              {heroCopy.eyebrow}
            </p>
            <h1
              data-hero-line
              class="max-w-full break-words font-display text-display-xl text-balance text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.65)] md:[text-shadow:0_2px_60px_rgba(0,0,0,0.45)]"
            >
              {heroCopy.headline}
            </h1>
            <p
              data-hero-line
              class="mx-auto max-w-xl text-balance text-[0.9rem] font-light leading-snug text-white/85 [text-shadow:0_2px_20px_rgba(0,0,0,0.75)] sm:text-base sm:leading-relaxed sm:text-white/80 md:mx-0 md:text-lg md:[text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              {heroCopy.subhead}
            </p>
          </div>

          <div class="flex min-w-0 flex-wrap justify-center gap-2 sm:gap-2 md:justify-start">
            <For each={[...heroOutcomeChips]}>
              {(chip) => (
                <span
                  data-hero-chip
                  class="border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm"
                >
                  {chip}
                </span>
              )}
            </For>
          </div>

          <div class="flex min-w-0 flex-col items-center gap-3 pt-0.5 sm:gap-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6">
            <div class="flex w-full min-w-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 md:items-stretch">
              <span data-hero-cta class="block w-full min-w-0 sm:w-auto">
                <Button
                  type="button"
                  class="w-full min-w-0 justify-center !px-5 sm:w-auto md:!px-7"
                  onClick={() => scrollTo("#action-leasing", { offset: -88 })}
                >
                  Start leasing inquiry
                </Button>
              </span>
              <span data-hero-cta class="block w-full min-w-0 sm:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  class="w-full min-w-0 justify-center !px-5 sm:w-auto md:!px-7"
                  onClick={() => scrollTo("#action-sponsor", { offset: -88 })}
                >
                  Open sponsorship thread
                </Button>
              </span>
              <span data-hero-cta class="block w-full min-w-0 sm:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  class="w-full min-w-0 justify-center !px-5 sm:w-auto md:!px-7"
                  onClick={() => scrollTo("#action-events", { offset: -88 })}
                >
                  Request an event hold
                </Button>
              </span>
            </div>
            <button
              type="button"
              data-hero-cta
              class="text-center text-[11px] uppercase tracking-[0.28em] text-white/55 underline-offset-4 transition hover:text-white/90 hover:underline md:pl-1 md:text-left"
              onClick={() => scrollTo("#why", { offset: -80 })}
            >
              {heroCopy.evidenceCta} →
            </button>
          </div>
        </div>
      </div>

      <ScrollCue target="#interlude" label="Enter the story" />
    </section>
  );
}
