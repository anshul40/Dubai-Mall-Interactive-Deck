import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onCleanup, onMount } from "solid-js";
import { ensureGsapPlugins } from "~/animations/register";
import { mallMeta } from "~/data/mall";
import { isNarrowViewport, prefersReducedMotion } from "~/lib/utils";

/**
 * Signature cinematic beat — scroll-scrubbed reveal (no extra click).
 * Solid + GSAP (Framer Motion is React-only; this is the motion system here).
 */
export default function SectionInterlude() {
  let host!: HTMLDivElement;
  let line!: HTMLDivElement;
  let rule!: HTMLDivElement;
  let title!: HTMLParagraphElement;
  let sub!: HTMLParagraphElement;

  onMount(() => {
    ensureGsapPlugins();

    if (prefersReducedMotion()) {
      gsap.set(line, { scaleY: 1, transformOrigin: "50% 0%" });
      gsap.set(rule, { scaleX: 1, transformOrigin: "left" });
      gsap.set(title, { opacity: 1, y: 0 });
      gsap.set(sub, { opacity: 1, y: 0 });
      return;
    }

    /** Same scroll-linked beat everywhere; looser scrub on narrow viewports = smoother touch + less “freeze” */
    const scrub = isNarrowViewport() ? 1.05 : 0.65;

    const st = ScrollTrigger.create({
      trigger: host,
      start: "top top",
      end: "bottom bottom",
      scrub,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(line, { scaleY: Math.min(1, p * 1.35), transformOrigin: "50% 0%" });
        gsap.set(rule, { scaleX: Math.min(1, Math.max(0, (p - 0.08) / 0.5)) });
        const t = Math.max(0, (p - 0.12) / 0.38);
        gsap.set(title, { opacity: Math.min(1, t), y: (1 - Math.min(1, t)) * 36 });
        gsap.set(sub, { opacity: Math.max(0, (p - 0.35) / 0.35), y: (1 - Math.min(1, (p - 0.35) / 0.35)) * 20 });
      },
    });

    onCleanup(() => st.kill());
  });

  return (
    <section
      ref={host}
      id="interlude"
      data-story-id="interlude"
      data-section-wash
      class="relative z-10 -mt-24 h-[200vh] overflow-x-clip rounded-t-[1.75rem] bg-ink shadow-[0_-32px_100px_rgba(0,0,0,0.55)] md:-mt-32 md:rounded-t-[2.25rem]"
      aria-label="Cinematic interlude"
    >
      <div class="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,169,98,0.12),transparent_55%)]" />
        <div
          ref={line}
          class="h-28 w-px scale-y-0 bg-gradient-to-b from-gold via-gold/60 to-transparent md:h-36"
        />
        <div
          ref={rule}
          class="mt-8 h-px w-[min(18rem,70vw)] origin-left scale-x-0 bg-gradient-to-r from-gold/80 via-gold/30 to-transparent"
        />
        <p
          ref={title}
          class="mt-10 max-w-2xl text-center font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] text-white opacity-0"
        >
          This is not a corridor of stores.
        </p>
        <p
          ref={sub}
          class="mt-5 max-w-md text-center text-sm font-light leading-relaxed text-white/50 opacity-0"
        >
          {mallMeta.name} — a destination field where brands orbit demand instead of chasing it.
        </p>
      </div>
    </section>
  );
}
