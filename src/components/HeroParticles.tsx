import { createMemo } from "solid-js";
import { isNarrowViewport } from "~/lib/utils";

/** Ultra-light spec field — fewer nodes on narrow screens (GPU + compositor) */
export function HeroParticles() {
  const count = () => (typeof window !== "undefined" && isNarrowViewport() ? 5 : 20);

  const specs = createMemo(() =>
    Array.from({ length: count() }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 13) % 100}%`,
      top: `${(i * 23 + 9) % 88}%`,
      delay: `${(i % 6) * 0.4}s`,
      size: i % 5 === 0 ? "2px" : "1px",
    }))
  );

  return (
    <div
      class="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-[0.28] md:opacity-[0.35]"
      aria-hidden="true"
    >
      {specs().map((s) => (
        <span
          class="absolute rounded-full bg-white animate-heroSpec max-md:animate-none"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            "animation-delay": s.delay,
          }}
        />
      ))}
    </div>
  );
}
