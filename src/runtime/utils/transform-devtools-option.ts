import type { DevtoolsOptions, DevtoolsSpecificOptions } from "../types";

const isDevtoolsSpecificOptions = (options: DevtoolsOptions): options is DevtoolsSpecificOptions => (
  typeof options === "object" && options !== null
);

export function transformDevtoolsOptions(options: DevtoolsOptions | undefined): Required<DevtoolsSpecificOptions & { enabled: boolean; }> {
  if (!options) {
    return {
      enabled: false,
      generatePreset: false,
      createPreset: false,
      setPreset: false,
      deletePreset: false,
    };
  }

  const isObject = isDevtoolsSpecificOptions(options);

  return {
    enabled: true,
    ...isObject
      ? {
          generatePreset: options.generatePreset ?? true,
          createPreset: options.createPreset ?? true,
          setPreset: options.setPreset ?? true,
          deletePreset: options.deletePreset ?? true,
        }
      : {
          generatePreset: true,
          createPreset: true,
          setPreset: true,
          deletePreset: true,
        },
  };
}
