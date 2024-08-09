import { onDevtoolsClientConnected } from "@nuxt/devtools-kit/iframe-client";
import type { $Fetch } from "nitropack";
import { ref, watchEffect } from "vue";
import type { NuxtDevtoolsClient } from "@nuxt/devtools-kit/types";

export function useRpc() {
  const appFetch = ref<$Fetch>();
  const appReload = ref<() => void>(() => {});
  const devtools = ref<NuxtDevtoolsClient>();
  const colorMode = ref<"dark" | "light">();

  onDevtoolsClientConnected(async (client) => {
    appFetch.value = client.host.app.$fetch;
    appReload.value = client.host.app.reload;

    watchEffect(() => {
      colorMode.value = client.host.app.colorMode.value;
    });
    devtools.value = client.devtools;
  });

  return {
    appFetch,
    appReload,
    devtools,
    colorMode,
  };
}
