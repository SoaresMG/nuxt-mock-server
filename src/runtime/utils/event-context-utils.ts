import { type H3Event, getCookie } from "h3";
import { MAIN_HEADER_KEY, MAIN_HEADER_VALUE, PRESET_COOKIE_KEY, PRESET_GENERATION_HEADER_KEY } from "./constants";

export function getEventGenerationPreset(event: H3Event) {
  return event.headers.get(PRESET_GENERATION_HEADER_KEY);
}

export function isGeneratingPreset(event: H3Event) {
  return !!getEventGenerationPreset(event);
}

export function getCookiePreset(event: H3Event) {
  return getCookie(event, PRESET_COOKIE_KEY);
}

export function isProxyingRequest(event: H3Event) {
  return event.headers.get(MAIN_HEADER_KEY) === MAIN_HEADER_VALUE.PROXY;
}
