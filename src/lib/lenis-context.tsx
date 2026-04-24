import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Accessor,
  createContext,
  createSignal,
  onCleanup,
  onMount,
  ParentProps,
  useContext,
} from "solid-js";
import { ensureGsapPlugins } from "~/animations/register";
import { isNarrowViewport } from "~/lib/utils";

type LenisContextValue = {
  scrollTo: (target: string | HTMLElement, options?: Parameters<Lenis["scrollTo"]>[1]) => void;
  progress: Accessor<number>;
  /** Lenis does not always emit native `window` scroll — use this for scroll-linked UI (e.g. section spy). */
  onScroll: (fn: () => void) => () => void;
};

export const LenisContext = createContext<LenisContextValue>();

export function LenisProvider(props: ParentProps) {
  const [progress, setProgress] = createSignal(0);
  let lenis: Lenis | undefined;
  let gsapTickerCb: ((time: number) => void) | undefined;
  const scrollListeners = new Set<() => void>();

  onMount(() => {
    ensureGsapPlugins();

    const narrow = isNarrowViewport();
    /** Native-ish touch scroll — `syncTouch` lerps touch and costs a lot on mobile GPUs */
    lenis = new Lenis({
      duration: narrow ? 1.05 : 1.38,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: narrow ? 1 : 1.45,
      syncTouch: !narrow,
    });

    /** Lenis + ScrollTrigger: keep scrub timelines in sync (prevents “stuck” interlude on touch) */
    lenis.on("scroll", ScrollTrigger.update);

    lenis.on("scroll", () => {
      scrollListeners.forEach((fn) => fn());
    });

    let lastPct = -1;
    lenis.on("scroll", ({ scroll, limit }) => {
      const max = limit ?? 1;
      const p = max > 0 ? scroll / max : 0;
      const clamped = Math.min(1, Math.max(0, p));
      const pct = Math.round(clamped * 100);
      if (pct === lastPct) return;
      lastPct = pct;
      setProgress(clamped);
    });

    gsapTickerCb = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCb);
    gsap.ticker.lagSmoothing(0);
  });

  onCleanup(() => {
    if (gsapTickerCb) gsap.ticker.remove(gsapTickerCb);
    gsapTickerCb = undefined;
    lenis?.destroy();
    lenis = undefined;
  });

  const scrollTo: LenisContextValue["scrollTo"] = (target, options) => {
    lenis?.scrollTo(target, options);
  };

  const onScroll: LenisContextValue["onScroll"] = (fn) => {
    scrollListeners.add(fn);
    return () => scrollListeners.delete(fn);
  };

  return (
    <LenisContext.Provider value={{ scrollTo, progress, onScroll }}>
      {props.children}
    </LenisContext.Provider>
  );
}

export function useLenisScroll() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenisScroll must be used within LenisProvider");
  return ctx.scrollTo;
}

export function useLenisProgress() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenisProgress must be used within LenisProvider");
  return ctx.progress;
}
