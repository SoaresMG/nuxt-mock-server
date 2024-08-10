import type { ModulePackageInfo } from "./module-meta";

export interface ModuleOptions {
  enabled?: boolean;
  pathMatch?: string;
  mockDir?: string;
  devtools?: boolean;
  preset?: string;
  package?: ModulePackageInfo;
  auto?: boolean;
}
