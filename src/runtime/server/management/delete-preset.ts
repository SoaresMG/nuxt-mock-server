import fs from "node:fs/promises";
import { deleteCookie, setCookie, type H3Event } from "h3";
import consola from "consola";
import { PRESET_COOKIE_KEY } from "../../utils/constants";
import { getPresets } from "./get-presets";
import { useRuntimeConfig } from "#imports";

export interface DeletePresetOptions {
  changeTo?: string | false;
}

export async function deletePreset(event: H3Event, name: string, options: DeletePresetOptions = {}): Promise<boolean> {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled || !mockServer.mockDir) {
    throw new TypeError("Mock server is not enabled");
  }

  const presets = await getPresets(event);

  const deletingPreset = presets.find(preset => preset.name === name);

  if (deletingPreset) {
    try {
      const mockDirents = await fs.readdir(mockServer.mockDir, { recursive: true, withFileTypes: true });
      const presetDirent = mockDirents.find(dirent => !dirent.isFile() && dirent.name.toLowerCase() === deletingPreset.name.toLowerCase());

      if (presetDirent) {
        await fs.rmdir(`${mockServer.mockDir}/${presetDirent.name}`, { recursive: true });
      }
    }
    catch (e) {
      consola.error("An error occurred while processing the mock server request", e);
      return false;
    }
  }

  if (options.changeTo !== false) {
    const newPreset = options.changeTo ?? presets.find(preset => preset.name !== name)?.name;
    if (newPreset) {
      setCookie(event, PRESET_COOKIE_KEY, newPreset);
    }
    else {
      deleteCookie(event, PRESET_COOKIE_KEY);
    }
  }

  return true;
}
