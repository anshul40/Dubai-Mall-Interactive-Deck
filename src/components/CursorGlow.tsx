import { onCleanup, onMount } from "solid-js";

/** Subtle editorial glow locked to the pointer (desktop). */
export function CursorGlow() {
  onMount(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const glow = document.createElement("div");
    glow.className =
      "pointer-events-none fixed left-0 top-0 z-[40] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,98,0.14),transparent_65%)] opacity-0 mix-blend-screen blur-3xl will-change-transform";
    document.body.appendChild(glow);

    const onMove = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    onCleanup(() => {
      window.removeEventListener("mousemove", onMove);
      glow.remove();
    });
  });

  return null;
}
