import { useLenisScroll } from "~/lib/lenis-context";

type Props = {
  target: string;
  label?: string;
};

export function ScrollCue(props: Props) {
  const scrollTo = useLenisScroll();
  const label = () => props.label ?? "Continue";

  return (
    <div class="pointer-events-none absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-20 flex min-w-0 justify-center px-3 sm:bottom-10 sm:px-0 md:bottom-12">
      <button
        type="button"
        class="pointer-events-auto box-border flex w-full min-w-0 max-w-full flex-col items-center gap-2.5 rounded-full bg-black/35 px-3 py-3 text-[10px] uppercase tracking-[0.28em] text-white/70 ring-1 ring-white/10 backdrop-blur-sm transition hover:text-gold sm:w-auto sm:max-w-fit sm:px-4 sm:tracking-[0.35em]"
        onClick={() => scrollTo(props.target, { offset: -8 })}
      >
        <span class="inline-block motion-safe:animate-scrollCueLabel motion-reduce:animate-none">
          {label()}
        </span>
        <span class="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 bg-black/25 pt-1.5 backdrop-blur-sm">
          <span class="block h-2 w-0.5 rounded-full bg-gold/90 motion-safe:animate-scrollCue motion-reduce:animate-none" />
        </span>
      </button>
    </div>
  );
}
