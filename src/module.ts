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
import { setupGeneratedTypes } from "./generate-types";
import type { ModulePackageInfo, ModuleOptions as _ModuleOptions } from "./runtime/types";

const logger = useLogger("mock-server");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions extends _ModuleOptions {}

export interface ModuleHooks {
  "mock-server:extendOptions": (options: ModuleOptions) => void | Promise<void>;
}

declare module "@nuxt/schema" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NuxtHooks extends ModuleHooks {}
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-mock-server",
    configKey: "mocks",
    compatibility: {
      nuxt: ">=3.0.0",
    },
  },
  defaults: {
    enabled: false,
    pathMatch: "^\\/api\\/.*$",
    mockDir: "mocks",
    devtools: true,
    defaultPreset: DEFAULT_PRESET,
    auto: true,
    debug: false,
  },
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const packageJson = await readPackageJSON(resolver.resolve("../package.json"));
    const packageInfo: ModulePackageInfo = { name: packageJson.name || "notfound", version: packageJson.version || "0.0.0" };

    setupGeneratedTypes(packageInfo);
    setupAutoImports(resolver);

    const options = nuxt.options.runtimeConfig.mockServer = {
      ..._options,
      ...nuxt.options.runtimeConfig.mockServer,
      package: packageInfo,
    };

    await nuxt.hooks.callHook("mock-server:extendOptions", options);

    if (
      typeof options.enabled === "undefined"
        ? !nuxt.options.dev
        : !options.enabled
    ) {
      return;
    }

    if (options.debug) {
      logger.info(`Mock server is enabled for ${options.pathMatch}`);
    }

    if (options.auto) {
      addServerPlugin(resolver.resolve("./runtime/server/plugins/processor"));
    }

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

      addServerHandler({
        route: "/__mock-server__/generate-preset",
        method: "POST",
        handler: resolver.resolve("./runtime/server/routes/generate-preset.post"),
      });

      setupDevToolsUI(nuxt, resolver);
    }
  },
});
