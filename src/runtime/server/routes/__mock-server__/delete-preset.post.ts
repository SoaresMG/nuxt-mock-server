import { defineEventHandler, deleteCookie, getQuery, setCookie } from "h3";
import { PRESET_COOKIE_KEY } from "../../utils/constants";
import { getAllMockPresets } from "../../utils";
import { deletePreset } from "../../utils/delete-preset";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (!query?.preset || typeof query.preset !== "string") {
    return;
  }

  const presets = await getAllMockPresets(event);

  const deletingPreset = presets.find(preset => preset.name === query.preset);
  const newPreset = presets.find(preset => preset.name !== query.preset);

  if (deletingPreset) {
    await deletePreset(event, deletingPreset);
  }

  if (newPreset) {
    setCookie(event, PRESET_COOKIE_KEY, newPreset.name);
  }
  else {
    deleteCookie(event, PRESET_COOKIE_KEY);
  }
});
