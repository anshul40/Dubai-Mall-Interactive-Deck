import { JSX, Show } from "solid-js";

export function SectionLabel(props: { kicker: string; title: string; lead?: string }) {
  return (
    <div class="min-w-0 max-w-3xl space-y-5">
      <p class="max-w-full text-xs uppercase tracking-[0.35em] text-gold">{props.kicker}</p>
      <h2 class="max-w-full break-words font-display text-display-lg text-balance text-white">
        {props.title}
      </h2>
      <Show when={props.lead}>
        <p class="max-w-2xl text-base font-light leading-relaxed text-white/65">{props.lead}</p>
      </Show>
    </div>
  );
}
