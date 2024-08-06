import { ref } from "vue";
import type { MockEntry } from "../../src/runtime/types";
import { useRpc } from "./use-rpc";

export function useEntries() {
  const { appFetch } = useRpc();

  const isLoading = ref(true);
  const entries = ref<MockEntry[]>([]);

  async function loadEntries() {
    isLoading.value = true;
    try {
      if (appFetch.value) {
        entries.value = await appFetch.value("/__mock-server__/entries");
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
    entries,
    loadEntries,
  };
}
