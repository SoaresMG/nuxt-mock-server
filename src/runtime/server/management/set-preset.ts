import { setCookie, type H3Event } from "h3";
import { PRESET_COOKIE_KEY } from "../../utils";

export async function setPreset(event: H3Event, name: string) {
  setCookie(event, PRESET_COOKIE_KEY, name);
}
