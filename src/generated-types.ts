import type { Nuxt } from "nuxt/schema";
import { addTypeTemplate, type Resolver } from "@nuxt/kit";

export function setupGeneratedTypes(nuxt: Nuxt, resolver: Resolver) {
  addTypeTemplate({
    filename: "module/mock-server.d.ts",
    getContents: () => `declare module "@nuxt/schema" {
  interface RuntimeConfig {
      mockServer?: import("${resolver.resolve("./module")}").ModuleOptions;
  }
}

export {};
`,
    write: true,
  });
}
