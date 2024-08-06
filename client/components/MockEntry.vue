<template>
  <SectionBlock :open="false">
    <template #text>
      <div class="flex space-x-5">
        <h3 class="opacity-80 text-base mb-1 flex space-x-3 items-center">
          <div
            class="flex space-x-2"
          >
            <NIcon
              icon="carbon:api-1"
              class="opacity-50 text-lg"
            />
          </div>
          <div>
            {{ meta.path }}
          </div>
          <div>
            <NBadge>{{ meta.lastModified }}</NBadge>
          </div>
        </h3>
      </div>
    </template>
    <template #description>
      <div class="flex items-center space-x-3">
        <div>
          Headers
        </div>
        <div
          class="text-xs mt-1 opacity-70"
        >
          <ul class="list-disc ml-5">
            <li
              v-for="(value, key) of meta.headers"
              :key="key"
              class="text-sm opacity-80 mb-1"
            >
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </template>
    <CodeBlock
      class="max-h-[250px] overflow-y-auto"
      :code="JSON.stringify(data, null, 2)"
      lang="json"
    />
  </SectionBlock>
</template>

<script setup lang="ts">
import type { MockEntry } from "../../src/runtime/types";

defineProps<MockEntry>();
</script>

<style scoped>
details {
  --at-apply: border-none;
}

summary {
  --at-apply: border-none;
  list-style: none;
}

details[open] summary {
  --at-apply: border-none;
}

details summary::-webkit-details-marker {
  display:none;
}

details[open] .chevron {
  transform: rotate(180deg);
  opacity: 0.75;
}
</style>
