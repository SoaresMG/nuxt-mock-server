import { defineEventHandler, getQuery, setCookie } from "h3";
import { PRESET_COOKIE_KEY } from "../../utils";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  if (!query?.preset || typeof query.preset !== "string") {
    return;
  }

  setCookie(event, PRESET_COOKIE_KEY, query.preset);
});
