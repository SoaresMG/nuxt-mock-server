import type { H3Event } from "h3";
import type { DeletePresetOptions } from "../management";
import { getPresets, deletePreset, setPreset, getPreset } from "../management";

export function useMockServer(event: H3Event) {
  return {
    getPresets: () => getPresets(event),
    deletePreset: (name: string, options?: DeletePresetOptions) => deletePreset(event, name, options),
    setPreset: (name: string) => setPreset(event, name),
    getPreset: (name: string) => getPreset(event, name),
  };
}
