import type { Dirent } from "node:fs";
import fs from "node:fs/promises";
import type { H3Event } from "h3";
import consola from "consola";
import { AutoFormatter } from "../formatters";
import type { MockPreset } from "../../types";
import { notUndefinedOrNull } from "./not-undefined";
import { useRuntimeConfig } from "#imports";

const getEntry = (dirent: Dirent) => {
  const formatter = new AutoFormatter(dirent.path, consola.error);
  return formatter.getEntry(dirent.name);
};

export async function getAllMockPresets(event: H3Event) {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.mockDir) {
    throw new TypeError("Mock server is not enabled");
  }

  const mockDirents = await fs.readdir(mockServer.mockDir, { recursive: true, withFileTypes: true });
  const entries = (await Promise.all(mockDirents.filter(dirent => dirent.isFile()).map(getEntry))).filter(notUndefinedOrNull);

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
