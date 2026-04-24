import { Accessor, createSignal, onCleanup, onMount } from "solid-js";

export function useInView(
  ref: Accessor<HTMLElement | undefined>,
  options: IntersectionObserverInit = { threshold: 0.2 }
) {
  const [inView, setInView] = createSignal(false);

  onMount(() => {
    const el = ref();
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setInView(true);
    }, options);

    obs.observe(el);
    onCleanup(() => obs.disconnect());
  });

  return inView;
}
