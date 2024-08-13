<template>
  <div>
    <NuxtPage v-if="client" />
    <div v-else>
      <NTip n="yellow">
        Failed to connect to the client. Did you open this page inside Nuxt DevTools?
      </NTip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDevtoolsClient } from "@nuxt/devtools-kit/iframe-client";
import { fetchModuleMeta, setModuleMeta } from "./composables/use-module-meta";
import { createError } from "#app";
import "floating-vue/dist/style.css";

const client = useDevtoolsClient();
const data = await fetchModuleMeta();

if (!data) {
  throw createError("Failed to fetch module meta");
}

setModuleMeta(data);
</script>
