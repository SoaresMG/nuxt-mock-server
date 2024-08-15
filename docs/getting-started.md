---
title: Getting Started
---

# Getting Started

This module provides an easy way to setup mocks for nuxt.

## Installation

::: code-group

```bash [yarn]
yarn add -D nuxt-mock-server
```

```bash [npm]
npm i -D nuxt-mock-server
```

```bash [pnpm]
pnpm i -D nuxt-mock-server
```

```bash [bun]
bun install -d nuxt-mock-server
```
:::

### Quick Config
```ts
export default defineNuxtConfig({
  modules: ["nuxt-mock-server"],
});
```

See more <a href="/configuration">configuration</a> for more options

## Why was this module created?

On a first look this module looks like an overengineered `defineCachedEventHandler`, but there are a few main key points to consider:

- Cache is ephemeral, mocks should not be;
- `nuxt-mock-server` allows the developer to take the rein using `useMockServer` to decide when things happen;
- Devtools integration, allowing (optionally) the management of mocks/presets;
- Ability to generate a list of routes as mocks.

There are a few particular scenarios where this module shines:

- If you need mocks to run E2E on your application but you want the client calls to be as close as the original;
- If your application has an enormous amount of requests and local developer experience is suffering from constant non-changing requests.

Also, the module is quite fresh and there are a lot of cool features coming in the future, check the <a href="/high-level-roadmap">roadmap</a> for more planned cool features!

## How does it work?

These mocks are generated into a provided folder inside the repository which in turn are provided by the module.

1. Module is loaded and hooks all requests;
2. User hits a page;
3. A request is eventually made (e.g `/api/my-endpoint`);
4. The mock-server will try to intercept the request based on either <a href="/features/modes">Auto mode or Selective mode</a>;
5. If the mock exists returns the data inside the mock, otherwise calls the original endpoint and saves the response as a mock;
6. Next requests to the same endpoint are always returned from the mock.