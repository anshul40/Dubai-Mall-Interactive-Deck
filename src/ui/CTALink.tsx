import { JSX, splitProps } from "solid-js";

type Props = {
  variant?: "primary" | "ghost";
  class?: string;
  children: JSX.Element;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export function CTALink(props: Props) {
  const [local, rest] = splitProps(props, ["variant", "class", "children"]);
  const variant = () => local.variant ?? "primary";

  return (
    <a
      class={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        variant() === "primary"
          ? "bg-mist text-ink hover:bg-white"
          : "border border-white/20 bg-white/5 text-mist hover:border-white/40 hover:bg-white/10"
      } ${local.class ?? ""}`}
      {...rest}
    >
      {local.children}
    </a>
  );
}
