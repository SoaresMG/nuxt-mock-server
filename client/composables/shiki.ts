import type { BundledLanguage, Highlighter } from "shiki";
import { createHighlighter } from "shiki";
import { computed, ref, toValue } from "vue";
import type { MaybeRef } from "@vueuse/core";
import { useRpc } from "./use-rpc";

export const shiki = ref<Highlighter>();

export function loadShiki() {
  // Only loading when needed
  return createHighlighter({
    themes: [
      "vitesse-dark",
      "vitesse-light",
    ],
    langs: [
      "json",
    ],
  }).then((i) => {
    shiki.value = i;
  });
}

export function renderCodeHighlight(code: MaybeRef<string>, lang: BundledLanguage = "json") {
  const { colorMode } = useRpc();

  return computed(() => {
    const mode = colorMode.value || "light";
    return shiki.value!.codeToHtml(toValue(code), {
      lang,
      theme: mode === "dark" ? "vitesse-dark" : "vitesse-light",
    }) || "";
  });
}
