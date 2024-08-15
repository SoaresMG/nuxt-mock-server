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

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

<style module>
  table {
    max-width: 100% !important;
    width: 100% !important;
  }
</style>

## 
::: warning
`mockDir` does not respect the `nuxt.config` location, instead it looks at where the CLI is called.

To have it fixed set it as `path.resolve(__dirname, "mocks")`. This is something that will be tackled soon.
:::