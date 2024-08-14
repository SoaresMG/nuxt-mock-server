import { getRouterParam } from "h3";
import { definePresetHandler } from "../../../handlers";
import { useMockServer } from "../../../composables";

export default definePresetHandler(async (event) => {
  const preset = getRouterParam(event, "id");
  const { generatePreset } = useMockServer(event);

  if (!preset) {
    throw new Error("Id not found");
  }

  await generatePreset(preset);
});
