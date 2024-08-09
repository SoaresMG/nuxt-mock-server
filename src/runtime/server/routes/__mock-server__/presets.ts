import fs from "node:fs/promises";
import type { Dirent } from "node:fs";
import consola from "consola";
import { AutoFormatter } from "../../formatters";
import { getPresets, notUndefinedOrNull } from "../../utils";
import { definePresetHandler } from "../../handlers";
import { useRuntimeConfig } from "#imports";

const getEntry = (dirent: Dirent) => {
  const formatter = new AutoFormatter(dirent.path, consola.error);
  return formatter.getEntry(dirent.name);
};

export default definePresetHandler(async () => {
  const { mockServer } = useRuntimeConfig();

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.mockDir) {
    return;
  }

  const mockFiles = await fs.readdir(mockServer.mockDir, { recursive: true, withFileTypes: true });
  return getPresets((await Promise.all(mockFiles.filter(file => file.isFile()).map(getEntry))).filter(notUndefinedOrNull));
});
