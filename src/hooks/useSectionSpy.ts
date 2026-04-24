import { Accessor, createSignal, onCleanup, onMount, useContext } from "solid-js";
import { LenisContext } from "~/lib/lenis-context";

/**
 * Horizontal line (px from viewport top) used to decide which section is "current".
 * Below the fixed nav, scales slightly with viewport height.
 */
function scrollMarkerPx() {
  if (typeof window === "undefined") return 120;
  return Math.round(Math.min(200, Math.max(88, window.innerHeight * 0.17)));
}

/**
 * Tracks which story section is active for nav highlighting.
 * Uses a scroll-marker pass (last section whose top crossed the marker) so tall chapters
 * and Lenis smooth scroll stay in sync — IntersectionObserver alone was sticking on wrong IDs.
 */
export function useSectionSpy(sectionIds: readonly string[]): Accessor<string> {
  const [activeId, setActiveId] = createSignal<string>(sectionIds[0] ?? "top");
  const lenisCtx = useContext(LenisContext);

  onMount(() => {
    let raf = 0;

    const pick = () => {
      const marker = scrollMarkerPx();
      let current = sectionIds[0] ?? "top";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= marker) current = id;
      }
      setActiveId(current);
    };

    const schedulePick = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        pick();
      });
    };

    pick();

    const unsubLenis = lenisCtx?.onScroll(schedulePick);
    window.addEventListener("resize", schedulePick, { passive: true });
    window.addEventListener("scroll", schedulePick, { passive: true });

    onCleanup(() => {
      unsubLenis?.();
      window.removeEventListener("resize", schedulePick);
      window.removeEventListener("scroll", schedulePick);
      if (raf) cancelAnimationFrame(raf);
    });
  });

  return activeId;
}
