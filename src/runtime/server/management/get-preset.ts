import type { Dirent } from "node:fs";
import fs from "node:fs/promises";
import type { H3Event } from "h3";
import consola from "consola";
import { AutoFormatter } from "../../formatters";
import type { MockPreset } from "../../types";
import { notUndefinedOrNull } from "../../utils";
import { useRuntimeConfig } from "#imports";

const getEntry = (dirent: Dirent) => {
  const formatter = new AutoFormatter(dirent.path, consola.error);
  return formatter.getEntry(dirent.name);
};

export async function getPreset(event: H3Event, name: string): Promise<MockPreset> {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.mockDir) {
    throw new TypeError("[mock-server] Is not enabled");
  }

  const mockDirents = await fs.readdir(`${mockServer.mockDir}/${name}`, { recursive: true, withFileTypes: true });
  const entries = (await Promise.all(mockDirents.filter(dirent => dirent.isFile()).map(getEntry))).filter(notUndefinedOrNull);

  return { name, entries, isCurrent: name === event.context.preset };
}
