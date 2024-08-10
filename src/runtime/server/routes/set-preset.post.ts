import { defineEventHandler, getQuery } from "h3";
import { useMockServer } from "../composables";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { setPreset } = useMockServer(event);

  if (!query?.preset || typeof query.preset !== "string") {
    return;
  }

  await setPreset(query.preset);
});
