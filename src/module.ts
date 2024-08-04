import {
  defineNuxtModule,
  createResolver,
  addServerPlugin,
  addTypeTemplate,
  useLogger,
} from "@nuxt/kit";

const logger = useLogger("@nuxt/mock-server");

export interface ModuleOptions {
  enabled?: boolean
  pathMatch?: string
  mockDir?: string
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
  },
  async setup(options, nuxt) {
    if (
      typeof options.enabled === "undefined"
        ? !nuxt.options.dev
        : !options.enabled
    ) {
      return;
    }

    const { resolve } = createResolver(import.meta.url);

    logger.info(`Mock server is enabled for ${options.pathMatch}`);

    nuxt.options.runtimeConfig.mockServer = options;

    addServerPlugin(resolve("./runtime/server/plugins/mock-processor.ts"));

    addTypeTemplate({
      filename: "module/mock-server.d.ts",
      getContents: () => `
    declare module "@nuxt/schema" {
      interface RuntimeConfig {
          mockServer?: import("${resolve("./runtime/types")}").ModuleOptions;
      }
    }

    export {};
              `,
      write: true,
    });
  },
});
