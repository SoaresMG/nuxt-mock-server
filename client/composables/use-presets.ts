import { ref } from "vue";
import type { MockPreset } from "../../src/runtime/types";
import { useRpc } from "./use-rpc";

export function usePresets() {
  const { appFetch } = useRpc();

  const isLoading = ref(true);
  const presets = ref<MockPreset[]>([]);

  async function loadPresets() {
    isLoading.value = true;
    try {
      if (appFetch.value) {
        presets.value = await appFetch.value("/__mock-server__/presets");
      }
    }
    catch (e) {
      console.error(e);
    }
    finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    presets,
    loadPresets,
  };
}
