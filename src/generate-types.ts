import type { ModulePackageInfo } from "./runtime/types";
import { extendTypes } from "./kit";

export function setupGeneratedTypes(packageInfo: ModulePackageInfo) {
  extendTypes(packageInfo, async ({ typesPath }) => {
    return `
declare module "@nuxt/schema" {
  interface RuntimeConfig {
      mockServer?: import("${typesPath}").ModuleOptions;
  }
}

declare module "nitropack" {
  interface NitroRuntimeHooks {
    "mock-server:extendRoutes": (routes: string[]) => void | Promise<void>;
  }
}
`;
  });
}
