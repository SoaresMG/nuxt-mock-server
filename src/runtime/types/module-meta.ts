export interface ModulePackageInfo {
  name: string ;
  version: string;
}

export interface DevtoolsSpecificOptions {
  createPreset?: boolean;
  setPreset?: boolean;
  deletePreset?: boolean;
  generatePreset?: boolean;
}

export interface MockServerMeta {
  package: ModulePackageInfo;
  devtools: Required<DevtoolsSpecificOptions>;
};
