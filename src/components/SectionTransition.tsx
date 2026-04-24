import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onCleanup, onMount } from "solid-js";
import { ensureGsapPlugins } from "~/animations/register";
import { isNarrowViewport } from "~/lib/utils";

/** Brief cinematic wash on large section entries */
export function SectionTransition() {
  let layer!: HTMLDivElement;

  onMount(() => {
    ensureGsapPlugins();

    const triggers: ScrollTrigger[] = [];
    const narrow = isNarrowViewport();

    document.querySelectorAll<HTMLElement>("[data-section-wash]").forEach((section) => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        onEnter: () => {
          if (narrow) {
            gsap.fromTo(layer, { opacity: 0.22 }, { opacity: 0, duration: 0.45, ease: "power2.out" });
          } else {
            gsap.fromTo(
              layer,
              { opacity: 0.55, filter: "blur(18px)" },
              { opacity: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
            );
          }
        },
      });
      triggers.push(st);
    });

    onCleanup(() => {
      triggers.forEach((t) => t.kill());
    });
  });

  return (
    <div
      ref={layer}
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-[30] bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0"
    />
  );
}
