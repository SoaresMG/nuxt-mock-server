import { type H3Event, getCookie } from "h3";
import { MAIN_HEADER_KEY, MAIN_HEADER_VALUE, PRESET_COOKIE_KEY, PRESET_GENERATION_HEADER_KEY, PAUSED_COOKIE_KEY } from "./constants";
import { useRuntimeConfig } from "#imports";

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

export function isPaused(event: H3Event) {
  const { mockServerIsPaused } = event.context;

  if (mockServerIsPaused === undefined) {
    return !!getCookie(event, PAUSED_COOKIE_KEY);
  }

  return mockServerIsPaused;
}

export function isDisabled(event: H3Event) {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer?.enabled) {
    return true;
  }

  return isPaused(event);
}

export function requestIsSkipped(event: H3Event) {
  return isProxyingRequest(event) || isDisabled(event);
}
