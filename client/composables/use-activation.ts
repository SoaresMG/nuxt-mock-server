import { onMounted, ref } from "vue";
import { useRpc } from "./use-rpc";

export function useActivation() {
  const { appFetch } = useRpc();

  const isPaused = ref<boolean>(false);

  async function reloadState() {
    try {
      if (appFetch.value) {
        isPaused.value = await appFetch.value("/__mock-server__/activation", { method: "GET" });
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  onMounted(reloadState);

  async function setActivation(pause: boolean) {
    try {
      if (appFetch.value) {
        isPaused.value = pause;
        await appFetch.value(`/__mock-server__/activation/${pause ? "pause" : "resume"}`, { method: "POST" });
      }
    }
    catch (e) {
      console.error(e);
    }
    finally {
      reloadState();
    }
  }

  return {
    isPaused,
    pause: () => setActivation(true),
    resume: () => setActivation(false),
  };
}
