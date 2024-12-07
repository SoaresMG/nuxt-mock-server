export enum MAIN_HEADER_VALUE {
  PROXY = "PROXY",
  FOUND = "FOUND",
  CREATED = "CREATED",
};

export const MAIN_HEADER_KEY = "X-MOCKED";
export const PRESET_COOKIE_KEY = "X-MOCKED-PRESET";
export const PAUSED_COOKIE_KEY = "X-MOCKED-PAUSED";
export const DEFAULT_PRESET = "default";

/* To be used exclusively when a mock generation occurs */
export const PRESET_GENERATION_HEADER_KEY = "X-GENERATION-MOCKED-PRESET";
