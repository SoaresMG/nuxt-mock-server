import type { Nuxt } from "nuxt/schema";
import type { Resolver } from "@nuxt/kit";
import type { ModulePackageInfo } from "./runtime/types";
import { extendTypes } from "./kit";

export function setupGeneratedTypes(nuxt: Nuxt, resolver: Resolver, packageInfo: ModulePackageInfo) {
  extendTypes(packageInfo, async ({ typesPath }) => {
    return `
declare module "@nuxt/schema" {
  interface RuntimeConfig {
      mockServer?: import("${typesPath}").ModuleOptions;
  }
}

declare module "nitropack" {
  interface NitroRuntimeHooks {
    "mock-server:config": () => void | Promise<void>
  }
}
`;
  });
}
