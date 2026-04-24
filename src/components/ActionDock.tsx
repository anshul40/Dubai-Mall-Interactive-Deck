import { For } from "solid-js";
import { nextStepActions } from "~/data/contact";
import { useLenisScroll } from "~/lib/lenis-context";
import { setNavChapterOverride } from "~/navigation/navChapterHighlight";

const shortLabel: Record<string, string> = {
  "action-leasing": "Lease",
  "action-sponsor": "Sponsor",
  "action-events": "Book",
};

export function ActionDock() {
  const scrollTo = useLenisScroll();

  return (
    <div class="pointer-events-none fixed inset-x-0 bottom-0 z-[55] flex justify-center px-2 pb-3 sm:px-4 sm:pb-4 md:pb-6">
      <div class="pointer-events-auto flex max-w-full items-stretch gap-0.5 rounded-full border border-white/12 bg-black/60 p-1 shadow-[0_16px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:gap-1 sm:p-1.5 md:max-w-lg md:gap-2 md:px-2">
        <For each={nextStepActions}>
          {(a) => (
            <button
              type="button"
              class="min-w-0 flex-1 rounded-full px-2.5 py-2 text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-white/80 transition hover:bg-white/10 hover:text-white sm:px-3 sm:py-2.5 sm:text-[10px] sm:tracking-[0.18em] md:flex-none md:px-6 md:text-[11px] md:tracking-[0.2em]"
              onClick={() => {
                setNavChapterOverride("next-steps");
                scrollTo(`#${a.id}`, { offset: -88 });
              }}
            >
              {shortLabel[a.id] ?? a.pillar}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
