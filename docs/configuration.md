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

- Type: `boolean | undefined`
- Default: `true`

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

Read more about generations here <a href="/generations">here</a>.

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
