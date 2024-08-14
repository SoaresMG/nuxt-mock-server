import { getRouterParam } from "h3";
import { useMockServer } from "../../../composables";
import { definePresetHandler } from "../../../handlers";

export default definePresetHandler(async (event) => {
  const preset = getRouterParam(event, "id");
  const { deletePreset } = useMockServer(event);

  if (!preset) {
    throw new Error("Id not found");
  }

  await deletePreset(preset);
});
