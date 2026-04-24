import { A } from "@solidjs/router";
import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { navSections } from "~/data/mall";
import { useSectionSpy } from "~/hooks/useSectionSpy";
import { useLenisProgress, useLenisScroll } from "~/lib/lenis-context";
import { navChapterOverride, setNavChapterOverride } from "~/navigation/navChapterHighlight";

const SPY_IDS = ["top", "interlude", "impact", ...navSections.map((s) => s.id)] as const;

function mapSpyToNavId(raw: string) {
  if (raw === "interlude") return "impact";
  return raw;
}

export function FloatingNav() {
  const scrollTo = useLenisScroll();
  const progress = useLenisProgress();
  const activeId = useSectionSpy([...SPY_IDS]);
  const [menuOpen, setMenuOpen] = createSignal(false);
  const navActiveId = () => {
    const clicked = navChapterOverride();
    if (clicked) return clicked;
    return mapSpyToNavId(activeId());
  };

  createEffect(() => {
    const target = navChapterOverride();
    if (!target) return;
    if (mapSpyToNavId(activeId()) === target) {
      setNavChapterOverride(undefined);
    }
  });

  const go = (id: string) => {
    setNavChapterOverride(id);
    scrollTo(`#${id}`, { offset: -80 });
    setMenuOpen(false);
  };

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    onCleanup(() => window.removeEventListener("keydown", onKey));
  });

  const progressBar = () => (
    <div class="relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
      <div
        class="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-300 ease-out"
        style={{ width: `${Math.round(progress() * 100)}%` }}
      />
    </div>
  );

  return (
    <>
      <header class="pointer-events-none fixed inset-x-0 top-0 z-[60] flex min-w-0 justify-center px-3 pt-3 sm:px-4 sm:pt-5 md:px-8">
        <div class="pointer-events-auto flex w-full min-w-0 max-w-6xl flex-col gap-2 rounded-2xl border border-white/10 bg-black/55 px-3 py-2 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-md md:flex-row md:items-center md:gap-4 md:rounded-full md:bg-black/50 md:px-5 md:py-2.5 md:backdrop-blur-2xl">
          <div class="flex w-full min-w-0 items-center gap-2 md:w-auto md:max-w-[13rem] lg:max-w-none lg:flex-1 md:gap-3">
            <button
              type="button"
              class="shrink-0 text-[10px] uppercase tracking-[0.28em] text-white/80 transition duration-500 hover:text-white sm:text-[11px] sm:tracking-[0.32em]"
              onClick={() => {
                setNavChapterOverride(undefined);
                scrollTo("#top", { offset: -24 });
                setMenuOpen(false);
              }}
            >
              Dubai Mall
            </button>
            <A
              href="/events"
              class="shrink-0 rounded-full border border-white/12 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-gold/90 transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold sm:px-3 sm:text-[10px] sm:tracking-[0.18em]"
            >
              Events hub
            </A>
            {progressBar()}
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white md:hidden"
              aria-expanded={menuOpen()}
              aria-controls="deck-nav-menu"
              aria-label={menuOpen() ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen())}
            >
              <Show
                when={menuOpen()}
                fallback={
                  <span class="flex w-5 flex-col gap-1.5" aria-hidden="true">
                    <span class="h-px w-full bg-white" />
                    <span class="h-px w-full bg-white" />
                    <span class="h-px w-full bg-white" />
                  </span>
                }
              >
                <span class="relative block h-5 w-5" aria-hidden="true">
                  <span class="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                  <span class="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
                </span>
              </Show>
            </button>
          </div>

          <nav class="scrollbar-hide hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto md:flex md:gap-1">
            <For each={[...navSections]}>
              {(item) => {
                const active = () => navActiveId() === item.id;
                return (
                  <button
                    type="button"
                    class={`group relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors duration-75 sm:px-3 sm:text-[11px] sm:tracking-[0.18em] lg:px-4 ${
                      active()
                        ? "text-gold"
                        : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                    }`}
                    onClick={() => go(item.id)}
                  >
                    <span class="relative z-[1]">{item.label}</span>
                    <Show when={active()}>
                      <span class="absolute inset-x-0.5 inset-y-0.5 -z-0 rounded-full bg-gold/10 ring-1 ring-gold/25 sm:inset-x-1" />
                    </Show>
                  </button>
                );
              }}
            </For>
          </nav>
        </div>
      </header>

      <Show when={menuOpen()}>
        <div
          class="fixed inset-0 z-[59] bg-black/75 backdrop-blur-none md:hidden"
          data-lenis-prevent
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          id="deck-nav-menu"
          class="fixed right-3 top-[4.75rem] z-[61] max-h-[min(78vh,calc(100dvh-5.75rem))] w-[min(20rem,calc(100dvw-1.5rem))] max-w-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-white/12 bg-[#0a0a0a]/96 py-3 shadow-[0_40px_100px_rgba(0,0,0,0.75)] backdrop-blur-md md:hidden"
          data-lenis-prevent
        >
          <p class="px-4 pb-2 text-[10px] uppercase tracking-[0.35em] text-white/40">Chapters</p>
          <A
            href="/events"
            class="mx-2 mb-2 flex items-center justify-between rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-left text-sm uppercase tracking-[0.18em] text-gold"
            onClick={() => setMenuOpen(false)}
          >
            <span>Events hub</span>
            <span class="text-xs text-gold/60">→</span>
          </A>
          <For each={[...navSections]}>
            {(item) => {
              const active = () => navActiveId() === item.id;
              return (
                <button
                  type="button"
                  class={`flex w-full items-center justify-between px-4 py-3 text-left text-sm uppercase tracking-[0.2em] transition ${
                    active() ? "bg-white/[0.08] text-gold" : "text-white/75 hover:bg-white/[0.05] hover:text-white"
                  }`}
                  onClick={() => go(item.id)}
                >
                  <span>{item.label}</span>
                  <span class="text-xs text-white/30">→</span>
                </button>
              );
            }}
          </For>
        </nav>
      </Show>
    </>
  );
}
