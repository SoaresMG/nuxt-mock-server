export interface ModulePackageInfo {
  name: string | undefined;
  version: string | undefined;
}

export interface MockServerMeta {
  package: ModulePackageInfo;
};
