export enum MAIN_HEADER_VALUE {
  IGNORE = "IGNORE",
  FOUND = "FOUND",
  CREATED = "CREATED",
};

export const MAIN_HEADER_KEY = "X-MOCKED";

/* To be used exclusively when a mock generation occurs */
export const PRESET_GENERATION_HEADER_KEY = "X-GENERATION-MOCKED-PRESET";

export const PRESET_COOKIE_KEY = "X-MOCKED-PRESET";

export const DEFAULT_PRESET = "default";
