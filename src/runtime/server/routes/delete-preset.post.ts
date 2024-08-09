import { defineEventHandler, deleteCookie, getQuery, setCookie } from "h3";
import { PRESET_COOKIE_KEY, getPresets, deletePreset } from "../../utils";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (!query?.preset || typeof query.preset !== "string") {
    return;
  }

  const presets = await getPresets(event);

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
