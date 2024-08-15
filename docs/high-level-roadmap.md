---
title: Motivation
---

# Why was this module created?

On a first look this module looks like an overengineered `defineCachedEventHandler`, but there are a few main key points to consider:

- Cache is ephemeral, mocks should not be;
- `nuxt-mock-server` allows the developer to take the rein using `useMockServer` to decide when things happen;
- Devtools integration, allowing (optionally) the management of mocks/presets;
- Ability to generate a list of routes as mocks.

## How does it work ?

These mocks are generated into a provided folder inside the repository which in turn are provided by the module.

1. Module is loaded and hooks all requests;
2. User hits a page;
3. `useFetch` or `$fetch` is called to a path (e.g `/api/my-endpoint`);
4. If the path tests true for `mocks.pathMatch` then the mock is served OR created, otherwise the call is just forwarded to where it's supposed to go;
5. If the mock exists returns the data inside the mock, otherwise calls the original endpoint and saves the response as a mock;
6. Next requests to the same endpoint are always returned from the mock.

## Installation

::: code-group

```bash [yarn]
yarn install nuxt-mock-server
```

```bash [npm]
npm i nuxt-mock-server
```

```bash [pnpm]
pnpm i nuxt-mock-server
```

```bash [bun]
bun install nuxt-mock-server
```
:::

```js 
export default defineNuxtConfig({
  modules: ["nuxt-mock-server"],

  mocks: {
    // Defaults
    enabled: false,                 // Enable/disable the mock-server
    pathMatch: "^\\/api\\/.*$",     // Regex to match the request path
    mockDir: "mocks",               // Directory to save the mock files
  },
});
```

`mockDir` does not respect the `nuxt.config` location, instead it looks at where the CLI is called.

To have it fixed set it as `path.resolve(__dirname, "mocks")`. This is something that will be tackled soon.