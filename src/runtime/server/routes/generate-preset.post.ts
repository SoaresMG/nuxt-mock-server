import { getQuery } from "h3";
import { definePresetHandler } from "../handlers";
import { generatePreset } from "../management";
import { useRuntimeConfig } from "#imports";

export default definePresetHandler(async (event) => {
  const query = getQuery(event);
  const preset = query.preset;
  const runtimeConfig = useRuntimeConfig(event);

  if (!preset || typeof preset !== "string") {
    throw new Error("Preset is required and must be a string");
  }

  await generatePreset(runtimeConfig, undefined, preset);
});
