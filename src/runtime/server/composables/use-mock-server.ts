import type { H3Event } from "h3";
import { getPresets, deletePreset, setPreset, getPreset } from "../management";

export function useMockServer(event: H3Event) {
  return {
    getPresets: () => getPresets(event),
    deletePreset: (name: string) => deletePreset(event, name),
    setPreset: (name: string) => setPreset(event, name),
    getPreset: (name: string) => getPreset(event, name),
  };
}
