import { getQuery } from "h3";
import { useMockServer } from "../composables";
import { definePresetHandler } from "../handlers";

export default definePresetHandler(async (event) => {
  const query = getQuery(event);
  const { deletePreset } = useMockServer(event);

  if (!query?.preset || typeof query.preset !== "string") {
    return;
  }

  await deletePreset(query.preset);
});
