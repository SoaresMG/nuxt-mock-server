import {
  defineNuxtModule,
  createResolver,
  addServerPlugin,
  useLogger,
  addServerHandler,
} from "@nuxt/kit";
import { readPackageJSON } from "pkg-types";
import { setupDevToolsUI } from "./devtools";
import { DEFAULT_PRESET } from "./runtime/utils";
import { setupAutoImports } from "./auto-imports";
import { setupGeneratedTypes } from "./generated-types";
import type { ModulePackageInfo } from "./runtime/types";

const logger = useLogger("@nuxt/mock-server");

export interface ModuleOptions {
  enabled?: boolean;
  pathMatch?: string;
  mockDir?: string;
  devtools?: boolean;
  preset?: string;
  package?: ModulePackageInfo;
}

declare module "@nuxt/schema" {
  interface RuntimeConfig {
    mockServer?: ModuleOptions;
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
    devtools: true,
    preset: DEFAULT_PRESET,
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

    setupGeneratedTypes(nuxt, resolver);
    setupAutoImports(nuxt, resolver);

    if (options.devtools) {
      addServerHandler({
        route: "/__mock-server__/presets",
        handler: resolver.resolve("./runtime/server/routes/presets"),
      });

      addServerHandler({
        route: "/__mock-server__/meta",
        handler: resolver.resolve("./runtime/server/routes/meta"),
      });

      addServerHandler({
        route: "/__mock-server__/set-preset",
        method: "POST",
        handler: resolver.resolve("./runtime/server/routes/set-preset.post"),
      });

      addServerHandler({
        route: "/__mock-server__/delete-preset",
        method: "POST",
        handler: resolver.resolve("./runtime/server/routes/delete-preset.post"),
      });

      setupDevToolsUI(nuxt, resolver);
    }
  },
});
