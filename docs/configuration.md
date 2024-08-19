---
title: Configuration
---

# Basic Configuration

To begin using the module, it needs to be added to `nuxt.config.ts`: 

```ts
export default defineNuxtConfig({
  modules: ["nuxt-mock-server"],

  // This can be omitted to rely only on defaults
  // mocks: {},  
});
```

This being done, the server will start intercepting all requests made for the default `pathMatch` located in the options.

## Defining options

There are three different ways of setting up options and they are all merged together, meaning that part of the configuration can live separate in the different strategies.

The order of merge is the following:
1. Module Options
2. RuntimeConfig
3. `mock-server:extendOptions` Build hook

::: info
If property "enabled" exists in all of them, the one who has the highest priority comes from `mock-server:extendOptions`.
:::

### Module Options

The easiest way to define options is through the `nuxt.config.ts` file.

```ts
export default defineNuxtConfig({
  modules: ["nuxt-mock-server"],

  mocks: {
    enabled: true,
    mockDir: "./mocks",
    auto: true,
    pathMatch: "^\\/api\\/.*$",
    devtools: true,
    defaultPreset: "default",
    debug: false,
    generate: {
      routes: ["/my-route", "/my-other-route"],
      parallel: false,
    },
  },
});
```

### RuntimeConfig

Similarly to the module options, the runtime config can be used to define options.

```ts
export default defineNuxtConfig({
  modules: ["nuxt-mock-server"],

  runtimeConfig: {
    mockServer: {
      /* ... */
      generate: {
        routes: ["/my-route", "/my-other-route"],
        parallel: false,
      },
    },
  },
});
```

### `mock-server:extendOptions` Hook

This hook can be used to extend the options if you need to do some dynamic configuration that requires for example other hook calls, or just dynamic data (async). 

```ts
export default defineNuxtModule({
    setup(_, nuxt) {
        const service = myService(nuxt.options.runtimeConfig.myServiceConfig);

        nuxt.hook("mock-server:extendOptions", async (mockServer) => {
            const routes = await service.getDynamicRoutes();

            mockServer.generate = {
                ...mockServer.generate,
                routes: routes.map(
                    (route) => `/api/page?slug=${route.url}`,
                ),
            };
        });
    },
});
```

In the example above, the `myService` is a service that fetches data from an external source and based on that data, it will enable or disable the mock server and add routes to be generated.

::: tip
The tricky part here is that typically the route for a page differs from the route for the API, so it's necessary to map the routes to the API route.
:::

## Options

### enabled

Enables nuxt-mock-server.

- Type: `boolean | undefined`
- Default: `undefined`

If `undefined` is passed, the module will only be enabled for development mode.

### mockdir

The directory where the mock files will be located.

- Type: `string`
- Default: `"./mocks"`

::: warning
`mockDir` does not respect the `nuxt.config` location, instead it looks at where the CLI is called.

To have it fixed set it as `path.resolve(__dirname, "mocks")`. This is something that will be tackled soon.
:::

### auto

If auto mode is enabled.

- Type: `boolean | undefined`
- Default: `true`

Read more about this mode <a href="/features/modes">here</a>


### pathMatch

The path to match for the mock server to intercept in auto-mode.

- Type: `string`
- Default: `"^\\/api\\/.*$"`

### devtools

If the devtools tab should be enabled.

- Type: `boolean | DevtoolsOptions`
- Default: `true`

This options also has the possibility to disable features, like the `generate` or `.create` button.

This is specially useful if you want to use `useMockServer` (see <a href="/features/use-mock-server">here</a>) and delegate those actions into the app itself.

#### DevtoolsOptions

```ts 
{
  createPreset?: boolean;
  setPreset?: boolean;
  deletePreset?: boolean;
  generatePreset?: boolean;
}
```

### defaultPreset

The name to be used as the default preset.

- Type: `string`
- Default: `"default"`

### package

::: danger
Internal usage only, contains information about the package.
:::

### debug

Enables debug mode which outputs logs about routes being generated and more.
Typically you don't want to enable this, otherwise it will pollute your terminal.

- Type: `boolean | undefined`
- Default: `false`

### generate

Configuration regarding the generation phase.

Read more about configuring routes here <a href="#defining-options">here</a>.

- Type: `object`
- Default: `undefined`

#### generate.routes

The routes to be generated.

- Type: `string[] | undefined`
- Default: `undefined`

#### generate.parallel

If requests during mock generation are to be made in parallel.

- Type: `boolean | undefined`
- Default: `false`
