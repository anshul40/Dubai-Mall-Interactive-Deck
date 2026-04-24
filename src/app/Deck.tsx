import { createEffect, createSignal, lazy, Show, Suspense } from "solid-js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsapPlugins } from "~/animations/register";
import { ActionDock } from "~/components/ActionDock";
import { CursorGlow } from "~/components/CursorGlow";
import { LoadingScreen } from "~/components/LoadingScreen";
import { SectionTransition } from "~/components/SectionTransition";
import { LenisProvider } from "~/lib/lenis-context";
import { FloatingNav } from "~/navigation/FloatingNav";
import Hero from "~/sections/Hero";
import SectionImpact from "~/sections/SectionImpact";
import SectionInterlude from "~/sections/SectionInterlude";
import SectionWhy from "~/sections/SectionWhy";
import SectionRetail from "~/sections/SectionRetail";

const SectionLuxury = lazy(() => import("~/sections/SectionLuxury"));
const SectionDining = lazy(() => import("~/sections/SectionDining"));
const SectionEntertainment = lazy(() => import("~/sections/SectionEntertainment"));
const SectionPartnerships = lazy(() => import("~/sections/SectionPartnerships"));
const SectionEvents = lazy(() => import("~/sections/SectionEvents"));
const SectionNextSteps = lazy(() => import("~/sections/SectionNextSteps"));
const SectionPlatform = lazy(() => import("~/sections/SectionPlatform"));

function SectionFallback() {
  return <div class="min-h-[30vh] w-full bg-ink" aria-hidden="true" />;
}

export default function Deck() {
  const [ready, setReady] = createSignal(false);

  createEffect(() => {
    if (!ready()) return;
    ensureGsapPlugins();
    queueMicrotask(() => ScrollTrigger.refresh());
  });

  return (
    <LenisProvider>
      <Show when={!ready()}>
        <LoadingScreen onDone={() => setReady(true)} />
      </Show>

      <Show when={ready()}>
        <CursorGlow />
        <FloatingNav />
        <ActionDock />
        <main class="relative w-full min-w-0 max-w-full overflow-x-clip pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:pb-32">
          <Hero />
          <SectionInterlude />
          <SectionImpact />
          <SectionWhy />
          <SectionRetail />
          <Suspense fallback={<SectionFallback />}>
            <SectionLuxury />
            <SectionDining />
            <SectionEntertainment />
            <SectionPartnerships />
            <SectionEvents />
            <SectionNextSteps />
            <SectionPlatform />
          </Suspense>
        </main>
        <SectionTransition />
        <div class="grain" aria-hidden="true" />
      </Show>
    </LenisProvider>
  );
}
