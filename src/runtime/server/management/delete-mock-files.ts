import fs from "node:fs/promises";
import type { H3Event } from "h3";
import consola from "consola";
import { useRuntimeConfig } from "#imports";

export interface DeleteRoutesOptions {
  preset: string;
  files: string[];
}

export async function deleteMockFiles(event: H3Event, { preset, files }: DeleteRoutesOptions): Promise<boolean> {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.mockDir) {
    throw new TypeError("Mock server is not enabled");
  }

  const normalizedFilePaths = files.map(file => file.replace(/\\/g, "/"));

  try {
    const mockDirents = await fs.readdir(mockServer.mockDir, { recursive: true, withFileTypes: true });
    const presetDirent = mockDirents.find(dirent => !dirent.isFile() && dirent.name.toLowerCase() === preset.toLowerCase());

    if (presetDirent) {
      const mockFiles = await fs.readdir(`${mockServer.mockDir}/${presetDirent.name}`, { withFileTypes: true });
      const toDeleteFiles = mockFiles.filter(file => file.isFile() && normalizedFilePaths.includes(file.name));

      await Promise.all(toDeleteFiles.map(fileDirent => deleteMockFile(`${mockServer.mockDir}/${presetDirent.name}`, fileDirent.name)));
    }
    else {
      consola.warn(`[mock-server] Preset ${preset} not found`);
    }
  }
  catch (e) {
    consola.error(`[mock-server] An error occurred while deleting mocks for ${preset}`, e);
    return false;
  }

  return true;
}

async function deleteMockFile(basePath: string, mockPath: string) {
  try {
    await fs.rm(`${basePath}/${mockPath}`);
    return true;
  }
  catch (e) {
    consola.error(`An error occurred while deleting ${mockPath}`, e);
  }
  return false;
}
