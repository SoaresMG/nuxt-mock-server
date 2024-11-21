import fs from "node:fs/promises";
import type { H3Event } from "h3";
import type { MockPreset } from "../../types";
import { getPresetEntries } from "../../utils/get-preset-entries";
import { useRuntimeConfig } from "#imports";

export async function getPreset(event: H3Event, name: string): Promise<MockPreset> {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.mockDir) {
    throw new TypeError("[mock-server] Is not enabled");
  }

  const mockDirents = await fs.readdir(`${mockServer.mockDir}/${name}`, { recursive: true, withFileTypes: true });
  const entries = await getPresetEntries(mockDirents);

  return { name, entries, isCurrent: name === event.context.preset };
}
