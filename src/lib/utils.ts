export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Phones / narrow viewports — skip heavy count-up & expensive effects */
export function isNarrowViewport() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 767px)").matches;
}
