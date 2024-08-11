import { addServerImports, type Resolver } from "@nuxt/kit";

export function setupAutoImports(resolver: Resolver) {
  addServerImports([{
    name: "useMockServer",
    from: resolver.resolve("./runtime/server/composables/use-mock-server"),
  }]);

  addServerImports([{
    name: "defineMockInterceptorHandler",
    from: resolver.resolve("./runtime/server/handlers/define-mock-interceptor-handler"),
  }]);
}
