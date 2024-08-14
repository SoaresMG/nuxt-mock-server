import { getRouterParam } from "h3";
import { definePresetHandler } from "../../../handlers";
import { generatePreset } from "../../../management";
import { useRuntimeConfig } from "#imports";

export default definePresetHandler(async (event) => {
  const preset = getRouterParam(event, "id");
  const runtimeConfig = useRuntimeConfig(event);

  if (!preset) {
    throw new Error("Id not found");
  }

  await generatePreset(runtimeConfig, preset);
});
