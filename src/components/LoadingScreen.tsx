import gsap from "gsap";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { loadingCopy, openingTitle } from "~/data/mall";
import { Button } from "~/ui/Button";

export function LoadingScreen(props: { onDone: () => void }) {
  const [visible, setVisible] = createSignal(true);
  const [enterEnabled, setEnterEnabled] = createSignal(false);
  let root!: HTMLDivElement;
  let videoEl!: HTMLVideoElement;

  onMount(() => {
    let introTl: gsap.core.Timeline | undefined;

    function runIntro() {
      introTl?.kill();
      setEnterEnabled(false);

      gsap.set(root.querySelectorAll("[data-ltr]"), { opacity: 0, y: 28 });
      gsap.set(root.querySelector("[data-tagline]"), { opacity: 0, y: 12 });
      gsap.set(root.querySelector("[data-enter-wrap]"), { opacity: 0, y: 10 });

      introTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      introTl
        .fromTo(
          root.querySelectorAll("[data-ltr]"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, stagger: 0.09, duration: 0.5 },
          0
        )
        .fromTo(
          root.querySelector("[data-tagline]"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 },
          ">-0.15"
        )
        .fromTo(
          root.querySelector("[data-enter-wrap]"),
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => setEnterEnabled(true),
          },
          ">-0.05"
        );
    }

    function onVideoEnded() {
      videoEl.currentTime = 0;
      runIntro();
      void videoEl.play();
    }

    runIntro();
    void videoEl.play?.().catch(() => {});
    videoEl.addEventListener("ended", onVideoEnded);

    onCleanup(() => {
      introTl?.kill();
      videoEl.removeEventListener("ended", onVideoEnded);
    });
  });

  function handleEnter() {
    if (!enterEnabled()) return;
    setEnterEnabled(false);
    gsap.to(root, {
      opacity: 0,
      duration: 0.65,
      ease: "power2.inOut",
      onComplete: () => {
        setVisible(false);
        props.onDone();
      },
    });
  }

  return (
    <Show when={visible()}>
      <div
        ref={root}
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
        role="dialog"
        aria-modal="true"
        aria-label="Welcome"
      >
        <video
          ref={videoEl}
          class="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="/nexora_starting.mp4"
          autoplay
          muted
          playsinline
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/58 to-ink/32"
          aria-hidden="true"
        />
        <div class="pointer-events-none absolute inset-0 bg-ink/18" aria-hidden="true" />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/[0.14] via-white/[0.04] to-transparent"
          aria-hidden="true"
        />

        <div class="relative z-10 flex w-full max-w-lg flex-col items-center gap-10 px-6 text-center">
          <div
            class="flex max-w-[min(100%,42rem)] flex-wrap justify-center gap-y-1 font-display text-[clamp(1.35rem,5.5vw,3rem)] font-medium leading-none tracking-tight text-white select-none"
            aria-hidden="true"
          >
            {openingTitle.split("").map((ch) => (
              <span
                data-ltr
                class={`inline-block will-change-transform ${ch === " " ? "w-[0.3em]" : ""}`}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          <p
            data-tagline
            class="max-w-md text-sm leading-relaxed text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_24px_rgba(0,0,0,0.45)] md:text-base"
          >
            {loadingCopy.line}
          </p>
          <div data-enter-wrap class="pointer-events-auto">
            <Button
              type="button"
              variant="primary"
              class="min-w-[8.5rem] uppercase tracking-[0.2em]"
              disabled={!enterEnabled()}
              onClick={handleEnter}
            >
              Enter
            </Button>
          </div>
        </div>
      </div>
    </Show>
  );
}
