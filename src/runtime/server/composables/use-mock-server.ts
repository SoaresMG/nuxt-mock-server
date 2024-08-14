import type { H3Event } from "h3";
import type { DeletePresetOptions } from "../management";
import { getPresets, deletePreset, setPreset, getPreset, existsPreset, generatePreset } from "../management";

export function useMockServer(event: H3Event) {
  return {
    existsPreset: (name: string) => existsPreset(event, name),
    getPresets: () => getPresets(event),
    deletePreset: (name: string, options?: DeletePresetOptions) => deletePreset(event, name, options),
    setPreset: (name: string) => setPreset(event, name),
    getPreset: (name: string) => getPreset(event, name),
    generatePreset: (name: string) => generatePreset(event, name),
  };
}
