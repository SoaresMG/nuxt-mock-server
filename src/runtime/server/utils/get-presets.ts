import type { MockEntry, MockPreset } from "../../types";

export function getPresets(entries: MockEntry[]): MockPreset[] {
  const presets: MockPreset[] = [];

  for (const entry of entries) {
    const preset = presets.find(preset => preset.name === entry.meta.preset);

    if (preset) {
      preset.entries.push(entry);
    }
    else {
      presets.push({ name: entry.meta.preset, entries: [entry] });
    }
  }

  return presets;
}
