import gsap from "gsap";
import { ensureGsapPlugins } from "./register";
import { isNarrowViewport } from "~/lib/utils";

/**
 * Scroll-triggered reveal. Uses explicit from→to opacity so later staggered
 * targets never get stuck dimmed if the tween is killed mid-run (e.g. route/HMR).
 */
export function revealSection(root: HTMLElement) {
  ensureGsapPlugins();
  const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!items.length) return;

  const light = isNarrowViewport();

  const tween = gsap.fromTo(
    items,
    { opacity: 0, y: light ? 14 : 36 },
    {
      opacity: 1,
      y: 0,
      duration: light ? 0.68 : 0.95,
      stagger: light ? 0.035 : 0.06,
      ease: light ? "power2.out" : "power3.out",
      scrollTrigger: {
        trigger: root,
        start: "top 78%",
        once: true,
      },
    }
  );

  tween.eventCallback("onInterrupt", () => {
    gsap.set(items, { opacity: 1, y: 0 });
  });

  return tween;
}
