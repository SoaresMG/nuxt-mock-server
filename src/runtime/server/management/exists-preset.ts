import fs from "node:fs/promises";
import type { H3Event } from "h3";
import { useRuntimeConfig } from "#imports";

export async function existsPreset(event: H3Event, preset: string) {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.mockDir) {
    throw new TypeError("Mock server is not enabled");
  }

  const mockDirents = await fs.readdir(mockServer.mockDir, { recursive: true, withFileTypes: true });
  return mockDirents.filter(dirent => !dirent.isFile() && dirent.path === preset);
}
