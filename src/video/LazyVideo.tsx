import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { prefersReducedMotion } from "~/lib/utils";

type Props = {
  src: string;
  poster?: string;
  class?: string;
  /** Shown when video cannot autoplay or reduced motion */
  fallbackImage?: string;
  /** If true, loads immediately (hero). Otherwise lazy via IntersectionObserver */
  eager?: boolean;
  /** Hero keeps the frame bright; cards keep a stronger cinematic wash */
  overlay?: "hero" | "card";
  /** Pause off-screen; play when scrolled into view (saves CPU + feels intentional) */
  scrollPlay?: boolean;
};

export function LazyVideo(props: Props) {
  const [active, setActive] = createSignal(!!props.eager);
  const [useFallback, setUseFallback] = createSignal(prefersReducedMotion());
  let container: HTMLDivElement | undefined;
  let video: HTMLVideoElement | undefined;

  onMount(() => {
    if (props.eager || useFallback()) return;

    const el = container;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    onCleanup(() => io.disconnect());
  });

  createEffect(() => {
    if (!props.scrollPlay || useFallback() || !active()) return;
    const el = container;
    const v = video;
    if (!el || !v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.15, 0.22, 0.35, 0.55] }
    );
    io.observe(el);
    onCleanup(() => io.disconnect());
  });

  const onError = () => setUseFallback(true);

  return (
    <div
      ref={container}
      class={`relative min-h-0 min-w-0 max-w-full overflow-hidden ${props.class ?? ""}`}
    >
      <Show
        when={!useFallback()}
        fallback={
          <img
            src={props.fallbackImage ?? props.poster}
            alt=""
            class="h-full w-full object-cover"
            loading={props.eager ? "eager" : "lazy"}
            decoding="async"
          />
        }
      >
        <Show
          when={active()}
          fallback={
            props.poster ? (
              <img
                src={props.poster}
                alt=""
                class="h-full w-full scale-105 object-cover blur-[2px]"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div class="h-full w-full bg-gradient-to-br from-white/5 to-white/0" />
            )
          }
        >
          <video
            ref={video}
            class="h-full w-full object-cover transition-transform duration-700 ease-out"
            src={props.src}
            poster={props.poster}
            muted
            playsinline
            autoplay={!props.scrollPlay}
            loop
            preload="metadata"
            onError={onError}
          />
        </Show>
      </Show>
      <div
        class={
          props.overlay === "hero"
            ? "pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70"
            : "pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/78"
        }
      />
    </div>
  );
}
