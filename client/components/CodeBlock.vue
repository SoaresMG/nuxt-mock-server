<!-- eslint-disable vue/no-v-html -->
<template>
  <pre
    class="n-code-block"
    :class="lines ? 'n-code-block-lines' : ''"
    v-html="rendered"
  />
</template>

<script setup lang="ts">
import type { BundledLanguage } from "shiki";
import { computed } from "vue";
import { renderCodeHighlight } from "../composables/shiki";

const props = withDefaults(
  defineProps<{
    code: string;
    lang?: BundledLanguage;
    lines?: boolean;
    transformRendered?: (code: string) => string;
  }>(),
  {
    lines: false,
  },
);
const rendered = computed(() => {
  const code = renderCodeHighlight(props.code, props.lang);
  return props.transformRendered ? props.transformRendered(code.value || "") : code.value;
});
</script>

<style scoped>
.n-code-block-lines .shiki code .line::before {
  display: none;
}
</style>
