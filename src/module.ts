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

const logger = useLogger("@nuxt/mock-server");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions extends _ModuleOptions {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleHooks {}

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
    auto: true,
  },
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const packageJson = await readPackageJSON(resolver.resolve("../package.json"));
    const packageInfo: ModulePackageInfo = { name: packageJson.name || "notfound", version: packageJson.version || "0.0.0" };

    setupGeneratedTypes(nuxt, resolver, packageInfo);
    setupAutoImports(nuxt, resolver);

    const options = nuxt.options.runtimeConfig.mockServer = {
      ..._options,
      ...nuxt.options.runtimeConfig.mockServer,
      package: packageInfo,
    };

    if (
      typeof options.enabled === "undefined"
        ? !nuxt.options.dev
        : !options.enabled
    ) {
      return;
    }

    logger.info(`Mock server is enabled for ${options.pathMatch}`);

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

      setupDevToolsUI(nuxt, resolver);
    }
  },
});
