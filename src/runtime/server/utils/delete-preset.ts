import fs from "node:fs/promises";
import type { H3Event } from "h3";
import consola from "consola";
import type { MockPreset } from "../../types";
import { useRuntimeConfig } from "#imports";

export async function deletePreset(event: H3Event, preset: MockPreset): Promise<boolean> {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.mockDir) {
    throw new TypeError("Mock server is not enabled");
  }

  try {
    const mockDirents = await fs.readdir(mockServer.mockDir, { recursive: true, withFileTypes: true });
    const presetDirent = mockDirents.find(dirent => !dirent.isFile() && dirent.name.toLowerCase() === preset.name.toLowerCase());

    if (presetDirent) {
      await fs.rmdir(`${mockServer.mockDir}/${presetDirent.name}`, { recursive: true });
    }
  }
  catch (e) {
    consola.error("An error occurred while processing the mock server request", e);
    return false;
  }

  return true;
}
