import type { DevtoolsSpecificOptions, ModulePackageInfo } from "./module-meta";

export type DevtoolsOptions = boolean | DevtoolsSpecificOptions;

export interface ModuleOptions {
  /**
   * Enables nuxt-mock-server as a whole.
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * RegEx to match route paths in Auto mode.
   * This will not be used for Selective mode endpoints.
   *
   * @default "^\\/api\\/.*$"
   */
  pathMatch?: string;
  /**
   * Directory to save the mock presets and files.
   *
   * @default "./mocks"
   */
  mockDir?: string;
  /**
   * Enables devtools tab "Mock Server".
   *
   * @default true
   */
  devtools?: boolean | DevtoolsOptions;
  /**
   * Default preset if no cookie is present.
   * Devtools will always be disabled when Nuxt is not in dev mode.
   *
   * @default "default"
   */
  defaultPreset?: string;
  /**
   * @private
   */
  package?: ModulePackageInfo;
  /**
   * Enables automatic mode, otherwise the app will be solely in selective mode.
   *
   * @default true
   */
  auto?: boolean;
  /**
   * Enables all logs emitted by the module otherwise only errors are emitted.
   *
   * @default false
   */
  debug?: boolean;
  /**
   * If defined generates mock files on the specified routes.
   *
   * @default undefined
   */
  generate?: {
    /**
     * Routes to generate on module load.
     * Mock Server will automatically call these routes to generate mock files inside the preset directory specified in the property `preset`.
     *
     * @default false
     */
    routes?: string[];
    /**
     * Enables parallel mode for route mock generation.
     *
     * @default false
     */
    parallel?: boolean;
  };
}
