import type { H3Event } from "h3";
import type { DeletePresetOptions } from "../management";
import { getPresets, deletePreset, setPreset, getPreset, existsPreset, generatePreset, togglePause } from "../management";
import { isPaused } from "../../utils/event-context-utils";

export function useMockServer(event: H3Event) {
  return {
    isPaused: () => isPaused(event),
    pause: () => togglePause(event, false),
    resume: () => togglePause(event, true),
    existsPreset: (name: string) => existsPreset(event, name),
    getPresets: () => getPresets(event),
    deletePreset: (name: string, options?: DeletePresetOptions) => deletePreset(event, name, options),
    setPreset: (name: string) => setPreset(event, name),
    getPreset: (name: string) => getPreset(event, name),
    generatePreset: (name: string, cleanUnused: boolean = true) => generatePreset(event, {
      _preset: name,
      cleanUnused,
    }),
  };
}
