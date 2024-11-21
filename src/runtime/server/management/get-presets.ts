import fs from "node:fs/promises";
import type { H3Event } from "h3";
import type { MockPreset } from "../../types";
import { getPresetEntries } from "../../utils/get-preset-entries";
import { useRuntimeConfig } from "#imports";

export async function getPresets(event: H3Event) {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.mockDir) {
    throw new TypeError("[mock-server] Is not enabled");
  }

  const mockDirents = await fs.readdir(mockServer.mockDir, { recursive: true, withFileTypes: true });
  const entries = await getPresetEntries(mockDirents);

  const presets: MockPreset[] = [];

  for (const entry of entries) {
    const preset = presets.find(preset => preset.name === entry.meta.preset);

    if (preset) {
      preset.entries.push(entry);
    }
    else {
      presets.push({ name: entry.meta.preset, entries: [entry], isCurrent: entry.meta.preset === event.context.preset });
    }
  }

  return presets;
}
