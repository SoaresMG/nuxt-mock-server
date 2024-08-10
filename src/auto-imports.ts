import type { Nuxt } from "nuxt/schema";
import { addServerImports, type Resolver } from "@nuxt/kit";

export function setupAutoImports(nuxt: Nuxt, resolver: Resolver) {
  addServerImports([{
    name: "useMockServer",
    as: "useMockServer",
    from: resolver.resolve("./runtime/server/composables/use-mock-server"),
  }]);
}
