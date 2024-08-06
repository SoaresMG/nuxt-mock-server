import fs from "node:fs/promises";
import { defineEventHandler } from "h3";
import consola from "consola";
import { AutoFormatter } from "../../formatters";
import { notUndefinedOrNull } from "../../utils";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async () => {
  const { mockServer } = useRuntimeConfig();

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.mockDir) {
    return;
  }

  const formatter = new AutoFormatter(mockServer.mockDir, !!mockServer.compress, consola.error);
  const mockFiles = await fs.readdir(mockServer.mockDir);
  return (await Promise.all(mockFiles.map(file => formatter.getEntry(file)))).filter(notUndefinedOrNull);
});
