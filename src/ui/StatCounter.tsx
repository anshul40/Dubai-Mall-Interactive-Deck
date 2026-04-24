import gsap from "gsap";
import { onCleanup, onMount } from "solid-js";
import { ensureGsapPlugins } from "~/animations/register";
import { isNarrowViewport, prefersReducedMotion } from "~/lib/utils";

type Props = {
  value: string;
  label: string;
  hint?: string;
  animate?: boolean;
  variant?: "default" | "impact";
};

function parseNumericDisplay(raw: string) {
  const cleaned = raw.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return { num: Number(match[1]), suffix: match[2] ?? "" };
}

export function StatCounter(props: Props) {
  let wrap!: HTMLDivElement;
  let valueEl!: HTMLParagraphElement;

  onMount(() => {
    ensureGsapPlugins();

    const skipTween =
      !props.animate || prefersReducedMotion() || isNarrowViewport();

    valueEl.textContent = props.value;

    if (skipTween) return;

    const parsed = parseNumericDisplay(props.value);
    if (!parsed || Number.isNaN(parsed.num)) return;

    const fmt = (v: number) => {
      const hasDec = !Number.isInteger(parsed!.num);
      const rounded = hasDec ? Math.round(v * 10) / 10 : Math.round(v);
      return `${rounded}${parsed!.suffix}`;
    };

    const obj = { v: 0 };
    valueEl.textContent = fmt(0);

    const tween = gsap.to(obj, {
      v: parsed.num,
      duration: 1.35,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrap,
        start: "top 92%",
        once: true,
      },
      onUpdate: () => {
        valueEl.textContent = fmt(obj.v);
      },
      onComplete: () => {
        valueEl.textContent = props.value;
      },
    });

    onCleanup(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  });

  const isImpact = () => props.variant === "impact";

  return (
    <div ref={wrap} class="space-y-3">
      <p
        ref={valueEl}
        class={`min-h-[1.15em] font-display tabular-nums text-white ${
          isImpact()
            ? "text-5xl [text-shadow:0_0_40px_rgba(201,169,98,0.14)] md:text-6xl md:[text-shadow:0_0_60px_rgba(201,169,98,0.18)] lg:text-7xl"
            : "text-4xl md:text-5xl"
        }`}
      />
      <p
        class={`uppercase tracking-[0.25em] text-white/45 ${
          isImpact() ? "text-xs md:text-[13px]" : "text-xs"
        }`}
      >
        {props.label}
      </p>
      {props.hint ? (
        <p class={`text-white/35 ${isImpact() ? "text-sm" : "text-sm"}`}>{props.hint}</p>
      ) : null}
    </div>
  );
}
