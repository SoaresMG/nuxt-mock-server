import {
  defineNuxtModule,
  createResolver,
  addServerPlugin,
  addTypeTemplate,
  useLogger,
  addServerHandler,
} from "@nuxt/kit";
import { readPackageJSON } from "pkg-types";
import { setupDevToolsUI } from "./devtools";
import type { ModulePackageInfo } from "./runtime/types";

const logger = useLogger("@nuxt/mock-server");

export interface ModuleOptions {
  enabled?: boolean;
  pathMatch?: string;
  mockDir?: string;
  compress?: boolean;
  devtools?: boolean;
}

declare module "@nuxt/schema" {
  interface RuntimeConfig {
    mockServer: ModuleOptions & { package: ModulePackageInfo; };
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-mock-server",
    configKey: "mocks",
  },
  defaults: {
    enabled: false,
    pathMatch: "^\\/api\\/.*$",
    mockDir: "mocks",
    compress: false,
    devtools: true,
  },
  async setup(options, nuxt) {
    if (
      typeof options.enabled === "undefined"
        ? !nuxt.options.dev
        : !options.enabled
    ) {
      return;
    }

    const resolver = createResolver(import.meta.url);

    logger.info(`Mock server is enabled for ${options.pathMatch}`);

    const { name, version } = await readPackageJSON(resolver.resolve("../package.json"));

    nuxt.options.runtimeConfig.mockServer = {
      ...options,
      package: {
        name,
        version,
      },
    };

    addServerPlugin(resolver.resolve("./runtime/server/plugins/mock-processor"));

    addTypeTemplate({
      filename: "module/mock-server.d.ts",
      getContents: () => `
    declare module "@nuxt/schema" {
      interface RuntimeConfig {
          mockServer?: import("${resolver.resolve("./module")}").ModuleOptions;
      }
    }

    export {};
              `,
      write: true,
    });

    if (options.devtools) {
      addServerHandler({
        route: "/__mock-server__/entries",
        handler: resolver.resolve("./runtime/server/routes/__mock-server__/entries"),
      });

      addServerHandler({
        route: "/__mock-server__/meta",
        handler: resolver.resolve("./runtime/server/routes/__mock-server__/meta"),
      });

      setupDevToolsUI(nuxt, resolver);
    }
  },
});
