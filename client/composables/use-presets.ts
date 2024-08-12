import { ref } from "vue";
import type { MockPreset } from "../../src/runtime/types";
import { useRpc } from "./use-rpc";

export function usePresets() {
  const { appFetch } = useRpc();

  const isLoading = ref(true);
  const presets = ref<MockPreset[]>([]);

  async function loadPresets(setIsLoading = true) {
    if (setIsLoading) {
      isLoading.value = true;
    }

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

  async function setPreset(name: string) {
    isLoading.value = true;
    try {
      if (appFetch.value) {
        await appFetch.value("/__mock-server__/set-preset", { method: "POST", query: { preset: name } });
        await appFetch.value("/");
        await loadPresets(false);
      }
    }
    catch (e) {
      console.error(e);
    }
    finally {
      isLoading.value = false;
    }
  }

  async function deletePreset(name: string) {
    isLoading.value = true;
    try {
      if (appFetch.value) {
        await appFetch.value("/__mock-server__/delete-preset", { method: "POST", query: { preset: name } });
        await appFetch.value("/");
        await loadPresets(false);
      }
    }
    catch (e) {
      console.error(e);
    }
    finally {
      isLoading.value = false;
    }
  }

  async function generatePreset(name: string) {
    isLoading.value = true;
    try {
      if (appFetch.value) {
        await appFetch.value("/__mock-server__/generate-preset", { method: "POST", query: { preset: name } });
        await loadPresets(false);
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
    setPreset,
    deletePreset,
    generatePreset,
  };
}
