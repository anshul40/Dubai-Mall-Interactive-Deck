import { createSignal } from "solid-js";

/** Shared with `FloatingNav` + `ActionDock` so any in-deck jump can flash the correct chapter instantly. */
export const [navChapterOverride, setNavChapterOverride] = createSignal<string | undefined>();
