import { JSX, splitProps } from "solid-js";

type Props = {
  class?: string;
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function GlassPanel(props: Props) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl ${local.class ?? ""}`}
      {...rest}
    >
      {local.children}
    </div>
  );
}
