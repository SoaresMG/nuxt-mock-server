import type { EventHandler, EventHandlerRequest, H3Event } from "h3";
import { DEFAULT_PRESET, PRESET_COOKIE_KEY } from "../../utils";
import { defineEventHandler, getCookie, setCookie } from "#imports";

export interface PresetHandlerOptions {
  defaultPreset?: string;
}

export const definePresetHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  options?: PresetHandlerOptions,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event: H3Event) => {
    const cookie = getCookie(event, PRESET_COOKIE_KEY);
    if (cookie) {
      event.context.preset = cookie;
      return handler(event);
    }

    // Default if nothing is in the cookie yet
    const defaultPreset = options?.defaultPreset || DEFAULT_PRESET; // DEFAULT_PRESET is just a fallback
    setCookie(event, PRESET_COOKIE_KEY, defaultPreset);
    event.context.preset = defaultPreset;
    return handler(event);
  });
